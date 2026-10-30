// Visual QA: captures full-page screenshots at mobile/desktop widths and
// reports horizontal overflow. Uses a local Chrome via the DevTools protocol.
//
//   node scripts/qa-screenshots.mjs http://localhost:3000 ./qa-output / /work /about
//
// Requires Google Chrome (set CHROME_PATH to override the macOS default).

import { spawn } from "node:child_process";
import { mkdir, writeFile, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [base = "http://localhost:3000", outDir = "./qa-output", ...paths] = process.argv.slice(2);
const routes = paths.length ? paths : ["/"];
const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewports = [
  { name: "mobile", width: 390, height: 844, mobile: true },
  { name: "desktop", width: 1440, height: 900, mobile: false },
];

const port = 9333 + Math.floor(Math.random() * 500);
const profileDir = await mkdtemp(join(tmpdir(), "qa-chrome-"));
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profileDir}`,
  "about:blank",
]);

async function getWsUrl() {
  let lastError;
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const targets = await res.json();
      const page = targets.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch (err) {
      lastError = err; // Chrome is still starting; retry below.
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Chrome did not start: ${lastError}`);
}

const ws = new WebSocket(await getWsUrl());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
const listeners = new Set();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message));
    else resolve(msg.result);
  } else listeners.forEach((fn) => fn(msg));
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
const waitForLoad = () =>
  new Promise((resolve) => {
    const fn = (msg) => {
      if (msg.method === "Page.loadEventFired") {
        listeners.delete(fn);
        resolve();
      }
    };
    listeners.add(fn);
  });

await send("Page.enable");
// QA_DARK=1 emulates a dark-mode system preference.
if (process.env.QA_DARK) {
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "dark" }] });
}
await mkdir(outDir, { recursive: true });
let failures = 0;

for (const vp of viewports) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 1,
    mobile: vp.mobile,
  });
  for (const route of routes) {
    const loaded = waitForLoad();
    await send("Page.navigate", { url: base + route });
    await loaded;
    // Reveal every scroll-animated element so the full page is captured.
    await send("Runtime.evaluate", {
      expression: `(async()=>{document.querySelectorAll('[data-reveal]').forEach(e=>e.dataset.visible='true');document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0);await Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})));await new Promise(r=>setTimeout(r,500))})()`,
      awaitPromise: true,
    });
    const { result } = await send("Runtime.evaluate", {
      expression: `JSON.stringify({sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h: document.documentElement.scrollHeight})`,
      returnByValue: true,
    });
    const m = JSON.parse(result.value);
    const overflow = m.sw > m.cw;
    if (overflow) failures++;
    const shot = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: vp.width, height: Math.min(m.h, 12000), scale: 1 },
    });
    const file = join(outDir, `${vp.name}${route === "/" ? "-home" : route.replaceAll("/", "-")}.png`);
    await writeFile(file, Buffer.from(shot.data, "base64"));
    console.log(`${overflow ? "OVERFLOW" : "ok      "} ${vp.name.padEnd(8)} ${route} (scrollWidth ${m.sw}/${m.cw}) → ${file}`);
  }
}

ws.close();
chrome.kill();
process.exit(failures ? 1 : 0);

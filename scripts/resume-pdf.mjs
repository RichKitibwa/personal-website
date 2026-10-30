// Renders /resume to public/resume/Rich-Kitibwa-Resume.pdf with headless Chrome.
// Run against a running server (dev or production):
//   npm run resume:pdf                      # uses http://localhost:3000
//   npm run resume:pdf -- http://localhost:3100
// Set NEXT_PUBLIC_SITE_URL when building so the PDF prints the real domain.

import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import { resolve } from "node:path";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const out = resolve("public/resume/Rich-Kitibwa-Resume.pdf");

execFileSync(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--virtual-time-budget=5000",
  `--print-to-pdf=${out}`,
  `${base}/resume`,
], { stdio: ["ignore", "ignore", "inherit"] });

const { size } = statSync(out);
if (size < 10_000) throw new Error(`PDF looks empty (${size} bytes) — is the server running at ${base}?`);
console.log(`Wrote ${out} (${Math.round(size / 1024)} KB)`);

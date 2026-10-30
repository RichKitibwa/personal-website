import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Rich Kitibwa: I build whole products for all kinds of users.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const portrait = await readFile(join(process.cwd(), "public/images/portrait.jpg"));
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b1220",
          color: "#eef0f2",
          padding: 72,
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ fontSize: 26, color: "#9aa3b2", letterSpacing: 4, fontFamily: "monospace" }}>
            RICH KITIBWA · KAMPALA
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 56, lineHeight: 1.08, maxWidth: 760, columnGap: 16 }}>
            <span>I build</span>
            <span style={{ color: "#4fd1bb", fontStyle: "italic" }}>whole</span>
            <span>products for all kinds of users: clinicians, sports fans, procurement teams and more.</span>
          </div>
          <div style={{ fontSize: 26, color: "#9aa3b2", fontFamily: "sans-serif" }}>
            Healthcare · AI · Sport · Enterprise · Media
          </div>
        </div>
        <img
          src={portraitSrc}
          alt=""
          width={300}
          height={375}
          style={{ borderRadius: 24, objectFit: "cover", alignSelf: "center", border: "1px solid #1f2a3c" }}
        />
      </div>
    ),
    size,
  );
}

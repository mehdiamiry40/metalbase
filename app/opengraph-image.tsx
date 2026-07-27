import { ImageResponse } from "next/og";

export const alt = "MetalBase — scrap metal recycling, Brisbane";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f1941",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="58" height="50" viewBox="0 0 32 28">
            <path d="M4 4h18l-4 6H0z" fill="#ff6a1a" />
            <path d="M7 11h18l-4 6H3z" fill="#ff6a1a" opacity="0.62" />
            <path d="M10 18h18l-4 6H6z" fill="#ffffff" opacity="0.5" />
          </svg>
          <span style={{ color: "#ffffff", fontSize: 44, fontWeight: 600, letterSpacing: -1.6 }}>
            MetalBase
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#ffffff", fontSize: 74, lineHeight: 1.05, letterSpacing: -2.6 }}>
            Your metal is worth more than
          </span>
          <span style={{ color: "#ffffff", fontSize: 74, lineHeight: 1.05, letterSpacing: -2.6 }}>
            the bin it&rsquo;s sitting in
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ width: 64, height: 5, background: "#ff6a1a" }} />
          <span style={{ color: "#a8b2cc", fontSize: 28 }}>
            Scrap metal recycling · Brisbane
          </span>
        </div>
      </div>
    ),
    size,
  );
}

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
          background: "#f7f9f9",
          padding: "72px",
          color: "#182024",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="54" height="54" viewBox="0 0 34 34">
            <path
              d="M4 24V6h6l7 10 7-10h6v18"
              fill="none"
              stroke="#182024"
              strokeWidth="2.5"
            />
            <path
              d="M2 28h30M7 28v3M27 28v3"
              fill="none"
              stroke="#182024"
              strokeWidth="2.5"
            />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: 1.5 }}>
            METALBASE
          </span>
        </div>

        <div style={{ display: "flex", maxWidth: 970 }}>
          <span style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -1.5 }}>
            Brisbane scrap metal, weighed and graded in front of you.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #4d595f",
            paddingTop: 24,
          }}
        >
          <span style={{ color: "#4d595f", fontSize: 26 }}>
            Quote requests · grading · preparation
          </span>
          <span style={{ color: "#4d595f", fontSize: 26 }}>
            Brisbane, QLD
          </span>
        </div>
      </div>
    ),
    size,
  );
}

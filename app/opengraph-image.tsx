import { ImageResponse } from "next/og";
import { METALBASE_MARK_PATHS } from "@/lib/brand";

export const alt = "MetalBase — Brisbane scrap metal quote and grade guidance";
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
          background: "#ffffff",
          padding: "72px",
          color: "#1d2747",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="58" height="58" viewBox="0 0 48 48">
            {METALBASE_MARK_PATHS.map((path) => (
              <path key={path} d={path} fill="#1d2747" />
            ))}
          </svg>
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: 1.5 }}>
            METALBASE
          </span>
        </div>

        <div style={{ display: "flex", maxWidth: 970 }}>
          <span style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -1.5 }}>
            Brisbane scrap metal quotes and grade guidance.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #5f6675",
            paddingTop: 24,
          }}
        >
          <span style={{ color: "#5f6675", fontSize: 26 }}>
            Quotes · grades · preparation
          </span>
          <span style={{ color: "#5f6675", fontSize: 26 }}>
            Brisbane, QLD
          </span>
        </div>
      </div>
    ),
    size,
  );
}

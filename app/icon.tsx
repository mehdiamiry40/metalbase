import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon — the stacked-bar mark on ink. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14171a",
        }}
      >
        <svg width="46" height="40" viewBox="0 0 32 28">
          <path d="M4 4h18l-4 6H0z" fill="#b2542f" />
          <path d="M7 11h18l-4 6H3z" fill="#f4f1ea" opacity="0.85" />
          <path d="M10 18h18l-4 6H6z" fill="#f4f1ea" opacity="0.45" />
        </svg>
      </div>
    ),
    size,
  );
}

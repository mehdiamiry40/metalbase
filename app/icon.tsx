import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon — an M-shaped steel frame sitting on a weighbridge deck. */
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
          background: "#182024",
        }}
      >
        <svg width="44" height="44" viewBox="0 0 34 34">
          <path
            d="M4 24V6h6l7 10 7-10h6v18"
            fill="none"
            stroke="#f7f9f9"
            strokeWidth="2.5"
            strokeLinejoin="miter"
          />
          <path
            d="M2 28h30M7 28v3M27 28v3"
            fill="none"
            stroke="#f7f9f9"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    ),
    size,
  );
}

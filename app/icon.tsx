import { ImageResponse } from "next/og";
import { METALBASE_MARK_PATH } from "@/lib/brand";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon — the plate badge from the MetalBase wordmark, on furnace. */
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
          background: "#032d60",
        }}
      >
        <svg width="52" height="52" viewBox="0 0 48 48">
          <path d={METALBASE_MARK_PATH} fill="#ffffff" fillRule="evenodd" />
        </svg>
      </div>
    ),
    size,
  );
}

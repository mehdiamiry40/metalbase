import { ImageResponse } from "next/og";
import { METALBASE_MARK_PATHS } from "@/lib/brand";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon — the solid steel-plate M from the MetalBase wordmark. */
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
        <svg width="46" height="46" viewBox="0 0 48 48">
          {METALBASE_MARK_PATHS.map((path) => (
            <path key={path} d={path} fill="#ffffff" />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}

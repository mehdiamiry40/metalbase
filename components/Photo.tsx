import Image from "next/image";
import { photoSrc, photos, type PhotoKey } from "@/lib/photos";

/**
 * Fills its positioned parent. Parent must set the aspect ratio and
 * `relative overflow-hidden`.
 */
export default function Photo({
  name,
  alt,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  tint = false,
  /** Upstream source width. Lower it for thumbnails to save bytes. */
  sourceWidth,
  className = "",
}: {
  name: PhotoKey;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  /** graphite wash for photos carrying text on top */
  tint?: boolean;
  sourceWidth?: number;
  className?: string;
}) {
  return (
    <>
      <Image
        src={photoSrc(name, sourceWidth)}
        alt={alt ?? photos[name].alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
      {tint && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/35 to-transparent"
        />
      )}
    </>
  );
}

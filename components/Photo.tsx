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
  /** Upstream source width. Lower it for thumbnails to save bytes. */
  sourceWidth,
  quality,
  className = "",
}: {
  name: PhotoKey;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  sourceWidth?: number;
  /** Output quality passed to Next's image optimiser. */
  quality?: number;
  className?: string;
}) {
  return (
    <Image
      src={photoSrc(name, sourceWidth)}
      alt={alt ?? photos[name].alt}
      fill
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      sizes={sizes}
      quality={quality ?? (priority ? 70 : 75)}
      className={`site-photo object-cover ${className}`}
    />
  );
}

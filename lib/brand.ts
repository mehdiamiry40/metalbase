/**
 * MetalBase's monogram: a sheared-plate M standing on a base plinth.
 *
 * Three ideas carry the mark, and all three survive to 16px:
 *
 * 1. The M is a real letterform — two stems joined to a chevron that
 *    lands on the baseline — rather than a chevron floating between two
 *    detached slabs. The counters stay open, so the silhouette does not
 *    collapse into a square at favicon size.
 * 2. The top corners are cut back at 45°, the way plate comes off a
 *    guillotine. It is the one detail that makes the mark ours.
 * 3. The plinth tapers, so it reads as something bearing weight — the
 *    "Base" half of the name, and the weighbridge the business runs on.
 *
 * Geometry is shared by the site wordmark, favicon and social image so the
 * brand never drifts between surfaces. Every path is a closed polygon that
 * touches its neighbours edge-to-edge and never overlaps them, which keeps
 * the mark correct under a plain `fill` with no fill-rule — `next/og`
 * rasterises these as-is for the icon and OG routes.
 */
export const METALBASE_MARK_PATHS = [
  /** Left stem, top-left corner sheared. */
  "M8 5h4v33H4V9z",
  /** Right stem, top-right corner sheared. */
  "M36 5h4l4 4v29h-8z",
  /** Centre chevron, joined to both stems and pointed to the baseline. */
  "M12 5l12 19 12-19v14L24 38 12 19z",
  /** Tapered base plinth. */
  "M2 41h44l-2 5H4z",
] as const;

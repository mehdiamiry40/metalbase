/**
 * MetalBase's monogram: a plate badge with the M cut out of it.
 *
 * The plate is a square with two opposite corners cut back at 45°, the way
 * plate comes off a guillotine. The M is not drawn on top of it — it is a
 * void through it, so the page shows through the letter. That is what makes
 * the mark hold at favicon size: the silhouette is a solid block, and a
 * block survives 16px where an open letterform softens into a smudge.
 *
 * Geometry is shared by the site wordmark, favicon and social image so the
 * brand never drifts between surfaces.
 *
 * ── Why this is one path, not four ──
 *
 * The voids only exist under `fill-rule: evenodd`, and a fill rule applies
 * within a single path — four separate <path> elements would each fill
 * solid and the badge would render as a blank plate. So the pieces are
 * joined here rather than exported as a list: there is exactly one exported
 * value and exactly one correct way to draw it. Render it as
 *
 *     <path d={METALBASE_MARK_PATH} fill="currentColor" fillRule="evenodd" />
 *
 * The pieces below never overlap — the stems only touch the chevron along
 * x=16, edge to edge — because two overlapping voids would cancel back to
 * ink under evenodd. The M's counters are not voids at all: they are simply
 * uncut plate, which is why they carry the plate's colour.
 */
const MARK_PIECES = [
  /** The plate. Top-left and bottom-right corners sheared. */
  "M12 3H45V36l-9 9H3V12z",
  /** Void: left stem. */
  "M11 12h5v22h-5z",
  /** Void: right stem. */
  "M32 12h5v22h-5z",
  /** Void: centre chevron, joined to both stems, pointed to the baseline. */
  "M16 12l8 12 8-12v10l-8 12-8-12z",
] as const;

export const METALBASE_MARK_PATH = MARK_PIECES.join(" ");

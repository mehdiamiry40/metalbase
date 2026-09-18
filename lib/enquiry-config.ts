export const MAX_PHOTOS = 3;
export const MAX_INPUT_PHOTO_BYTES = 12_000_000;
export const MAX_PHOTO_BYTES = 700_000;
export const MAX_PHOTO_BASE64_CHARS =
  Math.ceil(MAX_PHOTO_BYTES / 3) * 4;

/** Shared by the form and raw server validation; never silently discard text. */
export const ENQUIRY_LIMITS = {
  enquiryType: 120,
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  suburb: 120,
  volume: 120,
  detail: 4000,
  material: 60,
  materialCount: 20,
  photoName: 100,
} as const;

// Three maximum-sized base64 photos plus all bounded fields and JSON overhead.
export const MAX_ENQUIRY_BODY_BYTES = 3_000_000;

export const ACCEPTED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AcceptedPhotoType = (typeof ACCEPTED_PHOTO_TYPES)[number];

/* ------------------------------------------------------------------
   Option lists shared by the enquiry form and the home-page estimate.

   These live here rather than inside the form because the estimate
   hands off to the form with a grade and a weight already chosen, and
   it can only preselect an option it knows the exact spelling of. Two
   hand-kept copies of these strings is how that handoff silently stops
   matching.
   ------------------------------------------------------------------ */

export const ENQUIRY_TYPES = [
  "Scrap metal quote",
  "Arranged drop-off question",
  "Collection or container enquiry",
  "Commercial site enquiry",
  "Something else",
] as const;

/** The form opens on this, so a seller after a quote never touches the select. */
export const DEFAULT_ENQUIRY_TYPE = ENQUIRY_TYPES[0];

export const MATERIAL_CHIPS = [
  "Copper & cable",
  "Aluminium",
  "Brass & bronze",
  "Stainless steel",
  "Heavy melting steel",
  "Light gauge / mixed steel",
  "Cast iron",
  "Batteries",
  "E-waste",
  "Not sure yet",
] as const;

export const VOLUME_BANDS = [
  "Under 200kg — ute or trailer load",
  "200kg – 1 tonne",
  "1 – 10 tonnes",
  "10+ tonnes",
] as const;

/** The band list the form shows, which adds an explicit opt-out. */
export const VOLUME_OPTIONS = [...VOLUME_BANDS, "Not sure yet"] as const;

export type MaterialChip = (typeof MATERIAL_CHIPS)[number];
export type VolumeBand = (typeof VOLUME_BANDS)[number];

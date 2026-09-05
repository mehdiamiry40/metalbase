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

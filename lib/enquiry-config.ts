export const MAX_PHOTOS = 3;
export const MAX_INPUT_PHOTO_BYTES = 12_000_000;
export const MAX_PHOTO_BYTES = 700_000;
export const MAX_PHOTO_BASE64_CHARS =
  Math.ceil(MAX_PHOTO_BYTES / 3) * 4;

export const ACCEPTED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AcceptedPhotoType = (typeof ACCEPTED_PHOTO_TYPES)[number];

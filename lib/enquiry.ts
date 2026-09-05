import {
  ACCEPTED_PHOTO_TYPES,
  ENQUIRY_LIMITS,
  MAX_PHOTO_BASE64_CHARS,
  MAX_PHOTOS,
  type AcceptedPhotoType,
} from "@/lib/enquiry-config";

/* ------------------------------------------------------------------
   Core enquiry validation and rate limiting. Provider-bound image decoding is
   isolated in enquiry-photos.ts so untrusted media has one server boundary.
   ------------------------------------------------------------------ */

export type RawEnquiry = {
  enquiryType?: unknown;
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  suburb?: unknown;
  volume?: unknown;
  materials?: unknown;
  detail?: unknown;
  photos?: unknown;
  /** Honeypot: must be empty. */
  website?: unknown;
};

export type EnquiryPhoto = {
  name: string;
  type: AcceptedPhotoType;
  content: string;
};

export type CleanEnquiry = {
  enquiryType: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  suburb: string;
  volume: string;
  materials: string[];
  detail: string;
  photos: EnquiryPhoto[];
};

const LIMITS = ENQUIRY_LIMITS;

const acceptedPhotoTypes = new Set<string>(ACCEPTED_PHOTO_TYPES);
const BASE64 = /^[A-Za-z0-9+/]+={0,2}$/;

function sanitisePhoto(value: unknown): EnquiryPhoto | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Record<string, unknown>;
  const name = clean(candidate.name, LIMITS.photoName)
    .replace(/[^a-zA-Z0-9._ -]/g, "")
    .replace(/\s+/g, " ");
  const type =
    typeof candidate.type === "string" && acceptedPhotoTypes.has(candidate.type)
      ? (candidate.type as AcceptedPhotoType)
      : null;
  const content =
    typeof candidate.content === "string" ? candidate.content : "";

  if (
    !name ||
    !type ||
    content.length === 0 ||
    content.length > MAX_PHOTO_BASE64_CHARS ||
    !BASE64.test(content)
  ) {
    return null;
  }

  return { name, type, content };
}

/** Trim, cap length, and strip control characters. */
export function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  // strip control characters, then trim and cap
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** Plausibility check, not proof that a number belongs to the submitter. */
export function isPhone(value: string): boolean {
  if (!/^[+\d\s().-]+$/.test(value)) return false;
  const number = value.replace(/[\s().-]/g, "");
  if (/^\+[1-9]\d{7,14}$/.test(number)) return true;
  return /^0[23478]\d{8}$/.test(number) || /^(?:13\d{4}|1[38]00\d{6})$/.test(number);
}

/** Run before sanitise: malformed or excessive data must never be silently dropped. */
export function validateRaw(raw: RawEnquiry): Record<string, string> {
  const errors: Record<string, string> = {};
  const fields = ["enquiryType", "name", "company", "email", "phone", "suburb", "volume", "detail"] as const;
  for (const field of fields) {
    const value = raw[field];
    if (value === undefined) continue;
    if (typeof value !== "string") {
      errors[field] = "Use a text value for this field.";
    } else if (value.length > LIMITS[field]) {
      errors[field] = `Use no more than ${LIMITS[field].toLocaleString("en-AU")} characters.`;
    }
  }
  if (raw.materials !== undefined && (
    !Array.isArray(raw.materials) || raw.materials.length > LIMITS.materialCount ||
    raw.materials.some((value) => typeof value !== "string" || value.length > LIMITS.material)
  )) errors.materials = "Choose a shorter list of materials.";
  if (raw.photos !== undefined && (
    !Array.isArray(raw.photos) || raw.photos.length > MAX_PHOTOS ||
    raw.photos.some((photo) => !sanitisePhoto(photo))
  )) errors.photos = "Choose up to 3 valid JPEG, PNG or WebP photos within the size limit.";
  return errors;
}

export function isRawEnquiry(value: unknown): value is RawEnquiry {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** True when the honeypot was filled — a bot. */
export function isBot(raw: RawEnquiry): boolean {
  return clean(raw.website, 100).length > 0;
}

export function sanitise(raw: RawEnquiry): CleanEnquiry {
  return {
    enquiryType: clean(raw.enquiryType, LIMITS.enquiryType),
    name: clean(raw.name, LIMITS.name),
    company: clean(raw.company, LIMITS.company),
    email: clean(raw.email, LIMITS.email),
    phone: clean(raw.phone, LIMITS.phone),
    suburb: clean(raw.suburb, LIMITS.suburb),
    volume: clean(raw.volume, LIMITS.volume),
    materials: Array.isArray(raw.materials)
      ? raw.materials
          .slice(0, LIMITS.materialCount)
          .map((m) => clean(m, LIMITS.material))
          .filter(Boolean)
      : [],
    detail: clean(raw.detail, LIMITS.detail),
    photos: Array.isArray(raw.photos)
      ? raw.photos
          .slice(0, MAX_PHOTOS)
          .map(sanitisePhoto)
          .filter((photo): photo is EnquiryPhoto => photo !== null)
      : [],
  };
}

export function validate(data: CleanEnquiry): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Tell us your name.";
  if (!data.email && !data.phone) {
    errors.contact = "Add an email address or phone number.";
  } else if (data.email && !isEmail(data.email)) {
    errors.email = "That email doesn't look right.";
  }
  if (data.phone && !isPhone(data.phone)) {
    errors.phone = "Add a valid phone number, including the area or country code.";
  }
  if (!data.enquiryType) errors.enquiryType = "Pick what you need.";
  return errors;
}

export function formatSummary(data: CleanEnquiry): string {
  return [
    `Enquiry type: ${data.enquiryType}`,
    `Name: ${data.name}`,
    data.company && `Company: ${data.company}`,
    data.email && `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.suburb && `Suburb: ${data.suburb}`,
    data.volume && `Volume: ${data.volume}`,
    data.materials.length > 0 && `Materials: ${data.materials.join(", ")}`,
    data.photos.length > 0 &&
      `Photos attached: ${data.photos.length}`,
    data.detail && `\n${data.detail}`,
  ]
    .filter(Boolean)
    .join("\n");
}

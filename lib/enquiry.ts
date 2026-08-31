import {
  ACCEPTED_PHOTO_TYPES,
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

const LIMITS = {
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

/* ---------------------------- rate limiting ------------------------
   The first version used a Map in module scope. On serverless that is
   per-instance, so N concurrent instances give an attacker N× the
   budget — it is decoration, not a limit.

   If Upstash Redis credentials are present we use a shared counter that
   actually holds across instances. Otherwise we fall back to in-memory
   and say so plainly, rather than implying protection that isn't there.
   ------------------------------------------------------------------ */

export const WINDOW_MS = 60_000;
export const MAX_PER_WINDOW = 5;
export const MAX_LOCAL_RATE_LIMIT_KEYS = 10_000;
const LIMITER_TIMEOUT_MS = 3_000;

const local = new Map<string, { count: number; resetAt: number }>();

export function localRateLimit(
  key: string,
  now = Date.now(),
  store = local,
  maxKeys = MAX_LOCAL_RATE_LIMIT_KEYS,
): boolean {
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    if (entry) store.delete(key);

    if (store.size >= maxKeys) {
      for (const [storedKey, storedEntry] of store) {
        if (now > storedEntry.resetAt) store.delete(storedKey);
      }
      const boundedMax = Math.max(1, maxKeys);
      while (store.size >= boundedMax) {
        const oldestKey = store.keys().next().value;
        if (oldestKey === undefined) break;
        store.delete(oldestKey);
      }
    }

    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export function isDurableLimiterConfigured(
  env: Record<string, string | undefined> = process.env as Record<
    string,
    string | undefined
  >,
): boolean {
  return Boolean(
    env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN,
  );
}

type RateLimitOptions = {
  env?: Record<string, string | undefined>;
  fetcher?: typeof fetch;
};

/**
 * Shared counter via one atomic Upstash transaction. Incrementing and setting
 * the expiry in separate requests can leave a permanent key when the second
 * request fails. Refreshing the expiry here creates a simple sliding window:
 * a caller is allowed again WINDOW_MS after their latest attempt.
 *
 * If Redis is unreachable, the per-instance limiter remains as a bounded
 * fallback rather than removing protection entirely.
 */
export async function durableRateLimit(
  key: string,
  options: RateLimitOptions = {},
): Promise<boolean> {
  const env = options.env ?? process.env;
  const fetcher = options.fetcher ?? fetch;
  const url = env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return localRateLimit(key);

  try {
    const redisKey = `enquiry:${encodeURIComponent(key).slice(0, 180)}`;
    const res = await fetcher(`${url}/multi-exec`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(LIMITER_TIMEOUT_MS),
      body: JSON.stringify([
        ["INCR", redisKey],
        ["PEXPIRE", redisKey, WINDOW_MS],
      ]),
    });
    if (!res.ok) throw new Error("limiter_request_failed");
    const result = (await res.json()) as
      | [{ result?: number; error?: string }, { result?: number; error?: string }]
      | { error?: string };
    if (!Array.isArray(result)) throw new Error("limiter_transaction_failed");

    const [increment, expiry] = result;
    if (
      increment.error ||
      expiry.error ||
      typeof increment.result !== "number" ||
      expiry.result !== 1
    ) {
      throw new Error("limiter_command_failed");
    }
    return increment.result > MAX_PER_WINDOW;
  } catch {
    // Do not log the key/IP or provider response body.
    console.error("[enquiry] durable rate limiter unavailable; using local fallback.");
    return localRateLimit(key);
  }
}

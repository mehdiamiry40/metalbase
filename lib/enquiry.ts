/* ------------------------------------------------------------------
   Pure enquiry logic — no framework, no I/O, so it can be unit tested.
   The route handler is a thin shell around this.
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
  /** Honeypot: must be empty. */
  website?: unknown;
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
} as const;

/** Trim, cap length, and strip control characters. */
export function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  // strip control characters, then trim and cap
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
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
  };
}

export function validate(data: CleanEnquiry): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Tell us your name.";
  if (!data.email) errors.email = "We need an email to reply to.";
  else if (!isEmail(data.email)) errors.email = "That email doesn't look right.";
  if (!data.phone) errors.phone = "A phone number gets you a faster answer.";
  if (!data.enquiryType) errors.enquiryType = "Pick what you need.";
  return errors;
}

export function formatSummary(data: CleanEnquiry): string {
  return [
    `Enquiry type: ${data.enquiryType}`,
    `Name: ${data.name}`,
    data.company && `Company: ${data.company}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    data.suburb && `Suburb: ${data.suburb}`,
    data.volume && `Volume: ${data.volume}`,
    data.materials.length > 0 && `Materials: ${data.materials.join(", ")}`,
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

const local = new Map<string, { count: number; resetAt: number }>();

export function localRateLimit(
  key: string,
  now = Date.now(),
  store = local,
): boolean {
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
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

/**
 * Shared counter via Upstash's REST API — INCR then EXPIRE on first hit.
 * Fails open: if Redis is unreachable we would rather accept a genuine
 * enquiry than drop it.
 */
export async function durableRateLimit(key: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return localRateLimit(key);

  try {
    const headers = { Authorization: `Bearer ${token}` };
    const res = await fetch(`${url}/incr/enquiry:${encodeURIComponent(key)}`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Upstash INCR ${res.status}`);
    const { result } = (await res.json()) as { result: number };

    if (result === 1) {
      await fetch(
        `${url}/expire/enquiry:${encodeURIComponent(key)}/${Math.ceil(WINDOW_MS / 1000)}`,
        { headers, cache: "no-store" },
      );
    }
    return result > MAX_PER_WINDOW;
  } catch (err) {
    console.error("[enquiry] rate limiter unavailable, failing open:", err);
    return false;
  }
}

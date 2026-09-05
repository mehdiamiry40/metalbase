import { MAX_ENQUIRY_BODY_BYTES } from "./enquiry-config";

export class EnquiryRequestError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}

export async function readBoundedBody(
  request: Request,
  maxBytes = MAX_ENQUIRY_BODY_BYTES,
  timeoutMs = 10_000,
): Promise<string> {
  const declared = request.headers.get("content-length");
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > maxBytes)) {
    throw new EnquiryRequestError(413, "This enquiry is too large. Reduce the photos or text.");
  }
  if (!request.body) throw new EnquiryRequestError(400, "Malformed request.");
  const reader = request.body.getReader();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new EnquiryRequestError(408, "The upload took too long. Please try again.")), timeoutMs);
  });
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) throw new EnquiryRequestError(413, "This enquiry is too large. Reduce the photos or text.");
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch (error) {
    void reader.cancel().catch(() => {});
    if (error instanceof EnquiryRequestError) throw error;
    throw new EnquiryRequestError(400, "Malformed request.");
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}

export async function readEnquiryJson(request: Request): Promise<unknown> {
  const text = await readBoundedBody(request);
  try { return JSON.parse(text); }
  catch { throw new EnquiryRequestError(400, "Malformed request."); }
}

export function isAllowedEnquiryOrigin(request: Request): boolean {
  if (request.headers.get("sec-fetch-site")?.toLowerCase() === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try { return new URL(origin).origin === new URL(request.url).origin; }
  catch { return false; }
}

export const SUBMISSION_KEY = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

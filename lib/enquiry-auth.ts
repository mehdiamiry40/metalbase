import { timingSafeEqual } from "node:crypto";

export function authorisedEnquiryWorker(request: Request, secret = process.env.CRON_SECRET): boolean {
  if (!secret?.trim() || secret.length < 32) return false;
  const supplied = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

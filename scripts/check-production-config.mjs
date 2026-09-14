import env from "@next/env";

env.loadEnvConfig(process.cwd());
if (process.env.VERCEL_ENV === "production") {
  const missing = ["DATABASE_URL", "CRON_SECRET"].filter((key) => !process.env[key]?.trim());
  if ((process.env.CRON_SECRET?.length ?? 0) < 32 && !missing.includes("CRON_SECRET")) missing.push("CRON_SECRET (minimum 32 characters)");
  if (process.env.RESEND_API_KEY?.trim()) {
    if (!process.env.ENQUIRY_FROM?.trim() || /@resend\.dev>?\s*$/.test(process.env.ENQUIRY_FROM)) missing.push("ENQUIRY_FROM (verified sender)");
    // RESEND_WEBHOOK_SECRET is not a release gate. Sending works without it;
    // only delivery confirmation is lost, and the webhook route already fails
    // closed with a 503 rather than trusting an unverified payload.
    if (!process.env.RESEND_WEBHOOK_SECRET?.trim()) console.warn("Warning: RESEND_WEBHOOK_SECRET is unset. Enquiry delivery and bounce tracking stay off until it is configured.");
  } else if (!process.env.ENQUIRY_WEBHOOK_URL?.trim()) {
    missing.push("RESEND_API_KEY or ENQUIRY_WEBHOOK_URL");
  }
  if (missing.length) {
    console.error(`Production enquiry configuration is incomplete: ${missing.join(", ")}.`);
    process.exit(1);
  }
}

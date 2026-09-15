import env from "@next/env";

env.loadEnvConfig(process.cwd());
if (process.env.VERCEL_ENV === "production") {
  const missing = ["DATABASE_URL", "CRON_SECRET"].filter((key) => !process.env[key]?.trim());
  if ((process.env.CRON_SECRET?.length ?? 0) < 32 && !missing.includes("CRON_SECRET")) missing.push("CRON_SECRET (minimum 32 characters)");
  if (process.env.RESEND_API_KEY?.trim()) {
    if (!process.env.ENQUIRY_FROM?.trim() || /@resend\.dev>?\s*$/.test(process.env.ENQUIRY_FROM)) missing.push("ENQUIRY_FROM (verified sender)");
  } else if (!process.env.ENQUIRY_WEBHOOK_URL?.trim()) {
    missing.push("RESEND_API_KEY or ENQUIRY_WEBHOOK_URL");
  }
  if (missing.length) {
    console.error(`Production enquiry configuration is incomplete: ${missing.join(", ")}.`);
    process.exit(1);
  }
}

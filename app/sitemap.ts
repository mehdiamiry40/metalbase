import type { MetadataRoute } from "next";
import { regions } from "@/lib/regions";
import { LAUNCH_READY, PUBLISH_RATES, SITE, services } from "@/lib/site";

/**
 * The base URL here used to be hardcoded to https://www.metalbase.com.au
 * while every canonical, Open Graph tag and JSON-LD block pointed at
 * the Vercel origin. A sitemap that lists URLs on a different host than
 * the one serving it is rejected outright — so the site was publishing
 * a sitemap Google could not use, silently, with no error anywhere.
 * It now reads the single SITE constant that canonicals also use, so
 * the two cannot drift apart again.
 *
 * `lastModified: new Date()` is deliberately NOT used. Stamping every
 * URL with the build time tells crawlers the entire site changed on
 * every deploy, which is false and trains them to discount the signal.
 * Pages carry a fixed review date; only the pricing guide claims to change
 * often, because only it genuinely does.
 */

const CONTENT_REVIEWED = new Date("2026-08-03");

const routes: {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
}[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/what-we-buy", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
  {
    path: "/prices",
    priority: 0.8,
    changeFrequency: PUBLISH_RATES ? "daily" : "monthly",
  },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/locations", priority: 0.7, changeFrequency: "monthly" },
  { path: "/glossary", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sustainability", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/legal", priority: 0.3, changeFrequency: "monthly" },
];

export function createSitemap(
  launchReady = LAUNCH_READY,
): MetadataRoute.Sitemap {
  if (!launchReady) return [];

  return [
    ...routes.map((r) => ({
      url: `${SITE}${r.path}`,
      lastModified: CONTENT_REVIEWED,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: `${SITE}/services/${s.slug}`,
      lastModified: CONTENT_REVIEWED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...regions.map((region) => ({
      url: `${SITE}/locations/${region.slug}`,
      lastModified: new Date(region.reviewedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap();
}

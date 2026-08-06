import type { MetadataRoute } from "next";
import { regionHref, regions } from "@/lib/regions";
import {
  PUBLISH_RATES,
  SEARCH_INDEXING_ENABLED,
  SITE,
  serviceHref,
  services,
} from "@/lib/site";

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
const BRISBANE_SEARCH_PAGES_REVIEWED = new Date("2026-08-07");

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
  indexingEnabled = SEARCH_INDEXING_ENABLED,
): MetadataRoute.Sitemap {
  if (!indexingEnabled) return [];

  return [
    ...routes.map((r) => ({
      url: `${SITE}${r.path}`,
      lastModified:
        r.path === "" ? BRISBANE_SEARCH_PAGES_REVIEWED : CONTENT_REVIEWED,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: `${SITE}${serviceHref(s)}`,
      lastModified:
        s.slug === "collection-and-bins"
          ? BRISBANE_SEARCH_PAGES_REVIEWED
          : CONTENT_REVIEWED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...regions.map((region) => ({
      url: `${SITE}${regionHref(region)}`,
      lastModified:
        region.slug === "brisbane"
          ? BRISBANE_SEARCH_PAGES_REVIEWED
          : new Date(region.reviewedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap();
}

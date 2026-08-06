import type { MetadataRoute } from "next";
import { SEARCH_INDEXING_ENABLED, SITE } from "@/lib/site";

/**
 * The sitemap URL here was hardcoded to www.metalbase.com.au, a host
 * that does not serve this site — so the one pointer telling crawlers
 * where the sitemap lives sent them somewhere that does not resolve.
 * Same root cause as the sitemap's own base URL: a domain written from
 * memory in two files instead of read from one constant.
 *
 * /api/ is disallowed because the enquiry endpoint is POST-only and has
 * nothing worth crawling; excluding it also stops bots burning through
 * the rate limiter.
 */
export function createRobots(
  indexingEnabled = SEARCH_INDEXING_ENABLED,
): MetadataRoute.Robots {
  const output: MetadataRoute.Robots = {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
  };

  /* Keep pages crawlable in both modes so crawlers can observe page-level
     indexing directives. Advertise the sitemap when search visibility is on. */
  if (indexingEnabled) output.sitemap = `${SITE}/sitemap.xml`;

  return output;
}

export default function robots(): MetadataRoute.Robots {
  return createRobots();
}

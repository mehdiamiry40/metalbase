import type { MetadataRoute } from "next";
import { LAUNCH_READY, SITE } from "@/lib/site";

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
export function createRobots(launchReady = LAUNCH_READY): MetadataRoute.Robots {
  const output: MetadataRoute.Robots = {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
  };

  /* Do not block an unfinished site in robots.txt: crawlers must be able to
     fetch a page to observe its noindex directive. The sitemap invitation,
     however, is only published once the business is launch-ready. */
  if (launchReady) output.sitemap = `${SITE}/sitemap.xml`;

  return output;
}

export default function robots(): MetadataRoute.Robots {
  return createRobots();
}

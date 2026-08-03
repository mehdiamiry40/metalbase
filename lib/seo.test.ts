import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { createRobots } from "@/app/robots";
import { createSitemap } from "@/app/sitemap";
import {
  generateMetadata as generateRegionMetadata,
  generateStaticParams as generateRegionStaticParams,
} from "@/app/locations/[slug]/page";
import {
  ORGANIZATION_ID,
  areaGuideSchemaData,
  serviceSchemaData,
} from "@/components/Schema";
import { pageMetadata } from "@/lib/metadata";
import { regions } from "@/lib/regions";
import { SITE, services } from "@/lib/site";

const EXPECTED_REGION_SLUGS = [
  "brisbane",
  "gold-coast",
  "logan",
  "ipswich",
  "redlands",
] as const;

/* ------------------------------------------------------------------
   Guards the SEO defects this project actually shipped, rather than a
   generic checklist.

   1. A canonical in the ROOT LAYOUT cascades to every page that does
      not override it. `alternates: { canonical: "/" }` sat in
      app/layout.tsx, so nine inner pages told Google they were
      duplicates of the home page and should be dropped from the index.
      Nothing failed. The build was clean, the pages rendered, and the
      only symptom would have been the site quietly not ranking.

   2. The sitemap and robots.txt both hardcoded a different host from
      the one serving the site, so the sitemap was unusable and the
      pointer to it led nowhere.

   Both are invisible at runtime, which is exactly why they need tests.
   ------------------------------------------------------------------ */

const root = resolve(__dirname, "..");

function pageFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      if (entry.name === "page.tsx") acc.push(dir);
      continue;
    }
    if (entry.name === "api") continue;
    pageFiles(join(dir, entry.name), acc);
  }
  if (existsSync(join(dir, "page.tsx")) && !acc.includes(dir)) acc.push(dir);
  return acc;
}

describe("canonical URLs", () => {
  const appDir = join(root, "app");
  const dirs = pageFiles(appDir);

  it("finds the pages, so the walker cannot silently match nothing", () => {
    expect(dirs.length).toBeGreaterThanOrEqual(10);
  });

  it("never sets a canonical in the root layout", () => {
    const layout = readFileSync(join(appDir, "layout.tsx"), "utf8");
    // Strip comments — the explanation of this bug mentions the word.
    const code = layout
      .replace(/\/\*[\s\S]*?\*\//g, " ")
      .replace(/^\s*\/\/.*$/gm, " ");
    expect(code).not.toMatch(/alternates/);
  });

  it("gives every page its own canonical", () => {
    const missing = dirs
      .filter((d) => {
        const src = readFileSync(join(d, "page.tsx"), "utf8");
        return !/\bpageMetadata\s*\(|canonical\s*:/.test(src);
      })
      .map((d) => d.replace(root, ""));
    expect(missing).toEqual([]);
  });
});

describe("sitemap and robots", () => {
  it("both derive their host from the single SITE constant", () => {
    for (const f of ["app/sitemap.ts", "app/robots.ts"]) {
      const src = readFileSync(join(root, f), "utf8");
      const code = src
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/^\s*\/\/.*$/gm, " ");
      // No bare origin literal outside of comments.
      expect(code, `${f} hardcodes a host`).not.toMatch(/https?:\/\/[a-z]/i);
      expect(code, `${f} does not import SITE`).toMatch(/\bSITE\b/);
    }
  });

  it("keeps unfinished pages crawlable for noindex but omits discovery", () => {
    const robots = createRobots(false);
    expect(robots.rules).toMatchObject({ allow: "/", disallow: ["/api/"] });
    expect(robots.sitemap).toBeUndefined();
    expect(createSitemap(false)).toEqual([]);
  });

  it("publishes the complete sitemap only after launch", () => {
    const robots = createRobots(true);
    expect(robots.sitemap).toBe(`${SITE}/sitemap.xml`);

    const sitemap = createSitemap(true);
    expect(sitemap).toContainEqual(
      expect.objectContaining({ url: `${SITE}/what-we-buy` }),
    );
    for (const service of services) {
      expect(sitemap).toContainEqual(
        expect.objectContaining({ url: `${SITE}/services/${service.slug}` }),
      );
    }
    for (const slug of EXPECTED_REGION_SLUGS) {
      const url = `${SITE}/locations/${slug}`;
      expect(sitemap.filter((entry) => entry.url === url)).toHaveLength(1);
    }
  });
});

describe("regional search pages", () => {
  it("builds exactly the five requested region routes", () => {
    expect(generateRegionStaticParams().map(({ slug }) => slug)).toEqual(
      EXPECTED_REGION_SLUGS,
    );
    expect(regions.map(({ slug }) => slug)).toEqual(EXPECTED_REGION_SLUGS);
  });

  it("gives every region a unique self-canonical search identity", async () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const slug of EXPECTED_REGION_SLUGS) {
      const region = regions.find((item) => item.slug === slug)!;
      const path = `/locations/${slug}`;
      const metadata = await generateRegionMetadata({
        params: Promise.resolve({ slug }),
      });
      const openGraph = metadata.openGraph as Record<string, unknown>;
      const twitter = metadata.twitter as Record<string, unknown>;

      expect(metadata.alternates?.canonical).toBe(path);
      expect(String(openGraph.url)).toBe(`${SITE}${path}`);
      expect(metadata.title).toBe(region.seoTitle);
      expect(metadata.description).toBe(region.seoDescription);
      expect(openGraph.title).toBe(region.seoTitle);
      expect(openGraph.description).toBe(region.seoDescription);
      expect(twitter.title).toBe(region.seoTitle);
      expect(twitter.description).toBe(region.seoDescription);
      expect(region.seoTitle).toContain(region.name);
      expect(path).not.toMatch(/[?#]|\/$/);

      titles.add(region.seoTitle);
      descriptions.add(region.seoDescription);
    }

    expect(titles.size).toBe(EXPECTED_REGION_SLUGS.length);
    expect(descriptions.size).toBe(EXPECTED_REGION_SLUGS.length);
  });

  it("describes a guide about a place, never a fabricated branch", () => {
    for (const region of regions) {
      const data = areaGuideSchemaData({
        slug: region.slug,
        name: region.name,
        title: region.h1,
        description: region.seoDescription,
      });
      const serialised = JSON.stringify(data);

      expect(data).toMatchObject({
        "@type": "WebPage",
        url: `${SITE}/locations/${region.slug}`,
        about: { "@type": "Place", name: region.name },
        publisher: { "@id": ORGANIZATION_ID },
      });
      expect(serialised).not.toMatch(
        /LocalBusiness|RecyclingCenter|PostalAddress|GeoCoordinates|hasMap|openingHours|areaServed/,
      );
    }
  });

  it("keeps regional copy useful and free of false physical-presence claims", () => {
    for (const region of regions) {
      const copy = JSON.stringify(region);
      expect(region.places.length).toBeGreaterThanOrEqual(6);
      expect(region.details).toHaveLength(4);
      expect(region.focusPoints.length).toBeGreaterThanOrEqual(3);
      expect(copy).not.toMatch(
        /our (?:yard|depot|branch|office)|visit us in|drop off at our/i,
      );
    }
  });
});

describe("page metadata", () => {
  it("keeps canonical, Open Graph and Twitter identity page-specific", () => {
    const metadata = pageMetadata({
      path: "/prices/",
      title: "Scrap pricing guide",
      description: "How scrap pricing works.",
    });

    expect(metadata.alternates?.canonical).toBe("/prices");
    expect(metadata.openGraph).toMatchObject({
      title: "Scrap pricing guide",
      description: "How scrap pricing works.",
    });
    expect(String(metadata.openGraph?.url)).toBe(`${SITE}/prices`);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Scrap pricing guide",
      description: "How scrap pricing works.",
    });
  });

  it("rejects paths that could create an external or fragment canonical", () => {
    const base = { title: "Title", description: "Description" };
    expect(() => pageMetadata({ ...base, path: "https://example.com" })).toThrow();
    expect(() => pageMetadata({ ...base, path: "//example.com/page" })).toThrow();
    expect(() => pageMetadata({ ...base, path: "/prices#board" })).toThrow();
  });
});

describe("service schema launch guard", () => {
  const input = {
    name: "Collection",
    description: "Collection options.",
    slug: "collection-and-bins",
    verified: true,
  };

  it("emits no unverified Service claim before launch", () => {
    expect(serviceSchemaData(input, false)).toBeNull();
  });

  it("emits no Service claim for a capability that is not verified", () => {
    expect(serviceSchemaData({ ...input, verified: false }, true)).toBeNull();
  });

  it("connects a verified service to the stable organisation identity", () => {
    const data = serviceSchemaData(input, true);
    expect(data).toMatchObject({
      "@type": "Service",
      url: `${SITE}/services/collection-and-bins`,
      provider: {
        "@type": "RecyclingCenter",
        "@id": ORGANIZATION_ID,
      },
    });
  });
});

describe("homepage search intent", () => {
  const homepage = readFileSync(join(root, "app/page.tsx"), "utf8");

  it("has one descriptive H1 and unique homepage metadata", () => {
    expect(homepage.match(/<h1\b/g)?.length).toBe(1);
    expect(homepage).toContain(
      "Scrap Metal Quotes South East Queensland | MetalBase",
    );
    expect(homepage).toContain("description: homeDescription");
    expect(homepage).toMatch(/pageMetadata\s*\(/);
  });

  it("links to every core customer-intent guide", () => {
    for (const href of [
      "/contact",
      "/what-we-buy",
      "/prices",
      "/services",
      "/locations",
      "/glossary",
      "/faq",
    ]) {
      expect(homepage, `homepage does not link to ${href}`).toContain(href);
    }
  });

  it("does not publish an obsolete meta-keywords field", () => {
    const layout = readFileSync(join(root, "app/layout.tsx"), "utf8");
    expect(layout).not.toMatch(/\bkeywords\s*:/);
  });
});

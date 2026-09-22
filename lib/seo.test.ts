import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { createRobots } from "@/app/robots";
import { createSitemap } from "@/app/sitemap";
import { metadata as scrapMetalBrisbaneMetadata } from "@/app/scrap-metal-brisbane/page";
import { metadata as scrapRemovalBrisbaneMetadata } from "@/app/scrap-removal-brisbane/page";
import {
  generateMetadata as generateRegionMetadata,
  generateStaticParams as generateRegionStaticParams,
} from "@/app/locations/[slug]/page";
import {
  generateMetadata as generateMaterialMetadata,
  generateStaticParams as generateMaterialStaticParams,
} from "@/app/materials/[slug]/page";
import {
  generateMetadata as generatePostMetadata,
  generateStaticParams as generatePostStaticParams,
} from "@/app/blog/[slug]/page";
import {
  ORGANIZATION_ID,
  areaGuideSchemaData,
  rootOrganizationSchemaData,
  serviceSchemaData,
} from "@/components/Schema";
import { pageMetadata } from "@/lib/metadata";
import { postHref, posts } from "@/lib/blog";
import { materialHref, materials } from "@/lib/materials";
import { REGION_SLUGS, regionHref, regions } from "@/lib/regions";
import { SITE, operations, serviceHref, services } from "@/lib/site";

const EXPECTED_REGION_SLUGS = [
  "brisbane",
  "gold-coast",
  "sunshine-coast",
  "logan",
  "ipswich",
  "redlands",
] as const;

const EXPECTED_POST_SLUGS = [
  "what-changes-a-scrap-metal-quote",
  "sorting-scrap-metal-on-site",
  "scrap-metal-paperwork-queensland",
  "scrap-metal-recycling-process-brisbane",
  "scrap-metal-bin-hire-brisbane",
  "demolition-metal-recovery-brisbane",
  "scrap-metal-collection-tradies-brisbane",
] as const;

const EXPECTED_MATERIAL_SLUGS = [
  "copper",
  "cable",
  "aluminium",
  "brass",
  "steel",
  "stainless-steel",
  "electric-motors",
  "radiators",
  "whitegoods",
  "lead",
  "zinc",
  "swarf",
  "gas-bottles",
  "cast-iron",
  "hot-water-systems",
  "car-bodies",
  "e-waste",
  "transformers",
  "batteries",
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
        expect.objectContaining({ url: `${SITE}${serviceHref(service)}` }),
      );
    }
    for (const material of materials) {
      expect(sitemap).toContainEqual(
        expect.objectContaining({ url: `${SITE}${materialHref(material)}` }),
      );
    }
    for (const region of regions) {
      const url = `${SITE}${regionHref(region)}`;
      expect(sitemap.filter((entry) => entry.url === url)).toHaveLength(1);
    }
    expect(sitemap).toContainEqual(
      expect.objectContaining({ url: `${SITE}/blog` }),
    );
    for (const post of posts) {
      const url = `${SITE}${postHref(post)}`;
      expect(sitemap.filter((entry) => entry.url === url)).toHaveLength(1);
    }
    expect(sitemap).not.toContainEqual(
      expect.objectContaining({ url: `${SITE}/locations/brisbane` }),
    );
    expect(sitemap).not.toContainEqual(
      expect.objectContaining({ url: `${SITE}/services/collection-and-bins` }),
    );
  });
});

describe("material search guides", () => {
  it("builds the six high-intent material routes", () => {
    expect(generateMaterialStaticParams().map(({ slug }) => slug)).toEqual(
      EXPECTED_MATERIAL_SLUGS,
    );
    expect(materials.map(({ slug }) => slug)).toEqual(EXPECTED_MATERIAL_SLUGS);
  });

  it("gives every material a unique self-canonical search identity", async () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const slug of EXPECTED_MATERIAL_SLUGS) {
      const material = materials.find((item) => item.slug === slug)!;
      const path = materialHref(material);
      const metadata = await generateMaterialMetadata({
        params: Promise.resolve({ slug }),
      });
      const openGraph = metadata.openGraph as Record<string, unknown>;

      expect(metadata.alternates?.canonical).toBe(path);
      expect(String(openGraph.url)).toBe(`${SITE}${path}`);
      expect(metadata.title).toBe(material.seoTitle);
      expect(metadata.description).toBe(material.seoDescription);
      expect(material.seoTitle.toLowerCase()).toContain(
        material.shortName.toLowerCase(),
      );
      expect(path).not.toMatch(/[?#]|\/$/);

      titles.add(material.seoTitle);
      descriptions.add(material.seoDescription);
    }

    expect(titles.size).toBe(EXPECTED_MATERIAL_SLUGS.length);
    expect(descriptions.size).toBe(EXPECTED_MATERIAL_SLUGS.length);
  });

  it("links every material guide from both discovery pages", () => {
    const home = readFileSync(join(root, "app/page.tsx"), "utf8");
    const hub = readFileSync(join(root, "app/what-we-buy/page.tsx"), "utf8");

    for (const material of materials) {
      expect(home).toContain(materialHref(material));
    }
    expect(hub).toContain("materials.map");
    expect(hub).toContain("materialHref(material)");
  });

  it("keeps rates and public-yard claims out of the guide template", () => {
    const page = readFileSync(
      join(root, "app/materials/[slug]/page.tsx"),
      "utf8",
    );

    expect(page).toContain("does not publish a generic rate");
    expect(page).toContain("no public customer drop-off location");
    expect(page).toContain("<FaqSchema");
  });
});

describe("articles", () => {
  it("builds exactly the published article routes", () => {
    expect(generatePostStaticParams().map(({ slug }) => slug)).toEqual(
      EXPECTED_POST_SLUGS,
    );
    expect(posts.map(({ slug }) => slug)).toEqual(EXPECTED_POST_SLUGS);
  });

  it("gives every article a unique self-canonical search identity", async () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const slug of EXPECTED_POST_SLUGS) {
      const post = posts.find((item) => item.slug === slug)!;
      const path = postHref(post);
      const metadata = await generatePostMetadata({
        params: Promise.resolve({ slug }),
      });
      const openGraph = metadata.openGraph as Record<string, unknown>;

      expect(metadata.alternates?.canonical).toBe(path);
      expect(String(openGraph.url)).toBe(`${SITE}${path}`);
      expect(metadata.title).toBe(post.seoTitle);
      expect(metadata.description).toBe(post.seoDescription);
      expect(path).not.toMatch(/[?#]|\/$/);

      titles.add(post.seoTitle);
      descriptions.add(post.seoDescription);
    }

    expect(titles.size).toBe(EXPECTED_POST_SLUGS.length);
    expect(descriptions.size).toBe(EXPECTED_POST_SLUGS.length);
  });

  it("carries a sortable publication date the sitemap can reuse", () => {
    for (const post of posts) {
      expect(post.published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(post.published))).toBe(false);
    }
  });

  it("links every article from the index", () => {
    const index = readFileSync(join(root, "app/blog/page.tsx"), "utf8");
    expect(index).toContain("posts.map");
    expect(index).toContain("postHref(post)");
  });

  it("keeps rates and public-yard claims out of the article template", () => {
    const page = readFileSync(join(root, "app/blog/[slug]/page.tsx"), "utf8");

    expect(page).toContain("No published rate on this article");
    expect(page).toContain("<FaqSchema");
    expect(page).not.toMatch(/\$\d|per tonne|per kilo/i);
  });
});

describe("regional search pages", () => {
  it("builds exactly the six verified region routes", () => {
    expect(REGION_SLUGS).toEqual(EXPECTED_REGION_SLUGS);
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
      const path = regionHref(region);
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

describe("Brisbane search landing pages", () => {
  const targets = [
    {
      path: "/scrap-metal-brisbane",
      phrase: "Scrap Metal Brisbane",
      metadata: scrapMetalBrisbaneMetadata,
      source: readFileSync(
        join(root, "app/scrap-metal-brisbane/page.tsx"),
        "utf8",
      ),
    },
    {
      path: "/scrap-removal-brisbane",
      phrase: "Scrap Removal Brisbane",
      metadata: scrapRemovalBrisbaneMetadata,
      source: readFileSync(
        join(root, "app/scrap-removal-brisbane/page.tsx"),
        "utf8",
      ),
    },
  ] as const;

  it("assigns one self-canonical page to each keyword intent", () => {
    for (const target of targets) {
      expect(target.metadata.alternates?.canonical).toBe(target.path);
      expect(String(target.metadata.openGraph?.url)).toBe(`${SITE}${target.path}`);
      expect(String(target.metadata.title)).toContain(target.phrase);
      expect(target.source.match(/<PageHeader\b/g)).toHaveLength(1);
      expect(target.source).toContain(`path: "${target.path}"`);
    }
  });

  it("links the two distinct intents to each other and to conversion pages", () => {
    for (const target of targets) {
      for (const href of ["/contact", "/what-we-buy"]) {
        expect(target.source, `${target.path} does not link to ${href}`).toContain(
          href,
        );
      }
    }
    expect(targets[0].source).toContain("/scrap-removal-brisbane");
    expect(targets[1].source).toContain("/scrap-metal-brisbane");
  });

  it("states that MetalBase has no public customer location", () => {
    for (const target of targets) {
      expect(target.source).toContain("no public customer drop-off location");
    }
  });

  it("permanently consolidates the superseded overlapping URLs", () => {
    const config = readFileSync(join(root, "next.config.mjs"), "utf8");
    expect(config).toContain('source: "/locations/brisbane"');
    expect(config).toContain('destination: "/scrap-metal-brisbane"');
    expect(config).toContain('source: "/services/collection-and-bins"');
    expect(config).toContain('destination: "/scrap-removal-brisbane"');
    expect(config.match(/permanent: true/g)).toHaveLength(2);
  });
});

describe("root organization schema", () => {
  it("describes a service-area LocalBusiness with verified contact hours", () => {
    const data = rootOrganizationSchemaData();
    const serialised = JSON.stringify(data);

    expect(data).toMatchObject({
      "@type": "LocalBusiness",
      "@id": ORGANIZATION_ID,
      taxID: "62 351 619 456",
      telephone: "+61494434509",
      areaServed: operations.serviceRegions.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "17:00",
        },
      ],
    });
    expect(serialised).not.toMatch(
      /RecyclingCenter|PostalAddress|aggregateRating|priceRange|sameAs/,
    );
  });
});

describe("verified mobile service schema", () => {
  const input = {
    name: "Collection",
    description: "Collection options.",
    slug: "collection-and-bins",
    verified: true,
  };

  it("emits no Service claim for a capability that is not verified", () => {
    expect(serviceSchemaData({ ...input, verified: false })).toBeNull();
  });

  it("connects the verified service to the organisation and service regions", () => {
    const data = serviceSchemaData(input);
    expect(data).toMatchObject({
      "@type": "Service",
      url: `${SITE}/scrap-removal-brisbane`,
      provider: {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
      },
      areaServed: operations.serviceRegions.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
    });
    expect(JSON.stringify(data)).not.toMatch(
      /LocalBusiness|RecyclingCenter|PostalAddress|openingHours|aggregateRating/,
    );
  });
});

describe("homepage search intent", () => {
  const homepage = readFileSync(join(root, "app/page.tsx"), "utf8");

  it("has one descriptive H1 and unique homepage metadata", () => {
    expect(homepage.match(/<h1\b/g)?.length).toBe(1);
    expect(homepage).toContain(
      "MetalBase | Scrap Metal Quotes Across Brisbane & SEQ",
    );
    expect(homepage).toContain("description: homeDescription");
    expect(homepage).toMatch(/pageMetadata\s*\(/);
  });

  it("keeps one primary hero CTA and front-loads verified trust signals", () => {
    expect(homepage).toContain('<Button href="/contact">Get a quote</Button>');
    expect(homepage).toContain(
      '<ArrowLink href="/what-we-buy">Explore metals</ArrowLink>',
    );
    expect(homepage).not.toContain(
      '<Button href="/what-we-buy" variant="ghost">Explore metals</Button>',
    );
    expect(homepage).toContain("ABN {company.abn}");
    expect(homepage).toContain("Brisbane &amp; SEQ service area");
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
      "/scrap-metal-brisbane",
      "/scrap-removal-brisbane",
    ]) {
      expect(homepage, `homepage does not link to ${href}`).toContain(href);
    }
  });

  it("does not publish an obsolete meta-keywords field", () => {
    const layout = readFileSync(join(root, "app/layout.tsx"), "utf8");
    expect(layout).not.toMatch(/\bkeywords\s*:/);
  });
});

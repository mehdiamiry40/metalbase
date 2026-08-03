import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

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
        return !/canonical/.test(src);
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
});

describe("homepage search intent", () => {
  const homepage = readFileSync(join(root, "app/page.tsx"), "utf8");

  it("has one descriptive H1 and unique homepage metadata", () => {
    expect(homepage.match(/<h1\b/g)?.length).toBe(1);
    expect(homepage).toContain("Scrap Metal Quotes Brisbane | MetalBase");
    expect(homepage).toContain("description: homeDescription");
    expect(homepage).toContain("openGraph:");
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

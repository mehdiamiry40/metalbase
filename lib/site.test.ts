import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  LAUNCH_READY,
  PUBLISH_RATES,
  company,
  locations,
  nav,
  priceGroups,
  services,
} from "./site";

/* ------------------------------------------------------------------
   These guard the thing that actually went wrong on this project: the
   site shipping with invented business credentials. If someone puts a
   plausible-looking number back in without setting LAUNCH_READY, CI
   fails.
   ------------------------------------------------------------------ */

describe("launch guards", () => {
  it("does not claim an ABN or dealer licence unless launch-ready", () => {
    if (!LAUNCH_READY) {
      expect(company.abn).toBeNull();
      expect(company.licence).toBeNull();
    }
  });

  it("requires verified business facts before launch mode can be enabled", () => {
    if (LAUNCH_READY) {
      expect(company.abn?.trim()).toBeTruthy();
      expect(company.legal?.trim()).toBeTruthy();
      expect(company.licence?.trim()).toBeTruthy();
      expect(company.email?.trim()).toBeTruthy();
      expect(company.head?.trim()).toBeTruthy();
      expect(company.phone?.trim()).toBeTruthy();
      expect(company.phoneLabel?.trim()).toBeTruthy();
      expect(company.priceDate?.trim()).toBeTruthy();
      expect(locations.length).toBeGreaterThan(0);
    }
  });

  it("does not publish rates unless PUBLISH_RATES is set", () => {
    if (!PUBLISH_RATES) {
      const withRates = priceGroups.flatMap((g) =>
        g.rows.filter((r) => r.rate !== null),
      );
      expect(withRates).toEqual([]);
    }
  });

  it("requires a complete, dated rate board before rates can be published", () => {
    if (PUBLISH_RATES) {
      expect(company.priceDate?.trim()).toBeTruthy();
      for (const group of priceGroups) {
        for (const row of group.rows) {
          expect(row.rate?.trim()).toBeTruthy();
        }
      }
    }
  });

  it("every rate row has a real grade and spec", () => {
    for (const group of priceGroups) {
      for (const row of group.rows) {
        expect(row.grade.trim()).not.toBe("");
        expect(row.spec.trim()).not.toBe("");
        expect(["kg", "tonne"]).toContain(row.unit);
      }
    }
  });
});

describe("navigation integrity", () => {
  const internal = (href: string) => href.startsWith("/");

  it("has no empty labels or hrefs", () => {
    for (const item of nav) {
      expect(item.label.trim()).not.toBe("");
      expect(item.href).not.toBe("");
    }
  });

  /* The menu was 74 links deep. Keeping it flat is the whole point of
     the simplification, and a nav is exactly the thing that regrows a
     link at a time, so the ceiling is asserted rather than assumed. */
  it("stays a short flat list", () => {
    expect(nav.length).toBeLessThanOrEqual(5);
    for (const item of nav) {
      expect(Object.keys(item).sort()).toEqual(["href", "label"]);
    }
  });

  it("points only at routes that exist", () => {
    /* Routes are discovered from the filesystem, not listed by hand.
       The hardcoded list this replaces went stale the moment /faq was
       added: the page existed and worked, and the test failed anyway,
       which is the wrong failure — a test that has to be updated every
       time a route is added trains you to edit the test rather than
       read it. Reading app/ means adding a page is enough. */
    const appDir = resolve(__dirname, "../app");
    const found: string[] = [];
    (function walk(dir: string, prefix: string) {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        // route groups (grouping) and dynamic [slug] segments
        if (entry.name.startsWith("(") || entry.name.startsWith("[")) continue;
        if (entry.name === "api") continue;
        const child = join(dir, entry.name);
        const route = `${prefix}/${entry.name}`;
        if (existsSync(join(child, "page.tsx"))) found.push(route);
        walk(child, route);
      }
    })(appDir, "");

    const routes = new Set([
      "/",
      ...found,
      ...services.map((s) => `/services/${s.slug}`),
    ]);

    const hrefs = nav.map((i) => i.href);

    const broken = hrefs
      .filter(internal)
      .map((h) => h.split("#")[0])
      .filter((h) => !routes.has(h));

    expect([...new Set(broken)]).toEqual([]);
  });
});

/* ------------------------------------------------------------------
   Payment method is a commercial choice, not a legal one, and this
   site has got that wrong twice.

   The first version asserted a Queensland cash ban in five places. A
   commit corrected those, but two survived it — /locations said "if a
   yard offers you cash, they are breaking the law" and /prices said
   "anyone offering cash is operating outside the law" — and they
   stayed live for two more redesigns. Nothing caught them, because
   nothing was looking: the claim reads as confident, sober compliance
   copy, which is exactly why it survives review.

   Queensland's Second-hand Dealers and Pawnbrokers Act 2003 governs
   licensing, seller identity and records. It does not dictate how the
   money moves. Victoria and New South Wales ban cash for scrap;
   Queensland does not.

   So this asserts the property directly rather than trusting a sweep:
   no rendered string may tie a payment METHOD to a legal obligation,
   in either direction. Saying "cash is illegal" was the old bug;
   "cash is legally required" would be the same bug wearing the
   opposite hat.
   ------------------------------------------------------------------ */
describe("payment claims", () => {
  /* Comments are where the rule itself is written down, quoting the
     old offending strings verbatim. Scanning them would flag the
     documentation of the bug as the bug. */
  const stripComments = (src: string) =>
    src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*\/\/.*$/gm, " ");

  const sources = (dir: string, acc: string[] = []): string[] => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) sources(full, acc);
      else if (/\.tsx?$/.test(entry) && !entry.endsWith(".test.ts")) acc.push(full);
    }
    return acc;
  };

  const PAYMENT = /(cash|eft|electronic transfer|cheque)/i;
  /* Phrases that assert legal force. "not mandated either way by
     Queensland law" is the sanctioned wording and matches none of
     them, so the legal page's own disclaimer stays legal. */
  const LEGAL_FORCE = [
    "breaking the law",
    "outside the law",
    "prohibits cash",
    "cash is prohibited",
    "banned in queensland",
    "must be paid by",
    "legally required",
    "required by law",
    "law requires",
    "illegal",
  ];

  it("never claims a payment method is mandated or forbidden by law", () => {
    const root = resolve(__dirname, "..");
    const files = [...sources(join(root, "app")), ...sources(join(root, "lib"))];
    const offenders: string[] = [];

    for (const file of files) {
      const src = stripComments(readFileSync(file, "utf8"));
      for (const line of src.split("\n")) {
        if (!PAYMENT.test(line)) continue;
        const lower = line.toLowerCase();
        const hit = LEGAL_FORCE.find((p) => lower.includes(p));
        if (hit) offenders.push(`${file.replace(root + "/", "")}: "${hit}"`);
      }
    }

    expect(offenders).toEqual([]);
  });
});

describe("services", () => {
  it("have unique slugs", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("each carry at least three detail points", () => {
    for (const s of services) {
      expect(s.points.length).toBeGreaterThanOrEqual(3);
      expect(s.seoTitle.trim()).not.toBe("");
      expect(s.seoDescription.trim()).not.toBe("");
      expect(`${s.seoTitle} ${s.seoDescription}`).not.toMatch(
        /\benquir(?:y|ies)\s+enquiry\b/i,
      );
    }
  });

  it("does not verify service capabilities before the business launch facts", () => {
    if (!LAUNCH_READY) {
      expect(services.filter((service) => service.verified)).toEqual([]);
    }
  });
});

import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  LAUNCH_READY,
  PUBLISH_RATES,
  company,
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

  it("does not publish rates unless PUBLISH_RATES is set", () => {
    if (!PUBLISH_RATES) {
      const withRates = priceGroups.flatMap((g) =>
        g.rows.filter((r) => r.rate !== null),
      );
      expect(withRates).toEqual([]);
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
      for (const col of item.columns) {
        expect(col.label.trim()).not.toBe("");
        for (const child of col.children) {
          expect(child.label.trim()).not.toBe("");
          expect(child.href).not.toBe("");
        }
      }
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

    const hrefs = nav.flatMap((i) => [
      i.href,
      ...i.columns.flatMap((c) => [c.href, ...c.children.map((ch) => ch.href)]),
    ]);

    const broken = hrefs
      .filter(internal)
      .map((h) => h.split("#")[0])
      .filter((h) => !routes.has(h));

    expect([...new Set(broken)]).toEqual([]);
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
    }
  });
});

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
    const routes = new Set([
      "/",
      "/what-we-buy",
      "/prices",
      "/services",
      "/sustainability",
      "/locations",
      "/about",
      "/contact",
      "/legal",
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

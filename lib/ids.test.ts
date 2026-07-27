import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Guards against invalid HTML ids in the nav.
 *
 * The disclosure menus build their ids by interpolating the nav label:
 *
 *   aria-controls={`${uid}-panel-${item.label}`}
 *
 * Labels contain spaces ("Sell your scrap"), and an HTML id may not, so
 * the reference resolved to nothing and a screen reader could not follow
 * a trigger to its panel.
 *
 * It survived several axe audits because it only reproduces while a menu
 * is OPEN — a page at rest has every panel closed, and the mobile
 * variant is display:none at desktop width, which excludes it from the
 * audit entirely. Two separate id schemes had the bug (`-panel-`/
 * `-trigger-` and `-m-`) and fixing the first did not fix the second.
 *
 * So this asserts the property directly rather than trusting a sweep:
 * every id interpolated from a value must pass through slug().
 */

const header = readFileSync(
  join(process.cwd(), "components/Header.tsx"),
  "utf8",
);

/** `${uid}-<something>-${ ... }` — an id assembled from a runtime value. */
const INTERPOLATED_ID = /\$\{uid\}-[a-z]+-\$\{([^}]+)\}/g;

describe("nav element ids", () => {
  it("slugifies every id built from a nav label", () => {
    const offenders: string[] = [];
    for (const m of header.matchAll(INTERPOLATED_ID)) {
      const expr = m[1].trim();
      if (!expr.startsWith("slug(")) offenders.push(m[0]);
    }
    expect(offenders).toEqual([]);
  });

  it("finds the id sites at all, so the regex can't silently rot", () => {
    expect([...header.matchAll(INTERPOLATED_ID)].length).toBeGreaterThanOrEqual(
      4,
    );
  });

  it("slug produces ids that are valid HTML", () => {
    const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    for (const label of [
      "Sell your scrap",
      "What we buy",
      "About",
      "R&D / Testing",
    ]) {
      const id = slug(label);
      expect(id).not.toMatch(/\s/);
      expect(id).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

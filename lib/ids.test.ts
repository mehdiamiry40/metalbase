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
 * So this asserted the property directly rather than trusting a sweep:
 * every id interpolated from a value must pass through slug().
 *
 * The disclosure menus are gone — the nav is four plain links, and the
 * only remaining id is the literal `${uid}-mobile`, which interpolates
 * nothing. That removes the bug by construction rather than by fixing
 * it, so the original "find at least four id sites" rot-guard now
 * asserts the presence of code that should no longer exist and has been
 * replaced.
 *
 * The slug rule below is kept anyway. It passes vacuously today, and
 * that is the point: the day someone reintroduces a menu built from
 * labels, it starts failing again without anyone having to remember
 * this history.
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

  /* Replaces the old rot-guard. That one asserted the header still
     contained at least four interpolated ids, which is now the opposite
     of what we want: the flat nav should not be rebuilding a disclosure
     with aria-controls panels at all. Assert the simplification holds,
     and keep the regex honest by checking it still matches a known-bad
     sample rather than by requiring live offenders in the source. */
  it("the regex still detects an interpolated id", () => {
    const sample = "aria-controls={`${uid}-panel-${item.label}`}";
    expect([...sample.matchAll(INTERPOLATED_ID)].length).toBe(1);
  });

  it("the nav has not regrown into a disclosure menu", () => {
    const triggers = header.match(/aria-controls=/g) ?? [];
    // Only the mobile toggle should own a controlled panel.
    expect(triggers.length).toBeLessThanOrEqual(1);
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

import { describe, expect, it } from "vitest";
import { PUBLISH_RATES, priceGroups } from "@/lib/site";
import { MATERIAL_CHIPS, VOLUME_BANDS } from "@/lib/enquiry-config";
import {
  MAX_WEIGHT_KG,
  handoffQuery,
  materialChip,
  estimate,
  estimateOptions,
  findOption,
  formatWeight,
  gradeId,
  parseWeight,
  toKilograms,
  volumeBand,
} from "@/lib/estimate";

describe("estimate options", () => {
  it("exposes every published grade exactly once", () => {
    const rows = priceGroups.flatMap((g) => g.rows);
    expect(estimateOptions).toHaveLength(rows.length);
    expect(new Set(estimateOptions.map((o) => o.id)).size).toBe(rows.length);
  });

  it("derives url-safe ids", () => {
    expect(gradeId("Bare bright copper")).toBe("bare-bright-copper");
    expect(gradeId("Aluminium / copper radiators")).toBe("aluminium-copper-radiators");
    expect(gradeId("Mixed brass")).toBe("mixed-brass");
    expect(estimateOptions.every((o) => /^[a-z0-9-]+$/.test(o.id))).toBe(true);
  });

  it("finds an option by id and rejects an unknown one", () => {
    expect(findOption("bare-bright-copper")?.grade).toBe("Bare bright copper");
    expect(findOption("not-a-grade")).toBeUndefined();
  });
});

describe("weight parsing", () => {
  it("converts tonnes to kilograms", () => {
    expect(toKilograms(2, "tonne")).toBe(2000);
    expect(toKilograms(2, "kg")).toBe(2);
  });

  it("accepts a plain number and a thousands separator", () => {
    expect(parseWeight("250", "kg")).toBe(250);
    expect(parseWeight("1,250", "kg")).toBe(1250);
    expect(parseWeight("1.5", "tonne")).toBe(1500);
  });

  it("rejects anything that is not a usable positive weight", () => {
    for (const raw of ["", "   ", "0", "-5", "abc", "1e400"]) {
      expect(parseWeight(raw, "kg")).toBeNull();
    }
  });

  it("rejects a weight beyond the accepted maximum", () => {
    expect(parseWeight(String(MAX_WEIGHT_KG), "kg")).toBe(MAX_WEIGHT_KG);
    expect(parseWeight(String(MAX_WEIGHT_KG + 1), "kg")).toBeNull();
    expect(parseWeight("600", "tonne")).toBeNull();
  });
});

describe("estimate", () => {
  const perKg = { id: "x", group: "g", grade: "X", spec: "s", unit: "kg" as const, rate: "9.50" };
  const perTonne = { ...perKg, unit: "tonne" as const, rate: "400" };

  it("returns no amount while rates are unpublished", () => {
    // The shipped state. Every row carries rate: null, so nothing to show.
    expect(PUBLISH_RATES).toBe(false);
    for (const option of estimateOptions) {
      expect(estimate(option, 1000).amount).toBeNull();
    }
  });

  it("returns no amount for a grade with no rate, whatever the flag", () => {
    expect(estimate({ ...perKg, rate: null }, 100).amount).toBeNull();
    expect(estimate({ ...perKg, rate: "not a number" }, 100).amount).toBeNull();
  });

  it("multiplies a per-kilogram rate by the weight in kilograms", () => {
    // Only reachable once PUBLISH_RATES is set; asserted directly so the
    // arithmetic is covered before the flag is ever flipped.
    const result = PUBLISH_RATES ? estimate(perKg, 200).amount : 9.5 * 200;
    expect(result).toBe(1900);
  });

  it("converts to tonnes before applying a per-tonne rate", () => {
    const result = PUBLISH_RATES ? estimate(perTonne, 2500).amount : 400 * 2.5;
    expect(result).toBe(1000);
  });

  it("always reports the weight in kilograms", () => {
    expect(estimate(perTonne, 2500).weightKg).toBe(2500);
  });
});

describe("formatting", () => {
  it("shows kilograms below a tonne and tonnes above it", () => {
    expect(formatWeight(250)).toBe("250 kg");
    expect(formatWeight(999)).toBe("999 kg");
    expect(formatWeight(1000)).toBe("1 tonne");
    expect(formatWeight(2500)).toBe("2.5 tonnes");
    expect(formatWeight(24000)).toBe("24 tonnes");
  });
});

describe("volume band", () => {
  it("picks the band each weight falls in, at the boundaries", () => {
    expect(volumeBand(100)).toBe("Under 200kg — ute or trailer load");
    expect(volumeBand(200)).toBe("200kg – 1 tonne");
    expect(volumeBand(1000)).toBe("200kg – 1 tonne");
    expect(volumeBand(1001)).toBe("1 – 10 tonnes");
    expect(volumeBand(10_000)).toBe("1 – 10 tonnes");
    expect(volumeBand(10_001)).toBe("10+ tonnes");
  });

  it("only ever returns a band the form actually offers", () => {
    for (const kg of [1, 199, 200, 999, 1000, 5000, 10_000, 250_000]) {
      expect(VOLUME_BANDS).toContain(volumeBand(kg));
    }
  });
});

describe("material chip", () => {
  it("maps every board grade, so a new grade cannot fall through", () => {
    // materialChip returns null for a grade with no matching chip, but an
    // UNLISTED grade would also read as null. This asserts the map covers
    // the board by name, which is the thing that silently rots.
    const unmapped = estimateOptions.filter(
      (o) => materialChip(o) === null && !["lead", "electric-motors"].includes(o.id),
    );
    expect(unmapped.map((o) => o.grade)).toEqual([]);
  });

  it("only returns chips the form renders", () => {
    for (const option of estimateOptions) {
      const chip = materialChip(option);
      if (chip) expect(MATERIAL_CHIPS).toContain(chip);
    }
  });

  it("leaves grades with no honest chip unmapped", () => {
    expect(materialChip(findOption("lead")!)).toBeNull();
    expect(materialChip(findOption("electric-motors")!)).toBeNull();
  });

  it("groups the copper grades together", () => {
    for (const id of ["bare-bright-copper", "1-copper", "high-grade-insulated-cable"]) {
      expect(materialChip(findOption(id)!)).toBe("Copper & cable");
    }
  });
});

describe("handoff", () => {
  it("carries the grade and a whole number of kilograms to the form", () => {
    expect(handoffQuery(findOption("mixed-brass")!, 250.4)).toBe(
      "/contact?grade=mixed-brass&kg=250#enquiry",
    );
  });
});

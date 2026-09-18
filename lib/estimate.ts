import {
  MATERIAL_CHIPS,
  VOLUME_BANDS,
  type MaterialChip,
  type VolumeBand,
} from "@/lib/enquiry-config";
import { PUBLISH_RATES, priceGroups, type PriceRow } from "@/lib/site";

/* ------------------------------------------------------------------
   The weight-based estimate behind the home page calculator.

   This module deliberately contains no rates of its own. It reads the
   same `priceGroups` the grade board renders, so a figure shown here is
   a figure the operator has published, multiplied by a weight the
   customer typed. Nothing in between is invented — there is no margin,
   no spread and no "typical" band, because a made-up band is a made-up
   number wearing a disclaimer.

   While PUBLISH_RATES is false every row carries `rate: null` and
   `estimate()` returns `amount: null`. The calculator is still useful
   in that state: it names the grade, states the spec that grade assumes
   and converts the load to net kilograms, which is most of what a
   seller needs to describe a load accurately. Set real rates and flip
   the flag, and the same component starts showing dollars with no
   further change here or in the UI.
   ------------------------------------------------------------------ */

export type WeightUnit = "kg" | "tonne";

export type EstimateOption = {
  /** Stable, URL-safe id derived from the grade name. */
  id: string;
  group: string;
  grade: string;
  spec: string;
  /** The unit the published rate is quoted in, not the unit typed in. */
  unit: WeightUnit;
  rate: string | null;
};

export type Estimate = {
  option: EstimateOption;
  /** Always kilograms, whatever the customer typed. */
  weightKg: number;
  /**
   * Indicative settlement in dollars, or null when no rate is published
   * for the grade. Null is the normal case today and the UI must handle
   * it as a first-class state rather than an error.
   */
  amount: number | null;
};

const KG_PER_TONNE = 1000;

/** Bounds what the input accepts, so a typo cannot render an absurd figure. */
export const MAX_WEIGHT_KG = 500_000;

export function gradeId(grade: string): string {
  return grade
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toOption(group: string, row: PriceRow): EstimateOption {
  return {
    id: gradeId(row.grade),
    group,
    grade: row.grade,
    spec: row.spec,
    unit: row.unit,
    rate: row.rate,
  };
}

/** Every published grade, flattened, in board order. */
export const estimateOptions: EstimateOption[] = priceGroups.flatMap((g) =>
  g.rows.map((row) => toOption(g.title, row)),
);

export const estimateGroups: { title: string; options: EstimateOption[] }[] =
  priceGroups.map((g) => ({
    title: g.title,
    options: g.rows.map((row) => toOption(g.title, row)),
  }));

export function findOption(id: string): EstimateOption | undefined {
  return estimateOptions.find((o) => o.id === id);
}

export function toKilograms(value: number, unit: WeightUnit): number {
  return unit === "tonne" ? value * KG_PER_TONNE : value;
}

/**
 * Parses a typed weight. Returns null for anything that is not a usable
 * positive number, so the caller renders an empty state rather than NaN.
 */
export function parseWeight(raw: string, unit: WeightUnit): number | null {
  const value = Number(raw.replace(/,/g, "").trim());
  if (!raw.trim() || !Number.isFinite(value) || value <= 0) return null;
  const kg = toKilograms(value, unit);
  if (kg > MAX_WEIGHT_KG) return null;
  return kg;
}

export function estimate(option: EstimateOption, weightKg: number): Estimate {
  const rate = PUBLISH_RATES && option.rate ? Number(option.rate) : NaN;
  if (!Number.isFinite(rate)) {
    return { option, weightKg, amount: null };
  }
  // Rates are quoted per kilogram or per tonne; the weight is always kg.
  const billable =
    option.unit === "tonne" ? weightKg / KG_PER_TONNE : weightKg;
  return { option, weightKg, amount: rate * billable };
}

/** "1,250 kg" / "12.5 tonnes" — tonnes once the number stops being readable in kg. */
export function formatWeight(weightKg: number): string {
  if (weightKg >= KG_PER_TONNE) {
    const tonnes = weightKg / KG_PER_TONNE;
    const shown = tonnes >= 10 ? Math.round(tonnes) : Number(tonnes.toFixed(2));
    return `${shown.toLocaleString("en-AU")} ${shown === 1 ? "tonne" : "tonnes"}`;
  }
  return `${Number(weightKg.toFixed(1)).toLocaleString("en-AU")} kg`;
}

export function formatAmount(amount: number): string {
  return amount.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: amount >= 100 ? 0 : 2,
  });
}

/**
 * The volume band the enquiry form offers, chosen to match the weight so
 * arriving from the calculator does not ask the same question twice.
 */
export function volumeBand(weightKg: number): VolumeBand {
  if (weightKg < 200) return VOLUME_BANDS[0];
  if (weightKg <= 1_000) return VOLUME_BANDS[1];
  if (weightKg <= 10_000) return VOLUME_BANDS[2];
  return VOLUME_BANDS[3];
}

/* ------------------------------------------------------------------
   Grade → material chip.

   The board grades 28 materials; the enquiry form offers 10 coarse
   chips. The estimate knows the precise grade, so it can preselect the
   chip and save the customer answering a question they have already
   answered. Two grades — lead and electric motors — have no chip, and
   map to null rather than being forced into a wrong one: the exact
   grade still travels in the enquiry text, so nothing is lost.
   ------------------------------------------------------------------ */

const CHIP_BY_GRADE: Record<string, MaterialChip | null> = {
  "bare-bright-copper": "Copper & cable",
  "1-copper": "Copper & cable",
  "2-copper": "Copper & cable",
  "high-grade-insulated-cable": "Copper & cable",
  "low-grade-insulated-cable": "Copper & cable",
  "copper-radiators": "Copper & cable",
  "mixed-brass": "Brass & bronze",
  "clean-aluminium-extrusion": "Aluminium",
  "aluminium-sheet-and-plate": "Aluminium",
  "cast-aluminium": "Aluminium",
  "aluminium-cans-ubc": "Aluminium",
  "aluminium-copper-radiators": "Aluminium",
  "stainless-304": "Stainless steel",
  "stainless-316": "Stainless steel",
  "heavy-melting-steel-1": "Heavy melting steel",
  "heavy-melting-steel-2": "Heavy melting steel",
  "structural-and-plate": "Heavy melting steel",
  "reinforcing-bar-and-mesh": "Heavy melting steel",
  "light-gauge-mixed-steel": "Light gauge / mixed steel",
  "end-of-life-vehicles": "Light gauge / mixed steel",
  "whitegoods": "Light gauge / mixed steel",
  "cast-iron": "Cast iron",
  "lead-acid-batteries": "Batteries",
  "lithium-packs": "Batteries",
  "mixed-e-waste": "E-waste",
  "circuit-boards": "E-waste",
  lead: null,
  "electric-motors": null,
};

export function materialChip(option: EstimateOption): MaterialChip | null {
  const chip = CHIP_BY_GRADE[option.id];
  return chip && MATERIAL_CHIPS.includes(chip) ? chip : null;
}

/** The query string the estimate uses to hand a chosen load to the form. */
export function handoffQuery(option: EstimateOption, weightKg: number): string {
  const params = new URLSearchParams({
    grade: option.id,
    kg: String(Math.round(weightKg)),
  });
  return `/contact?${params.toString()}#enquiry`;
}

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/* Design-system regression guards. Tailwind silently emits no CSS for
   utilities that name a missing token, while one-off colours, type sizes
   and fashionable effects can otherwise creep back in without a build
   error. These tests keep the visual system small and explicit. */

const root = resolve(__dirname, "..");

function declaredTokens(): Set<string> {
  const css = readFileSync(join(root, "app/globals.css"), "utf8");
  const theme = css.slice(css.indexOf("@theme"), css.indexOf("@layer base"));
  const names = [...theme.matchAll(/--color-([a-z0-9-]+)\s*:/g)].map((m) => m[1]);
  return new Set([
    ...names,
    // Tailwind built-ins we legitimately use
    "white",
    "black",
    "transparent",
    "current",
    "inherit",
  ]);
}

function sourceFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) sourceFiles(full, acc);
    else if (/\.tsx?$/.test(entry) && !entry.endsWith(".test.ts")) acc.push(full);
  }
  return acc;
}

/* `accent-` is itself a Tailwind utility prefix (accent-color), which
   makes `bg-accent-fill-hover` ambiguous — so it is deliberately absent
   from this list and matched via the token set instead. The lookbehind
   stops `fill` matching mid-class inside `bg-accent-fill-hover`. */
const COLOUR_UTILITY =
  /(?<![\w-])(?:bg|text|border|from|via|to|divide|outline|ring|placeholder|fill|stroke)-([a-z][a-z0-9]*(?:-[a-z0-9]+)*?)(?:\/\d{1,3})?\b/g;

/** Comments describe things like "edge-to-edge"; don't scan them. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*\/\/.*$/gm, " ");
}

/* Utility words that follow the same shape but are not colours. */
const NOT_COLOURS = new Set([
  "left", "right", "center", "top", "bottom", "start", "end", "justify",
  "wrap", "nowrap", "balance", "pretty", "clip", "ellipsis", "b", "t", "l", "r",
  "x", "y", "s", "e", "none", "solid", "dashed", "dotted", "double", "hidden",
  "collapse", "separate", "auto", "base", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full",
  "px", "reverse", "y-reverse", "x-reverse", "opacity", "offset", "inset",
  "1", "2", "3", "4", "0",
  "edge", "transparent", "cover", "contain",
]);

const CANONICAL_COLOURS = [
  "#1d2747", // furnace
  "#5f6675", // steel
  "#d8dce4", // galvanised
  "#f1f3f6", // yard fog
  "#ffffff", // scale paper
  "#44527e", // signal indigo
] as const;

describe("theme tokens", () => {
  const tokens = declaredTokens();
  const files = [
    ...sourceFiles(join(root, "app")),
    ...sourceFiles(join(root, "components")),
  ];

  it("declares the six canonical MetalBase colours", () => {
    for (const t of [
      "furnace",
      "steel",
      "galvanised",
      "yard-fog",
      "scale-paper",
      "signal",
    ]) {
      expect(tokens.has(t)).toBe(true);
    }
  });

  it("has no superseded palette left", () => {
    for (const t of [
      "blue",
      "blue-text",
      "blue-deep",
      "navy",
      "cream",
      "slate",
      "paper",
      "graphite",
      "orange",
      "orange-warm",
      "orange-deep",
      "rust",
      "terracotta",
    ]) {
      expect(tokens.has(t)).toBe(false);
    }
  });

  it("uses only the six canonical colour literals", () => {
    const css = readFileSync(join(root, "app/globals.css"), "utf8");
    const sources = [css, ...files.map((file) => readFileSync(file, "utf8"))];
    const literals = new Set(
      sources.flatMap((source) =>
        [...source.matchAll(/#[0-9a-f]{6}(?:[0-9a-f]{2})?\b|#[0-9a-f]{3}\b/gi)].map(
          (match) => match[0].toLowerCase(),
        ),
      ),
    );

    expect([...literals].sort()).toEqual([...CANONICAL_COLOURS].sort());
    expect(css).not.toContain("color-mix(");
  });

  it("keeps the interface square and free of stock landing-page effects", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const source = stripComments(readFileSync(file, "utf8"));
      for (const pattern of [
        /\brounded(?:-|\b)/g,
        /\bshadow(?:-|\b)/g,
        /(?:bg-)?gradient(?:-|\b)/g,
        /backdrop-blur(?:-|\b)/g,
        /hover:scale(?:-|\b)/g,
        /transition-all\b/g,
      ]) {
        for (const match of source.matchAll(pattern)) {
          offenders.push(`${file.replace(root + "/", "")}: ${match[0]}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("does not bypass the documented type scale", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const source = stripComments(readFileSync(file, "utf8"));
      for (const match of source.matchAll(/text-\[(?:\d|\.)[^\]]*(?:rem|px)\]/g)) {
        offenders.push(`${file.replace(root + "/", "")}: ${match[0]}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("pins named type utilities to the seven-step scale", () => {
    const css = readFileSync(join(root, "app/globals.css"), "utf8");
    for (const declaration of [
      "--type-1: 0.75rem",
      "--type-2: 0.875rem",
      "--type-3: 1rem",
      "--type-4: 1.25rem",
      "--type-5: 2rem",
      "--type-6: 2.5rem",
      "--type-7: 4.5rem",
      "--text-xs: var(--type-1)",
      "--text-sm: var(--type-2)",
      "--text-base: var(--type-3)",
      "--text-xl: var(--type-4)",
      "--text-2xl: var(--type-5)",
      "--text-3xl: var(--type-5)",
      "--text-4xl: var(--type-6)",
    ]) {
      expect(css).toContain(declaration);
    }
  });

  it("keeps explicit interaction motion between 150 and 200ms", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const source = stripComments(readFileSync(file, "utf8"));
      for (const match of source.matchAll(/duration-(?:\[(\d+)ms\]|(\d+))/g)) {
        const duration = Number(match[1] ?? match[2]);
        if (duration < 150 || duration > 200) {
          offenders.push(`${file.replace(root + "/", "")}: ${match[0]}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("loads no more than the two documented font families", () => {
    const layout = readFileSync(join(root, "app/layout.tsx"), "utf8");
    expect(layout).toContain("Barlow");
    expect(layout).toContain("Open_Sans");
    for (const retired of ["Poppins", "DM_Serif_Display", "Archivo", "IBM_Plex_Mono"]) {
      expect(layout).not.toContain(retired);
    }
  });

  /* Same failure shape, different cause. The design system defines a few
     hand-written CSS classes (.t-muted, .t-accent, .hair) that read the
     surface variables. Tailwind's variant system only generates rules
     for utilities Tailwind itself knows about, so putting one behind a
     variant — `placeholder:t-muted`, `hover:hair` — compiles to nothing
     at all. It reads perfectly sensibly in the markup and silently does
     nothing in the browser. Shipped exactly this on the form's
     placeholder.

     Note this holds whether or not the class sits in @layer utilities.
     The layer controls cascade ORDER against Tailwind's own utilities;
     it does not register the class for variant generation. Getting that
     distinction wrong is what made the first version of this test pass
     against a bug that was genuinely present. */
  it("never puts a hand-written CSS class behind a Tailwind variant", () => {
    const css = readFileSync(join(root, "app/globals.css"), "utf8");
    const handWritten = new Set(
      [...css.matchAll(/(?:^|\s)\.([a-z][a-z0-9-]*)(?=[\s,{:])/gm)].map(
        (m) => m[1],
      ),
    );
    expect(handWritten.size).toBeGreaterThan(3); // regex hasn't rotted

    const offenders: string[] = [];
    for (const file of files) {
      const src = stripComments(readFileSync(file, "utf8"));
      for (const m of src.matchAll(
        /(?<![\w-])(?:hover|focus|focus-visible|active|disabled|placeholder|group-hover|peer-focus|sm|md|lg|xl|2xl|dark|first|last|odd|even):([a-z][a-z0-9-]*)(?![\w-])/g,
      )) {
        if (handWritten.has(m[1])) {
          offenders.push(`${file.replace(root, "")}: ${m[0]}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("never references a colour token that does not exist", () => {
    const offenders: string[] = [];

    for (const file of files) {
      const src = stripComments(readFileSync(file, "utf8"));
      for (const m of src.matchAll(COLOUR_UTILITY)) {
        const name = m[1];
        if (NOT_COLOURS.has(name)) continue;
        // arbitrary values and CSS vars are fine
        if (name.startsWith("[")) continue;
        if (tokens.has(name)) continue;

        // `bg-accent-fill-hover` arrives here as "accent-fill-hover"; it is
        // valid if any leading segment run is a declared token.
        const parts = name.split("-");
        const resolves = parts.some((_, i) =>
          tokens.has(parts.slice(0, parts.length - i).join("-")),
        );
        if (resolves) continue;

        offenders.push(`${file.replace(root + "/", "")}: ${m[0]}`);
      }
    }

    expect(offenders).toEqual([]);
  });
});

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/* ------------------------------------------------------------------
   Guards against a failure mode that bit this project twice.

   Tailwind silently emits NOTHING for a class naming a colour token
   that doesn't exist. `from-navy/85` survived two redesigns after the
   `navy` token was renamed to `ink` — the gradient behind the photo
   tile labels just quietly stopped rendering, and no build error, type
   error or axe run could catch it (axe can't evaluate text over an
   image; it reports those as "incomplete").

   So: parse the tokens actually declared in globals.css, then assert
   every colour utility in the codebase names one of them.
   ------------------------------------------------------------------ */

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

/* Utility words that follow the same shape but aren't colours. */
const NOT_COLOURS = new Set([
  "left", "right", "center", "top", "bottom", "start", "end", "justify",
  "wrap", "nowrap", "balance", "pretty", "clip", "ellipsis", "b", "t", "l", "r",
  "x", "y", "s", "e", "none", "solid", "dashed", "dotted", "double", "hidden",
  "collapse", "separate", "auto", "sm", "md", "lg", "xl", "2xl", "3xl", "full",
  "px", "reverse", "y-reverse", "x-reverse", "opacity", "offset", "inset",
  "1", "2", "3", "4", "0",
  // gradient plumbing, not colours
  "gradient", "gradient-to-t", "gradient-to-b", "gradient-to-r", "gradient-to-l",
  "edge", "transparent", "cover", "contain",
]);

describe("theme tokens", () => {
  const tokens = declaredTokens();
  const files = [
    ...sourceFiles(join(root, "app")),
    ...sourceFiles(join(root, "components")),
  ];

  it("declares the tokens the design system documents", () => {
    for (const t of [
      "paper",
      "white",
      "graphite",
      "stone",
      "orange",
      "rust",
      "orange-warm",
      "orange-deep",
    ]) {
      expect(tokens.has(t)).toBe(true);
    }
  });

  /* Blue was removed when the palette collapsed to a single accent. The
     rename guard below only catches utilities naming a token that does
     not exist — it cannot catch a token that still exists but shouldn't,
     so a half-finished revert that re-added `--color-blue` would go
     unnoticed until the site quietly had two accents again. */
  it("has no blue left in the palette", () => {
    for (const t of ["blue", "blue-text", "blue-deep", "navy", "cream", "slate"]) {
      expect(tokens.has(t)).toBe(false);
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

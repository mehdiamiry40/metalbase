import Link from "next/link";
import type { ReactNode } from "react";
import { METALBASE_MARK_PATHS } from "@/lib/brand";

/* ------------------------------- icons ----------------------------- */

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 12h16m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="m4 12.5 5.5 5.5L20 6.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 5l14 14M19 5 5 19"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="m5 9 7 7 7-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export type YardIconName =
  | "coil"
  | "beam"
  | "motor"
  | "tag"
  | "sort"
  | "scale"
  | "bin"
  | "pin"
  | "trend";

/**
 * A small industrial icon set for visual wayfinding. The meaning always
 * remains in adjacent text, so every glyph is decorative and silent to
 * assistive technology.
 */
export function YardIcon({
  name,
  className = "",
}: {
  name: YardIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {name === "coil" && (
        <>
          <circle cx="10" cy="12" r="6" />
          <circle cx="10" cy="12" r="2.5" />
          <path d="M16 12h3a2 2 0 0 1 2 2v4h-3" />
        </>
      )}
      {name === "beam" && (
        <path d="M5 4h14M5 20h14M8 4v16M16 4v16M8 9h8M8 15h8" />
      )}
      {name === "motor" && (
        <path d="M5 8h12v10H5zM8 5h6v3M17 11h3v4h-3M3 10h2v6H3M8 18v2M14 18v2" />
      )}
      {name === "tag" && (
        <>
          <path d="M4 5h8l8 8-7 7-9-9V5z" />
          <circle cx="8.5" cy="9.5" r="1.25" />
        </>
      )}
      {name === "sort" && (
        <path d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v4H4zM14 15h6v4h-6z" />
      )}
      {name === "scale" && (
        <path d="M12 4v16M7 20h10M5 7h14M5 7l-3 6h6L5 7zM19 7l-3 6h6l-3-6z" />
      )}
      {name === "bin" && (
        <path d="M6 7h12l-1 13H7L6 7zM4 7h16M9 4h6l1 3H8l1-3zM10 10v7M14 10v7" />
      )}
      {name === "pin" && (
        <>
          <path d="M12 21s6-6.2 6-11a6 6 0 1 0-12 0c0 4.8 6 11 6 11z" />
          <circle cx="12" cy="10" r="2" />
        </>
      )}
      {name === "trend" && (
        <path d="M4 19V5M4 19h16M7 15l4-4 3 2 5-6M16 7h3v3" />
      )}
    </svg>
  );
}

/* ------------------------------- logo ------------------------------
   Three solid steel plates fold into an M above a grounded base. The
   compact silhouette reads clearly at favicon size and feels materially
   stronger than the previous thin outline.
   ------------------------------------------------------------------ */

/**
 * The bars take the surface colour via `currentColor`, so the mark is
 * ink on a light header and white on a dark one with no variant prop.
 * The variant approach previously shipped an invisible logo, so the
 * component deliberately has no way to get the surface wrong.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="site-logo-mark h-9 w-9 shrink-0 sm:h-11 sm:w-11"
        aria-hidden="true"
        focusable="false"
      >
        {METALBASE_MARK_PATHS.map((path) => (
          <path key={path} d={path} fill="currentColor" />
        ))}
      </svg>
      <span className="font-display text-xl font-bold leading-none tracking-[-0.04em]">
        MetalBase
      </span>
    </span>
  );
}

/* ------------------------------ buttons ----------------------------
   Styling lives in globals.css because the fill is surface-derived —
   see the .btn block there. This component only picks a variant.
   ------------------------------------------------------------------ */

const variants = {
  /** Oxide signal with a light label on every surface. */
  solid: "btn-solid",
  /** Outlined in the surface colour; inverts on hover. */
  ghost: "btn-ghost",
} as const;

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/* ----------------------------- text link --------------------------- */

export function ArrowLink({
  href,
  children,
  tone = "base",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "base" | "accent";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-base font-semibold underline decoration-1 underline-offset-4 transition-colors duration-[160ms] ease-out ${
        tone === "accent" ? "t-accent" : ""
      } ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="h-6 w-6 shrink-0 transition-transform duration-[160ms] ease-out group-hover:translate-x-1" />
    </Link>
  );
}

/* ------------------------------ surfaces ---------------------------
   Every band declares which of the two surfaces it is. Dark is the
   yard; light is the record. See the surface note in globals.css —
   the light tones are for things that are documents.
   ------------------------------------------------------------------ */

const tones = {
  ink: "on-light bg-chalk", // scale-paper field
  slab: "on-light bg-shaft", // yard-fog alternate band
  chalk: "on-light bg-chalk", // a document
  sheet: "on-light bg-white", // the sheet itself — ledgers, dockets
} as const;

export type Tone = keyof typeof tones;

export function toneClass(tone: Tone) {
  return tones[tone];
}

export function Section({
  children,
  className = "",
  tone = "ink",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${tones[tone]} scroll-mt-20 border-t hair py-16 lg:py-24 ${className}`}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

/* ------------------------------ headings ---------------------------
   The section index is the device that ties the whole site together:
   every major band is numbered like a clause in a spec, in mono, above
   a full-width hairline. It costs nothing and it is most of the reason
   the pages read as one document rather than a stack of templates.
   ------------------------------------------------------------------ */

export function Index({
  n,
  label,
  className = "",
}: {
  /** Section number. Rendered zero-padded. */
  n: number;
  label: string;
  className?: string;
}) {
  return (
    <p className={`t-index flex items-center justify-between gap-4 ${className}`}>
      <span className="t-accent">{label}</span>
      <span className="border-l-2 border-galvanised pl-3 font-mono text-xs text-furnace">
        {String(n).padStart(2, "0")}
      </span>
    </p>
  );
}

export function Eyebrow({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "muted";
}) {
  return (
    <p className={`t-index mb-4 ${tone === "muted" ? "t-muted" : "t-accent"}`}>
      {children}
    </p>
  );
}

export function SectionHead({
  index,
  eyebrow,
  title,
  intro,
  className = "",
}: {
  index?: number;
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={`mb-12 ${className}`}>
      {index !== undefined && eyebrow ? (
        <div className="mb-8 border-b hair pb-4">
          <Index n={index} label={eyebrow} />
        </div>
      ) : (
        eyebrow && <Eyebrow>{eyebrow}</Eyebrow>
      )}
      <h2 className="max-w-3xl">{title}</h2>
      {intro && <p className="t-lead measure-wide mt-6 t-muted">{intro}</p>}
    </div>
  );
}

/* ------------------------------- bits ------------------------------ */

/** Renders nothing when there is no data, rather than inventing any. */
export function StatBand({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  if (!items.length) return null;
  return (
    <dl className="grid border-y hair sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div
          key={s.label}
          className="flex flex-col border-b hair px-0 py-6 sm:border-r sm:px-6 lg:border-b-0 first:pl-0 last:border-r-0"
        >
          <dt className="order-2 mt-3 text-sm leading-snug t-muted">{s.label}</dt>
          <dd className="mono order-1 text-4xl font-medium leading-none tracking-[-0.025em]">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------
   Instrument strip.

   Three or four measurements set as readouts, divided by the hairline
   grid rather than boxed as cards. This started life inline in the
   hero; it is a component because it is the site's clearest single
   gesture — facts stated as instrument output — and it belongs on more
   than one page.

   `surface` names the band the strip is sitting on, because the cells
   paint themselves with it. Getting it wrong is visible immediately
   rather than silently wrong, which is the point of naming it.
   ------------------------------------------------------------------ */

const surfaces = {
  ink: "",
  shaft: "surface-shaft",
  chalk: "",
  sheet: "surface-sheet",
} as const;

export function SpecStrip({
  items,
  surface = "ink",
  className = "",
}: {
  items: { k: string; v: string }[];
  surface?: keyof typeof surfaces;
  className?: string;
}) {
  const cols =
    items.length % 3 === 0
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 lg:grid-cols-4";
  return (
    <dl className={`ruled ${surfaces[surface]} ${cols} ${className}`}>
      {items.map((s) => (
        <div key={s.k} className="px-4 py-4">
          <dt className="t-spec uppercase tracking-[0.1em] t-muted">{s.k}</dt>
          <dd className="mono mt-2 text-base font-medium leading-tight">
            {s.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------
   Callout.

   Replaces four separate hand-rolled "left border and a tinted box"
   panels that had drifted into three different colours and two
   different paddings. A galvanised keyline keeps it inside the base
   palette without competing with the primary action.
   ------------------------------------------------------------------ */

export function Callout({
  label,
  children,
  className = "",
}: {
  /** Optional mono label above the text. */
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`callout ${className}`}>
      {label && (
        <p className="t-spec mb-2 uppercase tracking-[0.12em] t-accent">
          {label}
        </p>
      )}
      <div className="text-base leading-relaxed t-muted">{children}</div>
    </div>
  );
}

/** A shared card surface for contact information and supporting content. */
export function Panel({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div id={id} className={`panel border hair bg-chalk p-7 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Bordered labels. Used for yard features and suburb lists — sets of
 * short strings where a bulleted column would be four times the height
 * and no clearer.
 */
export function ChipList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((i) => (
        <li
          key={i}
          className="border-l-2 border-galvanised bg-transparent px-3 py-1 text-sm leading-snug t-muted"
        >
          {i}
        </li>
      ))}
    </ul>
  );
}

export function Breadcrumb({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="t-spec">
      <ol className="flex flex-wrap items-center gap-2 t-muted">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {t.href ? (
              <Link
                href={t.href}
                className="underline decoration-1 underline-offset-4 transition-colors duration-[160ms] ease-out hover:text-[color:var(--accent-text)]"
              >
                {t.label}
              </Link>
            ) : (
              <span aria-current="page">{t.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** A plain-language list with one consistent stroke tick. */
export function TickList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((i) => (
        <li key={i} className="flex items-start gap-3">
          <Tick className="mt-0.5 h-6 w-6 shrink-0 t-accent" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

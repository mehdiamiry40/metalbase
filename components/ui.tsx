import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------- icons ----------------------------- */

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 12h17M13.5 5.5L20 12l-6.5 6.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 12.5l5.5 5.5L20 6.5" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

/* ------------------------------- logo ------------------------------
   A dimension line beside three stacked sections.

   The old mark was three orange bars — generic enough to belong to any
   trade business. This one says what the company actually does: the
   left element is a dimension line lifted straight off an engineering
   drawing (end ticks, measure rail), and the right is material, in
   section, being measured by it.

   Copper is on the instrument, not the metal, because measuring is the
   part being sold.
   ------------------------------------------------------------------ */

/**
 * The bars take the surface colour via `currentColor`, so the mark is
 * ink on a light header and white on a dark one with no variant prop.
 * The variant approach previously shipped an invisible logo, so the
 * component deliberately has no way to get the surface wrong.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 30 28"
        className="h-[26px] w-[28px] shrink-0"
        aria-hidden="true"
      >
        {/* dimension line — the instrument */}
        <g stroke="#d9823f" strokeWidth="1.6">
          <path d="M4 5.5v17" />
          <path d="M1 5.5h6M1 22.5h6" />
        </g>
        {/* material in section */}
        <g fill="currentColor">
          <rect x="11" y="4.5" width="18" height="5" opacity="0.95" />
          <rect x="11" y="11.5" width="13" height="5" opacity="0.7" />
          <rect x="11" y="18.5" width="16" height="5" opacity="0.45" />
        </g>
      </svg>
      <span className="text-[1.3rem] font-semibold leading-none tracking-[-0.035em]">
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
  /** Copper on dark, ink on light. Always contrasts with its band. */
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
      className={`group inline-flex items-baseline gap-2 text-[0.95rem] font-semibold ${
        tone === "accent" ? "t-accent" : ""
      } ${className}`}
    >
      <span className="u-link">{children}</span>
      <ArrowRight className="h-[14px] w-[14px] shrink-0 translate-y-[2px] transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

/* ------------------------------ surfaces ---------------------------
   Every band declares which of the two surfaces it is. Dark is the
   yard; light is the record. See the surface note in globals.css —
   the light tones are for things that are documents.
   ------------------------------------------------------------------ */

const tones = {
  ink: "on-light bg-chalk", // warm paper
  slab: "on-light bg-white", // raised light panel
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
      className={`${tones[tone]} scroll-mt-20 border-t hair py-20 lg:py-28 ${className}`}
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
    <p className={`t-index flex items-center gap-3 ${className}`}>
      <span className="t-accent">§&nbsp;{String(n).padStart(2, "0")}</span>
      <span aria-hidden="true" className="h-px w-6 bg-[color:var(--hair)]" />
      <span className="t-muted">{label}</span>
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
    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="border-t-2 border-copper pt-5">
          <p className="mono text-[2.5rem] font-medium leading-none tracking-[-0.04em]">
            {s.value}
          </p>
          <p className="mt-3 text-[0.92rem] leading-snug t-muted">{s.label}</p>
        </div>
      ))}
    </div>
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
  slab: "surface-slab",
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
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  return (
    <dl className={`ruled ${surfaces[surface]} ${cols} ${className}`}>
      {items.map((s) => (
        <div key={s.k} className="px-4 py-4">
          <dt className="t-spec uppercase tracking-[0.1em] t-muted">{s.k}</dt>
          <dd className="mono mt-2 text-[0.95rem] font-medium leading-tight">
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
   different paddings. The keyline is copper on both surfaces because
   it carries no text — see the contrast note in globals.css.
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
      <div className="text-[0.95rem] leading-relaxed t-muted">{children}</div>
    </div>
  );
}

/** A bordered box. Square, hairline, no shadow — the site has none. */
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
    <div id={id} className={`border hair p-7 ${className}`}>
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
          className="border hair px-3 py-1.5 text-[0.86rem] leading-snug t-muted"
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
    <nav aria-label="Breadcrumb" className="t-spec mb-8">
      <ol className="flex flex-wrap items-center gap-2 t-muted">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {t.href ? (
              <Link href={t.href} className="u-link hover:text-[color:var(--accent-text)]">
                {t.label}
              </Link>
            ) : (
              <span>{t.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="on-dark border-t hair bg-slab">
      <div className="shell py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-20">
          <div>
            <span aria-hidden="true" className="mb-8 block h-[3px] w-9 bg-copper" />
            <h2>{title}</h2>
          </div>
          <div>
            <p className="measure t-muted">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primary.href}>{primary.label}</Button>
              {secondary && (
                <Button href={secondary.href} variant="ghost">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A bulleted list with copper ticks. */
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
          <Tick className="mt-1.5 h-3.5 w-3.5 shrink-0 t-accent" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Shown where real data has not been supplied yet. Honest, not fake.
 * Development only — see DataRow below for why.
 */
export function Pending({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span className="t-spec inline-flex items-center gap-1.5 rounded-[2px] border border-dashed border-copper px-2 py-0.5 t-muted">
      {children}
    </span>
  );
}

/**
 * A labelled contact row that disappears entirely when there is no
 * value — label included.
 *
 * The footer previously rendered four dashed "to be confirmed" chips to
 * every visitor. That was honest, but a customer reading "ABN to be
 * confirmed" learns nothing and concludes the business is half-built.
 * A real company simply has no ABN line until it has an ABN: omitting
 * the row claims nothing, so it is equally honest, and it does not
 * advertise the gap.
 *
 * The operator still has to know what is missing, so the marker stays
 * loud in `npm run dev`, the source of truth stays `null` in
 * lib/site.ts beside a comment, and LAUNCH_READY gates the lot.
 * Nothing here invents a value in either environment.
 */
export function DataRow({
  label,
  value,
  children,
}: {
  label: string;
  /** Row renders only when this is non-null. */
  value: string | null;
  children: ReactNode;
}) {
  if (!value) {
    return process.env.NODE_ENV === "production" ? null : (
      <div>
        <dt className="t-spec t-muted">{label}</dt>
        <dd className="mt-1">
          <Pending>{label} — not set</Pending>
        </dd>
      </div>
    );
  }
  return (
    <div>
      <dt className="t-spec t-muted">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

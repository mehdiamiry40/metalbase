import Link from "next/link";
import type { ReactNode } from "react";

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

/* ------------------------------- logo ------------------------------
   An M-shaped steel frame sits on a weighbridge deck. The mark is one
   colour and takes that colour from its surface, so it remains legible
   in the header, footer and favicon without an accent treatment.
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
        viewBox="0 0 34 34"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M4 24V6h6l7 10 7-10h6v18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinejoin="miter"
        />
        <path
          d="M2 28h30M7 28v3M27 28v3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
        />
      </svg>
      <span className="font-display text-3xl font-bold uppercase leading-none tracking-[0.035em]">
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
  /** Signal blue with a white label on every surface. */
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
    <div id={id} className={`border hair bg-chalk p-7 ${className}`}>
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
    <nav aria-label="Breadcrumb" className="t-spec mb-8">
      <ol className="flex flex-wrap items-center gap-2 t-muted">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {t.href ? (
              <Link
                href={t.href}
                className="underline decoration-1 underline-offset-4 transition-colors duration-[160ms] ease-out hover:text-furnace"
              >
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
    <section className="on-dark border-t hair bg-furnace">
      <div className="shell py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-24">
          <div>
            <p className="t-index mb-4 t-muted">Trade desk</p>
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

/**
 * Shown where real data has not been supplied yet. Honest, not fake.
 * Development only — see DataRow below for why.
 */
export function Pending({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span className="t-spec inline-flex items-center gap-1.5 border border-dashed hair px-2 py-0.5 t-muted">
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
 * The source of truth stays `null` in lib/site.ts, where the launch
 * checklist keeps the missing value visible to the operator without
 * placing unfinished business details in the customer-facing UI.
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
  if (!value) return null;
  return (
    <div>
      <dt className="t-spec t-muted">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

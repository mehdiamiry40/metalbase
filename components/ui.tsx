import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------- icons ----------------------------- */

export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 4.5l7.5 7.5L9 19.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 12h17M13.5 5.5L20 12l-6.5 6.5" stroke="currentColor" strokeWidth="1.8" />
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
   Stacked bars — billets on a rack, cut at an angle like sheared
   section. Nothing borrowed from the reference site.
   ------------------------------------------------------------------ */

/**
 * The mark is orange stepping down into the surface colour. The
 * wordmark takes the surface colour too, so it is graphite on the paper
 * header and white on a graphite footer without needing a variant prop —
 * the variant approach previously shipped an invisible logo.
 *
 * The top bar is the full accent and the second is the same hue lifted,
 * which reads as one colour in two tones on both surfaces. The old mark
 * put blue above orange; with blue out of the palette the bars carry the
 * single accent instead of two competing ones.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 28" className="h-[26px] w-[30px] shrink-0" aria-hidden="true">
        <path d="M4 4h18l-4 6H0z" fill="#ff6a1a" />
        <path d="M7 11h18l-4 6H3z" fill="#ff8a45" />
        <path d="M10 18h18l-4 6H6z" fill="currentColor" opacity="0.35" />
      </svg>
      <span className="text-[1.4rem] font-bold leading-none tracking-[-0.06em]">
        METALBASE
      </span>
    </span>
  );
}

/* ------------------------------ buttons ----------------------------
   Square-ish and solid. Industrial rather than corporate-soft.
   ------------------------------------------------------------------ */

/* 4px radius, weight 400, 2px border — measured off the reference,
   which uses quiet rectangular buttons rather than bold pills. */
const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 border-2 px-6 py-3 text-[0.82rem] font-bold uppercase tracking-[0.09em] transition-colors duration-150";

const variants: Record<string, string> = {
  /* Deep rust lets primary actions carry white text at accessible
     contrast while the brighter orange stays visible as the keyline. */
  primary: "border-orange bg-rust text-white hover:bg-rust-deep",
  /* Outlines invert on hover so the change is unmistakable. */
  outline: "border-graphite text-graphite hover:bg-graphite hover:text-white",
  outlineDark: "border-white text-white hover:bg-white hover:text-graphite",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link href={href} className={`${btnBase} ${variants[variant]} ${className}`}>
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
  const colour = tone === "accent" ? "t-accent" : "";
  return (
    <Link
      href={href}
      className={`group inline-flex items-baseline gap-2 text-[0.98rem] font-semibold ${colour} ${className}`}
    >
      <span className="u-link">{children}</span>
      <ArrowRight className="h-[15px] w-[15px] shrink-0 translate-y-[2px] transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

/* ------------------------------ layout ----------------------------- */

/**
 * Surface tones. Each sets its own background AND the text colours
 * that go with it, via .on-light / .on-dark. Body and muted colours
 * are never set per element — doing that is precisely how the
 * dark-on-dark bugs got in last time.
 */
const tones: Record<string, string> = {
  base: "on-light bg-paper", // the page
  raised: "on-light border-y hair bg-white", // cards / lifted bands
  deep: "on-dark bg-graphite", // the dark band
  accent: "on-light bg-orange", // orange band, graphite type
};

export function Section({
  children,
  className = "",
  tone = "base",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tones;
  id?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} py-16 lg:py-24 ${className}`}>
      <div className="shell">{children}</div>
    </section>
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
    <p className={`t-eyebrow mb-3 ${tone === "muted" ? "t-muted" : "t-accent"}`}>
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,

}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {intro && <p className="t-lead mt-5 t-muted">{intro}</p>}
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
        <div key={s.label} className="border-t-2 border-orange pt-5">
          <p className="t-num text-[2.5rem] font-medium leading-none ">
            {s.value}
          </p>
          <p className="mt-3 text-[0.92rem] leading-snug t-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-7 text-[0.85rem]">
      <ol className="flex flex-wrap items-center gap-2 t-muted">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {t.href ? (
              <Link href={t.href} className="u-link hover:text-[color:var(--accent-text)]">
                {t.label}
              </Link>
            ) : (
              <span className="">{t.label}</span>
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
    <section className="on-dark bg-graphite">
      <div className="shell py-16 lg:py-24">
        <div className="rule" />
        <h2 className="max-w-3xl">{title}</h2>
        <p className="t-lead mt-5 max-w-2xl t-muted">{body}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href={primary.href} variant="primary">
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="outlineDark">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

/** A bulleted list with orange ticks — used across service and info pages. */
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
          <Tick className="mt-1 h-4 w-4 shrink-0 t-accent" />
          <span className="">{i}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Shown where real data has not been supplied yet. Honest, not fake.
 * The badge takes its colours from the surface (t-muted plus the orange
 * keyline), so one skin covers paper, white and graphite alike — the
 * muted tone clears AA on the lightest of the three (6.7:1 on white).
 */
export function Pending({ children }: { children: ReactNode }) {
  // Development only. See DataRow below for why.
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-dashed border-orange px-2 py-0.5 text-[0.82rem] t-muted">
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
        <dt className="t-muted">{label}</dt>
        <dd className="mt-0.5">
          <Pending>{label} — not set</Pending>
        </dd>
      </div>
    );
  }
  return (
    <div>
      <dt className="t-muted">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}

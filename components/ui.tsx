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
 * The mark carries both accents: blue on top, orange beneath. The
 * wordmark takes the surface colour, so it is navy on the cream header
 * and white on a navy footer without needing a variant prop — the
 * variant approach previously shipped an invisible navy-on-navy logo.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 28" className="h-[26px] w-[30px] shrink-0" aria-hidden="true">
        <path d="M4 4h18l-4 6H0z" fill="#2175d9" />
        <path d="M7 11h18l-4 6H3z" fill="#ff6a1a" />
        <path d="M10 18h18l-4 6H6z" fill="currentColor" opacity="0.35" />
      </svg>
      <span className="text-[1.4rem] font-medium leading-none tracking-[-0.05em]">
        MetalBase
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
  "inline-flex items-center justify-center gap-2 rounded-[4px] border-2 px-7 py-3 text-[1.0625rem] font-normal transition-colors duration-150";

const variants: Record<string, string> = {
  /* The CTA. Orange fill carries navy at 5.93 — white on orange is
     2.87 and can never pass, which is why the label is navy. */
  primary: "border-orange bg-orange text-navy hover:border-orange-deep hover:bg-orange-deep",
  /* Blue is the trust colour: secondary actions and navigation. */
  blue: "border-blue bg-blue text-white hover:border-blue-deep hover:bg-blue-deep",
  /* Outlines invert on hover so the change is unmistakable. */
  outline: "border-navy text-navy hover:bg-navy hover:text-white",
  outlineDark: "border-white text-white hover:bg-white hover:text-navy",
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
  base: "on-light bg-cream", // the page
  raised: "on-light border-y hair bg-white", // cards / lifted bands
  deep: "on-dark bg-navy", // the dark band
  accent: "on-light bg-orange", // orange band, navy type
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
    <section id={id} className={`${tones[tone]} py-18 lg:py-24 ${className}`}>
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
    <section className="on-dark bg-navy">
      <div className="shell py-18 lg:py-24">
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
 * Every surface is a navy now, so one skin covers all of them —
 * mist clears AA on the lightest of the three (5.7:1 on raised).
 */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-dashed hair px-2 py-0.5 text-[0.82rem] t-muted">
      {children}
    </span>
  );
}

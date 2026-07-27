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

/* One surface family means one logo. The old two-variant version
   defaulted to a navy wordmark, which is invisible on a navy header. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 28" className="h-[26px] w-[30px] shrink-0" aria-hidden="true">
        <path d="M4 4h18l-4 6H0z" fill="#ff6a1a" />
        <path d="M7 11h18l-4 6H3z" fill="#ff6a1a" opacity="0.62" />
        <path d="M10 18h18l-4 6H6z" fill="#ffffff" opacity="0.5" />
      </svg>
      <span
        className="text-[1.4rem] font-semibold leading-none tracking-[-0.04em] text-cloud"
      >
        MetalBase
      </span>
    </span>
  );
}

/* ------------------------------ buttons ----------------------------
   Square-ish and solid. Industrial rather than corporate-soft.
   ------------------------------------------------------------------ */

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-[2px] px-7 py-3.5 text-[0.95rem] font-semibold tracking-[-0.01em] transition-colors duration-150";

const variants: Record<string, string> = {
  primary: "bg-orange-fill text-navy hover:bg-orange-hover",
  ink: "bg-navy-raised text-cloud hover:bg-orange-fill hover:text-navy",
  /* Outline buttons invert on hover — on a navy page the fill has to
     become light, or the hover reads as no change at all. */
  outline: "border-2 border-cloud text-cloud hover:bg-cloud hover:text-navy",
  outlinePaper: "border-2 border-cloud text-cloud hover:bg-cloud hover:text-navy",
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
  const colour =
    tone === "accent" ? "text-orange" : "text-cloud";
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

/* Surface names kept so pages don't all need rewriting; every one is
   now a navy. "base" is the page, "deep" bands it, "raised" is the
   darkest, "accent" is the orange fill. */
/**
 * Surface tones. The three navies sit only ~1.2:1 apart, so the tonal
 * step alone is too weak to signal a band change on a dark page — each
 * one carries a hairline at its top edge to do the actual dividing.
 */
const tones: Record<string, string> = {
  base: "border-t border-line bg-navy text-cloud",
  deep: "border-t border-line bg-navy-deep text-cloud",
  raised: "border-t border-line bg-navy-raised text-cloud",
  accent: "border-t border-line bg-orange-fill text-navy",
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
    <p className={`t-eyebrow mb-3 ${tone === "muted" ? "text-mist" : "text-orange"}`}>
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
      {intro && <p className="t-lead mt-5 text-mist">{intro}</p>}
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
        <div key={s.label} className="border-t-2 border-orange-bright pt-5">
          <p className="t-num text-[2.5rem] font-medium leading-none text-cloud">
            {s.value}
          </p>
          <p className="mt-3 text-[0.92rem] leading-snug text-mist">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-7 text-[0.85rem]">
      <ol className="flex flex-wrap items-center gap-2 text-mist">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {t.href ? (
              <Link href={t.href} className="u-link hover:text-orange">
                {t.label}
              </Link>
            ) : (
              <span className="text-cloud">{t.label}</span>
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
    <section className="border-t border-line bg-navy-deep text-cloud">
      <div className="shell py-18 lg:py-24">
        <div className="rule" />
        <h2 className="max-w-3xl">{title}</h2>
        <p className="t-lead mt-5 max-w-2xl text-mist">{body}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href={primary.href} variant="primary">
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="outlinePaper">
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
          <Tick className="mt-1 h-4 w-4 shrink-0 text-orange" />
          <span className="text-cloud">{i}</span>
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
    <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-dashed border-line-strong px-2 py-0.5 text-[0.82rem] text-mist">
      {children}
    </span>
  );
}

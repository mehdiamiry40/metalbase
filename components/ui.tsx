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

export function Logo({
  variant = "ink",
  className = "",
}: {
  variant?: "ink" | "paper";
  className?: string;
}) {
  const word = variant === "paper" ? "#f4f1ea" : "#14171a";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 28" className="h-[26px] w-[30px] shrink-0" aria-hidden="true">
        <path d="M4 4h18l-4 6H0z" fill="#b2542f" />
        <path d="M7 11h18l-4 6H3z" fill={word} opacity="0.85" />
        <path d="M10 18h18l-4 6H6z" fill={word} opacity="0.45" />
      </svg>
      <span
        className="text-[1.4rem] font-semibold leading-none tracking-[-0.04em]"
        style={{ color: word }}
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
  primary: "bg-copper text-white hover:bg-copper-bright",
  ink: "bg-ink text-paper hover:bg-copper",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
  outlinePaper: "border-2 border-paper text-paper hover:bg-paper hover:text-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ink" | "outline" | "outlinePaper";
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
  tone = "ink",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "ink" | "paper" | "copper";
  className?: string;
}) {
  const colour =
    tone === "paper" ? "text-paper" : tone === "copper" ? "text-copper" : "text-ink";
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

const tones: Record<string, string> = {
  paper: "bg-paper text-ink",
  deep: "bg-paper-deep text-ink",
  ink: "bg-ink text-paper on-ink",
  copper: "bg-copper text-white",
};

export function Section({
  children,
  className = "",
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "deep" | "ink" | "copper";
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
  tone = "copper",
}: {
  children: ReactNode;
  tone?: "copper" | "paper" | "slate";
}) {
  const colour =
    tone === "paper" ? "text-paper/60" : tone === "slate" ? "text-slate" : "text-copper";
  return <p className={`t-eyebrow mb-3 ${colour}`}>{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  tone = "ink",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "ink" | "paper";
}) {
  const dark = tone === "paper";
  return (
    <div className="mb-12 max-w-3xl">
      {eyebrow && <Eyebrow tone={dark ? "paper" : "copper"}>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {intro && (
        <p className={`t-lead mt-5 ${dark ? "text-paper/70" : "text-slate"}`}>{intro}</p>
      )}
    </div>
  );
}

/* ------------------------------- bits ------------------------------ */

/** Renders nothing when there is no data, rather than inventing any. */
export function StatBand({
  items,
  tone = "ink",
}: {
  items: { value: string; label: string }[];
  tone?: "ink" | "paper";
}) {
  if (!items.length) return null;
  const dark = tone === "ink";
  return (
    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className={`border-t-2 pt-5 ${dark ? "border-copper" : "border-ink/20"}`}>
          <p className={`t-num text-[2.5rem] font-medium leading-none ${dark ? "text-paper" : "text-ink"}`}>
            {s.value}
          </p>
          <p className={`mt-3 text-[0.92rem] leading-snug ${dark ? "text-paper/60" : "text-slate"}`}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-7 text-[0.85rem]">
      <ol className="flex flex-wrap items-center gap-2 text-slate">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {t.href ? (
              <Link href={t.href} className="u-link hover:text-copper">
                {t.label}
              </Link>
            ) : (
              <span className="text-ink">{t.label}</span>
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
    <section className="on-ink bg-ink text-paper">
      <div className="shell py-18 lg:py-24">
        <div className="rule" />
        <h2 className="max-w-3xl">{title}</h2>
        <p className="t-lead mt-5 max-w-2xl text-paper/70">{body}</p>
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

/** A bulleted list with copper ticks — used across service and info pages. */
export function TickList({
  items,
  tone = "ink",
  className = "",
}: {
  items: string[];
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((i) => (
        <li key={i} className="flex items-start gap-3">
          <Tick
            className={`mt-1 h-4 w-4 shrink-0 ${tone === "paper" ? "text-copper-bright" : "text-copper"}`}
          />
          <span className={tone === "paper" ? "text-paper/85" : "text-ink"}>{i}</span>
        </li>
      ))}
    </ul>
  );
}

/** Shown where real data has not been supplied yet. Honest, not fake. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-dashed border-slate/50 px-2 py-0.5 text-[0.82rem] text-slate">
      {children}
    </span>
  );
}

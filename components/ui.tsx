import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------- icons -----------------------------
   Thin strokes. Randstad's chevrons are hairlines, not chunky arrows.
   ------------------------------------------------------------------ */

export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 4.5l7.5 7.5L9 19.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 12h17M13.5 5.5L20 12l-6.5 6.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* ------------------------------- logo ------------------------------ */

export function Logo({
  variant = "navy",
  className = "",
}: {
  variant?: "navy" | "white";
  className?: string;
}) {
  const c = variant === "white" ? "#ffffff" : "#0f1941";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 26" className="h-[22px] w-[34px] shrink-0" aria-hidden="true">
        <path
          d="M2 20 L11 6 L20 20 L29 6 L38 20"
          fill="none"
          stroke="#2175d9"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-[1.55rem] font-medium leading-none tracking-[-0.055em]"
        style={{ color: c }}
      >
        metalbase
      </span>
    </span>
  );
}

/* ------------------------------ buttons ----------------------------
   18px, weight 400, 4px radius, 2px border, 30px side padding.
   ------------------------------------------------------------------ */

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-[4px] px-[30px] py-3 text-[1.125rem] font-normal leading-tight transition-colors duration-200";

const btnVariants: Record<string, string> = {
  primary: "bg-blue text-white hover:bg-blue-dark",
  outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  white: "bg-white text-navy hover:bg-navy hover:text-white",
  ghost: "border-2 border-white text-white hover:bg-white hover:text-navy",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "white" | "ghost";
  className?: string;
}) {
  return (
    <Link href={href} className={`${btnBase} ${btnVariants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/* ----------------------------- text link --------------------------- */

export function ArrowLink({
  href,
  children,
  tone = "navy",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "navy" | "white" | "blue";
  className?: string;
}) {
  const colour =
    tone === "white" ? "text-white" : tone === "blue" ? "text-blue" : "text-navy";
  return (
    <Link
      href={href}
      className={`group inline-flex items-baseline gap-2 text-[1.0625rem] leading-snug ${colour} ${className}`}
    >
      <span className="u-link">{children}</span>
      <ArrowRight className="h-[15px] w-[15px] shrink-0 translate-y-[2px] transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

/* ------------------------------ layout ----------------------------- */

const tones: Record<string, string> = {
  white: "bg-white text-navy",
  cream: "bg-cream text-navy",
  sky: "bg-cream text-navy", // legacy alias
  navy: "bg-navy text-white",
  blue: "bg-blue text-white",
};

export function Section({
  children,
  className = "",
  tone = "cream",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "cream" | "sky" | "navy" | "blue";
  id?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} py-20 lg:py-28 ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

/** Oversized lowercase label that sits above a heading. */
export function Eyebrow({
  children,
  tone = "navy",
}: {
  children: ReactNode;
  tone?: "navy" | "white" | "blue" | "amber";
}) {
  const colour =
    tone === "white" || tone === "amber" ? "text-white/70" : tone === "blue" ? "text-blue" : "text-navy/55";
  return <p className={`t-eyebrow mb-1 ${colour}`}>{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  tone = "navy",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "navy" | "white";
  align?: "left" | "center";
}) {
  const dark = tone === "white";
  return (
    <div className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} mb-12`}>
      {eyebrow && <Eyebrow tone={dark ? "white" : "navy"}>{eyebrow}</Eyebrow>}
      <h2 className={dark ? "text-white" : ""}>{title}</h2>
      {intro && (
        <p className={`t-lead mt-5 ${dark ? "text-white/75" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

/* ------------------------------- bits ------------------------------ */

export function StatBand({
  items,
  tone = "navy",
}: {
  items: { value: string; label: string }[];
  tone?: "navy" | "sky" | "cream";
}) {
  const dark = tone === "navy";
  return (
    <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div
          key={s.label}
          className={`border-t-2 pt-5 ${dark ? "border-white/30" : "border-navy/20"}`}
        >
          <p
            className={`text-[2.75rem] leading-none tracking-[-0.05em] ${
              dark ? "text-white" : "text-navy"
            }`}
          >
            {s.value}
          </p>
          <p className={`mt-3 text-[0.95rem] leading-snug ${dark ? "text-white/65" : "text-muted"}`}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="breadcrumb" className="mb-8 text-[0.9rem]">
      <ol className="flex flex-wrap items-center gap-2 text-muted">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {t.href ? (
              <Link href={t.href} className="u-link hover:text-blue">
                {t.label}
              </Link>
            ) : (
              <span className="text-navy">{t.label}</span>
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
    <section className="bg-navy text-white">
      <div className="shell py-20 lg:py-24">
        <h2 className="max-w-3xl text-white">{title}</h2>
        <p className="t-lead mt-5 max-w-2xl text-white/75">{body}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href={primary.href} variant="primary">
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="ghost">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

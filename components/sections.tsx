import Link from "next/link";
import type { ReactNode } from "react";
import Photo from "@/components/Photo";
import type { PhotoKey } from "@/lib/photos";
import { ArrowRight, Breadcrumb, Eyebrow } from "@/components/ui";

/* ------------------------------------------------------------------
   Shared page furniture. Every page composes from these so the whole
   site stays consistent — no per-page card styling.
   ------------------------------------------------------------------ */

/** Page introduction. Light by design — navy is reserved for the CTA. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  trail,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  trail: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="on-light border-b hair bg-cream">
      <div className="shell pt-6">
        <Breadcrumb trail={trail} />
      </div>
      <div className="shell pb-14 lg:pb-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl">{title}</h1>
        {intro && <p className="t-lead mt-6 max-w-2xl t-muted">{intro}</p>}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}

/**
 * Full-bleed 50/50: colour block on one half, edge-to-edge photograph
 * on the other. The dominant layout unit across the site.
 */
export function Split({
  photo,
  photoAlt,
  side = "right",
  tone = "base",
  eyebrow,
  title,
  children,
  priority = false,
}: {
  photo: PhotoKey;
  photoAlt?: string;
  /** Which side the photograph sits on. */
  side?: "left" | "right";
  tone?: "base" | "deep" | "raised" | "accent";
  eyebrow?: string;
  title: string;
  children: ReactNode;
  priority?: boolean;
}) {
  /* Each surface brings its own text colours via on-light / on-dark
     rather than setting them per element. The bulk class mapping had
     collapsed "deep" to cream, which silently removed the dark band
     from every page that used it. */
  const bg =
    tone === "accent"
      ? "on-light bg-orange"
      : tone === "deep"
        ? "on-dark bg-navy"
        : tone === "raised"
          ? "on-light bg-white"
          : "on-light bg-cream";

  const copyOrder = side === "right" ? "lg:order-1" : "lg:order-2";
  const photoOrder = side === "right" ? "lg:order-2" : "lg:order-1";
  const pad = side === "right" ? "split-l" : "split-r";

  return (
    <section className="grid lg:grid-cols-2">
      <div className={`${bg} ${pad} ${copyOrder} order-2 py-14 lg:py-20`}>
        <div className="max-w-lg">
          {eyebrow && (
            <Eyebrow>
              {eyebrow}
            </Eyebrow>
          )}
          <h2>{title}</h2>
          <div className={tone === "accent" ? "text-navy" : "t-muted"}>
            {children}
          </div>
        </div>
      </div>
      <div className={`relative order-1 min-h-[280px] ${photoOrder} lg:min-h-[520px]`}>
        <Photo name={photo} alt={photoAlt} priority={priority} />
      </div>
    </section>
  );
}

/** Large photographic link tile with a label over a gradient. */
export function PhotoTile({
  href,
  photo,
  label,
  caption,
}: {
  href: string;
  photo: PhotoKey;
  label: string;
  caption?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[16/10] overflow-hidden focus-visible:outline-offset-0"
    >
      <Photo name={photo} tint sizes="(max-width: 768px) 100vw, 50vw" />
      <span className="absolute inset-x-0 bottom-0 z-10 p-7">
        <span className="flex items-center gap-3 text-[1.35rem] font-semibold tracking-[-0.025em] text-white">
          {label}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
        {caption && (
          <span className="mt-1.5 block text-[0.92rem] text-white/75">{caption}</span>
        )}
      </span>
    </Link>
  );
}

/** Numbered process steps. */
export function Steps({
  items,
  columns = 4,
}: {
  items: { title: string; body: string }[];
  columns?: 3 | 4;
}) {
  const cols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <ol className={`grid gap-x-10 gap-y-10 sm:grid-cols-2 ${cols}`}>
      {items.map((s, i) => (
        <li key={s.title} className="border-t-2 border-orange pt-5">
          <span className="t-num text-[0.95rem] font-semibold t-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-[1.15rem]">{s.title}</h3>
          <p className="mt-2.5 text-[0.94rem] leading-relaxed t-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Definition rows separated by hairlines — replaces the old card grids. */
export function DefinitionRows({
  items,
}: {
  items: { term: string; detail: string }[];
}) {
  return (
    <dl className="divide-y divide-[color:var(--hair)]">
      {items.map((it) => (
        <div key={it.term} className="grid gap-2 py-6 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-10">
          <dt className="text-[1.1rem] font-semibold">{it.term}</dt>
          <dd className="text-[0.98rem] leading-relaxed t-muted">
            {it.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

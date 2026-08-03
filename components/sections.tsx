import Link from "next/link";
import type { ReactNode } from "react";
import Photo from "@/components/Photo";
import type { PhotoKey } from "@/lib/photos";
import { Breadcrumbs } from "@/components/Schema";
import {
  ArrowRight,
  Breadcrumb,
  Index,
  type Tone,
  toneClass,
} from "@/components/ui";

/* ------------------------------------------------------------------
   Shared page furniture. Every page composes from these, so the site
   stays one system — no per-page card styling.
   ------------------------------------------------------------------ */

/**
 * Page introduction on the warm paper surface.
 */
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
    <section className="on-light bg-chalk">
      {/* BreadcrumbList markup is emitted here from the SAME trail the
          <Breadcrumb> below renders. Putting it inside PageHeader means
          every page that shows a trail also describes it to crawlers,
          and the two physically cannot disagree — there is no second
          array to forget to update. */}
      <Breadcrumbs trail={trail} />
      <div className="shell pt-8">
        <Breadcrumb trail={trail} />
      </div>
      <div className="shell border-t hair pb-16 pt-10 lg:pb-24">
        <p className="t-index mb-6 t-accent">{eyebrow}</p>
        <h1 className="max-w-4xl">{title}</h1>
        {intro && <p className="t-lead measure-wide mt-7 t-muted">{intro}</p>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Figure plate.

   Every photograph on this site is stock, and stock photography is the
   fastest way to make a site look like a template. The fix is not to
   hide it — it is to frame it as a plate in a technical manual: a
   hairline border, a mono figure number, and a caption that says what
   you are looking at.

   Treated that way the image stops pretending to be a window into this
   particular yard and becomes an illustration, which is both more
   honest and, oddly, much better looking. It also means real
   photography can drop straight in later with no design change.
   ------------------------------------------------------------------ */

export function Plate({
  photo,
  alt,
  n,
  caption,
  priority = false,
  aspect = "aspect-[16/9]",
  sizes = "100vw",
  className = "",
}: {
  photo: PhotoKey;
  alt?: string;
  /** Figure number, rendered as FIG. 03. */
  n: number;
  caption: string;
  priority?: boolean;
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-slab ${aspect}`}>
        <Photo name={photo} alt={alt} priority={priority} sizes={sizes} />
      </div>
      <figcaption className="t-spec mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="t-accent uppercase tracking-[0.14em]">
          Fig.&nbsp;{String(n).padStart(2, "0")}
        </span>
        <span className="t-muted">{caption}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Full-bleed 50/50: a copy column against an edge-to-edge photograph.
 * The dominant layout unit for "here is a thing, here is what it is".
 */
export function Split({
  photo,
  photoAlt,
  n,
  caption,
  side = "right",
  tone = "ink",
  eyebrow,
  title,
  children,
  priority = false,
}: {
  photo: PhotoKey;
  photoAlt?: string;
  /** Figure number for the plate caption. */
  n: number;
  caption: string;
  /** Which side the photograph sits on. */
  side?: "left" | "right";
  tone?: Tone;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  priority?: boolean;
}) {
  const copyOrder = side === "right" ? "lg:order-1" : "lg:order-2";
  const photoOrder = side === "right" ? "lg:order-2" : "lg:order-1";
  const pad = side === "right" ? "bleed-l" : "bleed-r";

  return (
    <section className="grid border-t hair lg:grid-cols-2">
      <div
        className={`${toneClass(tone)} ${pad} ${copyOrder} order-2 py-16 lg:py-24`}
      >
        <div className="max-w-lg">
          {eyebrow && <p className="t-index mb-5 t-accent">{eyebrow}</p>}
          <h2>{title}</h2>
          <div className="t-muted">{children}</div>
        </div>
      </div>
      <div
        className={`relative order-1 min-h-[280px] bg-slab ${photoOrder} lg:min-h-[540px]`}
      >
        <Photo
          name={photo}
          alt={photoAlt}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* The plate caption sits on the image itself here, because the
            image is edge-to-edge and has no margin to caption into.
            Over a photograph everything is white — a mid-tone accent
            has no contrast floor against an unknown pixel. */}
        <figcaption className="over-photo t-spec absolute bottom-0 left-0 right-0 flex flex-wrap items-baseline gap-x-3 gap-y-1 bg-gradient-to-t from-ink/85 to-transparent px-5 pb-4 pt-10">
          <span className="uppercase tracking-[0.14em]">
            Fig.&nbsp;{String(n).padStart(2, "0")}
          </span>
          <span className="t-muted">{caption}</span>
        </figcaption>
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
      className="group relative block aspect-[16/10] overflow-hidden bg-slab focus-visible:outline-offset-0"
    >
      <Photo name={photo} tint sizes="(max-width: 768px) 100vw, 50vw" />
      <span className="over-photo absolute inset-x-0 bottom-0 z-10 p-6">
        <span className="flex items-center gap-3 text-[1.25rem] font-semibold tracking-[-0.025em]">
          {label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
        {caption && (
          <span className="t-spec mt-1.5 block t-muted">{caption}</span>
        )}
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------
   Steps.

   Numbered in mono against a copper rule. The number is the point —
   this is a sequence, and a sequence deserves an index rather than a
   bullet.
   ------------------------------------------------------------------ */

export function Steps({
  items,
  columns = 4,
}: {
  items: { title: string; body: string }[];
  columns?: 3 | 4;
}) {
  const cols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <ol className={`grid gap-x-8 gap-y-10 sm:grid-cols-2 ${cols}`}>
      {items.map((s, i) => (
        <li key={s.title} className="border-t-2 border-copper pt-5">
          <span className="t-index t-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-[1.2rem]">{s.title}</h3>
          <p className="mt-3 text-[0.94rem] leading-relaxed t-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------
   Router.

   Four ways people arrive at a scrap site, each sent to the page that
   answers them. It is a list of hairline rows rather than a grid of
   cards because the four options are not equivalent products to
   compare — they are a question ("which of these are you?") with one
   correct answer per reader, and a row list reads as exactly that.

   The whole row is the link, so the target is the width of the page on
   a phone rather than a two-word text link.
   ------------------------------------------------------------------ */

export function Router({
  items,
}: {
  items: { who: string; need: string; href: string; cta: string }[];
}) {
  return (
    <ul className="border-t hair">
      {items.map((a) => (
        <li key={a.who} className="border-b hair">
          <Link
            href={a.href}
            className="row-link group grid gap-x-10 gap-y-3 py-7 md:grid-cols-[minmax(0,22rem)_1fr] md:items-baseline"
          >
            <h3 className="text-[1.25rem]">{a.who}</h3>
            <div>
              <p className="measure-wide text-[0.96rem] leading-relaxed t-muted">
                {a.need}
              </p>
              <span className="t-spec mt-3 inline-flex items-center gap-2 uppercase tracking-[0.1em] t-accent">
                {a.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Definition rows separated by hairlines. */
export function DefinitionRows({
  items,
}: {
  items: { term: string; detail: string }[];
}) {
  return (
    <dl className="border-t hair">
      {items.map((it) => (
        <div
          key={it.term}
          className="grid gap-2 border-b hair py-6 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-10"
        >
          <dt className="text-[1.05rem] font-semibold">{it.term}</dt>
          <dd className="measure-wide text-[0.96rem] leading-relaxed t-muted">
            {it.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------
   Essay — the editorial long-form block.

   An asymmetric two-column arrangement: the heading holds the left
   rail and stays put while the argument scrolls past it on the right.
   That is the whole device. It works because the eye keeps a fixed
   reference point for what it is reading about, which a stacked
   heading loses the moment it scrolls away.

   Points are numbered in the margin rather than bulleted inline. A
   bullet says "here is a list"; a margin figure says "here is step two
   of four", which is the right signal for a sequence of reasoning.

   The sticky rail is deliberately lg-only. On a phone there is no
   second column to be sticky against, and a heading pinned over
   narrow prose eats the screen it is trying to explain.
   ------------------------------------------------------------------ */

export function Essay({
  id,
  index,
  eyebrow,
  title,
  lead,
  points,
  footer,
  tone = "ink",
}: {
  id?: string;
  /** Section number for the § index rail. */
  index: number;
  eyebrow: string;
  title: string;
  lead?: string;
  points: { term: string; detail: string }[];
  footer?: ReactNode;
  tone?: Tone;
}) {
  return (
    <section
      id={id}
      className={`${toneClass(tone)} scroll-mt-20 border-t hair py-20 lg:py-28`}
    >
      <div className="shell">
        <div className="border-b hair pb-4">
          <Index n={index} label={eyebrow} />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,23rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2>{title}</h2>
            {lead && <p className="t-lead measure mt-6 t-muted">{lead}</p>}
            {footer && <div className="mt-8">{footer}</div>}
          </div>

          <div className="border-t hair">
            {points.map((p, i) => (
              <article key={p.term} className="rise border-b hair py-8 first:pt-8">
                <p className="t-index t-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3">{p.term}</h3>
                <p className="measure-wide mt-4 leading-relaxed t-muted">
                  {p.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

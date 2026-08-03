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
 * Page introduction on the scale-paper surface.
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
      <div className="shell pb-20 pt-6 lg:pb-28 lg:pt-14">
        <p className="t-index mb-5 t-muted">{eyebrow}</p>
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
      <div className={`editorial-photo relative overflow-hidden bg-slab ${aspect}`}>
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
        className={`${toneClass(tone)} ${pad} ${copyOrder} order-2 py-14 lg:py-20`}
      >
        <div className="max-w-lg">
          {eyebrow && <p className="t-index mb-5 t-accent">{eyebrow}</p>}
          <h2>{title}</h2>
          <div className="t-muted">{children}</div>
        </div>
      </div>
      <div
        className={`editorial-photo relative order-1 min-h-[280px] bg-slab ${photoOrder} lg:min-h-[540px]`}
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
        <figcaption className="over-photo t-spec absolute bottom-0 left-0 right-0 flex flex-wrap items-baseline gap-x-3 gap-y-1 bg-furnace px-5 py-3">
          <span className="uppercase tracking-[0.14em]">
            Fig.&nbsp;{String(n).padStart(2, "0")}
          </span>
          <span className="t-muted">{caption}</span>
        </figcaption>
      </div>
    </section>
  );
}

/** Large photographic link tile with its label on a separate ruled plate. */
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
      className="group block border-y hair focus-visible:outline-offset-0"
    >
      <span className="editorial-photo relative block aspect-[16/10] bg-furnace">
        <Photo name={photo} sizes="(max-width: 768px) 100vw, 50vw" />
      </span>
      <span className="on-light flex items-start justify-between gap-5 bg-chalk px-1 py-4">
        <span>
          <span className="block text-xl font-semibold leading-tight underline decoration-1 underline-offset-4">
            {label}
          </span>
          {caption && (
            <span className="t-spec mt-1.5 block t-muted">{caption}</span>
          )}
        </span>
        <ArrowRight className="h-6 w-6 shrink-0 transition-transform duration-[160ms] ease-out group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------
   Steps.

   Numbered on one continuous ruled rail. The number is the point —
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
  const width = columns === 3 ? "max-w-4xl" : "max-w-5xl";
  return (
    <ol className={`border-y hair ${width}`}>
      {items.map((s, i) => (
        <li
          key={s.title}
          className="grid grid-cols-[3.5rem_1fr] border-b hair last:border-b-0 sm:grid-cols-[5rem_1fr]"
        >
          <span className="t-spec flex items-start justify-center border-r hair px-2 py-6 font-semibold t-muted">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="block px-5 py-6 sm:px-7">
            <h3 className="text-xl">{s.title}</h3>
            <span className="measure-wide mt-2 block text-base leading-relaxed t-muted">
              {s.body}
            </span>
          </span>
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
    <ul className="border-y hair">
      {items.map((a) => (
        <li key={a.who} className="border-b hair last:border-b-0">
          <Link
            href={a.href}
            className="group grid min-h-24 gap-3 py-6 transition-colors duration-[160ms] ease-out hover:bg-shaft md:grid-cols-[minmax(0,17rem)_1fr_auto] md:items-center md:gap-10 md:px-4"
          >
            <h3 className="text-xl">{a.who}</h3>
            <div>
              <p className="measure-wide text-base leading-relaxed t-muted">
                {a.need}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 self-start whitespace-nowrap text-sm font-semibold underline decoration-1 underline-offset-4 md:self-center">
              {a.cta}
              <ArrowRight className="h-6 w-6 transition-transform duration-[160ms] ease-out group-hover:translate-x-1" />
            </span>
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
    <dl className="border-y hair">
      {items.map((it) => (
        <div
          key={it.term}
          className="grid gap-2 border-b hair py-6 last:border-b-0 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-10"
        >
          <dt className="text-base font-semibold">{it.term}</dt>
          <dd className="measure-wide text-base leading-relaxed t-muted">
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

          <div className="border-y hair">
            {points.map((p, i) => (
              <article
                key={p.term}
                className="grid grid-cols-[3.5rem_1fr] border-b hair last:border-b-0 sm:grid-cols-[4.5rem_1fr]"
              >
                <p className="t-spec border-r hair px-2 py-7 text-center font-semibold t-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="px-5 py-7 sm:px-7">
                  <h3>{p.term}</h3>
                  <p className="measure-wide mt-3 leading-relaxed t-muted">
                    {p.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

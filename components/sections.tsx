import type { ReactNode } from "react";
import Photo from "@/components/Photo";
import type { PhotoKey } from "@/lib/photos";
import { Breadcrumbs } from "@/components/Schema";
import { Breadcrumb, type Tone, toneClass } from "@/components/ui";

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
  photo = "yard-wide",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  trail: { label: string; href?: string }[];
  photo?: PhotoKey;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark over-photo relative min-h-[430px] overflow-hidden bg-furnace lg:min-h-[500px]">
      {/* BreadcrumbList markup is emitted here from the SAME trail the
          <Breadcrumb> below renders. Putting it inside PageHeader means
          every page that shows a trail also describes it to crawlers,
          and the two physically cannot disagree — there is no second
          array to forget to update. */}
      <Breadcrumbs trail={trail} />
      <Photo
        name={photo}
        priority
        sizes="100vw"
        sourceWidth={2880}
        alt=""
      />
      <span aria-hidden="true" className="photo-scrim" />
      <div className="shell relative z-10 flex min-h-[430px] flex-col pb-16 pt-7 lg:min-h-[500px] lg:pb-20 lg:pt-8">
        <Breadcrumb trail={trail} />
        <div className="my-auto mx-auto max-w-4xl py-10 text-center lg:py-14">
          <p className="t-index mb-5 t-muted">{eyebrow}</p>
          <h1>{title}</h1>
          {intro && (
            <p className="t-lead mx-auto mt-6 max-w-[62ch] t-muted">{intro}</p>
          )}
          {children && (
            <div className="mx-auto mt-8 max-w-3xl [&_.btn]:w-full sm:[&_.btn]:w-auto">
              {children}
            </div>
          )}
        </div>
      </div>
      <p className="t-spec absolute bottom-4 right-5 z-10 bg-furnace/90 px-2 py-1 text-white">
        Illustrative industry image
      </p>
    </section>
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
    <section className="grid lg:grid-cols-2">
      <div
        className={`${toneClass(tone)} ${pad} ${copyOrder} order-2 flex items-center py-16 lg:min-h-[600px] lg:py-24`}
      >
        <div className="max-w-lg">
          {eyebrow && <p className="t-index mb-5 t-accent">{eyebrow}</p>}
          <h2>{title}</h2>
          <div className="t-muted">{children}</div>
        </div>
      </div>
      <figure
        className={`editorial-photo relative order-1 min-h-[340px] bg-slab ${photoOrder} lg:min-h-[600px]`}
      >
        <Photo
          name={photo}
          alt={photoAlt}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          sourceWidth={1800}
        />
        {/* The plate caption sits on the image itself here, because the
            image is edge-to-edge and has no margin to caption into.
            Over a photograph everything is white — a mid-tone accent
            has no contrast floor against an unknown pixel. */}
        <figcaption className="over-photo t-spec absolute bottom-0 left-0 flex flex-wrap items-baseline gap-x-2 gap-y-1 bg-furnace px-4 py-2">
          <span className="uppercase tracking-[0.14em]">
            Illustrative image · Fig.&nbsp;{String(n).padStart(2, "0")}
          </span>
          <span className="t-muted">{caption}</span>
        </figcaption>
      </figure>
    </section>
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

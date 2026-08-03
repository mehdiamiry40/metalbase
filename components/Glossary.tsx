import { glossary, type GlossaryEntry } from "@/lib/site";

/* ==================================================================
   The glossary.

   Every docket, rate board and phone call in this trade is conducted
   in vocabulary nobody explains to a first-time seller — tare, HMS 2,
   bare bright, treatment charge — and being unable to follow the
   language is most of why people feel the number was decided without
   them.

   Typeset as a reference document rather than an article: a light
   sheet, terms in mono because they are codes, a one-line definition
   that stands alone, and the longer note underneath for anyone who
   wants it. That structure means the page is usable by someone
   scanning for one word, which is how a glossary is actually read.
   ================================================================== */

const groups = ["Weighing & settlement", "Grades & materials", "Processing & plant"] as const;

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function Entry({ entry }: { entry: GlossaryEntry }) {
  return (
    <div
      id={slug(entry.term)}
      className="grid scroll-mt-24 gap-x-12 gap-y-2 border-b hair py-7 md:grid-cols-[minmax(0,16rem)_1fr]"
    >
      <dt className="mono text-[1rem] font-medium leading-snug">
        {entry.term}
      </dt>
      <dd>
        <p className="measure-wide text-[1rem] leading-relaxed">
          {entry.short}
        </p>
        {entry.detail && (
          <p className="measure-wide mt-3 text-[0.94rem] leading-relaxed t-muted">
            {entry.detail}
          </p>
        )}
      </dd>
    </div>
  );
}

export function GlossaryIndex() {
  return (
    <nav aria-label="Glossary sections" className="ruled grid-cols-1 sm:grid-cols-3">
      {groups.map((g) => {
        const n = glossary.filter((e) => e.group === g).length;
        return (
          <a key={g} href={`#${slug(g)}`} className="row-link block px-5 py-5">
            <span className="t-spec block uppercase tracking-[0.1em] t-accent">
              {n} terms
            </span>
            <span className="mt-2 block text-[1.05rem] font-medium leading-snug">
              {g}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

export function GlossaryList() {
  return (
    <div className="space-y-16">
      {groups.map((g) => {
        const entries = glossary.filter((e) => e.group === g);
        if (!entries.length) return null;
        return (
          <section key={g} id={slug(g)} className="scroll-mt-24">
            <h2 className="border-b-2 border-[color:currentColor] pb-3 text-[1.6rem]">
              {g}
            </h2>
            <dl className="mt-2 border-t hair">
              {entries.map((e) => (
                <Entry key={e.term} entry={e} />
              ))}
            </dl>
          </section>
        );
      })}
    </div>
  );
}

/**
 * DefinedTermSet markup, generated from the same array the page
 * renders. Same rule as the FAQ schema: there is deliberately no way
 * to describe a different set of terms to a crawler than the one a
 * reader sees.
 */
export function GlossarySchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Scrap metal terms",
    hasDefinedTerm: glossary.map((e) => ({
      "@type": "DefinedTerm",
      name: e.term,
      description: e.detail ? `${e.short} ${e.detail}` : e.short,
    })),
  };
  return (
    <script
      type="application/ld+json"
      // Serialised from a typed constant; no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

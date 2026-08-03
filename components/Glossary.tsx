import { glossary, type GlossaryEntry } from "@/lib/site";
import { ArrowRight } from "@/components/ui";

/* ==================================================================
   The glossary.

   Every docket, grade guide and phone call in this trade is conducted
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
      <dt className="mono text-base font-medium leading-snug">
        {entry.term}
      </dt>
      <dd>
        <p className="measure-wide text-base leading-relaxed">
          {entry.short}
        </p>
        {entry.detail && (
          <p className="measure-wide mt-3 text-base leading-relaxed t-muted">
            {entry.detail}
          </p>
        )}
      </dd>
    </div>
  );
}

export function GlossaryIndex() {
  return (
    <nav aria-label="Glossary sections" className="border-y hair">
      {groups.map((g) => {
        const n = glossary.filter((e) => e.group === g).length;
        return (
          <a
            key={g}
            href={`#${slug(g)}`}
            className="group grid min-h-14 grid-cols-[1fr_auto] items-center gap-6 border-b hair py-4 transition-colors duration-[160ms] ease-out last:border-b-0 hover:text-steel"
          >
            <span className="text-base font-medium leading-snug underline decoration-1 underline-offset-4">
              {g}
            </span>
            <span className="flex items-center gap-4">
              <span className="t-spec uppercase tracking-[0.1em] t-muted">
              {n} terms
              </span>
              <ArrowRight className="h-6 w-6 transition-transform duration-[160ms] ease-out group-hover:translate-x-1" />
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
            <h2 className="border-b hair pb-3 text-3xl">
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

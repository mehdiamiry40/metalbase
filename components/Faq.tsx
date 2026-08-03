import type { Faq } from "@/lib/site";

/**
 * Accordion built on <details>/<summary>.
 *
 * Deliberately not a JS disclosure. The native element is keyboard
 * operable, announced correctly by screen readers, open-by-default
 * when a user hits Ctrl+F, and printable — all of which a div-and-
 * useState version has to reimplement and usually gets wrong. It also
 * means the answers are in the DOM for crawlers without hydration.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-[color:var(--hair)] border-y hair">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
            {f.q}
            {/* Copper is a fill here and carries no text, so it is legal
                on both surfaces — the accent cannot do typographic work
                on chalk. The rotating half is a pseudo-element so the
                whole control is one node rather than two crossed rules
                that have to be kept in sync. */}
            <span
              aria-hidden="true"
              className="relative mt-2 h-[2px] w-4 shrink-0 bg-copper before:absolute before:inset-0 before:rotate-90 before:bg-copper before:transition-transform before:duration-200 before:content-[''] group-open:before:rotate-0"
            />
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed t-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * FAQPage structured data, generated from the SAME array the page
 * renders. Google penalises FAQ markup that does not match visible
 * content, and hand-maintaining a parallel copy is how that drift
 * happens — so there is deliberately no way to pass different text
 * to the markup than to the page.
 *
 * The `todo` field is intentionally NOT emitted. It is an internal
 * note to the operator, not an answer to a customer.
 */
export function FaqSchema({ items }: { items: Faq[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
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

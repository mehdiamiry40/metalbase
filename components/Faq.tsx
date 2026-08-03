import type { Faq } from "@/lib/site";
import { ChevronDown } from "@/components/ui";

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
    <div className="border-t hair">
      {items.map((f) => (
        <details key={f.q} className="group border-b hair px-1 sm:px-2">
          <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-xl font-semibold leading-tight marker:content-none [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown className="h-6 w-6 shrink-0 group-open:rotate-180" />
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

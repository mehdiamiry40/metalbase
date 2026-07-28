import { SITE, company } from "@/lib/site";

/* ------------------------------------------------------------------
   Structured data helpers.

   One rule throughout: schema is generated from the same values the
   page renders, never hand-copied alongside it. Search engines treat
   markup that contradicts the visible page as a manual-action risk,
   and a parallel hand-maintained copy is exactly how that drift
   starts.

   Equally important — nothing here invents a fact to satisfy a
   schema field. Where the business detail is genuinely unknown the
   property is omitted, because an absent property is neutral while a
   wrong one is a liability. That is why aggregateRating and
   priceRange appear nowhere: both are commonly faked to win rich
   results, and there is no honest value for either yet.
   ------------------------------------------------------------------ */

function Ld({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Serialised from typed objects built in this module; no user
      // input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * BreadcrumbList. The trail is already rendered visually by
 * <Breadcrumb>, so this takes the identical array and mirrors it.
 */
export function Breadcrumbs({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.label,
          // The final crumb is the current page and carries no href;
          // schema.org allows a ListItem without `item` in that spot.
          ...(t.href ? { item: `${SITE}${t.href === "/" ? "" : t.href}` } : {}),
        })),
      }}
    />
  );
}

/**
 * Service schema for a single service page.
 *
 * `areaServed` is Brisbane rather than a fabricated radius, and
 * `provider` points at the same organisation described in the root
 * layout so the graph stays consistent.
 */
export function ServiceSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType: name,
        url: `${SITE}/services/${slug}`,
        areaServed: { "@type": "City", name: "Brisbane" },
        provider: {
          "@type": "RecyclingCenter",
          name: company.name,
          legalName: company.legal,
          url: SITE,
        },
      }}
    />
  );
}

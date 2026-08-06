import { SITE, company, operations, serviceHref } from "@/lib/site";

/** Stable identity shared by every schema node that refers to MetalBase. */
export const ORGANIZATION_ID = `${SITE}/#organization`;

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
 * Describes an editorial regional guide without pretending MetalBase has a
 * branch, yard or street address in that place. `about` identifies the
 * geographic subject of the page; the publisher remains the single
 * organisation node from the root layout.
 */
export function AreaGuideSchema({
  slug,
  name,
  title,
  description,
}: {
  slug: string;
  name: string;
  title: string;
  description: string;
}) {
  return (
    <Ld data={areaGuideSchemaData({ slug, name, title, description })} />
  );
}

export function areaGuideSchemaData({
  slug,
  name,
  title,
  description,
}: {
  slug: string;
  name: string;
  title: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE}/locations/${slug}#webpage`,
    url: `${SITE}/locations/${slug}`,
    name: title,
    description,
    about: { "@type": "Place", name },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/**
 * Service schema for a single service page.
 *
 * `areaServed` mirrors the verified mobile service regions, and `provider`
 * points at the same organisation described in the root layout. A physical
 * RecyclingCenter is deliberately not claimed because customers cannot visit.
 */
export function ServiceSchema({
  name,
  description,
  slug,
  verified,
}: {
  name: string;
  description: string;
  slug: string;
  verified: boolean;
}) {
  const data = serviceSchemaData({ name, description, slug, verified });
  if (!data) return null;

  return <Ld data={data} />;
}

export function serviceSchemaData(
  {
    name,
    description,
    slug,
    verified,
  }: {
    name: string;
    description: string;
    slug: string;
    verified: boolean;
  },
): Record<string, unknown> | null {
  if (!verified) return null;

  return (
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      description,
      serviceType: name,
      url: `${SITE}${serviceHref({ slug })}`,
      areaServed: operations.serviceRegions.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      provider: {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: company.name,
        ...(company.legal ? { legalName: company.legal } : {}),
        url: SITE,
      },
    }
  );
}

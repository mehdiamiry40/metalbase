import { ServiceSchema } from "@/components/Schema";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DefinitionRows, PageHeader, Split } from "@/components/sections";
import {
  ArrowRight,
  Button,
  Section,
  SectionHead,
} from "@/components/ui";
import { serviceHref, services } from "@/lib/site";
import type { PhotoKey } from "@/lib/photos";
import { pageMetadata } from "@/lib/metadata";

const detailPhotos: Record<string, PhotoKey> = {
  "collection-and-bins": "tipper",
  industrial: "machine-swarf",
  demolition: "stainless",
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return pageMetadata({
    path: `/services/${slug}`,
    title: "Service not found",
    description: "The requested MetalBase service page could not be found.",
  });
  return pageMetadata({
    path: serviceHref(service),
    title: service.seoTitle,
    description: service.seoDescription,
  });
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <ServiceSchema
        name={service.title}
        description={`${service.title} options are scoped and confirmed in writing for each site.`}
        slug={service.slug}
        verified={service.verified}
      />
      <PageHeader
        eyebrow={service.audience}
        photo={service.photo}
        title={service.title}
        intro={service.blurb}
        trail={[
          { label: "Home", href: "/" },
          { label: "For business", href: "/services" },
          { label: service.title },
        ]}
      >
        <Button href="/contact">Start an enquiry</Button>
      </PageHeader>

      <Split
        photo={detailPhotos[service.slug] ?? "yard-wide"}
        side="right"
        tone="ink"
        n={1}
        caption={`${service.title} planning reference`}
        eyebrow="What to send"
        title="Start with five useful details"
      >
        <p className="t-lead mt-5">
          Send the material type, approximate quantity, suburb, access
          constraints and any visible markings. Exact measurements are not
          needed to begin.
        </p>
      </Split>

      <Section tone="slab" className="pb-20 pt-12 lg:pb-28 lg:pt-16">
        <SectionHead
          index={1}
          eyebrow="Capabilities"
          title={`What to discuss for ${service.title.toLowerCase()}`}
          intro="These are common options, not a promise that every item suits every site. The written proposal confirms what is available for your job."
        />
        <DefinitionRows
          items={service.points.map((p) => ({ term: p.title, detail: p.body }))}
        />
      </Section>

      <Section tone="slab" className="pb-16 pt-10 lg:pb-20 lg:pt-12">
        <SectionHead index={2} eyebrow="Elsewhere" title="Other services" />
        <div className="divide-y divide-[color:var(--hair)] border-y hair">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={serviceHref(o)}
              className="row-link group grid gap-3 py-7 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12"
            >
              <h3 className="group-hover:text-[color:var(--accent-text)]">
                {o.title}
              </h3>
              <div>
                <p className="measure-wide t-muted">
                  Scope, availability and commercial terms are confirmed for
                  each site.
                </p>
                <span className="t-spec mt-3 inline-flex items-center gap-2 uppercase tracking-[0.1em]">
                  Read more
                  <ArrowRight className="h-3.5 w-3.5 t-accent transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

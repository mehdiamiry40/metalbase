import type { Metadata } from "next";
import { ServiceSchema } from "@/components/Schema";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DefinitionRows, PageHeader, Split, Steps } from "@/components/sections";
import {
  ArrowRight,
  Button,
  Callout,
  Section,
  SectionHead,
  TickList,
} from "@/components/ui";
import { services } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.title} — Brisbane`,
    description: `${service.title} for Brisbane businesses. Site scope, equipment, availability, reporting and commercial terms are confirmed in writing for each job.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

const onboarding = [
  {
    title: "Describe the site",
    body: "Provide the address, access constraints, material, approximate volume and the way it is generated.",
  },
  {
    title: "Confirm the scope",
    body: "The proposal should name equipment, responsibilities, timing, pricing assumptions and reporting requirements.",
  },
  {
    title: "Complete site requirements",
    body: "Resolve inductions, permits, placement, traffic controls and procurement documents before work is scheduled.",
  },
  {
    title: "Review the records",
    body: "Check the agreed weight, grade, movement and settlement records against the written scope.",
  },
];

/* The five things that decide whether a quote is a real number or a
   range with a disclaimer on it. Published because a customer who
   brings them to the first call gets a firm answer a fortnight
   earlier, and because "it depends" is a poor substitute for saying
   what it depends on. */
const toQuote = [
  "The site address, and whether a truck can turn and stand there",
  "Roughly what the metal is — one alloy, or a bit of everything",
  "How much accumulates, and over what period",
  "Whether it's already separated at the point it's generated",
  "Any site rules we'd be working under — inductions, hours, permits",
];

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
      />
      <PageHeader
        eyebrow={service.audience}
        title={service.title}
        intro="Use this page to prepare the scope. Equipment, coverage, timing, reporting and commercial terms are confirmed in writing for each site."
        trail={[
          { label: "Home", href: "/" },
          { label: "For business", href: "/services" },
          { label: service.title },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Request a quote</Button>
          <Button href="/prices" variant="ghost">
            How pricing works
          </Button>
        </div>
      </PageHeader>

      <Split
        photo={service.photo}
        side="right"
        tone="ink"
        n={1}
        caption={`${service.title} — material handled on site`}
        eyebrow="What you get"
        title="What the proposal needs to settle"
        priority
      >
        <p className="t-lead mt-5">
          A workable scope names the material, site access, equipment,
          responsibilities, pricing assumptions and the records you need.
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

      <Section id="onboarding" className="scroll-mt-20 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <SectionHead
          index={2}
          eyebrow="Getting started"
          title="From site details to an agreed scope"
          intro="Timing depends on access, equipment, approvals and the material involved."
        />
        <Steps items={onboarding} />
      </Section>

      {/* --------------------------------------------------- to quote it
          New section. Half of every first call is spent establishing
          the same five facts, and a customer who arrives with them gets
          a firm proposal rather than a range. Cheap to publish, and it
          makes the next step concrete instead of "get in touch". */}
      <Section id="what-we-need" tone="chalk" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHead
              index={3}
              eyebrow="Before the first call"
              title="What to send for a useful proposal"
              intro="None of it has to be exact. Approximate answers to all five beat a precise answer to one, and they are the difference between a firm number and a range with a disclaimer on it."
              className="mb-0"
            />
            <div className="mt-8">
              <Button href="/contact">Send it through</Button>
            </div>
          </div>
          <div>
            <TickList items={toQuote} />
            <Callout className="mt-8">
              Photographs are worth more than descriptions for all of it —
              a picture of the pile and a picture of the gate answers most of
              this list at once.
            </Callout>
          </div>
        </div>
      </Section>

      <Section tone="slab" className="pb-16 pt-10 lg:pb-20 lg:pt-12">
        <SectionHead index={4} eyebrow="Elsewhere" title="Other services" />
        <div className="divide-y divide-[color:var(--hair)] border-y hair">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/services/${o.slug}`}
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

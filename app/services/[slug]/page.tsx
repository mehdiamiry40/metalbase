import type { Metadata } from "next";
import { ServiceSchema } from "@/components/Schema";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DefinitionRows, PageHeader, Split, Steps } from "@/components/sections";
import {
  ArrowRight,
  Button,
  Callout,
  CtaBand,
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
    description: service.blurb.slice(0, 155),
    alternates: { canonical: `/services/${service.slug}` },
  };
}

const onboarding = [
  {
    title: "Site walk",
    body: "We look at where the metal is actually generated, not where the bin currently sits.",
  },
  {
    title: "Written proposal",
    body: "Bin plan, swap frequency, indicative rates and the reporting you'll receive.",
  },
  {
    title: "Equipment on site",
    body: "Bins and signage delivered, crews inducted, first collection scheduled.",
  },
  {
    title: "Reconciliation",
    body: "Tonnage by grade against the index, rebate paid on a fixed day.",
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
        description={service.blurb}
        slug={service.slug}
      />
      <PageHeader
        eyebrow={service.audience}
        title={service.title}
        intro={service.blurb}
        trail={[
          { label: "Home", href: "/" },
          { label: "For business", href: "/services" },
          { label: service.title },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Request a quote</Button>
          <Button href="/prices" variant="ghost">
            Rate board
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
        title="How it works in practice"
        priority
      >
        <p className="t-lead mt-5">
          Every arrangement is written down before it starts — what turns up,
          how often, what it&rsquo;s worth and what you receive on paper.
        </p>
      </Split>

      <Section tone="slab">
        <SectionHead
          index={1}
          eyebrow="The detail"
          title={`What ${service.title.toLowerCase()} involves`}
        />
        <DefinitionRows
          items={service.points.map((p) => ({ term: p.title, detail: p.body }))}
        />
      </Section>

      <Section id="onboarding" className="scroll-mt-20">
        <SectionHead
          index={2}
          eyebrow="Getting started"
          title="From first call to first rebate"
          intro="Usually two to three weeks, faster if the site is already segregated."
        />
        <Steps items={onboarding} />
      </Section>

      {/* --------------------------------------------------- to quote it
          New section. Half of every first call is spent establishing
          the same five facts, and a customer who arrives with them gets
          a firm proposal rather than a range. Cheap to publish, and it
          makes the next step concrete instead of "get in touch". */}
      <Section id="what-we-need" tone="chalk" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHead
              index={3}
              eyebrow="Before the first call"
              title="What we need to quote it properly"
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

      <Section tone="slab">
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
                <p className="measure-wide t-muted">{o.blurb}</p>
                <span className="t-spec mt-3 inline-flex items-center gap-2 uppercase tracking-[0.1em]">
                  Read more
                  <ArrowRight className="h-3.5 w-3.5 t-accent transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title={`Ready to talk about ${service.title.toLowerCase()}?`}
        body="Send through your site details and rough volumes. We'll come back inside one business day with a written proposal and indicative rates."
        primary={{ label: "Request a quote", href: "/contact" }}
        secondary={{ label: "All services", href: "/services" }}
      />
    </>
  );
}

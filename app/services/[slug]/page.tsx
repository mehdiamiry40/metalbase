import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DefinitionRows, PageHeader, Split, Steps } from "@/components/sections";
import { ArrowRight, Button, CtaBand, Section } from "@/components/ui";
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
  };
}

const onboarding = [
  { title: "Site walk", body: "We look at where the metal is actually generated, not where the bin currently sits." },
  { title: "Written proposal", body: "Bin plan, swap frequency, indicative rates and the reporting you'll receive." },
  { title: "Equipment on site", body: "Bins and signage delivered, crews inducted, first collection scheduled." },
  { title: "Reconciliation", body: "Tonnage by grade against the index, rebate paid on a fixed day." },
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
        <div className="flex flex-wrap gap-4">
          <Button href="/contact">Request a quote</Button>
          <Button href="/prices" variant="outlinePaper">
            Rate board
          </Button>
        </div>
      </PageHeader>

      <Split
        photo={service.photo}
        side="right"
        tone="paper"
        eyebrow="What you get"
        title="How it works in practice"
        priority
      >
        <p className="t-lead mt-5">
          Every arrangement is written down before it starts — what turns up,
          how often, what it&rsquo;s worth and what you receive on paper.
        </p>
      </Split>

      <Section className="!pt-0">
        <DefinitionRows
          items={service.points.map((p) => ({ term: p.title, detail: p.body }))}
        />
      </Section>

      <section className="bg-paper-deep py-16 lg:py-24">
        <div className="shell">
          <div className="rule max-w-3xl">
            <h2>From first call to first rebate</h2>
            <p className="t-lead mt-5 text-slate">
              Usually two to three weeks, faster if the site is already
              segregated.
            </p>
          </div>
          <div className="mt-12">
            <Steps items={onboarding} />
          </div>
        </div>
      </section>

      <Section tone="deep">
        <h2 className="rule">Other services</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/services/${o.slug}`}
              className="group grid gap-3 py-7 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12"
            >
              <h3 className="group-hover:text-brand-text">{o.title}</h3>
              <div>
                <p className="text-slate">{o.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.94rem] font-semibold">
                  Read more
                  <ArrowRight className="h-4 w-4 text-brand-text transition-transform group-hover:translate-x-1" />
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

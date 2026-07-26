import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Scene from "@/components/Scene";
import {
  ArrowLink,
  Button,
  Chevron,
  CtaBand,
  Eyebrow,
  Section,
  SectionHead,
  StatBand,
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
    title: `${service.title.replace(/\b\w/g, (c) => c.toUpperCase())} — Brisbane`,
    description: service.blurb.slice(0, 155),
  };
}

const process = [
  {
    t: "site walk",
    b: "we look at where the metal is actually generated, not where the bin currently sits.",
  },
  {
    t: "written proposal",
    b: "bin plan, swap frequency, indicative rates and the reporting you'll receive.",
  },
  {
    t: "equipment on site",
    b: "bins and signage delivered, crews inducted, first collection scheduled.",
  },
  {
    t: "monthly reconciliation",
    b: "tonnage by grade against the index, rebate paid on a fixed day.",
  },
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
      <PageHero
        eyebrow={service.audience}
        title={service.title}
        intro={service.blurb}
        scene={service.scene}
        trail={[
          { label: "home", href: "/" },
          { label: "for business", href: "/services" },
          { label: service.title },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">request a quote</Button>
          <Button href="/prices" variant="outline">
            today&apos;s rates
          </Button>
        </div>
      </PageHero>

      {/* stats -------------------------------------------------------- */}
      <div className="bg-white pt-14">
        <div className="shell">
          <StatBand
            items={service.stats.map((s) => ({
              value: s.value,
              label: s.label,
            }))}
            tone="sky"
          />
        </div>
      </div>

      {/* detail ------------------------------------------------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>what you get</Eyebrow>
            <h2 className="text-[1.8rem] lg:text-[2.3rem]">
              how it works in practice
            </h2>
            <div
              className="mt-6 h-1.5 w-24 rounded-full"
              style={{ background: service.accent }}
            />
            <p className="mt-6 text-[1rem] leading-relaxed text-muted">
              every arrangement is written down before it starts — what turns
              up, how often, what it&apos;s worth and what you receive on paper.
            </p>
            <div className="mt-7">
              <ArrowLink href="/contact">talk to the trade desk</ArrowLink>
            </div>
          </div>

          <div className="space-y-8">
            {service.points.map((p, i) => (
              <div
                key={p.title}
                className="border-l-4 pl-7"
                style={{ borderColor: service.accent }}
              >
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-[1.4rem] leading-snug">{p.title}</h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* process ------------------------------------------------------ */}
      <Section tone="navy">
        <SectionHead
          eyebrow="onboarding"
          title="from first call to first rebate"
          intro="usually two to three weeks, faster if the site is already segregated."
          tone="white"
        />
        <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.t} className="rounded-2xl bg-white/[0.06] p-7">
              <span className="text-[2rem] font-bold leading-none text-amber">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 !text-white text-[1.2rem]">{p.t}</h3>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-white/75">
                {p.b}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* other services ----------------------------------------------- */}
      <Section tone="sky">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[1.8rem] lg:text-[2.4rem]">other services</h2>
          <ArrowLink href="/services">all services</ArrowLink>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/services/${o.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(15,25,65,0.6)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Scene name={o.scene} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[1.25rem]">{o.title}</h3>
                <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-muted">
                  {o.blurb.split(".")[0]}.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-bold lowercase text-navy">
                  <Chevron className="h-4 w-4 text-blue transition-transform group-hover:translate-x-1" />
                  learn more
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title={`ready to talk about ${service.title}?`}
        body="send through your site details and rough volumes. we'll come back inside one business day with a written proposal and indicative rates."
        primary={{ label: "request a quote", href: "/contact" }}
        secondary={{ label: "call 1300 metal b", href: "tel:1300638252" }}
      />
    </>
  );
}

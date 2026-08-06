import Link from "next/link";
import Photo from "@/components/Photo";
import { PageHeader } from "@/components/sections";
import {
  ArrowRight,
  Button,
  Section,
  SectionHead,
  TickList,
} from "@/components/ui";
import { regionHref, regions } from "@/lib/regions";
import { serviceHref, services } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/services",
  title: "Commercial Scrap Metal Services South East Queensland",
  description:
    "Plan a South East Queensland scrap metal collection, industrial offcut program or demolition steel enquiry around your material and site.",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="For business"
        photo="tipper"
        title="Commercial scrap services"
        intro="Tell us the material, quantity, site and handling needs. Available collection, container and project options are confirmed for each enquiry."
        trail={[{ label: "Home", href: "/" }, { label: "For business" }]}
      >
        <Button href="/contact">Start an enquiry</Button>
      </PageHeader>

      <Section className="pb-20 pt-10 lg:pb-28 lg:pt-14">
        <div className="divide-y divide-[color:var(--hair)] border-y hair">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={serviceHref(s)}
              className="row-link group grid gap-6 py-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slab lg:aspect-[4/3]">
                <Photo
                  name={s.photo}
                  sizes="(max-width: 1024px) calc(100vw - 2.5rem), 22rem"
                  sourceWidth={900}
                  quality={64}
                />
              </div>
              <div className="self-center">
                <p className="t-index t-accent">{s.audience}</p>
                <h2 className="mt-3 group-hover:text-[color:var(--accent-text)]">
                  {s.title}
                </h2>
                <span className="t-spec mt-5 inline-flex items-center gap-2 uppercase tracking-[0.1em]">
                  Review scope and options
                  <ArrowRight className="h-3.5 w-3.5 t-accent transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="slab" className="pb-24 pt-16 lg:pb-32 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              index={1}
              eyebrow="What to send"
              title="Three details are enough to start"
              intro="Approximate information is enough for the first conversation."
              className="mb-0"
            />
            <TickList
              className="mt-8"
              items={[
                "Material type and approximate quantity",
                "Suburb, access details and preferred timing",
                "Condition, attachments and any visible markings",
              ]}
            />
            <div className="mt-8">
              <Button href="/contact">Start an enquiry</Button>
            </div>
          </div>
          <div>
            <h3>Regional enquiry guides</h3>
            <ul className="mt-6 border-y hair">
              {regions.map((region) => (
                <li key={region.slug} className="border-b hair last:border-b-0">
                  <Link
                    href={regionHref(region)}
                    className="group flex min-h-14 items-center justify-between gap-4 py-2 font-semibold transition-colors duration-[160ms] ease-out hover:text-signal"
                  >
                    {region.name}
                    <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-[160ms] ease-out group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm t-muted">
              Send the exact site address. Collection coverage, minimum volume
              and equipment are confirmed per job.
            </p>
          </div>
        </div>
      </Section>

    </>
  );
}

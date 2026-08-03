import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/Faq";
import { AreaGuideSchema } from "@/components/Schema";
import { PageHeader, Split } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  ChipList,
  Section,
  SectionHead,
  TickList,
  YardIcon,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { getRegion, regions } from "@/lib/regions";

type RegionPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  return pageMetadata({
    path: `/locations/${region.slug}`,
    title: region.seoTitle,
    description: region.seoDescription,
  });
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const trail = [
    { label: "Home", href: "/" },
    { label: "Area guides", href: "/locations" },
    { label: region.breadcrumbName },
  ];
  const otherRegions = regions.filter((item) => item.slug !== region.slug);

  return (
    <>
      <AreaGuideSchema
        slug={region.slug}
        name={region.name}
        title={region.h1}
        description={region.seoDescription}
      />
      <PageHeader
        eyebrow={region.eyebrow}
        photo={region.heroPhoto}
        title={region.h1}
        intro={region.intro}
        trail={trail}
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/contact">Start an enquiry</Button>
          <Button href="/prices" variant="ghost">
            How pricing works
          </Button>
        </div>
      </PageHeader>

      <Section className="pb-16 pt-10 lg:pb-20 lg:pt-12">
        <SectionHead
          index={1}
          eyebrow="Quote details"
          title={region.detailTitle}
          intro={region.detailIntro}
        />
        <ol className="grid border-y hair sm:grid-cols-2 lg:grid-cols-4">
          {region.details.map((item, index) => (
            <li
              key={item.title}
              className={`py-7 sm:min-h-56 ${
                index === 0
                  ? "sm:pr-7"
                  : index === 1
                    ? "border-t hair sm:border-l sm:border-t-0 sm:pl-7 lg:pr-7"
                    : index === 2
                      ? "border-t hair sm:pr-7 lg:border-l lg:border-t-0 lg:px-7"
                      : "border-t hair sm:border-l sm:pl-7 lg:border-t-0"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <YardIcon name={item.icon} className="h-9 w-9" />
                <span className="text-xs font-semibold tracking-[0.08em] t-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7">{item.title}</h3>
              <p className="mt-3 t-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Split
        photo={region.focusPhoto}
        side="right"
        tone="slab"
        n={2}
        caption={region.focusCaption}
        eyebrow={`${region.name} enquiries`}
        title={region.focusTitle}
      >
        <p className="mt-5 leading-relaxed">{region.focusBody}</p>
        <TickList items={region.focusPoints} className="mt-8" />
        <ArrowLink href="/services/collection-and-bins" className="mt-8">
          Collection and container guide
        </ArrowLink>
      </Split>

      <Section tone="sheet">
        <SectionHead
          index={3}
          eyebrow="Material + place"
          title="Describe the load precisely"
          intro="Use the material guide for the grade, then include the exact suburb and address in your enquiry."
        />
        <div className="grid border-y hair lg:grid-cols-2">
          <div className="py-8 lg:border-r lg:pr-12 hair">
            <p className="t-index t-accent">Common material groups</p>
            <ul className="mt-5 divide-y divide-[color:var(--hair)] border-t hair">
              {region.materials.map((material) => (
                <li key={material.label}>
                  <Link
                    href={material.href}
                    className="group flex min-h-16 items-center justify-between gap-5 py-3 font-semibold transition-colors duration-[160ms] ease-out hover:text-signal"
                  >
                    <span>{material.label}</span>
                    <span
                      aria-hidden="true"
                      className="text-xl transition-transform duration-[160ms] ease-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t hair py-8 lg:border-t-0 lg:pl-12">
            <p className="t-index t-accent">Suburb examples</p>
            <ChipList items={region.places} className="mt-5" />
            <p className="mt-6 text-sm leading-relaxed t-muted">
              {region.placeNote}
            </p>
          </div>
        </div>
        <Callout className="mt-10" label="Before anything moves">
          Confirm the receiving location, accepted material and current
          instructions. For collection, equipment, minimum volume and timing
          are assessed for the proposed site.{" "}
          <ArrowLink href="/contact" tone="accent">
            Send the details
          </ArrowLink>
        </Callout>
      </Section>

      <Section tone="slab">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="t-index mb-4 t-accent">Useful answers</p>
            <h2>{region.name} enquiry questions</h2>
            <ArrowLink href="/faq" className="mt-8">
              See all FAQs
            </ArrowLink>
          </div>
          <FaqList items={region.faqs} />
        </div>

        <nav aria-label="Other regional guides" className="mt-14 border-t hair pt-8">
          <p className="t-index t-accent">Other area guides</p>
          <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
            {otherRegions.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/locations/${item.slug}`}
                  className="inline-flex min-h-11 items-center font-semibold u-link"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList, FaqSchema } from "@/components/Faq";
import { DefinitionRows, PageHeader, Steps } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  ChipList,
  Section,
  SectionHead,
} from "@/components/ui";
import { getMaterial, materialHref, materials } from "@/lib/materials";
import { pageMetadata } from "@/lib/metadata";

type MaterialPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return materials.map((material) => ({ slug: material.slug }));
}

export async function generateMetadata({
  params,
}: MaterialPageProps): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterial(slug);
  if (!material) notFound();

  return pageMetadata({
    path: materialHref(material),
    title: material.seoTitle,
    description: material.seoDescription,
  });
}

export default async function MaterialPage({ params }: MaterialPageProps) {
  const { slug } = await params;
  const material = getMaterial(slug);
  if (!material) notFound();

  const relatedMaterials = materials.filter((item) => item.slug !== slug);

  return (
    <>
      <FaqSchema items={material.faqs} />
      <PageHeader
        eyebrow={material.eyebrow}
        photo={material.photo}
        title={material.h1}
        intro={material.intro}
        trail={[
          { label: "Home", href: "/" },
          { label: "What we buy", href: "/what-we-buy" },
          { label: material.shortName },
        ]}
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/contact">Request a quote</Button>
          <Button href="/prices" variant="ghost">
            How pricing works
          </Button>
        </div>
      </PageHeader>

      <Section className="pb-20 pt-12 lg:pb-24 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <SectionHead
              index={1}
              eyebrow="Material overview"
              title={`Start with the ${material.shortName.toLowerCase()} form`}
              intro={material.overview}
              className="mb-0"
            />
          </div>
          <div className="lg:pt-[4.6rem]">
            <p className="t-index t-accent">Common enquiry examples</p>
            <ChipList items={material.examples} className="mt-5" />
            <Callout className="mt-8" label="Acceptance is load-specific">
              These examples are a guide, not blanket acceptance. Send the
              exact material, condition and quantity before transport or
              collection is arranged.
            </Callout>
          </div>
        </div>
      </Section>

      <Section tone="sheet">
        <SectionHead
          index={2}
          eyebrow="Grade guide"
          title={`How ${material.shortName.toLowerCase()} is described`}
          intro="Use the closest description you can support, then show the material clearly. Final identification is based on the actual parcel."
        />
        <DefinitionRows items={material.grades} />
      </Section>

      <Section tone="slab">
        <SectionHead
          index={3}
          eyebrow="Quote basis"
          title="What can change the assessment"
          intro="A material name is only the start. Composition, preparation, quantity and handling details make the quote useful."
        />
        <DefinitionRows items={material.quoteFactors} />
        <div className="mt-9 flex flex-col gap-4 border-t hair pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed t-muted">
            MetalBase does not publish a generic rate on this guide. Request a
            current assessment for the actual material and confirm the terms
            before handover.
          </p>
          <ArrowLink href="/prices">Read the pricing guide</ArrowLink>
        </div>
      </Section>

      <Section>
        <SectionHead
          index={4}
          eyebrow="Before you enquire"
          title="Prepare four useful details"
          intro="Clear photos and realistic measurements reduce avoidable back-and-forth."
        />
        <Steps items={material.preparation} />
        <Callout className="mt-10" label="No public customer yard">
          MetalBase has no public customer drop-off location. Customer-site
          collection or an arranged receiving destination is confirmed for the
          actual load. <ArrowLink href="/contact" tone="accent">Send the details</ArrowLink>
        </Callout>
      </Section>

      <Section tone="slab">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="t-index mb-4 t-accent">Useful answers</p>
            <h2>{material.shortName} quote questions</h2>
            <ArrowLink href="/faq" className="mt-8">
              See all FAQs
            </ArrowLink>
          </div>
          <FaqList items={material.faqs} />
        </div>

        <nav aria-label="Other material guides" className="mt-14 border-t hair pt-8">
          <p className="t-index t-accent">Other material guides</p>
          <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
            {relatedMaterials.map((item) => (
              <li key={item.slug}>
                <Link
                  href={materialHref(item)}
                  className="inline-flex min-h-11 items-center font-semibold u-link"
                >
                  {item.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>
    </>
  );
}

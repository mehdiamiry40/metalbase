import {
  GlossaryIndex,
  GlossaryList,
  GlossarySchema,
} from "@/components/Glossary";
import { PageHeader } from "@/components/sections";
import { ArrowLink, Callout, Section } from "@/components/ui";
import { glossary } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/glossary",
  title: "Scrap Metal Terms Explained",
  description:
    "Plain-English definitions for tare, net weight, HMS, bare bright copper, UBC, swarf, treatment charges and other scrap terms.",
});

export default function GlossaryPage() {
  return (
    <>
      <GlossarySchema />

      <PageHeader
        eyebrow="Reference"
        photo="rusty-steel"
        title="The words on your docket"
        intro={`Plain-English definitions for ${glossary.length} common grade, weight and settlement terms used in scrap metal quotes and dockets.`}
        trail={[{ label: "Home", href: "/" }, { label: "Glossary" }]}
      >
        <GlossaryIndex />
      </PageHeader>

      {/* The reference itself sits on the sheet: this is a document to
          be scanned for one word, not an argument to be read through,
          and the surface rule says documents are light. */}
      <Section tone="sheet" className="pb-24 pt-12 lg:pb-32 lg:pt-16">
        <GlossaryList />

        <Callout className="mt-16">
          Can&rsquo;t find a term? Send the word or phrase and ask for a plain-English explanation.{" "}
          <ArrowLink href="/contact" tone="accent">
            Ask us
          </ArrowLink>
        </Callout>
      </Section>
    </>
  );
}

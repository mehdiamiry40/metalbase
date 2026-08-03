import type { Metadata } from "next";
import {
  GlossaryIndex,
  GlossaryList,
  GlossarySchema,
} from "@/components/Glossary";
import { PageHeader } from "@/components/sections";
import { ArrowLink, Callout, CtaBand, Section } from "@/components/ui";
import { glossary } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/glossary" },
  title: "Scrap Metal Terms Explained",
  description:
    "Tare, net, HMS 1, bare bright, UBC, swarf, treatment charge, XRF. The vocabulary on a weighbridge docket and a scrap rate board, explained in plain English.",
};

export default function GlossaryPage() {
  return (
    <>
      <GlossarySchema />

      <PageHeader
        eyebrow="Reference"
        title="The words on your docket"
        intro={`Every transaction in this trade is conducted in vocabulary nobody explains to a first-time seller. Here are ${glossary.length} of them — standard industry language, not our jargon, which is exactly why it is worth writing down.`}
        trail={[{ label: "Home", href: "/" }, { label: "Glossary" }]}
      >
        <GlossaryIndex />
      </PageHeader>

      {/* The reference itself sits on the sheet: this is a document to
          be scanned for one word, not an argument to be read through,
          and the surface rule says documents are light. */}
      <Section tone="sheet">
        <GlossaryList />

        <Callout className="mt-16">
          Not finding a term? Send it through and we will both answer it and
          add it here — if one person had to ask, the word belongs on this
          page.{" "}
          <ArrowLink href="/contact" tone="accent">
            Ask a grader
          </ArrowLink>
        </Callout>
      </Section>

      <CtaBand
        title="Now put it to use"
        body="The rate board lists every grade we buy with the specification that decides which one your load falls into — in the same vocabulary."
        primary={{ label: "See the rate board", href: "/prices" }}
        secondary={{ label: "What we buy", href: "/what-we-buy" }}
      />
    </>
  );
}

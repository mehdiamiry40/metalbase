import { Ledger } from "@/components/Ledger";
import { PageHeader, Steps } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  Section,
  SectionHead,
} from "@/components/ui";
import { PUBLISH_RATES, company } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/prices",
  title: "How Scrap Metal Pricing Works in Brisbane",
  description:
    "See how scrap grade, condition, net weight and market movement shape an indicative metal quote in Brisbane.",
});

const grading = [
  {
    title: "Identify the grade",
    body: "A quote should name the assumed material grade and the condition it expects, rather than attach one number to every load.",
  },
  {
    title: "Establish net weight",
    body: "Confirm whether the transaction uses a platform scale or gross less tare, and which readings will appear on the docket.",
  },
  {
    title: "Name the deductions",
    body: "Attachments, moisture, mixed grades and non-metallic material can reduce recovered yield. Ask which of them affects the quote.",
  },
  {
    title: "Confirm the settlement",
    body: "Agree the final-rate basis, payment method and timing before handover. Large or ongoing loads may use different commercial terms.",
  },
];

/* The settlement, written as an expression rather than a paragraph.
   Every term is a field on the docket, which is the point: a seller
   can follow the arithmetic on the piece of paper they are handed.
   No figures — the shape is the content, and inventing an example rate
   would be exactly the fabrication this codebase keeps removing. */
const workings = [
  { step: "Gross", note: "vehicle and load, when gross less tare is used" },
  { step: "− Tare", note: "vehicle or container weight, where applicable" },
  { step: "= Net", note: "the measured metal weight used for the quote" },
  { step: "× Rate", note: "the rate agreed for the assessed grade" },
  { step: "− Adjustments", note: "stated separately where they apply" },
  { step: "= Settlement", note: "under the payment terms agreed for the load" },
];

export default function PricesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        photo="aluminium-cans"
        title="How scrap pricing works"
        intro={
          PUBLISH_RATES
            ? `Indicative rates by grade${company.priceDate ? `, updated ${company.priceDate}` : ""}. Final terms are confirmed against the actual material and agreed handling method.`
            : "Grade, condition, net weight and market movement shape an indicative quote. Send the load details for a current figure."
        }
        trail={[{ label: "Home", href: "/" }, { label: "Prices" }]}
      >
        {/* Second button was an in-page anchor to #grading, which is
            two scrolls away on the same page. */}
        <Button href="/contact">Get a rate for your load</Button>
      </PageHeader>

      {/* A sticky sub-nav for three anchors sat here, under a header
          that is already sticky — two fixed bars stacked on a phone,
          eating vertical space on every scroll of a page whose content
          is tables. Three headings are findable by scrolling. */}

      {/* ---------------------------------------------------- the board
          This page used to render its own copy of the grade table,
          separately from the identical one on the home page — two
          hand-maintained tables over one array, which is how the two
          drift apart. Both are the Ledger component now, so the board
          exists once and every page shows the same one. */}
      <Section id="board" tone="chalk" className="pb-24 pt-16 lg:pb-32 lg:pt-24">
        <SectionHead
          index={1}
          eyebrow="Grade guide"
          title="Common scrap grades"
          intro="Open a metal family to compare the grade names and preparation notes."
        />
        <Ledger showNotes={false} />
      </Section>

      {/* grading ------------------------------------------------------ */}
      <Section id="grading" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={2}
          eyebrow="Assessment"
          title="The four parts of a clear quote"
          intro="A useful number explains the assumed grade, net weight, deductions and settlement terms."
        />
        <Steps items={grading} />
      </Section>

      {/* ------------------------------------------------ the arithmetic
          New section. People do not distrust the rate so much as the
          gap between the rate they were quoted and the figure they were
          handed — and that gap is arithmetic nobody shows them. Setting
          it out as an expression, on the sheet surface, makes the docket
          legible before they are standing at the bridge holding one. */}
      <Section id="settlement" tone="sheet" className="scroll-mt-20 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead
              index={3}
              eyebrow="The arithmetic"
              title="The arithmetic behind a weight-based quote"
              intro="The same six terms should be clear before handover and traceable on the final transaction record."
              className="mb-0"
            />
          </div>

          <div>
            <dl className="ruled surface-sheet grid-cols-1">
              {workings.map((w) => (
                <div
                  key={w.step}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4"
                >
                  <dt className="mono text-base font-medium">{w.step}</dt>
                  <dd className="t-spec t-muted">{w.note}</dd>
                </div>
              ))}
            </dl>
            <Callout className="mt-8">
              A remote quote relies on the grade and condition described. Final
              terms can change when the material differs, so ask for any change
              and its reason to be stated before acceptance.{" "}
              <ArrowLink href="/what-we-buy#prepare" tone="accent">
                Prepare the load
              </ArrowLink>
            </Callout>
          </div>
        </div>
      </Section>

    </>
  );
}

import { FaqList, FaqSchema } from "@/components/Faq";
import { PageHeader } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  Panel,
  Section,
} from "@/components/ui";
import { glossary } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

/* These answers are intentionally limited to guidance that does not depend on
   an unpublished yard address, operating hour, minimum load, payment policy,
   collection radius, licence detail or material-acceptance decision. */
const publishedFaqs = [
  {
    q: "What should I send for a useful quote?",
    a: "Send the approximate weight or dimensions, your suburb, whether the material is separated and any visible nameplate or alloy marking. Include site-access details if collection may be needed, and have clear photos ready if requested.",
  },
  {
    q: "Why can the final figure differ from an indicative quote?",
    a: "A remote quote relies on the grade, condition and quantity described. Mixed grades, attachments, moisture, non-metallic material and the measured net weight can change the recovered yield. Ask for every changed assumption to be stated before handover.",
  },
  {
    q: "What identification or ownership documents will I need?",
    a: "Requirements depend on the seller and material. Confirm them before travelling, particularly for vehicles, controlled material or anything being sold on behalf of another person or business. Do not upload identification documents through the enquiry form.",
  },
  {
    q: "How can I check a weight-based transaction?",
    a: "Ask which measuring instrument will be used, whether the calculation is direct weight or gross less tare, which readings appear on the docket and what verification record is available for the instrument.",
  },
  {
    q: "Should I separate different metals before asking for a price?",
    a: "Yes where it is safe and practical. A mixed load can be assessed against its lowest recoverable grade. Separate obvious alloys, remove non-metal attachments and photograph anything uncertain before doing unnecessary work.",
  },
  {
    q: "What should I do with a vehicle, tank, battery or unusual item?",
    a: "Do not load it until acceptance, preparation, paperwork and transport have been confirmed. Send photographs, dimensions, labels and any de-pollution or test records first. Regulated and sealed items need load-specific handling advice.",
  },
];

export const metadata = pageMetadata({
  path: "/faq",
  title: "Scrap Metal Questions Brisbane",
  description:
    "Answers about Brisbane scrap quotes, grading, preparation, documents and unusual materials.",
});

export default function FaqPage() {
  return (
    <>
      <FaqSchema items={publishedFaqs} />

      <PageHeader
        eyebrow="Questions"
        photo="grab-claw"
        title="Selling scrap metal, answered"
        intro="What to confirm before requesting a quote or transporting material. If your question is not here, ask us."
        trail={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <Section className="pb-20 pt-12 lg:pb-28 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-20">
          <div>
            <FaqList items={publishedFaqs} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Panel className="on-light bg-white">
              <h2 className="text-xl">Still not sure?</h2>
              <p className="mt-3 text-base leading-relaxed t-muted">
                Describe what you have, its condition and any visible markings.
                We can confirm the grade assumptions, request a photo if needed
                and explain the available next step.
              </p>
              <div className="mt-6">
                <Button href="/contact">Request a quote</Button>
              </div>
            </Panel>

            <Callout label="Bringing a load">
              Confirm the current yard, opening hours, accepted material and
              identification requirements before travelling. Vehicle and
              regulated-material paperwork can vary.
            </Callout>
          </aside>
        </div>
      </Section>

      {/* ------------------------------------------------- the vocabulary
          New section. A good half of the questions people ask are really
          vocabulary questions wearing a disguise — someone who does not
          know what "tare" means cannot follow the answer about how
          payment is calculated. Pointing at the glossary from here is
          the shortest route between those two problems. */}
      <Section id="vocabulary" tone="chalk" className="scroll-mt-20 pb-16 pt-10 lg:pb-20 lg:pt-12">
        <div className="grid gap-8 border-y hair py-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="t-index t-muted">Reference</p>
            <h2 className="mt-3">Unsure what a grade name means?</h2>
            <p className="measure mt-4 t-muted">
              The glossary explains {glossary.length} terms that appear on
              quotes, grade sheets and weighbridge dockets.
            </p>
          </div>
          <ArrowLink href="/glossary" tone="accent">
            Open the grade glossary
          </ArrowLink>
        </div>
      </Section>
    </>
  );
}

import { DefinitionRows, PageHeader, Split } from "@/components/sections";
import {
  Section,
  SectionHead,
  StatBand,
  TickList,
} from "@/components/ui";
import { stats } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/about",
  title: "How MetalBase Scrap Enquiries Work",
  description:
    "MetalBase helps Brisbane sellers prepare clearer scrap metal enquiries with useful material, quantity and condition details.",
});

const values = [
  {
    term: "Agree the grade before handover",
    detail:
      "A useful quote names the assumed grade, the condition of the material and anything that could change the final assessment. Ask for those points before the load moves.",
  },
  {
    term: "Price the load in front of you",
    detail:
      "Scrap rates move with the market and the recovered yield. The quote should state the grade it applies to instead of presenting one number as universal.",
  },
  {
    term: "Keep the transaction traceable",
    detail:
      "Before accepting a trade, confirm which identification, ownership records, weights and settlement details will appear on the docket.",
  },
  {
    term: "Confirm settlement before unloading",
    detail:
      "Payment method, timing and any limits should be agreed before the material is committed, particularly for a large or ongoing load.",
  },
];

const safety = [
  "Confirm the current site and arrival instructions before travelling",
  "Bring closed footwear and follow the PPE directions at the gate",
  "Stay with the vehicle until a spotter directs you",
  "Declare tanks, batteries, fluids and other regulated material in advance",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        photo="yard-wide"
        title="About MetalBase"
        intro="Clear load details, grade assumptions and next steps for Brisbane scrap metal enquiries."
        trail={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {stats.length > 0 && (
        <Section>
          <StatBand items={stats} />
        </Section>
      )}

      <Split
        photo="operator"
        side="right"
        tone="ink"
        n={1}
        caption="Illustrative processing site and operator"
        eyebrow="Our approach"
        title="Clear details before the next step"
      >
        <p className="t-lead mt-5" id="story">
          MetalBase is a Brisbane scrap metal enquiry service for ferrous and
          non-ferrous loads. Useful requests describe the material, quantity,
          condition and location.
        </p>
        <p className="mt-4">
          Current grade, receiving instructions, collection availability and
          commercial terms are confirmed for each enquiry.
        </p>
      </Split>

      <Section id="operate" tone="slab" className="scroll-mt-20 pb-20 pt-12 lg:pb-28 lg:pt-16">
        <SectionHead
          index={1}
          eyebrow="Our approach"
          title="Four points to settle before a trade"
          intro="Use them as a checklist for a one-off load or a longer commercial arrangement."
        />
        <DefinitionRows items={values} />
      </Section>

      <Section id="safety" tone="slab" className="scroll-mt-20 pb-24 pt-16 lg:pb-28 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHead
            index={2}
            eyebrow="Safety"
            title="Treat every yard visit as an industrial visit"
            intro="Requirements vary by site and load. Confirm the location, hours, PPE and unloading instructions before setting out."
            className="mb-0"
          />
          <TickList items={safety} className="lg:pt-4" />
        </div>
      </Section>
    </>
  );
}

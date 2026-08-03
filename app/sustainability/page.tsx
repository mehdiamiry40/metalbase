import type { Metadata } from "next";
import { DefinitionRows, PageHeader, Split, Steps } from "@/components/sections";
import {
  Button,
  Callout,
  Section,
  SectionHead,
  TickList,
} from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/sustainability" },
  title: "Sustainability, Reporting & Certificates of Destruction",
  description:
    "How to specify diversion reporting, chain-of-custody records and certificates of destruction for a Brisbane scrap-metal project.",
};

const reports = [
  {
    term: "Diversion report",
    detail:
      "Specify the reporting boundary, period, material streams and treatment of residual waste. Availability is confirmed in the project scope.",
  },
  {
    term: "Destination & chain of custody",
    detail:
      "State which movement, destination and docket fields the audit needs, and how they must connect back to your site or project.",
  },
  {
    term: "Certificate of destruction",
    detail:
      "Provide the asset list, required destruction method, witness requirement and evidence format before material is accepted.",
  },
  {
    term: "Avoided-emissions data",
    detail:
      "Nominate the methodology, factors and assurance standard your report must use. Do not assume a generic industry comparison meets the requirement.",
  },
];

/* The journey a tonne actually takes, as a sequence rather than a
   paragraph. It exists because "we recycle it" is the least
   informative sentence on any waste company's website, and because
   every step below is a place where material can be lost, downgraded
   or mis-declared — which is precisely why the reporting above has to
   be tied to physical movements rather than to good intentions. */
const journey = [
  {
    title: "Receipt",
    body: "The record should connect the material, source, project reference, measured quantity and accepted grade at the first custody event.",
  },
  {
    title: "Assessment",
    body: "Record any separation, grade verification and removal of non-metallic material that changes the quantity or classification.",
  },
  {
    title: "Processing",
    body: "State how material is prepared to a receiving specification and how process losses or residual material are accounted for.",
  },
  {
    title: "Destination",
    body: "The final record should identify the receiving facility and retain the movement reference that connects it to the original site or project.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sustainability"
        title="Specify the evidence before the metal moves"
        intro="A sustainability claim is only as useful as the records behind it. Send the fields, methodology and sign-off your client or auditor requires so availability can be confirmed in the scope."
        trail={[{ label: "Home", href: "/" }, { label: "Sustainability" }]}
      >
        <Button href="/contact">Send reporting requirements</Button>
      </PageHeader>

      <Section id="reporting" className="scroll-mt-20 pb-20 pt-12 lg:pb-28 lg:pt-16">
        <SectionHead
          index={1}
          eyebrow="Reporting"
          title="Four reporting items to define up front"
          intro="Treat these as a scoping checklist. The proposal should state which records can be supplied and in what format."
        />
        <DefinitionRows items={reports} />
      </Section>

      {/* ---------------------------------------------------- the journey
          New section. Everything else on this page is about paperwork;
          this is the physical process the paperwork describes, and
          without it the reporting reads as an administrative product
          rather than a record of something that happened. */}
      <Section id="journey" tone="chalk" className="scroll-mt-20 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <SectionHead
          index={2}
          eyebrow="The journey"
          title="Four stages a traceable record should follow"
          intro="Each handoff is a point where material can be downgraded or lose its project reference. Ask how the reporting connects those stages."
        />
        <Steps items={journey} />
      </Section>

      <Split
        photo="operator"
        side="right"
        tone="slab"
        n={2}
        caption="Operator alongside processing plant"
        eyebrow="Secure destruction"
        title="Scope secure destruction before dispatch"
      >
        <p className="t-lead mt-5">
          For recalled product, branded stock, plant or data-bearing equipment,
          send the asset list and required evidence first. The accepted material,
          destruction method, witness option and certificate are then confirmed.
        </p>
        <TickList
          className="mt-7"
          items={[
            "Material and destruction method named in the scope",
            "Serialised asset register supplied before the job",
            "Witness, video and certificate requirements confirmed",
          ]}
        />
        <div className="mt-8" id="destruction">
          <Button href="/contact" variant="ghost">
            Ask about secure destruction
          </Button>
        </div>
      </Split>

      {/* compliance --------------------------------------------------- */}
      <Section id="compliance" className="scroll-mt-20 pb-16 pt-10 lg:pb-20 lg:pt-12">
        <div className="max-w-3xl">
          <SectionHead
            index={3}
            eyebrow="Compliance"
            title="Check current credentials"
            intro="Scrap metal buying in Queensland requires a second-hand dealer licence, and metal recovery above threshold volumes is an environmentally relevant activity requiring an environmental authority."
          />
          <div className="border-2 border-dashed hair p-7">
            <p className="t-index t-accent">Not yet published</p>
            <p className="mt-3 text-base leading-relaxed t-muted">
              No licence number, environmental-authority reference or
              management-system certification is currently published here. Ask
              for the current documents your procurement process requires and
              verify them before appointing a contractor.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="ghost">
                Request our documentation
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* circular ----------------------------------------------------- */}
      <Section id="circular" tone="slab" className="scroll-mt-20 pb-20 pt-12 lg:pb-28 lg:pt-16">
        <SectionHead
          index={4}
          eyebrow="Circular economy"
          title="Where recovered metal can go next"
          intro="The destination depends on grade, processing and market. If destination evidence matters to the project, make it an explicit reporting requirement."
        />
        <DefinitionRows
          items={[
            {
              term: "Steel",
              detail:
                "Electric arc furnaces domestically and through the port. Recycled steel needs a fraction of the energy of primary production and can be recycled repeatedly without losing structural properties.",
            },
            {
              term: "Aluminium",
              detail:
                "Secondary smelters producing billet and casting alloys. Recycling uses roughly 5% of the energy of smelting from bauxite — the single biggest energy saving in the industry.",
            },
            {
              term: "Copper",
              detail:
                "Refiners producing cathode and rod. Demand is climbing hard with electrification, and secondary supply is the fastest route to meeting it.",
            },
          ]}
        />
        <Callout className="mt-10" label="On the numbers">
          The energy figures above are the industry&rsquo;s published
          comparisons for primary versus secondary production, not measurements
          of this business. Tonnages, diversion rates and avoided emissions for
          a specific project must come from measured transaction records. No
          headline tonnage, diversion or emissions figure for MetalBase is
          published until verified data supports it.
        </Callout>
      </Section>
    </>
  );
}

import { DefinitionRows, PageHeader, Steps } from "@/components/sections";
import { Button, Section, SectionHead } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/sustainability",
  title: "Scrap Metal Reporting & Sustainability",
  description:
    "Plan diversion, destination and project records for Brisbane scrap metal work before the material moves.",
});

const reports = [
  {
    term: "Diversion report",
    detail:
      "Define the project, dates, metal streams, weight basis and treatment of residual waste.",
  },
  {
    term: "Destination & chain of custody",
    detail:
      "List the movement, destination and docket fields that must connect back to the site or project.",
  },
  {
    term: "Project references",
    detail:
      "List the site, cost-code, docket and sign-off fields needed so availability can be checked before the job starts.",
  },
  {
    term: "Avoided-emissions data",
    detail:
      "Name the method, factors and review standard. A generic industry comparison may not meet the project requirement.",
  },
];

const journey = [
  {
    title: "Arrival",
    body: "Connect the material, source, project reference, measured quantity and initial grade.",
  },
  {
    title: "Sorting",
    body: "Record any separation or removal of non-metal material that changes the weight or grade.",
  },
  {
    title: "Processing",
    body: "State how the material is prepared and how residual material is accounted for.",
  },
  {
    title: "Destination",
    body: "Identify the receiving facility and retain the movement reference back to the project.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sustainability"
        photo="bales"
        title="Make every claim traceable"
        intro="If a client needs diversion or destination records, define the fields and format before the material moves."
        trail={[{ label: "Home", href: "/" }, { label: "Sustainability" }]}
      >
        <Button href="/contact">Send reporting requirements</Button>
      </PageHeader>

      <Section id="reporting" className="scroll-mt-20 pb-20 pt-12 lg:pb-28 lg:pt-16">
        <SectionHead
          index={1}
          eyebrow="Reporting"
          title="Four items to define up front"
          intro="Use this as a brief. The response should confirm which records are available and in what format."
        />
        <DefinitionRows items={reports} />
      </Section>

      <Section id="journey" tone="chalk" className="scroll-mt-20 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <SectionHead
          index={2}
          eyebrow="The journey"
          title="Follow the record to its destination"
          intro="Each handoff should keep the project reference and explain any change in weight or grade."
        />
        <Steps items={journey} />
      </Section>

      <Section id="next-step" className="scroll-mt-20 pb-20 pt-14 lg:pb-24 lg:pt-16">
        <div className="max-w-3xl">
          <SectionHead
            index={3}
            eyebrow="Next step"
            title="Send the reporting brief"
            intro="Include the required fields, reporting period, file format and reviewer. Availability can then be confirmed before the material moves."
          />
          <div>
            <Button href="/contact">Start an enquiry</Button>
          </div>
        </div>
      </Section>
    </>
  );
}

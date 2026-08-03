import type { Metadata } from "next";
import { DefinitionRows, PageHeader, Split, Steps } from "@/components/sections";
import {
  Button,
  Callout,
  CtaBand,
  Section,
  SectionHead,
  TickList,
} from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/sustainability" },
  title: "Sustainability, Reporting & Certificates of Destruction",
  description:
    "Diversion reporting, chain-of-custody records and certificates of destruction from MetalBase Brisbane — the evidence procurement and audit teams actually ask for.",
};

const reports = [
  {
    term: "Diversion report",
    detail:
      "Tonnage received by stream, percentage diverted from landfill, and residual sent to disposal. Issued per site or per project.",
  },
  {
    term: "Destination & chain of custody",
    detail:
      "Which mill or refinery each parcel went to, when it left, and the docket trail connecting it back to your gate. The record that survives an audit.",
  },
  {
    term: "Certificate of destruction",
    detail:
      "Issued against a serialised asset list for equipment, data media and branded product. Destruction can be witnessed on site or recorded on video.",
  },
  {
    term: "Avoided-emissions data",
    detail:
      "Calculated per tonne by material type against primary-production baselines, with the methodology and emission factors stated so your assurance provider can check the working.",
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
    title: "Received and weighed",
    body: "Over a verified bridge, against a docket that names the seller, the vehicle and the grade. The chain of custody starts at this reading and every later report traces back to it.",
  },
  {
    title: "Sorted and assessed",
    body: "Streams separated, alloys confirmed by analyser where the grade turns on it, and non-metallic fill removed. This is where a mixed load either becomes several clean products or stays one poor one.",
  },
  {
    title: "Processed to specification",
    body: "Sheared, baled or shredded to the size and density a furnace or refinery will accept. Grade specifications exist because of what plant can charge efficiently, not because of how the metal looks.",
  },
  {
    title: "Despatched to a named destination",
    body: "Domestic mills and refiners, or export through the port. The destination is recorded per parcel and appears on your chain-of-custody report rather than being described in general terms.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sustainability"
        title="Recycling is the easy part. Proving it is the work."
        intro="Every tonne we take is diverted from landfill and returned to production. What customers actually need from us is the evidence — tonnage, destination, methodology and a signature — in a format their auditor will accept."
        trail={[{ label: "Home", href: "/" }, { label: "Sustainability" }]}
      >
        <Button href="/contact">Request a reporting sample</Button>
      </PageHeader>

      <Section id="reporting" className="scroll-mt-20">
        <SectionHead
          index={1}
          eyebrow="Reporting"
          title="Four documents that cover most requirements"
          intro="If your client, your board or your certification scheme asks for something we don't already produce, tell us — most of it is already in the weighbridge data."
        />
        <DefinitionRows items={reports} />
      </Section>

      {/* ---------------------------------------------------- the journey
          New section. Everything else on this page is about paperwork;
          this is the physical process the paperwork describes, and
          without it the reporting reads as an administrative product
          rather than a record of something that happened. */}
      <Section id="journey" tone="chalk" className="scroll-mt-20">
        <SectionHead
          index={2}
          eyebrow="The journey"
          title="What actually happens to a tonne"
          intro="Four movements between your gate and a furnace. Each one is a point where material can be downgraded or lost track of, which is why the reports are tied to weighbridge events rather than to estimates."
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
        title="When it has to be gone, and provably gone"
      >
        <p className="t-lead mt-5">
          Recalled product, branded stock, failed components, decommissioned
          plant and data-bearing equipment — destroyed under controlled
          conditions with a certificate issued against the list you provide.
        </p>
        <TickList
          className="mt-7"
          items={[
            "Witnessed on site, or recorded on video",
            "Serialised asset register reconciled line by line",
            "Drives physically destroyed, not just wiped",
          ]}
        />
        <div className="mt-8" id="destruction">
          <Button href="/contact" variant="ghost">
            Book a destruction job
          </Button>
        </div>
      </Split>

      {/* compliance --------------------------------------------------- */}
      <Section id="compliance" className="scroll-mt-20">
        <div className="max-w-3xl">
          <SectionHead
            index={3}
            eyebrow="Compliance"
            title="Licensing and accreditation"
            intro="Scrap metal buying in Queensland requires a second-hand dealer licence, and metal recovery above threshold volumes is an environmentally relevant activity requiring an environmental authority."
          />
          <div className="border-2 border-dashed hair p-7">
            <p className="t-index t-accent">Not yet published</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed t-muted">
              Licence numbers, environmental authority references and any
              management-system certifications will be listed here once issued.
              We would rather show nothing than claim an accreditation we
              don&rsquo;t hold — if you need current documentation for a
              procurement pack, ask and we&rsquo;ll send exactly what exists.
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
      <Section id="circular" tone="slab" className="scroll-mt-20">
        <SectionHead
          index={4}
          eyebrow="Circular economy"
          title="Where your metal actually goes"
          intro="Nothing disappears. Ferrous is baled or sheared to mill specification and moves to electric arc furnaces. Non-ferrous is sorted, sampled and sold to refiners and secondary smelters. We name the destination on every report."
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
          your own material come from your weighbridge data, and we do not
          quote a headline figure for the yard until there is one worth
          standing behind.
        </Callout>
      </Section>

      <CtaBand
        title="Need reporting in a specific format?"
        body="Green Star, Infrastructure Sustainability, NABERS or a client's own template — send us the requirement and we'll tell you honestly whether the weighbridge data supports it."
        primary={{ label: "Talk to us", href: "/contact" }}
        secondary={{ label: "For business", href: "/services" }}
      />
    </>
  );
}

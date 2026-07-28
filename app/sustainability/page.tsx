import type { Metadata } from "next";
import { DefinitionRows, PageHeader, Split } from "@/components/sections";
import { Button, CtaBand, Eyebrow, Section, TickList } from "@/components/ui";

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
        <div className="rule max-w-3xl">
          <h2>Four documents that cover most requirements</h2>
          <p className="t-lead mt-5 t-muted">
            If your client, your board or your certification scheme asks for
            something we don&rsquo;t already produce, tell us — most of it is
            already in the weighbridge data.
          </p>
        </div>
        <div className="mt-10 border-t hair">
          <DefinitionRows items={reports} />
        </div>
      </Section>

      <Split
        photo="operator"
        side="right"
        tone="deep"
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
          <Button href="/contact" variant="outline">
            Book a destruction job
          </Button>
        </div>
      </Split>

      {/* compliance --------------------------------------------------- */}
      <section id="compliance" className="scroll-mt-20 bg-cream py-16 lg:py-24">
        <div className="shell max-w-3xl">
          <div className="rule">
            <h2>Licensing and accreditation</h2>
          </div>
          <p className="t-lead mt-5 t-muted">
            Scrap metal buying in Queensland requires a second-hand dealer
            licence, and metal recovery above threshold volumes is an
            environmentally relevant activity requiring an environmental
            authority.
          </p>
          <div className="mt-8 border-2 border-dashed hair p-7">
            <p className="t-eyebrow t-accent">Not yet published</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed t-muted">
              Licence numbers, environmental authority references and any
              management-system certifications will be listed here once issued.
              We would rather show nothing than claim an accreditation we
              don&rsquo;t hold — if you need current documentation for a
              procurement pack, ask and we&rsquo;ll send exactly what exists.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="outline">
                Request our documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* circular ----------------------------------------------------- */}
      <Section id="circular" className="scroll-mt-20">
        <Eyebrow>Circular economy</Eyebrow>
        <h2>Where your metal actually goes</h2>
        <p className="t-lead mt-5 max-w-2xl t-muted">
          Nothing disappears. Ferrous is baled or sheared to mill specification
          and moves to electric arc furnaces. Non-ferrous is sorted, sampled and
          sold to refiners and secondary smelters. We name the destination on
          every report.
        </p>
        <div className="mt-10 border-t hair">
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
        </div>
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

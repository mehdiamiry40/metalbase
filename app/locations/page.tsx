import type { Metadata } from "next";
import { DefinitionRows, PageHeader, Split, Steps } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  ChipList,
  Panel,
  Section,
  SectionHead,
  TickList,
} from "@/components/ui";
import { locations, serviceAreas } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/locations" },
  title: "Scrap Metal Drop-off Guide — Brisbane",
  description:
    "Plan a scrap-metal drop-off in Brisbane: what to confirm before travelling, what information to bring and how grading, weighing and settlement are agreed.",
};

const steps = [
  {
    title: "Confirm before travelling",
    body: "Check the current yard, opening hours, accepted material and any minimum or handling requirement with the trade desk.",
  },
  {
    title: "Follow the arrival instructions",
    body: "Stay with the vehicle until directed. The site team will explain the weighing, unloading and safety sequence for that yard.",
  },
  {
    title: "Confirm the assessment",
    body: "Ask which grade applies, what condition it assumes and whether attachments, moisture or mixed material affect the return.",
  },
  {
    title: "Review the trade details",
    body: "Before handover, confirm the weight basis, deductions, docket details and agreed settlement method for the load.",
  },
];

/* Written for someone who has never driven into an industrial site.
   Most first-time sellers are nervous about exactly this and ask none
   of it out loud, which is a good reason to answer it in writing. */
const onSite = [
  {
    term: "Wait for a spotter",
    detail:
      "Industrial yards mix trucks, mobile plant and pedestrians. Stay with the vehicle until site staff give you a clear direction.",
  },
  {
    term: "Confirm the PPE requirement",
    detail:
      "Closed footwear and suitable clothing are a sensible baseline. Ask whether hi-vis, eye protection or site-specific PPE must be brought with you.",
  },
  {
    term: "Keep passengers clear of the work area",
    detail:
      "Ask before bringing passengers or animals. Never enter an unloading or processing area unless site staff direct you there.",
  },
  {
    term: "Describe anything that needs mechanical handling",
    detail:
      "Send dimensions, approximate weight and photographs of anything that cannot be unloaded safely by hand so the handling method can be confirmed first.",
  },
  {
    term: "Ask before taking photographs on site",
    detail:
      "Other customers, vehicle registrations and paperwork may be visible. Follow the site policy and keep other people out of frame.",
  },
];

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Drop-off guide"
        title="Check the details before you load"
        intro="Yard addresses and opening hours are not yet published. Confirm where to go, when the site can receive you, what it can accept and which documents the load needs."
        trail={[{ label: "Home", href: "/" }, { label: "Drop-off guide" }]}
      >
        <Button href="/contact">Confirm a drop-off</Button>
      </PageHeader>

      {/* yards -------------------------------------------------------- */}
      <Section className="pb-16 pt-10 lg:pb-20 lg:pt-12">
        <SectionHead index={1} eyebrow="Yards" title="Where to find us" />
        {locations.length > 0 ? (
          <div className="divide-y divide-[color:var(--hair)] border-y hair">
            {locations.map((l) => (
              <div
                key={l.id}
                id={l.id}
                className="grid scroll-mt-20 gap-4 py-8 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-12"
              >
                <div>
                  <h3>{l.name}</h3>
                  <p className="t-index mt-2 t-accent">{l.role}</p>
                </div>
                <div className="space-y-3">
                  {l.address && <p className="text-base">{l.address}</p>}
                  {l.hours && <p className="t-muted">{l.hours}</p>}
                  {l.features.length > 0 && (
                    <ChipList className="pt-1" items={l.features} />
                  )}
                  {l.address && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block pt-2 font-semibold t-accent u-link"
                    >
                      Directions
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed hair p-8">
            <p className="t-index t-accent">Not yet published</p>
            <p className="measure-wide mt-3 text-base leading-relaxed t-muted">
              Yard addresses and opening hours will appear here only after they
              are verified. Contact the trade desk before travelling with a load.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="ghost">
                Confirm a drop-off location
              </Button>
            </div>
          </div>
        )}
      </Section>

      {/* how it works ------------------------------------------------- */}
      <Section id="how-it-works" tone="slab" className="scroll-mt-20 pb-24 pt-16 lg:pb-32 lg:pt-24">
        <SectionHead
          index={2}
          eyebrow="The weigh-in"
          title="A typical drop-off, step by step"
          intro="The exact sequence depends on the yard and the load. Confirm the current instructions before travelling."
        />
        <Steps items={steps} />
      </Section>

      {/* id ----------------------------------------------------------- */}
      <Section id="id" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={3}
          eyebrow="Before you come in"
          title="What to bring with you"
          className="mb-10"
        />
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <TickList
              items={[
                "Current photo ID, if the confirmed trade requires it",
                "Proof that you are entitled to sell unusual or controlled material",
                "Vehicle and access details needed for the agreed handling method",
                "Any paperwork the trade desk requests before you set out",
              ]}
            />
            <p className="measure-wide mt-6 text-base leading-relaxed t-muted">
              Identification and record-keeping requirements depend on the
              transaction and applicable licence conditions. The trade desk can
              tell you exactly what is needed for the material you describe.
            </p>
          </div>

          <Panel id="payment" className="scroll-mt-20 border-2">
            <p className="t-index t-accent">Getting paid</p>
            <h3 className="mt-2 text-3xl">Confirm settlement before arrival</h3>
            <div className="mt-5 space-y-4 text-base leading-relaxed t-muted">
              <p>
                Payment method, timing and any limits are not published yet.
                Agree them with the trade desk before the material is handed over.
              </p>
              <p>
                For a quoted load, ask which weight and grade will determine the
                final amount and which details will be shown on the docket.
              </p>
              <p>
                Large, commercial and regulated loads may require different
                settlement or authority documents. Confirm those requirements in
                writing rather than assuming the terms for a small load apply.
              </p>
            </div>
          </Panel>
        </div>
      </Section>

      {/* --------------------------------------------------- on the site
          New section. A scrap yard is an industrial site that members
          of the public drive into, which is an unusual combination, and
          nobody explains it to them. First-timers arrive worried about
          getting it wrong; five short paragraphs fix that, and they are
          the same five things a spotter would otherwise have to say at
          the gate. */}
      <Section id="on-site" tone="chalk" className="scroll-mt-20 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <SectionHead
          index={4}
          eyebrow="On the site"
          title="How to arrive safely"
          intro="Industrial sites have moving vehicles, plant and sharp material. The yard's current directions take priority over this general checklist."
        />
        <DefinitionRows items={onSite} />
      </Section>

      {/* ------------------------------------------------- service area
          New section. The most common question that never gets asked
          out loud is simply "do you come to my end of town?" — and it
          is faster to answer with a list of names than with a sentence
          about South-East Queensland. */}
      <Section id="collection" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={5}
          eyebrow="Collection"
          title="Ask about collection in your area"
          intro="These Brisbane areas are listed for collection enquiries. Availability, equipment, minimum volume and timing are confirmed for each site."
        />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area) => (
            <div key={area.region} className="border-t-2 border-copper pt-5">
              <h3 className="text-xl">{area.region}</h3>
              <ChipList className="mt-4" items={area.places} />
            </div>
          ))}
        </div>
        <Callout className="mt-12" label="Not listed">
          Send the address, material, approximate volume and site-access details.
          The trade desk can then confirm whether collection is available.{" "}
          <ArrowLink href="/services" tone="accent">
            Collection and bin hire
          </ArrowLink>
        </Callout>
      </Section>

      <Split
        photo="tipper"
        side="right"
        tone="slab"
        n={2}
        caption="Tipper discharging at the processing bay"
        eyebrow="Trade measurement"
        title="What to check on a weight-based trade"
      >
        <p className="t-lead mt-5">
          Measuring instruments used for trade are subject to national trade
          measurement requirements. Ask which instrument will be used, how gross
          and tare are recorded, and what verification record is available.
        </p>
        <TickList
          className="mt-7"
          items={[
            "Confirm whether the load is priced by kilogram or tonne",
            "Ask which weights and grade appear on the docket",
            "Request verification evidence when procurement requires it",
          ]}
        />
      </Split>
    </>
  );
}

import Link from "next/link";
import { FaqList, FaqSchema } from "@/components/Faq";
import { ServiceSchema } from "@/components/Schema";
import { DefinitionRows, PageHeader, Steps } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  ChipList,
  Section,
  SectionHead,
  SpecStrip,
  TickList,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import {
  formatServiceRegions,
  operations,
  serviceAreas,
  services,
} from "@/lib/site";

export const metadata = pageMetadata({
  path: "/scrap-removal-brisbane",
  title: "Scrap Removal Brisbane | Site Collection Guide",
  description:
    "MetalBase provides scrap removal across Brisbane, with drivers collecting from customer sites and bins available for suitable jobs.",
});

const removalService = services.find(
  (service) => service.slug === "collection-and-bins",
)!;

const assessmentSteps = [
  {
    title: "Describe the load",
    body: "List each metal or item type, its condition, approximate quantity and whether it is loose, bundled, fixed in place or mixed with other material. Add wide and close-up photos where useful.",
  },
  {
    title: "Map the site access",
    body: "Send the exact address, entry route, gate and height clearances, ground conditions, loading area, operating window and any traffic, induction or neighbour constraints.",
  },
  {
    title: "Assign responsibilities",
    body: "Confirm who owns the material and who will isolate, drain, dismantle, sort, secure or load it. Identify the site contact who can verify hazards and approve the proposed work area.",
  },
  {
    title: "Confirm the written scope",
    body: "Before anything moves, confirm accepted material, current availability, timing, handling responsibilities, any proposed equipment, commercial terms and the records required for the job.",
  },
];

const materialInputs = [
  {
    term: "Material identity",
    detail:
      "Name the likely metal grades or item types. Include labels, alloy markings, previous-use details and close-up photos if the material is difficult to identify.",
  },
  {
    term: "Quantity and dimensions",
    detail:
      "Give an estimated weight, item count, pile dimensions or bin volume. For long, heavy or oversize pieces, include the largest dimensions and an object for scale in a photo.",
  },
  {
    term: "Condition and form",
    detail:
      "Say whether the material is loose, bundled, palletised, in a container, attached to a structure or mixed with timber, plastic, concrete or other metals.",
  },
  {
    term: "Fluids and hazards",
    detail:
      "Identify oil, fuel, coolant, refrigerant, batteries, sealed spaces, sharp edges, unstable stacks and any suspected hazardous or regulated material.",
  },
];

const jobInputs = [
  {
    term: "Exact collection point",
    detail:
      "Provide the Brisbane suburb and full site address, then identify where the material sits within the property and how the proposed work area is reached.",
  },
  {
    term: "Ownership and authority",
    detail:
      "State who owns the material and who is authorised to approve its removal. Flag vehicles, controlled material, client-owned assets or disputed items before assessment.",
  },
  {
    term: "Timing and site rules",
    detail:
      "Give the preferred window and any shutdown, booking, induction, permit, traffic-control, noise or supervision requirements. Timing remains subject to confirmation.",
  },
  {
    term: "Loading responsibility",
    detail:
      "Explain what labour or site support is available and who is expected to prepare and load the material. Do not assume a handling method or equipment will be supplied.",
  },
];

const accessChecks = [
  {
    term: "Entry route",
    detail:
      "Gate width and height, internal road width, turning space, gradients, one-way sections, weight restrictions and the distance from entry to the material.",
  },
  {
    term: "Vertical clearance",
    detail:
      "Overhead powerlines, trees, awnings, sprinklers, doors, services and any low structure along the route or above the work area.",
  },
  {
    term: "Ground and placement area",
    detail:
      "Surface type, slope, soft ground, pits, drains, suspended slabs, underground services and whether the proposed area can be isolated safely.",
  },
  {
    term: "People and operations",
    detail:
      "Pedestrian routes, customer traffic, production activity, school or residential neighbours, delivery conflicts and the site contact responsible for coordination.",
  },
  {
    term: "Site controls",
    detail:
      "Induction, PPE, permits, escorts, exclusion zones, traffic management, emergency procedures and any documents required before work can begin.",
  },
];

const exclusions = [
  "Asbestos or material suspected of containing asbestos",
  "Gas cylinders, LPG bottles, fire extinguishers or other sealed or pressurised vessels",
  "Fuel tanks, drums, plant or parts that still contain liquids, gas, chemicals or unknown residue",
  "Radioactive sources, trefoil-labelled items or material of unknown industrial origin",
  "Loose or damaged lithium batteries mixed through general scrap",
  "Refrigeration or air-conditioning equipment without confirmed de-gassing and preparation requirements",
  "Unstable piles, inaccessible material or work areas affected by unsafe ground or overhead hazards",
  "Vehicles, controlled material or items with unclear ownership without prior written confirmation",
];

const removalFaqs = [
  {
    q: "What should I send for a scrap removal Brisbane enquiry?",
    a: "Send the material or item types, estimated quantity, condition, exact address and preferred timing. Add photos of the whole load and any markings, then include gate dimensions, overhead clearances, ground conditions, loading responsibility and known site hazards.",
  },
  {
    q: "How is a load assessed for removal?",
    a: "Suitability depends on the material, quantity and form described, contamination or hazards, site access, preparation required, timing and current service availability. There is no published minimum on this page; any minimum quantity is confirmed for the specific enquiry.",
  },
  {
    q: "Is scrap metal pickup free in Brisbane?",
    a: "Do not assume pickup is free. Collection cost, whether any pickup can be offered free of charge, and any payment or settlement terms depend on the load and site and are confirmed for each enquiry.",
  },
  {
    q: "Can scrap metal be removed on the same day?",
    a: "Same-day service is not guaranteed. Availability and timing are confirmed after the load, address, access, safety constraints and required handling have been assessed.",
  },
  {
    q: "What site access details are needed?",
    a: "Provide the entry route, gate width and height, turning space, overhead clearance, ground surface, slope and distance to the material. Include site hours, inductions, permits, traffic controls and any production or neighbour constraints.",
  },
  {
    q: "Are bins, lifting equipment or loading labour included?",
    a: "Bins are available. Container size, placement, schedule, minimum quantity, loading responsibilities, any other equipment or labour, and commercial terms are confirmed for each job.",
  },
  {
    q: "What should not be loaded for collection?",
    a: "Do not load suspected asbestos, sealed or pressurised vessels, items containing liquids or unknown residue, radioactive material, loose damaged lithium batteries or material with unclear ownership. Send details first so acceptance and preparation requirements can be confirmed.",
  },
  {
    q: "Can I take the scrap to a receiving location instead?",
    a: "MetalBase has no public customer drop-off location. When drop-off is suitable, the receiving destination, hours, accepted material and arrival instructions are arranged and confirmed for that enquiry before you travel.",
  },
];

export default function ScrapRemovalBrisbanePage() {
  return (
    <>
      <ServiceSchema
        name={removalService.title}
        description={removalService.seoDescription}
        slug={removalService.slug}
        verified={removalService.verified}
      />
      <FaqSchema items={removalFaqs} />

      <PageHeader
        eyebrow="Collection assessment"
        photo="tipper"
        title="Scrap removal Brisbane"
        intro="MetalBase drivers collect scrap from customer sites across Brisbane. Send the material, estimated quantity, address, access and safety constraints so the job scope, timing and terms can be confirmed."
        trail={[
          { label: "Home", href: "/" },
          { label: "Scrap removal Brisbane" },
        ]}
      >
        <Button href="/contact">Start a removal enquiry</Button>
      </PageHeader>

      <Section className="pb-20 pt-12 lg:pb-28 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionHead
              index={1}
              eyebrow="Right starting point"
              title="Removal starts with the site, not only the metal"
              intro="A material quote identifies likely grades and pricing assumptions. A removal assessment also has to establish how the load can be reached, prepared and moved safely."
              className="mb-8"
            />
            <ArrowLink href="/scrap-metal-brisbane" tone="accent">
              Read the Brisbane scrap metal guide
            </ArrowLink>
          </div>

          <div>
            <DefinitionRows
              items={[
                {
                  term: "Need help identifying the material?",
                  detail:
                    "Use the material guide to distinguish common ferrous, non-ferrous and specialty streams before describing the load.",
                },
                {
                  term: "Need the material collected from a site?",
                  detail:
                    "MetalBase provides customer-site collection. Continue with the assessment below so the address, access, responsibilities, safety controls and job-specific arrangements can be confirmed.",
                },
                {
                  term: "Planning an ongoing or project service?",
                  detail:
                    "Commercial service guides cover manufacturing streams, demolition material and collection or container enquiries in more detail.",
                },
              ]}
            />
            <nav
              aria-label="Related removal planning guides"
              className="mt-7 flex flex-wrap gap-x-7 gap-y-3"
            >
              <Link href="/what-we-buy" className="font-semibold u-link">
                What we buy
              </Link>
              <Link href="/services" className="font-semibold u-link">
                Commercial services
              </Link>
            </nav>
          </div>
        </div>
      </Section>

      <Section tone="slab">
        <SectionHead
          index={2}
          eyebrow="Assessment sequence"
          title="Four steps from enquiry to confirmed scope"
          intro="Approximate information is enough to start. The details become more precise before collection is scheduled or material is moved."
        />
        <Steps items={assessmentSteps} />
        <Callout className="mt-10" label="No implied booking">
          Sending an enquiry does not book a collection. The available service,
          accepted load, date, responsibilities and terms must be confirmed for
          the proposed site.
        </Callout>
      </Section>

      <Section className="pb-20 pt-12 lg:pb-28 lg:pt-16">
        <SectionHead
          index={3}
          eyebrow="Load eligibility"
          title="The inputs used to assess whether a removal option fits"
          intro="A clear description helps distinguish a straightforward loose-metal load from work that needs different preparation, controls or handling."
        />

        <SpecStrip
          items={[
            { k: "Material", v: "Grade or item type" },
            { k: "Quantity", v: "Weight, count or dimensions" },
            { k: "Form", v: "Loose, bundled or fixed" },
            { k: "Condition", v: "Attachments, fluids, residue" },
            { k: "Authority", v: "Owner and site approver" },
            { k: "Evidence", v: "Wide, detail and access photos" },
          ]}
          className="mb-12"
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-x-16 lg:gap-y-12">
          <div>
            <p className="t-index t-accent">Input group 01</p>
            <h3 className="mt-3">About the material</h3>
          </div>
          <DefinitionRows items={materialInputs} />
          <div>
            <p className="t-index t-accent">Input group 02</p>
            <h3 className="mt-3">About the job</h3>
          </div>
          <DefinitionRows items={jobInputs} />
        </div>
      </Section>

      <Section tone="slab">
        <SectionHead
          index={4}
          eyebrow="Site access"
          title="Measure the route before discussing the method"
          intro="Useful access information covers the path from the public road to the material, not just the street address. Photos should show pinch points and the proposed work area."
        />
        <DefinitionRows items={accessChecks} />

        <div className="mt-14 grid border-y hair lg:grid-cols-2">
          <div className="py-8 lg:border-r lg:pr-12 hair">
            <p className="t-index t-accent">The enquirer or site contact confirms</p>
            <h3 className="mt-3">Facts only the site can verify</h3>
            <TickList
              className="mt-6"
              items={[
                "Ownership or authority to remove the material",
                "The load description, known hazards and preparation already completed",
                "Measured access dimensions and site operating constraints",
                "Who will isolate the work area and who is responsible for preparing or loading",
                "The person authorised to approve the final scope and timing",
              ]}
            />
          </div>
          <div className="border-t hair py-8 lg:border-t-0 lg:pl-12">
            <p className="t-index t-accent">Confirmed in the enquiry response</p>
            <h3 className="mt-3">What must be agreed before collection</h3>
            <TickList
              className="mt-6"
              items={[
                "Whether the described material suits a currently available option",
                "Exact coverage, minimum quantity and proposed timing",
                "Handling method, any available equipment or labour, and loading responsibilities",
                "Collection cost, whether pickup is free, and any payment or settlement terms",
                "Required documents, identification or permit checks, and receiving instructions",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section id="safety" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
          <div>
            <SectionHead
              index={5}
              eyebrow="Safety + exclusions"
              title="Ask before preparing these loads"
              intro="Unusual, sealed, hazardous or controlled material needs load-specific acceptance and preparation instructions."
              className="mb-8"
            />
            <Button href="/contact" variant="ghost">
              Ask before you load it
            </Button>
          </div>
          <div>
            <ul className="divide-y divide-[color:var(--hair)] border-y-2 border-copper">
              {exclusions.map((item) => (
                <li key={item} className="py-4 text-base">
                  {item}
                </li>
              ))}
            </ul>
            <Callout className="mt-8" label="Do not create a new hazard">
              Do not cut, drain, dismantle, climb, lift or move material simply
              to prepare an enquiry. Secure the area, identify the risk and ask
              which preparation and work method apply first.
            </Callout>
          </div>
        </div>
      </Section>

      <Section id="coverage" tone="slab" className="scroll-mt-20">
        <SectionHead
          index={6}
          eyebrow="Verified service areas"
          title={`Collection across ${operations.serviceRegions.length} South East Queensland regions`}
          intro={`MetalBase drivers collect from customer sites across ${formatServiceRegions()}. Send the exact address so access, timing and the load-specific scope can be confirmed.`}
        />

        <div className="grid border-y hair lg:grid-cols-2">
          {serviceAreas.map((area, index) => (
            <div
              key={area.region}
              className={`py-8 ${
                index % 2 === 0 ? "lg:border-r lg:pr-12" : "lg:pl-12"
              } ${index > 0 ? "border-t hair" : ""} ${
                index === 1 ? "lg:border-t-0" : ""
              }`}
            >
              <h3>{area.region}</h3>
              <ChipList items={area.places} className="mt-5" />
            </div>
          ))}
        </div>

        <Callout className="mt-10" label="Confirmed for every enquiry">
          Timing—including same-day requests—minimum quantity, equipment,
          collection cost—including whether pickup is free—payment or
          settlement terms, and any arranged receiving instructions are
          confirmed for the specific load and address.
        </Callout>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ArrowLink href="/locations" tone="accent">
            Review the regional area guides
          </ArrowLink>
          <Button href="/contact">Send the exact address</Button>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionHead
              index={7}
              eyebrow="Useful answers"
              title="Scrap removal Brisbane FAQs"
              intro="The answer depends on the material and site. These questions show what can be prepared before a load-specific response."
              className="mb-8"
            />
            <ArrowLink href="/contact" tone="accent">
              Start your enquiry
            </ArrowLink>
          </div>
          <FaqList items={removalFaqs} />
        </div>

        <nav
          aria-label="Next steps"
          className="mt-16 border-t hair pt-8"
        >
          <p className="t-index t-accent">Choose the next guide</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/scrap-metal-brisbane" className="font-semibold u-link">
              Scrap metal Brisbane
            </Link>
            <Link href="/what-we-buy" className="font-semibold u-link">
              What we buy
            </Link>
            <Link href="/services" className="font-semibold u-link">
              Commercial services
            </Link>
            <Link href="/locations" className="font-semibold u-link">
              Area guides
            </Link>
          </div>
        </nav>
      </Section>
    </>
  );
}

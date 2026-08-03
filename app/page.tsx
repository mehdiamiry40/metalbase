import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { FaqList } from "@/components/Faq";
import { ArrowLink, Button, CtaBand, SpecStrip } from "@/components/ui";
import { priceGroups } from "@/lib/site";

const homeTitle = "Scrap Metal Quotes Brisbane | MetalBase";
const homeDescription =
  "Request a scrap metal quote in Brisbane and learn how copper, aluminium, steel, cable and mixed metal are graded, priced and prepared.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

const materialPhotos = {
  "non-ferrous": "cable",
  ferrous: "grab-claw",
  specialty: "mixed-parts",
} as const;

const materialSummaries = {
  "non-ferrous":
    "Copper, brass, aluminium, lead, stainless steel and insulated cable.",
  ferrous:
    "Structural steel, plate, cast iron, reinforcing bar and light-gauge steel.",
  specialty:
    "Motors, radiators, batteries, e-waste and other mixed-material items.",
} as const;

const homeFaqs = [
  {
    q: "What should I send for a useful quote?",
    a: "Send the approximate weight or dimensions, your suburb, whether the material is separated and any visible nameplate or alloy marking. Have clear photos ready if the trade desk asks for them.",
  },
  {
    q: "Why can the final figure differ from an indicative quote?",
    a: "A remote quote relies on the grade, condition and quantity described. Mixed grades, attachments, moisture, non-metallic material and measured net weight can change the recovered yield.",
  },
  {
    q: "What if the load contains different metals?",
    a: "Separate obvious metals where it is safe and practical, then photograph anything uncertain. Ask how a mixed load would be assessed before transporting it.",
  },
];

const quoteFactors = [
  {
    title: "Material grade",
    body: "Copper, aluminium, brass, stainless steel, insulated cable and ferrous steel are assessed as different material streams. Start with the closest grade and note any visible alloy marking.",
    href: "/what-we-buy",
    link: "Compare scrap metal grades",
  },
  {
    title: "Separation and condition",
    body: "Mixed alloys, steel attachments, moisture, concrete, oil and other non-metal material can reduce recoverable yield. Describe what is attached or contaminated before relying on a figure.",
    href: "/what-we-buy#deductions",
    link: "See common grade deductions",
  },
  {
    title: "Approximate net weight",
    body: "A rough weight, item count or set of dimensions helps distinguish a small non-ferrous parcel from bulk ferrous material. State whether the estimate includes a container, pallet or vehicle.",
    href: "/prices#grading",
    link: "Understand scrap metal pricing",
  },
  {
    title: "Location and handling",
    body: "Oversize, heavy or site-held metal may need a different handling plan from a trailer load. Include the Brisbane suburb, access limits and largest dimensions so the available next step can be confirmed.",
    href: "/services",
    link: "Review business handling options",
  },
];

const preparationSteps = [
  {
    title: "Separate ferrous from non-ferrous",
    body: "A magnet is a useful first check: ordinary steel and cast iron are magnetic, while copper, brass and aluminium are not. Stainless steel can be an exception, so record any marking rather than guessing.",
  },
  {
    title: "Keep obvious grades apart",
    body: "Store copper, brass, aluminium, cable, stainless and general steel separately where it is safe and practical. Clear separation makes the quoted grade easier to explain and verify.",
  },
  {
    title: "Describe attachments and residue",
    body: "Note plastic, timber, concrete, rubber, oil, water and steel fittings attached to another metal. Do not cut sealed vessels or disturb suspect hazardous material simply to improve a grade.",
  },
  {
    title: "Record size, quantity and access",
    body: "Write down the approximate weight or dimensions, the suburb and any gate, loading or vehicle constraint. Have a wide photograph and a close detail ready if the trade desk requests them.",
  },
];

const enquiryRoutes = [
  {
    title: "Scrap metal collection and bin hire",
    body: "For workshops and sites that generate metal repeatedly. Send the site address, material streams, approximate volume, access constraints and preferred collection pattern for a scoped proposal.",
    href: "/services/collection-and-bins",
    link: "Scope collection and bin hire",
  },
  {
    title: "Industrial offcuts and production scrap",
    body: "For fabricators, engineers and manufacturers separating offcuts, swarf or turnings at the source. State the alloy, how it is stored and how often it accumulates.",
    href: "/services/industrial",
    link: "Plan an industrial scrap enquiry",
  },
  {
    title: "Demolition and structural steel",
    body: "For projects with beams, columns, plate, reinforcing steel or metal strip-out material. Include drawings, section sizes, estimated tonnage, programme and site-access requirements.",
    href: "/services/demolition",
    link: "Prepare a demolition steel scope",
  },
  {
    title: "Public and trade drop-off planning",
    body: "For one-off or regular loads brought to a yard. Confirm the current location, opening hours, accepted material, identification requirements and settlement terms before travelling.",
    href: "/locations",
    link: "Plan a Brisbane scrap-metal drop-off",
  },
];

export default function Home() {
  return (
    <>
      <section className="on-light border-b hair bg-chalk">
        <div className="shell py-8 sm:py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-16">
            <div className="max-w-[38rem] lg:py-8">
              <h1 className="max-w-[12ch]">Get a Brisbane scrap metal quote.</h1>
              <p className="t-lead measure mt-6 t-muted">
                Send the material type, approximate weight, your suburb and its
                condition. Those details give the trade desk a useful starting
                point for an indicative quote.
              </p>
              <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row">
                <Button href="/contact" className="w-full min-[480px]:w-auto">
                  Send quote details
                </Button>
                <Button
                  href="/what-we-buy"
                  variant="ghost"
                  className="w-full min-[480px]:w-auto"
                >
                  Open material guide
                </Button>
              </div>
              <p className="mt-5 max-w-[54ch] text-sm leading-relaxed t-muted">
                Unsure of the grade? Note what is attached, mixed or visibly
                marked. Have a wide photo and a close detail ready if requested.
              </p>
            </div>

            <div className="editorial-photo aspect-[4/3] sm:aspect-[16/10] sm:min-h-[280px] lg:aspect-auto lg:min-h-[540px]">
              <Photo
                name="yard-grab"
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                alt="A material handler sorting a pile of mixed scrap steel"
                className="object-[58%_center]"
              />
            </div>
          </div>

          <SpecStrip
            surface="chalk"
            className="mt-10 lg:mt-12"
            items={[
              { k: "Material", v: "Type or best guess" },
              { k: "Quantity", v: "Approximate weight" },
              { k: "Location", v: "Your suburb" },
              { k: "Condition", v: "Clean, mixed or attached" },
            ]}
          />
        </div>
      </section>

      <section
        id="grades"
        className="on-light scroll-mt-20 bg-white py-16 lg:py-28"
      >
        <div className="shell">
          <div className="grid gap-6 border-b hair pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16 lg:pb-14">
            <p className="t-index t-muted">Material groups</p>
            <div>
              <h2 className="max-w-[15ch]">Start with what is in the pile.</h2>
              <p className="measure-wide mt-5 t-muted">
                Browse the closest material group, then describe any markings,
                attachments or mixed material. Exact grades can be discussed
                with the quote.
              </p>
            </div>
          </div>

          <div className="border-b hair">
            {priceGroups.map((group, index) => (
              <Link
                key={group.id}
                href={`/what-we-buy#${group.id}`}
                className="group grid border-t hair py-8 transition-colors duration-150 ease-out hover:bg-shaft focus-visible:outline-offset-[-2px] lg:grid-cols-12 lg:py-0"
              >
                <div
                  className={`editorial-photo aspect-[16/9] sm:min-h-[220px] lg:col-span-7 lg:aspect-auto lg:min-h-[380px] ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Photo
                    name={materialPhotos[group.id as keyof typeof materialPhotos]}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    alt={`${group.title} scrap metal ready to be identified`}
                    className="object-cover"
                  />
                </div>

                <div
                  className={`flex flex-col justify-center py-7 lg:col-span-5 lg:py-14 ${
                    index % 2 === 1
                      ? "lg:order-1 lg:pr-12"
                      : "lg:order-2 lg:pl-12"
                  }`}
                >
                  <p className="t-spec uppercase tracking-[0.1em] t-muted">
                    Material {String(index + 1).padStart(2, "0")} / {group.rows.length}{" "}
                    listed grades
                  </p>
                  <h3 className="mt-4">{group.title}</h3>
                  <p className="measure mt-4 t-muted">
                    {
                      materialSummaries[
                        group.id as keyof typeof materialSummaries
                      ]
                    }
                  </p>
                  <p className="mt-6 border-t hair pt-5 text-sm leading-relaxed t-muted">
                    Examples: {group.rows.slice(0, 3).map((row) => row.grade).join(", ")}.
                  </p>
                  <span className="mt-7 w-fit border-b border-current pb-1 text-sm font-semibold">
                    View {group.title.toLowerCase()} materials
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 border-l-2 border-ink pl-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <p className="measure text-base t-muted">
              Cannot match your material to a group? Describe its markings,
              dimensions and anything attached when you request a quote.
            </p>
            <Link
              href="/contact"
              className="w-fit shrink-0 border-b border-current pb-1 text-sm font-semibold"
            >
              Describe it for review
            </Link>
          </div>
        </div>
      </section>

      <section
        id="quote-factors"
        className="on-light scroll-mt-20 border-t hair bg-chalk py-20 lg:py-28"
      >
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <p className="t-index t-muted">How pricing starts</p>
            <h2 className="mt-5 max-w-[14ch]">What changes a scrap metal quote?</h2>
            <p className="measure mt-6 t-muted">
              A useful quote names its assumptions. These four details explain
              why two piles that look similar can produce different figures.
            </p>
            <div className="mt-8">
              <ArrowLink href="/prices">Read the scrap pricing guide</ArrowLink>
            </div>
          </div>

          <div className="border-y hair">
            {quoteFactors.map((factor) => (
              <article
                key={factor.title}
                className="grid gap-4 border-b hair py-7 last:border-b-0 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10"
              >
                <h3 className="text-xl">{factor.title}</h3>
                <div>
                  <p className="measure-wide t-muted">{factor.body}</p>
                  <div className="mt-4">
                    <ArrowLink href={factor.href}>{factor.link}</ArrowLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="prepare-scrap"
        className="on-light scroll-mt-20 border-t hair bg-white py-14 lg:py-20"
      >
        <div className="shell">
          <div className="grid gap-6 border-b hair pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <p className="t-index t-muted">Before requesting a price</p>
            <div>
              <h2 className="max-w-[16ch]">How to prepare scrap metal for a clearer quote.</h2>
              <p className="measure-wide mt-5 t-muted">
                Safe separation and accurate descriptions are more useful than
                polishing, stripping or dismantling material without a plan.
              </p>
            </div>
          </div>

          <ol className="border-b hair">
            {preparationSteps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-4 border-t hair py-7 md:grid-cols-[4rem_minmax(0,17rem)_1fr] md:gap-10"
              >
                <span className="t-spec t-muted" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl">{step.title}</h3>
                <p className="measure-wide t-muted">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="measure t-muted">
              Unsure whether an item is safe to move or likely to be accepted?
              Confirm it before loading.
            </p>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
              <ArrowLink href="/what-we-buy#identify">
                Identify an unknown metal
              </ArrowLink>
              <ArrowLink href="/glossary">
                Use the scrap metal glossary
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section
        id="brisbane-enquiries"
        className="on-light scroll-mt-20 border-t hair bg-shaft py-20 lg:py-28"
      >
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="t-index t-muted">Brisbane enquiries</p>
              <h2 className="mt-5 max-w-[15ch]">Choose the route that fits the metal.</h2>
            </div>
            <p className="t-lead measure-wide t-muted">
              A Brisbane scrap-metal enquiry is easier to assess when the
              material, site and handling method are described together.
              Availability, equipment and commercial terms are confirmed for
              each proposed load or site.
            </p>
          </div>

          <div className="mt-12 divide-y divide-[color:var(--hair)] border-y hair">
            {enquiryRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="row-link group grid gap-4 py-8 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12"
              >
                <h3 className="text-xl">{route.title}</h3>
                <div>
                  <p className="measure-wide t-muted">{route.body}</p>
                  <span className="mt-4 inline-block border-b border-current pb-1 text-sm font-semibold">
                    {route.link}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="questions"
        className="on-light scroll-mt-20 border-t hair bg-white py-14 lg:py-20"
      >
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <div>
              <p className="t-index t-muted">Before you send</p>
              <h2 className="mt-5">Scrap metal quote questions.</h2>
              <p className="measure mt-5 t-muted">
                Quote assumptions, material condition and the details that
                matter when a load contains more than one metal.
              </p>
              <Link
                href="/faq"
                className="mt-7 inline-block border-b border-current pb-1 text-sm font-semibold"
              >
                Read all questions
              </Link>
            </div>

            <FaqList items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Request a Brisbane scrap metal quote."
        body="Tell us the material type, approximate weight, suburb and condition. If you do not know the grade, say so and note any visible markings."
        primary={{ label: "Send quote details", href: "/contact" }}
      />
    </>
  );
}

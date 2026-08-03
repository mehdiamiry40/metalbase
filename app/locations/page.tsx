import Link from "next/link";
import { PageHeader } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  ChipList,
  Section,
  SectionHead,
  YardIcon,
  type YardIconName,
} from "@/components/ui";
import { regions } from "@/lib/regions";
import { company, locations } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/locations",
  title: "Scrap Metal Area Guides South East Queensland",
  description:
    "Regional scrap metal enquiry guides for Brisbane, the Gold Coast, Logan, Ipswich and the Redlands, plus practical drop-off preparation.",
});

const dropoffChecks: { title: string; body: string; icon: YardIconName }[] = [
  {
    title: "Destination",
    body: "Confirm the receiving location, hours and accepted material.",
    icon: "pin",
  },
  {
    title: "Material",
    body: "Describe the grade, condition, quantity and any unusual attachments.",
    icon: "tag",
  },
  {
    title: "Arrival",
    body: "Ask what identification, PPE and unloading instructions apply.",
    icon: "sort",
  },
  {
    title: "Trade terms",
    body: "Agree the grade, weight basis, deductions and settlement method.",
    icon: "scale",
  },
];

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Area + drop-off guide"
        photo="tipper"
        title="Scrap metal enquiry guides by area"
        intro="Prepare a clearer enquiry for Brisbane, the Gold Coast, Logan, Ipswich or the Redlands—then confirm the receiving or collection details before anything moves."
        trail={[{ label: "Home", href: "/" }, { label: "Area guides" }]}
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="#areas">Choose your area</Button>
          <Button href="/contact" variant="ghost">
            Start an enquiry
          </Button>
        </div>
      </PageHeader>

      <Section id="areas" className="pb-16 pt-10 lg:pb-20 lg:pt-12">
        <SectionHead
          index={1}
          eyebrow="Regional guides"
          title="Start with the right local details"
          intro="Each guide focuses on the material, access and preparation details most useful for that type of regional enquiry."
        />
        <ul className="border-y hair">
          {regions.map((region, index) => (
            <li key={region.slug} className="border-b hair last:border-b-0">
              <Link
                href={`/locations/${region.slug}`}
                className="group grid min-h-24 items-center gap-4 py-5 transition-colors duration-[160ms] ease-out hover:text-signal sm:grid-cols-[3rem_minmax(0,15rem)_1fr_auto] sm:gap-6"
              >
                <YardIcon name="pin" className="hidden h-8 w-8 sm:block" />
                <h3 className="text-xl">{region.name}</h3>
                <p className="text-sm leading-relaxed t-muted">
                  {region.hubSummary}
                </p>
                <span
                  aria-hidden="true"
                  className="text-xl transition-transform duration-[160ms] ease-out group-hover:translate-x-1"
                >
                  {String(index + 1).padStart(2, "0")} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Callout className="mt-10" label="Collection coverage">
          A regional guide does not guarantee collection. Send the exact
          address, material, approximate volume and site access so current
          equipment, minimum volume and timing can be assessed.{" "}
          <ArrowLink href="/services/collection-and-bins" tone="accent">
            Collection and container guide
          </ArrowLink>
        </Callout>
      </Section>

      {/* yards -------------------------------------------------------- */}
      <Section tone="slab">
        <SectionHead
          index={2}
          eyebrow="Destination"
          title={locations.length > 0 ? "Where to find us" : "Confirm your receiving location"}
          intro={
            locations.length > 0
              ? undefined
              : "Call before travelling so the load can be matched to the current receiving instructions."
          }
        />
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
          <div className="flex flex-col gap-6 border-y hair py-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] t-muted">
                Call before you load
              </p>
              {company.phone ? (
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="mt-2 inline-flex min-h-11 items-center font-mono text-2xl font-semibold u-link"
                >
                  {company.phoneLabel ?? company.phone}
                </a>
              ) : (
                <p className="mt-2 t-muted">Use the enquiry form.</p>
              )}
            </div>
            <Button href="/contact">Confirm a drop-off</Button>
          </div>
        )}
      </Section>

      <Section id="how-it-works" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={3}
          eyebrow="Before you travel"
          title="Four things to confirm"
          intro="Get the current answer for your load before it leaves the site."
        />
        <ol className="grid border-y hair sm:grid-cols-2 lg:grid-cols-4">
          {dropoffChecks.map((item, index) => (
            <li
              key={item.title}
              className={`py-7 sm:min-h-56 ${
                index === 0
                  ? "sm:pr-7"
                  : index === 1
                    ? "border-t hair sm:border-l sm:border-t-0 sm:pl-7 lg:pr-7"
                    : index === 2
                      ? "border-t hair sm:pr-7 lg:border-l lg:border-t-0 lg:px-7"
                      : "border-t hair sm:border-l sm:pl-7 lg:border-t-0"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <YardIcon name={item.icon} className="h-9 w-9" />
                <span className="text-xs font-semibold tracking-[0.08em] t-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7">{item.title}</h3>
              <p className="mt-3 t-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}

import Link from "next/link";
import { PageHeader } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  Section,
  SectionHead,
  YardIcon,
  type YardIconName,
} from "@/components/ui";
import { regionHref, regions } from "@/lib/regions";
import { company, operations } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/locations",
  title: "Scrap Metal Collection Areas South East Queensland",
  description:
    "MetalBase customer-site scrap collection across Brisbane, Gold Coast, Sunshine Coast, Logan and Ipswich, plus arranged receiving guidance.",
});

const dropoffChecks: { title: string; body: string; icon: YardIconName }[] = [
  {
    title: "Destination",
    body: "Get the arranged receiving destination, hours and accepted material.",
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
        eyebrow="Service areas + arranged receiving"
        photo="tipper"
        title="Customer-site collection across South East Queensland"
        intro={`MetalBase drivers collect across ${operations.serviceRegions.join(", ")}. Customers cannot visit a MetalBase location; suitable drop-offs are arranged per enquiry.`}
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
                href={regionHref(region)}
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
          Customer-site collection is available across the five listed service
          regions. Send the exact address, material, approximate volume and site
          access so equipment, minimum volume, timing and terms can be confirmed.{" "}
          <ArrowLink href="/scrap-removal-brisbane" tone="accent">
            Brisbane scrap removal guide
          </ArrowLink>
        </Callout>
      </Section>

      <Section tone="slab">
        <SectionHead
          index={2}
          eyebrow="No customer location"
          title="MetalBase has no public drop-off yard"
          intro="Our truck drivers visit customer sites. When drop-off is suitable for a load, MetalBase arranges and confirms the receiving destination and arrival instructions before you travel."
        />
        <div className="flex flex-col gap-6 border-y hair py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] t-muted">
              Call before anything moves
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
          <Button href="/contact">Arrange collection or drop-off</Button>
        </div>
      </Section>

      <Section id="how-it-works" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={3}
          eyebrow="Arranged drop-off"
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

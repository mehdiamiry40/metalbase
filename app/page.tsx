import Link from "next/link";
import Photo from "@/components/Photo";
import { FaqList } from "@/components/Faq";
import { Split } from "@/components/sections";
import {
  ArrowLink,
  Button,
  YardIcon,
  type YardIconName,
} from "@/components/ui";
import type { PhotoKey } from "@/lib/photos";
import { company, formatServiceRegions } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

const homeTitle = "MetalBase | Scrap Metal Quotes Across Brisbane & SEQ";
const homeDescription =
  "Request a scrap metal quote or prepare a scrap removal enquiry in Brisbane, with practical guidance on grades, quantity, pricing and site access.";

export const metadata = pageMetadata({
  path: "/",
  title: homeTitle,
  description: homeDescription,
});

const priceFactors: {
  title: string;
  body: string;
  icon: YardIconName;
}[] = [
  {
    title: "Metal grade",
    body: "Copper, aluminium, brass, cable and steel are assessed differently.",
    icon: "tag",
  },
  {
    title: "Cleanliness",
    body: "Attachments and mixed material affect recoverable yield.",
    icon: "sort",
  },
  {
    title: "Net weight",
    body: "The measured metal weight excludes containers and vehicles.",
    icon: "scale",
  },
  {
    title: "Market movement",
    body: "Commodity prices can change an indicative quote over time.",
    icon: "trend",
  },
];

const serviceLinks: {
  title: string;
  href: string;
  icon: YardIconName;
}[] = [
  {
    title: "Scrap removal Brisbane",
    href: "/scrap-removal-brisbane",
    icon: "bin",
  },
  {
    title: "Industrial scrap",
    href: "/services/industrial",
    icon: "motor",
  },
  {
    title: "Demolition steel",
    href: "/services/demolition",
    icon: "beam",
  },
  {
    title: "Service areas & arranged drop-off",
    href: "/locations",
    icon: "pin",
  },
];

const materialTiles: {
  title: string;
  href: string;
  photo: PhotoKey;
  layout: string;
}[] = [
  {
    title: "Scrap copper",
    href: "/materials/copper",
    photo: "copper-sheets",
    layout: "md:col-span-6 md:min-h-[470px]",
  },
  {
    title: "Scrap aluminium",
    href: "/materials/aluminium",
    photo: "aluminium-cans",
    layout: "md:col-span-3 md:min-h-[470px]",
  },
  {
    title: "Scrap steel",
    href: "/materials/steel",
    photo: "rusty-steel",
    layout: "md:col-span-3 md:min-h-[470px]",
  },
  {
    title: "Scrap cable",
    href: "/materials/cable",
    photo: "cable",
    layout: "md:col-span-4 md:min-h-[430px]",
  },
  {
    title: "Scrap stainless steel",
    href: "/materials/stainless-steel",
    photo: "stainless",
    layout: "md:col-span-4 md:min-h-[430px]",
  },
  {
    title: "Scrap brass",
    href: "/materials/brass",
    photo: "alloy",
    layout: "md:col-span-4 md:min-h-[430px]",
  },
  {
    title: "Scrap electric motors",
    href: "/materials/electric-motors",
    photo: "mixed-parts",
    layout: "md:col-span-12 md:min-h-[360px]",
  },
  {
    title: "Scrap radiators",
    href: "/materials/radiators",
    photo: "vehicle",
    layout: "md:col-span-12 md:min-h-[360px]",
  },
  {
    title: "Scrap whitegoods",
    href: "/materials/whitegoods",
    photo: "crew",
    layout: "md:col-span-12 md:min-h-[360px]",
  },
  {
    title: "Scrap lead",
    href: "/materials/lead",
    photo: "alloy",
    layout: "md:col-span-12 md:min-h-[360px]",
  },
  {
    title: "Scrap zinc",
    href: "/materials/zinc",
    photo: "alloy",
    layout: "md:col-span-12 md:min-h-[360px]",
  },
  {
    title: "Scrap swarf and turnings",
    href: "/materials/swarf",
    photo: "machine-swarf",
    layout: "md:col-span-12 md:min-h-[360px]",
  },
];

const homeFaqs = [
  {
    q: "What details help with a scrap metal quote?",
    a: "Send the metal type, approximate weight, exact suburb and condition.",
  },
  {
    q: "Why can the final price change?",
    a: "Final grading, contamination, attachments and measured net weight can change the price.",
  },
  {
    q: "What if my load contains mixed metals?",
    a: "Separate obvious grades where practical and describe anything you cannot identify.",
  },
  {
    q: "Is scrap removal available in Brisbane?",
    a: "Yes. MetalBase drivers collect from customer sites across Brisbane. Send the material, quantity, exact address, access, handling needs and timing so the job-specific scope can be confirmed.",
  },
];

export default function Home() {
  const tel = company.phone?.replace(/\s/g, "");

  return (
    <>
      <section className="on-dark over-photo relative flex min-h-[650px] items-center overflow-hidden bg-furnace lg:min-h-[calc(100svh-6rem)]">
        <Photo
          name="grab-claw"
          priority
          sizes="100vw"
          sourceWidth={3456}
          alt="An orange peel grab lifting scrap metal above a yard"
          className="object-[58%_center]"
        />
        <span aria-hidden="true" className="photo-scrim" />

        <div className="shell relative z-10 py-24 text-center lg:py-32">
          <p className="t-index mx-auto mb-6 w-fit border-b border-white/70 pb-3">
            Quote guidance · Brisbane + South East Queensland
          </p>
          <h1 className="mx-auto max-w-[15ch]">
            Clearer scrap metal quotes across Brisbane.
          </h1>
          <p className="t-lead mx-auto mt-7 max-w-[56ch] t-muted">
            Tell us the metal, quantity, condition and suburb for an indicative
            quote or removal assessment.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/contact">Get a quote</Button>
            <Button href="/what-we-buy" variant="ghost">
              What we buy
            </Button>
          </div>
        </div>

        <p className="t-spec absolute bottom-4 right-5 z-10 bg-furnace/90 px-2 py-1 text-white">
          Illustrative industry image
        </p>
      </section>

      <Split
        photo="operator"
        side="right"
        tone="ink"
        n={1}
        caption="Material handling and load preparation"
        eyebrow="Welcome to MetalBase"
        title="A clearer way to describe your scrap"
      >
        <p className="t-lead mt-6">
          Useful quotes start with four things: the material, rough quantity,
          condition and location.
        </p>
        <p className="mt-5 leading-relaxed">
          MetalBase provides mobile collection across {formatServiceRegions()}.
          Final grade, collection timing,
          arranged receiving instructions and commercial terms are confirmed
          for each enquiry.
        </p>
        <ArrowLink href="/scrap-metal-brisbane" className="mt-8">
          Scrap metal Brisbane guide
        </ArrowLink>
      </Split>

      <Split
        photo="yard-grab"
        side="left"
        tone="slab"
        n={2}
        caption="Sorting mixed metal into recoverable grades"
        eyebrow="Pricing"
        title="What shapes a scrap price"
      >
        <p className="mt-5 leading-relaxed">
          An indicative quote depends on the grade described. The final result
          can change after the material is inspected and weighed.
        </p>
        <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {priceFactors.map((factor) => (
            <li key={factor.title} className="flex items-start gap-4">
              <YardIcon name={factor.icon} className="mt-0.5 h-8 w-8 shrink-0 text-signal" />
              <div>
                <h3 className="text-xl">{factor.title}</h3>
                <p className="mt-2 text-sm leading-relaxed t-muted">
                  {factor.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <ArrowLink href="/prices" className="mt-9">
          How pricing works
        </ArrowLink>
      </Split>

      <section className="on-dark over-photo relative flex min-h-[520px] items-center overflow-hidden bg-furnace">
        <Photo
          name="yard-wide"
          alt="A wide view across a metal recovery yard"
          sizes="100vw"
          sourceWidth={2880}
        />
        <span aria-hidden="true" className="photo-scrim" />
        <div className="shell relative z-10 py-24 text-center">
          <h2 className="mx-auto max-w-[16ch]">Get a clearer scrap quote.</h2>
          <p className="t-lead mx-auto mt-6 max-w-[52ch] t-muted">
            Send the metal type, rough weight, condition and exact suburb.
          </p>
          <Button href="/contact" className="mt-8">
            Start your enquiry
          </Button>
        </div>
      </section>

      <Split
        photo="tipper"
        side="left"
        tone="ink"
        n={3}
        caption="Illustrative material transport and site handling"
        eyebrow="Regional services"
        title="Match the service to the load"
      >
        <p className="mt-5 leading-relaxed">
          Tell us what is on site, how much there is and what access looks like.
          Our drivers collect from customer sites, with bins and job-specific
          timing, equipment and terms confirmed for each enquiry.
        </p>
        <ul className="mt-8 border-y hair">
          {serviceLinks.map((service) => (
            <li key={service.href} className="border-b hair last:border-b-0">
              <Link
                href={service.href}
                className="group flex min-h-16 items-center justify-between gap-5 py-3 transition-colors duration-[160ms] ease-out hover:text-signal"
              >
                <span className="flex items-center gap-4 font-semibold">
                  <YardIcon name={service.icon} className="h-7 w-7 shrink-0" />
                  {service.title}
                </span>
                <span aria-hidden="true" className="text-xl transition-transform duration-[160ms] ease-out group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <ArrowLink href="/services" className="mt-8">
          View commercial services
        </ArrowLink>
      </Split>

      <section className="on-light bg-white py-16 lg:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="t-index mb-4 t-accent">Common material groups</p>
              <h2>Metals we buy.</h2>
            </div>
            <ArrowLink href="/what-we-buy">View the full guide</ArrowLink>
          </div>

          <ol className="mt-10 grid gap-2 md:grid-cols-12">
            {materialTiles.map((tile, index) => (
              <li
                key={`${tile.title}-${index}`}
                className={`min-h-[360px] ${tile.layout}`}
              >
                <Link
                  href={tile.href}
                  className="image-link over-photo group relative flex h-full min-h-[360px] overflow-hidden bg-furnace focus-visible:outline-offset-[-4px]"
                >
                  <Photo
                    name={tile.photo}
                    alt=""
                    sizes="(max-width: 768px) 100vw, 50vw"
                    sourceWidth={1600}
                    quality={70}
                  />
                  <span aria-hidden="true" className="photo-scrim-soft" />
                  <span className="relative z-10 mt-auto flex w-full items-end justify-between gap-5 p-6 lg:p-8">
                    <span className="font-display text-2xl font-semibold leading-tight">
                      {tile.title}
                    </span>
                    <span className="t-spec shrink-0 border-l border-white/70 pl-4">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="t-spec t-muted">
              Illustrative industry images. Final grade depends on composition
              and condition.
            </p>
            <Link href="/glossary" className="text-sm font-semibold u-link">
              Scrap glossary
            </Link>
          </div>
        </div>
      </section>

      <section className="on-light border-t hair bg-shaft py-16 lg:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="t-index mb-4 t-accent">Useful answers</p>
            <h2>Before you request a quote.</h2>
            <ArrowLink href="/faq" className="mt-8">
              See all FAQs
            </ArrowLink>
          </div>
          <FaqList items={homeFaqs} />
        </div>
      </section>

      {tel && (
        <section className="on-light border-t hair bg-white py-8">
          <div className="shell flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="t-muted">Prefer to talk through the load?</p>
            <a
              href={`tel:${tel}`}
              className="inline-flex min-h-11 items-center font-semibold u-link"
            >
              Call {company.phoneLabel ?? company.phone}
            </a>
          </div>
        </section>
      )}
    </>
  );
}

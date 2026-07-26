import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Scene from "@/components/Scene";
import {
  Button,
  Chevron,
  CtaBand,
  Eyebrow,
  Section,
  SectionHead,
} from "@/components/ui";
import { company, locations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scrap Metal Yards Brisbane — Rocklea, Wacol, Brendale & Hemmant",
  description:
    "Four MetalBase scrap yards across greater Brisbane. Certified weighbridges, public drop-off, opening hours, and what to bring with you.",
};

const steps = [
  {
    t: "drive on",
    b: "follow the blue line to the weighbridge. no appointment, no booking, no minimum load. keep your window down and a spotter will direct you.",
  },
  {
    t: "weigh in",
    b: "gross weight recorded, photo id scanned, vehicle registration logged. it takes about ninety seconds.",
  },
  {
    t: "get graded",
    b: "a grader inspects the load and tells you the grade before you tip. if you disagree, ask for the xrf gun — that's what it's there for.",
  },
  {
    t: "tip and weigh out",
    b: "unload in the bay you're directed to. tare weight on the way out, docket printed with net weight, grade and rate.",
  },
  {
    t: "get paid",
    b: "bank details taken once and stored against your record. eft usually lands the same afternoon, always within one business day.",
  },
];

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="find us"
        title="four yards across greater brisbane"
        intro="northside, southside, out west and down at the port. three take public drop-off, two have certified 80-tonne weighbridges, and all four run on the same posted board."
        scene="yard"
        trail={[{ label: "home", href: "/" }, { label: "locations" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/prices">today&apos;s prices</Button>
          <Button href="#how-it-works" variant="outline">
            how a weigh-in works
          </Button>
        </div>
      </PageHero>

      {/* yards -------------------------------------------------------- */}
      <Section>
        <SectionHead
          eyebrow="our yards"
          title="pick the one closest to the metal"
          intro="if you're not sure which site suits your load, ring the trade desk — sending a 12-tonne truck to the wrong yard costs everyone an hour."
        />
        <div className="space-y-6">
          {locations.map((l, i) => (
            <div
              key={l.id}
              id={l.id}
              className="grid scroll-mt-32 overflow-hidden rounded-2xl border border-line lg:grid-cols-[0.8fr_1.7fr]"
            >
              <div
                className={`relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[280px] ${
                  i % 2 ? "lg:order-2" : ""
                }`}
              >
                <Scene name={i % 2 ? "grab" : "yard"} />
              </div>
              <div className="p-8 lg:p-11">
                <div className="flex flex-wrap items-center gap-4">
                  <h2 className="text-[1.9rem] lg:text-[2.3rem]">{l.name}</h2>
                  <span className="rounded-full bg-sky px-3 py-1 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-blue">
                    {l.role}
                  </span>
                </div>

                <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-muted">
                      address
                    </dt>
                    <dd className="mt-1 text-[1rem] text-navy">{l.address}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-muted">
                      hours
                    </dt>
                    <dd className="mt-1 text-[1rem] lowercase text-navy">
                      {l.hours}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <p className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-muted">
                    on site
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {l.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-line px-3.5 py-1.5 text-[0.85rem] lowercase text-navy"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 text-[0.9rem] font-bold lowercase text-white transition hover:bg-blue-dark"
                  >
                    directions
                    <Chevron className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={company.phoneHref}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-navy px-6 py-3 text-[0.9rem] font-bold lowercase text-navy transition hover:bg-navy hover:text-white"
                  >
                    call the yard
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* how it works ------------------------------------------------- */}
      <Section id="how-it-works" tone="navy">
        <SectionHead
          eyebrow="first time?"
          title="how a weigh-in actually works"
          intro="about fifteen minutes end to end for a ute or trailer load. longer if there's a queue on a saturday morning."
          tone="white"
        />
        <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.t} className="rounded-2xl bg-white/[0.06] p-7">
              <span className="text-[1.9rem] font-bold leading-none text-amber">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 !text-white text-[1.15rem]">{s.t}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-white/75">
                {s.b}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* id + payment ------------------------------------------------- */}
      <Section tone="sky">
        <div className="grid gap-6 lg:grid-cols-2">
          <div id="id" className="scroll-mt-32 rounded-2xl bg-white p-9">
            <Eyebrow>before you come in</Eyebrow>
            <h2 className="text-[1.7rem] lg:text-[2.1rem]">
              what to bring with you
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                {
                  t: "current photo id",
                  b: "an australian driver licence is ideal. passport or proof-of-age card also works. we scan it at the bridge — it's a licensing requirement, not a preference.",
                },
                {
                  t: "your bank details",
                  b: "bsb and account number for the eft. we store it against your record so you only do it once.",
                },
                {
                  t: "the vehicle you'll be in",
                  b: "registration is recorded with every transaction. if you swap vehicles, we just log the new one.",
                },
                {
                  t: "papers for a vehicle",
                  b: "selling a car for scrap? bring the registration certificate and photo id. we lodge the disposal notice for you.",
                },
              ].map((x) => (
                <li key={x.t} className="flex gap-3">
                  <Chevron className="mt-1.5 h-4 w-4 shrink-0 text-blue" />
                  <div>
                    <p className="text-[1rem] font-bold lowercase text-navy">
                      {x.t}
                    </p>
                    <p className="mt-1 text-[0.93rem] leading-relaxed text-muted">
                      {x.b}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div id="payment" className="scroll-mt-32 rounded-2xl bg-navy p-9">
            <Eyebrow tone="white">getting paid</Eyebrow>
            <h2 className="!text-white text-[1.7rem] lg:text-[2.1rem]">
              why nobody in queensland can pay you cash
            </h2>
            <div className="mt-6 space-y-4 text-[0.97rem] leading-relaxed text-white/80">
              <p>
                queensland&apos;s second-hand dealer legislation prohibits cash
                payment for scrap metal. it was introduced to make stolen metal
                hard to move — copper off building sites, catalytic converters,
                cable off infrastructure projects.
              </p>
              <p>
                so we pay by electronic transfer, every time, to an account in
                the seller&apos;s name. most transfers land the same afternoon.
                the outside case is one business day.
              </p>
              <p>
                if a yard offers you cash, they are breaking the law, and the
                transaction leaves you exposed too. it is worth knowing before
                you go looking for a better rate.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/contact" variant="white">
                open a trade account
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* weighbridge -------------------------------------------------- */}
      <Section id="weighbridge">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>weighbridge</Eyebrow>
            <h2 className="text-[1.9rem] lg:text-[2.6rem]">
              certified, calibrated, and open to inspection
            </h2>
            <p className="mt-5 text-[1.03rem] leading-relaxed text-muted">
              rocklea and wacol run 80-tonne bridges verified under the national
              measurement act and recalibrated on a six-monthly cycle. brendale
              runs certified floor scales for non-ferrous. calibration
              certificates are on the wall at each site and in the audit pack.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "national measurement act verified",
                "six-monthly recalibration",
                "certificates displayed on site",
                "gross and tare on every docket",
                "photo evidence of each load",
                "seven-year record retention",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[0.94rem] lowercase text-navy"
                >
                  <Chevron className="mt-1 h-3.5 w-3.5 shrink-0 text-blue" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="notch-br relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            <Scene name="truck" />
          </div>
        </div>
      </Section>

      <CtaBand
        title="bringing something big?"
        body="anything over about ten tonnes, or oversized sections that need shearing, is worth a phone call first. we'll have the right bay clear and the right operator on it."
        primary={{ label: "call 1300 metal b", href: company.phoneHref }}
        secondary={{ label: "send details", href: "/contact" }}
      />
    </>
  );
}

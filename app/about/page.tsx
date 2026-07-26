import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Scene from "@/components/Scene";
import {
  ArrowLink,
  Button,
  Chevron,
  CtaBand,
  Eyebrow,
  Section,
  SectionHead,
  StatBand,
} from "@/components/ui";
import { stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About MetalBase — Brisbane Scrap Metal Since 1995",
  description:
    "A Queensland family business processing scrap metal across Brisbane for three decades. How we operate, how we approach safety, and who runs the yards.",
};

const timeline = [
  {
    year: "1995",
    t: "one yard at rocklea",
    b: "started with a hired grab truck, a set of floor scales and a leased half-acre on sherwood road.",
  },
  {
    year: "2004",
    t: "first certified weighbridge",
    b: "the moment we could take commercial tonnage seriously. wacol opened three years later to handle vehicles.",
  },
  {
    year: "2013",
    t: "brendale and cable granulation",
    b: "northside trade counter, and the granulator that let us pay on recovered copper rather than a flat cable rate.",
  },
  {
    year: "2019",
    t: "hemmant and export",
    b: "port-side container packing opened up mill markets we previously sold into through a third party.",
  },
  {
    year: "2026",
    t: "182,000 tonnes a year",
    b: "four yards, 140 staff, still family-owned, and still weighing every load on our own bridges.",
  },
];

const values = [
  {
    t: "the grade is the grade",
    b: "we call it before the load is tipped and we don't revise it afterwards. a yard that regrades at the scale is telling you something about how it does business.",
  },
  {
    t: "everybody gets the board rate",
    b: "volume gets you a contract formula, not a secret better price. a first-time seller and a fifty-tonne-a-week fabricator are quoted the same posted number.",
  },
  {
    t: "documentation isn't optional",
    b: "every movement generates a docket. every docket is retained for seven years. it protects you, it protects us, and it keeps stolen metal out of the chain.",
  },
  {
    t: "no cash, no exceptions",
    b: "queensland law is clear and we don't work around it. it costs us some walk-up trade and we're fine with that.",
  },
];

const safety = [
  "site induction required for every visitor, including drivers",
  "hi-vis, boots and eye protection at all times past the office line",
  "pedestrian and vehicle traffic physically separated in every yard",
  "dangerous goods handled under a documented procedure, not a habit",
  "iso 45001 certified with quarterly internal audits",
  "lost-time injury frequency rate published in our annual statement",
];

const roles = [
  { t: "yard hand — wacol", type: "full time" },
  { t: "hiab / crane truck driver — rocklea", type: "full time" },
  { t: "weighbridge operator — brendale", type: "part time" },
  { t: "trade desk account manager", type: "full time" },
  { t: "apprentice plant mechanic", type: "apprenticeship" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="about us"
        title="thirty-one years of weighing things properly"
        intro="metalbase is a queensland family business. we started with one grab truck at rocklea in 1995 and we still run the yards the same way — grade it in front of the customer, document everything, pay on time."
        scene="worker"
        trail={[{ label: "home", href: "/" }, { label: "about us" }]}
      />

      <Section>
        <StatBand items={stats} tone="sky" />
      </Section>

      {/* story -------------------------------------------------------- */}
      <Section id="story" tone="sky">
        <SectionHead
          eyebrow="our story"
          title="how the yards grew"
          intro="no acquisitions, no private equity. four sites added one at a time, each because a market we were already serving needed one."
        />
        <ol className="relative space-y-8 border-l-2 border-sky-deep pl-8 lg:pl-12">
          {timeline.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue lg:-left-[57px]">
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
              <p className="text-[0.85rem] font-bold uppercase tracking-[0.16em] text-blue">
                {t.year}
              </p>
              <h3 className="mt-1 text-[1.4rem]">{t.t}</h3>
              <p className="mt-2 max-w-2xl text-[0.99rem] leading-relaxed text-muted">
                {t.b}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* values ------------------------------------------------------- */}
      <Section id="operate">
        <SectionHead
          eyebrow="how we operate"
          title="four rules the yards run on"
          intro="they sound obvious. the reason people switch to us is that they are not universal."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {values.map((v, i) => (
            <div key={v.t} className="rounded-2xl border-2 border-line p-8">
              <p className="text-[2rem] font-bold leading-none text-blue">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-[1.35rem]">{v.t}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                {v.b}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* safety ------------------------------------------------------- */}
      <Section id="safety" tone="navy">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow tone="white">safety</Eyebrow>
            <h2 className="!text-white text-[1.9rem] lg:text-[2.6rem]">
              a scrap yard is a heavy industrial site
            </h2>
            <p className="mt-5 text-[1.03rem] leading-relaxed text-white/80">
              material handlers, mobile shears, moving trucks and unpredictable
              loads. we treat every visitor as somebody who has never been in
              one before, because most of them haven&apos;t.
            </p>
            <ul className="mt-7 space-y-3">
              {safety.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2.5 text-[0.96rem] lowercase text-white/85"
                >
                  <Chevron className="mt-1 h-4 w-4 shrink-0 text-amber" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="notch-br relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            <Scene name="grab" />
          </div>
        </div>
      </Section>

      {/* leadership --------------------------------------------------- */}
      <Section id="leadership" tone="sky">
        <SectionHead
          eyebrow="leadership"
          title="who you'll actually deal with"
          intro="the trade desk answers to these four. all of them have worked a yard."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { n: "angela k.", r: "managing director", y: "since 1998" },
            { n: "sam r.", r: "operations manager", y: "since 2006" },
            { n: "priya n.", r: "head of trade & pricing", y: "since 2014" },
            { n: "tomas l.", r: "hse & compliance manager", y: "since 2011" },
          ].map((p) => (
            <div key={p.n} className="rounded-2xl bg-white p-7 text-center">
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full">
                <Scene name="worker" />
              </div>
              <h3 className="mt-5 text-[1.25rem]">{p.n}</h3>
              <p className="mt-1 text-[0.88rem] lowercase text-blue">{p.r}</p>
              <p className="mt-1 text-[0.83rem] lowercase text-muted">{p.y}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* careers ------------------------------------------------------ */}
      <Section id="careers">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Eyebrow>work with us</Eyebrow>
            <h2 className="text-[1.9rem] lg:text-[2.6rem]">
              life at metalbase
            </h2>
            <p className="mt-5 text-[1.03rem] leading-relaxed text-muted">
              140 people across four yards. most of our supervisors started on
              the floor, and we&apos;d rather train someone who turns up than
              hire someone who interviews well. tickets and licences are paid
              for.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/contact">send us your resume</Button>
              <Button href="/contact" variant="outline">
                ask about apprenticeships
              </Button>
            </div>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {roles.map((r) => (
              <div
                key={r.t}
                className="flex flex-wrap items-center justify-between gap-3 py-5"
              >
                <div>
                  <p className="text-[1.1rem] font-bold lowercase text-navy">
                    {r.t}
                  </p>
                  <p className="mt-0.5 text-[0.85rem] lowercase text-muted">
                    {r.type}
                  </p>
                </div>
                <ArrowLink href="/contact">apply</ArrowLink>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="come and have a look"
        body="if you're weighing up a new merchant, come and watch a load get graded. it tells you more in ten minutes than any proposal will."
        primary={{ label: "arrange a visit", href: "/contact" }}
        secondary={{ label: "find a yard", href: "/locations" }}
      />
    </>
  );
}

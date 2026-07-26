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

export const metadata: Metadata = {
  title: "Sustainability, ESG Reporting & Certificates of Destruction",
  description:
    "Diversion reporting, Scope 3 emissions data, certificates of destruction and chain-of-custody records from MetalBase Brisbane. ISO 14001 and ISO 45001 certified.",
};

const esgStats = [
  { value: "182,000t", label: "metal returned to production last fy" },
  { value: "98.6%", label: "of received material diverted from landfill" },
  { value: "~1.5t", label: "co₂e avoided per tonne of steel recycled" },
  { value: "quarterly", label: "reporting cycle for contract customers" },
];

const reports = [
  {
    title: "diversion report",
    who: "waste managers, site supervisors",
    body: "tonnage received by stream, percentage diverted from landfill, and residual waste sent to disposal. issued per site or per project, monthly or quarterly.",
  },
  {
    title: "scope 3 emissions data",
    who: "sustainability and finance teams",
    body: "avoided emissions calculated per tonne by material type against primary production baselines, with the methodology and factors stated so your assurance provider can check the working.",
  },
  {
    title: "destination & chain of custody",
    who: "procurement, risk, auditors",
    body: "which mill or refinery each parcel went to, when it left, and the docket trail connecting it back to your gate. the record that survives an audit.",
  },
  {
    title: "certificate of destruction",
    who: "asset owners, it and security",
    body: "issued against a serialised asset list for equipment, data media and branded product. destruction can be witnessed on site or recorded on video.",
  },
];

const certs = [
  { code: "iso 14001", label: "environmental management systems" },
  { code: "iso 45001", label: "occupational health & safety" },
  { code: "era 57", label: "queensland regulated activity — metal recovery" },
  { code: "era 62", label: "resource recovery and transfer" },
  { code: "shd 4187264", label: "second-hand dealer licence (qld)" },
  { code: "arn", label: "australian recycling network member" },
];

const targets = [
  {
    year: "2027",
    goal: "electrify the light collection fleet",
    detail:
      "all sub-4.5t collection vehicles replaced with battery-electric equivalents as leases roll over.",
  },
  {
    year: "2028",
    goal: "100% renewable electricity across four yards",
    detail:
      "rooftop solar at rocklea and wacol, backed by a queensland-sourced ppa for the balance.",
  },
  {
    year: "2029",
    goal: "99.2% diversion rate",
    detail:
      "residual reduced through improved fines recovery and a dedicated non-metallic sorting line at wacol.",
  },
  {
    year: "2030",
    goal: "verified scope 1 & 2 net zero",
    detail:
      "third-party assured, with the assurance statement published rather than summarised.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="sustainability"
        title="recycling is the easy part. proving it is the work."
        intro="every tonne we take is diverted from landfill and returned to production. what customers actually need from us is the evidence — tonnage, destination, methodology and a signature — in a format their auditor will accept."
        scene="coil"
        trail={[{ label: "home", href: "/" }, { label: "sustainability" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">request a reporting sample</Button>
          <Button href="#compliance" variant="outline">
            see our certifications
          </Button>
        </div>
      </PageHero>

      <Section>
        <StatBand items={esgStats} tone="sky" />
        <p className="mt-6 max-w-3xl text-[0.88rem] leading-relaxed text-muted">
          avoided-emissions figures are indicative and depend on the baseline
          chosen. we publish the factors and the source with every report rather
          than presenting a single headline number, because the number changes
          depending on what you compare it to.
        </p>
      </Section>

      {/* reporting ---------------------------------------------------- */}
      <Section id="reporting" tone="sky">
        <SectionHead
          eyebrow="reporting"
          title="four documents that cover most requirements"
          intro="if your client, your board or your certification scheme asks for something we don't already produce, tell us — most of it is already in the weighbridge data."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {reports.map((r) => (
            <div
              key={r.title}
              className="flex flex-col rounded-2xl bg-white p-8"
            >
              <p className="text-[0.76rem] font-bold uppercase tracking-[0.16em] text-blue">
                {r.who}
              </p>
              <h3 className="mt-3 text-[1.4rem]">{r.title}</h3>
              <p className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-muted">
                {r.body}
              </p>
              <div className="mt-6">
                <ArrowLink href="/contact">request a sample</ArrowLink>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* destruction -------------------------------------------------- */}
      <Section id="destruction">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>secure destruction</Eyebrow>
            <h2 className="text-[1.9rem] lg:text-[2.6rem]">
              when it has to be gone, and provably gone
            </h2>
            <p className="mt-5 text-[1.03rem] leading-relaxed text-muted">
              recalled product, branded stock, failed components, decommissioned
              plant and data-bearing equipment. destroyed under controlled
              conditions with a certificate issued against the serial or batch
              list you provide.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "witnessed destruction at rocklea, or video-recorded",
                "serialised asset register reconciled line by line",
                "drives physically destroyed, not just wiped",
                "certificate issued within two business days",
                "records retained for seven years",
              ].map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 text-[0.97rem] lowercase text-navy"
                >
                  <Chevron className="mt-1 h-4 w-4 shrink-0 text-blue" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact">book a destruction job</Button>
            </div>
          </div>
          <div className="notch-br relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            <Scene name="counter" />
          </div>
        </div>
      </Section>

      {/* compliance --------------------------------------------------- */}
      <Section id="compliance" tone="navy">
        <SectionHead
          eyebrow="compliance"
          title="the audit pack, ready before you ask"
          intro="certificates, licences, insurances, swms and environmental authorities bundled as one pdf for procurement onboarding."
          tone="white"
        />
        <div className="grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((c) => (
            <div key={c.code} className="bg-navy p-8">
              <p className="text-[1.35rem] font-bold lowercase text-amber">
                {c.code}
              </p>
              <p className="mt-2 text-[0.93rem] lowercase text-white/75">
                {c.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/contact" variant="white">
            request the audit pack
          </Button>
        </div>
      </Section>

      {/* circular ----------------------------------------------------- */}
      <Section id="circular" tone="sky">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="notch-tl relative aspect-[4/3] overflow-hidden rounded-b-2xl">
            <Scene name="yard" />
          </div>
          <div>
            <Eyebrow>circular economy</Eyebrow>
            <h2 className="text-[1.9rem] lg:text-[2.6rem]">
              where your metal actually goes
            </h2>
            <p className="mt-5 text-[1.03rem] leading-relaxed text-muted">
              nothing disappears. ferrous is baled or sheared to mill
              specification and moves to electric arc furnaces domestically and
              through the port at hemmant. non-ferrous is sorted, sampled and
              sold to refiners and secondary smelters. we name the destination
              on every report.
            </p>
            <dl className="mt-8 space-y-5">
              {[
                {
                  t: "steel",
                  d: "electric arc furnaces in australia and south-east asia. recycled steel needs roughly a quarter of the energy of primary production and can be recycled indefinitely without losing structural properties.",
                },
                {
                  t: "aluminium",
                  d: "secondary smelters producing billet and casting alloys. recycling uses about 5% of the energy of smelting from bauxite — the single biggest energy saving in the whole industry.",
                },
                {
                  t: "copper",
                  d: "refiners producing cathode and rod. demand is climbing hard with electrification, and secondary supply is the fastest route to meeting it.",
                },
              ].map((x) => (
                <div key={x.t} className="border-l-4 border-blue pl-6">
                  <dt className="text-[1.15rem] font-bold lowercase text-navy">
                    {x.t}
                  </dt>
                  <dd className="mt-2 text-[0.96rem] leading-relaxed text-muted">
                    {x.d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* targets ------------------------------------------------------ */}
      <Section id="targets">
        <SectionHead
          eyebrow="our commitments"
          title="four targets, with dates attached"
          intro="progress is reported in our annual sustainability statement, including the ones we miss."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {targets.map((t) => (
            <div
              key={t.year}
              className="rounded-2xl border-2 border-line p-7 transition hover:border-blue"
            >
              <p className="text-[2rem] font-bold leading-none text-blue">
                {t.year}
              </p>
              <h3 className="mt-4 text-[1.15rem] leading-snug">{t.goal}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">
                {t.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="need reporting in a specific format?"
        body="green star, infrastructure sustainability, nabers, a client's own template — send us the requirement and we'll tell you honestly whether the weighbridge data supports it."
        primary={{ label: "talk to us", href: "/contact" }}
        secondary={{ label: "for business", href: "/services" }}
      />
    </>
  );
}

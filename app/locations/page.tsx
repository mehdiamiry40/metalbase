import type { Metadata } from "next";
import { PageHeader, Split, Steps } from "@/components/sections";
import { Button, CtaBand, Eyebrow, Section, TickList } from "@/components/ui";
import { company, locations } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/locations" },
  title: "Yards & How to Sell Your Scrap — Brisbane",
  description:
    "How a weigh-in works at MetalBase, what ID to bring, why Queensland yards cannot pay cash, and where to find us.",
};

const steps = [
  { title: "Drive on", body: "Follow the line to the weighbridge. No appointment, no booking, no minimum load. Keep your window down and a spotter will direct you." },
  { title: "Weigh in", body: "Gross weight recorded, photo ID scanned, vehicle registration logged. About ninety seconds." },
  { title: "Get graded", body: "A grader inspects the load and tells you the grade before you tip. If you disagree, ask for the XRF gun — that's what it's there for." },
  { title: "Tip and weigh out", body: "Unload in the bay you're directed to. Tare on the way out, docket printed with net weight, grade and rate." },
];

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sell your scrap"
        title="Drive on, weigh in, get paid"
        intro="No appointment and no minimum load. Here is exactly how it works, what to bring, and how the money reaches you."
        trail={[{ label: "Home", href: "/" }, { label: "Sell your scrap" }]}
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/prices">Rate board</Button>
          <Button href="#id" variant="outline">
            What to bring
          </Button>
        </div>
      </PageHeader>

      {/* yards -------------------------------------------------------- */}
      <Section>
        <div className="rule max-w-3xl">
          <h2>Where to find us</h2>
        </div>
        {locations.length > 0 ? (
          <div className="mt-10 divide-y divide-[color:var(--hair)] border-y hair">
            {locations.map((l) => (
              <div key={l.id} id={l.id} className="grid scroll-mt-20 gap-4 py-8 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-12">
                <div>
                  <h3>{l.name}</h3>
                  <p className="t-eyebrow mt-2 t-accent">{l.role}</p>
                </div>
                <div className="space-y-3">
                  {l.address && <p className="text-[1.02rem]">{l.address}</p>}
                  {l.hours && <p className="t-muted">{l.hours}</p>}
                  {l.features.length > 0 && (
                    <ul className="flex flex-wrap gap-2 pt-1">
                      {l.features.map((f) => (
                        <li key={f} className="border hair px-3 py-1 text-[0.86rem] t-muted">
                          {f}
                        </li>
                      ))}
                    </ul>
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
          <div className="mt-10 border-2 border-dashed hair p-8">
            <p className="t-eyebrow t-accent">Not yet published</p>
            <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed t-muted">
              Yard addresses and opening hours will be listed here once sites are
              confirmed. We&rsquo;d rather leave this blank than send someone to an
              address that isn&rsquo;t ours.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="outline">
                Ask where to bring a load
              </Button>
            </div>
          </div>
        )}
      </Section>

      {/* how it works ------------------------------------------------- */}
      <section id="how-it-works" className="scroll-mt-20 bg-cream py-16 lg:py-24">
        <div className="shell">
          <div className="rule max-w-3xl">
            <h2>How a weigh-in works</h2>
            <p className="t-lead mt-5 t-muted">
              About fifteen minutes end to end for a ute or trailer load.
            </p>
          </div>
          <div className="mt-12">
            <Steps items={steps} />
          </div>
        </div>
      </section>

      {/* id ----------------------------------------------------------- */}
      <Section id="id" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Before you come in</Eyebrow>
            <h2>What to bring with you</h2>
            <TickList
              className="mt-7"
              items={[
                "Current photo ID — an Australian driver licence is ideal",
                "Your BSB and account number for the EFT",
                "The vehicle you'll be in — registration is recorded each time",
                "Registration papers, if you're selling a vehicle for scrap",
              ]}
            />
            <p className="mt-6 text-[0.95rem] leading-relaxed t-muted">
              ID is scanned at the bridge. It is a licensing requirement, not a
              preference.
            </p>
          </div>

          <div id="payment" className="scroll-mt-20 border-2 border-orange p-8">
            <Eyebrow>Getting paid</Eyebrow>
            <h2 className="text-[1.6rem]">Why nobody in Queensland can pay you cash</h2>
            <div className="mt-5 space-y-4 text-[0.97rem] leading-relaxed t-muted">
              <p>
                Queensland&rsquo;s second-hand dealer legislation prohibits cash
                payment for scrap metal. It was introduced to make stolen metal
                hard to move — copper off building sites, catalytic converters,
                cable off infrastructure projects.
              </p>
              <p>
                So payment is by electronic transfer, every time, to an account
                in the seller&rsquo;s name.
              </p>
              <p>
                If a yard offers you cash, they are breaking the law, and the
                transaction leaves you exposed too. Worth knowing before you go
                looking for a better rate.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Split
        photo="tipper"
        side="right"
        tone="deep"
        eyebrow="Weighbridge"
        title="Certified, calibrated and open to inspection"
      >
        <p className="t-lead mt-5">
          Weighbridges used for trade must be verified under the National
          Measurement Act and recalibrated on a set cycle. Calibration
          certificates are available on request and included in the audit pack.
        </p>
        <TickList
          className="mt-7"
          items={[
            "Gross and tare on every docket",
            "Photo evidence of each load",
            "Records retained for audit",
          ]}
        />
      </Split>

      <CtaBand
        title="Bringing something big?"
        body="Anything over about ten tonnes, or oversized sections that need shearing, is worth a call first. We'll have the right bay clear and the right operator on it."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "What we buy", href: "/what-we-buy" }}
      />
    </>
  );
}

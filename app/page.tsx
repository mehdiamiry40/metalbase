import Link from "next/link";
import Photo from "@/components/Photo";
import { FaqList } from "@/components/Faq";
import { ArrowLink, ArrowRight, Button, Tick, YardIcon, type YardIconName } from "@/components/ui";
import type { PhotoKey } from "@/lib/photos";
import { company, formatServiceRegions } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

const homeTitle = "MetalBase | Scrap Metal Quotes Across Brisbane & SEQ";
const homeDescription =
  "Request a scrap metal quote or prepare a scrap removal enquiry in Brisbane, with practical guidance on grades, quantity, pricing and site access.";

export const metadata = pageMetadata({ path: "/", title: homeTitle, description: homeDescription });

const featuredMaterials: { title: string; description: string; href: string; photo: PhotoKey; tag: string }[] = [
  { title: "Copper", description: "Wire, pipe, sheet and offcuts. Learn what separates the grades.", href: "/materials/copper", photo: "copper-sheets", tag: "Non-ferrous" },
  { title: "Aluminium", description: "Cans, frames and extrusions. Make more sense of your material.", href: "/materials/aluminium", photo: "aluminium-cans", tag: "Non-ferrous" },
  { title: "Steel", description: "Structural steel, sheet and mixed scrap. Start with the right details.", href: "/materials/steel", photo: "rusty-steel", tag: "Ferrous" },
];
const moreMaterials = [
  { title: "Cable", href: "/materials/cable" },
  { title: "Stainless steel", href: "/materials/stainless-steel" },
  { title: "Brass", href: "/materials/brass" },
  { title: "Electric motors", href: "/materials/electric-motors" },
  { title: "Radiators", href: "/materials/radiators" },
  { title: "Whitegoods", href: "/materials/whitegoods" },
  { title: "Lead", href: "/materials/lead" },
  { title: "Zinc", href: "/materials/zinc" },
  { title: "Swarf & turnings", href: "/materials/swarf" },
  { title: "Gas bottles", href: "/materials/gas-bottles" },
  { title: "Cast iron", href: "/materials/cast-iron" },
  { title: "Hot water systems", href: "/materials/hot-water-systems" },
  { title: "Car bodies", href: "/materials/car-bodies" },
  { title: "E-waste", href: "/materials/e-waste" },
  { title: "Transformers", href: "/materials/transformers" },
];
const serviceCards: { title: string; body: string; href: string; icon: YardIconName; label: string }[] = [
  { title: "Collection & bins", body: "Tell us what is on site and how much you have. We will confirm collection, bin options and access requirements.", href: "/scrap-removal-brisbane", icon: "bin", label: "Explore collection" },
  { title: "Industrial scrap", body: "Offcuts, swarf and production metal. Prepare an enquiry around your material streams and site needs.", href: "/services/industrial", icon: "motor", label: "Industrial enquiries" },
  { title: "Construction & demolition", body: "Structural steel and strip-out metal. Share your project scope, quantity and timing for assessment.", href: "/services/demolition", icon: "beam", label: "Project enquiries" },
  { title: "Local collection areas", body: "Find guidance for your region, including site access and any arranged receiving instructions.", href: "/locations", icon: "pin", label: "Find your area" },
];
const priceFactors: { title: string; body: string; icon: YardIconName }[] = [
  { title: "Metal grade", body: "Different metals and alloys are assessed separately.", icon: "tag" },
  { title: "Condition", body: "Attachments and mixed material affect recoverable metal.", icon: "sort" },
  { title: "Net weight", body: "The material weight excludes vehicles and containers.", icon: "scale" },
  { title: "The market", body: "Commodity prices can change an indicative quote over time.", icon: "trend" },
];
const homeFaqs = [
  { q: "What details help with a scrap metal quote?", a: "Send the metal type, approximate weight, exact suburb and condition." },
  { q: "Why can the final price change?", a: "Final grading, contamination, attachments and measured net weight can change the price." },
  { q: "What if my load contains mixed metals?", a: "Separate obvious grades where practical and describe anything you cannot identify." },
  { q: "Is scrap removal available in Brisbane?", a: "Yes. MetalBase drivers collect from customer sites across Brisbane. Send the material, quantity, exact address, access, handling needs and timing so the job-specific scope can be confirmed." },
];

export default function Home() {
  const tel = company.phone?.replace(/\s/g, "");
  return (
    <>
      <section className="home-hero on-light">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow-pill">Brisbane & South East Queensland</p>
            <h1>Your scrap metal.<br /><span>A new beginning.</span></h1>
            <p className="hero-intro">From copper offcuts to a site full of steel, get a clear scrap metal quote and collection options for your load.</p>
            <div className="hero-actions">
              <Button href="/contact">Get a quote</Button>
              <Button href="/what-we-buy" variant="ghost">Explore metals</Button>
            </div>
            <p className="hero-note"><Tick className="h-5 w-5" /> Collection & bins available <span aria-hidden="true">·</span> Terms confirmed per load</p>
          </div>
          <div className="hero-visual">
            <figure className="hero-photo">
              <Photo name="grab-claw" priority sizes="(max-width: 767px) 100vw, 50vw" sourceWidth={1600} alt="An orange peel grab lifting scrap metal at a recycling yard" />
              <figcaption>Illustrative industry image</figcaption>
            </figure>
            <div className="hero-photo-note">
              <span className="icon-disc"><YardIcon name="bin" className="h-7 w-7" /></span>
              <span><strong>From your site.</strong><br />On to its next chapter.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="region-strip on-light" aria-label="Service coverage">
        <div className="shell">
          <p>Local knowledge. A simpler way to recycle.</p>
          <p className="t-muted">{formatServiceRegions()}.</p>
          <Link href="/locations" className="u-link">Explore service areas</Link>
        </div>
      </section>

      <section className="home-section on-light bg-white">
        <div className="shell">
          <div className="section-heading">
            <p className="section-eyebrow">Good things start with the right material.</p>
            <h2>What have you got?</h2>
            <p>Get to know your metal, how it is graded and what to include in your quote.</p>
          </div>
          <div className="material-cards">
            {featuredMaterials.map((material) => (
              <Link key={material.href} href={material.href} className="material-card image-link">
                <div className="material-card-photo">
                  <Photo name={material.photo} alt="" sizes="(max-width: 767px) 100vw, 33vw" sourceWidth={900} />
                  <span>{material.tag}</span>
                </div>
                <div className="material-card-copy">
                  <h3>{material.title}</h3><p>{material.description}</p>
                  <span className="card-link">Explore {material.title.toLowerCase()} <ArrowRight className="h-5 w-5" /></span>
                </div>
              </Link>
            ))}
          </div>
          <p className="image-caption">Illustrative industry images. Final grade depends on composition and condition.</p>
          <div className="more-materials" aria-label="More material guides">
            {moreMaterials.map((material) => (
              <Link href={material.href} key={material.href}>{material.title}<ArrowRight className="h-4 w-4" /></Link>
            ))}
          </div>
          <div className="section-actions">
            <Button href="/what-we-buy" variant="ghost">See all materials</Button>
            <Link href="/glossary" className="u-link">New to scrap? Explore the glossary</Link>
          </div>
        </div>
      </section>

      <section className="service-band on-dark">
        <div className="shell">
          <div className="section-heading">
            <p className="section-eyebrow">For your site. For your business.</p>
            <h2>A service that starts with your load.</h2>
            <p>One-off clear-outs or ongoing metal streams. Start with the details, and we will work through the options with you.</p>
          </div>
          <div className="service-cards">
            {serviceCards.map((service) => (
              <Link key={service.href} href={service.href} className="service-card">
                <span className="service-icon"><YardIcon name={service.icon} className="h-8 w-8" /></span>
                <h3>{service.title}</h3><p>{service.body}</p>
                <span className="card-link">{service.label}<ArrowRight className="h-5 w-5" /></span>
              </Link>
            ))}
          </div>
          <div className="section-actions"><Button href="/services" variant="ghost">View commercial services</Button></div>
          <p className="service-terms">Availability, equipment, collection timing and commercial terms are confirmed for each enquiry.</p>
        </div>
      </section>

      <section className="home-section on-light bg-white">
        <div className="shell process-layout">
          <div>
            <p className="section-eyebrow">Less guesswork. More clarity.</p>
            <h2>A clearer quote.<br />In three simple steps.</h2>
            <p className="process-intro">You do not need to know every grade. A few details and clear photos give us a useful place to start.</p>
            <ArrowLink href="/scrap-metal-brisbane">Your Brisbane scrap guide</ArrowLink>
          </div>
          <ol className="process-steps">
            <li><span className="step-number">1</span><div><h3>Show us your scrap</h3><p>Tell us the material, rough quantity, condition and suburb. Add photos if you can.</p></div></li>
            <li><span className="step-number">2</span><div><h3>Understand your options</h3><p>We review the details and discuss grade assumptions, pricing and suitable handling.</p></div></li>
            <li><span className="step-number">3</span><div><h3>Agree on the next step</h3><p>Confirm the scope, location, timing and terms before any material moves.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="pricing-section on-light">
        <div className="shell pricing-layout">
          <div>
            <p className="section-eyebrow">Know what goes into your quote.</p>
            <h2>The right details<br />make the difference.</h2>
            <p className="process-intro">A quote is based on the material you describe. Final pricing can change after inspection and weighing.</p>
            <Button href="/prices" variant="ghost">How pricing works</Button>
          </div>
          <ul className="price-factor-grid">
            {priceFactors.map((factor) => (
              <li key={factor.title}><YardIcon name={factor.icon} className="h-8 w-8 text-signal" /><h3>{factor.title}</h3><p>{factor.body}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-section on-light bg-white">
        <div className="shell faq-layout">
          <div><p className="section-eyebrow">A little clarity goes a long way.</p><h2>Questions?<br />Start here.</h2><ArrowLink href="/faq" className="mt-7">See all FAQs</ArrowLink></div>
          <FaqList items={homeFaqs} />
        </div>
      </section>

      <section className="closing-section on-light">
        <div className="shell">
          <div className="closing-panel">
            <p className="section-eyebrow">Let us take it from here.</p>
            <h2>Give your scrap<br />a new beginning.</h2>
            <p>Tell us what you have. We will help you work out what comes next.</p>
            <div className="hero-actions">
              <Button href="/contact">Get a quote</Button>
              {tel && <a href={`tel:${tel}`} className="btn btn-ghost">Call {company.phoneLabel ?? company.phone}</a>}
            </div>
            {company.hours && <p className="closing-hours">{company.hours}</p>}
          </div>
        </div>
      </section>
    </>
  );
}

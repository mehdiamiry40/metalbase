import Link from "next/link";
import { company, locations, nav } from "@/lib/site";
import { DataRow, Logo } from "@/components/ui";

/* Pages the flat nav deliberately leaves out. They are real pages with
   real content, just not among the four things someone arrives needing,
   so they live here rather than in the header. */
const secondary = [
  { label: "How it works", href: "/locations#how-it-works" },
  { label: "Glossary", href: "/glossary" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const legal = [
  { label: "Privacy", href: "/legal#privacy" },
  { label: "Terms of trade", href: "/legal#terms" },
  { label: "Accessibility", href: "/legal#accessibility" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const tel = company.phone?.replace(/\s/g, "");

  return (
    <footer className="on-dark border-t hair bg-furnace">
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-base leading-relaxed t-muted">
          Brisbane scrap-metal quote requests, grade guidance and practical
          preparation information.
            </p>

            <dl className="mt-9 space-y-5">
              <DataRow label="Trade desk" value={company.phone}>
                <a
                  href={`tel:${tel}`}
                  className="mono text-xl font-medium tracking-[-0.02em] underline decoration-1 underline-offset-4 transition-colors duration-[160ms] ease-out hover:text-mist"
                >
                  {company.phoneLabel ?? company.phone}
                </a>
              </DataRow>
              <DataRow label="Email" value={company.email}>
                <a
                  href={`mailto:${company.email}`}
                  className="underline decoration-1 underline-offset-4 transition-colors duration-[160ms] ease-out hover:text-mist"
                >
                  {company.email}
                </a>
              </DataRow>
              <DataRow label="Head office" value={company.head}>
                {company.head}
              </DataRow>
            </dl>
          </div>

          {/* Was a four-column link grid mirroring the old mega-menu. A
              footer that repeats the whole site is a sitemap, not a
              footer. It is two labelled columns now, and it carries the
              secondary pages — the home page no longer links About, FAQ
              or Sustainability from full sections, so without this they
              would be reachable from nowhere at all. */}
          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="Footer, main">
              <p className="t-spec border-b hair pb-3 uppercase tracking-[0.14em] t-muted">
                Trading
              </p>
              <ul className="mt-3 space-y-1">
                {nav.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-base transition-colors duration-[160ms] ease-out hover:text-mist"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Footer, secondary">
              <p className="t-spec border-b hair pb-3 uppercase tracking-[0.14em] t-muted">
                Company
              </p>
              <ul className="mt-3 space-y-1">
                {secondary.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-base transition-colors duration-[160ms] ease-out hover:text-mist"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {locations.length > 0 && (
          <div className="mt-14 border-t hair pt-8">
            <p className="t-spec uppercase tracking-[0.14em] t-muted">Our yards</p>
            <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
              {locations.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/locations#${l.id}`}
                    className="inline-flex min-h-11 items-center text-sm transition-colors duration-[160ms] ease-out hover:text-mist"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 space-y-2 border-t hair pt-8 text-sm leading-relaxed t-muted">
          <p>
            © {new Date().getFullYear()} {company.legal}
            {company.abn ? ` · ABN ${company.abn}` : null}
          </p>
          {company.licence && (
            <p>Queensland second-hand dealer licence {company.licence}</p>
          )}
        </div>

        <p className="mt-7 max-w-4xl text-sm leading-relaxed t-muted">
          MetalBase acknowledges the Turrbal and Jagera peoples, the Traditional
          Custodians of the land on which we operate, and pays respect to Elders
          past and present.
        </p>

        <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-1">
          {legal.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="inline-flex min-h-11 items-center text-sm underline decoration-1 underline-offset-4 t-muted transition-colors duration-[160ms] ease-out hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

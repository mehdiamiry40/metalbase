import Link from "next/link";
import { company, locations, nav } from "@/lib/site";
import { DataRow, Logo, Pending } from "@/components/ui";

const IS_PROD = process.env.NODE_ENV === "production";

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
    <footer className="on-dark border-t hair bg-ink">
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-[0.94rem] leading-relaxed t-muted">
              {company.legal} — buying, processing and remarketing scrap metal
              across greater Brisbane.
            </p>

            <dl className="mt-9 space-y-5">
              <DataRow label="Trade desk" value={company.phone}>
                <a
                  href={`tel:${tel}`}
                  className="mono text-[1.35rem] font-medium tracking-[-0.02em] t-accent hover:underline"
                >
                  {company.phoneLabel ?? company.phone}
                </a>
              </DataRow>
              <DataRow label="Email" value={company.email}>
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-[color:var(--accent-text)]"
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
              <ul className="mt-4 space-y-3">
                {nav.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[0.95rem] hover:text-[color:var(--accent-text)]"
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
              <ul className="mt-4 space-y-3">
                {secondary.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[0.95rem] hover:text-[color:var(--accent-text)]"
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
                    className="text-[0.92rem] hover:text-[color:var(--accent-text)]"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 space-y-2 border-t hair pt-8 text-[0.82rem] leading-relaxed t-muted">
          <p>
            © {new Date().getFullYear()} {company.legal}
            {company.abn ? ` · ABN ${company.abn}` : null}
          </p>
          {/* Pending renders null in production, so these wrappers would
              leave empty <p> elements behind. Guard on the data instead
              of on the marker. */}
          {!company.abn && !IS_PROD && (
            <p>
              <Pending>ABN not set</Pending>
            </p>
          )}
          {company.licence ? (
            <p>Queensland second-hand dealer licence {company.licence}</p>
          ) : IS_PROD ? null : (
            <p>
              <Pending>
                Second-hand dealer licence not set — required before trading
              </Pending>
            </p>
          )}
        </div>

        <p className="mt-7 max-w-4xl text-[0.82rem] leading-relaxed t-muted">
          MetalBase acknowledges the Turrbal and Jagera peoples, the Traditional
          Custodians of the land on which we operate, and pays respect to Elders
          past and present.
        </p>

        <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
          {legal.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="text-[0.85rem] t-muted hover:text-[color:var(--accent-text)]"
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

import Link from "next/link";
import { company, locations, nav } from "@/lib/site";
import { DataRow, Logo, Pending } from "@/components/ui";

const IS_PROD = process.env.NODE_ENV === "production";

/* Pages the flat nav deliberately leaves out. They are real pages with
   real content, just not among the four things someone arrives needing,
   so they live here rather than in the header. */
const secondary = [
  { label: "How it works", href: "/locations#how-it-works" },
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
  return (
    <footer className="on-dark bg-graphite">
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed t-muted">
              {company.legal} — buying, processing and remarketing scrap metal
              across greater Brisbane.
            </p>

            <dl className="mt-8 space-y-4 text-[0.94rem]">
              <DataRow label="Trade desk" value={company.phone}>
                <a
                  href={`tel:${company.phone?.replace(/\s/g, "")}`}
                  className="text-[1.3rem] font-medium t-accent hover:underline"
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

          {/* Was a four-column link grid mirroring the mega-menu. A
              footer that repeats the whole site is a sitemap, not a
              footer.

              It is one wrapping row now, and it carries the secondary
              pages too. The home page used to link About, FAQ and
              Sustainability from full sections; those sections are gone,
              so without this row those three pages would be reachable
              from nowhere at all. */}
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-end">
            {[...nav, ...secondary].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[0.95rem] t-muted hover:text-[color:var(--accent-text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {locations.length > 0 && (
          <div className="mt-14 border-t hair pt-8">
            <p className="text-[0.95rem] font-semibold">Our yards</p>
            <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
              {locations.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/locations#${l.id}`}
                    className="text-[0.9rem] t-muted hover:"
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
              <Link href={l.href} className="text-[0.86rem] t-muted hover:">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { company, locations, nav } from "@/lib/site";
import { Logo } from "@/components/ui";

const secondary = [
  { label: "How it works", href: "/locations#how-it-works" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const legal = [
  { label: "Privacy", href: "/legal#privacy" },
  { label: "Terms", href: "/legal#terms" },
  { label: "Accessibility", href: "/legal#accessibility" },
];

export default function Footer() {
  return (
    <footer className="on-dark bg-graphite">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 border-b hair pb-12 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-[0.95rem] t-muted">
              Straightforward scrap metal recycling across greater Brisbane.
            </p>
          </div>

          <div className="lg:text-right">
            <p className="t-eyebrow t-accent">Talk to the trade desk</p>
            {company.phone && (
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="mt-2 block text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.055em] hover:text-[color:var(--accent-text)]"
              >
                {company.phoneLabel ?? company.phone}
              </a>
            )}
            {company.email && (
              <a href={`mailto:${company.email}`} className="mt-3 inline-block t-muted hover:text-white">
                {company.email}
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3 py-9">
          {[...nav, ...secondary].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[0.8rem] font-bold uppercase tracking-[0.07em] t-muted hover:text-[color:var(--accent-text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {locations.length > 0 && (
          <ul className="flex flex-wrap gap-x-7 gap-y-2 border-t hair py-7">
            {locations.map((location) => (
              <li key={location.id}>
                <Link href={`/locations#${location.id}`} className="text-sm t-muted hover:text-white">
                  {location.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="grid gap-5 border-t hair pt-8 text-[0.8rem] leading-relaxed t-muted lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p>
              © {new Date().getFullYear()} {company.legal}
              {company.abn ? ` · ABN ${company.abn}` : null}
            </p>
            {company.licence && (
              <p className="mt-1">Queensland second-hand dealer licence {company.licence}</p>
            )}
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p>
            MetalBase acknowledges the Turrbal and Jagera peoples, the
            Traditional Custodians of the land on which we operate, and pays
            respect to Elders past and present.
          </p>
        </div>
      </div>
    </footer>
  );
}

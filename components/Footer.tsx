import Link from "next/link";
import { regions } from "@/lib/regions";
import { company } from "@/lib/site";
import { Logo } from "@/components/ui";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "What we buy", href: "/what-we-buy" },
      { label: "How pricing works", href: "/prices" },
      { label: "Area & drop-off guide", href: "/locations" },
      { label: "Scrap glossary", href: "/glossary" },
    ],
  },
  {
    title: "For business",
    links: [
      { label: "Commercial services", href: "/services" },
      { label: "Collection & bins", href: "/services/collection-and-bins" },
      { label: "Industrial scrap", href: "/services/industrial" },
      { label: "Demolition steel", href: "/services/demolition" },
    ],
  },
  {
    title: "Areas",
    links: regions.map((region) => ({
      label: region.name,
      href: `/locations/${region.slug}`,
    })),
  },
  {
    title: "MetalBase",
    links: [
      { label: "About", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "FAQs", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const legal = [
  { label: "Privacy", href: "/legal#privacy" },
  { label: "Terms of trade", href: "/legal#terms" },
  { label: "Accessibility", href: "/legal#accessibility" },
];

export default function Footer() {
  const tel = company.phone?.replace(/\s/g, "");

  return (
    <footer className="on-dark border-t hair bg-furnace">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.75fr_0.9fr_0.65fr_0.7fr] lg:gap-10">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-7 text-base leading-relaxed t-muted">
              Clearer scrap metal quote requests across South East
              Queensland.
            </p>
            {tel && (
              <a
                href={`tel:${tel}`}
                className="mt-6 flex min-h-11 w-fit items-center text-xl font-semibold underline decoration-1 underline-offset-4 transition-colors duration-[160ms] ease-out hover:text-white"
              >
                {company.phoneLabel ?? company.phone}
              </a>
            )}
            {company.hours && (
              <p className="mt-3 text-sm t-muted">
                Contact hours: {company.hours}
              </p>
            )}
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={`${column.title}, footer`}>
              <p className="border-b hair pb-3 font-display text-xl font-semibold">
                {column.title}
              </p>
              <ul className="mt-4">
                {column.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-sm transition-colors duration-[160ms] ease-out t-muted hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t hair pt-7 text-sm t-muted sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p>
              © {new Date().getFullYear()} {company.name}
              {company.legal ? ` · Operated by ${company.legal}` : null}
              {company.abn ? ` · ABN ${company.abn}` : null}
            </p>
            <p className="mt-3 max-w-[58ch] leading-relaxed">
              MetalBase acknowledges the Traditional Custodians of Country and
              pays respect to Elders past and present.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 transition-colors duration-[160ms] ease-out hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowRight, Button } from "@/components/ui";

const links = [
  { label: "What we buy", href: "/what-we-buy" },
  { label: "Rate board", href: "/prices" },
  { label: "For business", href: "/services" },
  { label: "Sell your scrap", href: "/locations" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="on-ink bg-ink py-24 text-paper lg:py-32">
      <div className="shell">
        <p className="t-eyebrow text-copper">Error 404</p>
        <h1 className="mt-3 max-w-2xl">That page has already been recycled</h1>
        <p className="t-lead mt-5 max-w-xl text-paper/70">
          The link is broken or the page has moved. Here&rsquo;s where most people
          were heading.
        </p>
        <ul className="mt-10 grid max-w-2xl gap-x-10 gap-y-4 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href} className="border-t border-line-ink pt-3">
              <Link
                href={l.href}
                className="group inline-flex items-center gap-2 font-semibold"
              >
                {l.label}
                <ArrowRight className="h-4 w-4 text-copper transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Button href="/">Back to the homepage</Button>
        </div>
      </div>
    </section>
  );
}

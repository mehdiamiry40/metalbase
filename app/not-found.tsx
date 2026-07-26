import { Button, Chevron } from "@/components/ui";
import Link from "next/link";

const links = [
  { label: "today's prices", href: "/prices" },
  { label: "what we buy", href: "/what-we-buy" },
  { label: "for business", href: "/services" },
  { label: "yard locations", href: "/locations" },
  { label: "sustainability", href: "/sustainability" },
  { label: "contact us", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="bg-sky">
      <div className="shell py-20 lg:py-32">
        <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-blue">
          error 404
        </p>
        <h1 className="mt-3 max-w-2xl text-[2.4rem] leading-[1.05] lg:text-[3.6rem]">
          that page has already been recycled
        </h1>
        <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-muted">
          the link is broken or the page has moved. here&apos;s where most
          people were heading.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[0.9rem] font-semibold lowercase text-navy transition hover:text-blue"
            >
              {l.label}
              <Chevron className="h-3 w-3 text-blue" />
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/">back to the homepage</Button>
        </div>
      </div>
    </section>
  );
}

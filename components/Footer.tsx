import Link from "next/link";
import { company, locations, nav } from "@/lib/site";
import { Logo } from "@/components/ui";

const social = ["linkedin", "facebook", "youtube", "instagram"];

const legal = [
  "accessibility",
  "contact us",
  "cookies",
  "privacy statement",
  "sitemap",
  "terms & conditions",
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="shell py-20">
        {/* link columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {nav.map((item) => (
            <div key={item.label}>
              <p className="text-[1.0625rem] text-white">{item.label}</p>
              <ul className="mt-5 space-y-3">
                {item.columns.map((col) => (
                  <li key={col.label}>
                    <Link
                      href={col.href}
                      className="text-[0.9375rem] text-white/55 hover:text-white"
                    >
                      {col.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* yards + contact */}
        <div className="mt-16 grid gap-10 border-t border-line-navy pt-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[1.0625rem] text-white">our yards</p>
            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
              {locations.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/locations#${l.id}`}
                    className="text-[0.9375rem] text-white/55 hover:text-white"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:text-right">
            <a
              href={company.phoneHref}
              className="text-[1.75rem] leading-none tracking-[-0.05em] text-white hover:text-blue"
            >
              {company.phoneLabel}
            </a>
            <p className="mt-3">
              <a
                href={`mailto:${company.email}`}
                className="text-[0.9375rem] text-white/55 hover:text-white"
              >
                {company.email}
              </a>
            </p>
          </div>
        </div>

        {/* social */}
        <div className="mt-12 border-t border-line-navy pt-10">
          <div className="flex flex-wrap items-center gap-5">
            <Logo variant="white" />
            <div className="ml-auto flex gap-4">
              {social.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-[0.7rem] uppercase text-white/80 transition hover:bg-white hover:text-navy"
                >
                  {s.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-9 space-y-1 text-[0.8125rem] leading-relaxed text-white/45">
            <p>
              Registered office: {company.legal}, {company.head}. ABN{" "}
              {company.abn}.
            </p>
            <p>
              {company.licence} · Scrap Metal Recycling | Bin Hire | Demolition
              Buy-back | Secure Destruction
            </p>
          </div>

          <p className="mt-6 max-w-4xl text-[0.8125rem] leading-relaxed text-white/45">
            MetalBase acknowledges the Turrbal and Jagera peoples, the
            Traditional Custodians of the land on which our yards operate, and
            pays respect to Elders past and present.
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
            {legal.map((l) => (
              <li key={l}>
                <Link
                  href={l === "contact us" ? "/contact" : "/legal"}
                  className="text-[0.875rem] text-white/45 hover:text-white"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

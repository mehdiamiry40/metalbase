import Link from "next/link";
import { company, locations, nav } from "@/lib/site";
import { Logo, Pending } from "@/components/ui";

const legal = [
  { label: "Privacy", href: "/legal#privacy" },
  { label: "Terms of trade", href: "/legal#terms" },
  { label: "Accessibility", href: "/legal#accessibility" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-cloud">
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-mist">
              {company.legal} — buying, processing and remarketing scrap metal
              across greater Brisbane.
            </p>

            <dl className="mt-8 space-y-4 text-[0.94rem]">
              <div>
                <dt className="text-mist">Trade desk</dt>
                <dd className="mt-0.5">
                  {company.phone ? (
                    <a
                      href={`tel:${company.phone.replace(/\s/g, "")}`}
                      className="text-[1.3rem] font-medium text-orange hover:underline"
                    >
                      {company.phoneLabel ?? company.phone}
                    </a>
                  ) : (
                    <Pending>Phone number to be confirmed</Pending>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-mist">Email</dt>
                <dd className="mt-0.5">
                  {company.email ? (
                    <a href={`mailto:${company.email}`} className="hover:text-orange">
                      {company.email}
                    </a>
                  ) : (
                    <Pending>Email to be confirmed</Pending>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-mist">Head office</dt>
                <dd className="mt-0.5 text-cloud">
                  {company.head ?? <Pending>Address to be confirmed</Pending>}
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {nav.map((item) => (
              <div key={item.label}>
                <p className="text-[0.95rem] font-semibold text-cloud">{item.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {item.columns.map((col) => (
                    <li key={col.label}>
                      <Link
                        href={col.href}
                        className="text-[0.9rem] text-mist hover:text-cloud"
                      >
                        {col.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {locations.length > 0 && (
          <div className="mt-14 border-t border-line pt-8">
            <p className="text-[0.95rem] font-semibold">Our yards</p>
            <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
              {locations.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/locations#${l.id}`}
                    className="text-[0.9rem] text-mist hover:text-cloud"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 space-y-2 border-t border-line pt-8 text-[0.82rem] leading-relaxed text-mist">
          <p>
            © {new Date().getFullYear()} {company.legal}
            {company.abn ? ` · ABN ${company.abn}` : null}
          </p>
          {!company.abn && (
            <p>
              <Pending>ABN to be confirmed before launch</Pending>
            </p>
          )}
          {company.licence ? (
            <p>Queensland second-hand dealer licence {company.licence}</p>
          ) : (
            <p>
              <Pending>
                Second-hand dealer licence pending — required before trading
              </Pending>
            </p>
          )}
        </div>

        <p className="mt-7 max-w-4xl text-[0.82rem] leading-relaxed text-mist">
          MetalBase acknowledges the Turrbal and Jagera peoples, the Traditional
          Custodians of the land on which we operate, and pays respect to Elders
          past and present.
        </p>

        <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
          {legal.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="text-[0.86rem] text-mist hover:text-cloud">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

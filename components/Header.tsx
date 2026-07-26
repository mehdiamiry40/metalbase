"use client";

import Link from "next/link";
import { useState } from "react";
import { company, nav } from "@/lib/site";
import { ArrowLink, Chevron, Logo } from "@/components/ui";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* utility strip — small, grey, right aligned */}
      <div className="hidden bg-white pt-3 lg:block">
        <div className="shell flex justify-end gap-7 text-[0.75rem] text-muted">
          <Link href="/prices" className="u-link hover:text-navy">
            price board · {company.priceDate}
          </Link>
          <Link href="/legal" className="u-link hover:text-navy">
            terms of trade
          </Link>
          <Link href="/contact" className="u-link hover:text-navy">
            contact us
          </Link>
        </div>
      </div>

      {/* main bar */}
      <div className="bg-white">
        <div className="shell flex h-[68px] items-center justify-between gap-8">
          <Link href="/" aria-label="MetalBase home">
            <Logo />
          </Link>

          <nav className="hidden h-full items-stretch xl:flex">
            {nav.map((item) => (
              <div key={item.label} className="mega static flex items-stretch">
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 whitespace-nowrap px-3 text-[1rem] text-navy hover:text-blue"
                >
                  {item.label}
                  <Chevron className="h-3 w-3 rotate-90 text-navy/60" />
                </Link>

                <div className="mega-panel absolute left-0 right-0 top-full border-t border-line bg-white">
                  <div className="shell grid gap-12 py-12 lg:grid-cols-[240px_1fr]">
                    <div>
                      <p className="t-h3 text-navy">{item.label}</p>
                      <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
                        {blurbFor(item.label)}
                      </p>
                      <div className="mt-6">
                        <ArrowLink href={item.href}>all {item.label}</ArrowLink>
                      </div>
                    </div>
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                      {item.columns.map((col) => (
                        <div key={col.label}>
                          <Link
                            href={col.href}
                            className="u-link text-[1.0625rem] text-navy hover:text-blue"
                          >
                            {col.label}
                          </Link>
                          <ul className="mt-4 space-y-2.5">
                            {col.children.map((c) => (
                              <li key={c.label}>
                                <Link
                                  href={c.href}
                                  className="u-link text-[0.9375rem] text-muted hover:text-blue"
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={company.phoneHref}
              className="hidden whitespace-nowrap text-[1rem] text-navy hover:text-blue sm:inline"
            >
              {company.phoneLabel}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="toggle navigation"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] xl:hidden"
            >
              <span
                className={`block h-[1.5px] w-6 bg-navy transition ${open ? "translate-y-[7.5px] rotate-45" : ""}`}
              />
              <span className={`block h-[1.5px] w-6 bg-navy transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-[1.5px] w-6 bg-navy transition ${open ? "-translate-y-[7.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-line" />

      {/* mobile drawer */}
      {open && (
        <div className="max-h-[calc(100vh-69px)] overflow-y-auto bg-white xl:hidden">
          <div className="shell py-2">
            {nav.map((item) => {
              const isOpen = section === item.label;
              return (
                <div key={item.label} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setSection(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-4 text-left text-[1.125rem] text-navy"
                  >
                    {item.label}
                    <Chevron
                      className={`h-4 w-4 text-navy/60 transition ${isOpen ? "-rotate-90" : "rotate-90"}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-6">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="mb-5 inline-block text-[0.95rem] text-blue"
                      >
                        all {item.label}
                      </Link>
                      <div className="grid gap-6 sm:grid-cols-2">
                        {item.columns.map((col) => (
                          <div key={col.label}>
                            <p className="text-[1rem] text-navy">{col.label}</p>
                            <ul className="mt-2 space-y-2">
                              {col.children.map((c) => (
                                <li key={c.label}>
                                  <Link
                                    href={c.href}
                                    onClick={() => setOpen(false)}
                                    className="text-[0.9rem] text-muted"
                                  >
                                    {c.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex flex-wrap gap-4 py-7">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-[4px] bg-blue px-[30px] py-3 text-[1.125rem] text-white"
              >
                get a quote
              </Link>
              <Link
                href="/prices"
                onClick={() => setOpen(false)}
                className="rounded-[4px] border-2 border-navy px-[30px] py-3 text-[1.125rem] text-navy"
              >
                price board
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function blurbFor(label: string) {
  switch (label) {
    case "what we buy":
      return "ferrous, non-ferrous and specialty streams, graded on arrival and priced against the index.";
    case "for business":
      return "bins, collections and buy-back for sites that generate metal on a schedule.";
    case "sell your scrap":
      return "four brisbane yards, no minimum load, paid by eft within one business day.";
    case "sustainability":
      return "the reporting, certificates and audit evidence procurement teams ask for.";
    default:
      return "a queensland family business processing metal since 1995.";
  }
}

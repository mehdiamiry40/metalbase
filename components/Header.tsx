"use client";

import Link from "next/link";
import { useState } from "react";
import { company, nav } from "@/lib/site";
import { ArrowLink, Chevron, Logo } from "@/components/ui";

const blurbs: Record<string, string> = {
  "What we buy":
    "Ferrous, non-ferrous and specialty streams, graded on arrival and priced against the index.",
  "For business":
    "Bins, collections and buy-back for sites that generate metal on a schedule.",
  "Sell your scrap":
    "No minimum load, graded in front of you, paid by EFT.",
  Sustainability:
    "The reporting, certificates and audit evidence procurement teams ask for.",
  About: "Who we are and how the yards run.",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-paper">
      <div className="border-b border-line bg-paper">
        <div className="shell flex h-[70px] items-center justify-between gap-8">
          <Link href="/" aria-label="MetalBase home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden h-full items-stretch xl:flex">
            {nav.map((item) => (
              <div key={item.label} className="mega static flex items-stretch">
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 whitespace-nowrap px-3.5 text-[0.95rem] font-medium text-ink hover:text-copper"
                >
                  {item.label}
                  <Chevron className="h-[11px] w-[11px] rotate-90 text-slate" />
                </Link>

                <div className="mega-panel absolute left-0 right-0 top-full border-b border-line bg-paper">
                  <div className="shell grid gap-12 py-11 lg:grid-cols-[250px_1fr]">
                    <div>
                      <p className="t-h3">{item.label}</p>
                      <p className="mt-3 text-[0.94rem] leading-relaxed text-slate">
                        {blurbs[item.label]}
                      </p>
                      <div className="mt-6">
                        <ArrowLink href={item.href}>All {item.label.toLowerCase()}</ArrowLink>
                      </div>
                    </div>
                    <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
                      {item.columns.map((col) => (
                        <div key={col.label}>
                          <Link
                            href={col.href}
                            className="u-link text-[0.95rem] font-semibold text-ink hover:text-copper"
                          >
                            {col.label}
                          </Link>
                          <ul className="mt-3.5 space-y-2.5">
                            {col.children.map((c) => (
                              <li key={c.label}>
                                <Link
                                  href={c.href}
                                  className="u-link text-[0.9rem] text-slate hover:text-copper"
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
            {company.phone && (
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="hidden whitespace-nowrap text-[0.95rem] font-medium text-ink hover:text-copper sm:inline"
              >
                {company.phoneLabel ?? company.phone}
              </a>
            )}
            <Link
              href="/contact"
              className="hidden rounded-[2px] bg-copper px-5 py-2.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-copper-bright sm:inline-block"
            >
              Get a quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] xl:hidden"
            >
              <span className={`block h-[2px] w-6 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-[2px] w-6 bg-ink transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-6 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-70px)] overflow-y-auto border-b border-line bg-paper xl:hidden">
          <div className="shell py-2">
            {nav.map((item) => {
              const isOpen = section === item.label;
              return (
                <div key={item.label} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setSection(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-4 text-left text-[1.05rem] font-medium text-ink"
                  >
                    {item.label}
                    <Chevron className={`h-4 w-4 text-slate transition ${isOpen ? "-rotate-90" : "rotate-90"}`} />
                  </button>
                  {isOpen && (
                    <div className="grid gap-6 pb-6 sm:grid-cols-2">
                      {item.columns.map((col) => (
                        <div key={col.label}>
                          <p className="text-[0.95rem] font-semibold text-ink">{col.label}</p>
                          <ul className="mt-2 space-y-2">
                            {col.children.map((c) => (
                              <li key={c.label}>
                                <Link
                                  href={c.href}
                                  onClick={() => setOpen(false)}
                                  className="text-[0.9rem] text-slate"
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="py-6">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-block rounded-[2px] bg-copper px-7 py-3.5 font-semibold text-white"
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

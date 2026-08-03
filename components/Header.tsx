"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { company, nav } from "@/lib/site";
import { Logo } from "@/components/ui";

/* ------------------------------------------------------------------
   This was a mega-menu: five disclosure panels holding 74 links, with
   aria-expanded/aria-controls wiring, Escape handling, click-outside
   and focus-out listeners, plus a parallel mobile accordion with its
   own id scheme.

   All of that machinery existed to manage a problem the site did not
   need to have. Four plain links need no disclosure state, so the
   state, the three document-level listeners and both id schemes are
   gone with it. The mobile menu is now a list, not an accordion.

   The one behaviour worth keeping: the header sits flush at rest and
   only separates itself from the page once you have scrolled.
   ------------------------------------------------------------------ */

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const uid = useId();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu. Nothing else opens any more.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="on-light sticky top-0 z-50 bg-paper">
      <div
        className={`bg-paper transition-shadow duration-200 ${
          scrolled
            ? "border-b hair"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-[70px] items-center justify-between gap-8">
          <Link
            href="/"
            aria-label="MetalBase home"
            className="-ml-1 flex h-11 items-center px-1"
          >
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap text-[0.95rem] hover:text-[color:var(--accent-text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {company.phone && (
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="hidden whitespace-nowrap text-[0.95rem] font-medium hover:text-[color:var(--accent-text)] sm:inline"
              >
                {company.phoneLabel ?? company.phone}
              </a>
            )}
            <Link
              href="/contact"
              className="hidden min-h-11 items-center rounded-[4px] bg-orange px-5 py-2.5 text-[0.9rem] font-semibold text-graphite transition-colors hover:bg-orange-deep sm:inline-flex"
            >
              Get a quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls={`${uid}-mobile`}
              aria-label="Toggle navigation"
              className="-mr-1 flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span
                className={`block h-[2px] w-6 bg-graphite transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-[2px] w-6 bg-graphite transition ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-[2px] w-6 bg-graphite transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        id={`${uid}-mobile`}
        hidden={!mobileOpen}
        className="border-b hair bg-paper lg:hidden"
      >
        <nav aria-label="Main, mobile" className="shell py-2">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block border-b hair py-4 text-[1.05rem]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="my-6 inline-block rounded-[4px] bg-orange px-7 py-3.5 font-semibold text-graphite"
          >
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}

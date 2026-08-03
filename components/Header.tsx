"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { company, nav } from "@/lib/site";
import { ArrowRight, CloseIcon, Logo, MenuIcon } from "@/components/ui";

/* ------------------------------------------------------------------
   Four plain links, so there is no disclosure state to manage — no
   aria-expanded wiring, no click-outside listener, no parallel mobile
   accordion. The mobile menu is a list.

   Two behaviours are worth the client component:

   1. The header sits flush at rest and only draws its hairline once
      you have scrolled, so the page opens without a line across it.
   2. The phone number is the primary action on a trade site and sits
      in the bar at every width above 380px. Someone standing next to
      a pile of copper wants to call, not to browse.
   ------------------------------------------------------------------ */

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
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
      if (e.key === "Escape" && mobileOpen) {
        e.preventDefault();
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const tel = company.phone?.replace(/\s/g, "");
  const isSectionActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="on-light sticky top-0 z-50 bg-white">
      <div
        className={scrolled ? "border-b hair" : "border-b border-transparent"}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-4 lg:h-24 lg:gap-8">
          <Link
            href="/"
            aria-label="MetalBase home"
            className="-ml-1 flex h-12 items-center px-1"
          >
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`inline-flex min-h-12 items-center whitespace-nowrap border-b text-sm transition-colors duration-[160ms] ease-out hover:border-signal hover:text-signal ${
                  isSectionActive(item.href)
                    ? "border-signal font-semibold text-signal"
                    : "border-transparent font-medium"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 lg:gap-3">
            {tel && (
              <a
                href={`tel:${tel}`}
                className="hidden min-h-11 items-center whitespace-nowrap px-1 text-sm font-semibold underline decoration-1 underline-offset-4 transition-colors duration-[160ms] ease-out hover:text-signal min-[480px]:inline-flex"
              >
                {company.phoneLabel ?? company.phone}
              </a>
            )}
            {/* The `!` prefixes these three utilities used to carry were
                a symptom, not a fix: .btn was unlayered and beating
                every utility on the element, `hidden` included, so the
                button rendered at 390px and shoved the phone number off
                the screen. .btn sits in @layer components now, so plain
                utilities win and `hidden` does what it says. */}
            <Link
              href="/contact"
              className="btn btn-solid hidden min-h-[3rem] px-6 py-2 text-sm sm:inline-flex"
            >
              Get a quote
            </Link>
            <button
              ref={mobileToggleRef}
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls={`${uid}-mobile`}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              className="-mr-1 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              {mobileOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        id={`${uid}-mobile`}
        hidden={!mobileOpen}
        className="border-b hair bg-white lg:hidden"
      >
        <nav aria-label="Main, mobile" className="shell py-2">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`flex items-center justify-between border-b hair py-4 text-base transition-colors duration-[160ms] ease-out hover:text-furnace ${
                isSectionActive(item.href)
                  ? "font-semibold text-furnace"
                  : "font-medium t-muted"
              }`}
            >
              {item.label}
              <ArrowRight className="h-6 w-6" />
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn btn-solid my-6 w-full"
          >
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}

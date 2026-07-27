"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { company, nav } from "@/lib/site";
import { ArrowLink, Chevron, Logo } from "@/components/ui";

const blurbs: Record<string, string> = {
  "What we buy":
    "Ferrous, non-ferrous and specialty streams, graded on arrival and priced against the index.",
  "For business":
    "Bins, collections and buy-back for sites that generate metal on a schedule.",
  "Sell your scrap": "No minimum load, graded in front of you, paid by EFT.",
  Sustainability:
    "The reporting, certificates and audit evidence procurement teams ask for.",
  About: "Who we are and how the yards run.",
};

/* ------------------------------------------------------------------
   The first version of this menu opened on :hover / :focus-within only.
   That is a genuine accessibility failure: no aria-expanded, no way to
   dismiss with a keyboard, and screen readers got no notice that a
   submenu existed. It is now a real disclosure — button + aria-expanded
   + aria-controls, Escape to close, click-outside to close — with hover
   kept as a pointer-only convenience on top.
   ------------------------------------------------------------------ */

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const uid = useId();

  const close = useCallback(() => setOpenMenu(null), []);

  // The header only separates itself from the page once you have moved.
  // At rest it sits flush, which reads calmer.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes whichever layer is open, and returns focus sensibly.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (openMenu) {
        const trigger = document.getElementById(`${uid}-trigger-${openMenu}`);
        close();
        trigger?.focus();
      } else if (mobileOpen) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu, mobileOpen, close, uid]);

  // Clicking or tabbing away closes the panel.
  useEffect(() => {
    if (!openMenu) return;
    function onPointerDown(e: PointerEvent) {
      if (!navRef.current?.contains(e.target as Node)) close();
    }
    function onFocusIn(e: FocusEvent) {
      if (!navRef.current?.contains(e.target as Node)) close();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [openMenu, close]);

  return (
    <header className="sticky top-0 z-50 bg-paper">
      <div
        className={`bg-paper transition-shadow duration-200 ${
          scrolled || openMenu
            ? "border-b border-line shadow-[0_1px_16px_-8px_rgba(15,25,65,0.35)]"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-[70px] items-center justify-between gap-8">
          <Link href="/" aria-label="MetalBase home">
            <Logo />
          </Link>

          <nav
            ref={navRef}
            aria-label="Main"
            className="hidden h-full items-stretch xl:flex"
            onPointerLeave={close}
          >
            {nav.map((item) => {
              const isOpen = openMenu === item.label;
              const panelId = `${uid}-panel-${item.label}`;
              return (
                <div
                  key={item.label}
                  className="static flex items-stretch"
                  onPointerEnter={() => setOpenMenu(item.label)}
                >
                  <button
                    type="button"
                    id={`${uid}-trigger-${item.label}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className="flex items-center gap-1.5 whitespace-nowrap px-3.5 text-[0.95rem] font-medium text-ink hover:text-brand-text"
                  >
                    {item.label}
                    <Chevron
                      className={`h-[11px] w-[11px] text-slate transition-transform ${
                        isOpen ? "-rotate-90" : "rotate-90"
                      }`}
                    />
                  </button>

                  <div
                    id={panelId}
                    hidden={!isOpen}
                    className="absolute left-0 right-0 top-full border-b border-line bg-paper"
                  >
                    <div className="shell grid gap-12 py-11 lg:grid-cols-[250px_1fr]">
                      <div>
                        <p className="t-h3">{item.label}</p>
                        <p className="mt-3 text-[0.94rem] leading-relaxed text-slate">
                          {blurbs[item.label]}
                        </p>
                        <div className="mt-6">
                          <ArrowLink href={item.href}>
                            All {item.label.toLowerCase()}
                          </ArrowLink>
                        </div>
                      </div>
                      <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
                        {item.columns.map((col) => (
                          <div key={col.label}>
                            <Link
                              href={col.href}
                              onClick={close}
                              className="u-link text-[0.95rem] font-semibold text-ink hover:text-brand-text"
                            >
                              {col.label}
                            </Link>
                            <ul className="mt-3.5 space-y-2.5">
                              {col.children.map((c) => (
                                <li key={c.label}>
                                  <Link
                                    href={c.href}
                                    onClick={close}
                                    className="u-link text-[0.9rem] text-slate hover:text-brand-text"
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
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            {company.phone && (
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="hidden whitespace-nowrap text-[0.95rem] font-medium text-ink hover:text-brand-text sm:inline"
              >
                {company.phoneLabel ?? company.phone}
              </a>
            )}
            <Link
              href="/contact"
              className="hidden rounded-[2px] bg-accent-fill px-5 py-2.5 text-[0.9rem] font-semibold text-ink transition-colors hover:bg-accent-fill-hover sm:inline-block"
            >
              Get a quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls={`${uid}-mobile`}
              aria-label="Toggle navigation"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] xl:hidden"
            >
              <span className={`block h-[2px] w-6 bg-ink transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-[2px] w-6 bg-ink transition ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-6 bg-ink transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      <div
        id={`${uid}-mobile`}
        hidden={!mobileOpen}
        className="max-h-[calc(100vh-70px)] overflow-y-auto border-b border-line bg-paper xl:hidden"
      >
        <div className="shell py-2">
          {nav.map((item) => {
            const isOpen = mobileSection === item.label;
            const secId = `${uid}-m-${item.label}`;
            return (
              <div key={item.label} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setMobileSection(isOpen ? null : item.label)}
                  aria-expanded={isOpen}
                  aria-controls={secId}
                  className="flex w-full items-center justify-between py-4 text-left text-[1.05rem] font-medium text-ink"
                >
                  {item.label}
                  <Chevron
                    className={`h-4 w-4 text-slate transition ${isOpen ? "-rotate-90" : "rotate-90"}`}
                  />
                </button>
                <div id={secId} hidden={!isOpen} className="grid gap-6 pb-6 sm:grid-cols-2">
                  {item.columns.map((col) => (
                    <div key={col.label}>
                      <p className="text-[0.95rem] font-semibold text-ink">{col.label}</p>
                      <ul className="mt-2 space-y-2">
                        {col.children.map((c) => (
                          <li key={c.label}>
                            <Link
                              href={c.href}
                              onClick={() => setMobileOpen(false)}
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
              </div>
            );
          })}
          <div className="py-6">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="inline-block rounded-[2px] bg-accent-fill px-7 py-3.5 font-semibold text-ink"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

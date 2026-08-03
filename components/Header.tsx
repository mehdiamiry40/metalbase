"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "@/components/ui";

/* Four direct destinations and one action. The mobile version is the
   same short list, with no nested menu or parallel information model. */

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const uid = useId();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="on-light sticky top-0 z-50 border-b-2 border-graphite bg-paper">
      <div>
        <div className="shell flex h-[72px] items-center justify-between gap-8">
          <Link
            href="/"
            aria-label="MetalBase home"
            className="-ml-1 flex h-11 items-center px-1"
          >
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap text-[0.78rem] font-bold uppercase tracking-[0.08em] hover:text-[color:var(--accent-text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden min-h-11 items-center border-2 border-graphite bg-graphite px-5 py-2.5 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:border-orange hover:bg-rust sm:inline-flex"
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
        className="border-t-2 border-graphite bg-paper lg:hidden"
      >
        <nav aria-label="Main, mobile" className="shell py-2">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
            className="block border-b hair py-4 text-[1rem] font-bold uppercase tracking-[0.05em]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="my-6 inline-block border-2 border-orange bg-rust px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white"
          >
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}

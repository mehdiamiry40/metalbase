"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { company } from "@/lib/site";

/* ------------------------------------------------------------------
   Persistent action bar on small screens.

   Most visitors to a scrap yard site are on a phone, often standing
   next to the metal they want to sell. Making them scroll back to the
   header to act is the wrong shape. This keeps the two things they
   might do one thumb-reach away.

   It appears only after the hero has scrolled past, so it doesn't
   compete with the hero's own buttons.
   ------------------------------------------------------------------ */

export default function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 520);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tel = company.phone?.replace(/\s/g, "");

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      // Hidden from assistive tech when off-screen so it isn't a stray
      // tab stop. React 19 types `inert` as a boolean.
      aria-hidden={!show}
      inert={!show}
    >
      <div className="flex items-stretch gap-2 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link
          href="/contact"
          tabIndex={show ? undefined : -1}
          className="flex flex-1 items-center justify-center rounded-[2px] bg-accent-fill px-5 py-3.5 font-semibold text-ink"
        >
          Get a quote
        </Link>
        {tel ? (
          <a
            href={`tel:${tel}`}
            tabIndex={show ? undefined : -1}
            className="flex items-center justify-center rounded-[2px] border-2 border-ink px-5 py-3.5 font-semibold text-ink"
          >
            Call
          </a>
        ) : (
          <Link
            href="/what-we-buy"
            tabIndex={show ? undefined : -1}
            className="flex items-center justify-center rounded-[2px] border-2 border-ink px-5 py-3.5 font-semibold text-ink"
          >
            What we buy
          </Link>
        )}
      </div>
    </div>
  );
}

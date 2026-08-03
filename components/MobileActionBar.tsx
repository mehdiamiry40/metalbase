"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 520);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tel = company.phone?.replace(/\s/g, "");
  const visible = show && pathname !== "/contact";

  return (
    <div
      className={`on-light fixed inset-x-0 bottom-0 z-40 border-t hair bg-chalk lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      // Hidden from assistive tech when off-screen so it isn't a stray
      // tab stop. React 19 types `inert` as a boolean.
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex items-stretch gap-2 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link
          href="/contact"
          tabIndex={visible ? undefined : -1}
          className="btn btn-solid flex-1"
        >
          Request a quote
        </Link>
        {tel ? (
          <a
            href={`tel:${tel}`}
            tabIndex={visible ? undefined : -1}
            className="btn btn-ghost"
          >
            Call
          </a>
        ) : (
          <Link
            href="/what-we-buy"
            tabIndex={visible ? undefined : -1}
            className="btn btn-ghost"
          >
            What we buy
          </Link>
        )}
      </div>
    </div>
  );
}

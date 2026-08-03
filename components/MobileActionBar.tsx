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
  const [visibility, setVisibility] = useState({
    pathname: "",
    show: false,
  });
  const [focusWithin, setFocusWithin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const firstSection = document.querySelector("#main > section");
    if (!firstSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) =>
        setVisibility({ pathname, show: !entry.isIntersecting }),
      { rootMargin: "-72px 0px 0px" },
    );
    observer.observe(firstSection);
    return () => observer.disconnect();
  }, [pathname]);

  const tel = company.phone?.replace(/\s/g, "");
  const show = visibility.pathname === pathname && visibility.show;
  // Once a keyboard user enters the bar, keep it present until focus leaves.
  // A scroll back above the threshold must not make the focused link inert.
  const visible = (show || focusWithin) && pathname !== "/contact";

  return (
    <>
      <div
        aria-hidden="true"
        className={`h-[calc(76px+env(safe-area-inset-bottom))] lg:hidden ${
          pathname === "/contact" ? "hidden" : ""
        }`}
      />
      <div
        className={`on-light fixed inset-x-0 bottom-0 z-40 border-t hair bg-chalk lg:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        // Hidden from assistive tech when off-screen so it isn't a stray
        // tab stop. React 19 types `inert` as a boolean.
        aria-hidden={!visible}
        inert={!visible}
        onFocusCapture={() => setFocusWithin(true)}
        onBlurCapture={(event) => {
          const next = event.relatedTarget;
          if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
            setFocusWithin(false);
          }
        }}
      >
        <div className="flex items-stretch gap-2 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Link
            href="/contact"
            tabIndex={visible ? undefined : -1}
            className="btn btn-solid flex-1"
          >
            Get a quote
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
    </>
  );
}

"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/ui";

const enquiryTypes = [
  "commercial collection or bin hire",
  "demolition / structural steel buy-back",
  "industrial offcut & rebate program",
  "trade account (regular drop-off)",
  "one-off public drop-off",
  "sustainability reporting / esg data",
];

const materials = [
  "copper & cable",
  "aluminium",
  "brass & bronze",
  "stainless steel",
  "heavy melting steel",
  "light gauge / mixed steel",
  "cast iron",
  "batteries",
  "e-waste",
  "not sure yet",
];

const field =
  "w-full rounded-lg border-2 border-line bg-white px-4 py-3 text-[0.95rem] text-navy outline-none transition placeholder:text-muted/60 focus:border-blue";
const label =
  "mb-2 block text-[0.85rem] font-bold lowercase tracking-wide text-navy";

export default function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);

  function toggle(m: string) {
    setPicked((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));
  }

  if (sent) {
    return (
      <div className="rounded-2xl border-2 border-blue bg-sky p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-white">
            <path
              d="M4 12.5l5.5 5.5L20 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
            />
          </svg>
        </div>
        <h3 className="text-[1.6rem]">thanks — that&apos;s with the trade desk</h3>
        <p className="mx-auto mt-3 max-w-md text-[1rem] leading-relaxed text-muted">
          a grader will come back to you inside one business day with indicative
          rates. if it&apos;s urgent, ring 1300 metal b and ask for the desk.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setPicked([]);
          }}
          className="mt-6 text-[0.9rem] font-bold lowercase text-blue underline"
        >
          send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-2xl border border-line bg-white p-7 shadow-[0_20px_50px_-32px_rgba(15,25,65,0.5)] lg:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="type">
            what do you need?
          </label>
          <select id="type" name="type" required className={field} defaultValue="">
            <option value="" disabled>
              choose an enquiry type
            </option>
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="name">
            your name
          </label>
          <input id="name" name="name" required className={field} placeholder="jordan smith" />
        </div>

        <div>
          <label className={label} htmlFor="company">
            company <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="company" name="company" className={field} placeholder="smith fabrication" />
        </div>

        <div>
          <label className={label} htmlFor="email">
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={field}
            placeholder="jordan@company.com.au"
          />
        </div>

        <div>
          <label className={label} htmlFor="phone">
            phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={field}
            placeholder="0400 000 000"
          />
        </div>

        <div>
          <label className={label} htmlFor="suburb">
            suburb or postcode
          </label>
          <input id="suburb" name="suburb" required className={field} placeholder="rocklea 4106" />
        </div>

        <div>
          <label className={label} htmlFor="volume">
            estimated volume
          </label>
          <select id="volume" name="volume" className={field} defaultValue="">
            <option value="" disabled>
              choose a range
            </option>
            <option>under 200kg — ute or trailer load</option>
            <option>200kg – 1 tonne</option>
            <option>1 – 10 tonnes</option>
            <option>10 – 100 tonnes</option>
            <option>100+ tonnes / ongoing contract</option>
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={label}>what have you got?</legend>
          <div className="flex flex-wrap gap-2">
            {materials.map((m) => {
              const on = picked.includes(m);
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(m)}
                  className={`rounded-full border-2 px-4 py-2 text-[0.85rem] font-semibold lowercase transition ${
                    on
                      ? "border-blue bg-blue text-white"
                      : "border-line text-muted hover:border-blue hover:text-blue"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="detail">
            anything else we should know?
          </label>
          <textarea
            id="detail"
            name="detail"
            rows={4}
            className={field}
            placeholder="access restrictions, timing, whether you need a bin on site, drawings you can send through…"
          />
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-blue px-7 py-3.5 text-[0.95rem] font-bold lowercase text-white transition hover:bg-blue-dark"
        >
          send enquiry
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-[0.82rem] lowercase text-muted">
          answered inside one business day · no obligation
        </p>
      </div>

      <p className="mt-5 text-[0.78rem] leading-relaxed text-muted">
        this demo form stores nothing and sends nothing. wire the submit handler
        to your crm, an email service or a next.js route handler before going
        live.
      </p>
    </form>
  );
}

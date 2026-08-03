"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Tick } from "@/components/ui";
import { company } from "@/lib/site";

const enquiryTypes = [
  "Commercial collection or bin hire",
  "Demolition / structural steel buy-back",
  "Industrial offcut & rebate program",
  "Trade account (regular drop-off)",
  "One-off drop-off",
  "Sustainability reporting",
];

const materials = [
  "Copper & cable",
  "Aluminium",
  "Brass & bronze",
  "Stainless steel",
  "Heavy melting steel",
  "Light gauge / mixed steel",
  "Cast iron",
  "Batteries",
  "E-waste",
  "Not sure yet",
];

const volumes = [
  "Under 200kg — ute or trailer load",
  "200kg – 1 tonne",
  "1 – 10 tonnes",
  "10 – 100 tonnes",
  "100+ tonnes / ongoing contract",
];

/* The form is a document, so it sits on the light surface — and it says
   so itself rather than relying on the page to wrap it. It renders
   inside an ink section on /contact, and a form that inherits `on-dark`
   is white type in white inputs: legible nowhere, and invisible to
   every automated check because the colours are inherited rather than
   declared. */
const field =
  "w-full rounded-[2px] border hair bg-chalk px-4 py-3 text-[1rem] outline-none transition-colors placeholder:text-stone focus:border-ink";
const labelCls = "mb-2 block text-[0.9rem] font-semibold";
/* Errors are ink and bold, not the accent. t-accent resolves to the
   link colour on a light surface, so validation messages were rendering
   in exactly the colour the rest of the site uses for "this is a link" —
   legible, but saying the wrong thing. A single-hue palette has no red
   to reach for, so the weight and the copper keyline on the summary do
   the signalling and the text stays at 19:1. */
const errCls = "mt-1.5 text-[0.85rem] font-semibold text-ink";

type State = "idle" | "sending" | "sent" | "sent-undelivered" | "error";

export default function QuoteForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  function toggle(m: string) {
    setPicked((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrors({});
    setMessage("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      enquiryType: String(fd.get("enquiryType") ?? ""),
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      suburb: String(fd.get("suburb") ?? ""),
      volume: String(fd.get("volume") ?? ""),
      detail: String(fd.get("detail") ?? ""),
      website: String(fd.get("website") ?? ""),
      materials: picked,
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        if (json.errors) {
          setErrors(json.errors);
          setState("idle");
          // Move the user to the first problem rather than leaving them
          // to hunt for red text somewhere up the page.
          const first = Object.keys(json.errors)[0];
          const map: Record<string, string> = {
            enquiryType: "type",
            name: "name",
            email: "email",
            phone: "phone",
          };
          requestAnimationFrame(() => {
            const el = document.getElementById(`${uid}-${map[first] ?? first}`);
            el?.focus();
            el?.scrollIntoView({ block: "center", behavior: "smooth" });
          });
          return;
        }
        setMessage(json.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      setState(json.delivered === false ? "sent-undelivered" : "sent");
    } catch {
      setMessage("Couldn't reach the server. Check your connection, or call us.");
      setState("error");
    }
  }

  if (state === "sent" || state === "sent-undelivered") {
    return (
      <div className="on-light border-2 border-copper bg-white p-10" role="status">
        {/* Ink on copper, never white: white on this fill measures 2.91
            and can never pass. Same rule as the primary button. */}
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-copper">
          <Tick className="h-6 w-6 text-ink" />
        </span>
        <h3 className="mt-5 text-[1.5rem]">Thanks — that&rsquo;s with the trade desk</h3>
        <p className="mt-3 max-w-md leading-relaxed t-muted">
          A grader will come back to you inside one business day.
        </p>

        {state === "sent-undelivered" && (
          <div className="callout mt-6">
            <p className="text-[0.94rem] leading-relaxed">
              <strong className="font-semibold">Heads up:</strong> no email or
              webhook is configured on this deployment yet, so your enquiry was
              logged on the server rather than sent to anyone.
              {company.phone
                ? ` Please phone ${company.phoneLabel ?? company.phone} if it's urgent.`
                : " Please phone instead if it's urgent."}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setState("idle");
            setPicked([]);
          }}
          className="mt-6 font-semibold t-accent u-link"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const busy = state === "sending";
  const errorCount = Object.keys(errors).length;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="on-light border hair bg-white p-7 lg:p-9"
    >
      {/* Announced to screen readers without stealing focus. */}
      <p aria-live="polite" className="sr-only">
        {busy
          ? "Sending your enquiry"
          : errorCount > 0
            ? `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention`
            : ""}
      </p>

      {state === "error" && (
        <div role="alert" className="callout mb-6 text-[0.94rem]">
          {message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor={`${uid}-type`}>
            What do you need?
          </label>
          <select
            id={`${uid}-type`}
            name="enquiryType"
            defaultValue=""
            className={field}
            aria-invalid={!!errors.enquiryType}
            aria-describedby={errors.enquiryType ? `${uid}-type-err` : undefined}
          >
            <option value="">Choose an enquiry type</option>
            {enquiryTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {errors.enquiryType && (
            <p id={`${uid}-type-err`} className={errCls}>{errors.enquiryType}</p>
          )}
        </div>

        <div>
          <label className={labelCls} htmlFor={`${uid}-name`}>Your name</label>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            className={field}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
          />
          {errors.name && <p id={`${uid}-name-err`} className={errCls}>{errors.name}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor={`${uid}-company`}>
            Company <span className="font-normal t-muted">(optional)</span>
          </label>
          <input id={`${uid}-company`} name="company" autoComplete="organization" className={field} />
        </div>

        <div>
          <label className={labelCls} htmlFor={`${uid}-email`}>Email</label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={field}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
          />
          {errors.email && <p id={`${uid}-email-err`} className={errCls}>{errors.email}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor={`${uid}-phone`}>Phone</label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
          />
          {errors.phone && <p id={`${uid}-phone-err`} className={errCls}>{errors.phone}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor={`${uid}-suburb`}>Suburb or postcode</label>
          <input id={`${uid}-suburb`} name="suburb" autoComplete="postal-code" className={field} />
        </div>

        <div>
          <label className={labelCls} htmlFor={`${uid}-volume`}>Estimated volume</label>
          <select id={`${uid}-volume`} name="volume" defaultValue="" className={field}>
            <option value="">Choose a range</option>
            {volumes.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={labelCls}>What have you got?</legend>
          <div className="flex flex-wrap gap-2">
            {materials.map((m) => {
              const on = picked.includes(m);
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(m)}
                  className={`min-h-11 rounded-[2px] border px-3.5 py-2 text-[0.88rem] font-medium transition-colors ${
                    on
                      ? "border-copper bg-copper text-ink"
                      : "hair t-muted hover:border-copper hover:text-[color:var(--accent-text)]"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor={`${uid}-detail`}>
            Anything else we should know?
          </label>
          <textarea
            id={`${uid}-detail`}
            name="detail"
            rows={4}
            className={field}
            placeholder="Access restrictions, timing, whether you need a bin on site, drawings you can send through…"
          />
        </div>
      </div>

      {/* honeypot — hidden from people, catnip for bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        {/* The shared .btn rather than a bespoke fill: btn-solid derives
            its colours from the surface, so the submit button cannot
            lose contrast with the sheet it sits on. */}
        <button
          type="submit"
          disabled={busy}
          className="btn btn-solid disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Sending…" : "Send enquiry"}
          {!busy && <ArrowRight className="h-4 w-4" />}
        </button>
        <p className="text-[0.88rem] t-muted">
          Answered inside one business day · No obligation
        </p>
      </div>
    </form>
  );
}

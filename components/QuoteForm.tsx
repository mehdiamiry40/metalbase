"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Tick } from "@/components/ui";
import { company } from "@/lib/site";

const enquiryTypes = [
  "Scrap metal quote",
  "Drop-off question",
  "Collection or container enquiry",
  "Commercial site enquiry",
  "Something else",
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
  "10+ tonnes",
  "Not sure yet",
];

/* The form is a document, so it sits on the light surface — and it says
   so itself rather than relying on the page to wrap it. It renders
   inside an ink section on /contact, and a form that inherits `on-dark`
   is white type in white inputs: legible nowhere, and invisible to
   every automated check because the colours are inherited rather than
   declared. */
const field =
  "min-h-12 w-full border border-steel bg-chalk px-4 py-3 text-base transition-colors duration-[160ms] ease-out placeholder:text-steel focus:border-signal aria-[invalid=true]:border-furnace";
const labelCls = "mb-2 block text-sm font-semibold";
/* Errors are ink and bold, not the accent. t-accent resolves to the
   link colour on a light surface, so validation messages were rendering
   in exactly the colour the rest of the site uses for "this is a link" —
   legible, but saying the wrong thing. A single-hue palette has no red
   to reach for, so the weight and the copper keyline on the summary do
   the signalling and the text stays at 19:1. */
const errCls = "mt-1.5 text-sm font-semibold text-ink";

type State = "idle" | "sending" | "sent" | "error";

export default function QuoteForm() {
  const uid = useId();
  const typeRef = useRef<HTMLSelectElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const tel = company.phone?.replace(/\s/g, "");

  useEffect(() => {
    if (state === "sent") successRef.current?.focus();
  }, [state]);

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
          const first = ["enquiryType", "name", "contact", "email"].find(
            (key) => json.errors[key],
          ) ?? Object.keys(json.errors)[0];
          const map: Record<string, string> = {
            enquiryType: "type",
            name: "name",
            contact: "email",
            email: "email",
          };
          requestAnimationFrame(() => {
            const el = document.getElementById(`${uid}-${map[first] ?? first}`);
            el?.focus();
            const reduceMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            el?.scrollIntoView({
              block: "center",
              behavior: reduceMotion ? "auto" : "smooth",
            });
          });
          return;
        }
        setMessage(json.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      if (json.delivered === true) {
        setState("sent");
        return;
      }

      setMessage(
        "We couldn't send that just now. Please call us instead.",
      );
      setState("error");
    } catch {
      setMessage("Couldn't reach the server. Check your connection, or call us.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div
        ref={successRef}
        className="on-light border border-steel bg-chalk p-8 sm:p-10"
        role="status"
        tabIndex={-1}
      >
        <span className="flex h-12 w-12 items-center justify-center bg-shaft">
          <Tick className="h-6 w-6 text-furnace" />
        </span>
        <h2 className="mt-5 text-2xl">Thanks — your enquiry has been sent</h2>
        <p className="mt-3 max-w-md leading-relaxed t-muted">
          We received your details.
          {tel ? (
            <>
              {" "}If it is urgent, call{" "}
              <a href={`tel:${tel}`} className="u-link font-semibold">
                {company.phoneLabel ?? company.phone}
              </a>
              .
            </>
          ) : null}
        </p>

        <button
          type="button"
          onClick={() => {
            setState("idle");
            setPicked([]);
            requestAnimationFrame(() => typeRef.current?.focus());
          }}
          className="mt-6 font-semibold underline decoration-1 underline-offset-4 transition-colors duration-[160ms] ease-out hover:text-steel"
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
      onSubmit={onSubmit}
      noValidate
      className="on-light border border-steel bg-chalk p-6 sm:p-8 lg:p-9"
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
        <div role="alert" className="callout mb-6 text-base">
          <p>{message}</p>
          {tel ? (
            <a
              href={`tel:${tel}`}
              className="mt-3 inline-flex min-h-11 items-center font-semibold u-link"
            >
              Call {company.phoneLabel ?? company.phone}
            </a>
          ) : null}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor={`${uid}-type`}>
            What do you need?{" "}
            <span className="font-normal t-muted">(required)</span>
          </label>
          <select
            ref={typeRef}
            id={`${uid}-type`}
            name="enquiryType"
            defaultValue=""
            required
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
          <label className={labelCls} htmlFor={`${uid}-name`}>
            Your name <span className="font-normal t-muted">(required)</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            required
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

        <fieldset className="sm:col-span-2">
          <legend className="mb-3 text-sm font-semibold">
            How can we reply?{" "}
            <span className="font-normal t-muted">(choose at least one)</span>
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor={`${uid}-email`}>
                Email
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                className={field}
                aria-invalid={!!(errors.email || errors.contact)}
                aria-describedby={
                  errors.email
                    ? `${uid}-email-err`
                    : errors.contact
                      ? `${uid}-contact-err`
                      : undefined
                }
              />
              {errors.email && (
                <p id={`${uid}-email-err`} className={errCls}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className={labelCls} htmlFor={`${uid}-phone`}>
                Phone
              </label>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                className={field}
                aria-invalid={!!errors.contact}
                aria-describedby={
                  errors.contact ? `${uid}-contact-err` : undefined
                }
              />
            </div>
          </div>
          {errors.contact && (
            <p id={`${uid}-contact-err`} className={errCls}>
              {errors.contact}
            </p>
          )}
        </fieldset>

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
                  className={`min-h-11 border px-3.5 py-2 text-sm font-medium transition-colors duration-[160ms] ease-out ${
                    on
                      ? "border-furnace bg-furnace text-white"
                      : "border-steel t-muted hover:bg-shaft hover:text-furnace"
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
            placeholder="Access, timing, bin requirements or material details"
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
          {!busy && <ArrowRight className="h-6 w-6" />}
        </button>
        <p className="max-w-sm text-sm t-muted">
          No obligation. We use your details to respond to this enquiry. Read our{" "}
          <Link href="/legal#privacy" className="u-link font-medium text-furnace">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

"use client";

import { useId, useState } from "react";
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

const field =
  "w-full rounded-[2px] border border-line bg-white px-4 py-3 text-[1rem] text-ink outline-none transition-colors placeholder:text-slate focus:border-accent-fill";
const labelCls = "mb-2 block text-[0.9rem] font-semibold text-ink";
const errCls = "mt-1.5 text-[0.85rem] text-accent";

type State = "idle" | "sending" | "sent" | "sent-undelivered" | "error";

export default function QuoteForm() {
  const uid = useId();
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
      <div className="border-2 border-accent-fill bg-white p-10" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-fill">
          <Tick className="h-6 w-6 text-ink" />
        </span>
        <h3 className="mt-5 text-[1.5rem]">Thanks — that&rsquo;s with the trade desk</h3>
        <p className="mt-3 max-w-md leading-relaxed text-slate">
          A grader will come back to you inside one business day.
        </p>

        {state === "sent-undelivered" && (
          <div className="mt-6 border-l-4 border-accent-fill bg-paper-deep p-5">
            <p className="text-[0.94rem] leading-relaxed text-ink">
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
          className="mt-6 font-semibold text-brand-text u-link"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const busy = state === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line bg-white p-7 lg:p-9">
      {state === "error" && (
        <div role="alert" className="mb-6 border-l-4 border-accent-fill bg-paper-deep p-4 text-[0.94rem]">
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
            Company <span className="font-normal text-slate">(optional)</span>
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
                  className={`rounded-[2px] border px-3.5 py-2 text-[0.88rem] font-medium transition-colors ${
                    on
                      ? "border-accent-fill bg-accent-fill text-ink"
                      : "border-line text-slate hover:border-accent-fill hover:text-brand-text"
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
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-[2px] bg-accent-fill px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-accent-fill-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Sending…" : "Send enquiry"}
          {!busy && <ArrowRight className="h-4 w-4" />}
        </button>
        <p className="text-[0.88rem] text-slate">
          Answered inside one business day · No obligation
        </p>
      </div>
    </form>
  );
}

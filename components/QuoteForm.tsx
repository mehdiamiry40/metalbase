"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Tick } from "@/components/ui";
import {
  ACCEPTED_PHOTO_TYPES,
  MAX_INPUT_PHOTO_BYTES,
  MAX_PHOTO_BYTES,
  MAX_PHOTOS,
  type AcceptedPhotoType,
} from "@/lib/enquiry-config";
import { company } from "@/lib/site";

const enquiryTypes = [
  "Scrap metal quote",
  "Arranged drop-off question",
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

type PreparedPhoto = {
  name: string;
  type: AcceptedPhotoType;
  content: string;
};

const acceptedPhotoTypes = new Set<string>(ACCEPTED_PHOTO_TYPES);

function canvasBlob(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(
      ...bytes.subarray(offset, offset + chunkSize),
    );
  }
  return btoa(binary);
}

async function preparePhoto(file: File): Promise<PreparedPhoto> {
  if (!acceptedPhotoTypes.has(file.type)) {
    throw new Error("Use JPEG, PNG or WebP images.");
  }
  if (file.size > MAX_INPUT_PHOTO_BYTES) {
    throw new Error("Each original photo must be smaller than 12 MB.");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = objectUrl;
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("That image could not be read."));
    });

    const maxDimension = 1600;
    const scale = Math.min(
      1,
      maxDimension / Math.max(image.naturalWidth, image.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

    const context = canvas.getContext("2d");
    if (!context) throw new Error("That image could not be prepared.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    let quality = 0.82;
    let blob = await canvasBlob(canvas, quality);
    while (blob && blob.size > MAX_PHOTO_BYTES && quality > 0.42) {
      quality -= 0.1;
      blob = await canvasBlob(canvas, quality);
    }

    if (!blob || blob.size > MAX_PHOTO_BYTES) {
      throw new Error(
        "One photo is still too large after compression. Try a closer crop.",
      );
    }

    const base = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9._ -]/g, "")
      .trim()
      .slice(0, 80) || "scrap-photo";

    return {
      name: `${base}.jpg`,
      type: "image/jpeg",
      content: toBase64(await blob.arrayBuffer()),
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export default function QuoteForm() {
  const uid = useId();
  const typeRef = useRef<HTMLSelectElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [photos, setPhotos] = useState<PreparedPhoto[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [preparingPhotos, setPreparingPhotos] = useState(false);
  const tel = company.phone?.replace(/\s/g, "");

  useEffect(() => {
    if (state === "sent") successRef.current?.focus();
  }, [state]);

  function toggle(m: string) {
    setPicked((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));
  }

  async function onPhotoChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files ?? []);
    setPhotoError("");
    setErrors((current) => {
      if (!current.photos) return current;
      const next = { ...current };
      delete next.photos;
      return next;
    });

    if (files.length > MAX_PHOTOS) {
      setPhotoError(`Choose no more than ${MAX_PHOTOS} photos.`);
      event.target.value = "";
      return;
    }

    setPreparingPhotos(true);
    try {
      const prepared: PreparedPhoto[] = [];
      for (const file of files) prepared.push(await preparePhoto(file));
      setPhotos(prepared);
    } catch (error) {
      setPhotos([]);
      setPhotoError(
        error instanceof Error ? error.message : "Those photos could not be prepared.",
      );
      event.target.value = "";
    } finally {
      setPreparingPhotos(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (preparingPhotos) return;
    setState("sending");
    setErrors({});
    setPhotoError("");
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
      photos,
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
          if (json.errors.photos) setPhotoError(String(json.errors.photos));
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
            setPhotos([]);
            setPhotoError("");
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
  const visiblePhotoError = photoError || errors.photos;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="on-light border border-steel bg-chalk p-6 sm:p-8 lg:p-9"
    >
      {/* Announced to screen readers without stealing focus. */}
      <p aria-live="polite" className="sr-only">
        {preparingPhotos
          ? "Preparing your photos"
          : busy
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
          <label className={labelCls} htmlFor={`${uid}-photos`}>
            Photos <span className="font-normal t-muted">(optional, up to {MAX_PHOTOS})</span>
          </label>
          <input
            id={`${uid}-photos`}
            name="photos"
            type="file"
            accept={ACCEPTED_PHOTO_TYPES.join(",")}
            multiple
            disabled={busy || preparingPhotos}
            onChange={onPhotoChange}
            aria-invalid={!!visiblePhotoError}
            aria-describedby={`${uid}-photos-help${visiblePhotoError ? ` ${uid}-photos-err` : ""}`}
            className={`${field} file:mr-4 file:border-0 file:bg-furnace file:px-3 file:py-2 file:font-semibold file:text-white`}
          />
          <p id={`${uid}-photos-help`} className="mt-2 text-sm t-muted">
            Clear photos of the full load and any labels help us assess the material.
            Images are compressed before sending.
          </p>
          {preparingPhotos && (
            <p className="mt-2 text-sm font-semibold">Preparing photos…</p>
          )}
          {photos.length > 0 && !preparingPhotos && (
            <p className="mt-2 text-sm font-semibold">
              {photos.length} {photos.length === 1 ? "photo" : "photos"} ready
            </p>
          )}
          {visiblePhotoError && (
            <p id={`${uid}-photos-err`} className={errCls}>
              {visiblePhotoError}
            </p>
          )}
        </div>

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
          disabled={busy || preparingPhotos}
          className="btn btn-solid disabled:cursor-not-allowed disabled:opacity-60"
        >
          {preparingPhotos ? "Preparing photos…" : busy ? "Sending…" : "Send enquiry"}
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

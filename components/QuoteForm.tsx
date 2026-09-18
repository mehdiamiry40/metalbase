"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, Tick } from "@/components/ui";
import {
  ACCEPTED_PHOTO_TYPES,
  DEFAULT_ENQUIRY_TYPE,
  ENQUIRY_LIMITS,
  ENQUIRY_TYPES,
  MATERIAL_CHIPS,
  MAX_INPUT_PHOTO_BYTES,
  MAX_PHOTO_BYTES,
  MAX_PHOTOS,
  VOLUME_OPTIONS,
  type AcceptedPhotoType,
} from "@/lib/enquiry-config";
import { findOption, materialChip, volumeBand } from "@/lib/estimate";
import {
  acceptedEnquiry,
  enquiryErrorMessage,
  enquiryErrors,
  prepareEnquiryAttempt,
  submitEnquiryAttempt,
  trackEnquiryEvent,
  type EnquiryAttempt,
} from "@/lib/enquiry-client";
import { company } from "@/lib/site";

const enquiryTypes = ENQUIRY_TYPES;
const materials = MATERIAL_CHIPS;
const volumes = VOLUME_OPTIONS;

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
const unknownOutcomeMessage =
  "We couldn't confirm receipt. Your details are still here. Retry without changing them to check the same enquiry, or call us.";

type State = "idle" | "sending" | "sent" | "error";

type PreparedPhoto = {
  name: string;
  type: AcceptedPhotoType;
  content: string;
};

const acceptedPhotoTypes = new Set<string>(ACCEPTED_PHOTO_TYPES);
const subscribeToHydration = () => () => {};
const clientHydrationSnapshot = () => true;
const serverHydrationSnapshot = () => false;
/* The query string never changes while the form is mounted, so the
   subscribe above (which never fires) is the correct store. Reading it
   through useSyncExternalStore rather than in an effect is what keeps
   the server render and the hydration render identical — the same
   reason `hydrated` is read this way. */
const clientSearchSnapshot = () => window.location.search;
const serverSearchSnapshot = () => "";
const textLimits = {
  name: ENQUIRY_LIMITS.name,
  company: ENQUIRY_LIMITS.company,
  email: ENQUIRY_LIMITS.email,
  phone: ENQUIRY_LIMITS.phone,
  suburb: ENQUIRY_LIMITS.suburb,
  detail: ENQUIRY_LIMITS.detail,
};

function CharacterCount({ id, length, limit }: { id: string; length: number; limit: number }) {
  return <p id={id} className="mt-1.5 text-xs t-muted">{length} / {limit} characters</p>;
}

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
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("That image could not be read."));
      image.src = objectUrl;
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
  const volumeRef = useRef<HTMLSelectElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const photoGeneration = useRef(0);
  const sendingRef = useRef(false);
  const attemptRef = useRef<EnquiryAttempt | null>(null);
  const pendingErrorFocus = useRef<string | null>(null);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    clientHydrationSnapshot,
    serverHydrationSnapshot,
  );
  const search = useSyncExternalStore(
    subscribeToHydration,
    clientSearchSnapshot,
    serverSearchSnapshot,
  );
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [pickedOverride, setPickedOverride] = useState<string[] | null>(null);
  const [photos, setPhotos] = useState<PreparedPhoto[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [preparingPhotos, setPreparingPhotos] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [lengths, setLengths] = useState<Record<string, number>>({});
  const tel = company.phone?.replace(/\s/g, "");

  useEffect(() => {
    if (state === "sent") successRef.current?.focus();
  }, [state]);

  /* ------------------------------------------------------------------
     Arriving from the home page estimate.

     The estimate already asked which grade and how much, so the form
     does not ask again: `?grade=&kg=` carries that across. An unknown
     grade or an unparseable weight prefills nothing, because a bad
     query string must never stand between someone and the form.

     This is derived during render rather than written by an effect, so
     there is no second render and nothing to keep in sync. The volume
     select is the one exception below — it stays uncontrolled, and a
     DOM write is the honest way to seed an uncontrolled input.
     ------------------------------------------------------------------ */
  const prefill = useMemo(() => {
    const params = new URLSearchParams(search);
    const option = findOption(params.get("grade") ?? "");
    if (!option) return null;
    const kg = Number(params.get("kg"));
    return {
      grade: option.grade,
      chip: materialChip(option),
      volume: Number.isFinite(kg) && kg > 0 ? volumeBand(kg) : null,
    };
  }, [search]);

  /* `picked` is the prefilled chip until the customer touches the list,
     and their explicit selection from then on — including an empty one,
     which is why the override is null rather than []. */
  const picked = pickedOverride ?? (prefill?.chip ? [prefill.chip] : []);

  useEffect(() => {
    if (prefill?.volume && volumeRef.current) {
      volumeRef.current.value = prefill.volume;
    }
  }, [prefill]);

  useEffect(() => () => { photoGeneration.current += 1; }, []);

  useEffect(() => {
    if (state !== "idle" || !pendingErrorFocus.current) return;
    const key = pendingErrorFocus.current;
    pendingErrorFocus.current = null;
    const map: Record<string, string> = { enquiryType: "type", contact: "email" };
    const el = document.getElementById(`${uid}-${map[key] ?? key}`);
    // The committed render has re-enabled the fieldset. A pre-commit frame
    // could try to focus a still-disabled control and silently lose focus.
    el?.focus({ preventScroll: true });
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
  }, [errors, state, uid]);

  function focusField(key: string) {
    const map: Record<string, string> = { enquiryType: "type", contact: "email" };
    requestAnimationFrame(() => {
      const el = document.getElementById(`${uid}-${map[key] ?? key}`);
      el?.focus();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el?.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  function clearPhotos() {
    photoGeneration.current += 1;
    setPhotos([]);
    setPhotoError("");
    setPreparingPhotos(false);
    if (photoInputRef.current) photoInputRef.current.value = "";
    setErrors((current) => {
      const next = { ...current };
      delete next.photos;
      return next;
    });
  }

  function toggle(m: string) {
    setPickedOverride((current) => {
      const from = current ?? picked;
      return from.includes(m) ? from.filter((x) => x !== m) : [...from, m];
    });
  }

  async function onPhotoChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const input = event.currentTarget;
    const files = Array.from(input.files ?? []);
    const generation = ++photoGeneration.current;
    setPhotos([]);
    setPhotoError("");
    setPreparingPhotos(false);
    setErrors((current) => {
      if (!current.photos) return current;
      const next = { ...current };
      delete next.photos;
      return next;
    });

    if (files.length > MAX_PHOTOS) {
      setPhotoError(`Choose no more than ${MAX_PHOTOS} photos.`);
      input.value = "";
      return;
    }
    if (files.length === 0) return;

    setPreparingPhotos(true);
    try {
      const prepared: PreparedPhoto[] = [];
      for (const file of files) {
        prepared.push(await preparePhoto(file));
        if (generation !== photoGeneration.current) return;
      }
      if (generation === photoGeneration.current) setPhotos(prepared);
    } catch (error) {
      if (generation !== photoGeneration.current) return;
      setPhotos([]);
      setPhotoError(
        error instanceof Error ? error.message : "Those photos could not be prepared.",
      );
      input.value = "";
    } finally {
      if (generation === photoGeneration.current) setPreparingPhotos(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!hydrated || sendingRef.current || preparingPhotos) return;
    if (photoError || errors.photos) {
      focusField("photos");
      return;
    }

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

    sendingRef.current = true;
    setState("sending");
    setErrors({});
    setMessage("");
    try {
      const attempt = prepareEnquiryAttempt(payload, attemptRef.current);
      attemptRef.current = attempt;
      trackEnquiryEvent("quote_submit");
      const { response: res, data: json } = await submitEnquiryAttempt(attempt);

      if (!res.ok) {
        trackEnquiryEvent("quote_failed");
        const fieldErrors = enquiryErrors(json);
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
          if (fieldErrors.photos) setPhotoError(fieldErrors.photos);
          setState("idle");
          const first = ["enquiryType", "name", "contact", "email", "phone"].find(
            (key) => fieldErrors[key],
          ) ?? Object.keys(fieldErrors)[0];
          pendingErrorFocus.current = first;
          return;
        }
        setMessage(enquiryErrorMessage(json) ?? unknownOutcomeMessage);
        setState("error");
        return;
      }
      const accepted = acceptedEnquiry(json);
      if (accepted) {
        setReference(accepted.reference);
        setState("sent");
        trackEnquiryEvent("quote_accepted");
        return;
      }

      trackEnquiryEvent("quote_failed");
      setMessage(unknownOutcomeMessage);
      setState("error");
    } catch {
      trackEnquiryEvent("quote_failed");
      setMessage(unknownOutcomeMessage);
      setState("error");
    } finally {
      sendingRef.current = false;
    }
  }

  if (state === "sent") {
    return (
      <div
        ref={successRef}
        className="quote-success on-light border border-steel bg-chalk p-8 sm:p-10"
        role="status"
        tabIndex={-1}
      >
        <span className="flex h-12 w-12 items-center justify-center bg-shaft">
          <Tick className="h-6 w-6 text-furnace" />
        </span>
        <h2 className="mt-5 text-2xl">Thanks — your enquiry has been safely received</h2>
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
        {reference && <p className="mt-3 break-words text-sm">Reference: <strong>{reference}</strong></p>}

        <button
          type="button"
          onClick={() => {
            setState("idle");
            // An explicit empty selection, not "untouched": the estimate
            // that seeded this form was for the load just sent.
            setPickedOverride([]);
            setPhotos([]);
            setPhotoError("");
            setErrors({});
            setMessage("");
            setReference(null);
            setLengths({});
            attemptRef.current = null;
            photoGeneration.current += 1;
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
      method="post"
      action="/api/enquiry"
      onInput={(event) => {
        const input = event.target;
        if (
          (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) &&
          Object.hasOwn(textLimits, input.name)
        ) setLengths((current) => ({ ...current, [input.name]: input.value.length }));
      }}
      noValidate
      aria-busy={busy || preparingPhotos}
      className="quote-form on-light border border-steel bg-chalk p-6 sm:p-8 lg:p-9"
    >
      <noscript>
        <p className="mb-6 font-semibold">
          JavaScript is needed to send this form.
          {tel && <> Please call <a className="u-link" href={`tel:${tel}`}>{company.phoneLabel ?? company.phone}</a> to make an enquiry.</>}
        </p>
      </noscript>
      {!hydrated && (
        <p className="mb-6 text-sm t-muted">
          This form needs JavaScript before you can enter or send details.
          {tel && <> You can also <a className="u-link" href={`tel:${tel}`}>call {company.phoneLabel ?? company.phone}</a>.</>}
        </p>
      )}
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

      <fieldset disabled={!hydrated || busy} aria-label="Enquiry details" className="min-w-0">
      {/* Fields filling themselves in is alarming without a reason for it. */}
      {prefill && (
        <p className="callout mb-6 text-sm">
          Carried over from your estimate: <strong>{prefill.grade}</strong>. Change
          anything below that is not right.
        </p>
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
            defaultValue={DEFAULT_ENQUIRY_TYPE}
            required
            className={field}
            aria-invalid={!!errors.enquiryType}
            aria-describedby={errors.enquiryType ? `${uid}-type-err` : undefined}
          >
            {/* No "Choose an enquiry type" placeholder. Nearly everyone
                here wants a quote, and an empty required select just
                makes them state the obvious before they can start. */}
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
            maxLength={textLimits.name}
            autoComplete="name"
            className={field}
            aria-invalid={!!errors.name}
            aria-describedby={`${uid}-name-count${errors.name ? ` ${uid}-name-err` : ""}`}
          />
          <CharacterCount id={`${uid}-name-count`} length={lengths.name ?? 0} limit={textLimits.name} />
          {errors.name && <p id={`${uid}-name-err`} className={errCls}>{errors.name}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor={`${uid}-company`}>
            Company <span className="font-normal t-muted">(optional)</span>
          </label>
          <input
            id={`${uid}-company`}
            name="company"
            autoComplete="organization"
            maxLength={textLimits.company}
            className={field}
            aria-invalid={!!errors.company}
            aria-describedby={`${uid}-company-count${errors.company ? ` ${uid}-company-err` : ""}`}
          />
          <CharacterCount id={`${uid}-company-count`} length={lengths.company ?? 0} limit={textLimits.company} />
          {errors.company && <p id={`${uid}-company-err`} className={errCls}>{errors.company}</p>}
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
                maxLength={textLimits.email}
                autoComplete="email"
                className={field}
                aria-invalid={!!(errors.email || errors.contact)}
                aria-describedby={`${uid}-email-count${errors.email ? ` ${uid}-email-err` : ""}${errors.contact ? ` ${uid}-contact-err` : ""}`}
              />
              <CharacterCount id={`${uid}-email-count`} length={lengths.email ?? 0} limit={textLimits.email} />
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
                maxLength={textLimits.phone}
                autoComplete="tel"
                className={field}
                aria-invalid={!!(errors.phone || errors.contact)}
                aria-describedby={`${uid}-phone-count${errors.phone ? ` ${uid}-phone-err` : ""}${errors.contact ? ` ${uid}-contact-err` : ""}`}
              />
              <CharacterCount id={`${uid}-phone-count`} length={lengths.phone ?? 0} limit={textLimits.phone} />
              {errors.phone && <p id={`${uid}-phone-err`} className={errCls}>{errors.phone}</p>}
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
          <input
            id={`${uid}-suburb`}
            name="suburb"
            autoComplete="postal-code"
            maxLength={textLimits.suburb}
            className={field}
            aria-invalid={!!errors.suburb}
            aria-describedby={`${uid}-suburb-count${errors.suburb ? ` ${uid}-suburb-err` : ""}`}
          />
          <CharacterCount id={`${uid}-suburb-count`} length={lengths.suburb ?? 0} limit={textLimits.suburb} />
          {errors.suburb && <p id={`${uid}-suburb-err`} className={errCls}>{errors.suburb}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor={`${uid}-volume`}>Estimated volume</label>
          <select
            ref={volumeRef}
            id={`${uid}-volume`}
            name="volume"
            defaultValue=""
            className={field}
            aria-invalid={!!errors.volume}
            aria-describedby={errors.volume ? `${uid}-volume-err` : undefined}
          >
            <option value="">Choose a range</option>
            {volumes.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          {errors.volume && <p id={`${uid}-volume-err`} className={errCls}>{errors.volume}</p>}
        </div>

        <fieldset
          id={`${uid}-materials`}
          tabIndex={-1}
          className="sm:col-span-2"
          aria-invalid={!!errors.materials}
          aria-describedby={errors.materials ? `${uid}-materials-err` : undefined}
        >
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
          {errors.materials && <p id={`${uid}-materials-err`} className={errCls}>{errors.materials}</p>}
        </fieldset>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor={`${uid}-photos`}>
            Photos <span className="font-normal t-muted">(optional, up to {MAX_PHOTOS})</span>
          </label>
          <input
            ref={photoInputRef}
            id={`${uid}-photos`}
            name="photos"
            type="file"
            accept={ACCEPTED_PHOTO_TYPES.join(",")}
            multiple
            disabled={busy}
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
            <p id={`${uid}-photos-err`} role="alert" className={errCls}>
              {visiblePhotoError}
            </p>
          )}
          {(photos.length > 0 || preparingPhotos || visiblePhotoError) && (
            <button type="button" onClick={clearPhotos} className="mt-2 min-h-11 text-sm font-semibold u-link">
              {visiblePhotoError ? "Clear photo selection" : "Remove photos"}
            </button>
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
            maxLength={textLimits.detail}
            className={field}
            aria-invalid={!!errors.detail}
            aria-describedby={`${uid}-detail-count${errors.detail ? ` ${uid}-detail-err` : ""}`}
            placeholder="Access, timing, bin requirements or material details"
          />
          <CharacterCount id={`${uid}-detail-count`} length={lengths.detail ?? 0} limit={textLimits.detail} />
          {errors.detail && <p id={`${uid}-detail-err`} className={errCls}>{errors.detail}</p>}
        </div>
      </div>

      {/* honeypot — hidden from people, catnip for bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" maxLength={100} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        {/* The shared .btn rather than a bespoke fill: btn-solid derives
            its colours from the surface, so the submit button cannot
            lose contrast with the sheet it sits on. */}
        <button
          type="submit"
          disabled={!hydrated || busy || preparingPhotos || !!visiblePhotoError}
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
      </fieldset>
    </form>
  );
}

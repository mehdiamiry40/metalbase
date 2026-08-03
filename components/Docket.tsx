/* ==================================================================
   The docket.

   Every transaction here ends with one piece of paper, and that piece
   of paper is the entire trust proposition: gross, tare, net, grade,
   signed by both sides. So the site renders it as a design object
   rather than describing it in a paragraph.

   IMPORTANT — this is deliberately BLANK.

   A filled-in docket with weights and a dollar figure would be a
   fabricated commercial record, which is the exact failure this
   codebase has spent its whole history removing (see the header of
   lib/site.ts). Showing the empty form makes the honest point better
   anyway: these are the fields you will be handed, and none of them
   are decided out of your sight.

   The rules are `aria-hidden` and each field carries a real label, so
   a screen reader hears the field names rather than a run of dashes.
   ================================================================== */

type Field = { label: string; note?: string; wide?: boolean };

const identity: Field[] = [
  { label: "Docket no." },
  { label: "Date / time" },
  { label: "Seller", wide: true },
  { label: "Vehicle rego" },
  { label: "ID recorded" },
];

const weights: Field[] = [
  { label: "Gross", note: "vehicle + load, in" },
  { label: "Tare", note: "vehicle, out" },
  { label: "Net", note: "what you are paid on" },
];

function Rule() {
  return (
    <span
      aria-hidden="true"
      className="mt-2 block h-px w-full bg-[color:var(--hair)]"
    />
  );
}

export function Docket({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`on-light border hair bg-chalk p-6 sm:p-8 ${className}`}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b hair pb-3">
        <p className="t-spec font-medium uppercase tracking-[0.14em]">
          Weighbridge docket
        </p>
        <p className="t-spec t-muted">Specimen — issued blank</p>
      </header>

      {/* who and what */}
      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5">
        {identity.map((f) => (
          <div key={f.label} className={f.wide ? "col-span-2" : ""}>
            <dt className="t-spec uppercase tracking-[0.1em] t-muted">
              {f.label}
            </dt>
            <dd>
              <Rule />
            </dd>
          </div>
        ))}
      </dl>

      {/* the weights — the part that decides the money, so it gets the
          emphasis: larger type, its own bracketed block, net separated
          from the two readings it is derived from. */}
      <dl className="mt-8 border-y hair py-6">
        {weights.map((f) => (
          <div
            key={f.label}
            className="flex items-baseline justify-between gap-6 py-2.5"
          >
            <dt className="flex items-baseline gap-2.5">
              <span className="mono text-base font-medium">{f.label}</span>
              {f.note && (
                <span className="t-spec t-muted">{f.note}</span>
              )}
            </dt>
            <dd className="flex min-w-0 flex-1 items-baseline gap-3">
              <span
                aria-hidden="true"
                className="h-px min-w-0 flex-1 bg-[color:var(--hair)]"
              />
              <span className="t-spec t-muted">kg</span>
            </dd>
          </div>
        ))}
      </dl>

      {/* grade and settlement */}
      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
        <div className="col-span-2">
          <dt className="t-spec uppercase tracking-[0.1em] t-muted">
            Grade called
          </dt>
          <dd>
            <Rule />
          </dd>
        </div>
        <div>
          <dt className="t-spec uppercase tracking-[0.1em] t-muted">Rate</dt>
          <dd>
            <Rule />
          </dd>
        </div>
        <div>
          <dt className="t-spec uppercase tracking-[0.1em] t-muted">
            Deductions
          </dt>
          <dd>
            <Rule />
          </dd>
        </div>
        <div className="col-span-2 mt-1 border-t hair pt-4">
          <dt className="t-spec font-medium uppercase tracking-[0.1em]">
            Paid
          </dt>
          <dd>
            <Rule />
          </dd>
        </div>
      </dl>

      <figcaption className="mt-7 text-sm leading-relaxed t-muted">
        A blank specimen, not a record of a transaction. Every field is
        completed at the bridge with you standing there, and you keep a
        copy.
      </figcaption>
    </figure>
  );
}

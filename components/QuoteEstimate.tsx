"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowRight, YardIcon } from "@/components/ui";
import {
  MAX_WEIGHT_KG,
  estimate,
  estimateGroups,
  findOption,
  formatAmount,
  formatWeight,
  handoffQuery,
  parseWeight,
  volumeBand,
  type WeightUnit,
} from "@/lib/estimate";

/* ------------------------------------------------------------------
   The home page estimate.

   Two inputs — grade and weight — because those are the two things a
   seller standing next to a pile actually knows. Everything else the
   enquiry form used to ask up front is either derived from these (the
   volume band, the material chip) or genuinely optional.

   What it shows depends on whether rates are published, and both states
   are designed rather than one being a fallback:

   · rates published → the settlement at the published rate for that
     grade, stated as arithmetic the customer can follow.
   · no rates (today) → the grade's accepted spec and the net weight,
     which is most of an accurate load description, and a handoff that
     carries both into the enquiry.

   It never shows an invented number in either state. See lib/estimate.
   ------------------------------------------------------------------ */

const DEFAULT_GRADE = "bare-bright-copper";

const field =
  "min-h-12 w-full border border-steel bg-chalk px-4 py-3 text-base transition-colors duration-[160ms] ease-out focus:border-signal";

export default function QuoteEstimate() {
  const uid = useId();
  const [gradeId, setGradeId] = useState(DEFAULT_GRADE);
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<WeightUnit>("kg");

  const option = findOption(gradeId) ?? findOption(DEFAULT_GRADE)!;
  const weightKg = useMemo(() => parseWeight(weight, unit), [weight, unit]);
  const result = weightKg === null ? null : estimate(option, weightKg);

  const tooBig =
    weight.trim() !== "" && weightKg === null && Number(weight.replace(/,/g, "")) > 0;

  return (
    <section className="estimate-band on-light" aria-labelledby={`${uid}-title`}>
      <div className="shell estimate-grid">
        <div className="estimate-intro">
          <p className="eyebrow-pill">Estimate</p>
          <h2 id={`${uid}-title`}>What is your load?</h2>
          <p className="t-muted">
            Pick the closest grade and tell us roughly how much you have. You
            will get the spec that grade assumes and a load summary you can
            send straight through.
          </p>
        </div>

        <div className="estimate-card">
          <div className="estimate-inputs">
            <div className="estimate-grade">
              <label className="estimate-label" htmlFor={`${uid}-grade`}>
                Metal grade
              </label>
              <select
                id={`${uid}-grade`}
                className={field}
                value={gradeId}
                onChange={(e) => setGradeId(e.target.value)}
              >
                {estimateGroups.map((group) => (
                  <optgroup key={group.title} label={group.title}>
                    {group.options.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.grade}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="estimate-weight">
              <label className="estimate-label" htmlFor={`${uid}-weight`}>
                Approximate weight
              </label>
              <div className="estimate-weight-row">
                <input
                  id={`${uid}-weight`}
                  className={field}
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="e.g. 250"
                  value={weight}
                  maxLength={12}
                  onChange={(e) => setWeight(e.target.value)}
                  aria-describedby={tooBig ? `${uid}-weight-err` : undefined}
                  aria-invalid={tooBig || undefined}
                />
                <label className="sr-only" htmlFor={`${uid}-unit`}>
                  Weight unit
                </label>
                <select
                  id={`${uid}-unit`}
                  className={field}
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as WeightUnit)}
                >
                  <option value="kg">kg</option>
                  <option value="tonne">tonnes</option>
                </select>
              </div>
              {tooBig && (
                <p id={`${uid}-weight-err`} className="mt-1.5 text-sm font-semibold text-ink">
                  That is above {formatWeight(MAX_WEIGHT_KG)}. Send the details
                  and we will scope it directly.
                </p>
              )}
            </div>
          </div>

          <div className="estimate-result" aria-live="polite">
            {result === null ? (
              <p className="estimate-placeholder t-muted">
                Enter a weight to see the grade spec and your load summary.
              </p>
            ) : (
              <>
                {result.amount !== null && (
                  <p className="estimate-figure">
                    <span className="estimate-amount">
                      {formatAmount(result.amount)}
                    </span>
                    <span className="t-muted">
                      indicative, at the published {option.grade.toLowerCase()} rate
                    </span>
                  </p>
                )}

                <dl className="estimate-rows">
                  <div>
                    <dt>Grade</dt>
                    <dd>{option.grade}</dd>
                  </div>
                  <div>
                    <dt>Assumes</dt>
                    <dd>{option.spec}</dd>
                  </div>
                  <div>
                    <dt>Net weight</dt>
                    <dd className="mono">{formatWeight(result.weightKg)}</dd>
                  </div>
                  <div>
                    <dt>Load size</dt>
                    <dd>{volumeBand(result.weightKg)}</dd>
                  </div>
                </dl>

                <p className="estimate-note t-muted">
                  {result.amount === null
                    ? "Rates move with the market, so we confirm the current figure against your actual material rather than publishing one that may be stale by the time you read it."
                    : "Final grading, attachments and measured net weight decide the settlement. This assumes the grade and weight above."}
                </p>

                <Link
                  href={handoffQuery(option, result.weightKg)}
                  className="btn btn-solid estimate-cta"
                >
                  Send this load for a quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="shell estimate-factors">
        {[
          { icon: "tag", title: "Grade", body: "Alloys are assessed separately." },
          { icon: "sort", title: "Condition", body: "Attachments reduce recoverable metal." },
          { icon: "scale", title: "Net weight", body: "Excludes vehicles and containers." },
          { icon: "trend", title: "Market", body: "Commodity prices move the rate." },
        ].map((f) => (
          <div key={f.title} className="estimate-factor">
            <YardIcon name={f.icon as "tag"} className="h-6 w-6" />
            <p>
              <strong>{f.title}</strong>
              <span className="t-muted">{f.body}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { PUBLISH_RATES, type PriceRow, priceGroups } from "@/lib/site";

/* ==================================================================
   The grade ledger.

   The most valuable thing this business has published is its grade
   taxonomy: 28 grades across three streams, each with the spec that
   decides which one your load falls into. That is genuine trade
   knowledge, and it answers the question a seller actually has —
   "which of these is the pile in my ute?"

   The previous design buried it in a price table whose every row read
   "Rate on request", so the table looked broken rather than considered.

   Here it is the centrepiece, and it is typeset as a commodity board:
   a light sheet (this is a record, per the surface rule), mono codes,
   tabular figures, hairline rows, right-aligned rate column. It reads
   as an instrument printout, which is exactly what it is.

   Rates stay honest. PUBLISH_RATES is false and every rate is null, so
   the column renders a measured em-rule and the header says the rates
   are quoted on the day. Nothing invents a number, and the layout does
   not pretend the column is missing either — the column is the point.
   ================================================================== */

function Rate({ row }: { row: PriceRow }) {
  if (PUBLISH_RATES && row.rate) {
    return (
      <span className="mono text-[0.95rem] font-medium">
        ${row.rate}
        <span className="t-muted">/{row.unit}</span>
      </span>
    );
  }
  return (
    <span className="mono inline-flex items-center gap-2 text-[0.8rem] t-muted">
      {/* An em-rule, not the word "TBC". A blank field on a printed form
          reads as "filled in on the day"; the word reads as "unfinished". */}
      <span aria-hidden="true" className="h-px w-5 bg-[color:var(--hair)]" />
      <span className="uppercase tracking-[0.08em]">on the day</span>
      <span className="sr-only">
        Rate quoted on the day, per {row.unit === "kg" ? "kilogram" : "tonne"}
      </span>
    </span>
  );
}

export function Ledger({
  /** Render a single stream, or all three when omitted. */
  only,
  showNotes = true,
}: {
  only?: string;
  showNotes?: boolean;
}) {
  const groups = only ? priceGroups.filter((g) => g.id === only) : priceGroups;

  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-24">
          <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b-2 border-[color:currentColor] pb-3">
            <h3>{group.title}</h3>
            <p className="t-spec t-muted">
              {group.rows.length} grades · priced per{" "}
              {group.rows[0]?.unit === "kg" ? "kilogram" : "tonne"}
            </p>
          </header>

          {showNotes && (
            <p className="measure-wide mt-5 text-[0.95rem] leading-relaxed t-muted">
              {group.note}
            </p>
          )}

          {/* A real table, not a grid of divs: this is tabular data, and
              a screen reader user navigating it by column deserves the
              header association that only <th scope> gives.

              `relative` is load-bearing, not decoration. The rate cells
              and the caption carry .sr-only, which is position:absolute
              — and an absolutely positioned box is only clipped by an
              overflow container that is in its CONTAINING-BLOCK chain.
              With no positioned ancestor those spans resolved against
              the initial containing block, escaped the scroller
              entirely, and left the document 59px wider than the
              viewport on every page carrying the board. The table
              scrolled correctly the whole time, which is why it looked
              fine and measured wrong. */}
          <div className="relative mt-7 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">
                {group.title} scrap metal grades, specifications and rates
              </caption>
              <thead>
                <tr className="border-b hair">
                  <th scope="col" className="t-spec w-[38%] py-3 pr-6 font-normal uppercase t-muted">
                    Grade
                  </th>
                  <th scope="col" className="t-spec py-3 pr-6 font-normal uppercase t-muted">
                    Specification
                  </th>
                  <th scope="col" className="t-spec py-3 text-right font-normal uppercase t-muted">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row) => (
                  <tr key={row.grade} className="border-b hair align-baseline">
                    <th
                      scope="row"
                      className="py-4 pr-6 text-[0.98rem] font-medium leading-snug"
                    >
                      {row.grade}
                    </th>
                    <td className="py-4 pr-6 text-[0.9rem] leading-snug t-muted">
                      {row.spec}
                    </td>
                    <td className="whitespace-nowrap py-4 text-right">
                      <Rate row={row} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

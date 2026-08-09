import type { ComparisonTable } from "@/lib/comparisons";

export function ComparisonTable({ comparison }: { comparison: ComparisonTable }) {
  return (
    <section className="mx-auto mt-10 max-w-3xl rounded-xl border border-border/60 bg-card p-6">
      <h2 className="text-lg font-semibold">{comparison.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {comparison.intro}
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-border/60">
              <th className="py-2 pr-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Spec
              </th>
              <th className="py-2 pr-3 font-semibold text-primary">
                {comparison.headerA}
              </th>
              <th className="py-2 font-semibold text-primary">
                {comparison.headerB}
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.label} className="border-b border-border/40">
                <td className="py-2 pr-3 text-muted-foreground">{row.label}</td>
                <td className="py-2 pr-3 font-medium">{row.a}</td>
                <td className="py-2 font-medium">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

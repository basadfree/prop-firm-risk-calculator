import type { Asset } from "@/lib/assets";

export function QuickAnswers({ asset }: { asset: Asset }) {
  const unit = asset.positionUnit === "contracts" ? "contract" : asset.positionUnit;

  const items = [
    {
      q: `How many ${asset.positionUnit} of ${asset.symbol} should I trade?`,
      a: `Position size = (account balance × risk %) ÷ (stop distance × value per unit). For ${asset.name} (${asset.symbol}), each ${asset.pointLabel.replace(/s$/, "")} of stop is worth $${asset.tickValue} per ${unit}, so on a $100,000 account risking 1% the calculator converts your dollar risk into the exact ${asset.positionUnit} — keeping every loss inside prop-firm daily limits.`,
    },
    {
      q: `How much is one ${asset.pointLabel} worth for ${asset.symbol}?`,
      a: `For ${asset.name} (${asset.symbol}), each ${asset.pointLabel} move is worth $${asset.tickValue} per ${unit}. This tick value is used to convert your dollar risk into a position size.`,
    },
    {
      q: "How is position size calculated?",
      a: "Position size = (Account balance × Risk %) ÷ (Stop distance × Dollar value per unit). For example, on a $100,000 account risking 1% with a 50-point stop on NQ ($20/point), you trade 1 contract.",
    },
  ];

  const [lead, ...rest] = items;

  return (
    <section
      aria-label="Quick answers"
      className="mx-auto mt-8 max-w-3xl rounded-xl border border-border/60 bg-card p-6"
    >
      <h2 className="text-lg font-semibold">{lead.q}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lead.a}</p>
      <dl className="mt-4 space-y-4 border-t border-border/60 pt-4">
        {rest.map((item) => (
          <div key={item.q}>
            <dt className="text-sm font-semibold">{item.q}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

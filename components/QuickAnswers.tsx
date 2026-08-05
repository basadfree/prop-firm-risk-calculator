import type { Asset } from "@/lib/assets";

export function QuickAnswers({ asset }: { asset: Asset }) {
  const unit = asset.positionUnit === "contracts" ? "contract" : asset.positionUnit;

  const items = [
    {
      q: `What is ${asset.name} position sizing?`,
      a: `${asset.description.split(" — ")[0]}. Enter your account balance, risk %, entry price and stop-loss to get the exact ${asset.positionUnit} to trade while keeping your risk inside prop-firm limits.`,
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

  return (
    <section
      aria-label="Quick answers"
      className="mx-auto mt-8 max-w-3xl rounded-xl border border-border/60 bg-card p-6"
    >
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Quick Answers
      </h2>
      <dl className="mt-3 space-y-4">
        {items.map((item) => (
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

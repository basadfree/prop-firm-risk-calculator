import { ASSETS } from "@/lib/assets";
import { siteUrl, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const base = siteUrl();

  const assetFull = ASSETS.map((a) => {
    return [
      `### ${a.name}`,
      "",
      a.description,
      "",
      `Position sizing for ${a.name} uses the real per-contract value (${a.symbol ?? "spot pricing"}), the account balance, the market price (${a.defaultEntry ?? "latest quote"}), and the stop distance to output the exact number of contracts, lots or units that keeps risk inside your planned percentage.`,
    ].join("\n");
  });

  const body = [
    `# ${SITE_NAME} — ${SITE_TAGLINE}`,
    "",
    "Position size and risk management calculators built for prop firm and SMC/ICT traders, using real tick values per market instead of made-up numbers. Compute exact position size in contracts, lots or units from account balance, risk percentage, entry and stop-loss. Other calculators convert dollar risk to lot size, show contract multipliers, daily and max drawdown breach levels, and leverage margin. All free, all in the browser, no signup.",
    "",
    "## Homepage",
    "",
    `[${SITE_NAME}](${base}) — the risk calculator with a daily-loss-limit vs stop-distance check built in.`,
    "",
    "## Market calculators",
    "",
    ...assetFull,
    "",
    "## Other calculators",
    "",
    `- [Pip value calculator](${base}/pip-value-calculator): the dollar value of a pip per market.`,
    `- [Stop-loss calculator](${base}/stop-loss-calculator): dollar risk of any entry/stop/size.`,
    `- [Lot size calculator](${base}/lot-size-calculator): translate dollar risk into lots or contracts.`,
    `- [Contract size calculator](${base}/contract-size-calculator): every futures multiplier in dollars.`,
    `- [Max drawdown calculator](${base}/max-drawdown-calculator): daily and trailing drawdown levels in dollars.`,
    `- [Leverage calculator](${base}/leverage-calculator): margin and notional exposure across markets.`,
    "",
    "## Guides",
    "",
    `- [Prop firm position sizing](${base}/guides/prop-position-sizing): the full sizing formula with worked examples.`,
    `- [Maximum drawdown rules](${base}/guides/prop-max-drawdown): static vs trailing drawdown explained.`,
    `- [What is a prop firm](${base}/guides/what-is-a-prop-firm): funded accounts, evaluations and payouts.`,
    `- [What is a prop firm challenge](${base}/guides/what-is-a-prop-firm-challenge): the evaluation phases, targets and limits.`,
    `- [Funded account rules](${base}/guides/funded-account-rules): daily loss, drawdown, consistency and payout rules across the big five firms.`,
    `- [Prop firm payouts](${base}/guides/prop-firm-payout): when you can withdraw and how profit splits work.`,
    `- [How to get funded](${base}/guides/how-to-get-funded): choosing a firm, challenge costs and red flags.`,
    `- [About](${base}/about).`,
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
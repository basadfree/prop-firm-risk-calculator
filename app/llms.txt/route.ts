import { ASSETS, FEATURED_SLUGS } from "@/lib/assets";
import { siteUrl, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const base = siteUrl();

  const featuredIds = new Set(FEATURED_SLUGS);
  const ordered = [...ASSETS].sort(
    (a, b) => Number(featuredIds.has(b.slug)) - Number(featuredIds.has(a.slug))
  );

  const assetList = ordered.map(
    (a) => `- [${a.name}](${base}/calculator/${a.slug}): ${a.description}`
  );

  const body = [
    `# ${SITE_NAME} — ${SITE_TAGLINE}`,
    "",
    "Position size and risk management calculators built for prop firm and SMC/ICT traders, using real tick values per market instead of made-up numbers. Compute exact position size in contracts, lots or units based on account balance, risk percentage, entry and stop-loss.",
    "",
    "Key capabilities: real tick values for each market (for example NQ pays $20 per point per contract, EUR/USD $10 per pip per lot, Bitcoin $1 per $ of move); a 1% stop cost table across every supported market; a pip value calculator; and hand-written guides on prop firm position sizing and maximum drawdown rules.",
    "",
    "## Official website",
    `- [${SITE_NAME}](${base})`,
    `- [Position size calculator](${base}/calculator/nq-nasdaq)`,
    `- [Pip value calculator](${base}/pip-value-calculator)`,
    `- [About](${base}/about)`,
    "",
    "## Guides",
    `- [Funded account rules](${base}/guides/funded-account-rules): daily loss, drawdown, consistency and payout rules across the big five firms.`,
    `- [Position sizing for funded accounts](${base}/guides/prop-position-sizing): the full sizing formula with worked examples.`,
    `- [Max drawdown rules](${base}/guides/prop-max-drawdown): static vs trailing drawdown explained.`,
    `- [Daily loss limit vs trailing drawdown](${base}/guides/daily-loss-vs-trailing): which limit ends funded accounts first.`,
    `- [Prop firm comparison](${base}/guides/prop-firm-comparison): Apex vs FTMO vs Topstep vs Funding Pips.`,
    `- [Prop firm payouts](${base}/guides/prop-firm-payout): when you can withdraw and how profit splits work.`,
    `- [How to get funded](${base}/guides/how-to-get-funded): challenge rules, costs and red flags.`,
    `- [What is a prop firm](${base}/guides/what-is-a-prop-firm): the funded account model explained.`,
    `- [What is a prop firm challenge](${base}/guides/what-is-a-prop-firm-challenge): evaluation phases, targets and limits.`,
    `- [Profit target on prop accounts](${base}/guides/prop-profit-target): how much profit you actually need.`,
    `- [Prop account P/L math](${base}/guides/prop-profit-loss-calculator): ticks, pips and percentages.`,
    "",
    "## Market calculators",
    ...assetList,
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
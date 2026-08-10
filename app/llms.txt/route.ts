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
    `- [Prop position sizing guide](${base}/guides/prop-position-sizing)`,
    `- [Maximum drawdown guide](${base}/guides/prop-max-drawdown)`,
    `- [About](${base}/about)`,
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
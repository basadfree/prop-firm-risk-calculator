import { ASSETS, getAssetBySlug, type Asset } from "@/lib/assets";

export interface ComparisonRow {
  label: string;
  a: string;
  b: string;
}

export interface ComparisonTable {
  title: string;
  intro: string;
  headerA: string;
  headerB: string;
  rows: ComparisonRow[];
}

function formatNumber(n: number, precision: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

/** Pick the most similar alternative: same market type first, else first in list. */
function closestSibling(asset: Asset): Asset {
  const sameType = ASSETS.filter((a) => a.slug !== asset.slug && a.type === asset.type);
  if (sameType.length > 0) return sameType[0];
  const next = ASSETS.find((a) => a.slug !== asset.slug);
  return next ?? asset;
}

export function getComparison(slug: string): ComparisonTable | null {
  const asset = getAssetBySlug(slug);
  if (!asset) return null;
  const alt = closestSibling(asset);

  return {
    title: `${asset.name} vs ${alt.name} — contract specs compared`,
    intro: `The position size formula is identical for both instruments; only the dollar value per ${asset.pointLabel} and the position unit change. This table compares ${asset.symbol} side by side with ${alt.symbol} so you can apply the right numbers before you size a trade.`,
    headerA: asset.name,
    headerB: alt.name,
    rows: [
      {
        label: "Ticker symbol",
        a: asset.symbol,
        b: alt.symbol,
      },
      {
        label: `Value per ${asset.pointLabel} per ${asset.positionUnit.slice(0, -1)}`,
        a: `$${asset.tickValue}`,
        b: `$${alt.tickValue}`,
      },
      {
        label: "Position unit",
        a: asset.positionUnit,
        b: alt.positionUnit,
      },
      {
        label: "Example entry",
        a: formatNumber(asset.defaultEntry, asset.pricePrecision),
        b: formatNumber(alt.defaultEntry, alt.pricePrecision),
      },
      {
        label: "Example stop-loss",
        a: formatNumber(asset.defaultStop, asset.pricePrecision),
        b: formatNumber(alt.defaultStop, alt.pricePrecision),
      },
      {
        label: "Price precision (decimals)",
        a: String(asset.pricePrecision),
        b: String(alt.pricePrecision),
      },
    ],
  };
}

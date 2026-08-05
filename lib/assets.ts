/**
 * Asset registry — single source of truth for every market the calculator
 * supports. Each entry carries the contract specs needed for position sizing
 * as well as the SEO copy used to generate metadata and OG images.
 */

export type AssetType = "index" | "crypto" | "forex" | "commodity";

export interface Asset {
  /** URL slug, e.g. "nq-nasdaq". */
  slug: string;
  /** Trading ticker, e.g. "NQ". */
  symbol: string;
  /** Human name, e.g. "Nasdaq 100". */
  name: string;
  /** Market category — drives the position-size formula. */
  type: AssetType;
  /** Unit used to describe stop distance (points, pips, $). */
  pointLabel: string;
  /**
   * Dollar value of ONE unit of price movement per ONE standard unit of size.
   * NQ: $20 per point per contract. EUR/USD: $10 per pip per lot.
   */
  tickValue: number;
  /** Forex only: size of a pip in price terms (0.0001 for 5-digit pairs). */
  pipSize?: number;
  /** Decimal precision used for entry/stop inputs. */
  pricePrecision: number;
  /** Unit of measure for the output position size. */
  positionUnit: string;
  /** Realistic price used to pre-fill the calculator. */
  defaultEntry: number;
  /** Realistic stop-loss used to pre-fill the calculator. */
  defaultStop: number;
  /** Optional realistic take-profit for the R:R preview. */
  defaultTakeProfit?: number;
  /** SEO — H1 heading of the dedicated page. */
  h1: string;
  /** SEO — <title>. */
  title: string;
  /** SEO — meta description. */
  description: string;
  /** SEO — short intro paragraph rendered under the H1. */
  seoIntro: string;
  /** SEO — focus keywords (used for OG image + content). */
  keywords: string[];
}

export const ASSETS: Asset[] = [
  {
    slug: "nq-nasdaq",
    symbol: "NQ",
    name: "Nasdaq 100",
    type: "index",
    pointLabel: "points",
    tickValue: 20,
    pricePrecision: 2,
    positionUnit: "contracts",
    defaultEntry: 19850,
    defaultStop: 19700,
    defaultTakeProfit: 20150,
    h1: "Nasdaq 100 (NQ) Position Size Calculator",
    title:
      "NQ Position Size Calculator for Prop Firms — Nasdaq 100 Risk Calculator",
    description:
      "Calculate your exact NQ (Nasdaq 100 E-mini) position size in contracts based on account balance, risk % and stop-loss. Built for prop firm and SMC/ICT traders.",
    seoIntro:
      "The NQ (E-mini Nasdaq 100) pays $20 per point per contract. Enter your account balance, risk percentage and stop-loss, and this tool instantly returns the exact number of NQ contracts to trade — keeping your risk inside prop firm drawdown limits.",
    keywords: ["NQ calculator", "Nasdaq 100 position size", "NQ risk calculator", "prop firm NQ"],
  },
  {
    slug: "mnq-micro-nasdaq",
    symbol: "MNQ",
    name: "Micro Nasdaq 100",
    type: "index",
    pointLabel: "points",
    tickValue: 2,
    pricePrecision: 2,
    positionUnit: "contracts",
    defaultEntry: 19850,
    defaultStop: 19700,
    defaultTakeProfit: 20150,
    h1: "Micro Nasdaq 100 (MNQ) Position Size Calculator",
    title:
      "MNQ Position Size Calculator for Prop Firms — Micro Nasdaq 100 Risk Calculator",
    description:
      "Calculate your exact MNQ (Micro Nasdaq 100) position size in contracts by account balance, risk % and stop-loss. Ideal for small prop firm accounts.",
    seoIntro:
      "The MNQ (Micro E-mini Nasdaq 100) pays $2 per point per contract — 10× smaller than the full NQ. This calculator tells you exactly how many MNQ contracts keep your trade risk at your chosen percentage.",
    keywords: ["MNQ calculator", "Micro Nasdaq 100 position size", "MNQ risk calculator", "micro futures"],
  },
  {
    slug: "btc-bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    type: "crypto",
    pointLabel: "$",
    tickValue: 1,
    pricePrecision: 2,
    positionUnit: "coins",
    defaultEntry: 67000,
    defaultStop: 65000,
    defaultTakeProfit: 71000,
    h1: "Bitcoin (BTC) Position Size Calculator",
    title: "BTC Position Size Calculator for Prop Firms — Bitcoin Risk Calculator",
    description:
      "Calculate your exact Bitcoin position size in BTC based on account balance, risk % and stop-loss. Built for prop firm and SMC crypto traders.",
    seoIntro:
      "Position sizing Bitcoin is about coins, not contracts: divide your dollar risk by the distance from entry to stop. This BTC calculator does it instantly for your prop firm account.",
    keywords: ["Bitcoin position size", "BTC risk calculator", "Bitcoin risk management", "crypto prop firm"],
  },
  {
    slug: "eth-ethereum",
    symbol: "ETH",
    name: "Ethereum",
    type: "crypto",
    pointLabel: "$",
    tickValue: 1,
    pricePrecision: 2,
    positionUnit: "coins",
    defaultEntry: 3550,
    defaultStop: 3450,
    defaultTakeProfit: 3750,
    h1: "Ethereum (ETH) Position Size Calculator",
    title: "ETH Position Size Calculator for Prop Firms — Ethereum Risk Calculator",
    description:
      "Calculate your exact Ethereum position size in ETH based on account balance, risk % and stop-loss. Built for SMC and prop firm crypto traders.",
    seoIntro:
      "Ethereum position size equals your dollar risk divided by the stop distance in price. Use this ETH risk calculator to size every SMC trade consistently.",
    keywords: ["Ethereum position size", "ETH risk calculator", "Ethereum risk management", "ETH prop firm"],
  },
  {
    slug: "xau-gold",
    symbol: "XAU/USD",
    name: "Gold",
    type: "commodity",
    pointLabel: "$",
    tickValue: 100,
    pricePrecision: 2,
    positionUnit: "lots",
    defaultEntry: 2380,
    defaultStop: 2360,
    defaultTakeProfit: 2420,
    h1: "Gold (XAU/USD) Position Size Calculator",
    title: "Gold Position Size Calculator for Prop Firms — XAU/USD Risk Calculator",
    description:
      "Calculate your exact Gold (XAU/USD) position size in lots based on account balance, risk % and stop-loss. Perfect for prop firm and SMC traders.",
    seoIntro:
      "One standard lot of XAU/USD (100 oz) moves $100 for every $1 of gold. This Gold risk calculator converts your stop distance and risk % into the exact lot size for your prop firm account.",
    keywords: ["Gold position size", "XAU/USD risk calculator", "Gold lot size", "Gold prop firm"],
  },
  {
    slug: "eur-usd",
    symbol: "EUR/USD",
    name: "EUR/USD",
    type: "forex",
    pointLabel: "pips",
    tickValue: 10,
    pipSize: 0.0001,
    pricePrecision: 5,
    positionUnit: "lots",
    defaultEntry: 1.085,
    defaultStop: 1.08,
    defaultTakeProfit: 1.095,
    h1: "EUR/USD Position Size Calculator",
    title: "EUR/USD Position Size Calculator for Prop Firms — Forex Risk Calculator",
    description:
      "Calculate your exact EUR/USD position size in lots based on account balance, risk % and stop-loss in pips. Built for prop firm forex traders.",
    seoIntro:
      "For EUR/USD, one standard lot risks $10 per pip. Enter your stop in price and this calculator converts it to pips, then returns the exact lot size for your risk %.",
    keywords: ["EUR/USD position size", "forex lot size calculator", "EURUSD risk calculator", "forex prop firm"],
  },
  {
    slug: "es-s-and-p-500",
    symbol: "ES",
    name: "S&P 500",
    type: "index",
    pointLabel: "points",
    tickValue: 50,
    pricePrecision: 2,
    positionUnit: "contracts",
    defaultEntry: 5580,
    defaultStop: 5530,
    defaultTakeProfit: 5680,
    h1: "S&P 500 (ES) Position Size Calculator",
    title: "ES Position Size Calculator for Prop Firms — S&P 500 Risk Calculator",
    description:
      "Calculate your exact ES (E-mini S&P 500) position size in contracts based on account balance, risk % and stop-loss. For prop firm traders.",
    seoIntro:
      "The ES E-mini pays $50 per point per contract. Use this S&P 500 position size calculator to stay disciplined and protect your prop firm balance.",
    keywords: ["ES position size", "S&P 500 calculator", "ES risk calculator"],
  },
  {
    slug: "us30-dow-jones",
    symbol: "US30",
    name: "Dow Jones (US30)",
    type: "index",
    pointLabel: "points",
    tickValue: 5,
    pricePrecision: 2,
    positionUnit: "contracts",
    defaultEntry: 41200,
    defaultStop: 41000,
    defaultTakeProfit: 41600,
    h1: "Dow Jones (US30) Position Size Calculator",
    title: "US30 Position Size Calculator for Prop Firms — Dow Jones Risk Calculator",
    description:
      "Calculate your exact US30 (Dow Jones) position size in contracts based on account balance, risk % and stop-loss. Built for prop firm traders.",
    seoIntro:
      "One US30 contract pays $5 per index point. This Dow Jones position size calculator turns your stop distance and risk % into the correct contract count.",
    keywords: ["US30 position size", "Dow Jones calculator", "US30 risk calculator"],
  },
];

/** Slug → asset lookup (used by dynamic routes). */
export function getAssetBySlug(slug: string): Asset | undefined {
  return ASSETS.find((a) => a.slug === slug);
}

/** Canonical homepage slug list — the six high-value pages we promote first. */
export const FEATURED_SLUGS = [
  "nq-nasdaq",
  "mnq-micro-nasdaq",
  "btc-bitcoin",
  "eth-ethereum",
  "xau-gold",
  "eur-usd",
];

export function isForex(asset: Asset): boolean {
  return asset.type === "forex";
}

export function isCrypto(asset: Asset): boolean {
  return asset.type === "crypto";
}

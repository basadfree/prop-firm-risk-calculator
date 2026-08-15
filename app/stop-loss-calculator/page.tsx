import type { Metadata } from "next";
import Link from "next/link";
import { StopLossCalculator } from "@/components/StopLossCalculator";
import { AssetGrid } from "@/components/AssetGrid";
import { ASSETS } from "@/lib/assets";
import { JsonLd } from "@/components/JsonLd";
import {
  faqJsonLd,
  breadcrumbJsonLd,
  webSiteJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const url = absoluteUrl("/stop-loss-calculator");

export const metadata: Metadata = {
  title: "Stop Loss Calculator for NQ, ES, Forex & Crypto",
  description:
    "Calculate exactly how much cash your stop-loss risks on NQ, ES, forex and crypto before entering a trade. Free prop-firm stop loss calculator, no signup.",
  alternates: {
    canonical: url,
    languages: { en: url, "x-default": url },
  },
  openGraph: {
    type: "website",
    siteName: "RiskCalc",
    title: "Stop Loss Calculator for NQ, ES, Forex & Crypto",
    description:
      "Turn a stop distance into real dollars: entry, stop, size and the exact cash on the line for any prop-firm instrument.",
    url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Loss Calculator for NQ, ES, Forex & Crypto",
    description:
      "Turn a stop distance into real dollars: entry, stop, size and the exact cash on the line for any prop-firm instrument.",
  },
};

const faqs = [
  {
    q: "How does a stop loss calculator work?",
    a: "It multiplies your stop distance (entry minus stop) by the instrument's value per point or pip, then by your position size. The result is the exact dollar amount you lose if the stop is hit — the number that decides whether the trade fits your prop firm risk limit.",
  },
  {
    q: "What is a good stop loss distance for prop firm trading?",
    a: "There is no universal distance — it depends on the market's volatility and your trade structure. The rule that matters is the dollar result: your stop loss cash risk should stay at or below your daily drawdown allocation (typically 0.5%-1% of the account) so two or three losses never breach the limit.",
  },
  {
    q: "Why does the same stop distance cost different amounts on different markets?",
    a: "Because each instrument has its own value per unit. One point on NQ is $20 per contract, one point on ES is $50, and one pip on EUR/USD is $10 per lot. The same 10-point stop therefore costs $200 on NQ but $500 on ES.",
  },
  {
    q: "How do I calculate stop loss value myself?",
    a: "Risk = |entry − stop| × value per point/pip × position size. For example, an NQ trade entered at 19,850 with a stop at 19,700 and 2 contracts: 150 points × $20 × 2 = $6,000 at risk. This calculator does the math instantly for any supported market.",
  },
  {
    q: "Should my stop loss depend on my account balance?",
    a: "Yes. Position size should always be derived backwards from a fixed dollar risk (balance × risk%) divided by the stop's cash value per unit. Never pick a stop distance first and size to it blindly — that is how a single loss breaks a prop firm account.",
  },
  {
    q: "How do I calculate stop loss in pips for forex?",
    a: "A stop loss pips calculator uses: dollar risk ÷ (pip value per lot × number of lots). For EUR/USD each standard lot is worth $10 per pip, so a 20-pip stop costs $200 per lot. To risk exactly $200, trade one standard lot; to risk $100, use a half lot. Work backwards from the dollar risk you can afford, never forwards from the pip count.",
  },
  {
    q: "What is a stop loss percentage and how is it calculated?",
    a: "The stop loss percentage is your risk per trade as a share of the account: risk% = dollar risk ÷ balance × 100. If you risk $500 on a $50,000 account that is 1%. Most traders size the stop so the cash risk lands between 0.5% and 1% of the account — the same range most prop firms allow against their daily loss limit.",
  },
  {
    q: "How much should I risk per trade on a 1% risk account?",
    a: "A 1% risk rule means the dollar value of your stop loss equals 1% of the account. On $100,000 that is $1,000 per trade. Divide that by your stop distance's value per unit to get the position size — for NQ (worth $20 per point) a 50-point stop allows one contract ($1,000), while on ES (worth $50 per point) the same 50-point stop costs $2,500, so you can only trade a half or micro contract.",
  },
  {
    q: "How does a stop loss calculator work for crypto?",
    a: "For crypto, risk = |entry − stop| × position size in coins. If Bitcoin is $100,000 and you buy 0.1 BTC with a stop at $95,000, the stop risks $5,000 × 0.1 = $500. Cryptocurrency moves are wide, so the percentage result matters more than the price distance — always convert the stop distance into dollars against your risk%.",
  },
  {
    q: "How does stop loss risk work for futures like NQ and ES?",
    a: "Futures use fixed contract multipliers: NQ is $20 per point per contract, MNQ is $2, ES is $50, and the Micro ES is $5. A stop is just the point distance times the multiplier times contracts — a 100-point stop on one NQ is $2,000. Futures stop losses must always be sized so the dollar result fits your account risk%, because the multiplier turns small distances into large cash.",
  },
];

export default function StopLossCalculatorPage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Free tool · No signup
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
          Stop Loss Calculator — How Much Is Your Stop Really Risking?
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Before you enter a trade, you should know the exact cash value of your
          stop loss — not a guess. Enter entry, stop and size for NQ, ES, forex
          pairs or crypto and see the dollar risk instantly, the same number a
          prop firm&apos;s daily drawdown rule measures against.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-border/60 bg-card p-6">
        <h2 className="text-lg font-semibold">
          How much does my stop-loss cost in dollars?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Dollar risk = |entry − stop| × value per point/pip × position size.
          An NQ trade entered at 19,850 with a stop at 19,700 and 2 contracts
          risks 150 points × $20 × 2 = $6,000. This is the number prop firms
          compare against the daily loss limit before you enter a trade.
        </p>
      </div>

      <div className="mt-10">
        <StopLossCalculator />
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border/60 bg-card p-6">
        <h2 className="text-lg font-semibold">How it works — the stop loss formula</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Every stop loss calculator runs on the same formula:{" "}
          <strong className="text-foreground">dollar risk = |entry − stop| ×
          value per point/pip × position size</strong>. The value per unit comes
          from the instrument&apos;s real contract specs — NQ pays $20 per point
          per contract, ES $50, MNQ $2, EUR/USD $10 per pip per lot, and crypto
          pays $1 per $1 of move per unit. That is why the same 50-point stop
          costs $1,000 on NQ but $2,500 on ES.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The result is then checked against your{" "}
          <strong className="text-foreground">risk %</strong> — the stop loss
          percentage of the account. A 1% risk rule on a $100,000 account means
          the stop may cost at most $1,000, so you size the position backwards
          from that number. Prop firms measure the same dollar result against
          their daily loss limit, which is why this calculator covers forex,
          futures and crypto with the real multipliers.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border/60 bg-card p-6">
        <h2 className="text-lg font-semibold">
          From stop-loss dollars to position size
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Once you know what your stop costs in cash, size the trade so that
          cash risk equals your prop firm allocation: position size = (balance
          × risk%) ÷ (stop distance × value per unit). Feed both numbers into
          the{" "}
          <Link
            href="/guides/prop-position-sizing"
            className="font-medium text-primary hover:underline"
          >
            position sizing calculator
          </Link>{" "}
          and it returns the exact contracts or lots that keep every loss inside
          the daily drawdown limit. New here? Read the{" "}
          <Link
            href="/guides/funded-account-rules"
            className="font-medium text-primary hover:underline"
          >
            funded account rules guide
          </Link>{" "}
          for the daily-loss and drawdown numbers to size against, or the{" "}
          <Link
            href="/guides/prop-max-drawdown"
            className="font-medium text-primary hover:underline"
          >
            max drawdown guide
          </Link>{" "}
          for the limits that end accounts.
        </p>
      </div>

      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-lg font-semibold">
          Stop-loss cash value across markets
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          One typical stop distance on each instrument, at a single contract or
          lot, shows how fast cash risk scales. These use the same real contract
          specs as the calculator above.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-card text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Market</th>
                <th className="px-4 py-3 font-semibold">Value per unit</th>
                <th className="px-4 py-3 font-semibold">Example stop</th>
                <th className="px-4 py-3 font-semibold">Cash risk</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {["nq-nasdaq", "es-s-and-p-500", "us30-dow-jones", "btc-bitcoin", "eth-ethereum", "xau-gold", "eur-usd"].map(
                (slug) => {
                  const a = ASSETS.find((x) => x.slug === slug);
                  if (!a) return null;
                  const stopDist = Math.abs(a.defaultEntry - a.defaultStop);
                  const totalRisk = stopDist * a.tickValue;
                  return (
                    <tr key={slug}>
                      <td className="px-4 py-2.5 font-medium">{a.symbol}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        ${a.tickValue} per{" "}
                        {a.pointLabel === "$" ? "$1 move" : a.pointLabel}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {stopDist.toLocaleString()}{" "}
                        {a.pointLabel === "$" ? "dollars" : a.pointLabel}
                      </td>
                      <td className="px-4 py-2.5 font-medium text-primary">
                        ${totalRisk.toLocaleString()}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Example: a 150-point stop on one NQ contract costs $3,000. On a
          $100,000 account that is 3% of the balance — already above most prop
          firms&apos; 1% per-trade cap, which is why you size down or tighten the
          stop.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Per-market calculators
        </h2>
        <div className="mt-6">
          <AssetGrid />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Stop loss FAQ
        </h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-5">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-border/60 bg-card p-5">
              <h3 className="font-semibold text-foreground">{f.q}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <JsonLd
        data={faqJsonLd({
          url,
          questions: faqs.map((f) => ({ question: f.q, answer: f.a })),
        })}
      />
      <JsonLd
        data={softwareApplicationJsonLd({
          name: "Stop Loss Calculator",
          description:
            "Free stop loss calculator: convert any entry, stop and size into the exact dollar risk on NQ, ES, forex and crypto, no signup.",
          url,
          keywords: ["stop loss calculator", "stop loss pips", "dollar risk calculator", "prop firm stop loss"],
        })}
      />
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Stop Loss Calculator", path: "/stop-loss-calculator" },
        ])}
      />
    </div>
  );
}
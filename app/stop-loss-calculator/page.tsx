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
} from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const url = absoluteUrl("/stop-loss-calculator");

export const metadata: Metadata = {
  title: "Stop Loss Calculator – Dollar Risk for NQ, ES, Forex & Crypto",
  description:
    "Calculate exactly how much cash your stop-loss risks on NQ, ES, forex and crypto before entering a trade. Free prop-firm stop loss calculator, no signup.",
  alternates: {
    canonical: url,
    languages: { en: url, "x-default": url },
  },
  openGraph: {
    type: "website",
    siteName: "RiskCalc",
    title: "Stop Loss Calculator – Dollar Risk for NQ, ES, Forex & Crypto",
    description:
      "Turn a stop distance into real dollars: entry, stop, size and the exact cash on the line for any prop-firm instrument.",
    url,
  },
  twitter: { card: "summary_large_image" },
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

      <div className="mt-10">
        <StopLossCalculator />
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
          the daily drawdown limit.
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
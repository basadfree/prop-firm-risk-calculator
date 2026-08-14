import type { Metadata } from "next";
import Link from "next/link";
import { LotSizeCalculator } from "@/components/LotSizeCalculator";
import { AssetGrid } from "@/components/AssetGrid";
import { ASSETS } from "@/lib/assets";
import { JsonLd } from "@/components/JsonLd";
import {
  faqJsonLd,
  breadcrumbJsonLd,
  webSiteJsonLd,
} from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const url = absoluteUrl("/lot-size-calculator");

export const metadata: Metadata = {
  title: "Lot Size Calculator for Prop Firms – Forex, Futures & Crypto",
  description:
    "Calculate the exact lot size, contract count or coin size for your account balance and stop distance. Free prop-firm lot size calculator for NQ, ES, forex, gold and crypto, no signup.",
  alternates: {
    canonical: url,
    languages: { en: url, "x-default": url },
  },
  openGraph: {
    type: "website",
    siteName: "RiskCalc",
    title: "Lot Size Calculator for Prop Firms – Forex, Futures & Crypto",
    description:
      "Turn your stop distance and risk % into the exact lots or contracts to trade on any prop-firm instrument.",
    url,
  },
  twitter: { card: "summary_large_image" },
};

const faqs = [
  {
    q: "How do I calculate my lot size?",
    a: "Divide your dollar risk (account balance × risk %) by the cash value of your stop distance per lot or contract. Dollar risk = stop distance × value per unit. For example on EUR/USD with $1,000 risk and a 20-pip stop: 1,000 ÷ (20 × $10) = 5 standard lots.",
  },
  {
    q: "What is the difference between lot size and position size?",
    a: "Lot size is the unit of quantity for a position. One standard forex lot = 100,000 units of base currency ($10 per pip on EUR/USD), one mini lot = 10,000 ($1 per pip), one micro lot = 1,000 ($0.10 per pip). Position size is that same quantity expressed as lots, contracts or coins for the instrument you trade.",
  },
  {
    q: "How big should my lot size be for prop firm trading?",
    a: "Size so that your stop-loss cash risk stays between 0.5% and 1% of the account — the same range most prop firms use for their daily drawdown cap. Never size to a fixed dollar per pip; always derive size backwards from a fixed percentage risk.",
  },
  {
    q: "What lot size can I trade with $1,000 risk?",
    a: "It depends on the stop distance. On EUR/USD a 20-pip stop with $1,000 at risk allows 5 standard lots (50 mini lots). On NQ a 150-point stop costs $3,000 per contract, so $1,000 of risk cannot trade a full contract at that distance — you would need a tighter stop or a micro contract.",
  },
  {
    q: "Why does lot size matter more than stop distance?",
    a: "Because it converts your stop into real money. A 10-point stop on NQ costs $200 per contract; on ES it costs $500. The same stop distance changes your cash risk based purely on the instrument's value per point — lot size is the lever that keeps that cash risk inside your prop firm limit.",
  },
  {
    q: "What is the difference between lot size and contract size?",
    a: "Lot size is the forex quantity unit — one standard lot = 100,000 units ($10 per pip on EUR/USD), one mini = 10,000 ($1 per pip), one micro = 1,000 ($0.10 per pip). Contract size is the equivalent fixed quantity for futures, like one NQ contract = $20 per point or one ES = $50 per point. In both cases the number converts price distance into dollar risk — lot size is just the name forex uses and contract size the name futures uses.",
  },
  {
    q: "How many contracts can I trade on NQ, ES or MNQ with $1,000 risk?",
    a: "Divide $1,000 by the stop's cash value per contract. At a 50-point stop, NQ costs $1,000 per contract (50 × $20) so you get one contract, ES costs $2,500 (50 × $50) so you get less than one — a micro — and MNQ costs $100 (50 × $2) so you can trade ten. Know the contract multiplier before sizing any futures trade.",
  },
];

export default function LotSizeCalculatorPage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Free tool · No signup
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
          Lot Size Calculator — Trade the Right Size, Every Time
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Lot size is the missing number between &ldquo;I&rsquo;ll risk 1%&rdquo; and
          actually opening the trade. Enter your account balance, risk
          percentage and stop distance for NQ, ES, forex pairs, gold or crypto,
          and get the exact lots or contracts that keep every loss inside your
          prop firm drawdown limit.
        </p>
      </div>

      <div className="mt-10">
        <LotSizeCalculator />
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border/60 bg-card p-6">
        <h2 className="text-lg font-semibold">
          Lots, contracts and coins — the same math
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Whatever market you trade, position size comes from one formula:
          size = (account balance × risk%) ÷ (stop distance × value per unit).
          For forex that result is standard lots, for futures it is contracts,
          and for crypto it is coins. The{" "}
          <Link
            href="/guides/prop-position-sizing"
            className="font-medium text-primary hover:underline"
          >
            position sizing guide
          </Link>{" "}
          explains the logic behind each step, and the{" "}
          <Link
            href="/pip-value-calculator"
            className="font-medium text-primary hover:underline"
          >
            pip value calculator
          </Link>{" "}
          covers the per-pip numbers for every forex pair.
        </p>
      </div>

      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-lg font-semibold">
          Lot size at 1% risk across markets
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Using each instrument&apos;s real contract specs, this shows the cash risk
          of one lot or contract at a typical stop, and how many units a
          $100,000 account at 1% risk can afford.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-card text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Market</th>
                <th className="px-4 py-3 font-semibold">Value per unit</th>
                <th className="px-4 py-3 font-semibold">Example stop</th>
                <th className="px-4 py-3 font-semibold">Risk / unit</th>
                <th className="px-4 py-3 font-semibold">Max units @1%</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {["nq-nasdaq", "es-s-and-p-500", "us30-dow-jones", "btc-bitcoin", "eth-ethereum", "xau-gold", "eur-usd"].map(
                (slug) => {
                  const a = ASSETS.find((x) => x.slug === slug);
                  if (!a) return null;
                  const stopDist = Math.abs(a.defaultEntry - a.defaultStop);
                  const riskPerUnit = stopDist * a.tickValue;
                  const maxUnits = Math.floor(1000 / riskPerUnit);
                  return (
                    <tr key={slug}>
                      <td className="px-4 py-2.5 font-medium">{a.symbol}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        ${a.tickValue} per{" "}
                        {a.pointLabel === "$" ? "$1" : a.pointLabel.replace(/s$/, "")}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {stopDist.toLocaleString()}{" "}
                        {a.pointLabel === "$" ? "dollars" : a.pointLabel}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        ${riskPerUnit.toLocaleString()} / {a.positionUnit === "contracts" ? "contract" : a.positionUnit === "lots" ? "lot" : a.positionUnit}
                      </td>
                      <td className="px-4 py-2.5 font-medium text-primary">
                        {maxUnits > 0 ? maxUnits.toLocaleString() : "&lt;1"}{" "}
                        {a.positionUnit}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Example: a 150-point stop on one NQ contract costs $3,000, so at 1%
          of a $100,000 account you can only trade micros at that distance.
          Tighten the stop or size down — the calculator above does both
          instantly.
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
          Lot size FAQ
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
          { name: "Lot Size Calculator", path: "/lot-size-calculator" },
        ])}
      />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ContractSizeCalculator } from "@/components/ContractSizeCalculator";
import { AssetGrid } from "@/components/AssetGrid";
import { ASSETS } from "@/lib/assets";
import { JsonLd } from "@/components/JsonLd";
import {
  faqJsonLd,
  breadcrumbJsonLd,
  webSiteJsonLd,
} from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const url = absoluteUrl("/contract-size-calculator");

export const metadata: Metadata = {
  title:
    "Contract Size Calculator for Futures – NQ, ES, Gold & Forex Contract Multipliers",
  description:
    "Look up the contract size and multiplier for NQ, ES, US30, gold, forex and crypto futures, with the cash value of each point or pip. Free prop-firm contract size calculator, no signup.",
  alternates: {
    canonical: url,
    languages: { en: url, "x-default": url },
  },
  openGraph: {
    type: "website",
    siteName: "RiskCalc",
    title:
      "Contract Size Calculator for Futures – NQ, ES, Gold & Forex Contract Multipliers",
    description:
      "Every futures contract size and point value, converted to the dollar risk it creates on your prop-firm account.",
    url,
  },
  twitter: { card: "summary_large_image" },
};

const faqs = [
  {
    q: "What does contract size mean in futures trading?",
    a: "Contract size is the fixed quantity a futures contract represents — for example one NQ contract covers the E-mini Nasdaq 100 at $20 per index point. It is the multiplier that converts price movement into dollar P&L, which is why two instruments with the same stop distance can create very different cash risk.",
  },
  {
    q: "How do I calculate the contract size of a futures product?",
    a: "Look up the contract multiplier: NQ is $20 per point, MNQ is $2, ES is $50, US30 is $5, gold (XAU/USD) is $100 per $1 move per lot, and EUR/USD is $10 per pip per standard lot. That multiplier times your stop distance equals the cash risk of one contract or lot.",
  },
  {
    q: "Is the S&P 500 futures contract size the same as Nasdaq?",
    a: "No. The E-mini S&P 500 (ES) has a $50 per point multiplier while the E-mini Nasdaq 100 (NQ) is $20 per point. A 50-point stop therefore costs $2,500 on ES but only $1,000 on NQ — always check the multiplier before sizing a trade.",
  },
  {
    q: "What is the micro ES futures contract size?",
    a: "The Micro E-mini S&P 500 is one-tenth of the ES at $5 per point per contract. The Micro Nasdaq 100 (MNQ) is also one-tenth of the NQ at $2 per point. Micros let small prop-firm accounts trade the same index with a fraction of the cash risk.",
  },
  {
    q: "Does contract size affect my prop firm position sizing?",
    a: "Completely. Your position size is dollar risk divided by (stop distance × contract size multiplier). A larger multiplier means fewer contracts for the same risk — contract size is the first number to check before you enter any funded-account trade.",
  },
];

export default function ContractSizeCalculatorPage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Free tool · No signup
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
          Contract Size Calculator — Every Futures Multiplier, in Dollars
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Contract size is the multiplier that turns a price move into cash.
          Pick NQ, ES, US30, gold, forex or crypto and instantly see the
          contract multiplier, value per point or pip, and the notional size
          you are actually trading — the numbers every prop-firm position size
          decision starts from.
        </p>
      </div>

      <div className="mt-10">
        <ContractSizeCalculator />
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border/60 bg-card p-6">
        <h2 className="text-lg font-semibold">
          From contract size to position size
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Once you know the value per point or pip of your contract, the next
          step is sizing: position size = dollar risk ÷ (stop distance × value
          per unit). Use the{" "}
          <Link
            href="/lot-size-calculator"
            className="font-medium text-primary hover:underline"
          >
            lot size calculator
          </Link>{" "}
          to get the exact contracts, or read the{" "}
          <Link
            href="/guides/prop-position-sizing"
            className="font-medium text-primary hover:underline"
          >
            position sizing guide
          </Link>{" "}
          for the full logic behind each formula.
        </p>
      </div>

      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-lg font-semibold">
          Cash risk of one contract at a typical stop
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Using the real contract multipliers above, this is the dollar risk of
          a single contract or lot at a 50-point (or 20-pip) stop.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-card text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Market</th>
                <th className="px-4 py-3 font-semibold">Multiplier</th>
                <th className="px-4 py-3 font-semibold">50-pt / 20-pip risk</th>
                <th className="px-4 py-3 font-semibold">Max units @$1,000</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {["nq-nasdaq", "es-s-and-p-500", "us30-dow-jones", "btc-bitcoin", "eth-ethereum", "xau-gold", "eur-usd"].map(
                (slug) => {
                  const a = ASSETS.find((x) => x.slug === slug);
                  if (!a) return null;
                  const stop = a.pointLabel === "pips" ? 20 : 50;
                  const risk = stop * a.tickValue;
                  const maxUnits = Math.floor(1000 / risk);
                  return (
                    <tr key={slug}>
                      <td className="px-4 py-2.5 font-medium">
                        {a.symbol} — {a.name}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        ${a.tickValue} per{" "}
                        {a.pointLabel === "$" ? "$1" : a.pointLabel.replace(/s$/, "")}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        ${risk.toLocaleString()}
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
          The same 50-point stop costs $1,000 on NQ but $2,500 on ES. Know the
          multiplier, then size to your drawdown — the calculator above gives
          both in one view.
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
          Contract size FAQ
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
          { name: "Contract Size Calculator", path: "/contract-size-calculator" },
        ])}
      />
    </div>
  );
}

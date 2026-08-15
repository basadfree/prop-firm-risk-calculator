import type { Metadata } from "next";
import Link from "next/link";
import { LeverageCalculator } from "@/components/LeverageCalculator";
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

const url = absoluteUrl("/leverage-calculator");

export const metadata: Metadata = {
  title: "Leverage Calculator: Margin, Notional & Lot Size",
  description:
    "See exactly how much margin your broker locks up and the position value you control at any leverage ratio. Free leverage & margin calculator, no signup.",
  alternates: {
    canonical: url,
    languages: { en: url, "x-default": url },
  },
  openGraph: {
    type: "website",
    siteName: "RiskCalc",
    title: "Leverage Calculator: Margin, Notional & Lot Size",
    description:
      "Convert position size and leverage into the exact margin required and the exposure you control on any market.",
    url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Leverage Calculator: Margin, Notional & Lot Size",
    description:
      "Convert position size and leverage into the exact margin required and the exposure you control on any market.",
  },
};

const faqs = [
  {
    q: "How do I calculate leverage in forex?",
    a: "Leverage = position value ÷ required margin. For example one standard EUR/USD lot is worth $108,500 at 1.0850; at 1:100 leverage the margin is $1,085, so leverage = 108,500 ÷ 1,085 = 100. You control $100 of exposure for every $1 of margin.",
  },
  {
    q: "What is the difference between leverage and margin?",
    a: "Leverage is the ratio of position value to margin (for example 1:100). Margin is the actual cash your broker locks up to open the position. Higher leverage means smaller margin for the same position — and a faster path to a margin call when the trade moves against you.",
  },
  {
    q: "Does leverage change my risk per trade?",
    a: "No. Your dollar risk is decided by the stop-loss distance and position size, not by leverage. Leverage only decides how much margin is locked up. That is why prop firms care about position sizing and drawdown, not about offering high leverage.",
  },
  {
    q: "How is required margin calculated?",
    a: "Required margin = position value ÷ leverage. Position value for one standard lot of EUR/USD is 100,000 × price; for one NQ contract it is the index price × $20 per point; for gold it is 100 troy ounces × price. Enter a position size and leverage in the calculator above to get the exact margin.",
  },
  {
    q: "What leverage should a prop firm trader use?",
    a: "Prop firm accounts cap your risk with daily and max drawdown limits, so the leverage ratio barely matters — what matters is size. Trade the lot or contract size your risk % allows. Using excessive leverage only means a small adverse move eats a larger share of the account before your stop fills.",
  },
];

export default function LeverageCalculatorPage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Free tool · No signup
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
          Leverage Calculator — Margin &amp; Exposure, in Dollars
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          &ldquo;How much leverage?&rdquo; is the wrong question — the right one is
          &ldquo;how much margin does my position lock up?&rdquo; Enter a position
          size and leverage for NQ, ES, forex, gold or crypto and see the exact
          notional value you control and the margin your broker holds, for any
          market and any ratio.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-border/60 bg-card p-6">
        <h2 className="text-lg font-semibold">
          How much margin does my position require?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Margin = position value ÷ leverage. One standard EUR/USD lot is worth
          100,000 × the price; at 1:100 leverage the margin is that notional
          divided by 100. Leverage sets the margin locked up, not your risk —
          your stop distance and position size decide the dollars at risk,
          which is why prop firms measure drawdown instead.
        </p>
      </div>

      <div className="mt-10">
        <LeverageCalculator />
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border/60 bg-card p-6">
        <h2 className="text-lg font-semibold">
          Leverage decides margin, not risk
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A common mistake is believing high leverage makes a trade riskier.
          It doesn&apos;t — the stop-loss and size do. Leverage only changes how
          much cash your broker locks as margin, which is why prop firms measure
          you on drawdown, not leverage. The{" "}
          <Link
            href="/lot-size-calculator"
            className="font-medium text-primary hover:underline"
          >
            lot size calculator
          </Link>{" "}
          turns your risk % into the exact size to trade, and the{" "}
          <Link
            href="/guides/prop-position-sizing"
            className="font-medium text-primary hover:underline"
          >
            position sizing guide
          </Link>{" "}
          explains the full math.
        </p>
      </div>

      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-lg font-semibold">
          Margin at 1:100 across markets
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Using each instrument&apos;s real contract multiplier, this shows the
          dollar value of one unit at a typical price and the margin a 1:100
          broker locks up.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-card text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Market</th>
                <th className="px-4 py-3 font-semibold">Unit</th>
                <th className="px-4 py-3 font-semibold">1-unit value</th>
                <th className="px-4 py-3 font-semibold">Margin @ 1:100</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ASSETS.map((a) => {
                const mult =
                  a.type === "forex"
                    ? 100000
                    : a.type === "commodity"
                      ? 100
                      : 1;
                const notional =
                  a.type === "index"
                    ? a.defaultEntry * a.tickValue
                    : a.defaultEntry * mult;
                return (
                  <tr key={a.slug}>
                    <td className="px-4 py-2.5 font-medium">{a.symbol}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {a.positionUnit}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      ${notional.toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-primary">
                      ${(notional / 100).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          A 1:100 broker locks 1% of the position value as margin. Raise the
          ratio to 1:200 and the margin halves — your risk per trade is still
          set by the stop and size.
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
          Leverage &amp; margin FAQ
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
          name: "Leverage Calculator",
          description:
            "Free leverage and margin calculator for forex, futures, gold and crypto: see the notional value you control and the exact margin your broker locks up, no signup.",
          url,
          keywords: ["leverage calculator", "margin calculator", "forex leverage", "prop firm leverage"],
        })}
      />
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Leverage Calculator", path: "/leverage-calculator" },
        ])}
      />
    </div>
  );
}

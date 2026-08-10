import type { Metadata } from "next";
import Link from "next/link";
import { MaxDrawdownCalculator } from "@/components/MaxDrawdownCalculator";
import { AssetGrid } from "@/components/AssetGrid";
import { JsonLd } from "@/components/JsonLd";
import {
  faqJsonLd,
  breadcrumbJsonLd,
  webSiteJsonLd,
} from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const url = absoluteUrl("/max-drawdown-calculator");

export const metadata: Metadata = {
  title: "Max Drawdown Calculator for Prop Firms – Daily Loss Limit & Trailing",
  description:
    "Convert your prop firm daily loss limit and max drawdown percentages into exact dollar buffers. Free static & trailing drawdown calculator for funded accounts, no signup.",
  alternates: {
    canonical: url,
    languages: { en: url, "x-default": url },
  },
  openGraph: {
    type: "website",
    siteName: "RiskCalc",
    title: "Max Drawdown Calculator for Prop Firms – Daily Loss Limit & Trailing",
    description:
      "Know the exact dollar amount between your balance and a failed funded account.",
    url,
  },
  twitter: { card: "summary_large_image" },
};

const faqs = [
  {
    q: "How is max drawdown calculated in a prop firm?",
    a: "Max drawdown is the total equity loss allowed before the account is failed. For a static structure it is measured from the starting balance (a 10% max drawdown on $100,000 breaches at $90,000). For a trailing structure it is measured from the highest balance reached (an equity high of $110,000 resets the floor to $99,000). The calculator above computes both in dollars.",
  },
  {
    q: "What is the difference between daily loss limit and max drawdown?",
    a: "The daily loss limit caps losses within a single trading day (typically 4–5% of the starting or previous end-of-day balance) and resets every day. The max drawdown caps the overall equity decline from the starting or highest balance and accumulates until the account is closed. The daily limit is the one most funded accounts actually hit first.",
  },
  {
    q: "How do I avoid breaching the daily loss limit?",
    a: "Size every trade so its stop-loss costs no more than 0.5–1% of the account. If the daily limit is 5%, a 1% risk per trade leaves room for four full losing trades in a day. Never scale in or move stops further out, because both silently increase the cash risk against the daily cap.",
  },
  {
    q: "What does a trailing max drawdown mean in practice?",
    a: "A trailing drawdown locks in your best equity. Once your balance reaches a new high, the loss limit recalculates from that higher level and never moves back down. A trailing 10% after reaching $110,000 means failure at $99,000, even though that is still above your original $100,000 deposit.",
  },
  {
    q: "Is max drawdown calculated from balance or equity?",
    a: "Almost always from equity, and for the daily limit from the previous day's end-of-day balance. Real-time floating equity (open positions) counts against both limits as it moves, which is why most firms warn you to never hold large floating losses overnight.",
  },
];

export default function MaxDrawdownCalculatorPage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Free tool · No signup
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
          Max Drawdown Calculator — Know Your Breach Levels in Dollars
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Every funded account fails one of two ways: a single day that exceeds
          the daily loss limit, or an equity slide past the max drawdown. Enter
          your balance and both percentages, and this calculator shows the exact
          dollar buffers — for static and trailing structures — before you risk
          a single trade.
        </p>
      </div>

      <div className="mt-10">
        <MaxDrawdownCalculator />
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border/60 bg-card p-6">
        <h2 className="text-lg font-semibold">
          The two rules every prop firm actually enforces
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The daily loss limit resets every day and catches reckless single
          trades; the max drawdown compounds and catches slow leaks. Together
          they define how large a position you can open — so the{" "}
          <Link
            href="/lot-size-calculator"
            className="font-medium text-primary hover:underline"
          >
            lot size calculator
          </Link>{" "}
          works hand in hand with these numbers: size each stop so it stays far
          inside the daily buffer. Our{" "}
          <Link
            href="/guides/prop-max-drawdown"
            className="font-medium text-primary hover:underline"
          >
            drawdown guide
          </Link>{" "}
          goes deeper into how firms define and reset these limits.
        </p>
      </div>

      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-lg font-semibold">
          Typical prop firm drawdown structures
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Most evaluation and funded programs sit inside a familiar band. The
          numbers below are typical ranges — always read your firm&apos;s exact
          rules before sizing.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-card text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Rule</th>
                <th className="px-4 py-3 font-semibold">Typical range</th>
                <th className="px-4 py-3 font-semibold">On a $100k account</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2.5 font-medium">Daily loss limit</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  4–5% of balance or end-of-day equity
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">$4,000–$5,000</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium">Max drawdown</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  8–10% static or trailing
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">$8,000–$10,000</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium">Suggested risk / trade</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  0.5–1% of account
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">$500–$1,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          A 1% risk per trade is 4–5× below a 5% daily limit and ~10× below a
          10% max drawdown — the margin of error most funded traders need to
          survive a normal losing week.
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
          Max drawdown FAQ
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
          { name: "Max Drawdown Calculator", path: "/max-drawdown-calculator" },
        ])}
      />
    </div>
  );
}

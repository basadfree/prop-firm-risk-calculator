import type { Metadata } from "next";
import Link from "next/link";
import { PipValueCalculator } from "@/components/PipValueCalculator";
import { AssetGrid } from "@/components/AssetGrid";
import { JsonLd } from "@/components/JsonLd";
import {
  faqJsonLd,
  breadcrumbJsonLd,
  webSiteJsonLd,
} from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const url = absoluteUrl("/pip-value-calculator");

export const metadata: Metadata = {
  title: "Pip Value Calculator – Tick Value for NQ, ES, Forex & Crypto",
  description:
    "Find out how much one point, tick or pip is worth for NQ, ES, forex and crypto before you size a trade. Free prop-firm pip value calculator, no signup.",
  alternates: {
    canonical: url,
    languages: { en: url, "x-default": url },
  },
  openGraph: {
    type: "website",
    siteName: "RiskCalc",
    title: "Pip Value Calculator – Tick Value for NQ, ES, Forex & Crypto",
    description:
      "Check the dollar value of one point, tick or pip for any instrument, then multiply it out to your actual stop distance.",
    url,
  },
  twitter: { card: "summary_large_image" },
};

const faqs = [
  {
    q: "What is a pip value?",
    a: "A pip value is the dollar amount gained or lost per one pip of price movement. For EUR/USD it is usually $10 per standard lot; for indices like NQ it is $20 per point per contract. Knowing this number is the first step to correct position sizing.",
  },
  {
    q: "Why does tick value matter for prop firm trading?",
    a: "Because your risk is the stop distance times the tick value. The same 10-pip stop costs $100 on one instrument and $200 on another. Risking a fixed dollar amount per trade only works when you know each instrument's per-unit value.",
  },
  {
    q: "How do I calculate pip value myself?",
    a: "Multiply the contract value per point/pip (your broker's 'value per tick') by your position size, then by the number of points/pips in your stop. This calculator does that automatically for common markets.",
  },
  {
    q: "Is the pip value the same for all forex pairs?",
    a: "No. Pairs quoted to 5 decimals have a pip of 0.0001 (0.01 for JPY pairs), and the dollar value depends on the quote currency. This tool uses standard specs for the instruments it supports.",
  },
];

export default function PipValuePage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Free tool · No signup
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
          Pip Value &amp; Tick Value Calculator
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          See exactly how much one point, pip or tick of movement is worth for
          NQ, ES, forex pairs and crypto — then multiply it out to your real
          stop distance. The number every prop-firm position size depends on.
        </p>
      </div>

      <div className="mt-10">
        <PipValueCalculator />
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border/60 bg-card p-6">
        <h2 className="text-lg font-semibold">
          From pip value to position size
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Position size = risk amount ÷ (stop distance × value per unit). Once
          you know the value per point or pip, feed it into the{" "}
          <Link
            href="/guides/prop-position-sizing"
            className="font-medium text-primary hover:underline"
          >
            position sizing calculator
          </Link>{" "}
          to get the exact contracts or lots that keep your loss inside the
          prop firm&apos;s daily drawdown.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Per-market pip &amp; tick values
        </h2>
        <div className="mt-6">
          <AssetGrid />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Pip value FAQ
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
          { name: "Pip Value Calculator", path: "/pip-value-calculator" },
        ])}
      />
    </div>
  );
}
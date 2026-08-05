import Link from "next/link";
import { Calculator, Clock, Gauge, ImageDown, ShieldCheck, Zap } from "lucide-react";
import { PositionSizeCalculator } from "@/components/calculator/PositionSizeCalculator";
import { AssetGrid } from "@/components/AssetGrid";
import { FAQSection, FAQ_ITEMS } from "@/components/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { faqJsonLd, softwareApplicationJsonLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

export const metadata = {
  description:
    "Free prop-firm position size calculator. Compute exact lots, contracts and coins for NQ, MNQ, BTC, ETH, Gold and Forex based on account balance, risk % and stop-loss.",
};

const FEATURES = [
  {
    icon: Zap,
    title: "Instant, Real-Time Math",
    text: "Position size, total risk and R:R update on every keystroke. No buttons, no page reloads.",
  },
  {
    icon: ShieldCheck,
    title: "Prop-Firm Drawdown Guard",
    text: "See exactly how much of your 5% daily loss limit a single trade consumes before you enter it.",
  },
  {
    icon: ImageDown,
    title: "Shareable Trade Plans",
    text: "Export any calculation as a clean PNG for Twitter/Discord or a printable PDF for your journal.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-border/60">
        <div className="bg-market-grid absolute inset-0" aria-hidden="true" />
        <div className="glow-emerald absolute inset-x-0 top-[-120px] mx-auto h-[360px] max-w-3xl" aria-hidden="true" />
        <div className="container relative py-16 text-center sm:py-24">
          <Badge variant="outline" className="mb-5 border-primary/40 text-primary">
            Built for Prop Firms · SMC · ICT
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Prop-Firm Risk Management{" "}
            <span className="text-primary">&amp; Position Size Calculator</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Calculate the exact lots, contracts and coins to trade based on your
            account balance, risk per trade and stop-loss — and stay inside your
            daily drawdown limit, every single trade.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#calculator"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              <Calculator className="h-4 w-4" />
              Open Calculator
            </Link>
            <Link
              href="/calculator/nq-nasdaq"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-input px-8 text-sm font-medium transition-colors hover:bg-accent"
            >
              NQ Calculator
            </Link>
          </div>
          <dl className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-2xl font-bold text-primary">6+</dt>
              <dd className="text-muted-foreground">Markets</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-primary">0</dt>
              <dd className="text-muted-foreground">Page reloads</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-primary">Free</dt>
              <dd className="text-muted-foreground">Forever</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="scroll-mt-20 py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
              <Clock className="h-4 w-4" /> Real-time position sizing
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Size your trade in seconds
            </h2>
            <p className="mt-3 text-muted-foreground">
              Enter your account details and the tool instantly returns position
              size, dollar risk and drawdown usage.
            </p>
          </div>
          <PositionSizeCalculator />
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border/60 bg-card/40 py-16 sm:py-20">
        <div className="container grid gap-5 md:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="border-border/60 bg-background">
              <CardContent className="p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Asset calculators grid */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Position size calculators by market
            </h2>
            <p className="mt-3 text-muted-foreground">
              Dedicated calculators with pre-filled contract values and realistic
              prices for every instrument.
            </p>
          </div>
          <AssetGrid />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-border/60 bg-card/40 py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Risk Management FAQ
            </h2>
            <p className="mt-3 text-muted-foreground">
              The five questions every prop firm, SMC and ICT trader asks.
            </p>
          </div>
          <FAQSection />
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            softwareApplicationJsonLd({
              name: "Prop-Firm & SMC Risk Management Calculator",
              description:
                "Free position size and risk management calculator for prop firm traders. Computes lots, contracts and coins for NQ, MNQ, BTC, ETH, Gold and Forex.",
              url: absoluteUrl("/"),
              keywords: [
                "position size calculator",
                "prop firm risk calculator",
                "SMC risk management",
              ],
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd({
              url: absoluteUrl("/#faq"),
              questions: FAQ_ITEMS.map((i) => ({
                question: i.question,
                answer: i.answer,
              })),
            }),
          ),
        }}
      />
    </div>
  );
}

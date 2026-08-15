import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, AUTHOR, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import {
  webSiteJsonLd,
  organizationJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/jsonld";

const guideSlug = "prop-profit-target";
const guideUrl = absoluteUrl(`/guides/${guideSlug}`);

export function generateMetadata(): Metadata {
  return {
    title:
      "Profit Target on Prop Accounts: How Much?",
    description:
      "Prop firms set profit targets like 8–10% (phase one) and 4–5% (verification). Learn how the 80/20 split works and how leverage changes the size of the target.",
    alternates: {
      canonical: guideUrl,
      languages: { en: guideUrl, "x-default": guideUrl },
    },
    openGraph: {
      title:
        "Profit Target on Prop Accounts: What Do You Actually Need?",
      description:
        "Profit targets, the 80/20 split, what is left to reach and how leverage changes the real size of the goal.",
      url: guideUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Profit Target on Prop Accounts: What Do You Actually Need?",
      description:
        "Profit targets, the 80/20 split, what is left to reach and how leverage changes the real size of the goal.",
    },
  };
}

const guideFaqs = [
  {
    question: "What is a typical profit target on a prop firm evaluation?",
    answer:
      "The most common structure is 8–10% profit for phase one (the challenge) and 4–5% for phase two (verification). Some firms use a one-step program with a single 8–10% target. The exact number varies by firm and tier, but the pattern of a bigger first target and a smaller confirmation target is widespread.",
  },
  {
    question: "How does the 80/20 profit split work?",
    answer:
      "The split describes how profit on your funded account is divided: 80% goes to you and 20% stays with the firm. On a $1,000 profit, you keep $800 and the firm keeps $200. Many firms scale the split upward to 90–95% on higher tiers or after consistent profitable months.",
  },
  {
    question: "How do I calculate how much profit I still need?",
    answer:
      "Multiply your account size by the remaining percentage to your target. On a $100,000 account at $94,000 equity with an 8% target, you need $8,000 total, so $94,000 − $92,000 = $2,000 remains — 2% of the starting balance. Always calculate the remaining amount from the starting balance, not from your current equity.",
  },
  {
    question: "Does leverage affect the profit target?",
    answer:
      "Leverage does not change the percentage target, but it changes how fast you can reach it. Higher leverage lets the same position size control more notional value, which speeds up both gains and losses. With prop firms offering 1:30 to 1:100 leverage on forex (and exchange-set margins on futures), the practical size of the target depends on the notional you can deploy.",
  },
  {
    question: "Should I rush to hit the profit target?",
    answer:
      "No. The target is a ceiling for your journey, not a deadline to gamble against. Traders who size up to rush the target breach the daily loss limit first — usually in a single oversized red day. Risk 0.5–1% per trade and let the target come from consistent small wins.",
  },
  {
    question: "How many profitable days does a typical 8% target take?",
    answer:
      "If you average 0.5–1% net per day with a disciplined approach, an 8% target realistically takes roughly 8 to 16 trading days of consistent execution. Streaks of losing days extend that window, which is why the daily loss limit — not the target — is what most traders fail on.",
  },
];

export default function PropProfitTargetPage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Profit Target on Prop Accounts: How Much Do You Actually Need?",
          description:
            "Profit targets, the 80/20 split, how to calculate what remains, and how leverage changes the real size of the goal.",
          url: guideUrl,
          inLanguage: "en",
          image: AUTHOR.logo,
          datePublished: "2026-08-14",
          dateModified: "2026-08-14",
          author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
          publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Profit Target Guide", path: `/guides/${guideSlug}` },
        ])}
      />
      <JsonLd data={faqJsonLd({ url: guideUrl, questions: guideFaqs })} />

      <article className="container mx-auto max-w-4xl px-4 pb-16 pt-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden> / </li>
            <li className="truncate text-foreground">Profit Target Guide</li>
          </ol>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          Ultimate Guide · 2026
        </p>
        <h1 className="text-balance mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Profit Target on Prop Accounts: How Much Do You Actually Need?
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Every evaluation comes with a number to hit: 8%, 10%, then 4–5% to verify.
          Traders obsess over it, but the target is rarely the thing that ends the
          account — the daily loss limit is. This guide breaks down how targets and
          splits are structured, how to compute exactly what you still need, and how
          leverage changes the real size of the goal.
        </p>

        <h2 className="mt-8 text-2xl font-bold tracking-tight">
          What is a typical prop firm profit target?
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The most common structure is 8–10% profit for phase one (the
          challenge) and 4–5% for phase two (verification); some one-step
          programs use a single 8–10% target. On a $100,000 account that means
          $8,000–$10,000, then $4,000–$5,000. The exact number varies by firm
          and tier, but a bigger first target followed by a smaller confirmation
          target is the industry norm.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <img
              src={AUTHOR.logo}
              alt={AUTHOR.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border bg-card object-contain p-1"
            />
            <div>
              <p>
                Written by{" "}
                <Link href="/about" className="font-medium text-foreground hover:underline">
                  {AUTHOR.name}
                </Link>
              </p>
              <p>
                Updated <time dateTime="2026-08-14">August 14, 2026</time>
              </p>
            </div>
          </div>
          <DownloadPdfButton />
        </div>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          How prop profit targets are structured
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The classic two-phase evaluation asks for{" "}
          <strong className="text-foreground">8–10% profit in phase one</strong>{" "}
          (the challenge) and then{" "}
          <strong className="text-foreground">4–5% in phase two</strong>{" "}
          (verification). One-step programs collapse this into a single target,
          usually around 8–10%, with a smaller consistency or time requirement in
          exchange. The target is always calculated against the{" "}
          <strong className="text-foreground">starting balance</strong> of the phase,
          not against your current equity — so a $100,000 phase-one account needs
          $8,000 of total profit regardless of the path you took to get there.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The 80/20 split and how the target becomes payout
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Once funded, your profit is divided by the split — most commonly{" "}
          <strong className="text-foreground">80% to you, 20% to the firm</strong>,
          rising to 90–95% on higher tiers. On a $1,000 month of profit at 80/20 you
          keep $800. The split applies to payout requests, not to the evaluation
          target, which is why traders sometimes confuse "10% target" with "10% I take
          home" — the target is gross profit on the account, while what you keep is
          that profit multiplied by your split.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          How to calculate how much you still need
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Use the starting balance of the phase as your base. The total needed is
          starting balance × target%. What remains is that total minus the profit you
          have already made:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm leading-relaxed text-primary">
{`Account size   = $100,000
Target         = 8%       →  total needed = $8,000
Current equity = $102,000 →  profit made  = $2,000
Remaining      = $8,000 − $2,000 = $6,000  →  6% of the starting balance`}
        </pre>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Now suppose the same account sits at $94,000 — 6% down from the start. The
          target is still $8,000 of profit, so you need $8,000 + $6,000 = $14,000 in
          gains from your current equity. That is a 14.9% run from where you are. The
          account is mathematically still passable, but the required run has become
          brutal, which is why protecting the first drawdown percentage is the most
          valuable thing you can do.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          What leverage does to the target
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Leverage never changes the percentage target, but it changes how much
          notional value you can deploy to reach it. On forex, prop firms commonly
          offer 1:30 to 1:100 leverage, so a $100,000 balance controls $3M–$10M of
          position value. The same trade distance produces far more dollars of profit
          — and far more dollars of loss. With futures, margin is set by the exchange
          rather than a leverage multiplier, so the practical size of the target comes
          from the contract values you trade (NQ $20 per point, ES $50 per point, MNQ
          $2 per point).
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The leverage math changes one important thing: because profits are amplified,
          an 8% target can be reached with smaller price moves. But losses are
          amplified exactly the same way, so a leverage-heavy plan is what turns small
          mistakes into daily-limit breaches. Target the move, not the margin.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Why the target is not your real enemy
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Failure data consistently points the same way: traders lose evaluations to
          the daily loss limit, not to an unreachable target. Rushing the target makes
          you size up, and sizing up makes one bad day fatal. A realistic plan risks
          0.5–1% per trade and expects a net 0.5–1% per day, which puts an 8% target
          roughly 8 to 16 trading days away. Let the target be the finish line you walk
          toward — not a cliff you sprint off.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-6">
          {guideFaqs.map((f) => (
            <div key={f.question}>
              <h3 className="font-semibold">{f.question}</h3>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight">
            Turn your target into a trade plan
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Enter your balance, risk % and stop-loss in the RiskCalc calculator to see
            exactly how many points each trade must produce for the target — and
            whether the daily-loss impact keeps you safe. Free, no signup.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open the Risk Calculator →
            </Link>
            <Link
              href="/calculator/nq-nasdaq"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              NQ Calculator
            </Link>
          </div>
        </div>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Related guides</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
            <li>
              <Link href="/guides/what-is-a-prop-firm-challenge" className="font-medium text-primary hover:underline">
                What Is a Prop Firm Challenge? Evaluation Rules and Profit Targets
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — how the two-phase target system works end to end.
              </span>
            </li>
            <li>
              <Link href="/guides/daily-loss-vs-trailing" className="font-medium text-primary hover:underline">
                Daily Loss Limit vs Trailing Drawdown
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the limit that usually ends the run before the target is hit.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-position-sizing" className="font-medium text-primary hover:underline">
                Position Sizing for Funded Prop Accounts
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — sizing that lets you reach the target without breaching a limit.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-firm-comparison" className="font-medium text-primary hover:underline">
                Prop Firm Comparison: Apex vs FTMO vs Topstep vs Funding Pips
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — comparing targets, splits and rules across the big four.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
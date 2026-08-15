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

const guideSlug = "prop-firm-comparison";
const guideUrl = absoluteUrl(`/guides/${guideSlug}`);

export function generateMetadata(): Metadata {
  return {
    title:
      "Prop Firm Comparison: Apex vs FTMO vs Topstep",
    description:
      "Compare Apex, FTMO, Topstep and Funding Pips on fees, profit targets, loss limits, splits and rules — and the factors that decide which fits your style.",
    alternates: {
      canonical: guideUrl,
      languages: { en: guideUrl, "x-default": guideUrl },
    },
    openGraph: {
      title:
        "Prop Firm Comparison: Apex vs FTMO vs Topstep vs Funding Pips",
      description:
        "Fees, profit targets, loss limits, profit splits and rules across the four biggest prop firms — and the 6 factors that really decide your choice.",
      url: guideUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Prop Firm Comparison: Apex vs FTMO vs Topstep vs Funding Pips",
      description:
        "Fees, profit targets, loss limits, profit splits and rules across the four biggest prop firms — and the 6 factors that really decide your choice.",
    },
  };
}

const guideFaqs = [
  {
    question: "Which prop firm is the best for a beginner?",
    answer:
      "For beginners, the deciding factors are daily loss limits, evaluation price and re-take rules rather than headline profit splits. Look for a firm with a 5% daily loss limit, a reasonably priced challenge for the account size you want, and a free or discounted re-take policy. Which firm is 'best' depends on your market: futures traders often gravitate toward Apex or Topstep, while forex and CFD traders tend to use FTMO or Funding Pips.",
  },
  {
    question: "Are prop firm profit splits really 80/20 or better?",
    answer:
      "Most firms advertise a profit split of 80% to you and 20% to the firm, with top tiers reaching 90–95%. The split is usually locked to the tier you pay for. Before paying, read whether the highest splits are gated behind resets, stricter rules or a longer payout cycle.",
  },
  {
    question: "What is the difference between a static and trailing drawdown across firms?",
    answer:
      "A static (fixed) drawdown is measured against the starting balance and never moves, so you always have your full buffer until you hit it. A trailing drawdown is measured from your highest equity peak, so it moves up with profits but shrinks your buffer if you give back gains. Apex and Topstep are known for static limits on several programs, while FTMO and Funding Pips commonly use static maximum drawdowns too — but firms change this, so verify the rulebook for the exact program you buy.",
  },
  {
    question: "How much does a $50,000 prop firm evaluation cost?",
    answer:
      "Pricing changes frequently, but as a general guide a $50,000 evaluation typically costs in the range of $30–$200 depending on the firm and promo codes. Sales and seasonal discounts are common, so the effective price is often lower. The evaluation fee is non-refundable, so treat it as tuition and size your trades to survive the rules.",
  },
  {
    question: "Which prop firm is best for trading the Nasdaq (NQ)?",
    answer:
      "Futures-focused firms like Apex and Topstep are built around CME products, so NQ, ES and MNQ are first-class citizens with per-contract pricing and rules that fit micro and e-mini traders. FTMO and Funding Pips also support futures-like CFD indexes but are more often used for forex and gold. Choose based on which instrument fees and rulebook fit your NQ trading plan.",
  },
  {
    question: "How do I choose between Apex, FTMO, Topstep and Funding Pips?",
    answer:
      "Score each firm on the things that actually end accounts: the daily loss limit, the maximum drawdown type (static vs trailing), the profit target, the evaluation price and re-take policy, and the profit split and payout cycle. Then match the result to your trading style — how much you risk per trade and how often you have winning vs losing days. No firm is universally best; the one that fits your rules is.",
  },
];

export default function PropFirmComparisonPage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Prop Firm Comparison: Apex vs FTMO vs Topstep vs Funding Pips",
          description:
            "Compare the four biggest prop firms on fees, profit targets, loss limits, profit splits and rules — and learn which factors actually decide your choice.",
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
          { name: "Prop Firm Comparison", path: `/guides/${guideSlug}` },
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
            <li className="truncate text-foreground">Prop Firm Comparison Guide</li>
          </ol>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          Ultimate Guide · 2026
        </p>
        <h1 className="text-balance mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Prop Firm Comparison: Apex vs FTMO vs Topstep vs Funding Pips
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Apex Trader Funding, FTMO, Topstep and Funding Pips are the four most
          searched prop firms in the industry. Comparing them by headline profit
          split is a trap — the real differences live in the daily loss limit, the
          drawdown type, the profit target and the payout rules. This guide lays out
          what each firm is known for and gives you the checklist that actually
          decides which one fits you.
        </p>

        <h2 className="mt-8 text-2xl font-bold tracking-tight">
          Which prop firm is best for your trading style?
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          No single firm is best — the right one matches your market and risk
          style. Futures traders usually prefer Apex or Topstep for NQ, ES and
          micro contracts; forex and CFD traders lean toward FTMO or Funding
          Pips. Score each firm on its daily loss limit, drawdown type (static vs
          trailing), profit target, evaluation price and payout cycle, then pick
          the one whose rules your style can actually survive.
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
          What each of the four firms is known for
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Every firm updates its programs, so treat the details below as a general
          orientation and confirm the current rulebook before you pay. What matters
          is the pattern: each firm makes a different trade-off between price, rules
          and payout speed.
        </p>
        <div className="mt-5 overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Firm</th>
                <th className="px-4 py-3">Typical focus</th>
                <th className="px-4 py-3">Commonly known for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">Apex Trader Funding</td>
                <td className="px-4 py-3 text-muted-foreground">CME futures (NQ, ES, MNQ)</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Aggressive discounts, large accounts and static drawdown programs
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">FTMO</td>
                <td className="px-4 py-3 text-muted-foreground">Forex, CFDs, gold, indices</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Mature evaluation, strong reputation and a proven payout track record
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Topstep</td>
                <td className="px-4 py-3 text-muted-foreground">Futures trading combine</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Trailing-drawdown combine, funded-first model and trader coaching
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Funding Pips</td>
                <td className="px-4 py-3 text-muted-foreground">Forex and CFD prop trading</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Popular two-step challenge with frequent promos and high split tiers
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The six factors that actually decide your choice
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Daily loss limit.</strong> The most
            common account-killer. Firms commonly set it at 5% of the day&apos;s
            starting balance; some use 4%. Lower limits force smaller risk per trade
            and tighter intraday discipline.
          </li>
          <li>
            <strong className="text-foreground">Drawdown type — static or
            trailing.</strong> A static limit is measured against the starting
            balance and never moves. A trailing limit follows your equity peak, so
            it grows with profits but punishes giving back gains. This changes your
            sizing more than any other single rule.
          </li>
          <li>
            <strong className="text-foreground">Profit target.</strong> The evaluation
            target is usually 8–10% for a one-step or phase-one, and 4–5% for
            verification. A lower target is friendlier, but it is often paired with a
            tighter drawdown — the pair, not the target alone, is what matters.
          </li>
          <li>
            <strong className="text-foreground">Evaluation price and re-takes.</strong>{" "}
            The fee is non-refundable tuition. Compare the price per $1,000 of buying
            power, and whether failures give you a free or discounted re-take.
          </li>
          <li>
            <strong className="text-foreground">Profit split and payout cycle.</strong>{" "}
            Most firms start at 80/20 and climb to 90–95% on higher tiers. Read how
            payouts are requested, how long they take and whether a first-payout
            rule or consistency check applies.
          </li>
          <li>
            <strong className="text-foreground">Instrument fit.</strong> A futures
            firm is usually a better home for NQ and ES traders; forex and gold
            traders often prefer a CFD-style platform. Match the firm to the market
            you actually trade.
          </li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          How the four firms typically differ
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Apex Trader Funding is best known for heavily discounted futures challenges
          and static drawdown programs, which appeals to NQ and ES traders who want
          wide, predictable buffers. FTMO built its reputation on a strict but fair
          two-phase evaluation on forex and CFDs, with a long payout history — a
          strong default when trust matters more than the cheapest fee. Topstep uses
          a combine with a trailing drawdown, then moves you to a funded account, and
          is favored by futures traders who want a structured path plus coaching.
          Funding Pips offers a popular two-step forex/CFD challenge with frequent
          promos and high split tiers, making it a frequent pick for traders shopping
          for value on currency pairs.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          None of these profiles is permanent — firms regularly tweak targets,
          limits and payouts. That is exactly why a comparison guide should teach you
          the checklist, not memorize current numbers.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The two rules that matter more than the firm name
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Whatever firm you pick, two numbers dominate your survival rate. First,
          the daily loss limit — size each trade so that a stop-out costs at most
          20–25% of the daily ceiling, so a losing streak of three or four trades
          cannot end the day. Second, the drawdown type — a trailing limit means you
          must protect profits, not just your starting balance. Run both numbers
          through a risk calculator before the first trade of the day.
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
            Check any firm&apos;s limits with the RiskCalc calculator
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Enter your balance, risk % and stop-loss, and RiskCalc returns the exact
            position size plus an implied daily-loss-limit check — so your trade fits
            the rulebook of whatever firm you choose. Free, no signup.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open the Risk Calculator →
            </Link>
            <Link
              href="/guides/what-is-a-prop-firm"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              What Is a Prop Firm
            </Link>
            <Link
              href="/guides/what-is-a-prop-firm-challenge"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Prop Firm Challenge Guide
            </Link>
          </div>
        </div>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Related guides</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
            <li>
              <Link href="/guides/what-is-a-prop-firm" className="font-medium text-primary hover:underline">
                What Is a Prop Firm? How Funded Trading Accounts Work
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the evaluation, the rules and the payouts behind every comparison.
              </span>
            </li>
            <li>
              <Link href="/guides/what-is-a-prop-firm-challenge" className="font-medium text-primary hover:underline">
                What Is a Prop Firm Challenge? Evaluation Rules and Profit Targets
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — how the two-phase evaluation actually works.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-max-drawdown" className="font-medium text-primary hover:underline">
                Max Loss vs Max Daily Loss: Drawdown Limits Explained
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the limits that end accounts before any firm comparison matters.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-position-sizing" className="font-medium text-primary hover:underline">
                Position Sizing for Funded Prop Accounts
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — how to size trades inside any firm&apos;s limits.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
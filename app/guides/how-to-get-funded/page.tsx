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

const guideSlug = "how-to-get-funded";
const guideUrl = absoluteUrl(`/guides/${guideSlug}`);

export function generateMetadata(): Metadata {
  return {
    title:
      "How to Get a Funded Trading Account: The Full Path",
    description:
      "Step-by-step: pick a prop firm, pass the challenge, avoid red flags and keep payouts coming — covering costs, profit targets and loss limits.",
    alternates: {
      canonical: guideUrl,
      languages: { en: guideUrl, "x-default": guideUrl },
    },
    openGraph: {
      title:
        "How to Get a Funded Trading Account: The Full Path",
      description:
        "The full path to a funded account — firm selection, challenge rules, costs and red flags — with straight answers on whether prop trading is worth it.",
      url: guideUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "How to Get a Funded Trading Account: The Full Path",
      description:
        "The full path to a funded account — firm selection, challenge rules, costs and red flags — with straight answers on whether prop trading is worth it.",
    },
  };
}

const guideFaqs = [
  {
    question: "How do I get a funded trading account?",
    answer:
      "The standard path is: choose a reputable firm, buy a challenge (evaluation) sized to the account you want, trade to the profit target without breaching the daily loss or maximum drawdown limits, complete verification if the program has two phases, and you receive a funded account. From there you trade with the firm's capital, keep the profit split (usually 80%), and request payouts on the firm's schedule.",
  },
  {
    question: "How much does it cost to get a funded account?",
    answer:
      "Evaluation fees are non-refundable tuition. A $50k challenge typically costs $30–$200 depending on the firm and active promo; $100k accounts usually run $60–$350. Sales are frequent, so the effective price is often far lower. Some firms offer instant-funded or free trials, but the classic model is a one-time fee to unlock the evaluation.",
  },
  {
    question: "Are prop firms legit?",
    answer:
      "Yes — but the industry is unregulated, so legitimacy is a per-firm question, not a label. Legitimate firms publish clear rulebooks, show payout proof, respond to support and have long operating histories. Red flags are the opposite: impossible profit targets, vague payout rules, no payment method you recognize, or review history full of unpaid-payout complaints. Check reviews on independent platforms before paying.",
  },
  {
    question: "Is prop trading worth it?",
    answer:
      "For a trader with a proven, positive-expectancy edge and disciplined risk, a funded account multiplies that edge with firm capital and a profit split — potentially worth it. For a gambler or a beginner who has never been consistently profitable, the evaluation fee is usually lost. Most evaluations fail on the daily loss limit, not the target, so prop trading is worth it only when your live, personal-account results already support your sizing plan.",
  },
  {
    question: "What should I check before buying a prop firm challenge?",
    answer:
      "Five things: the daily loss limit and drawdown type (static vs trailing), the profit target and verification requirements, the real evaluation price after promo codes, the payout rules (split, frequency, first-payout minimum), and the firm's independent reviews. Never pay for a challenge you have not read the rulebook for — the rules are the product.",
  },
  {
    question: "Can I trade my own strategies on a funded account?",
    answer:
      "Usually yes, with restrictions. Most firms ban or restrict news trading, copy trading and expert advisors (EAs), and require you to follow the consistency and sizing rules. Read the trading restrictions section of the rulebook — the strategies you can actually deploy are the ones the rulebook allows, not the ones you imagine.",
  },
  {
    question: "How long does it take to get funded?",
    answer:
      "Realistically 2 to 6 weeks for a two-phase program: a few days to weeks to hit the phase-one target, then the verification phase, then the firm's funding setup. One-step programs can be faster. Most firms require a minimum number of trading days (2–5) even if you hit the target early, so the practical path is rarely shorter than a week.",
  },
];

export default function HowToGetFundedPage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "How to Get a Funded Trading Account: Challenge, Rules & Costs",
          description:
            "Firm selection, challenge rules, evaluation costs and payout steps — plus honest answers on whether prop firms are legit and worth it.",
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
          { name: "How to Get Funded", path: `/guides/${guideSlug}` },
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
            <li className="truncate text-foreground">How to Get Funded Guide</li>
          </ol>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          Ultimate Guide · 2026
        </p>
        <h1 className="text-balance mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          How to Get a Funded Trading Account: The Full Path
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Getting funded is a four-step process: choose a firm, buy an
          evaluation, trade to the target inside the rules, then request
          payouts on a funded account. Most traders fail at step two or three —
          not because the target is hard, but because they size trades that
          breach the daily loss limit. This guide walks the whole path and gives
          you the checklist that separates funded traders from repeat buyers of
          challenges.
        </p>

        <h2 className="mt-8 text-2xl font-bold tracking-tight">
          How do you get a funded trading account?
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Pick a reputable firm, buy a challenge (typically $30–$200 for a
          $50k account), trade to the profit target (8–10%) without breaching
          the 5% daily or 10% max drawdown, pass the verification phase, then
          trade firm capital and withdraw on the payout cycle. The evaluation
          fee is non-refundable, so size every trade to survive the loss limits
          — that is where most attempts fail.
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
          Step 1 — Pick the right firm and account size
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Start with the market you trade. Futures traders (NQ, ES, MNQ) are
          usually best served by futures-native firms like Apex and Topstep,
          whose rules, per-contract pricing and platforms fit CME products.
          Forex, gold and CFD traders tend to use FTMO, Funding Pips or The
          5%ers. Then pick an account size that fits your risk-per-trade: a
          $50k account with a 5% daily cap gives you $2,500 per day of room —
          enough to trade one or two NQ contracts at disciplined stops. There is
          no benefit to buying the largest account if you cannot trade it
          without breaching the daily limit.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Step 2 — Understand the challenge before you pay
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The evaluation fee is non-refundable, so the rulebook is the real
          product you are buying. Read these four numbers before checkout:
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Profit target.</strong> Usually
            8–10% in phase one, then 4–5% in verification — or a single 8–10%
            target on one-step programs.
          </li>
          <li>
            <strong className="text-foreground">Max daily loss.</strong> Usually
            5% of the day's starting balance. This is what ends most
            evaluations.
          </li>
          <li>
            <strong className="text-foreground">Max drawdown.</strong> Commonly
            10% of the starting balance — static (fixed) or trailing (from your
            equity peak).
          </li>
          <li>
            <strong className="text-foreground">Time and consistency.</strong> A
            minimum number of trading days (2–5), possible news-trading bans, and
            consistency caps on single-day profit.
          </li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Step 3 — Trade to the target inside the rules
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The way to pass is boring: risk 0.5–1% per trade, size from the daily
          loss limit first, and let the target come from consistent days. At
          0.5–1% net per day, an 8% target takes roughly 8–16 trading days. If
          your plan risks more than ~20–25% of the daily cap per trade, one
          losing streak ends the evaluation. Run every trade through a position
          size calculator before you enter — the daily cap, not the target, is
          the number that decides whether you reach the funded account.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Step 4 — Verification, funding and the first payout
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Two-phase programs ask for a smaller confirmation target (4–5%) on the
          verification account. After that you receive a funded account with
          your profit split — typically 80/20 — and a payout cycle of 14 or 30
          days. The first payout usually requires a minimum profit (commonly
          4–8%) and may be limited to your earned profit, not the firm's capital.
          From there, the rules that protect the account — daily loss, drawdown,
          consistency — are the same ones that protect your future payouts, so
          keep sizing from the limits even after funding.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          What the evaluation actually costs
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Challenge prices move with promos, but the pattern is consistent. A
          $50k evaluation typically costs $30–$200, and a $100k one $60–$350,
          with heavy seasonal discounts. On top of the fee, plan for the
          non-obvious costs: the opportunity cost of time spent meeting minimum
          trading days, the risk of a reset (new fee) after a breach, and any
          platform or data fees. Treat the total as tuition — budget to buy a
          challenge once and pass it, not to gamble on resets.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Red flags that mean "do not buy"
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">No clear rulebook.</strong> If the
            daily loss limit, drawdown type or payout terms are vague, walk away.
          </li>
          <li>
            <strong className="text-foreground">Vague payout proof.</strong>{" "}
            Legitimate firms publish real payout evidence; a firm with none is a
            risk.
          </li>
          <li>
            <strong className="text-foreground">Unrealistic targets or fees that
            feel too good.</strong> A $5 challenge for a $100k account with a
            perfect split is a marketing hook, not a business model.
          </li>
          <li>
            <strong className="text-foreground">Bad independent reviews.</strong>{" "}
            Check Trustpilot and trader forums — recurring "no payout" complaints
            are the strongest warning signal.
          </li>
          <li>
            <strong className="text-foreground">No real payment method.</strong>{" "}
            Confirm you can actually withdraw to a bank, crypto or card you
            recognize.
          </li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Are prop firms legit? And is it worth it?
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Legitimacy is per-firm.</strong>{" "}
          The industry is largely unregulated, so "prop firm" is not a trust
          label — the reputable names are those with long payout histories and
          transparent rulebooks. <strong className="text-foreground">Worth it is
          per-trader.</strong> If you have a proven edge and risk discipline on
          your own account, funded capital multiplies your returns with a split
          you keep. If you have never been consistently profitable, the
          evaluation fee is usually the lesson. The honest test: trade a demo or
          small personal account under the same rules and targets first. If you
          can pass your own simulation, the firm's version becomes a real
          opportunity.
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
            Plan the evaluation with real numbers
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Enter your account size, risk % and stop-loss in the RiskCalc
            calculator to get the exact position size and an implied
            daily-loss-limit check — the same math that decides whether you pass
            or buy a reset. Free, no signup.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open the Risk Calculator →
            </Link>
            <Link
              href="/guides/what-is-a-prop-firm-challenge"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Challenge Guide
            </Link>
            <Link
              href="/guides/funded-account-rules"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Funded Account Rules
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
                — the evaluation you are buying, end to end.
              </span>
            </li>
            <li>
              <Link href="/guides/funded-account-rules" className="font-medium text-primary hover:underline">
                Funded Account Rules Explained
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the rules that decide pass or fail once funded.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-firm-comparison" className="font-medium text-primary hover:underline">
                Prop Firm Comparison: Apex vs FTMO vs Topstep vs Funding Pips
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — choosing the right firm before you pay.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-firm-payout" className="font-medium text-primary hover:underline">
                Prop Firm Payouts: When You Can Withdraw &amp; Profit Splits
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — how the funded phase pays out.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
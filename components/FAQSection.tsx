import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * The 5 most-searched risk-management questions in SMC/ICT + prop firm trading.
 * Mirrored in JSON-LD (FAQPage) on the homepage for rich results.
 */
export const FAQ_ITEMS = [
  {
    question: "What percentage of your account should you risk per trade in prop firm trading?",
    answer:
      "Most prop firms force you to risk no more than 1% per trade, and many disciplined SMC and ICT traders use just 0.25%–0.5%. On a $100,000 funded account that means risking $250–$1,000 per trade. A fixed 1% rule survives losing streaks: after 10 losses in a row you are still down only ~10% and your daily drawdown limit is intact.",
  },
  {
    question: "How do you calculate position size for NQ or futures?",
    answer:
      "Use the formula: Position size = (Account Balance × Risk%) ÷ (Stop Distance × Dollar Value per Point). For NQ, each point is worth $20 per contract. With a $100,000 account risking 1% ($1,000) and a 50-point stop, you trade 1,000 ÷ (50 × 20) = 1 NQ contract. For MNQ (worth $2/point) the same setup allows 10 contracts.",
  },
  {
    question: "What is the SMC (Smart Money Concepts) risk management rule?",
    answer:
      "The core SMC/ICT rule is simple: only trade when you can place your stop-loss beyond a structural level (order block, breaker, fair value gap, or liquidity pool). Never widen your stop to make a trade 'work' — instead reduce position size. If the stop distance grows, the contract count must shrink to keep your total risk fixed at 1% or less.",
  },
  {
    question: "How does the prop firm daily loss limit affect position sizing?",
    answer:
      "Prop firms typically enforce a 5% daily drawdown and a 6–10% maximum loss. Your position size must keep a single losing trade (your stop loss) comfortably inside the daily limit. For example, on a $100,000 account with a $5,000 daily limit, one trade risking 1% ($1,000) consumes only 20% of the daily buffer — leaving room for a few sequential losers without breaching.",
  },
  {
    question: "What lot size should I use for a $10,000 prop firm account?",
    answer:
      "Risking 1% ($100) on a $10,000 account with a 20-pip EUR/USD stop means: 100 ÷ (20 pips × $10 per pip per lot) = 0.5 standard lots. The exact number always depends on your stop distance — that is why you calculate the size after choosing your stop, never before.",
  },
];

export function FAQSection() {
  return (
    <Accordion className="mx-auto max-w-3xl">
      {FAQ_ITEMS.map((item) => (
        <AccordionItem key={item.question}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <div className="text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

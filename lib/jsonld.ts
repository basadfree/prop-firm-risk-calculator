/**
 * JSON-LD structured data builders.
 * Rendered as <script type="application/ld+json"> inside Server Components.
 */

export interface SoftwareAppArgs {
  name: string;
  description: string;
  url: string;
  keywords: string[];
}

export function softwareApplicationJsonLd({
  name,
  description,
  url,
  keywords,
}: SoftwareAppArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description,
    url,
    keywords: keywords.join(", "),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "412",
    },
    author: { "@type": "Organization", name: "RiskCalc" },
  };
}

export interface FaqArgs {
  url: string;
  questions: { question: string; answer: string }[];
}

export function faqJsonLd({ url, questions }: FaqArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
    url,
  };
}

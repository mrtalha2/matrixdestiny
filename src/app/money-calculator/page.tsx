import type { Metadata } from "next";
import { MoneyCalculatorClient } from "@/components/calculator/MoneyCalculatorClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { resolvePageMetadata } from "@/lib/settings/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/money-calculator", {
    title: "Destiny Matrix Money Calculator — Free Career & Wealth Flow Diagnostic",
    description:
      "Calculate your exact Destiny Matrix Money Line by birth date. Uncover your financial flow trigger, career realization calling, and the subconscious money blocks stopping your wealth.",
    keywords: [
      "destiny matrix money calculator",
      "matrix of destiny wealth line",
      "money channel destiny matrix",
      "career numerology calculator",
      "financial block calculator",
      "matrix of fate money line",
      "wealth arcana meaning",
    ],
    alternates: {
      canonical: `${SITE_URL}/money-calculator`,
    },
    openGraph: {
      title: "Destiny Matrix Money Calculator — Free Career & Wealth Flow Diagnostic",
      description:
        "Discover the financial code encoded in your birth date: career callings, money blockers, and wealth triggers.",
      url: `${SITE_URL}/money-calculator`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Destiny Matrix Money Calculator — Free Career & Wealth Flow Diagnostic",
      description:
        "Calculate your money gate, career path, and subconscious wealth blocks in seconds.",
    },
  });
}

export default function MoneyCalculatorPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Money Calculator", url: "/money-calculator" },
  ]);

  const appSchema = getWebApplicationSchema({
    name: "Destiny Matrix Money & Wealth Calculator",
    description:
      "Calculate your Money Gate, diagnose subconscious financial blocks, and reveal high-leverage career paths.",
    url: `${SITE_URL}/money-calculator`,
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is the Money Line located in the Destiny Matrix?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Money Line is located along the lower-right diagonal of your Destiny Matrix octagram. It connects the Anahata Heart Center (Love/Money junction) through the Money Gate to the Material Realization Point (Point C, derived from your birth year).",
        },
      },
      {
        "@type": "Question",
        name: "What blocks money in the Matrix of Destiny?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Money flow is constricted whenever the Arcana governing your Money Gate or Material Point is expressed in its 'minus' frequency—such as fear of scarcity, imposter syndrome, ethical compromise, or emotional friction in close relationships.",
        },
      },
      {
        "@type": "Question",
        name: "How does the Love Line connect to the Money Line?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In the authentic Destiny Matrix octagram, the Love Line and Money Line intersect at the Anahata Heart Center. Psychological resentment, unspoken conflict, or dishonesty in partnership directly restricts your capacity to receive worldly prosperity.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd schema={[breadcrumbSchema, appSchema, faqSchema]} />
      <SacredAuraBackground />

      <div className="site-container py-10 sm:py-14">
        <MoneyCalculatorClient />
      </div>
    </>
  );
}

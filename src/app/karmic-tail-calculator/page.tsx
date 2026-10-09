import type { Metadata } from "next";
import { KarmicTailCalculatorClient } from "@/components/calculator/KarmicTailCalculatorClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { resolvePageMetadata } from "@/lib/settings/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/karmic-tail-calculator", {
    title: "Karmic Tail Calculator — Free Matrix of Destiny Karmic Program Finder",
    description:
      "Calculate your exact 3-number Karmic Tail in seconds. Discover the past-life soul dilemma, subconscious recursive traps, and actionable transmutation rituals encoded in your birth date.",
    keywords: [
      "karmic tail calculator",
      "karmic tail finder",
      "matrix of destiny karmic tail",
      "karmic tail meaning",
      "past life karma calculator",
      "destiny matrix karmic program",
      "karmic debt calculator",
    ],
    alternates: {
      canonical: `${SITE_URL}/karmic-tail-calculator`,
    },
    openGraph: {
      title: "Karmic Tail Calculator — Free Matrix of Destiny Karmic Program Finder",
      description:
        "Decode your 3-number karmic signature, past-life origin story, and current-life shadow loop.",
      url: `${SITE_URL}/karmic-tail-calculator`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Karmic Tail Calculator — Free Matrix of Destiny Karmic Program Finder",
      description:
        "Calculate your 3-energy karmic tail and discover how to transmute subconscious loops.",
    },
  });
}

export default function KarmicTailCalculatorPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Karmic Tail Calculator", url: "/karmic-tail-calculator" },
  ]);

  const appSchema = getWebApplicationSchema({
    name: "Karmic Tail Calculator",
    description:
      "Calculate your 3-energy karmic tail, uncover past-life debt, and access transmutation protocols.",
    url: `${SITE_URL}/karmic-tail-calculator`,
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Karmic Tail in the Matrix of Destiny?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Karmic Tail is a three-energy combination positioned at the base of your Destiny Matrix octagram. It reflects unresolved spiritual debts, subconscious coping habits, and ancestral dilemmas carried over from past incarnations that naturally express in the 'minus' (shadow) until consciously understood and transmuted.",
        },
      },
      {
        "@type": "Question",
        name: "How is the Karmic Tail calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The root energy (Point D) is calculated by reducing the sum of your day, month, and year energies modulo 22. The two preceding inner nodes are computed by adding the root to inner structural chakra points, creating a distinct 3-arcana signature (e.g. 18-6-6 or 15-8-11).",
        },
      },
      {
        "@type": "Question",
        name: "How many Karmic Tails are there in the Destiny Matrix system?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There are 26 standard recurring Karmic Tail programs in the authentic Natalia Ladini Destiny Matrix system, each bearing a unique past-life archetype such as 'Love Magic', 'Warrior of Faith', 'Physical Agony', or 'Dark Mage'.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd schema={[breadcrumbSchema, appSchema, faqSchema]} />
      <SacredAuraBackground />

      <div className="site-container py-10 sm:py-14">
        <KarmicTailCalculatorClient />
      </div>
    </>
  );
}

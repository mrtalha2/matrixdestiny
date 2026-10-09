import type { Metadata } from "next";
import { LoveCalculatorClient } from "@/components/calculator/LoveCalculatorClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { resolvePageMetadata } from "@/lib/settings/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/love-calculator", {
    title: "Destiny Matrix Love Calculator — Free Ideal Partner & Love Line Finder",
    description:
      "Calculate your Destiny Matrix Love Line by birth date. Uncover your ideal soulmate archetype, natural meeting circumstances, and the subconscious habits that stall intimacy.",
    keywords: [
      "destiny matrix love calculator",
      "love line matrix of destiny",
      "ideal partner calculator",
      "soulmate numerology calculator",
      "relationship destiny matrix",
      "matrix of fate love gate",
    ],
    alternates: {
      canonical: `${SITE_URL}/love-calculator`,
    },
    openGraph: {
      title: "Destiny Matrix Love Calculator — Free Ideal Partner & Love Line Finder",
      description:
        "Decode your love entrance gate: partner archetype, meeting locations, and sacred harmony keys.",
      url: `${SITE_URL}/love-calculator`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Destiny Matrix Love Calculator — Free Ideal Partner & Love Line Finder",
      description:
        "Calculate your Love Gate and reveal your ideal partner profile and encounter circumstances in seconds.",
    },
  });
}

export default function LoveCalculatorPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Love Calculator", url: "/love-calculator" },
  ]);

  const appSchema = getWebApplicationSchema({
    name: "Destiny Matrix Love & Partner Calculator",
    description:
      "Calculate your Love Gate, uncover ideal partner character traits, and reveal encounter circumstances.",
    url: `${SITE_URL}/love-calculator`,
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does the Love Gate indicate in the Matrix of Destiny?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Love Gate (Point L) reveals the psychological and energetic archetype of the partner with whom you can build genuine intimacy. It highlights their core temperament, communication rhythm, and emotional values.",
        },
      },
      {
        "@type": "Question",
        name: "How does the Love Line reveal meeting circumstances?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each Arcana energy carries a distinct environmental resonance. For instance, Arcana 7 connects to shared travel or sports; Arcana 9 connects to research, quiet libraries, or retreats; Arcana 11 connects to high-intensity athletic or professional settings.",
        },
      },
      {
        "@type": "Question",
        name: "Can I test compatibility with a specific person?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Use our dedicated Couple Compatibility Calculator (/compatibility) to combine two birth dates into an integrated composite union matrix with a 4-pillar synergy scorecard.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd schema={[breadcrumbSchema, appSchema, faqSchema]} />
      <SacredAuraBackground />

      <div className="site-container py-10 sm:py-14">
        <LoveCalculatorClient />
      </div>
    </>
  );
}

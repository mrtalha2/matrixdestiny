import type { Metadata } from "next";
import { TalentCalculatorClient } from "@/components/calculator/TalentCalculatorClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { resolvePageMetadata } from "@/lib/settings/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/talent-calculator", {
    title: "Destiny Matrix Talent Calculator — Free Superpowers & Innate Gifts Finder",
    description:
      "Calculate your Destiny Matrix Talent Zone by birth date. Uncover your 3 natural superpowers: intuitive spiritual gifts, communicative abilities, and ancestral creative potential.",
    keywords: [
      "talent zone destiny matrix",
      "destiny matrix talent calculator",
      "innate gifts numerology",
      "superpowers calculator",
      "matrix of fate talents",
      "spiritual gifts by birth date",
    ],
    alternates: {
      canonical: `${SITE_URL}/talent-calculator`,
    },
    openGraph: {
      title: "Destiny Matrix Talent Calculator — Free Superpowers & Innate Gifts Finder",
      description:
        "Reveal the innate gifts and creative superpowers encoded in your birth date.",
      url: `${SITE_URL}/talent-calculator`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Destiny Matrix Talent Calculator — Free Superpowers Finder",
      description:
        "Calculate your innate talents, intuitive gifts, and ancestral creative potential.",
    },
  });
}

export default function TalentCalculatorPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Talent Calculator", url: "/talent-calculator" },
  ]);

  const appSchema = getWebApplicationSchema({
    name: "Destiny Matrix Talent & Superpowers Calculator",
    description:
      "Calculate your Talent Zone, uncover intuitive gifts, and learn how to commercialize your creative superpowers.",
    url: `${SITE_URL}/talent-calculator`,
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Talent Zone in the Destiny Matrix?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Talent Zone is located at the top of the Destiny Matrix octagram, anchored by your month of birth (Point B: Spirit). It represents natural gifts that come so effortlessly to you that you might take them for granted until consciously developed.",
        },
      },
      {
        "@type": "Question",
        name: "How do ancestral lines contribute to talents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The top ancestral diagonal points (NW Paternal Point F and NE Maternal Point G) reveal creative, intellectual, and moral aptitudes inherited across generations from your biological lineages.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd schema={[breadcrumbSchema, appSchema, faqSchema]} />
      <SacredAuraBackground />

      <div className="site-container py-10 sm:py-14">
        <TalentCalculatorClient />
      </div>
    </>
  );
}

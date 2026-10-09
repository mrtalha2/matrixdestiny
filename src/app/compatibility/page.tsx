import type { Metadata } from "next";
import { CompatibilityClient } from "@/components/compatibility/CompatibilityClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";

import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { resolvePageMetadata } from "@/lib/settings/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/compatibility", {
    title: "Destiny Matrix Compatibility Calculator — Relationship & Couple Synergy Chart",
    description:
      "Calculate couple compatibility using the Matrix of Destiny numerology method. Generate a composite overlay chart to reveal relationship purpose, financial alignment, and shared karmic lessons.",
    keywords: [
      "destiny matrix compatibility",
      "couple numerology chart",
      "relationship destiny matrix",
      "composite fate chart",
      "matrix of destiny love calculator",
      "destiny matrix synastry",
    ],
    alternates: {
      canonical: `${SITE_URL}/compatibility`,
    },
    openGraph: {
      title: "Destiny Matrix Compatibility Calculator — Relationship & Couple Synergy Chart",
      description:
        "Decode your energetic synergy, shared archetypes, emotional chemistry, and joint life purpose with architectural precision.",
      url: `${SITE_URL}/compatibility`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Destiny Matrix Compatibility Calculator — Couple Synergy Chart",
      description:
        "Decode your energetic synergy, shared archetypes, and joint life purpose with architectural precision.",
    },
  });
}

interface CompatibilityPageProps {
  searchParams: {
    d1?: string;
    d2?: string;
    name1?: string;
    name2?: string;
  };
}

export default function CompatibilityPage({ searchParams }: CompatibilityPageProps) {
  const initialDate1 = searchParams.d1 || "1995-08-24";
  const initialDate2 = searchParams.d2 || "1996-03-15";
  const initialName1 = searchParams.name1 || "Alex";
  const initialName2 = searchParams.name2 || "Jordan";

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools Suite", url: "/tools" },
    { name: "Relationship Compatibility", url: "/compatibility" },
  ]);

  const webAppSchema = getWebApplicationSchema({
    name: "Destiny Matrix Compatibility Calculator",
    url: `${SITE_URL}/compatibility`,
    description:
      "Calculate dual birth chart compatibility and composite relationship matrix using the 22 Major Arcana method.",
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[webAppSchema, breadcrumbSchema]} />
      <SacredAuraBackground showGeometry intensity="subtle" />
      <div className="py-8">
        <CompatibilityClient
          initialDate1={initialDate1}
          initialDate2={initialDate2}
          initialName1={initialName1}
          initialName2={initialName2}
        />
      </div>
    </div>
  );
}

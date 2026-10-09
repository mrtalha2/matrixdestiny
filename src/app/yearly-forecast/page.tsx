import type { Metadata } from "next";
import { YearlyForecastClient } from "@/components/yearly-forecast/YearlyForecastClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";

import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { resolvePageMetadata } from "@/lib/settings/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/yearly-forecast", {
    title: "Yearly Destiny Matrix Forecast — Personal Year Energy & 0–80 Age Cycle",
    description:
      "Calculate your personal year energy and 0–80 years age perimeter cycle with the Matrix of Destiny yearly forecast. Discover annual themes, opportunities, and 4 quarterly rhythms.",
    keywords: [
      "destiny matrix yearly forecast",
      "personal year energy calculator",
      "matrix of destiny age cycle",
      "numerology annual forecast",
      "annual arcana energy",
      "destiny matrix 80 year cycle",
    ],
    alternates: {
      canonical: `${SITE_URL}/yearly-forecast`,
    },
    openGraph: {
      title: "Yearly Destiny Matrix Forecast — Personal Year Energy & 0–80 Age Cycle",
      description:
        "Decode your personal annual archetype, quarterly rhythms, and 10-year developmental milestones with architectural clarity.",
      url: `${SITE_URL}/yearly-forecast`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Yearly Destiny Matrix Forecast — Annual Energy & Age Cycle",
      description:
        "Calculate your personal year energy and 0–80 years lifecycle perimeter progression with architectural precision.",
    },
  });
}

interface YearlyForecastPageProps {
  searchParams: {
    date?: string;
    year?: string;
    name?: string;
  };
}

export default function YearlyForecastPage({ searchParams }: YearlyForecastPageProps) {
  const initialDate = searchParams.date || "1995-08-24";
  const initialYear = parseInt(searchParams.year || "") || new Date().getFullYear();
  const initialName = searchParams.name || "Alex";

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools Suite", url: "/tools" },
    { name: "Yearly Energy Forecast", url: "/yearly-forecast" },
  ]);

  const webAppSchema = getWebApplicationSchema({
    name: "Yearly Destiny Matrix Forecast",
    url: `${SITE_URL}/yearly-forecast`,
    description:
      "Calculate your personal yearly influence number and explore the 0–80 years age cycle perimeter timeline using the Matrix of Destiny numerology method.",
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[webAppSchema, breadcrumbSchema]} />
      <SacredAuraBackground showGeometry intensity="subtle" />
      <div className="py-8">
        <YearlyForecastClient
          initialDate={initialDate}
          initialYear={initialYear}
          initialName={initialName}
        />
      </div>
    </div>
  );
}

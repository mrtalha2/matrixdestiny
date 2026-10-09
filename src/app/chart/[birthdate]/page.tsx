import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { parseBirthDateSlug } from "@/lib/validations/birthdate";
import { calculateDestinyMatrix } from "@/lib/matrix-engine";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { ChartDashboardClient } from "@/components/chart/ChartDashboardClient";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";

interface ChartPageProps {
  params: {
    birthdate: string;
  };
  searchParams?: {
    name?: string;
    gender?: string;
  };
}

/**
 * Dynamic SEO Metadata Generation for each unique birth date permalink
 */
export async function generateMetadata({
  params,
  searchParams,
}: ChartPageProps): Promise<Metadata> {
  const parsed = parseBirthDateSlug(params.birthdate);
  if (!parsed) {
    return {
      title: "Chart Not Found — Matrix of Destiny",
      description: "Invalid birth date format. Calculate your free Destiny Matrix chart.",
    };
  }

  const { day, month, year } = parsed;
  const matrix = calculateDestinyMatrix({ day, month, year });
  const centerPoint = matrix.points.find((p) => p.id === "comfortZone") || matrix.points[0];
  const centerArcana = arcanaMeanings[centerPoint.value] || arcanaMeanings[1];
  const userName = searchParams?.name?.trim();

  const formattedDate = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const pageTitle = userName
    ? `${userName}'s Destiny Matrix Chart (${formattedDate}) — Soul Energy ${centerPoint.value}`
    : `Destiny Matrix for ${formattedDate} — Soul Center ${centerPoint.value}: ${centerArcana.name}`;

  const pageDesc = `Free Destiny Matrix chart reading for ${formattedDate}. Explore your 22-energy octagram: Core Comfort Zone Energy ${centerPoint.value} (${centerArcana.name}), Karmic Tail ${matrix.karmicTail.points.join("-")}, wealth and love channels.`;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      "destiny matrix chart",
      "free numerology chart by birth date",
      `destiny matrix ${formattedDate}`,
      `arcana ${centerPoint.value}`,
      "karmic tail reading",
      "soul comfort zone",
    ],
    alternates: {
      canonical: `${SITE_URL}/chart/${params.birthdate}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      type: "article",
      url: `${SITE_URL}/chart/${params.birthdate}`,
      images: [`${SITE_URL}/api/og?birthdate=${params.birthdate}`],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
      images: [`${SITE_URL}/api/og?birthdate=${params.birthdate}`],
    },
  };
}

export default function ChartPage({ params, searchParams }: ChartPageProps) {
  const parsed = parseBirthDateSlug(params.birthdate);
  const userName = searchParams?.name?.trim() || null;

  if (!parsed) {
    return (
      <main className="max-w-md mx-auto my-auto px-4 py-16 text-center">
        <Card elevation="mid" className="p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-status-error/10 text-status-error mx-auto flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-medium text-ink-primary">
            Invalid Birth Date
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            The date &ldquo;{params.birthdate}&rdquo; could not be resolved to a valid Gregorian calendar date.
            Please verify the day, month, and year.
          </p>
          <Link href="/">
            <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return to Calculator
            </Button>
          </Link>
        </Card>
      </main>
    );
  }

  const { day, month, year } = parsed;
  // Pure server-side computation (SSR / instantaneous)
  const matrix = calculateDestinyMatrix({ day, month, year });
  const centerPoint = matrix.points.find((p) => p.id === "comfortZone") || matrix.points[0];
  const centerArcana = arcanaMeanings[centerPoint.value] || arcanaMeanings[1];

  const formattedDate = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Destiny Tools", url: "/tools" },
    { name: `${formattedDate} Chart`, url: `/chart/${params.birthdate}` },
  ]);

  const webAppSchema = getWebApplicationSchema({
    name: "Destiny Matrix Chart Reading",
    url: `${SITE_URL}/chart/${params.birthdate}`,
    description: `Personal Destiny Matrix calculated for ${params.birthdate}`,
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      {/* Inject Structured Data */}
      <JsonLd schema={[webAppSchema, breadcrumbSchema]} />

      <div className="site-container py-8 my-auto">
        <ChartDashboardClient
          matrix={matrix}
          dateSlug={params.birthdate}
          userName={userName}
          gender={searchParams?.gender}
        />
      </div>
    </div>
  );
}

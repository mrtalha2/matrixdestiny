import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { parseBirthDateSlug } from "@/lib/validations/birthdate";
import { calculateDestinyMatrix } from "@/lib/matrix-engine";
import { getLocalizedArcana } from "@/content/localized/arcana";
import { ChartDashboardClient } from "@/components/chart/ChartDashboardClient";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES, Locale } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedChartPageProps {
  params: {
    locale: string;
    birthdate: string;
  };
  searchParams?: {
    name?: string;
    gender?: string;
  };
}

export async function generateMetadata({
  params,
  searchParams,
}: LocalizedChartPageProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

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
  const centerArcana = getLocalizedArcana(centerPoint.value, norm);
  const userName = searchParams?.name?.trim();

  const formattedDate = `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;

  const title = userName
    ? (norm === "es"
        ? `Carta de la Matriz del Destino de ${userName} (${formattedDate})`
        : norm === "pt-BR"
        ? `Mapa da Matriz do Destino de ${userName} (${formattedDate})`
        : `${userName} Destiny Matrix (${formattedDate})`)
    : (norm === "es"
        ? `Matriz del Destino para ${formattedDate} — Centro ${centerPoint.value}: ${centerArcana.name}`
        : norm === "pt-BR"
        ? `Matriz do Destino para ${formattedDate} — Centro ${centerPoint.value}: ${centerArcana.name}`
        : `Destiny Matrix for ${formattedDate} — Center ${centerPoint.value}`);

  const description =
    norm === "es"
      ? `Lectura completa de la Matriz del Destino para ${formattedDate}. Centro del alma ${centerPoint.value} (${centerArcana.name}), cola kármica, amor y finanzas.`
      : `Complete Destiny Matrix reading for ${formattedDate}. Core comfort zone ${centerPoint.value} (${centerArcana.name}), karmic tail, love and wealth.`;

  // Dynamic user chart calculations are noindex to prevent low-quality crawl bloat
  return buildLocalizedMetadata({
    path: `/chart/${params.birthdate}`,
    locale: norm,
    title,
    description,
    noIndex: true,
  });
}

export default function LocalizedChartPage({ params, searchParams }: LocalizedChartPageProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const parsed = parseBirthDateSlug(params.birthdate);
  const userName = searchParams?.name?.trim() || null;
  const msgs = getMessages(norm);

  if (!parsed) {
    return (
      <main className="max-w-md mx-auto my-auto px-4 py-16 text-center">
        <Card elevation="mid" className="p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-status-error/10 text-status-error mx-auto flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-medium text-ink-primary">
            {norm === "es" ? "Fecha de Nacimiento No Válida" : "Invalid Birth Date"}
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            {norm === "es"
              ? `La fecha "${params.birthdate}" no se pudo validar en el calendario gregoriano.`
              : `The date "${params.birthdate}" could not be resolved to a valid Gregorian calendar date.`}
          </p>
          <Link href={getLocalizedPath("/#calculator-hero", norm)}>
            <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              {msgs.errors.returnHome || "Return to Calculator"}
            </Button>
          </Link>
        </Card>
      </main>
    );
  }

  const { day, month, year } = parsed;
  // Pure server-side computation (SSR / instantaneous)
  const matrix = calculateDestinyMatrix({ day, month, year });

  const formattedDate = `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
  const chartPath = getLocalizedPath(`/chart/${params.birthdate}`, norm);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.nav.tools || "Tools", url: getLocalizedPath("/tools", norm) },
    { name: `${formattedDate} Chart`, url: `${SITE_URL}${chartPath}` },
  ]);

  const webAppSchema = getWebApplicationSchema({
    name: msgs.chart.chartTitle || "Destiny Matrix Chart Reading",
    url: `${SITE_URL}${chartPath}`,
    description: `Personal Destiny Matrix calculated for ${formattedDate}`,
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
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

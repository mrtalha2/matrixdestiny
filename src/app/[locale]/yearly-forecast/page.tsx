import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { YearlyForecastClient } from "@/components/yearly-forecast/YearlyForecastClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedYearlyForecastProps {
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "pt-br" },
    { locale: "de" },
    { locale: "id" },
    { locale: "ar" },
  ];
}

export async function generateMetadata({ params }: LocalizedYearlyForecastProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Pronóstico Anual — Ciclo de Edad 0–80 y Energía Personal"
      : norm === "pt-BR"
      ? "Previsão Anual — Ciclo de Idade 0–80 e Energia do Ano"
      : norm === "de"
      ? "Jahresprognose — Schicksalsmatrix Lebenszyklen 0–80"
      : norm === "id"
      ? "Ramalan Tahunan Matrix of Destiny — Siklus Usia 0–80"
      : "التوقعات السنوية في مصفوفة القدر — دورات العمر 0–80 وطاقة العام";

  const description =
    norm === "es"
      ? "Calcula tu energía anual personal y tu ciclo perimetral de edad de 0 a 80 años en la Matriz del Destino. Conoce temas anuales, retos y trimestres."
      : norm === "pt-BR"
      ? "Calcule a energia do seu ano pessoal e ciclo etário de 0 a 80 anos na Matriz do Destino. Conheça temas anuais, trimestres e trânsitos."
      : "Berechne deine persönliche Jahresenergie und deinen 0–80 Lebenszyklus in der Schicksalsmatrix.";

  return buildLocalizedMetadata({
    path: "/yearly-forecast",
    locale: norm,
    title,
    description,
    keywords: [
      "pronostico anual matriz del destino",
      "ano personal numerologia",
      "ciclos de edad matriz del destino",
      "transitos anuales matriz",
    ],
  });
}

export default function LocalizedYearlyForecastPage({ params }: LocalizedYearlyForecastProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.nav.tools || "Tools", url: getLocalizedPath("/tools", norm) },
    { name: msgs.nav.yearlyForecast || "Yearly Forecast", url: `${SITE_URL}${getLocalizedPath("/yearly-forecast", norm)}` },
  ]);

  const appSchema = getWebApplicationSchema({
    name: msgs.nav.yearlyForecast || "Yearly Forecast",
    description: "Calculate your personal year energy and 0–80 years age perimeter cycle.",
    url: `${SITE_URL}${getLocalizedPath("/yearly-forecast", norm)}`,
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[breadcrumbSchema, appSchema]} />
      <SacredAuraBackground intensity="subtle" />

      <main className="site-container py-10 sm:py-16">
        <YearlyForecastClient />
      </main>
    </div>
  );
}

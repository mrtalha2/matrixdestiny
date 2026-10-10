import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MoneyCalculatorClient } from "@/components/calculator/MoneyCalculatorClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedMoneyCalcProps {
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

export async function generateMetadata({ params }: LocalizedMoneyCalcProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Calculadora del Dinero — Canal Financiero y Profesiones"
      : norm === "pt-BR"
      ? "Calculadora do Dinheiro — Canal Financeiro e Prosperidade"
      : norm === "de"
      ? "Schicksalsmatrix Geldrechner — Finanzen & Wohlstand"
      : norm === "id"
      ? "Kalkulator Keuangan Matrix of Destiny — Jalur Rezeki & Karir"
      : "حاسبة المال في مصفوفة القدر — قناة الثروة والمهنة المثالية";

  const description =
    norm === "es"
      ? "Calcula tu canal del dinero en la Matriz del Destino por fecha de nacimiento. Descubre profesiones alineadas, mentalidad de abundancia y bloqueos financieros."
      : norm === "pt-BR"
      ? "Calcule seu canal do dinheiro na Matriz do Destino por data de nascimento. Carreiras prósperas, mentalidade de riqueza e cura de bloqueios."
      : "Berechne deine Geldlinie in der Schicksalsmatrix. Erkenne finanzielle Blockaden, Berufungschancen und Wohlstands-Archetypen.";

  return buildLocalizedMetadata({
    path: "/money-calculator",
    locale: norm,
    title,
    description,
    keywords: [
      "calculadora del dinero matriz del destino",
      "canal financiero matriz",
      "dinero fecha de nacimiento",
      "prosperidad numerologia",
    ],
  });
}

export default function LocalizedMoneyCalculatorPage({ params }: LocalizedMoneyCalcProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.nav.tools || "Tools", url: getLocalizedPath("/tools", norm) },
    { name: msgs.nav.moneyCalc || "Money Calculator", url: `${SITE_URL}${getLocalizedPath("/money-calculator", norm)}` },
  ]);

  const appSchema = getWebApplicationSchema({
    name: msgs.nav.moneyCalc || "Money Calculator",
    description: "Calculate your wealth channel, optimal careers, and financial mindset.",
    url: `${SITE_URL}${getLocalizedPath("/money-calculator", norm)}`,
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[breadcrumbSchema, appSchema]} />
      <SacredAuraBackground intensity="subtle" />

      <main className="site-container py-10 sm:py-16">
        <MoneyCalculatorClient />
      </main>
    </div>
  );
}

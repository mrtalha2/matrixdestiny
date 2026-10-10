import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TalentCalculatorClient } from "@/components/calculator/TalentCalculatorClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedTalentCalcProps {
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

export async function generateMetadata({ params }: LocalizedTalentCalcProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Calculadora de Talentos — Dones Innatos y Zona Creativa"
      : norm === "pt-BR"
      ? "Calculadora de Talentos — Dons Inatos e Zona Criativa"
      : norm === "de"
      ? "Talentzone Rechner — Deine angeborenen Gaben"
      : norm === "id"
      ? "Kalkulator Bakat Matrix of Destiny — Bakat Bawaan"
      : "حاسبة المواهب في مصفوفة القدر — المواهب الفطرية والإبداع";

  const description =
    norm === "es"
      ? "Calcula tu zona de talentos en la Matriz del Destino a partir de tu fecha de nacimiento. Descubre tus dones innatos, habilidades espirituales y expresión profesional."
      : norm === "pt-BR"
      ? "Calcule sua zona de talentos na Matriz do Destino por data de nascimento. Dons inatos, habilidades intuitivas e expressão máxima."
      : "Berechne deine Talentzone in der Schicksalsmatrix. Erfahre deine angeborenen Potenziale und kreativen Gaben.";

  return buildLocalizedMetadata({
    path: "/talent-calculator",
    locale: norm,
    title,
    description,
    keywords: [
      "calculadora de talentos matriz del destino",
      "zona de talentos matriz",
      "dones innatos numerologia",
      "talentos fecha de nacimiento",
    ],
  });
}

export default function LocalizedTalentCalculatorPage({ params }: LocalizedTalentCalcProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.nav.tools || "Tools", url: getLocalizedPath("/tools", norm) },
    { name: msgs.nav.talentCalc || "Talent Calculator", url: `${SITE_URL}${getLocalizedPath("/talent-calculator", norm)}` },
  ]);

  const appSchema = getWebApplicationSchema({
    name: msgs.nav.talentCalc || "Talent Calculator",
    description: "Calculate your talent zone triad and discover innate creative abilities.",
    url: `${SITE_URL}${getLocalizedPath("/talent-calculator", norm)}`,
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[breadcrumbSchema, appSchema]} />
      <SacredAuraBackground intensity="subtle" />

      <main className="site-container py-10 sm:py-16">
        <TalentCalculatorClient />
      </main>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KarmicTailCalculatorClient } from "@/components/calculator/KarmicTailCalculatorClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedKarmicTailCalcProps {
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

export async function generateMetadata({ params }: LocalizedKarmicTailCalcProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Calculadora de Cola Kármica — Descubre tus 3 Energías"
      : norm === "pt-BR"
      ? "Calculadora de Cauda Cármica — Descubra suas 3 Energias"
      : norm === "de"
      ? "Karmischer Schweif Rechner — Deine 3 Karma-Energien"
      : norm === "id"
      ? "Kalkulator Ekor Karma — Temukan 3 Energi Bawah Sadar"
      : "حاسبة الذيل الكارمي — اكتشف طاقاتك الكارمية الثلاث";

  const description =
    norm === "es"
      ? "Calcula tu cola kármica en la Matriz del Destino a partir de tu fecha de nacimiento. Descubre tu tríada de vidas pasadas, trampa actual y transmutación."
      : norm === "pt-BR"
      ? "Calcule sua cauda cármica na Matriz do Destino por data de nascimento. Tríade do passado, armadilha subconsciente e transmutação em luz."
      : "Berechne deinen karmischen Schweif in der Schicksalsmatrix. Erfahre deine untere Triade, Lebensfallen und Heilungsrituale.";

  return buildLocalizedMetadata({
    path: "/karmic-tail-calculator",
    locale: norm,
    title,
    description,
    keywords: [
      "calculadora de cola karmica",
      "cola karmica gratis",
      "triada karmica matriz del destino",
      "karma vidas pasadas fecha nacimiento",
    ],
  });
}

export default function LocalizedKarmicTailCalculatorPage({ params }: LocalizedKarmicTailCalcProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.nav.tools || "Tools", url: getLocalizedPath("/tools", norm) },
    { name: msgs.nav.karmicTailCalc || "Karmic Tail Calculator", url: `${SITE_URL}${getLocalizedPath("/karmic-tail-calculator", norm)}` },
  ]);

  const appSchema = getWebApplicationSchema({
    name: msgs.nav.karmicTailCalc || "Karmic Tail Calculator",
    description: "Calculate your 3-energy karmic tail triad and discover subconscious patterns.",
    url: `${SITE_URL}${getLocalizedPath("/karmic-tail-calculator", norm)}`,
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[breadcrumbSchema, appSchema]} />
      <SacredAuraBackground intensity="subtle" />

      <main className="site-container py-10 sm:py-16">
        <KarmicTailCalculatorClient />
      </main>
    </div>
  );
}

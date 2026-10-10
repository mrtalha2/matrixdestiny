import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompatibilityClient } from "@/components/compatibility/CompatibilityClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedCompatibilityProps {
  params: {
    locale: string;
  };
  searchParams?: {
    d1?: string;
    d2?: string;
    name1?: string;
    name2?: string;
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

export async function generateMetadata({ params }: LocalizedCompatibilityProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Calculadora de Compatibilidad — Matriz de Pareja Gratis"
      : norm === "pt-BR"
      ? "Calculadora de Compatibilidade — Mapa de Casal Grátis"
      : norm === "de"
      ? "Kompatibilitätsrechner — Partnerschaftsmatrix"
      : norm === "id"
      ? "Kalkulator Kecocokan — Bagan Kompatibilitas Pasangan"
      : "حاسبة التوافق في مصفوفة القدر — مخطط التوافق والشراكة";

  const description =
    norm === "es"
      ? "Calcula la compatibilidad de pareja con el método de la Matriz del Destino. Genera una matriz compuesta para descubrir el propósito, amor y karma conjunto."
      : norm === "pt-BR"
      ? "Calcule a compatibilidade do casal pela Matriz do Destino. Mapa composto para revelar o propósito da relação, harmonia e karma em comum."
      : "Berechne eure Partnerschaftskompatibilität mit der Schicksalsmatrix. Erfahre gemeinsame Lebensaufgaben, Harmonie und karmische Verbindungen.";

  return buildLocalizedMetadata({
    path: "/compatibility",
    locale: norm,
    title,
    description,
    keywords: [
      "compatibilidad matriz del destino",
      "matriz de pareja gratis",
      "sinastria matriz del destino",
      "compatibilidad por fecha de nacimiento",
    ],
  });
}

export default function LocalizedCompatibilityPage({ params, searchParams }: LocalizedCompatibilityProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.nav.tools || "Tools", url: getLocalizedPath("/tools", norm) },
    { name: msgs.nav.compatibility || "Compatibility", url: `${SITE_URL}${getLocalizedPath("/compatibility", norm)}` },
  ]);

  const appSchema = getWebApplicationSchema({
    name: msgs.nav.compatibility || "Compatibility Calculator",
    description: "Calculate relationship compatibility using the Matrix of Destiny.",
    url: `${SITE_URL}${getLocalizedPath("/compatibility", norm)}`,
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[breadcrumbSchema, appSchema]} />
      <SacredAuraBackground intensity="subtle" />

      <main className="site-container py-10 sm:py-16">
        <CompatibilityClient
          initialDate1={searchParams?.d1}
          initialDate2={searchParams?.d2}
          initialName1={searchParams?.name1}
          initialName2={searchParams?.name2}
        />
      </main>
    </div>
  );
}

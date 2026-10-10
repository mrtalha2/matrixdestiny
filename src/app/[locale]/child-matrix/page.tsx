import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChildMatrixClient } from "@/components/child-matrix/ChildMatrixClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedChildMatrixProps {
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

export async function generateMetadata({ params }: LocalizedChildMatrixProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Matriz Infantil — Carta del Niño y Crianza Consciente"
      : norm === "pt-BR"
      ? "Matriz Infantil — Mapa da Criança e Parentalidade"
      : norm === "de"
      ? "Kindermatrix Rechner — Begabungen & Erziehung"
      : norm === "id"
      ? "Matrix of Destiny Anak — Pola Asuh & Bakat Anak"
      : "مصفوفة الطفل في مصفوفة القدر — التربية الواعية وطاقات الطفل";

  const description =
    norm === "es"
      ? "Descubre los dones innatos, zona de confort emocional y temperamento de tu hijo con la Matriz Infantil. Fomenta sus fortalezas sin proyecciones parentales."
      : norm === "pt-BR"
      ? "Descubra os talentos, zona de conforto e temperamento do seu filho com a Matriz Infantil. Apoie o desenvolvimento natural da criança."
      : "Entdecke angeborene Gaben, emotionale Bedürfnisse und das Temperament deines Kindes mit der Kindermatrix.";

  return buildLocalizedMetadata({
    path: "/child-matrix",
    locale: norm,
    title,
    description,
    keywords: [
      "matriz infantil del destino",
      "numerologia infantil",
      "carta natal del niño",
      "crianza consciente matriz",
    ],
  });
}

export default function LocalizedChildMatrixPage({ params }: LocalizedChildMatrixProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.nav.tools || "Tools", url: getLocalizedPath("/tools", norm) },
    { name: msgs.nav.childMatrix || "Child Matrix", url: `${SITE_URL}${getLocalizedPath("/child-matrix", norm)}` },
  ]);

  const appSchema = getWebApplicationSchema({
    name: msgs.nav.childMatrix || "Child Destiny Matrix",
    description: "Discover your child's innate gifts and temperament without parental projections.",
    url: `${SITE_URL}${getLocalizedPath("/child-matrix", norm)}`,
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[breadcrumbSchema, appSchema]} />
      <SacredAuraBackground intensity="subtle" />

      <main className="site-container py-10 sm:py-16">
        <ChildMatrixClient />
      </main>
    </div>
  );
}

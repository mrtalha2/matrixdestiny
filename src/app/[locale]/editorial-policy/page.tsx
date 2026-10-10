import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, CheckCircle2, ShieldCheck, Scale, AlertTriangle } from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedEditorialPolicyProps {
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

export async function generateMetadata({ params }: LocalizedEditorialPolicyProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Política Editorial — Matriz del Destino"
      : norm === "pt-BR"
      ? "Política Editorial — Matriz do Destino"
      : norm === "de"
      ? "Redaktionelle Richtlinien — Matrix des Schicksals"
      : norm === "id"
      ? "Kebijakan Editorial — Matrix of Destiny"
      : "السياسة التحريرية — مصفوفة القدر";

  const description =
    norm === "es"
      ? "Nuestros principios de rigor editorial: transparencia en el cálculo de los 22 Arcanos, respeto al linaje histórico y rechazo del sensacionalismo."
      : "Editorial standards and principles for the Matrix of Destiny publication.";

  return buildLocalizedMetadata({
    path: "/editorial-policy",
    locale: norm,
    title,
    description,
  });
}

export default function LocalizedEditorialPolicyPage({ params }: LocalizedEditorialPolicyProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.footer.editorialPolicy || "Editorial Policy", url: `${SITE_URL}${getLocalizedPath("/editorial-policy", norm)}` },
  ]);

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={breadcrumbSchema} />
      <SacredAuraBackground showGeometry intensity="subtle" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        {/* Mandatory Localized Legal Precedence & Review Notice */}
        <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">
              {msgs.legal.bindingNotice || "Important Notice: This translation is provided for informational convenience only. The English version is legally binding."}
            </p>
            <p className="text-[11px] opacity-80">
              [Document status: Translated for localization; flagged for human legal review].
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Link
              href={getLocalizedPath("/", norm)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{msgs.common.back || "Back"}</span>
            </Link>
            <span className="text-ink-muted text-xs">•</span>
            <Badge variant="brand" size="sm">
              {norm === "es" ? "Estándares de Publicación" : "Editorial Standards"}
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            {norm === "es" ? "Política Editorial y Directrices de Redacción" : "Editorial Policy & Standards"}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted font-mono">
            {msgs.common.lastUpdated || "Last Updated"}: Octubre 2026
          </p>
        </div>

        <div className="space-y-6">
          <Card elevation="low" className="p-6 sm:p-8 bg-surface border border-border-subtle space-y-4">
            <h2 className="text-xl font-display font-medium text-ink-primary">
              {norm === "es" ? "1. Precisión y Transparencia Metodológica" : "1. Methodological Accuracy"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Toda guía, artículo o cálculo publicado en esta plataforma se adhiere a la formulación clásica de los 22 Arcanos y la geometría del octagrama. No inventamos fórmulas arbitrarias ni alteramos los cálculos tradicionales."
                : "Every chart interpretation adheres to authentic 22-energy lineage geometry without arbitrary alterations."}
            </p>
          </Card>

          <Card elevation="low" className="p-6 sm:p-8 bg-surface border border-border-subtle space-y-4">
            <h2 className="text-xl font-display font-medium text-ink-primary">
              {norm === "es" ? "2. Ausencia de Pronósticos Fatalistas" : "2. Non-Fatalistic Framing"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Rechazamos de manera tajante el uso del miedo, la superstición o las amenazas cármicas para generar visitas. Cada energía se expone con una salida constructiva de superación personal."
                : "We strictly reject fear-based numerology or doom prophesying. Every archetype is presented with empowering growth practices."}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

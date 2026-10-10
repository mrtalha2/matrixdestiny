import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldAlert, Heart, Coins, Sparkles, Scale, AlertTriangle } from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedDisclaimerProps {
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

export async function generateMetadata({ params }: LocalizedDisclaimerProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Descargo de Responsabilidad — Matriz del Destino"
      : norm === "pt-BR"
      ? "Aviso Legal e Isenção — Matriz do Destino"
      : norm === "de"
      ? "Haftungsausschluss & Ethik — Matrix des Schicksals"
      : norm === "id"
      ? "Penyangkalan & Etika — Matrix of Destiny"
      : "إخلاء المسؤولية القانونية والأخلاقية — مصفوفة القدر";

  const description =
    norm === "es"
      ? "Aviso metodológico y legal: la Matriz del Destino es un marco simbólico para la introspección personal y el autoconocimiento. No constituye asesoramiento profesional."
      : "Legal and methodological disclosure: Matrix of Destiny is a symbolic self-reflection framework and does not constitute professional advice.";

  return buildLocalizedMetadata({
    path: "/disclaimer",
    locale: norm,
    title,
    description,
  });
}

export default function LocalizedDisclaimerPage({ params }: LocalizedDisclaimerProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.footer.disclaimer || "Disclaimer", url: `${SITE_URL}${getLocalizedPath("/disclaimer", norm)}` },
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
              {norm === "es" ? "Divulgación Ética" : "Ethical Disclosure"}
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            {norm === "es" ? "Descargo de Responsabilidad y Alcance Metodológico" : "Holistic & Entertainment Disclaimer"}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted font-mono">
            {msgs.common.lastUpdated || "Last Updated"}: Octubre 2026
          </p>
        </div>

        {/* High-Impact Alert Card */}
        <Card elevation="low" className="p-6 sm:p-8 border-l-4 border-l-amber-600 bg-amber-500/5 space-y-4">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-mono text-xs uppercase tracking-wider font-semibold">
            <ShieldAlert className="w-4 h-4" />
            <span>{norm === "es" ? "Aviso Primordial de Autoconocimiento" : "Primary Advisory"}</span>
          </div>
          <p className="text-sm sm:text-base text-ink-primary leading-relaxed font-medium">
            {norm === "es"
              ? "La Matriz del Destino es una herramienta de autorreflexión filosófica, basada en la síntesis de la numerología pitagórica y los 22 Arcanos Mayores. NO constituye ni sustituye el asesoramiento médico, psicológico, financiero, legal ni vocacional profesional."
              : "The Matrix of Destiny is a self-reflection framework based on numerological archetypes. It does not constitute medical, psychological, financial, or legal advice."}
          </p>
        </Card>

        {/* Core Pillars */}
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-display font-medium text-ink-primary">
              {norm === "es" ? "1. Ausencia de Validación Científica Empírica" : "1. Scientific Nature & Methodology"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Las interpretaciones contenidas en este sitio web corresponden a un modelo simbólico y arquetípico de introspección personal. No afirmamos que la numerología esté empíricamente validada por las ciencias naturales o la psicología clínica."
                : "Interpretations in this platform are symbolic and archetypal. We make no claim of empirical scientific validation."}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-medium text-ink-primary">
              {norm === "es" ? "2. Preservación Sagrada del Libre Albedrío" : "2. Human Agency & Free Will"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Ningún número o tríada kármica predice un destino irreversible. Las elecciones conscientes, la disciplina personal y la responsabilidad individual son los únicos factores determinantes del camino de vida de una persona."
                : "No number in the chart dictates an unchangeable fate. Personal choices and conscious actions shape your future."}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-medium text-ink-primary">
              {norm === "es" ? "3. No Constituye Asesoramiento Clínico ni Financiero" : "3. No Clinical or Financial Guidance"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Si usted está experimentando problemas de salud mental o física, crisis emocionales o dilemas financieros, le instamos a buscar la orientación de profesionales acreditados en dichas materias."
                : "If you are experiencing health, mental, or financial distress, please consult certified professionals."}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

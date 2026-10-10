import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Compass,
  Sparkles,
  Calculator,
  ShieldCheck,
  BookOpen,
  Info,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedAboutProps {
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

export async function generateMetadata({ params }: LocalizedAboutProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Sobre Nosotros — Matriz del Destino y Metodología"
      : norm === "pt-BR"
      ? "Sobre Nós — Matriz do Destino e Metodologia"
      : norm === "de"
      ? "Über uns — Matrix des Schicksals Plattform"
      : norm === "id"
      ? "Tentang Kami — Platform Matrix of Destiny"
      : "من نحن — منصة مصفوفة القدر والمنهجية العلمية";

  const description =
    norm === "es"
      ? "Conoce la Matriz del Destino: una plataforma educativa independiente que explora el sistema de los 22 Arcanos mediante cálculos deterministas y rigor ético."
      : "Explore our educational platform decoding the 22-energy Destiny Matrix system with deterministic math and ethical clarity.";

  return buildLocalizedMetadata({
    path: "/about",
    locale: norm,
    title,
    description,
  });
}

export default function LocalizedAboutPage({ params }: LocalizedAboutProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.footer.about || "About Us", url: `${SITE_URL}${getLocalizedPath("/about", norm)}` },
  ]);

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={breadcrumbSchema} />
      <SacredAuraBackground showGeometry intensity="subtle" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
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
              {norm === "es" ? "Publicación Educativa" : "Educational Publication"}
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            {norm === "es" ? "Sobre la Matriz del Destino" : "About Matrix of Destiny"}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted font-mono">
            {msgs.common.lastUpdated || "Last Updated"}: Octubre 2026
          </p>
        </div>

        {/* Mission Statement */}
        <Card elevation="low" className="p-6 sm:p-8 space-y-4 bg-surface border border-border-subtle">
          <div className="flex items-center gap-3 text-brand-primary font-mono text-xs uppercase tracking-wider font-semibold">
            <Compass className="w-4 h-4" />
            <span>{norm === "es" ? "Nuestra Misión y Propósito" : "Mission & Architecture"}</span>
          </div>
          <p className="text-sm sm:text-base text-ink-primary leading-relaxed">
            {norm === "es"
              ? "Matriz del Destino es una plataforma digital de divulgación y análisis arquetípico independiente. Nuestro objetivo es presentar el método de los 22 Arcanos con claridad matemática, transparencia algorítmica y sobriedad filosófica, prescindiendo del sensacionalismo místico."
              : "Matrix of Destiny is an independent educational platform exploring the 22-energy numerological blueprint with mathematical clarity and ethical grounding."}
          </p>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            {norm === "es"
              ? "Creemos firmemente en el libre albedrío del ser humano. Los números de la carta no son sentencias inmutables, sino arquetipos y dinámicas psicológicas que cada individuo puede elevar conscientemente de la sombra a la luz."
              : "We respect human free will: the matrix is not a fatalistic prediction, but an introspective map for conscious personal evolution."}
          </p>
        </Card>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
            <Calculator className="w-5 h-5 text-brand-primary" />
            <h2 className="text-base font-display font-medium text-ink-primary">
              {norm === "es" ? "Cálculo Determinista" : "Deterministic Math"}
            </h2>
            <p className="text-xs text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Cada coordenada se deduce estrictamente mediante la clásica regla del 22 sin respuestas aleatorias."
                : "Every node is calculated strictly via the 22-energy reduction rule."}
            </p>
          </Card>

          <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-display font-medium text-ink-primary">
              {norm === "es" ? "Privacidad Absoluta" : "Zero-Storage Privacy"}
            </h2>
            <p className="text-xs text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Los cálculos se procesan al instante. No almacenamos fechas de nacimiento ni vendemos datos."
                : "Calculations run ephemerally without storing personal birth records."}
            </p>
          </Card>

          <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
            <HeartHandshake className="w-5 h-5 text-rose-600" />
            <h2 className="text-base font-display font-medium text-ink-primary">
              {norm === "es" ? "Ética y Rigor" : "Editorial Ethics"}
            </h2>
            <p className="text-xs text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Disclaimers claros en cada página: esto no constituye consejo médico, legal ni financiero."
                : "Clear disclosures that numerology does not replace clinical or financial counsel."}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Compass,
  Heart,
  Baby,
  Calendar,
  Sparkles,
  ArrowRight,
  Coins,
  Infinity as InfinityIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";
import { getLocalizedKarmicTailsCatalog } from "@/content/localized/karmic-tails";
import { getAllLocalizedArcana } from "@/content/localized/arcana";

interface LocalizedToolsPageProps {
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

export async function generateMetadata({ params }: LocalizedToolsPageProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Herramientas de la Matriz del Destino — Calculadoras Gratis"
      : norm === "pt-BR"
      ? "Ferramentas da Matriz do Destino — Calculadoras Grátis"
      : norm === "de"
      ? "Schicksalsmatrix Rechner-Suite — Alle Tools & Analysen"
      : norm === "id"
      ? "Koleksi Alat Matrix of Destiny — Kalkulator Gratis"
      : "أدوات مصفوفة القدر — مجموعة الحاسبات المجانية الشاملة";

  const description =
    norm === "es"
      ? "Explora nuestra suite de 8 calculadoras de la Matriz del Destino: carta natal, cola kármica, amor, finanzas, talentos, compatibilidad y pronóstico anual."
      : norm === "pt-BR"
      ? "Explore as 8 calculadoras da Matriz do Destino: mapa natal, cauda cármica, amor, dinheiro, talentos, compatibilidade e previsão anual."
      : "Entdecke alle 8 Schicksalsmatrix-Rechner: Persönliches Profil, Karma, Liebe, Geld, Talente, Partnerschaft und Jahrestrend.";

  return buildLocalizedMetadata({
    path: "/tools",
    locale: norm,
    title,
    description,
    keywords: [
      "herramientas matriz del destino",
      "calculadoras matriz del destino",
      "compatibilidad matriz",
      "cola karmica gratis",
    ],
  });
}

export default function LocalizedToolsPage({ params }: LocalizedToolsPageProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const tails = Object.values(getLocalizedKarmicTailsCatalog(norm));
  const arcanaMap = getAllLocalizedArcana(norm);

  const toolsList = [
    {
      id: "destiny-matrix",
      title: msgs.nav.destinyMatrix || "Destiny Matrix Calculator",
      description:
        norm === "es"
          ? "Calcula tu octagrama completo de 22 energías a partir de tu fecha de nacimiento."
          : "Full 22-energy octagram calculation from your birth date.",
      href: "/#calculator-hero",
      icon: Compass,
      tag: norm === "es" ? "Principal" : "Core",
    },
    {
      id: "compatibility",
      title: msgs.nav.compatibility || "Compatibility Matrix",
      description:
        norm === "es"
          ? "Compara dos fechas de nacimiento para decodificar la armonía, lecciones y retos en pareja."
          : "Compare two birth dates for relationship dynamics and joint karma.",
      href: "/compatibility",
      icon: Heart,
      tag: norm === "es" ? "Relaciones" : "Relationships",
    },
    {
      id: "child-matrix",
      title: msgs.nav.childMatrix || "Child Matrix",
      description:
        norm === "es"
          ? "Orientación educativa y desarrollo del potencial para niños y adolescentes."
          : "Educational orientation and talent development for children.",
      href: "/child-matrix",
      icon: Baby,
      tag: norm === "es" ? "Familia" : "Family",
    },
    {
      id: "yearly-forecast",
      title: msgs.nav.yearlyForecast || "Yearly Forecast",
      description:
        norm === "es"
          ? "Pronóstico arquetípico año a año basado en ciclos de edad septenarios."
          : "Archetypal yearly forecast based on seven-year cycles.",
      href: "/yearly-forecast",
      icon: Calendar,
      tag: norm === "es" ? "Ciclos" : "Cycles",
    },
    {
      id: "karmic-tail-calc",
      title: msgs.nav.karmicTailCalc || "Karmic Tail Calculator",
      description:
        norm === "es"
          ? "Identifica tu tríada kármica inferior y descubre la memoria inconsciente a sanar."
          : "Identify your bottom karmic triad and past life debt.",
      href: "/karmic-tail-calculator",
      icon: InfinityIcon,
      tag: norm === "es" ? "Karma" : "Karma",
    },
    {
      id: "love-calc",
      title: msgs.nav.loveCalc || "Love Calculator",
      description:
        norm === "es"
          ? "Decodifica tu canal del amor, cualidades de pareja ideal y bloqueos románticos."
          : "Decode your love line, ideal partner qualities, and blocks.",
      href: "/love-calculator",
      icon: Heart,
      tag: norm === "es" ? "Amor" : "Love",
    },
    {
      id: "money-calc",
      title: msgs.nav.moneyCalc || "Money Calculator",
      description:
        norm === "es"
          ? "Analiza tu canal de finanzas, profesiones afines y mentalidad de prosperidad."
          : "Analyze your wealth channel, career paths, and prosperity mindset.",
      href: "/money-calculator",
      icon: Coins,
      tag: norm === "es" ? "Finanzas" : "Wealth",
    },
    {
      id: "talent-calc",
      title: msgs.nav.talentCalc || "Talent Calculator",
      description:
        norm === "es"
          ? "Descubre tu tríada de talentos innatos y dones creativos heredados."
          : "Discover your innate talent triad and creative gifts.",
      href: "/talent-calculator",
      icon: Sparkles,
      tag: norm === "es" ? "Dones" : "Talents",
    },
  ];

  const breadcrumbs = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.nav.tools || "Tools", url: `${SITE_URL}${getLocalizedPath("/tools", norm)}` },
  ]);

  return (
    <div className="relative min-h-screen py-10 sm:py-16 selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={breadcrumbs} />
      <SacredAuraBackground intensity="subtle" />

      <div className="site-container max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="brand" size="sm">
            {norm === "es" ? "Suite Completa de Numerología" : "Numerology Calculator Suite"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-ink-primary tracking-tight">
            {norm === "es" ? "Herramientas y Calculadoras de la Matriz" : "Destiny Matrix Tools & Calculators"}
          </h1>
          <p className="text-base text-ink-secondary leading-relaxed">
            {norm === "es"
              ? "Calcula cada dimensión de tu carta con nuestras herramientas interactivas basadas en la auténtica metodología de los 22 Arcanos."
              : "Explore our precision calculators for personal charts, karmic lessons, love, wealth, and life cycles."}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolsList.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card
                key={tool.id}
                elevation="low"
                className="p-6 flex flex-col justify-between space-y-4 bg-surface border border-border-subtle hover:border-brand-primary/40 hover:shadow-elevation-mid transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="default" size="sm">
                      {tool.tag}
                    </Badge>
                  </div>
                  <h2 className="text-lg font-display font-medium text-ink-primary">
                    {tool.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <Link href={getLocalizedPath(tool.href, norm)}>
                  <Button variant="secondary" size="sm" className="w-full justify-between" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    {msgs.common.calculate || "Open"}
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* All 22 Arcana Index */}
        <section className="space-y-6 pt-8 border-t border-border-subtle">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
              {msgs.nav.arcana22 || "The 22 Major Arcana"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              {norm === "es"
                ? "Explora el significado completo de cada Arcano en el octagrama sagrado."
                : "Explore deep archetypal interpretations for all 22 energies."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 22 }, (_, i) => i + 1).map((n) => {
              const arcana = arcanaMap[n];
              return (
                <Link
                  key={n}
                  href={getLocalizedPath(`/arcana/${n}`, norm)}
                  className="p-3.5 rounded-xl border border-border-subtle bg-surface hover:border-brand-primary/40 hover:bg-surface-raised transition-all block text-center space-y-1"
                >
                  <span className="w-7 h-7 mx-auto rounded-lg bg-brand-primary/10 text-brand-primary font-mono font-bold text-xs flex items-center justify-center">
                    {n}
                  </span>
                  <span className="text-xs font-medium text-ink-primary block truncate">
                    {arcana?.name || `Arcana ${n}`}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 26 Karmic Tails Catalog */}
        <section className="space-y-6 pt-8 border-t border-border-subtle">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
              {msgs.nav.karmicTails || "All 26 Karmic Tails"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              {norm === "es"
                ? "Los 26 programas subconscientes fundamentales en la base del cuadrado de la Tierra."
                : "The 26 foundational subconscious programs at the base of the personal diamond."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {tails.map((tail) => (
              <Link
                key={tail.id}
                href={getLocalizedPath(`/karmic-tails/${tail.id}`, norm)}
                className="p-4 rounded-xl border border-border-subtle bg-surface hover:border-brand-primary/40 hover:bg-surface-raised transition-all block space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-brand-primary">
                    {tail.signature}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-ink-muted">
                    {tail.archetype}
                  </span>
                </div>
                <p className="text-xs font-medium text-ink-primary truncate">
                  {tail.name}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

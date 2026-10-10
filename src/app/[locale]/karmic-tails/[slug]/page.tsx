import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  Infinity as InfinityIcon,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Flame,
  CheckCircle2,
  HeartHandshake,
  BookOpen,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { findLocalizedKarmicTail, getLocalizedKarmicTailsCatalog } from "@/content/localized/karmic-tails";
import { getLocalizedArcana } from "@/content/localized/arcana";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SITE_NAME, SITE_URL, getBreadcrumbSchema } from "@/lib/seo/structured-data";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { normalizeLocalePrefix, Locale, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedKarmicTailPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const locales = ["es", "pt-br", "de", "id", "ar"];
  const catalog = getLocalizedKarmicTailsCatalog("es");
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const tail of Object.values(catalog)) {
      params.push({
        locale,
        slug: tail.id,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: LocalizedKarmicTailPageProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const tail = findLocalizedKarmicTail(params.slug, norm);
  if (!tail) {
    return { title: "Karmic Tail Not Found | Matrix of Destiny" };
  }

  const title =
    norm === "es"
      ? `Cola Kármica ${tail.signature} (${tail.name}) — Significado`
      : norm === "pt-BR"
      ? `Cauda Cármica ${tail.signature} (${tail.name}) — Significado`
      : norm === "de"
      ? `Karmischer Schweif ${tail.signature} (${tail.name}) — Bedeutung`
      : norm === "id"
      ? `Ekor Karma ${tail.signature} (${tail.name}) — Makna & Solusi`
      : `الذيل الكارمي ${tail.signature} (${tail.name}) — المعنى والتحويل`;

  const description =
    norm === "es"
      ? `Guía completa de la Cola Kármica ${tail.signature} (${tail.name}) en la Matriz del Destino. Conoce tu deuda del pasado, trampa subconsciente y sanación.`
      : norm === "pt-BR"
      ? `Guia completo da Cauda Cármica ${tail.signature} (${tail.name}) na Matriz do Destino. Conheça sua dívida de vidas passadas, armadilha e cura.`
      : norm === "de"
      ? `Leitfaden zum karmischen Schweif ${tail.signature} (${tail.name}) in der Schicksalsmatrix. Erfahre vergangene Lektionen und Heilungswege.`
      : norm === "id"
      ? `Panduan lengkap Ekor Karma ${tail.signature} (${tail.name}) di Matrix of Destiny. Pelajari beban masa lalu dan rekomendasi penyembuhan.`
      : `دليل شامل للذيل الكارمي ${tail.signature} (${tail.name}) في مصفوفة القدر. اكتشف ديون الحياة السابقة والفخ اللاواعي وطرق الشفاء.`;

  return buildLocalizedMetadata({
    path: `/karmic-tails/${tail.id}`,
    locale: norm,
    title,
    description,
    keywords: [
      `cola karmica ${tail.signature}`,
      tail.name.toLowerCase(),
      "matriz del destino",
      "karma de vidas pasadas",
    ],
  });
}

export default async function LocalizedKarmicTailDetailPage({ params }: LocalizedKarmicTailPageProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const tail = findLocalizedKarmicTail(params.slug, norm);
  if (!tail) {
    notFound();
  }

  if (params.slug !== tail.id) {
    redirect(getLocalizedPath(`/karmic-tails/${tail.id}`, norm));
  }

  const msgs = getMessages(norm);
  const tailUrl = `${SITE_URL}${getLocalizedPath(`/karmic-tails/${tail.id}`, norm)}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${tailUrl}#article`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
    },
    headline: `Karmic Tail ${tail.signature}: ${tail.name}`,
    description: tail.karmicLesson || tail.currentLifeTrap,
    image: `${SITE_URL}/og-image.webp`,
    datePublished: "2026-03-15",
    dateModified: "2026-10-10",
    inLanguage: LOCALES[norm].htmlLang,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": tailUrl,
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.nav.karmicTails || "Karmic Tails", url: getLocalizedPath("/tools", norm) },
    { name: `${tail.signature} (${tail.name})`, url: tailUrl },
  ]);

  return (
    <div className="relative min-h-screen py-10 sm:py-16 selection:bg-brand-primary/15 selection:text-brand-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SacredAuraBackground intensity="subtle" />

      <div className="site-container max-w-4xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href={getLocalizedPath("/", norm)} className="hover:text-ink-primary transition-colors">
            {msgs.common.home || "Home"}
          </Link>
          <span>/</span>
          <Link href={getLocalizedPath("/tools", norm)} className="hover:text-ink-primary transition-colors">
            {msgs.nav.karmicTails || "Karmic Tails"}
          </Link>
          <span>/</span>
          <span className="text-ink-primary font-medium">{tail.signature}</span>
        </nav>

        {/* Hero Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-400 text-xs font-mono font-semibold">
              <InfinityIcon className="w-3.5 h-3.5" />
              <span>{norm === "es" ? "Cola Kármica Subconsciente" : "Subconscious Karmic Tail"}</span>
            </div>

            <Link href={getLocalizedPath("/#calculator-hero", norm)}>
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                {msgs.common.calculate || "Check My Tail"}
              </Button>
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-ink-primary tracking-tight leading-tight">
            {norm === "es" ? "Cola Kármica" : "Karmic Tail"} {tail.signature}: {tail.name}
          </h1>

          <p className="text-sm sm:text-base font-mono text-brand-primary uppercase tracking-wider font-semibold">
            {norm === "es" ? "Arquetipo:" : "Archetype:"} {tail.archetype}
          </p>

          {/* Triad Badges */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-mono text-ink-muted uppercase">
              {norm === "es" ? "Tríada Energética:" : "Energy Triad:"}
            </span>
            <div className="flex items-center gap-2">
              {tail.triad.map((num, idx) => {
                const arcana = getLocalizedArcana(num, norm);
                return (
                  <Link
                    key={idx}
                    href={getLocalizedPath(`/arcana/${num}`, norm)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border-subtle hover:border-brand-primary/40 hover:bg-surface-raised transition-all text-xs font-mono"
                  >
                    <span className="font-bold text-brand-primary">{num}</span>
                    <span className="text-ink-secondary">{arcana?.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        {/* Affirmation Card */}
        {tail.affirmation && (
          <Card elevation="low" className="p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl">
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-brand-primary shrink-0 mt-1" />
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold mb-1">
                  {norm === "es" ? "Afirmación de Transmutación Kármica" : "Transmutation Affirmation"}
                </h3>
                <p className="text-base sm:text-lg font-display text-ink-primary font-medium italic">
                  &ldquo;{tail.affirmation}&rdquo;
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Narrative & Trap */}
        <section aria-labelledby="karmic-roots-heading" className="space-y-6">
          <h2 id="karmic-roots-heading" className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
            {norm === "es" ? "Historia de Vidas Pasadas y Trampa Actual" : "Past Life Story & Current Life Trap"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
                <Flame className="w-4 h-4" />
                <span>{norm === "es" ? "Memoria de Vidas Pasadas" : "Past Life Memory"}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {tail.pastLifeStory}
              </p>
            </Card>

            <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-700 dark:text-rose-400">
                <ShieldAlert className="w-4 h-4" />
                <span>{norm === "es" ? "Trampa en la Vida Presente" : "Current Life Trap"}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {tail.currentLifeTrap}
              </p>
            </Card>
          </div>
        </section>

        {/* Karmic Lesson & Transmutation */}
        <section aria-labelledby="lesson-heading" className="space-y-6">
          <h2 id="lesson-heading" className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
            {norm === "es" ? "Lección y Recomendaciones de Sanación" : "Karmic Lesson & Healing"}
          </h2>
          <Card elevation="low" className="p-6 sm:p-8 bg-surface border border-border-subtle space-y-6">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-brand-primary font-semibold mb-2">
                {norm === "es" ? "Lección Evolutiva Principal" : "Primary Evolutionary Lesson"}
              </h3>
              <p className="text-base text-ink-primary leading-relaxed font-sans font-medium">
                {tail.karmicLesson}
              </p>
            </div>

            <div className="pt-4 border-t border-border-subtle/60">
              <h4 className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-4 font-semibold">
                {norm === "es" ? "Pasos Prácticos para Elevar esta Energía:" : "Practical Steps to Elevate this Energy:"}
              </h4>
              <ul className="space-y-3">
                {tail.healingRecommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-ink-secondary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </section>

        {/* AdSense In-Article */}
        <AdSenseUnit slotId="karmic-tail-middle-responsive" format="auto" />

        {/* Link back to all tails */}
        <div className="pt-8 text-center">
          <Link href={getLocalizedPath("/tools", norm)}>
            <Button variant="secondary" size="md">
              {norm === "es" ? "Ver Todas las Herramientas y Colas Kármicas" : "Explore All Tools & Karmic Tails"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

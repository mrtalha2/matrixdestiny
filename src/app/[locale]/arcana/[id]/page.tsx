import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  Sparkles,
  Heart,
  Coins,
  ShieldAlert,
  Compass,
  ArrowRight,
  Infinity as InfinityIcon,
  CheckCircle2,
  Calendar,
  HelpCircle,
  Clock,
  Layers,
} from "lucide-react";
import { getLocalizedArcana } from "@/content/localized/arcana";
import { getLocalizedKarmicTailsCatalog } from "@/content/localized/karmic-tails";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SITE_NAME, SITE_URL, getBreadcrumbSchema } from "@/lib/seo/structured-data";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { ContextualBirthdateBar } from "@/components/calculator/ContextualBirthdateBar";
import { normalizeLocalePrefix, Locale, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedArcanaPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export async function generateStaticParams() {
  const locales = ["es", "pt-br", "de", "id", "ar"];
  const params: { locale: string; id: string }[] = [];

  for (const locale of locales) {
    for (let i = 1; i <= 22; i++) {
      params.push({
        locale,
        id: i.toString(),
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: LocalizedArcanaPageProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const num = Number(params.id);
  if (isNaN(num) || num < 1 || num > 22) {
    return { title: "Arcana Not Found | Matrix of Destiny" };
  }

  const arcana = getLocalizedArcana(num, norm);
  if (!arcana) {
    return { title: "Arcana Not Found | Matrix of Destiny" };
  }

  const title =
    arcana.metaTitle ||
    (norm === "es"
      ? `Arcano ${num}: ${arcana.name} en la Matriz del Destino`
      : norm === "pt-BR"
      ? `Arcano ${num}: ${arcana.name} na Matriz do Destino`
      : norm === "de"
      ? `Arkanum ${num}: ${arcana.name} in der Schicksalsmatrix`
      : norm === "id"
      ? `Arkana ${num}: Makna ${arcana.name} di Matrix of Destiny`
      : `الأركانا ${num}: معنى ${arcana.name} في مصفوفة القدر`);

  const description =
    arcana.metaDescription ||
    (norm === "es"
      ? `Descubre el Arcano ${num} (${arcana.name}) en la Matriz del Destino: luz, sombra, canal del amor, dinero y lección kármica explicados.`
      : norm === "pt-BR"
      ? `Descubra o Arcano ${num} (${arcana.name}) na Matriz do Destino: luz, sombra, amor, dinheiro e carma explicados com clareza.`
      : norm === "de"
      ? `Erfahre alles über Arkanum ${num} (${arcana.name}) in der Matrix des Schicksals: Licht, Schatten, Liebe und Finanzen im Detail.`
      : norm === "id"
      ? `Panduan lengkap Arkana ${num} (${arcana.name}) dalam Matrix of Destiny: potensi seimbang, bayangan, cinta, dan keuangan.`
      : `دليل شامل للأركانا ${num} (${arcana.name}) في مصفوفة القدر: طاقة النور والظل، قناة الحب وقناة المال والدروس الكارمية.`);

  return buildLocalizedMetadata({
    path: `/arcana/${num}`,
    locale: norm,
    title,
    description,
    keywords: [
      `arcano ${num}`,
      arcana.name.toLowerCase(),
      "matriz del destino",
      "arcanos mayores",
    ],
  });
}

export default async function LocalizedArcanaDetailPage({ params }: LocalizedArcanaPageProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const num = Number(params.id);
  if (isNaN(num) || num < 1 || num > 22) {
    notFound();
  }

  if (params.id !== num.toString()) {
    redirect(getLocalizedPath(`/arcana/${num}`, norm));
  }

  const arcana = getLocalizedArcana(num, norm);
  if (!arcana) {
    notFound();
  }

  const msgs = getMessages(norm);
  const karmicCatalog = getLocalizedKarmicTailsCatalog(norm);
  const relatedTails = Object.values(karmicCatalog).filter((t) =>
    t.triad.includes(num)
  );

  const arcanaUrl = `${SITE_URL}${getLocalizedPath(`/arcana/${arcana.number}`, norm)}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${arcanaUrl}#article`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
    },
    headline: `Arcana ${arcana.number}: ${arcana.name}`,
    description: arcana.metaDescription || arcana.essence,
    image: `${SITE_URL}/og-image.webp`,
    datePublished: "2026-03-15",
    dateModified: arcana.lastUpdated || "2026-10-10",
    inLanguage: LOCALES[norm].htmlLang,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": arcanaUrl,
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.nav.tools || "Tools", url: getLocalizedPath("/tools", norm) },
    { name: `Arcana ${arcana.number}: ${arcana.name}`, url: getLocalizedPath(`/arcana/${arcana.number}`, norm) },
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
            {msgs.nav.tools || "Tools"}
          </Link>
          <span>/</span>
          <span className="text-ink-primary font-medium">
            {norm === "es" ? "Arcano" : norm === "pt-BR" ? "Arcano" : norm === "de" ? "Arkanum" : norm === "id" ? "Arkana" : "الأركانا"} {arcana.number}: {arcana.name}
          </span>
        </nav>

        {/* Hero Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-brand-primary text-white font-mono font-bold text-xl flex items-center justify-center shadow-md">
                {arcana.number}
              </span>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-primary font-semibold">
                  {arcana.archetype}
                </span>
                <p className="text-xs text-ink-muted flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{msgs.common.lastUpdated || "Last updated"}: {arcana.lastUpdated || "2026-10-10"}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>6 min</span>
                </p>
              </div>
            </div>

            <Link href={getLocalizedPath("/#calculator-hero", norm)}>
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                {msgs.common.calculate || "Calculate Chart"}
              </Button>
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-ink-primary tracking-tight leading-tight">
            {norm === "es" ? "Arcano" : norm === "pt-BR" ? "Arcano" : norm === "de" ? "Arkanum" : norm === "id" ? "Arkana" : "الأركانا"} {arcana.number}: {arcana.name}
          </h1>

          {/* Definition-First Intro */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface border border-border-subtle shadow-sm space-y-3">
            <p className="text-base sm:text-lg text-ink-primary font-sans leading-relaxed">
              {arcana.intro || arcana.essence}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {arcana.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Pull Quote */}
        {arcana.pullQuote && (
          <blockquote className="p-6 rounded-2xl bg-surface-raised border-l-4 border-brand-primary italic text-base sm:text-lg text-ink-primary shadow-sm leading-relaxed">
            &ldquo;{arcana.pullQuote}&rdquo;
          </blockquote>
        )}

        {/* Affirmation Card */}
        {arcana.affirmation && (
          <Card elevation="low" className="p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl">
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-brand-primary shrink-0 mt-1" />
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold mb-1">
                  {norm === "es" ? "Afirmación de Poder" : norm === "pt-BR" ? "Afirmação de Poder" : norm === "de" ? "Kraft-Affirmation" : norm === "id" ? "Afirmasi Kekuatan" : "توكيد التمكين"}
                </h3>
                <p className="text-base sm:text-lg font-display text-ink-primary font-medium italic">
                  &ldquo;{arcana.affirmation}&rdquo;
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Contextual Interactive Calculator Bar */}
        <ContextualBirthdateBar
          zoneName={`${norm === "es" ? "Arcano" : norm === "pt-BR" ? "Arcano" : norm === "de" ? "Arkanum" : norm === "id" ? "Arkana" : "الأركانا"} ${arcana.number}`}
          className="my-6"
        />

        {/* Editorial Content: Balanced vs Shadow */}
        <section aria-labelledby="personality-heading" className="space-y-6">
          <h2 id="personality-heading" className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
            {norm === "es" ? "Retrato de Personalidad y Zona de Confort" : norm === "pt-BR" ? "Retrato de Personalidade" : norm === "de" ? "Persönlichkeitsporträt" : norm === "id" ? "Potret Kepribadian" : "ملامح الشخصية ومنطقة الراحة"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{msgs.chart.balancedLabel || "Balanced (Light)"}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {arcana.personality.portrait}
              </p>
              <div className="pt-2 border-t border-border-subtle/50 text-xs text-ink-muted">
                <strong>{msgs.chart.comfortPoint || "Comfort Zone"}:</strong> {arcana.personality.comfortZone}
              </div>
            </Card>

            <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
                <ShieldAlert className="w-4 h-4" />
                <span>{msgs.chart.shadowLabel || "Shadow Tendencies"}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {arcana.personality.shadowTendency}
              </p>
            </Card>
          </div>
        </section>

        {/* Life Spheres: Relationships & Money */}
        <section aria-labelledby="spheres-heading" className="space-y-6">
          <h2 id="spheres-heading" className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
            {norm === "es" ? "Canales del Amor y las Finanzas" : norm === "pt-BR" ? "Canais de Amor e Finanças" : norm === "de" ? "Liebe und Finanzen" : norm === "id" ? "Saluran Cinta dan Keuangan" : "قنوات الحب والمال"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card elevation="low" className="p-6 space-y-4 bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-700 dark:text-rose-400">
                <Heart className="w-4 h-4" />
                <span>{msgs.chart.loveChannel || "Love Line"}</span>
              </div>
              <div className="text-xs sm:text-sm text-ink-secondary space-y-2">
                <p><strong>{norm === "es" ? "Dinámica:" : "Dynamics:"}</strong> {arcana.relationships.dynamics}</p>
                <p><strong>{norm === "es" ? "Pareja ideal:" : "Partner profile:"}</strong> {arcana.relationships.partnerProfile}</p>
                <p><strong>{norm === "es" ? "Área de evolución:" : "Growth area:"}</strong> {arcana.relationships.growthArea}</p>
              </div>
            </Card>

            <Card elevation="low" className="p-6 space-y-4 bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
                <Coins className="w-4 h-4" />
                <span>{msgs.chart.moneyChannel || "Money Line"}</span>
              </div>
              <div className="text-xs sm:text-sm text-ink-secondary space-y-2">
                <p><strong>{norm === "es" ? "Ruta profesional:" : "Career path:"}</strong> {arcana.money.careerPath}</p>
                <p><strong>{norm === "es" ? "Mentalidad financiera:" : "Financial mindset:"}</strong> {arcana.money.financialMindset}</p>
                <p><strong>{norm === "es" ? "Bloqueo a superar:" : "Potential block:"}</strong> {arcana.money.potentialBlock}</p>
              </div>
            </Card>
          </div>
        </section>

        {/* AdSense In-Article */}
        <AdSenseUnit slotId="arcana-middle-responsive" format="auto" />

        {/* Karmic Mission & Talents */}
        <section aria-labelledby="mission-heading" className="space-y-6">
          <h2 id="mission-heading" className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
            {norm === "es" ? "Misión Kármica y Activación de Talentos" : norm === "pt-BR" ? "Missão Cármica e Talentos" : norm === "de" ? "Karmische Lektion und Talente" : norm === "id" ? "Misi Karma dan Bakat" : "الرسالة الكارمية وتفعيل المواهب"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-400">
                <InfinityIcon className="w-4 h-4" />
                <span>{msgs.chart.karmicTail || "Karmic Lesson"}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                <strong>{norm === "es" ? "Lección pasada:" : "Past lesson:"}</strong> {arcana.karmic.pastLesson}
              </p>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                <strong>{norm === "es" ? "Sendero evolutivo:" : "Evolutionary path:"}</strong> {arcana.karmic.evolutionaryPath}
              </p>
            </Card>

            <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-400">
                <Sparkles className="w-4 h-4" />
                <span>{msgs.chart.talentZone || "Talents"}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                <strong>{norm === "es" ? "Don primordial:" : "Primary gift:"}</strong> {arcana.talents.primaryGift}
              </p>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                <strong>{norm === "es" ? "Activación diaria:" : "Daily activation:"}</strong> {arcana.talents.activation}
              </p>
            </Card>
          </div>
        </section>

        {/* Related Karmic Tails */}
        {relatedTails.length > 0 && (
          <section aria-labelledby="related-tails-heading" className="space-y-4">
            <h3 id="related-tails-heading" className="text-xl font-display font-medium text-ink-primary">
              {norm === "es" ? `Colas Kármicas vinculadas al Arcano ${arcana.number}` : `Karmic Tails featuring Arcana ${arcana.number}`}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {relatedTails.map((t) => (
                <Link
                  key={t.id}
                  href={getLocalizedPath(`/karmic-tails/${t.id}`, norm)}
                  className="p-4 rounded-xl border border-border-subtle bg-surface hover:border-brand-primary/40 hover:bg-surface-raised transition-all block text-xs"
                >
                  <span className="font-mono font-bold text-brand-primary block">{t.signature}</span>
                  <span className="font-medium text-ink-primary block truncate">{t.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Navigation Grid (All 22 Arcana) */}
        <section aria-labelledby="all-arcana-heading" className="pt-8 border-t border-border-subtle space-y-4">
          <h3 id="all-arcana-heading" className="text-lg font-display font-medium text-ink-primary text-center">
            {norm === "es" ? "Navega por los 22 Arcanos Mayores" : "Explore All 22 Major Arcana"}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: 22 }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={getLocalizedPath(`/arcana/${n}`, norm)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-semibold transition-all ${
                  n === arcana.number
                    ? "bg-brand-primary text-white shadow-sm"
                    : "bg-surface-raised border border-border-subtle text-ink-primary hover:border-brand-primary/40"
                }`}
              >
                {n}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

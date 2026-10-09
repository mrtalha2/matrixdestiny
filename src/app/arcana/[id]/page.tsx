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
import { arcanaMeanings } from "@/content/arcana-meanings";
import { karmicTailsCatalog } from "@/content/karmic-tails-catalog";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SITE_NAME, SITE_URL, getBreadcrumbSchema } from "@/lib/seo/structured-data";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";

interface ArcanaPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return Array.from({ length: 22 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export async function generateMetadata({
  params,
}: ArcanaPageProps): Promise<Metadata> {
  const num = Number(params.id);
  if (isNaN(num) || num < 1 || num > 22) {
    return { title: "Arcana Not Found | Destiny Matrix" };
  }

  const arcana = arcanaMeanings[num];
  if (!arcana) {
    return { title: "Arcana Not Found | Destiny Matrix" };
  }

  const title = arcana.metaTitle || `Arcana ${num}: ${arcana.name} Meaning in Destiny Matrix | Guide`;
  const description =
    arcana.metaDescription ||
    `Decode Arcana ${num} (${arcana.name}) in the Destiny Matrix: balanced vs shadow traits, love gate, wealth channel, and all chart positions.`;

  const canonical = `${SITE_URL}/arcana/${num}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [
        {
          url: `${SITE_URL}/og-image.webp`,
          width: 1200,
          height: 630,
          alt: `Arcana ${num} ${arcana.name} Destiny Matrix Guide`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.webp`],
    },
  };
}

export default async function ArcanaDetailPage({ params }: ArcanaPageProps) {
  const num = Number(params.id);
  if (isNaN(num) || num < 1 || num > 22) {
    notFound();
  }

  if (params.id !== num.toString()) {
    redirect(`/arcana/${num}`);
  }

  const arcana = arcanaMeanings[num];
  if (!arcana) {
    notFound();
  }

  const relatedTails = Object.values(karmicTailsCatalog).filter((t) =>
    t.triad.includes(num)
  );

  const arcanaUrl = `${SITE_URL}/arcana/${arcana.number}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${arcanaUrl}#article`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
    },
    headline: `Arcana ${arcana.number}: ${arcana.name} Meaning in the Destiny Matrix`,
    description: arcana.metaDescription || arcana.essence,
    image: `${SITE_URL}/og-image.webp`,
    datePublished: "2026-03-15",
    dateModified: arcana.lastUpdated || "2026-10-10",
    author: {
      "@type": "Organization",
      name: "Matrix of Destiny Editorial Team",
      url: `${SITE_URL}/editorial-policy`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": arcanaUrl,
    },
  };

  const faqJsonLd = arcana.faqs && arcana.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: arcana.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "22 Arcana", url: "/tools" },
    { name: `Arcana ${arcana.number}: ${arcana.name}`, url: `/arcana/${arcana.number}` },
  ]);

  return (
    <div className="relative min-h-screen py-10 sm:py-16">
      <SacredAuraBackground intensity="subtle" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="site-container max-w-4xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="hover:text-ink-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-ink-primary transition-colors">
            Tools & Arcana
          </Link>
          <span>/</span>
          <span className="text-ink-primary font-medium">
            Arcana {arcana.number}: {arcana.name}
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
                  22 Major Arcana Archetype
                </span>
                <p className="text-xs text-ink-muted flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Last reviewed: {arcana.lastUpdated || "October 2026"}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>6 min read</span>
                </p>
              </div>
            </div>

            <Link href="/#calculator-hero">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Calculate My Chart
              </Button>
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-ink-primary tracking-tight leading-tight">
            Arcana {arcana.number}: {arcana.name} Meaning in the Destiny Matrix
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
        <blockquote className="p-6 rounded-2xl bg-surface-raised border-l-4 border-brand-primary italic text-base sm:text-lg text-ink-primary shadow-sm leading-relaxed">
          &ldquo;{arcana.pullQuote}&rdquo;
        </blockquote>

        {/* Section 1: In Balance vs Out of Balance */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-primary" />
            <h2 className="text-2xl font-display font-medium text-ink-primary">
              In Balance vs Out of Balance
            </h2>
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed">
            In the Destiny Matrix framework, no energy is inherently negative or positive. Every Arcana expresses along a spectrum from its resource (balanced) state to its shadow (out of balance) state. Use this comparison table to identify where your energy currently resonates.
          </p>

          {arcana.balanceTable && arcana.balanceTable.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-border-subtle shadow-sm bg-surface">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-raised border-b border-border-subtle text-ink-primary font-mono text-[11px] sm:text-xs uppercase">
                    <th className="p-3.5 sm:p-4 font-semibold">Aspect</th>
                    <th className="p-3.5 sm:p-4 font-semibold text-status-success">Balanced Expression (+)</th>
                    <th className="p-3.5 sm:p-4 font-semibold text-status-error">Shadow Expression (-)</th>
                    <th className="p-3.5 sm:p-4 font-semibold text-ink-muted">How to Notice It</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-ink-secondary">
                  {arcana.balanceTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-canvas/50 transition-colors">
                      <td className="p-3.5 sm:p-4 font-semibold text-ink-primary whitespace-nowrap">
                        {row.aspect}
                      </td>
                      <td className="p-3.5 sm:p-4 leading-relaxed">
                        {row.balanced}
                      </td>
                      <td className="p-3.5 sm:p-4 leading-relaxed text-ink-primary">
                        {row.shadow}
                      </td>
                      <td className="p-3.5 sm:p-4 leading-relaxed italic text-ink-muted">
                        {row.noticeSignal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Card elevation="subtle" className="p-6 bg-surface border-border-subtle space-y-3">
              <p className="text-sm text-ink-secondary leading-relaxed">
                <strong className="text-status-success">Balanced State: </strong>
                {arcana.personality.portrait}
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed">
                <strong className="text-status-error">Shadow Trap: </strong>
                {arcana.personality.shadowTendency}
              </p>
            </Card>
          )}
        </section>

        {/* Section 2: Arcana in Each Chart Position */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-chart-spirit" />
            <h2 className="text-2xl font-display font-medium text-ink-primary">
              Arcana {arcana.number} in Each Chart Position
            </h2>
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed">
            The meaning of Arcana {arcana.number} changes significantly depending on where it falls on your personal octagram chart. Below are the precise interpretations for each key vertex calculated by our engine:
          </p>

          <div className="space-y-4">
            {/* Day Energy / Point A */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface space-y-2">
              <h3 className="font-display font-medium text-base sm:text-lg text-ink-primary flex items-center justify-between">
                <span>Day of Birth (Point A — Physical Persona)</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary">
                  Outer Ego
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {arcana.positions?.personality ||
                  `At Point A, Arcana ${arcana.number} governs your conscious persona and outer vitality. It shapes how you introduce yourself to society and how coworkers perceive your instinctive leadership. ${arcana.personality.portrait}`}
              </p>
            </div>

            {/* Month Energy / Point B */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface space-y-2">
              <h3 className="font-display font-medium text-base sm:text-lg text-ink-primary flex items-center justify-between">
                <span>Month of Birth (Point B — Spiritual Connection)</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-chart-spirit/10 text-chart-spirit">
                  Intuition
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {arcana.positions?.spirit ||
                  `At Point B, Arcana ${arcana.number} represents your intuitive antenna and spiritual guardian support. It directs your philosophical values and moral intuition. ${arcana.talents.primaryGift}`}
              </p>
            </div>

            {/* Year Energy / Point C */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface space-y-2">
              <h3 className="font-display font-medium text-base sm:text-lg text-ink-primary flex items-center justify-between">
                <span>Year of Birth (Point C — Material Realization)</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-chart-wealth/10 text-chart-wealth">
                  Career
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {arcana.positions?.socialRealization ||
                  `At Point C, Arcana ${arcana.number} shows how you harvest material prosperity and social achievement in adulthood. It outlines your worldly vocation and financial capacity. ${arcana.money.careerPath}`}
              </p>
            </div>

            {/* Karmic Tail Root / Point D */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface space-y-2">
              <h3 className="font-display font-medium text-base sm:text-lg text-ink-primary flex items-center justify-between">
                <span>Bottom Vertex (Point D — Karmic Tail Root)</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-chart-karmic/10 text-chart-karmic">
                  Subconscious Debt
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {arcana.positions?.karmicTailRoot ||
                  `At Point D, Arcana ${arcana.number} represents unlearned past lessons and deep subconscious triggers. This node starts in a shadow state and requires conscious evolution. ${arcana.karmic.pastLesson}`}
              </p>
            </div>

            {/* Center Comfort Zone / Point E */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface space-y-2">
              <h3 className="font-display font-medium text-base sm:text-lg text-ink-primary flex items-center justify-between">
                <span>Center Point (Point E — Soul Comfort Zone)</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-status-success/10 text-status-success">
                  Inner Sanctuary
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {arcana.positions?.comfortZone ||
                  `At Point E, Arcana ${arcana.number} is your central energetic battery and soul sanctuary. It represents the environment and mindset where you feel at home. ${arcana.personality.comfortZone}`}
              </p>
            </div>

            {/* Love Entrance / Point L */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface space-y-2">
              <h3 className="font-display font-medium text-base sm:text-lg text-ink-primary flex items-center justify-between">
                <span>Love Entrance (Point L — Relationship Key)</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-chart-love/10 text-chart-love">
                  Partner Archetype
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {arcana.positions?.loveEntrance ||
                  `At Point L, Arcana ${arcana.number} reveals your ideal romantic partner archetype and encounter gate. It determines the psychological atmosphere that keeps passion alive. ${arcana.relationships.partnerProfile}`}
              </p>
            </div>

            {/* Wealth Entrance / Point M_money */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface space-y-2">
              <h3 className="font-display font-medium text-base sm:text-lg text-ink-primary flex items-center justify-between">
                <span>Money Entrance (Point M_money — Wealth Key)</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-chart-wealth/10 text-chart-wealth">
                  Cash Flow Gate
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {arcana.positions?.moneyEntrance ||
                  `At Point M_money, Arcana ${arcana.number} unlocks financial flow and career velocity. It details the ethical and strategic requirements for multiplying income. ${arcana.money.financialMindset}`}
              </p>
            </div>
          </div>
        </section>

        {/* Mid-Content Ad Unit */}
        <AdSenseUnit
          slotId={`arcana-mid-${arcana.number}`}
          format="horizontal"
          minHeight="min-h-[90px]"
        />

        {/* Section 3: In Love & Relationships */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-chart-love">
            <Heart className="w-5 h-5" />
            <h2 className="text-2xl font-display font-medium text-ink-primary">
              In Love & Relationships
            </h2>
          </div>
          <Card elevation="subtle" className="p-6 bg-surface border-border-subtle text-sm text-ink-secondary leading-relaxed space-y-4">
            <p>{arcana.relationships.dynamics}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle space-y-1">
                <strong className="text-ink-primary block font-mono text-[11px] uppercase">
                  Ideal Partner Resonance:
                </strong>
                <p>{arcana.relationships.partnerProfile}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle space-y-1">
                <strong className="text-ink-primary block font-mono text-[11px] uppercase">
                  Growth Area in Intimacy:
                </strong>
                <p>{arcana.relationships.growthArea}</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 4: Money & Career Energy */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-chart-wealth">
            <Coins className="w-5 h-5" />
            <h2 className="text-2xl font-display font-medium text-ink-primary">
              Money & Career Energy
            </h2>
          </div>
          <Card elevation="subtle" className="p-6 bg-surface border-border-subtle text-sm text-ink-secondary leading-relaxed space-y-4">
            <p>{arcana.money.careerPath}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle space-y-1">
                <strong className="text-ink-primary block font-mono text-[11px] uppercase">
                  Financial Leverage Mindset:
                </strong>
                <p>{arcana.money.financialMindset}</p>
              </div>
              <div className="p-4 rounded-xl border border-status-error/20 bg-status-error/5 space-y-1">
                <strong className="text-status-error block font-mono text-[11px] uppercase">
                  Potential Financial Blockage:
                </strong>
                <p className="text-ink-primary">{arcana.money.potentialBlock}</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 5: How to Work With This Energy */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-primary" />
            <h2 className="text-2xl font-display font-medium text-ink-primary">
              How to Work With This Energy
            </h2>
          </div>
          <Card elevation="subtle" className="p-6 bg-surface border-border-subtle text-sm text-ink-secondary leading-relaxed space-y-3">
            <p className="text-xs text-ink-muted">
              Use these three concrete self-reflection exercises to harmonize Arcana {arcana.number} in your daily thoughts and actions:
            </p>
            <ol className="space-y-3 list-decimal list-inside text-ink-primary">
              {(arcana.reflectionPrompts || [
                `Observe where Arcana ${arcana.number} expresses in your daily routines and notice any shadow tendencies.`,
                `Practice one concrete action that shifts this energy toward its balanced, creative expression.`,
                `Journal about how this energy can serve your loved ones and community with greater kindness.`,
              ]).map((prompt, pIdx) => (
                <li key={pIdx} className="leading-relaxed">
                  <span className="font-medium text-ink-primary">{prompt}</span>
                </li>
              ))}
            </ol>
          </Card>
        </section>

        {/* Section 6: Frequently Asked Questions */}
        {arcana.faqs && arcana.faqs.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brand-primary" />
              <h2 className="text-2xl font-display font-medium text-ink-primary">
                Frequently Asked Questions About Arcana {arcana.number}
              </h2>
            </div>
            <div className="space-y-3">
              {arcana.faqs.map((faq, fIdx) => (
                <Card key={fIdx} elevation="subtle" className="p-5 bg-surface border-border-subtle space-y-2">
                  <h3 className="font-display font-medium text-base text-ink-primary">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Section 7: Cross-linked Karmic Tails */}
        {relatedTails.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-border-subtle">
            <div className="flex items-center gap-2">
              <InfinityIcon className="w-5 h-5 text-chart-karmic" />
              <h2 className="text-2xl font-display font-medium text-ink-primary">
                Karmic Tails Featuring Energy {arcana.number} ({relatedTails.length})
              </h2>
            </div>
            <p className="text-xs text-ink-secondary">
              If Energy {arcana.number} falls into the bottom karmic triangle (Points D, D2, D1), it contributes to one of these subconscious programs:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedTails.map((t) => (
                <Link
                  key={t.id}
                  href={`/karmic-tails/${t.id}`}
                  className="p-4 rounded-xl border border-border-subtle bg-surface hover:border-chart-karmic/50 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-chart-karmic/10 text-chart-karmic">
                      {t.signature}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-chart-karmic transition-colors" />
                  </div>
                  <h4 className="font-display font-medium text-sm text-ink-primary group-hover:text-chart-karmic transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-xs text-ink-muted italic line-clamp-1">&ldquo;{t.archetype}&rdquo;</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Living Affirmation */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-brand-primary/10 to-transparent border border-brand-primary/20 text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-primary font-semibold">
            Living Affirmation for Arcana {arcana.number}
          </span>
          <blockquote className="text-lg sm:text-xl font-serif italic text-ink-primary max-w-2xl mx-auto">
            &ldquo;{arcana.affirmation}&rdquo;
          </blockquote>
        </section>

        {/* Bottom CTA to Calculator */}
        <div className="p-8 rounded-3xl bg-surface border border-brand-primary/30 text-center space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-display font-medium text-ink-primary">
            Discover Where Arcana {arcana.number} Appears in Your Personal Chart
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary max-w-xl mx-auto">
            Calculate your complete 22-energy Destiny Matrix octagram by exact birth date. See your soul comfort zone, karmic tail, love entrance, and wealth gate in seconds.
          </p>
          <Link href="/#calculator-hero">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Calculate Free Destiny Matrix Chart
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

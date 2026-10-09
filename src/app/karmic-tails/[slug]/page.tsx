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
import { karmicTailsCatalog } from "@/content/karmic-tails-catalog";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { KarmicTailChecker } from "@/components/calculator/KarmicTailChecker";
import { KarmicTailMicroCard } from "@/components/share/KarmicTailMicroCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SITE_NAME, SITE_URL, getBreadcrumbSchema } from "@/lib/seo/structured-data";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";

interface KarmicTailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return Object.values(karmicTailsCatalog).map((t) => ({
    slug: t.id,
  }));
}

export async function generateMetadata({
  params,
}: KarmicTailPageProps): Promise<Metadata> {
  const staticTail = Object.values(karmicTailsCatalog).find(
    (t) => t.id === params.slug || t.signature === params.slug
  );

  if (!staticTail) {
    return { title: "Karmic Tail Not Found | Destiny Matrix" };
  }

  const canonicalSlug = staticTail.id;
  const trapSnippet = staticTail.currentLifeTrap ? staticTail.currentLifeTrap.split(".")[0] + "." : "";
  const lessonSnippet = staticTail.karmicLesson || "";

  const title = `Karmic Tail ${staticTail.signature} (${staticTail.name}) — Meaning & Transmutation`;
  const description =
    `Complete guide to Karmic Tail ${staticTail.signature} (${staticTail.name}). Explore past-life debt, subconscious traps (${trapSnippet}), and transmutation rituals (${lessonSnippet}) in the Matrix of Destiny.`;

  const canonical = `${SITE_URL}/karmic-tails/${canonicalSlug}`;

  return {
    title: `${title} | Destiny Matrix`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function KarmicTailDetailPage({ params }: KarmicTailPageProps) {
  const staticTail = Object.values(karmicTailsCatalog).find(
    (t) => t.id === params.slug || t.signature === params.slug
  );

  if (!staticTail) {
    notFound();
  }

  // Enforce single canonical URL: permanently redirect signature/alternate queries to preferred canonical slug
  if (params.slug !== staticTail.id) {
    redirect(`/karmic-tails/${staticTail.id}`);
  }

  const tail = {
    id: staticTail.id,
    slug: staticTail.id,
    signature: staticTail.signature,
    triad: JSON.stringify(staticTail.triad),
    name: staticTail.name,
    archetype: staticTail.archetype,
    status: "PUBLISHED",
    pastLifeStory: staticTail.pastLifeStory,
    currentLifeTrap: staticTail.currentLifeTrap,
    karmicLesson: staticTail.karmicLesson,
    healingRecommendations: JSON.stringify(staticTail.healingRecommendations),
    affirmation: staticTail.affirmation,
    historicalArchetype: null,
    transmutationRitual: null,
    bodyMarkdown: null,
    revalidateSecs: 3600,
  };

  const triadNumbers: number[] = (() => {
    try {
      return JSON.parse(tail.triad);
    } catch {
      return [18, 6, 6];
    }
  })();

  const recommendations: string[] = (() => {
    try {
      return JSON.parse(tail.healingRecommendations);
    } catch {
      return [];
    }
  })();

  const tailUrl = `${SITE_URL}/karmic-tails/${tail.slug}`;

  // JSON-LD Schemas: Article + FAQPage + BreadcrumbList
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${tailUrl}#article`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
    },
    headline: `Karmic Tail ${tail.signature}: ${tail.name} in Matrix of Destiny`,
    description: tail.currentLifeTrap,
    image: `${SITE_URL}/og-image.webp`,
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
      "@id": tailUrl,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does Karmic Tail ${tail.signature} mean in the Destiny Matrix?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: tail.pastLifeStory,
        },
      },
      {
        "@type": "Question",
        name: `What is the primary subconscious trap for Karmic Tail ${tail.signature}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: tail.currentLifeTrap,
        },
      },
      {
        "@type": "Question",
        name: `How do you transmute and balance Karmic Tail ${tail.signature}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: tail.karmicLesson,
        },
      },
    ],
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: `Karmic Tail ${tail.signature}`, url: `/karmic-tails/${tail.slug}` },
  ]);

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[articleSchema, faqSchema, breadcrumbSchema]} />
      <SacredAuraBackground showGeometry intensity="subtle" />

      <div className="px-4 sm:px-6 lg:px-12 py-12 max-w-5xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-ink-muted font-mono">
          <Link href="/" className="hover:text-ink-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-ink-primary transition-colors">
            Tools
          </Link>
          <span>/</span>
          <span className="text-brand-primary">Karmic Tail {tail.signature}</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chart-karmic/10 border border-chart-karmic/25 text-chart-karmic text-xs font-mono font-semibold uppercase">
            <InfinityIcon className="w-3.5 h-3.5" />
            <span>Karmic Signature: {tail.signature}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-medium text-ink-primary tracking-tight">
            {tail.name}
          </h1>

          <p className="text-base sm:text-lg text-ink-secondary italic font-serif max-w-3xl">
            Archetype: &ldquo;{tail.archetype}&rdquo; — Navigating the shadow frequencies of Arcana {triadNumbers.join(", ")}.
          </p>

          {/* Triad Energy Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs font-mono uppercase text-ink-muted">Constituent Vertices:</span>
            {triadNumbers.map((num, idx) => {
              const info = arcanaMeanings[num];
              return (
                <Link
                  key={idx}
                  href={`/arcana/${num}`}
                  className="px-3 py-1.5 rounded-lg border border-border-strong bg-surface hover:border-brand-primary flex items-center gap-2 text-xs transition-colors shadow-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary font-mono font-bold flex items-center justify-center text-[11px]">
                    {num}
                  </span>
                  <span className="font-medium text-ink-primary">
                    {info?.name || `Energy ${num}`}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Interactive "Check If You Have This Tail" Mini Calculator */}
        <section aria-labelledby="calculator-checker-heading">
          <KarmicTailChecker currentSignature={tail.signature} tailName={tail.name} />
        </section>

        {/* Section 1: Past Life Origin Story */}
        <section className="space-y-4 pt-4 border-t border-border-subtle">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <h2 className="text-2xl font-display font-medium text-ink-primary">
              The Incarnational Origin (Past-Life Story)
            </h2>
          </div>
          <Card elevation="subtle" className="p-6 bg-surface border-border-subtle leading-relaxed text-sm text-ink-secondary space-y-3">
            <p>{tail.pastLifeStory}</p>
            <p className="text-xs text-ink-muted pt-2 border-t border-border-subtle">
              In the Natalia Ladini Matrix of Destiny, Point D marks the soul&apos;s heaviest unresolved energetic baggage brought into the physical body.
            </p>
          </Card>
        </section>

        {/* Section 2: Present Life Subconscious Trap */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-status-error">
            <ShieldAlert className="w-4 h-4" />
            <h2 className="text-2xl font-display font-medium text-ink-primary">
              The Present-Life Subconscious Trap
            </h2>
          </div>
          <Card elevation="subtle" className="p-6 border-status-error/25 bg-status-error/5 text-ink-primary text-sm leading-relaxed space-y-3">
            <p>{tail.currentLifeTrap}</p>
            <div className="text-xs text-ink-secondary italic pt-2">
              Tip: When experiencing unexplained frustration or emotional triggers, pause and notice if you are executing this exact subconscious loop.
            </div>
          </Card>
        </section>

        {/* Section 3: Karmic Lesson & Evolution */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-status-success" />
            <h2 className="text-2xl font-display font-medium text-ink-primary">
              The Karmic Lesson & Spiritual Evolution
            </h2>
          </div>
          <Card elevation="subtle" className="p-6 bg-surface border-border-subtle text-sm text-ink-secondary leading-relaxed">
            <p>{tail.karmicLesson}</p>
          </Card>
        </section>

        {/* Non-intrusive Mid-Page Ad Placement */}
        <AdSenseUnit
          slotId={`karmic-tail-mid-${tail.signature.replace(/[^a-zA-Z0-9]/g, "-")}`}
          format="horizontal"
          minHeight="min-h-[90px]"
        />

        {/* Section 4: Historical & Mythological Archetypes */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-primary" />
            <h2 className="text-2xl font-display font-medium text-ink-primary">
              Historical & Mythological Archetype Examples
            </h2>
          </div>
          <Card elevation="subtle" className="p-6 bg-surface border-border-subtle text-sm text-ink-secondary leading-relaxed space-y-3">
            <p>
              Souls carrying the <strong>{tail.signature}</strong> frequency frequently mirror historical figures who grappled with the ethical use of influence, personal freedom, and relational devotion. In mythology, this corresponds to archetypes of {tail.archetype.toLowerCase()} who must confront the threshold between egocentric control and universal surrender.
            </p>
            <p className="text-xs text-ink-muted italic">
              {/* TODO: source content placeholder for expanded historical biographical anecdotes */}
              TODO: source content placeholder — Editorial team to add 2-3 specific historical biographies matching the {tail.signature} program.
            </p>
          </Card>
        </section>

        {/* Section 5: Transmutation Ritual & Recommendations */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-brand-primary" />
            <h2 className="text-2xl font-display font-medium text-ink-primary">
              Sacred Transmutation Ritual & Daily Practices
            </h2>
          </div>
          <Card elevation="subtle" className="p-6 bg-surface border-border-subtle space-y-4">
            <p className="text-sm text-ink-secondary">
              To elevate the {tail.signature} triad from its shadow (&ldquo;minus&rdquo;) into its enlightened spiritual resource (&ldquo;plus&rdquo;), apply these core transmutation disciplines:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-ink-secondary">
              {recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary font-mono font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    {i + 1}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-muted pt-3 border-t border-border-subtle italic">
              {/* TODO: source content placeholder for guided meditation audio */}
              TODO: source content placeholder — Add downloadable daily meditation script and audio guidance for {tail.name}.
            </p>
          </Card>
        </section>

        {/* Section 6: Affirmation & Micro-Card Share */}
        <section className="space-y-6 pt-4 border-t border-border-subtle">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-primary/10 to-transparent border border-brand-primary/20 text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-primary font-semibold">
              Daily Living Affirmation
            </span>
            <blockquote className="text-lg sm:text-xl font-serif italic text-ink-primary max-w-2xl mx-auto">
              &ldquo;{tail.affirmation}&rdquo;
            </blockquote>
          </div>

          {/* Share Micro-Card */}
          <KarmicTailMicroCard
            signature={tail.signature}
            name={tail.name}
            archetype={tail.archetype}
            trap={tail.currentLifeTrap}
            affirmation={tail.affirmation}
          />
        </section>
      </div>
    </div>
  );
}

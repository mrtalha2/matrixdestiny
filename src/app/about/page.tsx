import type { Metadata } from "next";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: "About Matrix of Destiny — Independent Educational Publication",
  description:
    "Learn about Matrix of Destiny: an independent web application and educational publication exploring the 22-energy Destiny Matrix system through deterministic calculations and archetypal interpretations.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Matrix of Destiny — Independent Educational Publication",
    description:
      "Explore the mission, calculation methodology, and interpretive boundaries of the Matrix of Destiny educational platform.",
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#webpage`,
    url: `${SITE_URL}/about`,
    name: "About Matrix of Destiny",
    description:
      "Learn about Matrix of Destiny: an independent web application and educational publication exploring the 22-energy Destiny Matrix system through deterministic calculations and archetypal interpretations.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[aboutPageSchema, breadcrumbSchema]} />
      <SacredAuraBackground showGeometry intensity="subtle" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-ink-muted text-xs">•</span>
            <Badge variant="brand" size="sm">
              Transparency & Identity
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            About Matrix of Destiny
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted font-mono">
            An Independent Web Application & Educational Publication
          </p>
        </div>

        {/* Executive Overview Card */}
        <Card elevation="low" className="p-6 sm:p-8 border-l-4 border-l-brand-primary space-y-4 bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-medium text-ink-primary">
                Our Purpose
              </h2>
              <span className="text-xs text-ink-muted font-mono">
                Demystifying the Geometry of Evolution
              </span>
            </div>
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed">
            <strong>Matrix of Destiny</strong> is an independent web application and educational publication exploring the Matrix of Destiny system through birth-date calculations, symbolic interpretations, and self-reflection tools.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed">
            We provide an open, accessible, and privacy-respecting platform where curious individuals, philosophy enthusiasts, and students of archetypal symbolism can explore their personal numerological blueprints without paywalls, commercial sensationalism, or supernatural claims.
          </p>
        </Card>

        {/* 4 Core Pillars */}
        <div className="space-y-10 text-ink-secondary text-sm leading-relaxed">
          {/* Section 1: What We Provide */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-ink-primary">
              <Layers className="w-5 h-5 text-brand-primary" />
              <h2 className="font-display text-2xl font-medium text-ink-primary">
                What This Website Provides
              </h2>
            </div>
            <p>
              The platform brings together a comprehensive suite of interactive tools and reference materials:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-brand-primary font-semibold text-xs uppercase font-mono">
                  <Calculator className="w-4 h-4" />
                  <span>8 Interactive Calculators</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Deterministic calculation tools for the Core Natal Octagram, Karmic Tail, Money Channel, Love Line, Talents Triad, Couple Compatibility, Child Matrix, and Yearly Energy Transits.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-chart-spirit font-semibold text-xs uppercase font-mono">
                  <Sparkles className="w-4 h-4" />
                  <span>Visual Octagram Diagrams</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Accurate vector visualizations of the 8-pointed star combining the straight physical square and diagonal spiritual diamond with interactive node inspections.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-chart-wealth font-semibold text-xs uppercase font-mono">
                  <BookOpen className="w-4 h-4" />
                  <span>Educational Reference Library</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Comprehensive interpretations covering all 22 Major Arcana energies, all 26 recognized Karmic Tail combinations, and detailed explanatory guides.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-brand-secondary font-semibold text-xs uppercase font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Privacy-First Architecture</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Pure in-memory calculations with zero server-side storage of visitor birth dates. Saved charts reside strictly on your own device in your browser&apos;s local storage.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Calculation Methodology */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-ink-primary">
              <Calculator className="w-5 h-5 text-brand-primary" />
              <h2 className="font-display text-2xl font-medium text-ink-primary">
                Calculation Methodology
              </h2>
            </div>
            <p>
              Calculations on this website are deterministic mathematical transformations of the supplied birth date according to the documented Matrix of Destiny methodology (originally codified by Natalia Ladini):
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong>Input Coordinates:</strong> The calculation takes your exact calendar birth date (day, month, and year) as input parameters.
              </li>
              <li>
                <strong>Modulo-22 Addition:</strong> Unlike classical Pythagorean numerology which reduces numbers to single digits (1–9), the Matrix of Destiny reduces numbers exceeding 22 by adding their constituent digits (for example, day 25 reduces to 2 + 5 = 7; year 1989 reduces to 1 + 9 + 8 + 9 = 27, and 2 + 7 = 9). The number 22 is preserved intact as a sovereign archetype.
              </li>
              <li>
                <strong>Geometric Cross & Diagonals:</strong> The cardinal vertices (personality, spiritual channel, material realization, and karmic root) are derived first, followed by the central soul comfort zone and the 45-degree diagonal channels (love and wealth).
              </li>
              <li>
                <strong>In-Memory Processing:</strong> Calculations are performed ephemerally in computer memory and rendered directly to your screen without writing personal records to a database.
              </li>
            </ul>
          </section>

          {/* Section 3: Interpretation Boundaries */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-ink-primary">
              <Info className="w-5 h-5 text-brand-primary" />
              <h2 className="font-display text-2xl font-medium text-ink-primary">
                Interpretation Boundaries & Non-Reliance
              </h2>
            </div>
            <p>
              We believe intellectual honesty is essential when exploring symbolic and archetypal systems:
            </p>
            <div className="p-5 rounded-2xl bg-surface border border-border-subtle space-y-3">
              <p>
                <strong>Symbolic & Archetypal Nature:</strong> All interpretations, descriptions, compatibility scores, and yearly influence indicators presented on this platform represent philosophical and archetypal reflections based on Tarot and numerological symbolism. They are not empirical observations or scientifically proven facts.
              </p>
              <p>
                <strong>No Scientific Validation:</strong> The Matrix of Destiny does not claim scientific or empirical validation. Numerology is a symbolic framework for introspection, creative contemplation, and entertainment—not a branch of physical science or clinical psychology.
              </p>
              <p>
                <strong>No Professional Advice:</strong> Insights provided by this website do not constitute, and must never replace, certified medical care, psychiatric diagnosis, mental health therapy, financial or investment planning, tax guidance, or licensed legal counsel.
              </p>
            </div>
          </section>

          {/* Section 4: Publisher & Operator */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-ink-primary">
              <HeartHandshake className="w-5 h-5 text-brand-primary" />
              <h2 className="font-display text-2xl font-medium text-ink-primary">
                Publisher & Independence
              </h2>
            </div>
            <p>
              This website is published and maintained under the moniker <strong>Matrix of Destiny</strong> as an independent web application and educational publication.
            </p>
            <p>
              We operate independently, without affiliation to commercial spiritual organizations, paywalled subscription networks, or advertising data brokers. Our service remains 100% free to use, supported solely by standard contextual web advertisements.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-ink-muted">
              <Link href="/editorial-policy" className="text-brand-primary hover:underline">
                Read our Editorial Policy &rarr;
              </Link>
              <Link href="/contact" className="text-brand-primary hover:underline">
                Contact the Team &rarr;
              </Link>
              <Link href="/privacy" className="text-brand-primary hover:underline">
                View Privacy Commitments &rarr;
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

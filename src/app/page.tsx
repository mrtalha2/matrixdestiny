import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles, ArrowDown } from "lucide-react";
import { HeroBirthDateForm } from "@/components/calculator/HeroBirthDateForm";
import { DailyArcanaWidget } from "@/components/calculator/DailyArcanaWidget";
import { HeroChartPreview } from "@/components/matrix-chart/HeroChartPreview";
import { HomeGuideContent } from "@/components/home/HomeGuideContent";
import { FaqSection } from "@/components/home/FaqSection";
import { homepageFaqs } from "@/content/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getWebApplicationSchema, getFaqSchema, SITE_URL } from "@/lib/seo/structured-data";
import { resolvePageMetadata } from "@/lib/settings/site-settings";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/", {
    title: "Destiny Matrix Calculator — Free Chart, Full Reading & How to Read It",
    description:
      "Enter your birth date and see your full Destiny Matrix chart in seconds. No login, no time limit, no cost. Below the calculator, you'll find a plain-language guide to reading your chart, checking compatibility, and understanding your love line.",
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title: "Destiny Matrix Calculator — Free Chart, Full Reading & How to Read It",
      description:
        "Enter your birth date and see your full Destiny Matrix chart in seconds. No login, no time limit, no cost. Below the calculator, you'll find a plain-language guide to reading your chart, checking compatibility, and understanding your love line.",
      url: SITE_URL,
    },
  });
}

export default function HomePage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Destiny Matrix Calculator",
    description:
      "An architectural, birth-date-based numerology framework decoding your personal energy octagram across personality, karma, love, wealth, and life purpose.",
    url: SITE_URL,
  });

  const faqSchema = getFaqSchema(homepageFaqs);

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={webAppSchema} />
      <JsonLd schema={faqSchema} />

      <div>
        {/* =========================================================================
            1. HERO SECTION: Value Proposition + Primary Conversion Calculator Form
            ========================================================================= */}
        <section
          id="calculator-hero"
          aria-labelledby="hero-title"
          className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-border-subtle/50"
        >
          {/* Eye-Catching Cosmic Octagram Background Image with Cinematic Overlay */}
          <div className="absolute inset-0 pointer-events-none select-none -z-10 overflow-hidden">
            <Image
              src="/images/hero/cosmic-octagram-hero.webp"
              alt="Cosmic Octagram Sacred Geometry Portal"
              fill
              priority
              quality={75}
              className="object-cover object-center opacity-30 dark:opacity-40 mix-blend-screen scale-105 transform motion-safe:hover:scale-100 transition-transform duration-1000"
              sizes="100vw"
            />
            {/* Multi-layered radial and linear gradients for text readability & luxury glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-canvas/60 via-canvas/90 to-canvas" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-canvas/70 to-canvas" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/15 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 2xl:gap-24 items-center">
              {/* Left Col: One-Sentence Value Proposition & Immediate Birth-Date Entry */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-brand-primary/30 text-xs font-medium text-ink-primary mb-5 shadow-elevation-subtle backdrop-blur-md w-fit">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary shrink-0 animate-pulse" />
                  <span className="font-mono text-[11px] tracking-wide uppercase text-brand-primary font-bold">
                    2026 Cosmic Geometry Engine
                  </span>
                </div>

                {/* High-Impact Headline */}
                <h1
                  id="hero-title"
                  className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-display font-normal text-ink-primary tracking-tight leading-[1.15] mb-4 drop-shadow-sm"
                >
                  Destiny Matrix Calculator — Free Chart, Full Reading &amp; How to Read It
                </h1>

                {/* Subtitle / Plain-Language Guide Introduction */}
                <p className="text-sm sm:text-base xl:text-lg text-ink-secondary leading-relaxed mb-6 max-w-xl xl:max-w-2xl font-sans">
                  Enter your birth date and see your full Destiny Matrix chart in seconds. No login,
                  no time limit, no cost. Below the calculator, you&apos;ll find a plain-language
                  guide to reading your chart, checking compatibility, and understanding your love line.
                </p>

                {/* Direct Calculator Input — Hero Conversion Action */}
                <div className="w-full max-w-md xl:max-w-lg 2xl:max-w-xl">
                  <HeroBirthDateForm />
                </div>
              </div>

              {/* Right Col: Stylized Interactive Octagram Chart Preview with Radiant Aura */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-primary/20 via-chart-spirit/15 to-chart-wealth/20 rounded-full blur-2xl -z-10" />
                <HeroChartPreview />
                <div className="mt-4 text-center">
                  <span className="text-xs font-mono text-ink-muted">
                    Mathematical modulo-22 octagram • 24+ energetic coordinates
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Scroll Indicator */}
            <div className="hidden lg:flex items-center justify-center pt-12">
              <a
                href="#guide-content"
                aria-label="Scroll to guide content"
                className="flex flex-col items-center text-ink-muted hover:text-ink-primary transition-colors text-xs space-y-1.5"
              >
                <span>Read Full Plain-Language Guide</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>
            </div>
          </div>
        </section>

        {/* Daily Arcana Micro-Widget */}
        <section aria-label="Daily Energy Alignment" className="site-container -mt-4 mb-8">
          <DailyArcanaWidget />
        </section>

        {/* Non-intrusive Display Ad Slot below Hero / Widget */}
        <section aria-label="Sponsorship" className="site-container my-8">
          <AdSenseUnit slotId="home-leaderboard" format="horizontal" minHeight="min-h-[90px]" />
        </section>

        {/* Comprehensive Guide Content (Draft Sections 1-8) */}
        <div id="guide-content">
          <HomeGuideContent />
        </div>

        {/* FAQ SECTION with Server-Side FAQPage JSON-LD (Draft Section 9) */}
        <div className="site-container">
          <FaqSection />
        </div>
      </div>
    </div>
  );
}

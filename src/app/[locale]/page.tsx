import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Sparkles, ArrowDown } from "lucide-react";
import { HeroBirthDateForm } from "@/components/calculator/HeroBirthDateForm";
import { HeroChartPreview } from "@/components/matrix-chart/HeroChartPreview";
import { LocalizedHomeGuide } from "@/components/home/LocalizedHomeGuide";
import { FaqSection } from "@/components/home/FaqSection";
import { getLocalizedHomepageFaqs } from "@/content/localized/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getWebApplicationSchema, getFaqSchema, SITE_URL } from "@/lib/seo/structured-data";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { normalizeLocalePrefix, LOCALES, Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedHomePageProps {
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

export async function generateMetadata({ params }: LocalizedHomePageProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const titles: Record<Locale, string> = {
    en: "Destiny Matrix Calculator — Free Chart & Guide",
    es: "Calculadora Matriz del Destino — Carta Gratis por Fecha",
    "pt-BR": "Calculadora Matriz do Destino — Mapa Grátis por Data",
    de: "Matrix des Schicksals Rechner — Kostenlose Analyse",
    id: "Kalkulator Matrix of Destiny — Bagan Gratis Lengkap",
    ar: "حاسبة مصفوفة القدر — مخطط مجاني ودليل شامل",
  };

  const descriptions: Record<Locale, string> = {
    en: "Enter your birth date and see your full Destiny Matrix chart in seconds. Complete guide to your love line, money line, and karmic tail.",
    es: "Ingresa tu fecha de nacimiento y calcula tu carta completa de la Matriz del Destino gratis. Descubre tu cola kármica, amor y dinero.",
    "pt-BR": "Insira sua data de nascimento e descubra seu mapa completo da Matriz do Destino grátis. Linha do amor, dinheiro e cauda cármica.",
    de: "Berechne dein Schicksalsmatrix-Profil kostenlos anhand deines Geburtsdatums. Entschlüssele Liebeslinie, Geldlinie und Karma.",
    id: "Masukkan tanggal lahir Anda untuk menghitung bagan Matrix of Destiny gratis. Panduan lengkap garis cinta, uang, dan ekor karma.",
    ar: "أدخل تاريخ ميلادك واحسب مخطط مصفوفة القدر مجاناً بالكامل. اكتشف خط الحب والمال والذيل الكارمي برؤية معمارية واضحة.",
  };

  return buildLocalizedMetadata({
    path: "/",
    locale: norm,
    title: titles[norm],
    description: descriptions[norm],
    keywords: [
      "matriz del destino",
      "calculadora matriz del destino",
      "carta numerologica gratis",
      "cola karmica matriz del destino",
    ],
  });
}

export default function LocalizedHomePage({ params }: LocalizedHomePageProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const faqs = getLocalizedHomepageFaqs(norm);

  const heroHeadings: Record<Locale, { title: string; subtitle: string; tag: string }> = {
    en: {
      tag: "Free Destiny Matrix Calculator",
      title: "Calculate Your Destiny Matrix Chart",
      subtitle: "Enter your birth date to reveal your 22-energy blueprint across love, money, purpose, and karmic lessons.",
    },
    es: {
      tag: "Calculadora Gratuita de la Matriz del Destino",
      title: "Calcula tu Carta de la Matriz del Destino",
      subtitle: "Ingresa tu fecha de nacimiento para descubrir tu mapa de 22 energías en el amor, el dinero, tu propósito y lecciones kármicas.",
    },
    "pt-BR": {
      tag: "Calculadora Gratuita da Matriz do Destino",
      title: "Calcule seu Mapa da Matriz do Destino",
      subtitle: "Insira sua data de nascimento para revelar sua estrutura de 22 energias no amor, finanças, propósito e lições cármicas.",
    },
    de: {
      tag: "Kostenloser Schicksalsmatrix-Rechner",
      title: "Berechne deine Matrix des Schicksals",
      subtitle: "Gib dein Geburtsdatum ein, um dein 22-Energien-Profil in Liebe, Finanzen, Berufung und karmischen Lektionen zu entschlüsseln.",
    },
    id: {
      tag: "Kalkulator Matrix of Destiny Gratis",
      title: "Hitung Bagan Matrix of Destiny Anda",
      subtitle: "Masukkan tanggal lahir Anda untuk mengungkap peta 22 energi dalam cinta, keuangan, tujuan hidup, dan pelajaran karma.",
    },
    ar: {
      tag: "حاسبة مصفوفة القدر المجانية",
      title: "احسب مخطط مصفوفة القدر الخاص بك",
      subtitle: "أدخل تاريخ ميلادك للكشف عن خريطة طاقاتك الـ 22 في الحب والمال والرسالة والدروس الكارمية.",
    },
  };

  const currentHero = heroHeadings[norm] || heroHeadings.en;

  const webAppSchema = getWebApplicationSchema({
    name: msgs.common.brandName || "Matriz del Destino",
    description: currentHero.subtitle,
    url: `${SITE_URL}/${params.locale}`,
  });

  const faqSchema = getFaqSchema(faqs);

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={webAppSchema} />
      <JsonLd schema={faqSchema} />

      <div>
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section
          id="calculator-hero"
          aria-labelledby="hero-title"
          className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-border-subtle/50"
        >
          {/* Cosmic Background */}
          <div className="absolute inset-0 pointer-events-none select-none -z-10 overflow-hidden">
            <Image
              src="/images/hero/cosmic-octagram-hero.webp"
              alt="Cosmic Octagram Sacred Geometry Portal"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-30 dark:opacity-20 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-canvas/90 via-canvas/95 to-canvas" />
          </div>

          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Localized Copy */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-raised border border-border-subtle text-xs font-mono font-medium text-ink-muted">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                  <span>{currentHero.tag}</span>
                </div>

                <h1
                  id="hero-title"
                  className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-ink-primary tracking-tight leading-[1.08]"
                >
                  {currentHero.title}
                </h1>

                <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                  {currentHero.subtitle}
                </p>

                {/* Live Octagram Visual Preview */}
                <div className="pt-2 hidden sm:block">
                  <HeroChartPreview />
                </div>
              </div>

              {/* Right Column: Localized Interactive Form */}
              <div className="lg:col-span-6">
                <HeroBirthDateForm locale={norm} />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            EDITORIAL GUIDE
            ========================================================================= */}
        <LocalizedHomeGuide locale={norm} />

        {/* =========================================================================
            FAQS
            ========================================================================= */}
        <div className="site-container">
          <FaqSection
            faqs={faqs}
            title={norm === "es" ? "Respuestas Claras a Preguntas Frecuentes" : undefined}
            subtitle={
              norm === "es"
                ? "Todo lo que necesitas saber sobre la metodología, precisión de cálculos y filosofía del octagrama."
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}

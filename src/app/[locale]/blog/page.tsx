import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, BookOpen } from "lucide-react";
import { getAllArticles } from "@/content/blog/articles";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedBlogPageProps {
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

export async function generateMetadata({ params }: LocalizedBlogPageProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Blog y Guías de la Matriz del Destino — Los 22 Arcanos"
      : norm === "pt-BR"
      ? "Blog e Guias da Matriz do Destino — Os 22 Arcanos"
      : norm === "de"
      ? "Schicksalsmatrix Blog & Leitfäden — Alle 22 Arkana"
      : norm === "id"
      ? "Blog & Panduan Matrix of Destiny — 22 Arkana"
      : "مدونة مصفوفة القدر والأدلة الإرشادية — الأركانا الـ 22";

  const description =
    norm === "es"
      ? "Explora artículos educativos, guías de cálculo y análisis arquetípicos para la Matriz del Destino. Domina los 22 Arcanos Mayores y la cola kármica."
      : "Educational guides, calculation tutorials, and archetypal interpretations for the Matrix of Destiny.";

  return buildLocalizedMetadata({
    path: "/blog",
    locale: norm,
    title,
    description,
    keywords: [
      "blog matriz del destino",
      "guias matriz del destino",
      "articulos arcanos mayores",
      "como leer la matriz del destino",
    ],
  });
}

export default function LocalizedBlogPage({ params }: LocalizedBlogPageProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const articles = getAllArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: norm === "es" ? "Blog y Guías de la Matriz del Destino" : "Matrix of Destiny Blog & Knowledge Base",
    description: "Educational articles and calculation guides for the Matrix of Destiny.",
    url: `${SITE_URL}${getLocalizedPath("/blog", norm)}`,
    inLanguage: LOCALES[norm].htmlLang,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: msgs.common.home || "Home",
        item: `${SITE_URL}${getLocalizedPath("/", norm)}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: msgs.nav.blog || "Blog",
        item: `${SITE_URL}${getLocalizedPath("/blog", norm)}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-canvas py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="site-container max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb Header */}
        <div>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-ink-muted mb-4"
          >
            <Link
              href={getLocalizedPath("/", norm)}
              className="hover:text-ink-primary transition-colors"
            >
              {msgs.common.home || "Home"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-ink-primary font-medium">{msgs.nav.blog || "Blog"}</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-ink-primary tracking-tight">
              {norm === "es" ? "Guías Editoriales y Artículos de la Matriz" : "Destiny Matrix Guides & Knowledge Base"}
            </h1>
            <p className="text-base text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Guías de referencia, fundamentos de cálculo y análisis detallado de los 22 Arcanos Mayores, colas kármicas y compatibilidad."
                : "Deep dives into the 22 Major Arcana, karmic tails, calculation formulas, and relationship dynamics."}
            </p>
          </div>
        </div>

        {/* Filterable Client Article Grid with locale support */}
        <BlogIndexClient articles={articles} locale={norm} />
      </div>
    </div>
  );
}

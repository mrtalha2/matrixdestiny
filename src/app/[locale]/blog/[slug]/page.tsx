import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { getArticleBySlug, getAllArticles, BlogPost } from "@/content/blog/articles";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShareButton } from "@/components/share/ShareButton";
import {
  SITE_URL,
  getArticleSchema,
  getBreadcrumbSchema,
  getFaqSchema,
  getHowToSchema,
} from "@/lib/seo/structured-data";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedBlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

import { getLocalizedArticleBySlug, getLocalizedArticles } from "@/lib/blog/localized-blog";

export async function generateStaticParams() {
  const locales = ["es", "pt-br", "de", "id", "ar"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const articles = getLocalizedArticles(locale);
    for (const a of articles) {
      params.push({
        locale,
        slug: a.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: LocalizedBlogPostPageProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const article = getLocalizedArticleBySlug(params.slug, norm);
  if (!article) {
    return { title: "Article Not Found | Matrix of Destiny" };
  }

  return buildLocalizedMetadata({
    path: `/blog/${article.slug}`,
    locale: norm,
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    keywords: [article.category, "matriz del destino", "destiny matrix"],
  });
}

export default function LocalizedBlogPostPage({ params }: LocalizedBlogPostPageProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const article = getLocalizedArticleBySlug(params.slug, norm);
  if (!article) notFound();

  const msgs = getMessages(norm);
  const articleUrl = `${SITE_URL}${getLocalizedPath(`/blog/${article.slug}`, norm)}`;

  const articleJsonLd = getArticleSchema({
    headline: article.title,
    description: article.excerpt,
    slug: article.slug,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    image: article.heroImage ? `${SITE_URL}${article.heroImage.src}` : `${SITE_URL}/og-image.webp`,
    author: {
      name: article.author.name,
    },
  });

  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.nav.blog || "Blog", url: getLocalizedPath("/blog", norm) },
    { name: article.title, url: articleUrl },
  ]);

  return (
    <article className="min-h-screen bg-canvas py-10 sm:py-16 selection:bg-brand-primary/15 selection:text-brand-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="site-container max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-ink-muted flex-wrap"
        >
          <Link
            href={getLocalizedPath("/", norm)}
            className="hover:text-ink-primary transition-colors"
          >
            {msgs.common.home || "Home"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={getLocalizedPath("/blog", norm)}
            className="hover:text-ink-primary transition-colors"
          >
            {msgs.nav.blog || "Blog"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-ink-primary font-medium truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="brand" size="md">
              {article.category}
            </Badge>
            <span className="text-ink-muted text-xs">•</span>
            <span className="flex items-center gap-1.5 text-xs text-ink-muted font-mono">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTimeMinutes} {norm === "es" ? "min de lectura" : "min read"}
            </span>
            <span className="text-ink-muted text-xs">•</span>
            <span className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.publishedAt).toLocaleDateString(LOCALES[norm]?.htmlLang || "en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-ink-primary tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans border-l-2 border-brand-primary pl-4">
            {article.excerpt}
          </p>

          {/* Quick CTA to Calculator */}
          <div className="pt-2">
            <Link href={getLocalizedPath("/#calculator-hero", norm)}>
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                {msgs.calculator.calculateButton || "Calculate Your Free Chart"}
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero Image */}
        {article.heroImage && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border-subtle shadow-elevation-subtle">
            <Image
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Article Content Sections */}
        <div className="space-y-10 text-ink-secondary leading-relaxed font-sans">
          {article.sections.map((section, idx) => (
            <section key={section.slug || idx} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-ink-primary tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base leading-relaxed">
                  {p}
                </p>
              ))}

              {section.callout && (
                <Card elevation="low" className="p-5 border-l-4 border-l-brand-primary bg-surface-raised space-y-1.5 my-4">
                  <h3 className="font-semibold text-sm text-ink-primary">
                    {section.callout.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-secondary">
                    {section.callout.text}
                  </p>
                </Card>
              )}
            </section>
          ))}
        </div>

        {/* AdSense Unit */}
        <AdSenseUnit slotId="blog-article-footer" format="auto" />

        {/* Return to Blog */}
        <div className="pt-8 border-t border-border-subtle flex items-center justify-between">
          <Link href={getLocalizedPath("/blog", norm)}>
            <Button variant="secondary" size="sm">
              {norm === "es" ? "← Volver a todas las guías" : "← Back to all guides"}
            </Button>
          </Link>
          <Link href={getLocalizedPath("/#calculator-hero", norm)}>
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              {msgs.calculator.calculateButton || "Calculate Your Chart"}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

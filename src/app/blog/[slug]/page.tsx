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
import { ContextualBirthdateBar } from "@/components/calculator/ContextualBirthdateBar";
import {
  SITE_URL,
  getArticleSchema,
  getBreadcrumbSchema,
  getFaqSchema,
  getHowToSchema,
} from "@/lib/seo/structured-data";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found | Destiny Matrix",
    };
  }

  const ogImages = article.heroImage
    ? [
        {
          url: `${SITE_URL}${article.heroImage.src}`,
          width: article.heroImage.width,
          height: article.heroImage.height,
          alt: article.heroImage.alt,
        },
      ]
    : [`${SITE_URL}/og-image.webp`];

  return {
    title: `${article.metaTitle} | Destiny Matrix`,
    description: article.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${SITE_URL}/blog/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.heroImage ? [`${SITE_URL}${article.heroImage.src}`] : [`${SITE_URL}/og-image.webp`],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const relatedArticles = article.relatedSlugs
    .map((rSlug) => allArticles.find((a) => a.slug === rSlug))
    .filter((a): a is BlogPost => Boolean(a));

  const articleJsonLd = getArticleSchema({
    headline: article.title,
    description: article.metaDescription,
    slug: article.slug,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    image: article.heroImage ? `${SITE_URL}${article.heroImage.src}` : undefined,
    author: {
      name: article.author.name,
      role: article.author.role,
    },
  });

  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: article.title, url: `/blog/${article.slug}` },
  ]);

  const faqJsonLd = article.faqs && article.faqs.length > 0 ? getFaqSchema(article.faqs) : null;

  const howToJsonLd =
    article.howToSteps && article.howToSteps.length > 0
      ? getHowToSchema({
          name: article.title,
          description: article.metaDescription,
          steps: article.howToSteps,
        })
      : null;

  return (
    <article className="py-8 sm:py-12 max-w-5xl mx-auto space-y-10">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-ink-muted">
        <Link href="/" className="hover:text-ink-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/blog" className="hover:text-ink-primary transition-colors">
          Blog
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-ink-primary font-medium truncate max-w-xs sm:max-w-md">
          {article.title}
        </span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 pb-6 border-b border-border-subtle">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="brand" size="md">
            {article.category}
          </Badge>
          <span className="text-ink-muted text-xs">•</span>
          <div className="flex items-center gap-1 text-xs text-ink-secondary">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readingTimeMinutes} min read</span>
          </div>
          <span className="text-ink-muted text-xs">•</span>
          <div className="flex items-center gap-1 text-xs text-ink-secondary">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <span className="text-ink-muted text-xs">•</span>
          <span className="text-xs text-ink-muted">Reviewed Regularly</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-ink-primary tracking-tight leading-[1.15]">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans max-w-3xl">
          {article.excerpt}
        </p>

        {/* Hero Image */}
        {article.heroImage && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border-subtle shadow-md bg-surface-raised my-6">
            <Image
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              width={article.heroImage.width}
              height={article.heroImage.height}
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              placeholder={article.heroImage.blurDataURL ? "blur" : "empty"}
              blurDataURL={article.heroImage.blurDataURL}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Contextual Interactive Calculator Bar */}
        <ContextualBirthdateBar className="my-6" />

        {/* Author byline + Social Share */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-sm">
              {article.author.name[0]}
            </div>
            <div>
              <div className="text-xs font-semibold text-ink-primary">
                {article.author.name}
              </div>
              <div className="text-[11px] text-ink-muted">
                {article.author.role} • Last reviewed: {article.updatedAt}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShareButton
              title={article.title}
              text={article.excerpt}
              size="sm"
            />
          </div>
        </div>
      </header>

      {/* Main Grid: Content + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Article Body */}
        <div className="lg:col-span-8 space-y-8">
          {/* Quick Key Takeaways Box */}
          <Card elevation="low" className="p-5 sm:p-6 border-l-4 border-l-brand-primary bg-surface/60 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-ink-primary">
                Core Insights at a Glance
              </h2>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-ink-secondary">
              {article.sections.slice(0, 3).map((sec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-ink-primary">{sec.heading}:</strong>{" "}
                    {sec.paragraphs[0]?.slice(0, 140)}...
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Balanced vs Shadow Block */}
          {article.balancedShadowBlock && (
            <Card elevation="low" className="p-6 border-l-4 border-l-brand-primary bg-surface/60 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-primary" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-ink-primary">
                  Balanced vs Shadow: {article.balancedShadowBlock.arcanaName}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <span className="font-semibold text-emerald-400 block">Balanced Polarity (+)</span>
                  <p className="text-ink-secondary leading-relaxed">{article.balancedShadowBlock.balanced}</p>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <span className="font-semibold text-amber-400 block">Shadow Polarity (-)</span>
                  <p className="text-ink-secondary leading-relaxed">{article.balancedShadowBlock.shadow}</p>
                </div>
              </div>
              <p className="text-xs text-ink-muted italic border-t border-border-subtle pt-3">
                <strong>Mindful Practice:</strong> {article.balancedShadowBlock.advice}
              </p>
            </Card>
          )}

          {/* Render Sections with Mid-Content Ad Placement */}
          <div className="space-y-10">
            {article.sections.map((section, idx) => (
              <React.Fragment key={section.slug}>
                <section id={section.slug} className="scroll-mt-24 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-display font-semibold text-ink-primary border-b border-border-subtle pb-2">
                    {section.heading}
                  </h2>

                  <div className="space-y-4 text-sm sm:text-base text-ink-primary/90 leading-relaxed font-sans">
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {section.callout && (
                    <Card
                      elevation="low"
                      className="p-4 sm:p-5 border-l-4 border-l-chart-wealth bg-chart-wealth/5 space-y-1"
                    >
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-chart-wealth">
                        {section.callout.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-secondary font-sans leading-relaxed">
                        {section.callout.text}
                      </p>
                    </Card>
                  )}
                </section>

                {/* Non-intrusive Mid-Article Ad Placement */}
                {idx === 2 && (
                  <AdSenseUnit
                    slotId={`blog-mid-${article.slug.slice(0, 12)}`}
                    format="rectangle"
                    minHeight="min-h-[140px]"
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Frequently Asked Questions */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="space-y-6 pt-8 border-t border-border-subtle">
              <h2 className="text-2xl font-display font-semibold text-ink-primary">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {article.faqs.map((faq, fIdx) => (
                  <Card key={fIdx} elevation="low" className="p-5 space-y-2">
                    <h3 className="text-base font-semibold text-ink-primary">{faq.question}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Interactive Calculator CTA */}
          <Card
            elevation="mid"
            className="p-6 sm:p-8 border-l-4 border-l-brand-primary bg-gradient-to-br from-surface to-surface-raised/50 space-y-4"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-primary" />
              <span className="text-xs font-mono font-bold uppercase text-brand-primary tracking-wider">
                Interactive Calculation
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-medium text-ink-primary">
              {article.cta.title}
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {article.cta.description}
            </p>
            <Link href={article.cta.buttonLink}>
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {article.cta.buttonText}
              </Button>
            </Link>
          </Card>

          {/* Author Bio Box */}
          <Card elevation="low" className="p-6 bg-surface/50 border border-border-subtle flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-brand-primary/15 flex items-center justify-center text-brand-primary font-bold text-lg shrink-0">
              {article.author.name[0]}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-display font-semibold text-ink-primary">
                  {article.author.name}
                </span>
                <Badge variant="secondary" size="sm">
                  {article.author.role}
                </Badge>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                {article.author.bio}
              </p>
            </div>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-border-subtle">
              <h3 className="text-lg font-display font-semibold text-ink-primary">
                Related Reading & Guides
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block">
                    <Card
                      elevation="low"
                      className="p-4 h-full flex flex-col justify-between group-hover:border-brand-primary transition-colors"
                    >
                      <div className="space-y-2">
                        <Badge variant="brand" size="sm">
                          {rel.category}
                        </Badge>
                        <h4 className="text-sm font-display font-medium text-ink-primary group-hover:text-brand-primary transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-ink-muted pt-3 mt-2 border-t border-border-subtle">
                        <span>{rel.readingTimeMinutes} min read</span>
                        <span className="flex items-center gap-1 text-brand-primary font-medium">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6">
          <div className="sticky top-20 space-y-6">
            {/* Table of Contents */}
            <Card elevation="low" className="p-5 bg-surface/50 border border-border-subtle space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-ink-primary font-mono tracking-wider pb-2 border-b border-border-subtle">
                <BookOpen className="w-4 h-4 text-brand-primary" />
                <span>On This Page</span>
              </div>
              <nav aria-label="Table of Contents">
                <ul className="space-y-2 text-xs">
                  {article.tableOfContents.map((item, idx) => (
                    <li key={item.slug}>
                      <a
                        href={`#${item.slug}`}
                        className="text-ink-secondary hover:text-brand-primary transition-colors block py-0.5 leading-snug"
                      >
                        <span className="font-mono text-[10px] text-ink-muted mr-1.5">
                          0{idx + 1}
                        </span>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Card>

            {/* Sticky Calculator Promo Card */}
            <Card elevation="mid" className="p-5 bg-surface border-l-4 border-l-brand-primary space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-brand-primary">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free Tool</span>
              </div>
              <h4 className="text-base font-display font-medium text-ink-primary">
                Calculate Your Chart
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Generate your own 8-pointed octagram chart and unlock all 22 Arcana positions for free.
              </p>
              <Link href="/" className="block">
                <Button variant="primary" size="sm" className="w-full">
                  Calculate Now
                </Button>
              </Link>
            </Card>
          </div>
        </aside>
      </div>
    </article>
  );
}

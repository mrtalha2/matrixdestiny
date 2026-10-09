import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { getAllArticles } from "@/content/blog/articles";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { SITE_URL } from "@/lib/seo/structured-data";
import { resolvePageMetadata } from "@/lib/settings/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/blog", {
    title: "Destiny Matrix Blog & Guides | The 22 Arcana, Karmic Tail & Methodology",
    description:
      "Explore authoritative articles, mathematical calculation guides, and archetypal interpretations for the Matrix of Destiny. Master the 22 Major Arcana, Karmic Tail, and relationship dynamics.",
    alternates: {
      canonical: `${SITE_URL}/blog`,
    },
    openGraph: {
      title: "Destiny Matrix Knowledge Base & Editorial Guides",
      description:
        "Explore authoritative articles, calculation guides, and archetypal interpretations for the Matrix of Destiny.",
      url: `${SITE_URL}/blog`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Destiny Matrix Knowledge Base & Editorial Guides",
      description:
        "Explore authoritative articles, calculation guides, and archetypal interpretations for the Matrix of Destiny.",
    },
  });
}

export default function BlogPage() {
  const articles = getAllArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Matrix of Destiny Blog & Knowledge Base",
    description:
      "Educational articles, mathematical calculation guides, and archetypal interpretations for the Matrix of Destiny.",
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/blog/${article.slug}`,
        name: article.title,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
    ],
  };

  return (
    <div className="site-container py-8 sm:py-12 space-y-8">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-ink-muted">
        <Link href="/" className="hover:text-ink-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-ink-primary font-medium">Blog</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-mono font-medium">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Insights & Archetypal Research</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-ink-primary tracking-tight">
          Destiny Matrix Guides & Articles
        </h1>
        <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
          Master the sacred geometry, mathematical methodology, and transformative psychology behind the 22 Major Arcana archetypes.
        </p>
      </div>

      {/* Interactive Article Grid with Categories & Search */}
      <BlogIndexClient articles={articles} />
    </div>
  );
}

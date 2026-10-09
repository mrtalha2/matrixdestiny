"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, BookOpen, Sparkles, Filter } from "lucide-react";
import { BlogPost } from "@/content/blog/articles";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface BlogIndexClientProps {
  articles: BlogPost[];
}

export function BlogIndexClient({ articles }: BlogIndexClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const cats = new Set(articles.map((a) => a.category));
    return ["All", ...Array.from(cats)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                  isActive
                    ? "bg-brand-primary text-white shadow-sm"
                    : "bg-surface border border-border-subtle text-ink-secondary hover:text-ink-primary hover:border-border-strong"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search guides & articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-surface border border-border-subtle rounded-xl text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-brand-primary transition-all"
          />
        </div>
      </div>

      {/* Article Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-surface/50 rounded-2xl border border-dashed border-border-strong">
          <BookOpen className="w-8 h-8 text-ink-muted mx-auto mb-3" />
          <h3 className="text-base font-display font-medium text-ink-primary">
            No articles match your search
          </h3>
          <p className="text-xs text-ink-muted mt-1">
            Try adjusting your search keywords or selecting another category.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block focus:outline-none"
            >
              <Card
                elevation="low"
                className="h-full flex flex-col justify-between p-6 transition-all duration-200 group-hover:border-brand-primary group-hover:shadow-elevation-mid"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="brand" size="sm">
                      {article.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-[11px] text-ink-muted font-mono">
                      <Clock className="w-3 h-3" />
                      {article.readingTimeMinutes} min read
                    </span>
                  </div>

                  <h2 className="text-lg font-display font-semibold text-ink-primary group-hover:text-brand-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-xs text-ink-secondary leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-border-subtle flex items-center justify-between text-xs">
                  <span className="text-ink-muted font-sans">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-brand-primary group-hover:translate-x-0.5 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Bottom Global Calculator CTA */}
      <Card
        elevation="mid"
        className="p-8 sm:p-10 border-l-4 border-l-brand-primary bg-gradient-to-r from-surface to-surface-raised/40 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-mono font-semibold uppercase text-brand-primary tracking-wider">
              Free Calculation Engine
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-medium text-ink-primary">
            Ready to Explore Your Personal Octagram?
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary max-w-xl">
            Input your birth date to immediately calculate your 22 Major Arcana positions, discover your Karmic Tail, and download your high-resolution chart.
          </p>
        </div>

        <Link href="/" className="shrink-0">
          <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Calculate My Chart
          </Button>
        </Link>
      </Card>
    </div>
  );
}

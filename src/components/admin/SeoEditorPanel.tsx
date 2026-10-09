"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Share2,
  Code2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { SITE_URL, SITE_DOMAIN } from "@/lib/seo/structured-data";

export interface SeoFields {
  focusKeyword: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
  jsonLd: string;
}

interface SeoEditorPanelProps {
  seo: SeoFields;
  onChange: (fields: Partial<SeoFields>) => void;
  contentToAnalyze?: string;
  h1Title?: string;
  urlPath?: string;
}

export function SeoEditorPanel({
  seo,
  onChange,
  contentToAnalyze = "",
  h1Title = "",
  urlPath = "/page",
}: SeoEditorPanelProps) {
  const [activeTab, setActiveTab] = useState<"general" | "social" | "schema" | "checklist">("general");
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Character counts
  const titleLen = seo.seoTitle.length;
  const descLen = seo.seoDescription.length;

  // Real-time SEO Checklist computations
  const checklist = useMemo(() => {
    const kw = seo.focusKeyword.trim().toLowerCase();
    const hasKw = kw.length > 0;
    const lowerTitle = seo.seoTitle.toLowerCase();
    const lowerH1 = h1Title.toLowerCase();
    const lowerDesc = seo.seoDescription.toLowerCase();
    const firstParagraph = contentToAnalyze.split("\n\n")[0]?.toLowerCase() || "";
    const wordCount = contentToAnalyze.trim() ? contentToAnalyze.trim().split(/\s+/).length : 0;

    // 1. Keyword in Title
    const kwInTitle = hasKw && lowerTitle.includes(kw);
    // 2. Keyword in H1
    const kwInH1 = hasKw && lowerH1.includes(kw);
    // 3. Keyword in Description
    const kwInDesc = hasKw && lowerDesc.includes(kw);
    // 4. Keyword in First Paragraph
    const kwInFirstP = hasKw && firstParagraph.includes(kw);
    // 5. Title Length (ideal 45-60)
    const titleGood = titleLen >= 40 && titleLen <= 65;
    // 6. Meta Description Length (ideal 120-160)
    const descGood = descLen >= 115 && descLen <= 165;
    // 7. Word Count (recommended 600+)
    const wordsGood = wordCount >= 600;
    // 8. Internal links check (checks for markdown [text](/path))
    const internalLinks = (contentToAnalyze.match(/\]\(\/[^)]+\)/g) || []).length;
    const internalLinksGood = internalLinks >= 1;

    let score = 0;
    if (hasKw) {
      if (kwInTitle) score += 20;
      if (kwInH1) score += 15;
      if (kwInDesc) score += 15;
      if (kwInFirstP) score += 15;
    } else {
      score += 20; // baseline if no focus kw
    }
    if (titleGood) score += 15;
    if (descGood) score += 10;
    if (wordsGood) score += 5;
    if (internalLinksGood) score += 5;

    return {
      score: Math.min(100, score),
      hasKw,
      kwInTitle,
      kwInH1,
      kwInDesc,
      kwInFirstP,
      titleGood,
      descGood,
      wordsGood,
      wordCount,
      internalLinks,
      internalLinksGood,
    };
  }, [seo.focusKeyword, seo.seoTitle, seo.seoDescription, contentToAnalyze, h1Title, titleLen, descLen]);

  const handleJsonLdChange = (val: string) => {
    onChange({ jsonLd: val });
    try {
      if (val.trim()) {
        JSON.parse(val);
        setJsonError(null);
      }
    } catch (e: any) {
      setJsonError(e.message);
    }
  };

  return (
    <div className="rounded-xl border border-border-subtle bg-surface p-5 shadow-sm space-y-6">
      {/* Header with Rank-Math style Score Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-sm">
            SEO
          </div>
          <div>
            <h3 className="font-display font-medium text-ink-primary text-base">
              Native SEO & Schema Suite
            </h3>
            <p className="text-xs text-ink-muted">
              Rank-Math-grade on-page optimization, Google SERP & OpenGraph preview
            </p>
          </div>
        </div>

        {/* Dynamic SEO Score Gauge */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-surface-raised text-xs font-mono font-semibold">
            <span>Score:</span>
            <span
              className={
                checklist.score >= 80
                  ? "text-status-success font-bold"
                  : checklist.score >= 50
                  ? "text-amber-500 font-bold"
                  : "text-status-error font-bold"
              }
            >
              {checklist.score}/100
            </span>
          </div>
        </div>
      </div>

      {/* Focus Keyword Input */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-ink-secondary">
          Focus Keyword (Primary search query to optimize for)
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={seo.focusKeyword}
            onChange={(e) => onChange({ focusKeyword: e.target.value })}
            placeholder="e.g. arcana 7 meaning, love magic karmic tail"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border-strong bg-surface focus:outline-none focus:ring-1 focus:ring-brand-primary text-ink-primary"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-subtle gap-2 text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`pb-2 px-2 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "general"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-muted hover:text-ink-secondary"
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          General & SERP
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("checklist")}
          className={`pb-2 px-2 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "checklist"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-muted hover:text-ink-secondary"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          On-Page Checklist ({checklist.score >= 80 ? "Good" : "Needs Review"})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`pb-2 px-2 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "social"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-muted hover:text-ink-secondary"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          Social & OG
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("schema")}
          className={`pb-2 px-2 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "schema"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-muted hover:text-ink-secondary"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          JSON-LD Schema
        </button>
      </div>

      {/* Tab 1: General & SERP Preview */}
      {activeTab === "general" && (
        <div className="space-y-4">
          {/* SEO Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-medium text-ink-secondary">SEO Title Tag</label>
              <span
                className={`font-mono text-[11px] ${
                  titleLen >= 40 && titleLen <= 65 ? "text-status-success" : "text-amber-500"
                }`}
              >
                {titleLen}/60 chars
              </span>
            </div>
            <input
              type="text"
              value={seo.seoTitle}
              onChange={(e) => onChange({ seoTitle: e.target.value })}
              placeholder="Title appearing in search engine results"
              className="w-full px-3 py-2 text-sm rounded-lg border border-border-strong bg-surface focus:outline-none focus:ring-1 focus:ring-brand-primary text-ink-primary"
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-medium text-ink-secondary">Meta Description</label>
              <span
                className={`font-mono text-[11px] ${
                  descLen >= 115 && descLen <= 165 ? "text-status-success" : "text-amber-500"
                }`}
              >
                {descLen}/160 chars
              </span>
            </div>
            <textarea
              rows={3}
              value={seo.seoDescription}
              onChange={(e) => onChange({ seoDescription: e.target.value })}
              placeholder="Compelling search snippet encouraging clicks..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-border-strong bg-surface focus:outline-none focus:ring-1 focus:ring-brand-primary text-ink-primary"
            />
          </div>

          {/* Canonical URL */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-ink-secondary">Canonical URL</label>
            <input
              type="text"
              value={seo.canonicalUrl}
              onChange={(e) => onChange({ canonicalUrl: e.target.value })}
              placeholder={`${SITE_URL}/your-slug`}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border-strong bg-surface focus:outline-none focus:ring-1 focus:ring-brand-primary text-ink-primary"
            />
          </div>

          {/* Live Google Search SERP Snippet Preview */}
          <div className="mt-4 pt-4 border-t border-border-subtle">
            <span className="text-xs font-medium text-ink-secondary block mb-2">
              Google SERP Snippet Preview (Desktop)
            </span>
            <div className="p-4 rounded-xl border border-border-subtle bg-canvas space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                <span className="text-brand-primary font-mono text-[11px]">{SITE_URL}</span>
                <span>›</span>
                <span className="truncate">{urlPath.replace(/^\//, "")}</span>
              </div>
              <h4 className="text-base text-[#1a0dab] dark:text-[#8ab4f8] font-medium hover:underline cursor-pointer line-clamp-1">
                {seo.seoTitle || "Page Title — Destiny Matrix"}
              </h4>
              <p className="text-xs text-ink-secondary line-clamp-2 leading-relaxed">
                {seo.seoDescription || "Provide a meta description to preview how your page summary appears on Google search results."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: On-Page SEO Checklist */}
      {activeTab === "checklist" && (
        <div className="space-y-3">
          <p className="text-xs text-ink-secondary">
            Helper recommendations to maximize search ranking for &ldquo;{seo.focusKeyword || "your keyword"}&rdquo;:
          </p>

          <ul className="space-y-2 text-xs">
            <li className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle bg-surface-raised">
              <span className="flex items-center gap-2">
                {checklist.kwInTitle ? (
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>Focus keyword present in SEO Title</span>
              </span>
              <span className="font-mono text-ink-muted">{checklist.kwInTitle ? "Yes" : "Missing"}</span>
            </li>

            <li className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle bg-surface-raised">
              <span className="flex items-center gap-2">
                {checklist.kwInH1 ? (
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>Focus keyword present in Main H1 Heading</span>
              </span>
              <span className="font-mono text-ink-muted">{checklist.kwInH1 ? "Yes" : "Missing"}</span>
            </li>

            <li className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle bg-surface-raised">
              <span className="flex items-center gap-2">
                {checklist.kwInDesc ? (
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>Focus keyword present in Meta Description</span>
              </span>
              <span className="font-mono text-ink-muted">{checklist.kwInDesc ? "Yes" : "Missing"}</span>
            </li>

            <li className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle bg-surface-raised">
              <span className="flex items-center gap-2">
                {checklist.kwInFirstP ? (
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-ink-muted shrink-0" />
                )}
                <span>Focus keyword in first 10% of content</span>
              </span>
              <span className="font-mono text-ink-muted">{checklist.kwInFirstP ? "Yes" : "No"}</span>
            </li>

            <li className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle bg-surface-raised">
              <span className="flex items-center gap-2">
                {checklist.titleGood ? (
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>Title length recommended (40–65 characters)</span>
              </span>
              <span className="font-mono text-ink-muted">{titleLen} chars</span>
            </li>

            <li className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle bg-surface-raised">
              <span className="flex items-center gap-2">
                {checklist.descGood ? (
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>Meta description recommended (120–160 characters)</span>
              </span>
              <span className="font-mono text-ink-muted">{descLen} chars</span>
            </li>

            <li className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle bg-surface-raised">
              <span className="flex items-center gap-2">
                {checklist.wordsGood ? (
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>Content length (min 600 words for substantive ranking)</span>
              </span>
              <span className="font-mono text-ink-muted">{checklist.wordCount} words</span>
            </li>

            <li className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle bg-surface-raised">
              <span className="flex items-center gap-2">
                {checklist.internalLinksGood ? (
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-ink-muted shrink-0" />
                )}
                <span>Internal cross-links present</span>
              </span>
              <span className="font-mono text-ink-muted">{checklist.internalLinks} found</span>
            </li>
          </ul>
        </div>
      )}

      {/* Tab 3: Social & OpenGraph Preview */}
      {activeTab === "social" && (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-ink-secondary">
              OpenGraph / Social Card Image URL
            </label>
            <input
              type="text"
              value={seo.ogImage}
              onChange={(e) => onChange({ ogImage: e.target.value })}
              placeholder={`${SITE_URL}/og-image.webp`}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border-strong bg-surface focus:outline-none focus:ring-1 focus:ring-brand-primary text-ink-primary"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-border-subtle">
            <span className="text-xs font-medium text-ink-secondary block mb-2">
              Social Card Preview (Twitter / LinkedIn / Discord)
            </span>
            <div className="max-w-md rounded-xl border border-border-subtle overflow-hidden bg-surface-raised">
              <div className="h-40 bg-gradient-to-br from-brand-primary/20 via-surface to-brand-primary/10 flex items-center justify-center text-ink-muted text-xs border-b border-border-subtle relative">
                {seo.ogImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={seo.ogImage}
                    alt="Social Card Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Sparkles className="w-6 h-6 text-brand-primary mx-auto mb-1" />
                    <span>Using default site dynamic OG image</span>
                  </div>
                )}
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[10px] uppercase font-mono text-ink-muted tracking-wider">
                  {SITE_DOMAIN}
                </span>
                <h4 className="text-sm font-semibold text-ink-primary line-clamp-1">
                  {seo.seoTitle || "Page Title"}
                </h4>
                <p className="text-xs text-ink-secondary line-clamp-2">
                  {seo.seoDescription || "Page description preview."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: JSON-LD Schema */}
      {activeTab === "schema" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-ink-secondary">
              JSON-LD Structured Data Markup (Article, FAQPage, etc.)
            </label>
            {jsonError && (
              <span className="text-xs text-status-error font-mono flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Invalid JSON
              </span>
            )}
          </div>
          <textarea
            rows={8}
            value={seo.jsonLd}
            onChange={(e) => handleJsonLdChange(e.target.value)}
            placeholder='{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "..."\n}'
            className="w-full font-mono text-xs px-3 py-2 rounded-lg border border-border-strong bg-surface-raised focus:outline-none focus:ring-1 focus:ring-brand-primary text-ink-primary"
          />
          <p className="text-[11px] text-ink-muted">
            Tip: Injected directly as a script type=&quot;application/ld+json&quot; in the page head.
          </p>
        </div>
      )}
    </div>
  );
}

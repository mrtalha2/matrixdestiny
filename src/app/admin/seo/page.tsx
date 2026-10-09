"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Search,
  CheckCircle2,
  AlertCircle,
  Save,
  Share2,
  ShieldCheck,
  Code2,
  ExternalLink,
  Sparkles,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  SeoSettings,
  VerificationSettings,
  SchemaSettings,
  RobotsPolicy,
  PageSeoOverride,
} from "@/lib/settings/site-settings";
import { SITE_DOMAIN, SITE_URL } from "@/lib/seo/structured-data";

export default function AdminSeoPage() {
  const [activeTab, setActiveTab] = useState<"global" | "robots" | "verification" | "schema" | "pages">("global");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string>("/");

  const [seo, setSeo] = useState<SeoSettings>({
    defaultTitleTemplate: "%s | Matrix of Destiny",
    defaultMetaDescription: "",
    defaultOgImage: "",
    robotsPolicy: "index, follow",
    twitterHandle: "@destinymatrix",
    twitterCardType: "summary_large_image",
    defaultKeywords: [],
    pageOverrides: {},
  });

  const [keywordsInput, setKeywordsInput] = useState("");

  const [verification, setVerification] = useState<VerificationSettings>({
    googleVerification: "",
    bingVerification: "",
    pinterestVerification: "",
    customMetaTags: [],
  });

  const [schema, setSchema] = useState<SchemaSettings>({
    organizationName: "Matrix of Destiny",
    alternateName: "Matrix of Destiny",
    logoUrl: "",
    description: "",
    socialLinks: [],
    publisherType: "Organization",
  });

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/admin/seo");
        if (res.ok) {
          const data = await res.json();
          if (data.seo) {
            setSeo(data.seo);
            setKeywordsInput(Array.isArray(data.seo.defaultKeywords) ? data.seo.defaultKeywords.join(", ") : "");
          }
          if (data.verification) setVerification(data.verification);
          if (data.schema) setSchema(data.schema);
        }
      } catch (err: any) {
        setErrorMessage("Failed to load SEO configuration.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveSuccess(false);
      setErrorMessage(null);

      const parsedKeywords = keywordsInput
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      const payload = {
        seo: {
          ...seo,
          defaultKeywords: parsedKeywords,
        },
        verification,
        schema,
      };

      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save configuration.");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-md bg-brand-primary/10 text-brand-primary">
              <Search className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-display font-medium text-ink-primary">
              SEO & Indexing Manager
            </h1>
            <Badge variant="brand" size="sm" className="border-brand-primary/30">
              Rank Math Architecture
            </Badge>
          </div>
          <p className="text-xs text-ink-secondary">
            Centralized search engine optimization, robots indexing policies, and webmaster verification tokens.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-lg bg-status-success/10 border border-status-success/20 text-xs text-status-success flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>SEO and verification settings successfully saved and synced with edge layout.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-status-danger/10 border border-status-danger/20 text-xs text-status-danger flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-border-subtle gap-2">
        <button
          onClick={() => setActiveTab("global")}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "global"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-muted hover:text-ink-primary"
          }`}
        >
          Global SEO Defaults
        </button>
        <button
          onClick={() => setActiveTab("robots")}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "robots"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-muted hover:text-ink-primary"
          }`}
        >
          Robots & Indexing
        </button>
        <button
          onClick={() => setActiveTab("verification")}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "verification"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-muted hover:text-ink-primary"
          }`}
        >
          Webmaster Verification
        </button>
        <button
          onClick={() => setActiveTab("schema")}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "schema"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-muted hover:text-ink-primary"
          }`}
        >
          Schema & Social
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "pages"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-muted hover:text-ink-primary"
          }`}
        >
          Page Overrides
        </button>
      </div>

      {/* Tab 1: Global SEO */}
      {activeTab === "global" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4 bg-surface p-5 rounded-xl border border-border-subtle shadow-sm">
            <h2 className="text-sm font-semibold text-ink-primary flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-brand-primary" /> Title & Meta Descriptions
            </h2>

            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Title Template
              </label>
              <input
                type="text"
                value={seo.defaultTitleTemplate}
                onChange={(e) => setSeo({ ...seo, defaultTitleTemplate: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                placeholder="%s | Matrix of Destiny"
              />
              <p className="text-[11px] text-ink-muted mt-1">
                Use <code className="text-brand-primary">%s</code> as the page placeholder (e.g. Arcana 7 | Matrix of Destiny).
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium text-ink-secondary">
                  Default Meta Description
                </label>
                <span className="text-[11px] text-ink-muted">
                  {seo.defaultMetaDescription.length} / 160 characters
                </span>
              </div>
              <textarea
                rows={3}
                value={seo.defaultMetaDescription}
                onChange={(e) => setSeo({ ...seo, defaultMetaDescription: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                placeholder="Free Matrix of Destiny numerology calculator based on your exact birth date..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Default Open Graph Image URL
              </label>
              <input
                type="text"
                value={seo.defaultOgImage}
                onChange={(e) => setSeo({ ...seo, defaultOgImage: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                placeholder="https://destinymatrix.app/api/og"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Global Keywords (comma separated)
              </label>
              <input
                type="text"
                value={keywordsInput}
                onChange={(e) => setKeywordsInput(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                placeholder="destiny matrix calculator, numerology chart, karmic tail"
              />
            </div>
          </div>

          {/* SERP Preview Box */}
          <div className="space-y-4">
            <div className="bg-surface p-5 rounded-xl border border-border-subtle shadow-sm space-y-3">
              <h3 className="text-xs font-semibold text-ink-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary" /> Google SERP Snippet Preview
              </h3>
              <div className="p-3.5 rounded-lg bg-canvas border border-border-subtle text-left space-y-1">
                <div className="text-[11px] text-ink-muted truncate">
                  https://{SITE_DOMAIN} › chart
                </div>
                <div className="text-sm font-medium text-brand-primary hover:underline cursor-pointer truncate">
                  {seo.defaultTitleTemplate.replace("%s", "Natal Chart Calculation")}
                </div>
                <div className="text-xs text-ink-secondary line-clamp-2">
                  {seo.defaultMetaDescription ||
                    "Free Matrix of Destiny numerology calculator based on your exact birth date. Calculate your 22-energy octagram chart..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Robots & Indexing */}
      {activeTab === "robots" && (
        <div className="bg-surface p-5 rounded-xl border border-border-subtle shadow-sm space-y-5 max-w-3xl">
          <div>
            <h2 className="text-sm font-semibold text-ink-primary flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-brand-primary" /> Search Engine Indexing Directives
            </h2>
            <p className="text-xs text-ink-muted">
              Controls the sitewide default robots meta tag across all non-overridden pages.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                value: "index, follow",
                label: "Index, Follow (Recommended for Production)",
                desc: "Search engines will index your pages and follow hyperlinks to discover new content.",
              },
              {
                value: "noindex, follow",
                label: "Noindex, Follow (Staging / Development)",
                desc: "Search engines will not show pages in search results but will follow internal links.",
              },
              {
                value: "index, nofollow",
                label: "Index, Nofollow",
                desc: "Search engines index the pages but will not pass PageRank authority through outgoing links.",
              },
              {
                value: "noindex, nofollow",
                label: "Noindex, Nofollow (Private / Unlisted)",
                desc: "Completely disallows search indexing and link traversal across the entire website.",
              },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                  seo.robotsPolicy === option.value
                    ? "border-brand-primary bg-brand-primary/5"
                    : "border-border-subtle hover:bg-surface-raised"
                }`}
              >
                <input
                  type="radio"
                  name="robotsPolicy"
                  value={option.value}
                  checked={seo.robotsPolicy === option.value}
                  onChange={(e) => setSeo({ ...seo, robotsPolicy: e.target.value as RobotsPolicy })}
                  className="mt-0.5"
                />
                <div>
                  <div className="text-xs font-semibold text-ink-primary">{option.label}</div>
                  <div className="text-[11px] text-ink-muted mt-0.5">{option.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Verification */}
      {activeTab === "verification" && (
        <div className="bg-surface p-5 rounded-xl border border-border-subtle shadow-sm space-y-5 max-w-3xl">
          <div>
            <h2 className="text-sm font-semibold text-ink-primary flex items-center gap-1.5 mb-1">
              <Code2 className="w-4 h-4 text-brand-primary" /> Webmaster Verification Codes
            </h2>
            <p className="text-xs text-ink-muted">
              Enter verification codes provided by search engines. These tags will be rendered directly in SSR &lt;head&gt;.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Google Search Console Verification Token
              </label>
              <input
                type="text"
                value={verification.googleVerification}
                onChange={(e) => setVerification({ ...verification, googleVerification: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary font-mono focus:outline-none focus:border-brand-primary"
                placeholder="e.g. aB1cD2eF3gH4iJ5kL6mN7oP8"
              />
              <p className="text-[11px] text-ink-muted mt-1">
                Renders &lt;meta name=&quot;google-site-verification&quot; content=&quot;...&quot; /&gt;
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Bing Webmaster Tools (msvalidate.01)
              </label>
              <input
                type="text"
                value={verification.bingVerification}
                onChange={(e) => setVerification({ ...verification, bingVerification: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary font-mono focus:outline-none focus:border-brand-primary"
                placeholder="e.g. 7A1F2C3B4E5D6"
              />
              <p className="text-[11px] text-ink-muted mt-1">
                Renders &lt;meta name=&quot;msvalidate.01&quot; content=&quot;...&quot; /&gt;
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Pinterest Verification Token
              </label>
              <input
                type="text"
                value={verification.pinterestVerification}
                onChange={(e) => setVerification({ ...verification, pinterestVerification: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary font-mono focus:outline-none focus:border-brand-primary"
                placeholder="e.g. e2d3c4b5a6"
              />
              <p className="text-[11px] text-ink-muted mt-1">
                Renders &lt;meta name=&quot;p:domain_verify&quot; content=&quot;...&quot; /&gt;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Schema & Social */}
      {activeTab === "schema" && (
        <div className="bg-surface p-5 rounded-xl border border-border-subtle shadow-sm space-y-5 max-w-3xl">
          <div>
            <h2 className="text-sm font-semibold text-ink-primary flex items-center gap-1.5 mb-1">
              <Share2 className="w-4 h-4 text-brand-primary" /> Structured Data & Social Branding
            </h2>
            <p className="text-xs text-ink-muted">
              Configure Organization Schema.org entities and Twitter card meta defaults.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1">
                  Organization / Brand Name
                </label>
                <input
                  type="text"
                  value={schema.organizationName}
                  onChange={(e) => setSchema({ ...schema, organizationName: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                  placeholder="Matrix of Destiny"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1">
                  Logo Image URL
                </label>
                <input
                  type="text"
                  value={schema.logoUrl}
                  onChange={(e) => setSchema({ ...schema, logoUrl: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                  placeholder="https://destinymatrix.app/og-image.webp"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1">
                  Twitter / X Handle
                </label>
                <input
                  type="text"
                  value={seo.twitterHandle}
                  onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                  placeholder="@destinymatrix"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1">
                  Twitter Card Type
                </label>
                <select
                  value={seo.twitterCardType}
                  onChange={(e) => setSeo({ ...seo, twitterCardType: e.target.value as any })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                >
                  <option value="summary_large_image">summary_large_image (Recommended)</option>
                  <option value="summary">summary</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Page-Level SEO Overrides */}
      {activeTab === "pages" && (
        <div className="space-y-6">
          <div className="bg-surface p-5 rounded-xl border border-border-subtle shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
              <div>
                <h2 className="text-sm font-semibold text-ink-primary flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-brand-primary" /> Per-Page SEO Overrides
                </h2>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Customize title, meta description, and robots directives for specific routes. Unconfigured fields seamlessly fall back to static page defaults.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-muted font-medium">Select Route:</span>
                <select
                  value={selectedPath}
                  onChange={(e) => setSelectedPath(e.target.value)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-border-strong bg-canvas text-ink-primary font-mono focus:outline-none focus:border-brand-primary"
                >
                  <option value="/">/ (Homepage)</option>
                  <option value="/tools">/tools (Tools Suite)</option>
                  <option value="/compatibility">/compatibility (Couple Matrix)</option>
                  <option value="/child-matrix">/child-matrix (Child Matrix)</option>
                  <option value="/money-calculator">/money-calculator (Money Line)</option>
                  <option value="/love-calculator">/love-calculator (Love Gate)</option>
                  <option value="/talent-calculator">/talent-calculator (Talent Zone)</option>
                  <option value="/yearly-forecast">/yearly-forecast (Annual Forecast)</option>
                  <option value="/karmic-tail-calculator">/karmic-tail-calculator (Karmic Program)</option>
                  <option value="/blog">/blog (Guides & Articles)</option>
                </select>
              </div>
            </div>

            {/* Selected Route Edit Panel */}
            {(() => {
              const currentOverride: PageSeoOverride = seo.pageOverrides?.[selectedPath] || {};

              const updateOverride = (fields: Partial<PageSeoOverride>) => {
                setSeo({
                  ...seo,
                  pageOverrides: {
                    ...seo.pageOverrides,
                    [selectedPath]: {
                      ...currentOverride,
                      ...fields,
                    },
                  },
                });
              };

              return (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="brand" size="sm" className="font-mono">
                      Editing: {selectedPath}
                    </Badge>
                    {seo.pageOverrides?.[selectedPath] && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...seo.pageOverrides };
                          delete updated[selectedPath];
                          setSeo({ ...seo, pageOverrides: updated });
                        }}
                        className="text-xs text-status-danger hover:underline"
                      >
                        Reset to Default
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1">
                      Custom SEO Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={currentOverride.title || ""}
                      onChange={(e) => updateOverride({ title: e.target.value })}
                      placeholder="Leave empty to use page's default title"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1">
                      Custom Meta Description (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={currentOverride.description || ""}
                      onChange={(e) => updateOverride({ description: e.target.value })}
                      placeholder="Leave empty to use page's default description"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ink-secondary mb-1">
                        Canonical URL (Optional Override)
                      </label>
                      <input
                        type="text"
                        value={currentOverride.canonical || ""}
                        onChange={(e) => updateOverride({ canonical: e.target.value })}
                        placeholder={`${SITE_URL}${selectedPath}`}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary font-mono focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-ink-secondary mb-1">
                        Robots Indexing Directive
                      </label>
                      <select
                        value={currentOverride.robotsPolicy || ""}
                        onChange={(e) => updateOverride({ robotsPolicy: (e.target.value || undefined) as any })}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                      >
                        <option value="">Inherit Global Policy ({seo.robotsPolicy})</option>
                        <option value="index, follow">index, follow</option>
                        <option value="noindex, follow">noindex, follow</option>
                        <option value="index, nofollow">index, nofollow</option>
                        <option value="noindex, nofollow">noindex, nofollow</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-canvas rounded-lg border border-border-subtle flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="noindex-toggle"
                      checked={Boolean(currentOverride.noIndex)}
                      onChange={(e) => updateOverride({ noIndex: e.target.checked })}
                      className="rounded border-border-strong text-brand-primary focus:ring-brand-primary/20"
                    />
                    <label htmlFor="noindex-toggle" className="text-xs text-ink-primary cursor-pointer">
                      Explicitly exclude this page from search engines (<code className="font-mono text-status-danger">noindex</code>)
                    </label>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

    </div>
  );
}

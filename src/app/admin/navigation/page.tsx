"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PanelTop,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  CheckCircle2,
  Sparkles,
  Heart,
  Compass,
  ExternalLink,
  Layers,
  Send,
  Shield,
  HelpCircle,
  Code,
  Globe,
  Target,
  Home,
  FileCode,
  Edit3,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  NavigationConfig,
  DEFAULT_NAVIGATION_CONFIG,
  HeaderNavLink,
  FooterColumn,
  FooterLink,
  CodeSnippet,
} from "@/lib/navigation/navigation-config";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

export default function AdminNavigationPage() {
  const [config, setConfig] = useState<NavigationConfig>(DEFAULT_NAVIGATION_CONFIG);
  const [activeTab, setActiveTab] = useState<"header" | "footer" | "code" | "preview">("header");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // State for snippet editor modal
  const [editingSnippet, setEditingSnippet] = useState<Partial<CodeSnippet> | null>(null);
  const [isSnippetModalOpen, setIsSnippetModalOpen] = useState(false);

  // Load config on mount
  useEffect(() => {
    async function loadConfig() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/admin/navigation");
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            setConfig(data.config);
          }
        }
      } catch (err) {
        console.error("Failed to load navigation config:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadConfig();
  }, []);

  // Save changes to API
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setErrorMessage(null);
      const res = await fetch("/api/admin/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to save configuration");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Network error while saving");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default configuration
  const handleReset = () => {
    if (confirm("Reset all header and footer settings to system defaults?")) {
      setConfig(JSON.parse(JSON.stringify(DEFAULT_NAVIGATION_CONFIG)));
    }
  };

  // Helper handlers for header links
  const handleAddHeaderLink = () => {
    const newId = `link-${Date.now()}`;
    const newLink: HeaderNavLink = {
      id: newId,
      label: "New Page",
      href: "/new-page",
      visible: true,
      highlight: false,
    };
    setConfig({
      ...config,
      header: {
        ...config.header,
        links: [...config.header.links, newLink],
      },
    });
  };

  const handleUpdateHeaderLink = (index: number, field: keyof HeaderNavLink, value: any) => {
    const updated = [...config.header.links];
    updated[index] = { ...updated[index], [field]: value };
    setConfig({
      ...config,
      header: { ...config.header, links: updated },
    });
  };

  const handleDeleteHeaderLink = (index: number) => {
    const updated = config.header.links.filter((_, i) => i !== index);
    setConfig({
      ...config,
      header: { ...config.header, links: updated },
    });
  };

  const handleMoveHeaderLink = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= config.header.links.length) return;
    const updated = [...config.header.links];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setConfig({
      ...config,
      header: { ...config.header, links: updated },
    });
  };

  // Helper handlers for footer columns & links
  const handleAddFooterColumn = () => {
    const newCol: FooterColumn = {
      id: `col-${Date.now()}`,
      title: "New Category",
      links: [
        {
          id: `flink-${Date.now()}`,
          label: "Example Link",
          href: "/",
          visible: true,
        },
      ],
    };
    setConfig({
      ...config,
      footer: {
        ...config.footer,
        columns: [...config.footer.columns, newCol],
      },
    });
  };

  const handleDeleteFooterColumn = (colIndex: number) => {
    const updated = config.footer.columns.filter((_, i) => i !== colIndex);
    setConfig({
      ...config,
      footer: { ...config.footer, columns: updated },
    });
  };

  const handleUpdateFooterColumnTitle = (colIndex: number, title: string) => {
    const updated = [...config.footer.columns];
    updated[colIndex] = { ...updated[colIndex], title };
    setConfig({
      ...config,
      footer: { ...config.footer, columns: updated },
    });
  };

  const handleAddFooterLink = (colIndex: number) => {
    const updated = [...config.footer.columns];
    const newLink: FooterLink = {
      id: `flink-${Date.now()}`,
      label: "New Link",
      href: "/",
      visible: true,
    };
    updated[colIndex] = {
      ...updated[colIndex],
      links: [...updated[colIndex].links, newLink],
    };
    setConfig({
      ...config,
      footer: { ...config.footer, columns: updated },
    });
  };

  const handleUpdateFooterLink = (
    colIndex: number,
    linkIndex: number,
    field: keyof FooterLink,
    value: any
  ) => {
    const updated = [...config.footer.columns];
    const updatedLinks = [...updated[colIndex].links];
    updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], [field]: value };
    updated[colIndex] = { ...updated[colIndex], links: updatedLinks };
    setConfig({
      ...config,
      footer: { ...config.footer, columns: updated },
    });
  };

  const handleDeleteFooterLink = (colIndex: number, linkIndex: number) => {
    const updated = [...config.footer.columns];
    updated[colIndex] = {
      ...updated[colIndex],
      links: updated[colIndex].links.filter((_, i) => i !== linkIndex),
    };
    setConfig({
      ...config,
      footer: { ...config.footer, columns: updated },
    });
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-xs font-mono text-ink-muted">
        Loading navigation architecture...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <PanelTop className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-display font-medium text-ink-primary">
              Header & Footer Management
            </h1>
          </div>
          <p className="text-xs text-ink-secondary mt-1">
            Customize the global navigation menu, top announcement banner, footer sitemap columns, social links, and disclaimer.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset Defaults
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            isLoading={isSaving}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Save Navigation
          </Button>
        </div>
      </div>

      {/* Status Alerts */}
      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-status-success/10 border border-status-success/25 text-xs text-status-success flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Navigation configuration saved and published successfully. Cache purged for live site.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-status-error/10 border border-status-error/25 text-xs text-status-error flex items-center gap-2">
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabs Switcher */}
      <div className="flex border-b border-border-subtle gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("header")}
          className={`pb-3 px-4 text-xs font-mono font-semibold transition-all border-b-2 -mb-px flex items-center gap-2 ${
            activeTab === "header"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-secondary hover:text-ink-primary"
          }`}
        >
          <PanelTop className="w-3.5 h-3.5" />
          Header (Navbar) Settings
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("footer")}
          className={`pb-3 px-4 text-xs font-mono font-semibold transition-all border-b-2 -mb-px flex items-center gap-2 ${
            activeTab === "footer"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-secondary hover:text-ink-primary"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Footer & Sitemap Settings
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("code")}
          className={`pb-3 px-4 text-xs font-mono font-semibold transition-all border-b-2 -mb-px flex items-center gap-2 ${
            activeTab === "code"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-secondary hover:text-ink-primary"
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          Code Snippets & Injection
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`pb-3 px-4 text-xs font-mono font-semibold transition-all border-b-2 -mb-px flex items-center gap-2 ${
            activeTab === "preview"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-ink-secondary hover:text-ink-primary"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Live Interactive Preview
        </button>
      </div>

      {/* TAB 1: HEADER (NAVBAR) SETTINGS */}
      {activeTab === "header" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Section 1: Top Announcement Bar */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-medium text-ink-primary">
                  Top Announcement Bar
                </h3>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Display a prominent alert bar above the navbar for launches, transits, or offers.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.header.topBanner.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      header: {
                        ...config.header,
                        topBanner: { ...config.header.topBanner, enabled: e.target.checked },
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-raised peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-strong after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>

            {config.header.topBanner.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-border-subtle text-xs">
                <div className="md:col-span-2 space-y-1">
                  <label className="block font-mono text-[11px] text-ink-muted uppercase">
                    Banner Message
                  </label>
                  <input
                    type="text"
                    value={config.header.topBanner.text}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        header: {
                          ...config.header,
                          topBanner: { ...config.header.topBanner, text: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs"
                    placeholder="✨ Uncover your personal 2026 transit forecast..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[11px] text-ink-muted uppercase">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={config.header.topBanner.ctaText}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        header: {
                          ...config.header,
                          topBanner: { ...config.header.topBanner, ctaText: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs"
                    placeholder="Explore Transits"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="block font-mono text-[11px] text-ink-muted uppercase">
                    CTA Link URL
                  </label>
                  <input
                    type="text"
                    value={config.header.topBanner.ctaHref}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        header: {
                          ...config.header,
                          topBanner: { ...config.header.topBanner, ctaHref: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs"
                    placeholder="/yearly-forecast"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Brand Identity */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <h3 className="font-display text-lg font-medium text-ink-primary">
              Header Brand Identity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="block font-mono text-[11px] text-ink-muted uppercase">
                  Site Name (Primary)
                </label>
                <input
                  type="text"
                  value={config.header.brand.title}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      header: {
                        ...config.header,
                        brand: { ...config.header.brand, title: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs"
                  placeholder="Matrix of Destiny"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] text-ink-muted uppercase">
                  Subtitle / Slogan
                </label>
                <input
                  type="text"
                  value={config.header.brand.subtitle}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      header: {
                        ...config.header,
                        brand: { ...config.header.brand, subtitle: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs"
                  placeholder="Geometry of Evolution"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Navigation Menu Links List */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-medium text-ink-primary">
                  Navigation Menu Links
                </h3>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Manage the items displayed in the desktop and mobile navigation bars.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleAddHeaderLink}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Link
              </Button>
            </div>

            <div className="space-y-2.5 pt-2">
              {config.header.links.map((link, idx) => (
                <div
                  key={link.id || idx}
                  className="p-3.5 rounded-2xl border border-border-subtle bg-surface-raised flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => handleUpdateHeaderLink(idx, "label", e.target.value)}
                      placeholder="Link Label"
                      className="px-3 py-1.5 rounded-lg border border-border-strong bg-surface text-ink-primary text-xs"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => handleUpdateHeaderLink(idx, "href", e.target.value)}
                      placeholder="/route-url"
                      className="px-3 py-1.5 rounded-lg border border-border-strong bg-surface text-ink-primary text-xs font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    {/* Highlight Toggle */}
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-mono text-ink-secondary">
                      <input
                        type="checkbox"
                        checked={link.highlight || false}
                        onChange={(e) => handleUpdateHeaderLink(idx, "highlight", e.target.checked)}
                        className="rounded border-border-strong text-brand-primary focus:ring-brand-primary"
                      />
                      <span>Highlight</span>
                    </label>

                    {/* Visible Toggle */}
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-mono text-ink-secondary">
                      <input
                        type="checkbox"
                        checked={link.visible !== false}
                        onChange={(e) => handleUpdateHeaderLink(idx, "visible", e.target.checked)}
                        className="rounded border-border-strong text-brand-primary focus:ring-brand-primary"
                      />
                      <span>Visible</span>
                    </label>

                    {/* Reorder Buttons */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveHeaderLink(idx, "up")}
                      className="p-1 text-ink-muted hover:text-ink-primary disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === config.header.links.length - 1}
                      onClick={() => handleMoveHeaderLink(idx, "down")}
                      className="p-1 text-ink-muted hover:text-ink-primary disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDeleteHeaderLink(idx)}
                      className="p-1 text-status-error hover:bg-status-error/10 rounded"
                      title="Delete link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Primary Action Button (CTA) & Theme Switcher */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <h3 className="font-display text-lg font-medium text-ink-primary">
              Header Action Buttons
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              {/* CTA Button Setup */}
              <div className="space-y-3 p-4 rounded-2xl border border-border-subtle bg-surface-raised">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink-primary font-mono uppercase text-[11px]">
                    Primary CTA Button
                  </span>
                  <input
                    type="checkbox"
                    checked={config.header.ctaButton.enabled}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        header: {
                          ...config.header,
                          ctaButton: { ...config.header.ctaButton, enabled: e.target.checked },
                        },
                      })
                    }
                    className="rounded border-border-strong text-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-ink-muted">Label</label>
                  <input
                    type="text"
                    value={config.header.ctaButton.label}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        header: {
                          ...config.header,
                          ctaButton: { ...config.header.ctaButton, label: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-border-strong bg-surface text-ink-primary text-xs"
                    placeholder="Calculate Free"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-ink-muted">Target URL</label>
                  <input
                    type="text"
                    value={config.header.ctaButton.href}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        header: {
                          ...config.header,
                          ctaButton: { ...config.header.ctaButton, href: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-border-strong bg-surface text-ink-primary text-xs font-mono"
                    placeholder="/#calculator-hero"
                  />
                </div>
              </div>

              {/* Theme Toggle Setup */}
              <div className="space-y-3 p-4 rounded-2xl border border-border-subtle bg-surface-raised flex flex-col justify-between">
                <div>
                  <span className="font-semibold text-ink-primary font-mono uppercase text-[11px] block">
                    Dark / Light Mode Toggle
                  </span>
                  <p className="text-xs text-ink-secondary mt-1">
                    Show or hide the sun/moon dark mode switcher in the top right corner.
                  </p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={config.header.showThemeToggle !== false}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        header: { ...config.header, showThemeToggle: e.target.checked },
                      })
                    }
                    className="rounded border-border-strong text-brand-primary"
                  />
                  <span className="text-xs font-medium text-ink-primary">
                    Enable Dark/Light Switcher in Navbar
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FOOTER SETTINGS */}
      {activeTab === "footer" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Section 1: Brand & Purpose Statement */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <h3 className="font-display text-lg font-medium text-ink-primary">
              Footer Brand & Mission
            </h3>
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block font-mono text-[11px] text-ink-muted uppercase">
                  Brand Title
                </label>
                <input
                  type="text"
                  value={config.footer.brand.title}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      footer: {
                        ...config.footer,
                        brand: { ...config.footer.brand, title: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs"
                  placeholder="Matrix of Destiny"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] text-ink-muted uppercase">
                  Mission Statement / Description
                </label>
                <textarea
                  rows={3}
                  value={config.footer.brand.description}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      footer: {
                        ...config.footer,
                        brand: { ...config.footer.brand, description: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs leading-relaxed"
                  placeholder="An architectural numerology framework decoding personal energy charts..."
                />
              </div>
            </div>
          </div>

          {/* Section 2: Sitemap Navigation Columns */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-medium text-ink-primary">
                  Sitemap Navigation Columns
                </h3>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Organize links into structured columns (e.g. Products, Guides, Legal).
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleAddFooterColumn}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Column
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {config.footer.columns.map((col, colIdx) => (
                <div
                  key={col.id || colIdx}
                  className="p-4 sm:p-5 rounded-2xl border border-border-subtle bg-surface-raised space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-border-subtle pb-3">
                    <input
                      type="text"
                      value={col.title}
                      onChange={(e) => handleUpdateFooterColumnTitle(colIdx, e.target.value)}
                      className="font-mono text-xs font-bold uppercase text-ink-primary px-2 py-1 rounded bg-surface border border-border-subtle flex-1"
                      placeholder="Column Title"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteFooterColumn(colIdx)}
                      className="text-status-error p-1 hover:bg-status-error/10 rounded"
                      title="Delete column"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {col.links.map((link, linkIdx) => (
                      <div
                        key={link.id || linkIdx}
                        className="flex items-center gap-2 text-xs bg-surface p-2 rounded-xl border border-border-subtle"
                      >
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) =>
                            handleUpdateFooterLink(colIdx, linkIdx, "label", e.target.value)
                          }
                          placeholder="Label"
                          className="w-1/2 px-2 py-1 rounded border border-border-strong text-xs"
                        />
                        <input
                          type="text"
                          value={link.href}
                          onChange={(e) =>
                            handleUpdateFooterLink(colIdx, linkIdx, "href", e.target.value)
                          }
                          placeholder="/url"
                          className="w-1/2 px-2 py-1 rounded border border-border-strong text-xs font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteFooterLink(colIdx, linkIdx)}
                          className="text-ink-muted hover:text-status-error p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddFooterLink(colIdx)}
                    className="w-full text-xs font-mono"
                    leftIcon={<Plus className="w-3 h-3" />}
                  >
                    Add Link
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Newsletter Box Settings */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-medium text-ink-primary">
                  Footer Newsletter Signup Box
                </h3>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Enable or disable the email newsletter subscription box above the footer sitemap.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.footer.newsletter?.enabled || false}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      footer: {
                        ...config.footer,
                        newsletter: { ...config.footer.newsletter, enabled: e.target.checked },
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-raised peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-strong after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>

            {config.footer.newsletter?.enabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border-subtle text-xs">
                <div className="space-y-1">
                  <label className="block font-mono text-[11px] text-ink-muted uppercase">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={config.footer.newsletter.title}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        footer: {
                          ...config.footer,
                          newsletter: { ...config.footer.newsletter, title: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs"
                    placeholder="Receive Weekly Cosmic Codes"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[11px] text-ink-muted uppercase">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={config.footer.newsletter.buttonText}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        footer: {
                          ...config.footer,
                          newsletter: { ...config.footer.newsletter, buttonText: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs"
                    placeholder="Subscribe"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="block font-mono text-[11px] text-ink-muted uppercase">
                    Subtitle Description
                  </label>
                  <input
                    type="text"
                    value={config.footer.newsletter.subtitle}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        footer: {
                          ...config.footer,
                          newsletter: { ...config.footer.newsletter, subtitle: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs"
                    placeholder="Occult numerology breakdowns, transit forecasts..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Legal Notices & Social Links */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <h3 className="font-display text-lg font-medium text-ink-primary">
              Legal Disclaimers & Copyright Notice
            </h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-mono text-[11px] text-ink-muted uppercase">
                  Copyright Notice
                </label>
                <input
                  type="text"
                  value={config.footer.copyright}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      footer: { ...config.footer, copyright: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs"
                  placeholder="© 2026 Matrix of Destiny. All rights reserved."
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] text-ink-muted uppercase">
                  Methodological Disclaimer Notice
                </label>
                <textarea
                  rows={3}
                  value={config.footer.disclaimer}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      footer: { ...config.footer, disclaimer: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-border-strong bg-surface text-ink-primary text-xs leading-relaxed"
                />
              </div>

              {/* Social URLs */}
              <div className="pt-2 border-t border-border-subtle space-y-2">
                <span className="font-mono text-[11px] uppercase font-bold text-ink-muted block">
                  Social Channels (Leave blank to hide)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-ink-muted block">Twitter / X</label>
                    <input
                      type="text"
                      value={config.footer.socialLinks.twitter || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          footer: {
                            ...config.footer,
                            socialLinks: { ...config.footer.socialLinks, twitter: e.target.value },
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-border-strong text-xs font-mono"
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-ink-muted block">Telegram</label>
                    <input
                      type="text"
                      value={config.footer.socialLinks.telegram || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          footer: {
                            ...config.footer,
                            socialLinks: { ...config.footer.socialLinks, telegram: e.target.value },
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-border-strong text-xs font-mono"
                      placeholder="https://t.me/..."
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-ink-muted block">YouTube</label>
                    <input
                      type="text"
                      value={config.footer.socialLinks.youtube || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          footer: {
                            ...config.footer,
                            socialLinks: { ...config.footer.socialLinks, youtube: e.target.value },
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-border-strong text-xs font-mono"
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-ink-muted block">Instagram</label>
                    <input
                      type="text"
                      value={config.footer.socialLinks.instagram || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          footer: {
                            ...config.footer,
                            socialLinks: { ...config.footer.socialLinks, instagram: e.target.value },
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-border-strong text-xs font-mono"
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CODE SNIPPETS & INJECTION */}
      {activeTab === "code" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Master Execution Switch Card */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-brand-primary/10 text-brand-primary">
                    <Code className="w-4 h-4" />
                  </span>
                  <h3 className="font-display text-lg font-medium text-ink-primary">
                    Custom Code & Tracking Engine
                  </h3>
                </div>
                <p className="text-xs text-ink-secondary mt-1">
                  Inject raw tracking scripts, verification meta tags, custom CSS, or chat widgets directly into the &lt;head&gt; or &lt;body&gt; of your website.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                  config.customCode?.enabled
                    ? "bg-status-success/10 text-status-success border-status-success/30"
                    : "bg-surface-raised text-ink-muted border-border-subtle"
                }`}>
                  {config.customCode?.enabled ? "● INJECTION ACTIVE" : "○ INJECTION DISABLED"}
                </span>

                <Button
                  type="button"
                  variant={config.customCode?.enabled ? "outline" : "primary"}
                  size="sm"
                  onClick={() =>
                    setConfig({
                      ...config,
                      customCode: {
                        ...config.customCode,
                        enabled: !config.customCode?.enabled,
                      },
                    })
                  }
                >
                  {config.customCode?.enabled ? "Disable All Code" : "Enable Custom Code"}
                </Button>
              </div>
            </div>

            {/* Safety advisory */}
            <div className="p-3.5 rounded-2xl bg-brand-primary/5 border border-brand-primary/15 text-xs text-ink-secondary flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="text-ink-primary font-medium block">
                  Safe Route-Aware Execution Architecture
                </strong>
                <p>
                  Scripts are dynamically mounted on the client to avoid React hydration mismatches, while &lt;meta&gt; verification and &lt;style&gt; tags are extracted server-side for search engines. The master switch allows you to deactivate all third-party code immediately in an emergency.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Targeted Code Snippets */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
              <div>
                <h3 className="font-display text-base font-medium text-ink-primary flex items-center gap-2">
                  <Target className="w-4 h-4 text-brand-primary" />
                  Targeted Code Snippets (Whole Site, Home, or Specific Pages)
                </h3>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Add specific snippets and choose whether they run across the entire site, only on the home page, or on targeted routes (e.g. /blog/*, /tools).
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => {
                  setEditingSnippet({
                    id: `snippet-${Date.now()}`,
                    title: "",
                    target: "all",
                    pathPattern: "",
                    position: "head",
                    code: "",
                    enabled: true,
                  });
                  setIsSnippetModalOpen(true);
                }}
              >
                Add Code Snippet
              </Button>
            </div>

            {/* Snippets List */}
            {(!config.customCode?.snippets || config.customCode.snippets.length === 0) ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-border-strong bg-surface-raised/40 space-y-3">
                <FileCode className="w-8 h-8 text-ink-muted mx-auto" />
                <div className="space-y-1">
                  <p className="text-xs font-mono font-medium text-ink-primary">
                    No custom snippets configured
                  </p>
                  <p className="text-[11px] text-ink-muted max-w-sm mx-auto">
                    Click &ldquo;Add Code Snippet&rdquo; to insert Google Analytics 4, Meta Pixel, search verification tags, or page-specific scripts.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {config.customCode.snippets.map((snippet, idx) => (
                  <div
                    key={snippet.id || idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      snippet.enabled
                        ? "border-border-subtle bg-surface hover:border-brand-primary/40"
                        : "border-border-subtle/50 bg-surface-raised/40 opacity-60"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-medium text-ink-primary">
                            {snippet.title || "Untitled Snippet"}
                          </strong>

                          {/* Position Badge */}
                          <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
                            {snippet.position === "head" ? "Header (<head>)" : "Footer (<body>)"}
                          </Badge>

                          {/* Target Scope Badge */}
                          {snippet.target === "all" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                              <Globe className="w-3 h-3" />
                              Whole Site (Global)
                            </span>
                          )}
                          {snippet.target === "home" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20">
                              <Home className="w-3 h-3" />
                              Homepage Only (/)
                            </span>
                          )}
                          {snippet.target === "specific" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                              <Target className="w-3 h-3" />
                              {snippet.pathPattern || "Specific Path"}
                            </span>
                          )}
                        </div>

                        {/* Code excerpt preview */}
                        <pre className="text-[11px] font-mono text-ink-muted truncate max-w-xl bg-canvas p-1.5 rounded-lg border border-border-subtle">
                          {snippet.code.slice(0, 120)}...
                        </pre>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Status toggle */}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...config.customCode.snippets];
                            updated[idx] = { ...updated[idx], enabled: !updated[idx].enabled };
                            setConfig({
                              ...config,
                              customCode: { ...config.customCode, snippets: updated },
                            });
                          }}
                          className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                            snippet.enabled
                              ? "bg-status-success/10 text-status-success border-status-success/30"
                              : "bg-surface-raised text-ink-muted border-border-subtle"
                          }`}
                        >
                          {snippet.enabled ? "Active" : "Inactive"}
                        </button>

                        {/* Edit button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingSnippet(snippet);
                            setIsSnippetModalOpen(true);
                          }}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Button>

                        {/* Delete button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-status-error hover:bg-status-error/10"
                          onClick={() => {
                            if (confirm(`Delete snippet "${snippet.title}"?`)) {
                              const updated = config.customCode.snippets.filter((_, i) => i !== idx);
                              setConfig({
                                ...config,
                                customCode: { ...config.customCode, snippets: updated },
                              });
                            }
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Direct Global Header Code Textarea */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <div>
              <h3 className="font-display text-base font-medium text-ink-primary">
                Direct Global Header Code (&lt;head&gt;...&lt;/head&gt;)
              </h3>
              <p className="text-xs text-ink-secondary mt-0.5">
                Paste raw HTML, verification &lt;meta&gt; tags, or &lt;script&gt; tags that should run across every page in the &lt;head&gt;.
              </p>
            </div>

            <textarea
              rows={6}
              value={config.customCode?.headerCode || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  customCode: {
                    ...config.customCode,
                    headerCode: e.target.value,
                  },
                })
              }
              placeholder="<!-- Paste global <head> scripts, meta verification, or styles here -->&#10;<meta name=&quot;google-site-verification&quot; content=&quot;...&quot; />"
              className="w-full p-3.5 rounded-xl border border-border-strong bg-canvas font-mono text-xs text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 placeholder:text-ink-muted/50 leading-relaxed"
            />
          </div>

          {/* Section: Direct Global Footer Code Textarea */}
          <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <div>
              <h3 className="font-display text-base font-medium text-ink-primary">
                Direct Global Footer Code (Before &lt;/body&gt;)
              </h3>
              <p className="text-xs text-ink-secondary mt-0.5">
                Paste live chat widgets (Crisp, Tawk.to), conversion tracking scripts, or custom footer badges.
              </p>
            </div>

            <textarea
              rows={6}
              value={config.customCode?.footerCode || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  customCode: {
                    ...config.customCode,
                    footerCode: e.target.value,
                  },
                })
              }
              placeholder="<!-- Paste chat widgets or conversion pixels before </body> -->&#10;<script>console.log('Site ready');</script>"
              className="w-full p-3.5 rounded-xl border border-border-strong bg-canvas font-mono text-xs text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 placeholder:text-ink-muted/50 leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Snippet Editor Modal */}
      {isSnippetModalOpen && editingSnippet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="max-w-2xl w-full bg-surface border border-border-strong rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <h3 className="font-display text-lg font-medium text-ink-primary">
                {editingSnippet.id && config.customCode?.snippets?.some((s) => s.id === editingSnippet.id)
                  ? "Edit Code Snippet"
                  : "Add New Code Snippet"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsSnippetModalOpen(false);
                  setEditingSnippet(null);
                }}
                className="text-ink-muted hover:text-ink-primary text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>

            {/* Snippet Title */}
            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase text-ink-muted">
                Snippet Name / Label
              </label>
              <input
                type="text"
                placeholder="e.g. Google Analytics 4, Meta Pixel, Promo Banner"
                value={editingSnippet.title || ""}
                onChange={(e) => setEditingSnippet({ ...editingSnippet, title: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border-strong bg-canvas font-sans text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            {/* Target Scope Selection (The Core Requirement!) */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-ink-muted">
                Where should this code be injected? (Target Page)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingSnippet({ ...editingSnippet, target: "all" })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col gap-1 ${
                    editingSnippet.target === "all"
                      ? "border-brand-primary bg-brand-primary/10 text-ink-primary"
                      : "border-border-subtle bg-canvas text-ink-secondary hover:border-border-strong"
                  }`}
                >
                  <span className="font-bold flex items-center gap-1.5 text-ink-primary">
                    <Globe className="w-3.5 h-3.5 text-brand-primary" />
                    Whole Website
                  </span>
                  <span className="text-[11px] text-ink-muted">Runs across all public pages</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditingSnippet({ ...editingSnippet, target: "home" })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col gap-1 ${
                    editingSnippet.target === "home"
                      ? "border-brand-primary bg-brand-primary/10 text-ink-primary"
                      : "border-border-subtle bg-canvas text-ink-secondary hover:border-border-strong"
                  }`}
                >
                  <span className="font-bold flex items-center gap-1.5 text-ink-primary">
                    <Home className="w-3.5 h-3.5 text-amber-500" />
                    Homepage Only
                  </span>
                  <span className="text-[11px] text-ink-muted">Only executes on &ldquo;/&rdquo;</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditingSnippet({ ...editingSnippet, target: "specific" })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col gap-1 ${
                    editingSnippet.target === "specific"
                      ? "border-brand-primary bg-brand-primary/10 text-ink-primary"
                      : "border-border-subtle bg-canvas text-ink-secondary hover:border-border-strong"
                  }`}
                >
                  <span className="font-bold flex items-center gap-1.5 text-ink-primary">
                    <Target className="w-3.5 h-3.5 text-indigo-500" />
                    Specific Page
                  </span>
                  <span className="text-[11px] text-ink-muted">Target custom URL pattern</span>
                </button>
              </div>

              {/* Specific Path Pattern Input */}
              {editingSnippet.target === "specific" && (
                <div className="pt-2 animate-in fade-in duration-150 space-y-1">
                  <label className="block text-[11px] font-mono text-ink-muted">
                    Path Pattern (e.g. /tools, /blog/*, /chart/*, /talent-calculator)
                  </label>
                  <input
                    type="text"
                    placeholder="/blog/* or /tools"
                    value={editingSnippet.pathPattern || ""}
                    onChange={(e) => setEditingSnippet({ ...editingSnippet, pathPattern: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              )}
            </div>

            {/* Position: Head vs Footer */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-ink-muted">
                Placement Location
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs font-medium text-ink-primary cursor-pointer">
                  <input
                    type="radio"
                    name="position"
                    checked={editingSnippet.position === "head"}
                    onChange={() => setEditingSnippet({ ...editingSnippet, position: "head" })}
                  />
                  <span>Header (&lt;head&gt;...&lt;/head&gt;)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-ink-primary cursor-pointer">
                  <input
                    type="radio"
                    name="position"
                    checked={editingSnippet.position === "footer"}
                    onChange={() => setEditingSnippet({ ...editingSnippet, position: "footer" })}
                  />
                  <span>Footer (Before &lt;/body&gt;)</span>
                </label>
              </div>
            </div>

            {/* 1-Click Boilerplate Templates */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-ink-muted">Quick Boilerplate Templates:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setEditingSnippet({
                      ...editingSnippet,
                      title: "Google Analytics 4",
                      position: "head",
                      code: `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'G-XXXXXXXXXX');\n</script>`,
                    })
                  }
                  className="px-2 py-1 text-[10px] font-mono rounded-lg border border-border-subtle bg-canvas hover:bg-surface-raised transition-colors"
                >
                  + GA4 (gtag.js)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditingSnippet({
                      ...editingSnippet,
                      title: "Google Tag Manager",
                      position: "head",
                      code: `<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>\n<!-- End Google Tag Manager -->`,
                    })
                  }
                  className="px-2 py-1 text-[10px] font-mono rounded-lg border border-border-subtle bg-canvas hover:bg-surface-raised transition-colors"
                >
                  + GTM Head
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditingSnippet({
                      ...editingSnippet,
                      title: "Meta (Facebook) Pixel",
                      position: "head",
                      code: `<!-- Meta Pixel Code -->\n<script>\n!function(f,b,e,v,n,t,s)\n{if(f.fbq)return;n=f.fbq=function(){n.callMethod?\nn.callMethod.apply(n,arguments):n.queue.push(arguments)};\nif(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\nn.queue=[];t=b.createElement(e);t.async=!0;\nt.src=v;s=b.getElementsByTagName(e)[0];\ns.parentNode.insertBefore(t,s)}(window, document,'script',\n'https://connect.facebook.net/en_US/fbevents.js');\nfbq('init', 'YOUR_PIXEL_ID');\nfbq('track', 'PageView');\n</script>`,
                    })
                  }
                  className="px-2 py-1 text-[10px] font-mono rounded-lg border border-border-subtle bg-canvas hover:bg-surface-raised transition-colors"
                >
                  + Meta Pixel
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditingSnippet({
                      ...editingSnippet,
                      title: "Search Console Verification",
                      position: "head",
                      code: `<meta name="google-site-verification" content="YOUR_TOKEN_HERE" />`,
                    })
                  }
                  className="px-2 py-1 text-[10px] font-mono rounded-lg border border-border-subtle bg-canvas hover:bg-surface-raised transition-colors"
                >
                  + Verification &lt;meta&gt;
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditingSnippet({
                      ...editingSnippet,
                      title: "Live Chat Widget",
                      position: "footer",
                      code: `<!-- Live Chat Widget -->\n<script type="text/javascript">\n  window.$crisp=[];window.CRISP_WEBSITE_ID="YOUR_ID";\n  (function(){d=document;s=d.createElement("script");\n  s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();\n</script>`,
                    })
                  }
                  className="px-2 py-1 text-[10px] font-mono rounded-lg border border-border-subtle bg-canvas hover:bg-surface-raised transition-colors"
                >
                  + Chat Widget
                </button>
              </div>
            </div>

            {/* Raw Code Textarea */}
            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase text-ink-muted">
                Raw HTML / Script / CSS Code
              </label>
              <textarea
                rows={7}
                placeholder="<script>...</script> or <meta ... />"
                value={editingSnippet.code || ""}
                onChange={(e) => setEditingSnippet({ ...editingSnippet, code: e.target.value })}
                className="w-full p-3 rounded-xl border border-border-strong bg-canvas font-mono text-xs text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary placeholder:text-ink-muted/50 leading-relaxed"
                required
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border-subtle">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsSnippetModalOpen(false);
                  setEditingSnippet(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => {
                  if (!editingSnippet.code?.trim()) {
                    alert("Please enter the code snippet.");
                    return;
                  }
                  const snippets = config.customCode?.snippets || [];
                  const existingIdx = snippets.findIndex((s) => s.id === editingSnippet.id);
                  let updated: CodeSnippet[];

                  const finalSnippet: CodeSnippet = {
                    id: editingSnippet.id || `snippet-${Date.now()}`,
                    title: editingSnippet.title || "Custom Snippet",
                    target: editingSnippet.target || "all",
                    pathPattern: editingSnippet.pathPattern || "",
                    position: editingSnippet.position || "head",
                    code: editingSnippet.code || "",
                    enabled: editingSnippet.enabled ?? true,
                  };

                  if (existingIdx >= 0) {
                    updated = [...snippets];
                    updated[existingIdx] = finalSnippet;
                  } else {
                    updated = [...snippets, finalSnippet];
                  }

                  setConfig({
                    ...config,
                    customCode: {
                      ...config.customCode,
                      snippets: updated,
                    },
                  });

                  setIsSnippetModalOpen(false);
                  setEditingSnippet(null);
                }}
              >
                Save Snippet
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LIVE INTERACTIVE PREVIEW */}
      {activeTab === "preview" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 rounded-2xl bg-surface-raised border border-border-subtle flex items-center justify-between text-xs">
            <span className="text-ink-secondary font-mono">
              Live Preview: Real-time rendering of your edited Header & Footer components.
            </span>
            <Button size="sm" variant="primary" onClick={handleSave} isLoading={isSaving}>
              Publish Changes
            </Button>
          </div>

          {/* Render Navbar with in-memory config */}
          <div className="rounded-3xl border border-border-subtle overflow-hidden shadow-card">
            <div className="bg-canvas p-2 text-[11px] font-mono text-ink-muted border-b border-border-subtle uppercase px-4">
              Header Preview
            </div>
            <Navbar initialConfig={config.header} />
            <div className="p-12 text-center text-xs text-ink-muted bg-canvas">
              [ Page Body Content Area ]
            </div>
          </div>

          {/* Render Footer with in-memory config */}
          <div className="rounded-3xl border border-border-subtle overflow-hidden shadow-card">
            <div className="bg-canvas p-2 text-[11px] font-mono text-ink-muted border-b border-border-subtle uppercase px-4">
              Footer Preview
            </div>
            <Footer initialConfig={config.footer} />
          </div>
        </div>
      )}
    </div>
  );
}

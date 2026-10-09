"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
  Clock,
  Compass,
  Heart,
  Coins,
  Shield,
  Eye,
  Play,
  Pause,
  Layers,
} from "lucide-react";
import { designTokens } from "@/lib/design-tokens";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ChartZonePreview } from "@/components/matrix-chart/ChartZonePreview";

export function DesignSystemClient() {
  const [isDark, setIsDark] = useState(false);
  const [showBgAnimation, setShowBgAnimation] = useState(true);
  const [showBgGeometry, setShowBgGeometry] = useState(true);
  const [isBgPaused, setIsBgPaused] = useState(false);
  const [bgIntensity, setBgIntensity] = useState<"subtle" | "medium" | "vivid">("subtle");

  // Sync dark class to html tag
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-12 py-10 transition-colors duration-300">
      {/* Dynamic Background Animation */}
      {showBgAnimation && (
        <SacredAuraBackground
          showGeometry={showBgGeometry}
          intensity={bgIntensity}
          isPausedOverride={isBgPaused}
        />
      )}

      {/* Top Header with Interactive Mode Switches */}
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </Link>
            <span className="text-ink-muted text-xs">•</span>
            <Link
              href="/tools"
              className="text-xs font-medium text-ink-muted hover:text-ink-primary transition-colors"
            >
              Tools Suite
            </Link>
          </div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-primary animate-pulse-subtle" />
            <span className="text-xs font-semibold tracking-widest uppercase text-ink-muted">
              Design System & Architectural Specs
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-ink-primary tracking-tight">
            Matrix of Destiny
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary mt-1 font-sans">
            A contemporary, calm, and trustworthy self-discovery design language.
          </p>
        </div>

        {/* Global Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2.5 bg-surface p-2 rounded-lg border border-border-strong shadow-elevation-subtle">
          {/* Light / Dark Mode Toggle */}
          <Button
            variant={isDark ? "secondary" : "outline"}
            size="sm"
            onClick={() => setIsDark(!isDark)}
            leftIcon={isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          >
            {isDark ? "Dark: Obsidian" : "Light: Parchment"}
          </Button>

          {/* Background Motion Toggle */}
          <Button
            variant={showBgAnimation ? "outline" : "ghost"}
            size="sm"
            onClick={() => setShowBgAnimation(!showBgAnimation)}
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
          >
            {showBgAnimation ? "Aura: On" : "Aura: Off"}
          </Button>

          {/* Pause / Play State Tester */}
          {showBgAnimation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBgPaused(!isBgPaused)}
              leftIcon={isBgPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            >
              {isBgPaused ? "Paused" : "Active"}
            </Button>
          )}

          {/* Geometry Lines Toggle */}
          {showBgAnimation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBgGeometry(!showBgGeometry)}
              leftIcon={<Layers className="w-3.5 h-3.5" />}
            >
              {showBgGeometry ? "Grid: Show" : "Grid: Hide"}
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* 1. Philosophy & Anti-Cliché Foundation */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-brand-primary" />
            <h2 className="text-xs font-semibold tracking-wider uppercase text-ink-muted">
              01 / Core Aesthetic Philosophy
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card elevation="subtle" className="border-l-4 border-l-brand-primary">
              <h3 className="text-base font-semibold text-ink-primary mb-1">
                Archival Folio Meets Modern Warm Wellness
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Inspired by high-craft editorial design (Kinfolk, Cereal) and purposeful modern software
                (Linear, Cal.com). The visual language treats the Destiny Matrix as an architectural self-reflection
                system — calm, intellectual, grounded, and deeply personal.
              </p>
            </Card>

            <Card elevation="subtle" className="border-l-4 border-l-status-error">
              <h3 className="text-base font-semibold text-ink-primary mb-1">
                Deliberately Avoiding Industry Clichés
              </h3>
              <ul className="text-sm text-ink-secondary space-y-1.5 list-disc list-inside">
                <li><strong className="text-ink-primary">No Neon Purple / Nebulae:</strong> Zero cheap violet gradients or glowing mystical glitter.</li>
                <li><strong className="text-ink-primary">No Gold-on-Black Templates:</strong> Eliminates low-contrast faux-luxury &ldquo;tarot fortune teller&rdquo; tropes.</li>
                <li><strong className="text-ink-primary">High Trust & Shareability:</strong> A site design-conscious people are proud to bookmark and share.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* 2. Color System */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-brand-primary" />
            <h2 className="text-xs font-semibold tracking-wider uppercase text-ink-muted">
              02 / Color System
            </h2>
          </div>

          {/* Primary & Secondary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card elevation="low">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                    Primary Brand Color
                  </span>
                  <h3 className="text-xl font-display font-medium text-ink-primary">
                    Warm Terracotta / Cinnabar
                  </h3>
                </div>
                <Badge variant="brand">Light: #C25E3E / Dark: #E07353</Badge>
              </div>
              <p className="text-sm text-ink-secondary mb-4">
                {designTokens.colors.primary.description}
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="rounded-md p-3 text-white font-medium bg-brand-primary shadow-sm">
                  Default
                </div>
                <div className="rounded-md p-3 text-white font-medium bg-brand-primary-hover shadow-sm">
                  Hover
                </div>
                <div className="rounded-md p-3 text-white font-medium bg-brand-primary-active shadow-sm">
                  Active
                </div>
                <div className="rounded-md p-3 text-brand-primary font-medium bg-brand-primary-subtle border border-brand-primary/20">
                  Subtle
                </div>
              </div>
            </Card>

            <Card elevation="low">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
                    Secondary Accent Color
                  </span>
                  <h3 className="text-xl font-display font-medium text-ink-primary">
                    Astral Slate / Celestial Indigo
                  </h3>
                </div>
                <Badge variant="secondary">Light: #2D465E / Dark: #5B83AD</Badge>
              </div>
              <p className="text-sm text-ink-secondary mb-4">
                {designTokens.colors.secondary.description}
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="rounded-md p-3 text-white font-medium bg-brand-secondary shadow-sm">
                  Default
                </div>
                <div className="rounded-md p-3 text-white font-medium bg-brand-secondary-hover shadow-sm">
                  Hover
                </div>
                <div className="rounded-md p-3 text-white font-medium bg-brand-secondary-active shadow-sm">
                  Active
                </div>
                <div className="rounded-md p-3 text-brand-secondary font-medium bg-brand-secondary-subtle border border-brand-secondary/20">
                  Subtle
                </div>
              </div>
            </Card>
          </div>

          {/* Neutral Scales */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-ink-primary mb-3">
              Neutral Scale — {isDark ? "Obsidian Velveteen (Dark Mode)" : "Parchment Alabaster (Light Mode)"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              <div className="rounded-md p-3 border border-border-subtle bg-canvas text-ink-primary text-xs">
                <span className="block font-semibold">Canvas</span>
                <span className="text-[10px] text-ink-muted">{isDark ? "#0C0E10" : "#FAF8F5"}</span>
              </div>
              <div className="rounded-md p-3 border border-border-subtle bg-surface text-ink-primary text-xs shadow-elevation-subtle">
                <span className="block font-semibold">Surface</span>
                <span className="text-[10px] text-ink-muted">{isDark ? "#13161A" : "#FFFFFF"}</span>
              </div>
              <div className="rounded-md p-3 border border-border-subtle bg-surface-raised text-ink-primary text-xs">
                <span className="block font-semibold">Surface Raised</span>
                <span className="text-[10px] text-ink-muted">{isDark ? "#1A1E24" : "#F4F0EA"}</span>
              </div>
              <div className="rounded-md p-3 border border-border-subtle bg-surface text-ink-primary text-xs">
                <span className="block font-semibold">Border Subtle</span>
                <span className="text-[10px] text-ink-muted">{isDark ? "#232830" : "#EAE4DC"}</span>
              </div>
              <div className="rounded-md p-3 border border-border-strong bg-surface text-ink-primary text-xs">
                <span className="block font-semibold">Border Strong</span>
                <span className="text-[10px] text-ink-muted">{isDark ? "#363D49" : "#D5CCC0"}</span>
              </div>
              <div className="rounded-md p-3 border border-border-subtle bg-surface text-ink-muted text-xs">
                <span className="block font-semibold">Text Muted</span>
                <span className="text-[10px]">{isDark ? "#7E8896" : "#857D73"}</span>
              </div>
              <div className="rounded-md p-3 border border-border-subtle bg-surface text-ink-secondary text-xs">
                <span className="block font-semibold">Text Secondary</span>
                <span className="text-[10px]">{isDark ? "#A8B2C1" : "#524C44"}</span>
              </div>
              <div className="rounded-md p-3 border border-border-subtle bg-surface text-ink-primary text-xs font-bold">
                <span className="block font-semibold">Text Primary</span>
                <span className="text-[10px] text-ink-muted">{isDark ? "#F0F3F7" : "#1C1A17"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Octagram Chart Palette (10 Harmonious Tones) */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-wealth" />
              <h2 className="text-xs font-semibold tracking-wider uppercase text-ink-muted">
                03 / Chart Palette (10 Zones of Destiny)
              </h2>
            </div>
            <span className="text-xs text-ink-muted">
              Distinguishable, harmonious mineral pigments
            </span>
          </div>

          <ChartZonePreview />
        </section>

        {/* 4. Typography System */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-brand-secondary" />
            <h2 className="text-xs font-semibold tracking-wider uppercase text-ink-muted">
              04 / Typography Direction & Hierarchy
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card elevation="subtle" className="border-t-2 border-t-brand-primary">
              <span className="text-xs font-semibold uppercase text-brand-primary">
                Display Font
              </span>
              <h3 className="text-2xl font-display font-medium text-ink-primary mt-1 mb-2">
                Cormorant Garamond
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                {designTokens.typography.headingFont.rationale}
              </p>
            </Card>

            <Card elevation="subtle" className="border-t-2 border-t-brand-secondary">
              <span className="text-xs font-semibold uppercase text-brand-secondary">
                Body & Interface Font
              </span>
              <h3 className="text-2xl font-sans font-semibold text-ink-primary mt-1 mb-2">
                Plus Jakarta Sans
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                {designTokens.typography.bodyFont.rationale}
              </p>
            </Card>

            <Card elevation="subtle" className="border-t-2 border-t-chart-wealth">
              <span className="text-xs font-semibold uppercase text-chart-wealth">
                Numerology Font
              </span>
              <h3 className="text-2xl font-mono font-bold text-ink-primary mt-1 mb-2 tabular-nums">
                Tabular Numbers (tnum)
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                {designTokens.typography.numeralFont.rationale}
              </p>
            </Card>
          </div>

          {/* Type Scale Demonstration */}
          <Card elevation="low" className="space-y-6">
            <div className="border-b border-border-subtle pb-4">
              <span className="text-[11px] font-mono text-ink-muted uppercase">
                Display / 3.5rem (56px) / Line Height 1.1 / Cormorant Garamond
              </span>
              <p className="text-4xl sm:text-5xl font-display font-light text-ink-primary tracking-tight">
                The Geometry of Your Destiny
              </p>
            </div>

            <div className="border-b border-border-subtle pb-4">
              <span className="text-[11px] font-mono text-ink-muted uppercase">
                Heading 1 / 2.5rem (40px) / Line Height 1.2
              </span>
              <p className="text-3xl sm:text-4xl font-display font-normal text-ink-primary">
                Deciphering the 22 Archetypes of Fate
              </p>
            </div>

            <div className="border-b border-border-subtle pb-4">
              <span className="text-[11px] font-mono text-ink-muted uppercase">
                Heading 2 / 2rem (32px) / Line Height 1.25
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
                Karmic Tail: Breaking Recursive Life Cycles
              </h2>
            </div>

            <div className="border-b border-border-subtle pb-4">
              <span className="text-[11px] font-mono text-ink-muted uppercase">
                Heading 3 / 1.5rem (24px) / Plus Jakarta Sans
              </span>
              <h3 className="text-xl font-sans font-semibold text-ink-primary">
                The Confluence of Material Mastery and Relational Depth
              </h3>
            </div>

            <div className="border-b border-border-subtle pb-4">
              <span className="text-[11px] font-mono text-ink-muted uppercase">
                Body Large / 1.125rem (18px) / Regular
              </span>
              <p className="text-lg text-ink-secondary leading-relaxed">
                Every birth date encodes an energetic imprint across time. By mapping your day,
                month, and year through modulo-22 sacred numerology reduction, we reveal the core
                potentials and subconscious blockages awaiting integration.
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono text-ink-muted uppercase">
                Tabular Numerals Comparison / Monospace Alignment
              </span>
              <div className="flex flex-wrap gap-3 mt-2 font-mono text-base font-bold tabular-nums">
                <span className="px-3 py-1.5 rounded-md bg-surface-raised border border-border-strong text-chart-core">
                  Energy [07]
                </span>
                <span className="px-3 py-1.5 rounded-md bg-surface-raised border border-border-strong text-chart-karmic">
                  Energy [18]
                </span>
                <span className="px-3 py-1.5 rounded-md bg-surface-raised border border-border-strong text-chart-wealth">
                  Energy [21]
                </span>
                <span className="px-3 py-1.5 rounded-md bg-surface-raised border border-border-strong text-chart-love">
                  Energy [06]
                </span>
              </div>
            </div>
          </Card>
        </section>

        {/* 5. Button System (All States) */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-brand-primary" />
            <h2 className="text-xs font-semibold tracking-wider uppercase text-ink-muted">
              05 / Interactive Button System & States
            </h2>
          </div>

          <Card elevation="low" className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border-subtle text-xs font-semibold text-ink-muted uppercase">
                    <th className="pb-3 pr-4">Variant</th>
                    <th className="pb-3 px-4">Default</th>
                    <th className="pb-3 px-4">With Icon</th>
                    <th className="pb-3 px-4">Loading State</th>
                    <th className="pb-3 pl-4">Disabled</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-xs text-ink-muted uppercase">
                      Primary
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="primary">Calculate Chart</Button>
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Explore
                      </Button>
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="primary" isLoading>
                        Calculating
                      </Button>
                    </td>
                    <td className="py-3.5 pl-4">
                      <Button variant="primary" disabled>
                        Locked
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-xs text-ink-muted uppercase">
                      Secondary
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="secondary">View Archetype</Button>
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="secondary" leftIcon={<Eye className="w-4 h-4" />}>
                        Inspect
                      </Button>
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="secondary" isLoading>
                        Loading
                      </Button>
                    </td>
                    <td className="py-3.5 pl-4">
                      <Button variant="secondary" disabled>
                        Disabled
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-xs text-ink-muted uppercase">
                      Outline
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="outline">Learn More</Button>
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="outline" leftIcon={<Clock className="w-4 h-4" />}>
                        Timeline
                      </Button>
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="outline" isLoading>
                        Loading
                      </Button>
                    </td>
                    <td className="py-3.5 pl-4">
                      <Button variant="outline" disabled>
                        Disabled
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-xs text-ink-muted uppercase">
                      Ghost
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="ghost">Clear Data</Button>
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="ghost" leftIcon={<Shield className="w-4 h-4" />}>
                        Privacy
                      </Button>
                    </td>
                    <td className="py-3.5 px-4">
                      <Button variant="ghost" isLoading>
                        Loading
                      </Button>
                    </td>
                    <td className="py-3.5 pl-4">
                      <Button variant="ghost" disabled>
                        Disabled
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Size Scale */}
            <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center gap-4">
              <span className="text-xs font-semibold text-ink-muted uppercase">Button Sizes:</span>
              <Button size="sm">Small (sm)</Button>
              <Button size="md">Medium (md - Default)</Button>
              <Button size="lg">Large (lg - Hero CTA)</Button>
            </div>
          </Card>
        </section>

        {/* 6. Form Inputs & Date Picker */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-chart-talent" />
            <h2 className="text-xs font-semibold tracking-wider uppercase text-ink-muted">
              06 / Form Input States & Date Inputs
            </h2>
          </div>

          <Card elevation="low">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Input
                label="Default Input"
                placeholder="Enter your full name"
                helperText="Used only for personalized report titling"
              />
              <Input
                label="Error State Input"
                defaultValue="invalid-date-format"
                error="Please enter a valid calendar date (DD/MM/YYYY)"
              />
              <Input
                label="Disabled State"
                disabled
                defaultValue="Permanent Calculation ID"
                helperText="System-generated field"
              />
            </div>

            {/* Birth Date Segmented Input Component Preview */}
            <div className="border-t border-border-subtle pt-6">
              <div className="max-w-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-secondary block mb-2">
                  Destiny Matrix Birth Date Entry (Frictionless 3-part layout)
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-ink-muted uppercase block mb-1">
                      Day (DD)
                    </label>
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="28"
                      className="w-full rounded-md border border-border-strong bg-surface py-2.5 text-center font-mono text-base font-bold text-ink-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 tabular-nums shadow-elevation-subtle"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-ink-muted uppercase block mb-1">
                      Month (MM)
                    </label>
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="07"
                      className="w-full rounded-md border border-border-strong bg-surface py-2.5 text-center font-mono text-base font-bold text-ink-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 tabular-nums shadow-elevation-subtle"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-ink-muted uppercase block mb-1">
                      Year (YYYY)
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="1994"
                      className="w-full rounded-md border border-border-strong bg-surface py-2.5 text-center font-mono text-base font-bold text-ink-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 tabular-nums shadow-elevation-subtle"
                    />
                  </div>
                </div>
                <p className="text-xs text-ink-muted mt-2">
                  Auto-advances focus upon entering 2 digits. Validates leap years and 1900–2026 range.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* 7. Spacing, Radius, and Shadow Scales */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-chart-paternal" />
            <h2 className="text-xs font-semibold tracking-wider uppercase text-ink-muted">
              07 / Dimensional Scales (Spacing, Radius & Elevation)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Border Radius */}
            <Card elevation="low">
              <h3 className="text-sm font-semibold text-ink-primary mb-3">
                Border Radius Scale
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 bg-surface-raised border border-border-strong rounded-xs">
                  <span className="block font-semibold">xs: 3px</span>
                  <span className="text-[10px] text-ink-muted">Badges</span>
                </div>
                <div className="p-3 bg-surface-raised border border-border-strong rounded-sm">
                  <span className="block font-semibold">sm: 6px</span>
                  <span className="text-[10px] text-ink-muted">Inputs</span>
                </div>
                <div className="p-3 bg-surface-raised border border-border-strong rounded-md">
                  <span className="block font-semibold">md: 10px</span>
                  <span className="text-[10px] text-ink-muted">Buttons</span>
                </div>
                <div className="p-3 bg-surface-raised border border-border-strong rounded-lg">
                  <span className="block font-semibold">lg: 16px</span>
                  <span className="text-[10px] text-ink-muted">Cards</span>
                </div>
                <div className="p-3 bg-surface-raised border border-border-strong rounded-xl">
                  <span className="block font-semibold">xl: 24px</span>
                  <span className="text-[10px] text-ink-muted">Panels</span>
                </div>
                <div className="p-3 bg-surface-raised border border-border-strong rounded-full">
                  <span className="block font-semibold">full: 9999px</span>
                  <span className="text-[10px] text-ink-muted">Nodes / Pills</span>
                </div>
              </div>
            </Card>

            {/* Multi-layer Ambient Shadows */}
            <Card elevation="low">
              <h3 className="text-sm font-semibold text-ink-primary mb-3">
                Warm Ambient Shadow System
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="p-4 bg-surface rounded-lg border border-border-subtle shadow-elevation-subtle">
                  <span className="font-medium block">Elevation Subtle</span>
                  <span className="text-[10px] text-ink-muted">1px ambient</span>
                </div>
                <div className="p-4 bg-surface rounded-lg border border-border-subtle shadow-elevation-low">
                  <span className="font-medium block">Elevation Low</span>
                  <span className="text-[10px] text-ink-muted">Default Cards</span>
                </div>
                <div className="p-4 bg-surface rounded-lg border border-border-subtle shadow-elevation-mid">
                  <span className="font-medium block">Elevation Mid</span>
                  <span className="text-[10px] text-ink-muted">Hover / Menus</span>
                </div>
                <div className="p-4 bg-surface rounded-lg border border-border-subtle shadow-elevation-high">
                  <span className="font-medium block">Elevation High</span>
                  <span className="text-[10px] text-ink-muted">Modals / Drawers</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 8. Specialized Life Area Card Samples */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-chart-love" />
            <h2 className="text-xs font-semibold tracking-wider uppercase text-ink-muted">
              08 / Composite Life Area Card Primitives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Karmic Tail Card */}
            <Card
              elevation="mid"
              interactive
              className="border-t-4 border-t-chart-karmic flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="chart" chartZone="karmic">
                    Karmic Tail
                  </Badge>
                  <span className="text-xs font-mono font-bold text-chart-karmic">
                    18 - 6 - 6
                  </span>
                </div>
                <h3 className="text-lg font-display font-medium text-ink-primary mb-1">
                  The Illusion & Fear Triad
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                  Rooted in past-life betrayals or occult deceptions. Your evolutionary challenge in this
                  lifetime is shifting from self-doubt to authentic inner clarity.
                </p>
              </div>
              <div className="border-t border-border-subtle pt-3 flex items-center justify-between text-xs">
                <span className="text-ink-muted">Resolution difficulty:</span>
                <span className="font-semibold text-chart-karmic">High Priority</span>
              </div>
            </Card>

            {/* Wealth Channel Card */}
            <Card
              elevation="mid"
              interactive
              className="border-t-4 border-t-chart-wealth flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="chart" chartZone="wealth">
                    Money Channel
                  </Badge>
                  <span className="text-xs font-mono font-bold text-chart-wealth">
                    Energy 21 (The World)
                  </span>
                </div>
                <h3 className="text-lg font-display font-medium text-ink-primary mb-1">
                  Global Scale & Digital Horizons
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                  Financial abundance unlocks when working across borders, languages, or high-reach
                  internet media. Local constraints suffocate this current.
                </p>
              </div>
              <div className="border-t border-border-subtle pt-3 flex items-center justify-between text-xs">
                <span className="text-ink-muted">Income archetype:</span>
                <span className="font-semibold text-chart-wealth">International</span>
              </div>
            </Card>

            {/* Love Channel Card */}
            <Card
              elevation="mid"
              interactive
              className="border-t-4 border-t-chart-love flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="chart" chartZone="love">
                    Relationship Channel
                  </Badge>
                  <span className="text-xs font-mono font-bold text-chart-love">
                    Energy 6 (The Lovers)
                  </span>
                </div>
                <h3 className="text-lg font-display font-medium text-ink-primary mb-1">
                  Aesthetic Harmony & Unconditional Choice
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                  Attracts creative, visually refined partners. Primary pitfall is superficial idealism;
                  true union blossoms through mutual acceptance.
                </p>
              </div>
              <div className="border-t border-border-subtle pt-3 flex items-center justify-between text-xs">
                <span className="text-ink-muted">Ideal dynamic:</span>
                <span className="font-semibold text-chart-love">Deep Partnership</span>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-border-subtle text-center text-xs text-ink-muted">
        <p>Matrix of Destiny — Design System Specification v1.0. Zero external heavy dependencies.</p>
      </footer>
    </div>
  );
}

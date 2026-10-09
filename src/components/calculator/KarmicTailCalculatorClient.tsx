"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { calculateDestinyMatrix } from "@/lib/matrix-engine";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { karmicTailsCatalog } from "@/content/karmic-tails-catalog";
import { KarmicTailMicroCard } from "@/components/share/KarmicTailMicroCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DestinyChart } from "@/components/matrix-chart/DestinyChart";
import { ArcanaTarotCard } from "@/components/matrix-chart/ArcanaTarotCard";
import { KarmicRootVisualizer } from "@/components/matrix-chart/KarmicRootVisualizer";

export function KarmicTailCalculatorClient() {
  const [day, setDay] = useState<number>(15);
  const [month, setMonth] = useState<number>(6);
  const [year, setYear] = useState<number>(1992);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<"neutral" | "female" | "male">("neutral");
  const [calculated, setCalculated] = useState(true);
  const [visualMode, setVisualMode] = useState<"root" | "octagram">("root");

  // Compute matrix
  const matrix = React.useMemo(() => {
    return calculateDestinyMatrix({ day, month, year });
  }, [day, month, year]);

  const dateSlug = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const rootValue = matrix.karmicTail.points[0];
  const secondValue = matrix.karmicTail.points[1];
  const thirdValue = matrix.karmicTail.points[2];

  const rootArcana = arcanaMeanings[rootValue] || arcanaMeanings[15];
  const secondArcana = arcanaMeanings[secondValue] || arcanaMeanings[rootValue] || arcanaMeanings[15];
  const thirdArcana = arcanaMeanings[thirdValue] || arcanaMeanings[rootValue] || arcanaMeanings[15];

  // Find matching catalog entry for extended story if available
  const catalogEntry = React.useMemo(() => {
    const sig = matrix.karmicTail.points.join("-");
    const tailsList = Object.values(karmicTailsCatalog);
    return (
      karmicTailsCatalog[sig] ||
      tailsList.find((t) => t.triad[0] === rootValue) ||
      tailsList[0]
    );
  }, [matrix.karmicTail.points, rootValue]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculated(true);
  };

  const triadTuple: [number, number, number] = [
    matrix.karmicTail.points[0],
    matrix.karmicTail.points[1],
    matrix.karmicTail.points[2],
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Header & Hero */}
      <div className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <Badge variant="chart" chartZone="karmic" size="md" className="mx-auto">
            <ShieldAlert className="w-3.5 h-3.5 mr-1" />
            Subconscious Debt & Rebirth Engine
          </Badge>
          <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-ink-primary">
            Karmic Tail Calculator
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl mx-auto">
            Enter your birth date to decode your exact 3-arcana Karmic Tail signature, uncover
            subconscious coping reflexes carried from past incarnations, and access concrete transmutation protocols.
          </p>
        </div>

        {/* Split Hero Layout: Input Form + Sacred Esoteric Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Form (7 cols) */}
          <form
            onSubmit={handleCalculate}
            className="lg:col-span-7 p-6 sm:p-7 rounded-3xl border border-chart-karmic/30 bg-surface/95 shadow-card backdrop-blur-md space-y-5 text-left"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase text-chart-karmic tracking-wider">
                Birth Date Parameters
              </span>
              <p className="text-xs text-ink-muted">
                Calculates your 3-point Subterranean Karmic Triad (Root Point D, Past 1, Past 2).
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-medium text-ink-muted uppercase mb-1">
                  Day (1–31)
                </label>
                <input
                  type="number"
                  min={1}
                  max={31}
                  value={day}
                  onChange={(e) => setDay(Math.min(31, Math.max(1, Number(e.target.value) || 1)))}
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-karmic"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono font-medium text-ink-muted uppercase mb-1">
                  Month (1–12)
                </label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={month}
                  onChange={(e) => setMonth(Math.min(12, Math.max(1, Number(e.target.value) || 1)))}
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-karmic"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono font-medium text-ink-muted uppercase mb-1">
                  Year (1900–2050)
                </label>
                <input
                  type="number"
                  min={1900}
                  max={2050}
                  value={year}
                  onChange={(e) => setYear(Math.min(2050, Math.max(1900, Number(e.target.value) || 1990)))}
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-karmic"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
              <div className="sm:col-span-7">
                <label className="block text-[11px] font-mono font-medium text-ink-muted uppercase mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maya"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-karmic"
                />
              </div>
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-mono font-medium text-ink-muted uppercase mb-1">
                  Energy / Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-2.5 py-2 text-sm rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-karmic cursor-pointer"
                >
                  <option value="neutral">Neutral / Both</option>
                  <option value="female">Female (Yin)</option>
                  <option value="male">Male (Yang)</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full bg-chart-karmic hover:bg-chart-karmic/90 text-white font-medium"
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Reveal {name.trim() ? `${name.trim()}'s` : "My"} Karmic Tail
            </Button>
          </form>

          {/* Majestic Esoteric Artwork Card (5 cols) */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl border border-chart-karmic/40 shadow-2xl bg-surface/80">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/calculators/karmic-rebirth.webp"
                alt="Destiny Matrix Karmic Rebirth and Spiritual Transmutation"
                width={700}
                height={438}
                priority
                quality={80}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-4 space-y-1 bg-surface-raised/90 border-t border-chart-karmic/20">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-chart-karmic font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  Ancestral Debt Alchemy
                </span>
                <span className="text-ink-muted">26 Triads Cataloged</span>
              </div>
              <p className="text-xs text-ink-secondary leading-snug">
                Subterranean Anchor • Shadow Trap Loops • Transmuted Superpower
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results View */}
      {calculated && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-400">
          {/* Visual Showcase Section: Interactive Root vs Octagram */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-chart-karmic tracking-wider block">
                  Interactive Visualizer
                </span>
                <h2 className="font-display text-2xl font-medium text-ink-primary">
                  Your Subterranean Karmic Triad
                </h2>
              </div>

              {/* Toggle Visualizer Mode */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-raised border border-border-subtle self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setVisualMode("root")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    visualMode === "root"
                      ? "bg-chart-karmic text-white shadow-sm"
                      : "text-ink-secondary hover:text-ink-primary"
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Karmic Root Visual
                </button>
                <button
                  type="button"
                  onClick={() => setVisualMode("octagram")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    visualMode === "octagram"
                      ? "bg-chart-karmic text-white shadow-sm"
                      : "text-ink-secondary hover:text-ink-primary"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Full Natal Octagram
                </button>
              </div>
            </div>

            {visualMode === "root" ? (
              <KarmicRootVisualizer
                signature={matrix.karmicTail.points.join("-")}
                triad={triadTuple}
                tailName={matrix.karmicTail.name || catalogEntry.name}
                archetype={catalogEntry.archetype}
                shadowTrap={matrix.karmicTail.currentLifeTrap || catalogEntry.currentLifeTrap}
                transmutationStep={catalogEntry.healingRecommendations[0]}
              />
            ) : (
              <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card">
                <DestinyChart
                  matrix={matrix}
                  activeLens="karma"
                  showLensControl={true}
                  interactive={true}
                />
              </div>
            )}
          </div>

          {/* Main Karmic Result Hero Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-chart-karmic/30 bg-gradient-to-b from-chart-karmic/10 via-surface to-surface shadow-elevation-high space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-chart-karmic font-semibold">
                  Detected Karmic Archetype
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-medium text-ink-primary">
                  {matrix.karmicTail.name || catalogEntry.name}
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted font-mono">
                  Archetype: {catalogEntry.archetype}
                </p>
              </div>

              {/* 3-Arcana Signature Badges */}
              <div className="flex items-center gap-2 font-mono text-xl sm:text-2xl font-bold text-chart-karmic tabular-nums bg-chart-karmic/15 px-4 py-2.5 rounded-2xl border border-chart-karmic/30 self-start sm:self-auto">
                <span>{matrix.karmicTail.points[0]}</span>
                <span className="text-chart-karmic/50">&bull;</span>
                <span>{matrix.karmicTail.points[1]}</span>
                <span className="text-chart-karmic/50">&bull;</span>
                <span>{matrix.karmicTail.points[2]}</span>
              </div>
            </div>

            {/* Past-Life Origin & Core Dilemma */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface-raised space-y-2">
              <span className="text-xs font-mono font-semibold uppercase text-brand-primary flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Past-Life Origin Dilemma
              </span>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {matrix.karmicTail.pastLifeStory || catalogEntry.pastLifeStory}
              </p>
            </div>

            {/* Minus vs. Plus Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl border border-status-error/25 bg-status-error/5 space-y-2">
                <span className="text-xs font-mono font-semibold uppercase text-status-error block">
                  The Subconscious Trap (Minus State)
                </span>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {matrix.karmicTail.currentLifeTrap || catalogEntry.currentLifeTrap}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-status-success/25 bg-status-success/5 space-y-2">
                <span className="text-xs font-mono font-semibold uppercase text-status-success block">
                  The Evolutionary Mastery (Plus State)
                </span>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {rootArcana.karmic.evolutionaryPath || catalogEntry.healingRecommendations[0]}
                </p>
              </div>
            </div>

            {/* Actionable Transmutation Protocol */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface-raised space-y-3">
              <span className="text-xs font-mono font-semibold uppercase text-chart-karmic block">
                Concrete Transmutation Protocol (4 Golden Rules)
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-ink-secondary">
                {(matrix.karmicTail.healingRecommendations && matrix.karmicTail.healingRecommendations.length > 0
                  ? matrix.karmicTail.healingRecommendations
                  : catalogEntry.healingRecommendations
                ).map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                    <span className="leading-snug">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Share Micro Card Embedded */}
            <div className="pt-4 border-t border-border-subtle">
              <KarmicTailMicroCard
                signature={matrix.karmicTail.points.join("-")}
                name={matrix.karmicTail.name || catalogEntry.name}
                archetype={catalogEntry.archetype}
                trap={matrix.karmicTail.currentLifeTrap || catalogEntry.currentLifeTrap}
                affirmation={rootArcana.affirmation}
                dateSlug={dateSlug}
              />
            </div>

            {/* Direct Link to Full 9-Pillar Reading */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-display text-lg font-medium text-ink-primary">
                  Ready to see how your Karmic Tail interacts with Love & Wealth?
                </h3>
                <p className="text-xs text-ink-secondary">
                  Open your complete 22-node Octagram Matrix with all 9 pillars, chakra anatomy, and life purpose roadmap.
                </p>
              </div>
              <Link href={`/chart/${dateSlug}`} className="shrink-0">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Full Chart ({dateSlug})
                </Button>
              </Link>
            </div>
          </div>

          {/* Primary Karmic Root Arcana Tarot Card */}
          <div className="space-y-4">
            <div className="px-1">
              <span className="text-xs font-mono font-semibold uppercase text-ink-muted tracking-wider block">
                Archetypal Blueprint
              </span>
              <h3 className="font-display text-2xl font-medium text-ink-primary">
                Primary Karmic Anchor &mdash; Point D
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ArcanaTarotCard
                arcana={rootArcana}
                roleLabel={`Primary Karmic Anchor (#${rootValue})`}
                tagline="Subconscious Root Debt to Transmute"
                accentColor="karma"
                showFrequencyMeter={true}
              />
              <ArcanaTarotCard
                arcana={secondArcana}
                roleLabel={`Secondary Trigger Node (#${secondValue})`}
                tagline="Behavioral Cycle Reinforcer"
                accentColor="core"
                showFrequencyMeter={true}
              />
            </div>
          </div>

          {/* Educational Explainer Section */}
          <div className="p-6 sm:p-8 rounded-3xl border border-border-subtle bg-surface space-y-6">
            <h3 className="font-display text-xl sm:text-2xl font-medium text-ink-primary">
              How the Karmic Tail Operates in Your Life
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs sm:text-sm text-ink-secondary leading-relaxed">
              <div className="p-4 rounded-xl border border-border-subtle bg-surface-raised space-y-2">
                <strong className="text-ink-primary block font-semibold">1. Default Reactive Loop</strong>
                <p>
                  Until age 35–40, most individuals unconsciously repeat their karmic tail&apos;s minus expression whenever stress, breakup, or financial loss strikes.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border-subtle bg-surface-raised space-y-2">
                <strong className="text-ink-primary block font-semibold">2. The Relationship Test</strong>
                <p>
                  The universe often brings romantic partners whose karmic tails directly mirror your subconscious shadow, forcing you to break generational patterns.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border-subtle bg-surface-raised space-y-2">
                <strong className="text-ink-primary block font-semibold">3. Transmutation into Gift</strong>
                <p>
                  Once consciously recognized, your karmic tail becomes your superpower—the exact realm where you mentor others with deep empathy and authority.
                </p>
              </div>
            </div>
          </div>

          {/* Full Natal Chart CTA Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-chart-karmic/15 via-surface to-brand-primary/10 border border-chart-karmic/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-medium text-ink-primary">
                Explore Your Full 9-Pillar Natal Destiny Matrix
              </h3>
              <p className="text-xs text-ink-secondary">
                See how your Karmic Tail interacts with your Soul Comfort Zone, Talent Triad, and 0–80 Age Cycle Transits.
              </p>
            </div>
            <Link
              href={`/chart/${dateSlug}${name.trim() || gender !== "neutral" ? `?${new URLSearchParams({ ...(name.trim() ? { name: name.trim() } : {}), ...(gender !== "neutral" ? { gender } : {}) }).toString()}` : ""}`}
              className="shrink-0"
            >
              <Button variant="primary" size="md" className="bg-chart-karmic hover:bg-chart-karmic/90 text-white" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Complete Natal Matrix ({dateSlug})
              </Button>
            </Link>
          </div>

          {/* Browse Other 25 Karmic Tails */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-chart-karmic font-semibold">
                  Catalog
                </span>
                <h3 className="font-display text-xl font-medium text-ink-primary">
                  Explore All 26 Karmic Programs
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.values(karmicTailsCatalog).map((tail) => (
                <Link
                  key={tail.id}
                  href={`/karmic-tails/${tail.id}`}
                  className="p-3.5 rounded-xl border border-border-subtle bg-surface hover:border-chart-karmic/40 hover:bg-chart-karmic/5 transition-all duration-150 flex items-center justify-between text-xs group"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono text-chart-karmic font-semibold">
                      {tail.signature}
                    </span>
                    <span className="block font-medium text-ink-primary group-hover:text-chart-karmic transition-colors">
                      {tail.name}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-chart-karmic group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

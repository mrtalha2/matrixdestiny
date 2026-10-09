"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  Users,
  Compass,
  Coins,
  ShieldAlert,
  ArrowRight,
  ArrowLeftRight,
  Share2,
  Calendar,
  Layers,
  Award,
  CheckCircle2,
} from "lucide-react";
import { DestinyChart } from "@/components/matrix-chart/DestinyChart";
import {
  calculateCompatibility,
  CompatibilityResult,
} from "@/lib/matrix-engine/composite";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ShareButton } from "@/components/share/ShareButton";

interface CompatibilityClientProps {
  initialDate1?: string;
  initialDate2?: string;
  initialName1?: string;
  initialName2?: string;
}

export function CompatibilityClient({
  initialDate1 = "1995-08-24",
  initialDate2 = "1996-03-15",
  initialName1 = "Alex",
  initialName2 = "Jordan",
}: CompatibilityClientProps) {
  const [name1, setName1] = useState(initialName1);
  const [date1, setDate1] = useState(initialDate1);
  const [name2, setName2] = useState(initialName2);
  const [date2, setDate2] = useState(initialDate2);

  const [activeTab, setActiveTab] = useState<"composite" | "side-by-side" | "synergy">("composite");
  const [isPending, startTransition] = useTransition();

  // Helper to parse YYYY-MM-DD
  const parseDate = (dStr: string) => {
    const parts = dStr.split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      return { year: parts[0], month: parts[1], day: parts[2] };
    }
    return { year: 1995, month: 8, day: 24 };
  };

  // Compute compatibility results
  const result: CompatibilityResult = React.useMemo(() => {
    const birthA = parseDate(date1);
    const birthB = parseDate(date2);
    return calculateCompatibility(
      { name: name1 || "Partner 1", birthDate: birthA },
      { name: name2 || "Partner 2", birthDate: birthB }
    );
  }, [date1, date2, name1, name2]);

  const { partnerA, partnerB, compositeMatrix, synergy } = result;

  const unionCenterArcana = arcanaMeanings[synergy.unionComfortZone];
  const loveGateArcana = arcanaMeanings[synergy.emotionalHarmony.loveGate];
  const moneyGateArcana = arcanaMeanings[synergy.financialHarmony.moneyGate];
  const karmicRootArcana = arcanaMeanings[synergy.karmicChallenge.tail[0]];

  // Swap partners action
  const handleSwap = () => {
    startTransition(() => {
      const tempName = name1;
      const tempDate = date1;
      setName1(name2);
      setDate1(date2);
      setName2(tempName);
      setDate2(tempDate);
    });
  };

  return (
    <div className="w-full text-ink-primary">
      {/* Header / Sub-Nav Bar */}
      <section className="border-b border-border-subtle bg-surface/50 backdrop-blur-md sticky top-16 z-30 py-4 px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
              <Heart className="w-5 h-5 fill-brand-primary/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-medium tracking-tight">
                  {partnerA.name} & {partnerB.name}
                </h1>
                <Badge variant="brand" size="sm">
                  {synergy.overallScore}% Cohesion
                </Badge>
              </div>
              <p className="text-xs text-ink-muted">
                Composite Destiny Matrix & Energetic Synergy
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-surface-raised rounded-xl border border-border-subtle text-xs font-medium">
            <button
              onClick={() => setActiveTab("composite")}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === "composite"
                  ? "bg-brand-primary text-white shadow-sm font-semibold"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              Union Chart
            </button>
            <button
              onClick={() => setActiveTab("side-by-side")}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === "side-by-side"
                  ? "bg-brand-primary text-white shadow-sm font-semibold"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setActiveTab("synergy")}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === "synergy"
                  ? "bg-brand-primary text-white shadow-sm font-semibold"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              Synergy Analysis
            </button>
          </div>
        </div>
      </section>

      <main className="site-container py-8 sm:py-12 space-y-12">
        {/* Dual Birth-Date Input Form (Side-by-side desktop, stacked mobile) */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface shadow-card">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-border-subtle gap-4">
            <div>
              <h2 className="font-display text-lg sm:text-xl font-medium text-ink-primary">
                Pair Configuration
              </h2>
              <p className="text-xs text-ink-secondary">
                Adjust names and birth dates to instantly recalculate the relationship synergy.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwap}
              leftIcon={<ArrowLeftRight className="w-3.5 h-3.5" />}
            >
              Swap Partners
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative">
            {/* Divider Icon on Desktop */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-surface border border-border-strong items-center justify-center text-ink-muted">
              <Heart className="w-4 h-4 text-brand-primary fill-brand-primary/20" />
            </div>

            {/* Partner 1 Box */}
            <div className="p-5 rounded-xl border border-border-subtle bg-canvas space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold">
                  Partner 1
                </span>
                <span className="text-[11px] font-mono text-ink-muted">
                  Personality: {partnerA.matrix.points.find((p) => p.id === "personality")?.value}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-ink-secondary mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Partner 1"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-ink-secondary mb-1">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    value={date1}
                    onChange={(e) => setDate1(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Partner 2 Box */}
            <div className="p-5 rounded-xl border border-border-subtle bg-canvas space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-accent-secondary font-semibold">
                  Partner 2
                </span>
                <span className="text-[11px] font-mono text-ink-muted">
                  Personality: {partnerB.matrix.points.find((p) => p.id === "personality")?.value}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-ink-secondary mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Partner 2"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-ink-secondary mb-1">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    value={date2}
                    onChange={(e) => setDate2(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View 1: Composite Union Chart */}
        {activeTab === "composite" && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <Badge variant="brand" size="sm">
                Composite Energetic Geometry
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-primary">
                The Union Matrix of {partnerA.name} & {partnerB.name}
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Calculated by combining both individual charts node-by-node modulo 22. This chart
                represents the shared field, third entity, and purpose born between you.
              </p>
            </div>

            {/* Render DestinyChart with Composite Data */}
            <div className="p-4 sm:p-8 rounded-2xl border border-border-subtle bg-surface shadow-card flex justify-center">
              <div className="w-full max-w-3xl">
                <DestinyChart matrix={compositeMatrix} />
              </div>
            </div>

            {/* Quick Union Insights Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-border-subtle bg-surface space-y-2">
                <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider">
                  Union Core Sanctuary
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-chart-core">
                    Arcana {synergy.unionComfortZone}
                  </span>
                  <span className="text-xs text-ink-secondary">
                    {unionCenterArcana?.name}
                  </span>
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                  {unionCenterArcana?.personality.comfortZone}
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border-subtle bg-surface space-y-2">
                <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider">
                  Emotional Channel Gate
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-chart-love">
                    Arcana {synergy.emotionalHarmony.loveGate}
                  </span>
                  <span className="text-xs text-ink-secondary">
                    {loveGateArcana?.name}
                  </span>
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                  {loveGateArcana?.relationships.dynamics}
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border-subtle bg-surface space-y-2">
                <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider">
                  Shared Financial Key
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-chart-wealth">
                    Arcana {synergy.financialHarmony.moneyGate}
                  </span>
                  <span className="text-xs text-ink-secondary">
                    {moneyGateArcana?.name}
                  </span>
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                  {moneyGateArcana?.money.financialMindset}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Side-by-Side Individual Comparison */}
        {activeTab === "side-by-side" && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <Badge variant="default" size="sm">
                Dual Individual Geometry
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-primary">
                Individual Blueprint Comparison
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Observe the personal architectures side by side to see where your natural energies
                resonate, mirror, or complement each other.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Partner 1 Chart Card */}
              <div className="p-5 sm:p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div>
                    <h3 className="font-display text-lg font-medium text-ink-primary">
                      {partnerA.name}&apos;s Chart
                    </h3>
                    <span className="text-xs font-mono text-ink-muted">
                      Born: {date1}
                    </span>
                  </div>
                  <Link href={`/chart/${date1}?name=${encodeURIComponent(partnerA.name)}`}>
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Full Analysis
                    </Button>
                  </Link>
                </div>
                <div className="max-w-md mx-auto">
                  <DestinyChart matrix={partnerA.matrix} />
                </div>
              </div>

              {/* Partner 2 Chart Card */}
              <div className="p-5 sm:p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div>
                    <h3 className="font-display text-lg font-medium text-ink-primary">
                      {partnerB.name}&apos;s Chart
                    </h3>
                    <span className="text-xs font-mono text-ink-muted">
                      Born: {date2}
                    </span>
                  </div>
                  <Link href={`/chart/${date2}?name=${encodeURIComponent(partnerB.name)}`}>
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Full Analysis
                    </Button>
                  </Link>
                </div>
                <div className="max-w-md mx-auto">
                  <DestinyChart matrix={partnerB.matrix} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 3 / Common Synergy Analysis Content */}
        <section className="space-y-8">
          <div className="border-t border-border-subtle pt-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold">
                  Evolutionary Synergy Analysis
                </span>
                <h3 className="font-display text-2xl font-medium text-ink-primary mt-1">
                  How Your Energies Harmonize
                </h3>
              </div>
              <ShareButton
                title={`${partnerA.name} & ${partnerB.name} Compatibility Report`}
                text={`Discover the Matrix of Destiny relationship compatibility for ${partnerA.name} and ${partnerB.name}. Overall Cohesion: ${synergy.overallScore}%.`}
              />
            </div>

            {/* Shared Energies Strip */}
            <div className="p-6 rounded-2xl border border-border-subtle bg-surface-raised mb-8 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-primary" />
                <h4 className="text-sm font-semibold uppercase tracking-wider font-mono text-ink-primary">
                  Shared Arcana Frequencies ({synergy.sharedEnergies.length})
                </h4>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                These are the archetypes present in both individuals&apos; Destiny Matrices. Shared
                frequencies create effortless mutual understanding, common instinctive reactions, and
                familiar conversational rhythms.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {synergy.sharedEnergies.length > 0 ? (
                  synergy.sharedEnergies.map((val) => {
                    const info = arcanaMeanings[val];
                    return (
                      <div
                        key={val}
                        className="px-3 py-1.5 rounded-lg border border-border-strong bg-surface flex items-center gap-2 text-xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary font-mono font-bold flex items-center justify-center text-[11px]">
                          {val}
                        </span>
                        <span className="font-medium text-ink-primary">
                          {info?.name || `Arcana ${val}`}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <span className="text-xs text-ink-muted italic">
                    Your charts have complementary, distinct energies rather than direct numerical overlaps,
                    inviting continuous discovery and non-redundant growth.
                  </span>
                )}
              </div>
            </div>

            {/* 4-Pillar Synergy Scorecard */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold">
                    Composite Matrix Breakdown
                  </span>
                  <h4 className="font-display text-xl font-medium text-ink-primary">
                    4-Pillar Synergy Scorecard
                  </h4>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-xs font-mono font-bold text-brand-primary self-start sm:self-auto">
                  <span>Cohesion: {synergy.overallScore}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Spiritual */}
                <div className="p-4 rounded-xl border border-border-subtle bg-surface space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-chart-spirit font-semibold">
                      1. Spiritual
                    </span>
                    <span className="font-mono text-lg font-bold text-ink-primary">
                      {synergy.pillars.spiritual.score}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-raised rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-chart-spirit h-full rounded-full transition-all duration-500"
                      style={{ width: `${synergy.pillars.spiritual.score}%` }}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-chart-spirit block">
                      {synergy.pillars.spiritual.status}
                    </span>
                    <p className="text-[11px] text-ink-secondary mt-1 leading-snug">
                      {synergy.pillars.spiritual.summary}
                    </p>
                  </div>
                </div>

                {/* 2. Emotional */}
                <div className="p-4 rounded-xl border border-border-subtle bg-surface space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-chart-love font-semibold">
                      2. Emotional
                    </span>
                    <span className="font-mono text-lg font-bold text-ink-primary">
                      {synergy.pillars.emotional.score}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-raised rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-chart-love h-full rounded-full transition-all duration-500"
                      style={{ width: `${synergy.pillars.emotional.score}%` }}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-chart-love block">
                      {synergy.pillars.emotional.status}
                    </span>
                    <p className="text-[11px] text-ink-secondary mt-1 leading-snug">
                      {synergy.pillars.emotional.summary}
                    </p>
                  </div>
                </div>

                {/* 3. Financial */}
                <div className="p-4 rounded-xl border border-border-subtle bg-surface space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-chart-wealth font-semibold">
                      3. Financial
                    </span>
                    <span className="font-mono text-lg font-bold text-ink-primary">
                      {synergy.pillars.financial.score}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-raised rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-chart-wealth h-full rounded-full transition-all duration-500"
                      style={{ width: `${synergy.pillars.financial.score}%` }}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-chart-wealth block">
                      {synergy.pillars.financial.status}
                    </span>
                    <p className="text-[11px] text-ink-secondary mt-1 leading-snug">
                      {synergy.pillars.financial.summary}
                    </p>
                  </div>
                </div>

                {/* 4. Karmic */}
                <div className="p-4 rounded-xl border border-border-subtle bg-surface space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-chart-karmic font-semibold">
                      4. Karmic
                    </span>
                    <span className="font-mono text-lg font-bold text-ink-primary">
                      {synergy.pillars.karmic.score}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-raised rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-chart-karmic h-full rounded-full transition-all duration-500"
                      style={{ width: `${synergy.pillars.karmic.score}%` }}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-chart-karmic block">
                      {synergy.pillars.karmic.status}
                    </span>
                    <p className="text-[11px] text-ink-secondary mt-1 leading-snug">
                      {synergy.pillars.karmic.summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Pillars of Union Synergy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Soul Purpose of the Union */}
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-3">
                <div className="flex items-center gap-2.5 text-chart-core">
                  <Compass className="w-5 h-5" />
                  <h4 className="font-display text-lg font-medium text-ink-primary">
                    1. Soul Mission & Comfort Zone
                  </h4>
                </div>
                <div className="p-3 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-between text-xs">
                  <span className="text-ink-secondary font-medium">Composite Center:</span>
                  <span className="font-bold text-chart-core">
                    Arcana {synergy.unionComfortZone} — {unionCenterArcana?.name}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  When you are together, the energetic environment you create naturally embodies the
                  qualities of {unionCenterArcana?.archetype}. {unionCenterArcana?.personality.comfortZone}
                </p>
                <div className="pt-2 border-t border-border-subtle">
                  <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block mb-1">
                    Evolutionary Objective
                  </span>
                  <p className="text-xs text-ink-secondary italic">
                    &ldquo;{unionCenterArcana?.pullQuote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card 2: Emotional & Romantic Language */}
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-3">
                <div className="flex items-center gap-2.5 text-chart-love">
                  <Heart className="w-5 h-5" />
                  <h4 className="font-display text-lg font-medium text-ink-primary">
                    2. Emotional & Romantic Language
                  </h4>
                </div>
                <div className="p-3 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-between text-xs">
                  <span className="text-ink-secondary font-medium">Love Entrance Key:</span>
                  <span className="font-bold text-chart-love">
                    Arcana {synergy.emotionalHarmony.loveGate} — {loveGateArcana?.name}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {synergy.emotionalHarmony.description}
                </p>
                <div className="pt-2 border-t border-border-subtle">
                  <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block mb-1">
                    Relational Growth Area
                  </span>
                  <p className="text-xs text-ink-secondary">
                    {loveGateArcana?.relationships.growthArea}
                  </p>
                </div>
              </div>

              {/* Card 3: Financial & Material Alignment */}
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-3">
                <div className="flex items-center gap-2.5 text-chart-wealth">
                  <Coins className="w-5 h-5" />
                  <h4 className="font-display text-lg font-medium text-ink-primary">
                    3. Material & Financial Collaboration
                  </h4>
                </div>
                <div className="p-3 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-between text-xs">
                  <span className="text-ink-secondary font-medium">Money Gate:</span>
                  <span className="font-bold text-chart-wealth">
                    Arcana {synergy.financialHarmony.moneyGate} — {moneyGateArcana?.name}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {synergy.financialHarmony.description}
                </p>
                <div className="pt-2 border-t border-border-subtle">
                  <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block mb-1">
                    Financial Mindset
                  </span>
                  <p className="text-xs text-ink-secondary">
                    {moneyGateArcana?.money.financialMindset}
                  </p>
                </div>
              </div>

              {/* Card 4: Karmic Lessons & Growth Triggers */}
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-3">
                <div className="flex items-center gap-2.5 text-chart-karmic">
                  <ShieldAlert className="w-5 h-5" />
                  <h4 className="font-display text-lg font-medium text-ink-primary">
                    4. Karmic Lessons & Potential Pitfalls
                  </h4>
                </div>
                <div className="p-3 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-between text-xs">
                  <span className="text-ink-secondary font-medium">Composite Karmic Tail:</span>
                  <span className="font-bold text-chart-karmic">
                    {synergy.karmicChallenge.tail.join(" - ")}
                    {synergy.karmicChallenge.name ? ` (${synergy.karmicChallenge.name})` : ""}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {synergy.karmicChallenge.description}
                </p>
                <div className="pt-2 border-t border-border-subtle">
                  <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block mb-1">
                    Evolutionary Resolution
                  </span>
                  <p className="text-xs text-ink-secondary">
                    {karmicRootArcana?.karmic.evolutionaryPath}
                  </p>
                </div>
              </div>
            </div>

            {/* Compatibility Green & Red Flags */}
            <div className="mt-10 pt-10 border-t border-border-subtle space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold">
                  Relational Dynamics
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-medium text-ink-primary mt-1">
                  Resonant Strengths & Shadow Pitfalls (Green vs. Red Flags)
                </h4>
                <p className="text-xs text-ink-secondary mt-1">
                  Computed directly from shared arcana frequencies and karmic pressure points.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Green Flags (Resonant Strengths) */}
                <div className="p-6 rounded-2xl border border-status-success/25 bg-status-success/5 space-y-4">
                  <div className="flex items-center gap-2 text-status-success">
                    <CheckCircle2 className="w-5 h-5" />
                    <h5 className="font-display text-base font-semibold uppercase tracking-wide">
                      Resonant Strengths (Green Flags)
                    </h5>
                  </div>
                  <div className="space-y-3">
                    {synergy.flags.green.map((flag, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-status-success/20 bg-surface text-xs space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-status-success/15 text-status-success font-mono font-bold flex items-center justify-center text-[11px]">
                            {flag.arcanaNumber}
                          </span>
                          <strong className="text-ink-primary">{flag.title}</strong>
                        </div>
                        <p className="text-ink-secondary leading-relaxed pl-7">
                          {flag.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Red Flags (Conflicting Shadow Traps) */}
                <div className="p-6 rounded-2xl border border-status-error/25 bg-status-error/5 space-y-4">
                  <div className="flex items-center gap-2 text-status-error">
                    <ShieldAlert className="w-5 h-5" />
                    <h5 className="font-display text-base font-semibold uppercase tracking-wide">
                      Conflicting Shadow Traps (Red Flags)
                    </h5>
                  </div>
                  <div className="space-y-3">
                    {synergy.flags.red.map((flag, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-status-error/20 bg-surface text-xs space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-status-error/15 text-status-error font-mono font-bold flex items-center justify-center text-[11px]">
                            {flag.arcanaNumber}
                          </span>
                          <strong className="text-ink-primary">{flag.title}</strong>
                        </div>
                        <p className="text-ink-secondary leading-relaxed pl-7">
                          {flag.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Soft Next Step Banner */}
        <section className="p-8 rounded-3xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 via-surface to-accent-secondary/5 text-center space-y-4">
          <h3 className="font-display text-xl sm:text-2xl font-medium text-ink-primary">
            Explore Your Individual Blueprints
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary max-w-xl mx-auto">
            Deepen your understanding by exploring the complete single charts for both partners,
            including life purpose cycles, generational lineage, and yearly influences.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href={`/chart/${date1}?name=${encodeURIComponent(partnerA.name)}`}>
              <Button variant="primary" size="sm">
                View {partnerA.name}&apos;s Chart
              </Button>
            </Link>
            <Link href={`/chart/${date2}?name=${encodeURIComponent(partnerB.name)}`}>
              <Button variant="outline" size="sm">
                View {partnerB.name}&apos;s Chart
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                All Tools
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

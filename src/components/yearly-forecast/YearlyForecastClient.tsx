"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  Compass,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Sun,
  Layers,
} from "lucide-react";
import { calculateDestinyMatrix, DestinyMatrix } from "@/lib/matrix-engine";
import { calculateYearlyForecast, YearlyForecast } from "@/lib/matrix-engine/yearly";
import { DestinyChart } from "@/components/matrix-chart/DestinyChart";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/share/ShareButton";

interface YearlyForecastClientProps {
  initialDate?: string;
  initialYear?: number;
  initialName?: string;
}

export function YearlyForecastClient({
  initialDate = "1995-08-24",
  initialYear = new Date().getFullYear(),
  initialName = "Alex",
}: YearlyForecastClientProps) {
  const [userName, setUserName] = useState(initialName);
  const [birthDate, setBirthDate] = useState(initialDate);
  const [targetYear, setTargetYear] = useState(initialYear);
  const [selectedMilestoneAge, setSelectedMilestoneAge] = useState<number | null>(null);

  // Helper to parse YYYY-MM-DD
  const parseDate = (dStr: string) => {
    const parts = dStr.split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      return { year: parts[0], month: parts[1], day: parts[2] };
    }
    return { year: 1995, month: 8, day: 24 };
  };

  const birth = React.useMemo(() => parseDate(birthDate), [birthDate]);
  const matrix: DestinyMatrix = React.useMemo(() => calculateDestinyMatrix(birth), [birth]);
  const forecast: YearlyForecast = React.useMemo(
    () => calculateYearlyForecast(birth, targetYear),
    [birth, targetYear]
  );

  const yearArcana = arcanaMeanings[forecast.personalYearEnergy];

  return (
    <div className="w-full text-ink-primary">
      {/* Top Header Bar */}
      <section className="border-b border-border-subtle bg-surface/50 backdrop-blur-md sticky top-16 z-30 py-4 px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-medium tracking-tight">
                  {targetYear} Energy Forecast
                </h1>
                <Badge variant="brand" size="sm">
                  Arcana {forecast.personalYearEnergy}
                </Badge>
              </div>
              <p className="text-xs text-ink-muted">
                Personal annual influence, quarterly cycles & 0–80 age perimeter timeline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShareButton
              title={`${targetYear} Energy Forecast for ${userName}`}
              text={`Discover your ${targetYear} Personal Year Energy (Arcana ${forecast.personalYearEnergy}: ${yearArcana?.name}) and age cycle phase.`}
            />
          </div>
        </div>
      </section>

      <main className="site-container py-8 sm:py-12 space-y-12">
        {/* Controls: Birth Date + Year Selector */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface shadow-card max-w-3xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-border-subtle">
            <div>
              <h2 className="font-display text-lg sm:text-xl font-medium text-ink-primary">
                Forecast Controls
              </h2>
              <p className="text-xs text-ink-secondary">
                Select your birth date and the solar year you want to evaluate.
              </p>
            </div>

            {/* Quick Year Steppers */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTargetYear((y) => y - 1)}
                className="p-2 rounded-lg border border-border-strong bg-surface hover:bg-surface-raised transition-colors text-ink-secondary"
                aria-label="Previous Year"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-sm font-bold px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-ink-primary">
                {targetYear}
              </span>
              <button
                onClick={() => setTargetYear((y) => y + 1)}
                className="p-2 rounded-lg border border-border-strong bg-surface hover:bg-surface-raised transition-colors text-ink-secondary"
                aria-label="Next Year"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Alex"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                Birth Date
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                Target Year
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  value={targetYear}
                  onChange={(e) => setTargetYear(parseInt(e.target.value) || new Date().getFullYear())}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono"
                />
                <button
                  type="button"
                  onClick={() => setTargetYear(new Date().getFullYear())}
                  className="px-3 py-2 text-xs font-medium rounded-lg border border-border-subtle bg-surface-raised hover:bg-surface text-ink-secondary whitespace-nowrap"
                >
                  Current
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Banner: Personal Year Energy */}
        <div className="p-6 sm:p-10 rounded-3xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/10 via-surface to-accent-secondary/5 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="brand" size="sm">
                  Personal Year Arcana
                </Badge>
                <span className="text-xs font-mono text-ink-muted">
                  Age during {targetYear}: {forecast.age} years old
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink-primary">
                Arcana {forecast.personalYearEnergy}: {yearArcana?.name}
              </h2>
              <p className="text-sm sm:text-base text-ink-secondary max-w-2xl font-sans">
                {yearArcana?.archetype} — {yearArcana?.essence}
              </p>
            </div>

            {/* Large Emblem */}
            <div className="shrink-0 w-24 h-24 rounded-2xl bg-surface border border-brand-primary/30 flex flex-col items-center justify-center shadow-card text-center p-2">
              <span className="font-mono text-3xl font-bold text-brand-primary">
                {forecast.personalYearEnergy}
              </span>
              <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider">
                Annual Frequency
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border-subtle">
            <p className="text-xs sm:text-sm text-ink-secondary italic leading-relaxed">
              &ldquo;{yearArcana?.pullQuote}&rdquo;
            </p>
          </div>

          {/* Decomposed Transit Layers (3 Sub-Layers: Outer, Inner, Synthesis) */}
          <div className="pt-4 border-t border-border-subtle/60 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-primary">
                Tripartite Transit Decomposition
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Layer 1: Manifest Horizon */}
              <div className="p-3.5 rounded-xl bg-surface border border-border-subtle space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold text-brand-primary">
                    1. Manifest Horizon
                  </span>
                  <span className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary font-mono font-bold flex items-center justify-center text-[10px]">
                    {forecast.transitLayers.manifestHorizon.number}
                  </span>
                </div>
                <strong className="text-ink-primary block text-xs">
                  {forecast.transitLayers.manifestHorizon.title}
                </strong>
                <p className="text-ink-secondary text-[11px] leading-relaxed">
                  {forecast.transitLayers.manifestHorizon.description}
                </p>
              </div>

              {/* Layer 2: Evolutionary Crucible */}
              <div className="p-3.5 rounded-xl bg-surface border border-status-error/20 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold text-status-error">
                    2. Evolutionary Crucible
                  </span>
                  <span className="w-5 h-5 rounded-full bg-status-error/10 text-status-error font-mono font-bold flex items-center justify-center text-[10px]">
                    {forecast.transitLayers.evolutionaryCrucible.number}
                  </span>
                </div>
                <strong className="text-ink-primary block text-xs">
                  {forecast.transitLayers.evolutionaryCrucible.title}
                </strong>
                <p className="text-ink-secondary text-[11px] leading-relaxed">
                  {forecast.transitLayers.evolutionaryCrucible.description}
                </p>
              </div>

              {/* Layer 3: Sovereign Synthesis */}
              <div className="p-3.5 rounded-xl bg-surface border border-chart-core/30 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold text-chart-core">
                    3. Sovereign Synthesis
                  </span>
                  <span className="w-5 h-5 rounded-full bg-chart-core/10 text-chart-core font-mono font-bold flex items-center justify-center text-[10px]">
                    {forecast.transitLayers.sovereignSynthesis.number}
                  </span>
                </div>
                <strong className="text-ink-primary block text-xs">
                  {forecast.transitLayers.sovereignSynthesis.title}
                </strong>
                <p className="text-ink-secondary text-[11px] leading-relaxed">
                  {forecast.transitLayers.sovereignSynthesis.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Timeline / Age Cycle Component */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold">
                Lifecycle Progression
              </span>
              <h3 className="font-display text-2xl font-medium text-ink-primary">
                The 0–80 Year Perimeter Cycle
              </h3>
            </div>
            <Badge variant="default" size="sm">
              Current: {forecast.lifePhase.title} ({forecast.lifePhase.ageRange})
            </Badge>
          </div>

          {/* Timeline Visual Rail */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-ink-secondary pb-2">
              <span>Age 0 (Birth)</span>
              <span className="text-brand-primary font-bold">
                You are at Age {forecast.age} ({forecast.cycleProgress.percentComplete}% of current 10-yr segment)
              </span>
              <span>Age 80 (Cycle Completion)</span>
            </div>

            {/* Visual Rail with Progress */}
            <div className="relative w-full h-3 bg-surface-raised rounded-full overflow-hidden border border-border-subtle">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-primary via-chart-spirit to-brand-primary transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, Math.max(2, (forecast.age / 80) * 100))}%` }}
              />
            </div>

            {/* 9 Major Milestones (Horizontal Scrollable on Mobile) */}
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 pt-2">
              {forecast.milestones.map((m) => {
                const isCurrentSegment =
                  forecast.age >= m.age && forecast.age < m.age + 10;
                const isExact = forecast.age === m.age;
                const isSelected = selectedMilestoneAge === m.age;

                return (
                  <button
                    key={m.age}
                    onClick={() => setSelectedMilestoneAge(m.age)}
                    className={`p-2.5 rounded-xl border text-center transition-all duration-200 flex flex-col items-center gap-1 ${
                      isSelected
                        ? "border-brand-primary bg-brand-primary/10 shadow-sm"
                        : isCurrentSegment
                        ? "border-brand-primary/60 bg-surface-raised ring-1 ring-brand-primary/30"
                        : "border-border-subtle bg-canvas hover:border-border-strong hover:bg-surface-raised"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-ink-muted">
                      Age {m.age}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-surface border border-border-strong flex items-center justify-center font-mono font-bold text-xs text-ink-primary">
                      {m.value}
                    </span>
                    <span className="text-[9px] text-ink-secondary truncate max-w-full">
                      {m.label.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail Box for Selected / Active Milestone */}
            {(() => {
              const activeAge = selectedMilestoneAge !== null ? selectedMilestoneAge : Math.floor(forecast.age / 10) * 10;
              const milestone = forecast.milestones.find((m) => m.age === activeAge) || forecast.milestones[0];
              const mArcana = arcanaMeanings[milestone.value];

              return (
                <div className="p-4 sm:p-5 rounded-xl bg-surface-raised border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand-primary">
                        Milestone at Age {milestone.age}:
                      </span>
                      <span className="font-semibold text-ink-primary">
                        {milestone.label}
                      </span>
                      <Badge variant="brand" size="sm">
                        Arcana {milestone.value} ({mArcana?.name})
                      </Badge>
                    </div>
                    <p className="text-ink-secondary leading-relaxed max-w-2xl">
                      {milestone.meaning} {mArcana?.essence}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-[10px] font-mono text-ink-muted block uppercase">
                      Life Era
                    </span>
                    <span className="font-medium text-ink-primary">
                      {forecast.lifePhase.title}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* 4 Quarterly Energetic Phases */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold">
              Seasonal Breakdown
            </span>
            <h3 className="font-display text-2xl font-medium text-ink-primary">
              Four Quarters of {targetYear}
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Harmonize your initiatives with the natural quarterly rhythm of your personal year energy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {forecast.quarters.map((q) => {
              const qArcana = arcanaMeanings[q.energy];
              return (
                <div
                  key={q.quarter}
                  className="p-5 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-brand-primary">
                        Q{q.quarter}
                      </span>
                      <span className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary font-mono text-xs font-bold flex items-center justify-center">
                        {q.energy}
                      </span>
                    </div>
                    <h4 className="font-display text-base font-medium text-ink-primary">
                      {q.label}
                    </h4>
                    <span className="text-xs font-mono text-ink-muted block">
                      {q.months}
                    </span>
                    <p className="text-xs text-ink-secondary leading-relaxed pt-1">
                      {q.focus}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border-subtle text-[11px] text-ink-muted">
                    <span className="font-semibold text-ink-secondary block mb-0.5">Advice:</span>
                    <p className="leading-snug">{q.advice}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Annual Opportunities & Shadow Precautions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Opportunities */}
          <div className="p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-4">
            <div className="flex items-center gap-2.5 text-chart-talent">
              <CheckCircle2 className="w-5 h-5 text-status-success" />
              <h4 className="font-display text-lg font-medium text-ink-primary">
                Annual Catalysts & Opportunities
              </h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-ink-secondary">
              {forecast.yearlyAdvice.opportunities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shadow Traps */}
          <div className="p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-4">
            <div className="flex items-center gap-2.5 text-chart-karmic">
              <AlertTriangle className="w-5 h-5 text-chart-karmic" />
              <h4 className="font-display text-lg font-medium text-ink-primary">
                Potential Shadow Pitfalls to Avoid
              </h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-ink-secondary">
              {forecast.yearlyAdvice.shadowTraps.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-chart-karmic mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Harmonizing Daily Action */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface-raised space-y-3">
          <div className="flex items-center gap-2 text-brand-primary">
            <Compass className="w-5 h-5" />
            <h4 className="font-display text-lg font-medium text-ink-primary">
              Harmonizing Practice for {targetYear}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            {forecast.yearlyAdvice.harmonizingAction}
          </p>
        </div>

        {/* Natal Chart Reference */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
            <div>
              <h3 className="font-display text-xl font-medium text-ink-primary">
                Your Baseline Natal Octagram
              </h3>
              <p className="text-xs text-ink-secondary">
                The yearly forecast interacts with your fixed birth architecture.
              </p>
            </div>
            <Link href={`/chart/${birthDate}?name=${encodeURIComponent(userName)}`}>
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Full Natal Analysis
              </Button>
            </Link>
          </div>

          <div className="max-w-xl mx-auto">
            <DestinyChart matrix={matrix} />
          </div>
        </div>

        {/* Suite Link Banner */}
        <section className="p-8 rounded-3xl border border-border-subtle bg-surface text-center space-y-4">
          <h3 className="font-display text-xl sm:text-2xl font-medium text-ink-primary">
            Explore More Tools in the Suite
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary max-w-xl mx-auto">
            Check relationship synergy with a partner or evaluate your child&apos;s developmental
            energy matrix.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/compatibility">
              <Button variant="primary" size="sm">
                Relationship Compatibility
              </Button>
            </Link>
            <Link href="/child-matrix">
              <Button variant="outline" size="sm">
                Child Destiny Matrix
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

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Coins,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Briefcase,
  Lightbulb,
  CheckCircle2,
  Layers,
  DollarSign,
} from "lucide-react";
import { calculateDestinyMatrix } from "@/lib/matrix-engine";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DestinyChart } from "@/components/matrix-chart/DestinyChart";
import { ArcanaTarotCard } from "@/components/matrix-chart/ArcanaTarotCard";
import { MoneyChannelVisualizer } from "@/components/matrix-chart/MoneyChannelVisualizer";

export function MoneyCalculatorClient() {
  const [day, setDay] = useState<number>(24);
  const [month, setMonth] = useState<number>(8);
  const [year, setYear] = useState<number>(1995);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<"neutral" | "female" | "male">("neutral");
  const [calculated, setCalculated] = useState(true);
  const [visualMode, setVisualMode] = useState<"channel" | "octagram">("channel");

  const matrix = React.useMemo(() => {
    return calculateDestinyMatrix({ day, month, year });
  }, [day, month, year]);

  const dateSlug = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const moneyPoint = matrix.points.find((p) => p.id === "moneyEntrance") || { value: 15, label: "Money Entrance" };
  const materialPoint = matrix.points.find((p) => p.id === "socialRealization") || { value: 6, label: "Material Realization" };
  const junctionPoint = matrix.points.find((p) => p.id === "loveMoneyCenter") || { value: 12, label: "Heart Junction" };

  const moneyArcana = arcanaMeanings[moneyPoint.value] || arcanaMeanings[15];
  const materialArcana = arcanaMeanings[materialPoint.value] || arcanaMeanings[6];
  const junctionArcana = arcanaMeanings[junctionPoint.value] || arcanaMeanings[12];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculated(true);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Header & Hero */}
      <div className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <Badge variant="chart" chartZone="wealth" size="md" className="mx-auto">
            <Coins className="w-3.5 h-3.5 mr-1" />
            Financial Architecture & Career Realization
          </Badge>
          <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-ink-primary">
            Destiny Matrix Money Calculator
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl mx-auto">
            Decode the exact energetic frequencies governing your financial flow. Uncover your money entrance gate,
            subconscious wealth blockers, and high-leverage professional callings.
          </p>
        </div>

        {/* Split Hero Layout: Input Form + Sacred Esoteric Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Form (7 cols) */}
          <form
            onSubmit={handleCalculate}
            className="lg:col-span-7 p-6 sm:p-7 rounded-3xl border border-chart-wealth/30 bg-surface/95 shadow-card backdrop-blur-md space-y-5 text-left"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase text-chart-wealth tracking-wider">
                Birth Date Parameters
              </span>
              <p className="text-xs text-ink-muted">
                Calculates your Money Gate (Point C2), Heart Trust Junction, and Material Fruits.
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
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-wealth"
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
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-wealth"
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
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-wealth"
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
                  placeholder="e.g. Jordan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-wealth"
                />
              </div>
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-mono font-medium text-ink-muted uppercase mb-1">
                  Energy / Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-2.5 py-2 text-sm rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-wealth cursor-pointer"
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
              className="w-full bg-chart-wealth hover:bg-chart-wealth/90 text-ink-primary font-medium"
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Calculate {name.trim() ? `${name.trim()}'s` : "My"} Wealth Line
            </Button>
          </form>

          {/* Majestic Esoteric Artwork Card (5 cols) */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl border border-chart-wealth/40 shadow-2xl bg-surface/80">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/calculators/money-abundance.webp"
                alt="Destiny Matrix Sacred Wealth Flow and Abundance Portal"
                width={700}
                height={438}
                priority
                quality={80}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-4 space-y-1 bg-surface-raised/90 border-t border-chart-wealth/20">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-chart-wealth font-semibold flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Prosperity Alchemy
                </span>
                <span className="text-ink-muted">Cashflow Velocity</span>
              </div>
              <p className="text-xs text-ink-secondary leading-snug">
                Money Gate Valve • Anti-Trigger Traps • Material Realization
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results View */}
      {calculated && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-400">
          {/* Visual Showcase Section: Interactive Wealth Channel vs Octagram */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-chart-wealth tracking-wider block">
                  Interactive Visualizer
                </span>
                <h2 className="font-display text-2xl font-medium text-ink-primary">
                  Your Sacred Wealth Channel
                </h2>
              </div>

              {/* Toggle Visualizer Mode */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-raised border border-border-subtle self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setVisualMode("channel")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    visualMode === "channel"
                      ? "bg-chart-wealth text-ink-primary font-bold shadow-sm"
                      : "text-ink-secondary hover:text-ink-primary"
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  Wealth Channel Visual
                </button>
                <button
                  type="button"
                  onClick={() => setVisualMode("octagram")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    visualMode === "octagram"
                      ? "bg-chart-wealth text-ink-primary font-bold shadow-sm"
                      : "text-ink-secondary hover:text-ink-primary"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Full Natal Octagram
                </button>
              </div>
            </div>

            {visualMode === "channel" ? (
              <MoneyChannelVisualizer
                moneyEnergy={moneyPoint.value}
                materialEnergy={materialPoint.value}
                heartEnergy={junctionPoint.value}
                moneyName={moneyArcana.name}
                materialName={materialArcana.name}
                careerPath={moneyArcana.money.careerPath}
                antiTrigger={moneyArcana.money.potentialBlock}
              />
            ) : (
              <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card">
                <DestinyChart
                  matrix={matrix}
                  activeLens="wealth"
                  showLensControl={true}
                  interactive={true}
                />
              </div>
            )}
          </div>

          {/* Main Key Metrics Strip: Rich Arcana Tarot Cards */}
          <div className="space-y-4">
            <div className="px-1">
              <span className="text-xs font-mono font-semibold uppercase text-ink-muted tracking-wider block">
                Archetypal Blueprints
              </span>
              <h3 className="font-display text-2xl font-medium text-ink-primary">
                Your Primary Wealth Engines
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ArcanaTarotCard
                arcana={moneyArcana}
                roleLabel="Money Entrance Gate (Point C2)"
                tagline="Cashflow Catalyst & Professional Authority"
                accentColor="wealth"
                showFrequencyMeter={true}
              />

              <ArcanaTarotCard
                arcana={materialArcana}
                roleLabel="Material Fruits (Point C)"
                tagline="Worldly Assets & Social Realization"
                accentColor="core"
                showFrequencyMeter={true}
              />
            </div>
          </div>

          {/* Money Anti-Trigger Diagnostic */}
          <div className="p-6 sm:p-8 rounded-3xl border border-status-warning/30 bg-status-warning/5 space-y-4">
            <div className="flex items-center gap-2 text-status-warning">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-display text-xl font-medium text-ink-primary">
                Money Anti-Trigger & Subconscious Financial Sabotage
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              When your Money Gate Arcana ({moneyPoint.value} &mdash; {moneyArcana.name}) slips into shadow frequency,
              it subconsciously creates friction, delayed payments, or self-sabotage:
            </p>
            <div className="p-4 rounded-xl bg-surface border border-status-warning/20 text-xs sm:text-sm text-ink-primary">
              <strong>Subconscious Sabotage Pattern:</strong> {moneyArcana.money.potentialBlock}
            </div>
            <div className="p-4 rounded-xl bg-surface border border-border-subtle text-xs sm:text-sm text-ink-secondary">
              <strong>Transmutation Protocol:</strong> {moneyArcana.money.financialMindset}
            </div>
          </div>

          {/* Career Vocations Deep Dive */}
          <div className="p-6 sm:p-8 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <div className="flex items-center gap-2 text-brand-primary">
              <Briefcase className="w-5 h-5" />
              <h3 className="font-display text-xl font-medium text-ink-primary">
                High-Leverage Career Vocations for Arcana {moneyPoint.value} ({moneyArcana.name})
              </h3>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              {moneyArcana.money.careerPath}
            </p>

            <div className="pt-2">
              <span className="text-xs font-mono uppercase text-ink-muted block mb-2 font-semibold">
                Keywords & Natural Realization Arenas:
              </span>
              <div className="flex flex-wrap gap-2">
                {moneyArcana.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-surface-raised border border-border-strong text-xs font-medium text-ink-primary"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Wealth Affirmation */}
          <div className="p-6 rounded-2xl border border-chart-wealth/30 bg-gradient-to-r from-chart-wealth/10 via-surface to-chart-wealth/5 text-center space-y-2">
            <span className="text-xs font-mono uppercase text-chart-wealth font-semibold block">
              Your Daily Prosperity Affirmation
            </span>
            <blockquote className="font-display text-lg sm:text-xl italic text-ink-primary max-w-xl mx-auto">
              &ldquo;{moneyArcana.affirmation}&rdquo;
            </blockquote>
          </div>

          {/* Full Chart Promotion CTA */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-medium text-ink-primary">
                Discover your full 9-Pillar Destiny Matrix
              </h3>
              <p className="text-xs text-ink-secondary">
                See how your money line correlates with your Karmic Tail, 7-Chakra Health, and 0–80 Year-by-Year Transits.
              </p>
            </div>
            <Link
              href={`/chart/${dateSlug}${name.trim() || gender !== "neutral" ? `?${new URLSearchParams({ ...(name.trim() ? { name: name.trim() } : {}), ...(gender !== "neutral" ? { gender } : {}) }).toString()}` : ""}`}
              className="shrink-0"
            >
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Complete Natal Matrix ({dateSlug})
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

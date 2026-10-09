"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  Layers,
} from "lucide-react";
import { calculateDestinyMatrix } from "@/lib/matrix-engine";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DestinyChart } from "@/components/matrix-chart/DestinyChart";
import { ArcanaTarotCard, ROMAN_NUMERALS } from "@/components/matrix-chart/ArcanaTarotCard";
import { TalentTriadVisualizer } from "@/components/matrix-chart/TalentTriadVisualizer";

export function TalentCalculatorClient() {
  const [day, setDay] = useState<number>(7);
  const [month, setMonth] = useState<number>(7);
  const [year, setYear] = useState<number>(1997);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<"neutral" | "female" | "male">("neutral");
  const [calculated, setCalculated] = useState(true);
  const [chartViewMode, setChartViewMode] = useState<"triad" | "octagram">("triad");

  const matrix = React.useMemo(() => {
    return calculateDestinyMatrix({ day, month, year });
  }, [day, month, year]);

  const dateSlug = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const spiritPoint = matrix.points.find((p) => p.id === "spirit") || { value: 7, label: "Spiritual Gift" };
  const personaPoint = matrix.points.find((p) => p.id === "personality") || { value: 7, label: "Persona Gift" };
  const paternalPoint = matrix.points.find((p) => p.id === "ancestralPaternalSpirit") || { value: 14, label: "Paternal Gift" };
  const maternalPoint = matrix.points.find((p) => p.id === "ancestralMaternalSpirit") || { value: 14, label: "Maternal Gift" };

  const spiritArcana = arcanaMeanings[spiritPoint.value] || arcanaMeanings[7];
  const personaArcana = arcanaMeanings[personaPoint.value] || arcanaMeanings[7];
  const paternalArcana = arcanaMeanings[paternalPoint.value] || arcanaMeanings[14];
  const maternalArcana = arcanaMeanings[maternalPoint.value] || arcanaMeanings[14];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculated(true);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Header & Hero */}
      <div className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <Badge variant="chart" chartZone="spirit" size="md" className="mx-auto">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Innate Talents & Superpowers Engine
          </Badge>
          <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-ink-primary">
            Destiny Matrix Talent Calculator
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl mx-auto">
            Uncover the natural gifts, intuitive superpowers, and ancestral creative faculties encoded in your birth date.
            Learn how to commercialize your gifts into worldly authority.
          </p>
        </div>

        {/* Split Hero Layout: Input Form + Sacred Esoteric Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Form (7 cols) */}
          <form
            onSubmit={handleCalculate}
            className="lg:col-span-7 p-6 sm:p-7 rounded-3xl border border-chart-spirit/30 bg-surface/95 shadow-card backdrop-blur-md space-y-5 text-left"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase text-chart-spirit tracking-wider">
                Birth Date Parameters
              </span>
              <p className="text-xs text-ink-muted">
                Calculates your Spirit Point (Month), Persona Point (Day), and Lineage Cross.
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
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-spirit"
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
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-spirit"
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
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-spirit"
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
                  placeholder="e.g. Alex"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-spirit"
                />
              </div>
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-mono font-medium text-ink-muted uppercase mb-1">
                  Energy / Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-2.5 py-2 text-sm rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-spirit cursor-pointer"
                >
                  <option value="neutral">Neutral / Unified</option>
                  <option value="female">Female (Yin)</option>
                  <option value="male">Male (Yang)</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full bg-chart-spirit hover:bg-chart-spirit/90 text-white font-medium"
              leftIcon={<Zap className="w-4 h-4" />}
            >
              Reveal {name.trim() ? `${name.trim()}'s` : "My"} Talents & Superpowers
            </Button>
          </form>

          {/* Majestic Esoteric Artwork Card (5 cols) */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl border border-chart-spirit/40 shadow-2xl bg-surface/80">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/calculators/talent-superpowers.webp"
                alt="Destiny Matrix Talent and Intuitive Superpowers Awakening"
                width={700}
                height={438}
                priority
                quality={80}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-4 space-y-1 bg-surface-raised/90 border-t border-chart-spirit/20">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-chart-spirit font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Sacred Potential Matrix
                </span>
                <span className="text-ink-muted">3-Tier Superpowers</span>
              </div>
              <p className="text-xs text-ink-secondary leading-snug">
                Spirit Intuition • Persona Leadership • Lineage Tenacity
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results View */}
      {calculated && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-400">
          {/* Visual Showcase Section: Interactive Triad vs Octagram */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-chart-spirit tracking-wider block">
                  Interactive Visualizer
                </span>
                <h2 className="font-display text-2xl font-medium text-ink-primary">
                  Your Energetic Talent Architecture
                </h2>
              </div>

              {/* Toggle Visualizer Mode */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-raised border border-border-subtle self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setChartViewMode("triad")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    chartViewMode === "triad"
                      ? "bg-chart-spirit text-white shadow-sm"
                      : "text-ink-secondary hover:text-ink-primary"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Sacred Triad Visual
                </button>
                <button
                  type="button"
                  onClick={() => setChartViewMode("octagram")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    chartViewMode === "octagram"
                      ? "bg-chart-spirit text-white shadow-sm"
                      : "text-ink-secondary hover:text-ink-primary"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Full Natal Octagram
                </button>
              </div>
            </div>

            {chartViewMode === "triad" ? (
              <TalentTriadVisualizer
                spiritEnergy={spiritPoint.value}
                personaEnergy={personaPoint.value}
                paternalEnergy={paternalPoint.value}
                maternalEnergy={maternalPoint.value}
                spiritName={spiritArcana.name}
                personaName={personaArcana.name}
              />
            ) : (
              <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card">
                <DestinyChart
                  matrix={matrix}
                  activeLens="talents"
                  showLensControl={true}
                  interactive={true}
                />
              </div>
            )}
          </div>

          {/* Main Talent Pillars Grid: Rich Arcana Tarot Cards */}
          <div className="space-y-4">
            <div className="px-1">
              <span className="text-xs font-mono font-semibold uppercase text-ink-muted tracking-wider block">
                Archetypal Blueprints
              </span>
              <h3 className="font-display text-2xl font-medium text-ink-primary">
                Your Primary Superpowers & Expressions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Spiritual & Intuitive Gift */}
              <ArcanaTarotCard
                arcana={spiritArcana}
                roleLabel="Primary Superpower (Point B)"
                tagline="Intuitive Channel & Higher Wisdom"
                accentColor="spirit"
                showFrequencyMeter={true}
              />

              {/* 2. Communicative & Persona Gift */}
              <ArcanaTarotCard
                arcana={personaArcana}
                roleLabel="Active Manifestation (Point A)"
                tagline="Worldly Charisma & Authority"
                accentColor="core"
                showFrequencyMeter={true}
              />
            </div>
          </div>

          {/* Ancestral Inherited Talents Strip */}
          <div className="p-6 sm:p-8 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-6">
            <div className="flex items-center gap-2 text-chart-wealth">
              <Award className="w-5 h-5" />
              <h3 className="font-display text-xl font-medium text-ink-primary">
                Ancestral Inherited Lineage Gifts
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              In the Destiny Matrix, your biological lines pass down specific spiritual and mental faculties.
              These energies operate as dormant generational assets waiting to be commercialized.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              {/* Paternal Lineage Gift */}
              <div className="p-5 rounded-2xl border border-chart-spirit/25 bg-surface-raised space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase text-chart-spirit tracking-wider">
                    Paternal Line (Point F)
                  </span>
                  <span className="text-xs font-serif font-bold px-2 py-0.5 rounded bg-surface border border-border-subtle text-chart-spirit">
                    Arcana {ROMAN_NUMERALS[paternalPoint.value] || paternalPoint.value}
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-lg font-medium text-ink-primary">
                    {paternalArcana.name} &mdash; {paternalArcana.archetype}
                  </h4>
                  <p className="text-xs text-ink-secondary mt-1 leading-relaxed">
                    Moral worldview, strategic resilience, and willpower passed down from the father&apos;s clan.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-chart-spirit/10 border border-chart-spirit/15 text-xs text-ink-primary">
                  <strong>Inherited Strength:</strong> {paternalArcana.keywords.slice(0, 3).join(", ")}
                </div>
              </div>

              {/* Maternal Lineage Gift */}
              <div className="p-5 rounded-2xl border border-chart-love/25 bg-surface-raised space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase text-chart-love tracking-wider">
                    Maternal Line (Point G)
                  </span>
                  <span className="text-xs font-serif font-bold px-2 py-0.5 rounded bg-surface border border-border-subtle text-chart-love">
                    Arcana {ROMAN_NUMERALS[maternalPoint.value] || maternalPoint.value}
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-lg font-medium text-ink-primary">
                    {maternalArcana.name} &mdash; {maternalArcana.archetype}
                  </h4>
                  <p className="text-xs text-ink-secondary mt-1 leading-relaxed">
                    Intuitive sensitivity, relational empathy, and creative aesthetic inherited from the mother&apos;s clan.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-chart-love/10 border border-chart-love/15 text-xs text-ink-primary">
                  <strong>Inherited Strength:</strong> {maternalArcana.keywords.slice(0, 3).join(", ")}
                </div>
              </div>
            </div>
          </div>

          {/* Commercialization Blueprint */}
          <div className="p-6 sm:p-8 rounded-3xl border border-border-subtle bg-surface shadow-card space-y-4">
            <div className="flex items-center gap-2 text-status-success">
              <Flame className="w-5 h-5" />
              <h3 className="font-display text-xl font-medium text-ink-primary">
                How to Commercialize Your Talents Without Burnout
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-ink-secondary">
              <div className="p-4 rounded-xl border border-border-subtle bg-surface-raised space-y-1.5">
                <strong className="text-ink-primary block font-semibold">1. Stop Undercharging</strong>
                <p>
                  Because Energy {spiritPoint.value} comes effortlessly to you, you assume everyone can do it. Recognize this as rare specialized genius.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border-subtle bg-surface-raised space-y-1.5">
                <strong className="text-ink-primary block font-semibold">2. Build Scalable Systems</strong>
                <p>
                  Anchor your gifts in documented methodologies so you are not trading physical hours for income.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border-subtle bg-surface-raised space-y-1.5">
                <strong className="text-ink-primary block font-semibold">3. Transmute Shadow Imposter</strong>
                <p>
                  When doubt strikes, repeat: &ldquo;{spiritArcana.affirmation}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* CTA Full Matrix */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-chart-spirit/10 via-surface to-brand-primary/10 border border-chart-spirit/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-medium text-ink-primary">
                See How Your Talents Empower Your Whole Destiny Matrix
              </h3>
              <p className="text-xs text-ink-secondary">
                View your complete Octagram with 0–80 Age Cycle Transits, 7-Chakra Health, and Love/Money Gates.
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

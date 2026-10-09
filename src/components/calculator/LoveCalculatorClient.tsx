"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  ArrowRight,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Users,
  Layers,
} from "lucide-react";
import { calculateDestinyMatrix } from "@/lib/matrix-engine";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DestinyChart } from "@/components/matrix-chart/DestinyChart";
import { ArcanaTarotCard } from "@/components/matrix-chart/ArcanaTarotCard";
import { LoveChannelVisualizer } from "@/components/matrix-chart/LoveChannelVisualizer";

// Curated meeting environmental resonances by Arcana 1-22
const MEETING_ENVIRONMENTS: Record<number, string> = {
  1: "Pioneering workshops, tech hackathons, startup hubs, or creative brainstorm events.",
  2: "Nature sanctuaries, wellness retreats, psychology seminars, or by water bodies.",
  3: "Art exhibitions, upscale design gatherings, garden parties, or luxury hospitality venues.",
  4: "Corporate summits, architecture or construction venues, finance meetings, or executive clubs.",
  5: "Universities, philosophical lectures, traditional ceremonies, libraries, or masterclasses.",
  6: "Beauty salons, fashion galas, aesthetic cafes, networking dinners, or matchmaking circles.",
  7: "Road trips, airports, fitness races, athletic tournaments, or high-speed commute hubs.",
  8: "Legal institutions, notary offices, contracts negotiation, or justice advocacy forums.",
  9: "Silent meditation retreats, ancient libraries, solo hiking trails, or academic archives.",
  10: "Spontaneous coincidences: missed flights, festival crowds, winning lotteries, or unexpected detours.",
  11: "Fitness centers, high-energy gyms, athletic bootcamps, or endurance challenge events.",
  12: "Volunteering initiatives, humanitarian projects, yoga studios, or alternative healing clinics.",
  13: "Life transformation workshops, major career transitions, hospital recovery, or crisis cleanups.",
  14: "Culinary cooking courses, tea ceremonies, watercolor studios, or tranquil spas.",
  15: "Vibrant nightlife, exclusive VIP lounges, high-stakes investments, or charismatic parties.",
  16: "Renovation sites, architectural marvels, sudden life shakeups, or spiritual rebuilding circles.",
  17: "Concert halls, stage performances, photography shoots, or creative talent showcases.",
  18: "Occult bookstores, evening twilight walks, moonlit gatherings, or dream-work circles.",
  19: "Sunny outdoor parks, children's celebrations, public festivals, or motivational conferences.",
  20: "Family reunions, ancestral heritage sites, genealogy archives, or court reconciliations.",
  21: "International airports, overseas travel, diplomatic summits, or multinational web communities.",
  22: "Backpacking hostels, spontaneous road journeys, comedy clubs, or radical freedom gatherings.",
};

export function LoveCalculatorClient() {
  const [day, setDay] = useState<number>(14);
  const [month, setMonth] = useState<number>(2);
  const [year, setYear] = useState<number>(1994);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<"neutral" | "female" | "male">("female");
  const [calculated, setCalculated] = useState(true);
  const [visualMode, setVisualMode] = useState<"channel" | "octagram">("channel");

  const matrix = React.useMemo(() => {
    return calculateDestinyMatrix({ day, month, year });
  }, [day, month, year]);

  const dateSlug = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const lovePoint = matrix.points.find((p) => p.id === "loveEntrance") || { value: 6, label: "Love Entrance" };
  const heartPoint = matrix.points.find((p) => p.id === "loveMoneyCenter") || { value: 12, label: "Heart Junction" };
  const comfortPoint = matrix.points.find((p) => p.id === "comfortZone") || { value: 10, label: "Soul Comfort Zone" };

  const loveArcana = arcanaMeanings[lovePoint.value] || arcanaMeanings[6];
  const heartArcana = arcanaMeanings[heartPoint.value] || arcanaMeanings[12];
  const meetingLocation = MEETING_ENVIRONMENTS[lovePoint.value] || "Educational retreats, collaborative conferences, or spontaneous travel.";

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculated(true);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Header & Hero */}
      <div className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <Badge variant="chart" chartZone="love" size="md" className="mx-auto">
            <Heart className="w-3.5 h-3.5 mr-1" />
            Soulmate Archetype & Encounter Gates
          </Badge>
          <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-ink-primary">
            Destiny Matrix Love Calculator
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl mx-auto">
            Enter your birth date to uncover your exact Love Entrance Gate. Discover your ideal partner&apos;s
            temperament, natural encounter locations, and the emotional habits that unlock lifelong devotion.
          </p>
        </div>

        {/* Split Hero Layout: Input Form + Sacred Esoteric Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Form (7 cols) */}
          <form
            onSubmit={handleCalculate}
            className="lg:col-span-7 p-6 sm:p-7 rounded-3xl border border-chart-love/30 bg-surface/95 shadow-card backdrop-blur-md space-y-5 text-left"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase text-chart-love tracking-wider">
                Birth Date Parameters
              </span>
              <p className="text-xs text-ink-muted">
                Calculates your Love Gate (Point C1), Anahata Heart Center, and Soulmate Archetype.
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
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-love"
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
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-love"
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
                  className="w-full px-3 py-2 text-base font-mono rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-love"
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
                  placeholder="e.g. Elena"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-love"
                />
              </div>
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-mono font-medium text-ink-muted uppercase mb-1">
                  Energy / Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-2.5 py-2 text-sm rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-chart-love cursor-pointer"
                >
                  <option value="female">Female (Yin)</option>
                  <option value="male">Male (Yang)</option>
                  <option value="neutral">Neutral / Non-binary</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full bg-chart-love hover:bg-chart-love/90 text-white font-medium"
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Calculate {name.trim() ? `${name.trim()}'s` : "My"} Love Line
            </Button>
          </form>

          {/* Majestic Esoteric Artwork Card (5 cols) */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl border border-chart-love/40 shadow-2xl bg-surface/80">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/calculators/love-union.webp"
                alt="Destiny Matrix Sacred Love Union and Soulmate Resonance"
                width={700}
                height={438}
                priority
                quality={80}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-4 space-y-1 bg-surface-raised/90 border-t border-chart-love/20">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-chart-love font-semibold flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  Sacred Heart Architecture
                </span>
                <span className="text-ink-muted">Anahata Alignment</span>
              </div>
              <p className="text-xs text-ink-secondary leading-snug">
                Love Gate Attraction • Trust Conduit • Encounter Geometry
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {calculated && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-400">
          {/* Visual Showcase Section: Interactive Channel vs Octagram */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-chart-love tracking-wider block">
                  Interactive Visualizer
                </span>
                <h2 className="font-display text-2xl font-medium text-ink-primary">
                  Your Sacred Romantic Channel
                </h2>
              </div>

              {/* Toggle Visualizer Mode */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-raised border border-border-subtle self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setVisualMode("channel")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    visualMode === "channel"
                      ? "bg-chart-love text-white shadow-sm"
                      : "text-ink-secondary hover:text-ink-primary"
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  Love Channel Visual
                </button>
                <button
                  type="button"
                  onClick={() => setVisualMode("octagram")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    visualMode === "octagram"
                      ? "bg-chart-love text-white shadow-sm"
                      : "text-ink-secondary hover:text-ink-primary"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Full Natal Octagram
                </button>
              </div>
            </div>

            {visualMode === "channel" ? (
              <LoveChannelVisualizer
                loveEnergy={lovePoint.value}
                heartEnergy={heartPoint.value}
                comfortEnergy={comfortPoint.value}
                loveName={loveArcana.name}
                heartName={heartArcana.name}
                meetingLocation={meetingLocation}
              />
            ) : (
              <div className="p-6 rounded-3xl border border-border-subtle bg-surface shadow-card">
                <DestinyChart
                  matrix={matrix}
                  activeLens="love"
                  showLensControl={true}
                  interactive={true}
                />
              </div>
            )}
          </div>

          {/* Main Key Highlights: Rich Tarot Cards */}
          <div className="space-y-4">
            <div className="px-1">
              <span className="text-xs font-mono font-semibold uppercase text-ink-muted tracking-wider block">
                Archetypal Resonance
              </span>
              <h3 className="font-display text-2xl font-medium text-ink-primary">
                Your Primary Romantic Gateways
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ArcanaTarotCard
                arcana={loveArcana}
                roleLabel="Love Entrance Gate (Point C1)"
                tagline="Ideal Partner Archetype & Attraction"
                accentColor="love"
                showFrequencyMeter={true}
              />

              <ArcanaTarotCard
                arcana={heartArcana}
                roleLabel="Anahata Heart Center (Point E2)"
                tagline="Emotional Vulnerability & Balance"
                accentColor="core"
                showFrequencyMeter={true}
              />
            </div>
          </div>

          {/* Deep Ideal Partner Profile */}
          <div className="p-6 sm:p-8 rounded-3xl border border-chart-love/30 bg-surface shadow-elevation-mid space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-chart-love font-semibold">
                Soulmate Architecture
              </span>
              <h3 className="font-display text-2xl font-medium text-ink-primary">
                Ideal Partner Archetype &mdash; Energy {lovePoint.value} ({loveArcana.name})
              </h3>
            </div>

            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-sans">
              {loveArcana.relationships.partnerProfile}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="p-5 rounded-2xl border border-border-subtle bg-surface-raised space-y-2">
                <div className="flex items-center gap-2 text-brand-primary">
                  <ShieldCheck className="w-4 h-4" />
                  <strong className="text-xs font-mono uppercase font-semibold text-ink-primary">
                    Core Relationship Dynamic
                  </strong>
                </div>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {loveArcana.relationships.dynamics}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border-subtle bg-surface-raised space-y-2">
                <div className="flex items-center gap-2 text-chart-love">
                  <MapPin className="w-4 h-4" />
                  <strong className="text-xs font-mono uppercase font-semibold text-ink-primary">
                    Natural Encounter Circumstances
                  </strong>
                </div>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {meetingLocation}
                </p>
              </div>
            </div>

            {/* Growth Area & Stalling Habit */}
            <div className="p-5 rounded-2xl border border-status-warning/25 bg-status-warning/5 space-y-2">
              <div className="flex items-center gap-2 text-status-warning">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-mono uppercase font-semibold block">
                  Subconscious Stalling Habit to Avoid
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {loveArcana.relationships.growthArea}
              </p>
            </div>
          </div>

          {/* Test Compatibility CTA */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-chart-love/15 via-surface to-brand-primary/10 border border-chart-love/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-chart-love">
                <Users className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase">Ready to test with a partner?</span>
              </div>
              <h3 className="font-display text-lg font-medium text-ink-primary">
                Explore Couple Compatibility with 4-Pillar Scorecard
              </h3>
              <p className="text-xs text-ink-secondary">
                Combine your chart with your partner&apos;s birthdate to reveal shared karma, green flags, and composite love gates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <Link href={`/chart/${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}${name.trim() || gender !== "neutral" ? `?${new URLSearchParams({ ...(name.trim() ? { name: name.trim() } : {}), ...(gender !== "neutral" ? { gender } : {}) }).toString()}` : ""}`}>
                <Button variant="outline" size="md">
                  View Full Natal Chart
                </Button>
              </Link>
              <Link href="/compatibility">
                <Button variant="primary" size="md" className="bg-chart-love hover:bg-chart-love/90 text-white" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Calculate Couple Compatibility
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

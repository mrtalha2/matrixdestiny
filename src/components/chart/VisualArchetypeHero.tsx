"use client";

import React from "react";
import { Sparkles, Compass, Heart, Coins, Flame, Wind, Droplets, Mountain, ShieldAlert } from "lucide-react";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { MatrixPoint } from "@/lib/matrix-engine";

interface VisualArchetypeHeroProps {
  centerPoint: MatrixPoint;
  dayPoint: MatrixPoint;
  karmicRoot: MatrixPoint;
  lovePoint: MatrixPoint;
  moneyPoint: MatrixPoint;
  formattedDate: string;
  userName?: string | null;
}

const ROMAN_NUMERALS: Record<number, string> = {
  1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X",
  11: "XI", 12: "XII", 13: "XIII", 14: "XIV", 15: "XV", 16: "XVI", 17: "XVII", 18: "XVIII",
  19: "XIX", 20: "XX", 21: "XXI", 22: "XXII",
};

// Elemental associations for the 22 Arcana
const ARCANA_ELEMENTS: Record<number, { element: "Fire" | "Water" | "Air" | "Earth"; icon: typeof Flame }> = {
  1: { element: "Air", icon: Wind },
  2: { element: "Water", icon: Droplets },
  3: { element: "Earth", icon: Mountain },
  4: { element: "Fire", icon: Flame },
  5: { element: "Earth", icon: Mountain },
  6: { element: "Air", icon: Wind },
  7: { element: "Water", icon: Droplets },
  8: { element: "Air", icon: Wind },
  9: { element: "Earth", icon: Mountain },
  10: { element: "Fire", icon: Flame },
  11: { element: "Fire", icon: Flame },
  12: { element: "Water", icon: Droplets },
  13: { element: "Water", icon: Droplets },
  14: { element: "Fire", icon: Flame },
  15: { element: "Earth", icon: Mountain },
  16: { element: "Fire", icon: Flame },
  17: { element: "Air", icon: Wind },
  18: { element: "Water", icon: Droplets },
  19: { element: "Fire", icon: Flame },
  20: { element: "Fire", icon: Flame },
  21: { element: "Air", icon: Wind },
  22: { element: "Air", icon: Wind },
};

export function VisualArchetypeHero({
  centerPoint,
  dayPoint,
  karmicRoot,
  lovePoint,
  moneyPoint,
  formattedDate,
  userName,
}: VisualArchetypeHeroProps) {
  const centerArcana = arcanaMeanings[centerPoint.value] || arcanaMeanings[1];
  const dayArcana = arcanaMeanings[dayPoint.value] || arcanaMeanings[1];
  const karmicArcana = arcanaMeanings[karmicRoot.value] || arcanaMeanings[1];
  const loveArcana = arcanaMeanings[lovePoint.value] || arcanaMeanings[1];
  const moneyArcana = arcanaMeanings[moneyPoint.value] || arcanaMeanings[1];

  const centerElement = ARCANA_ELEMENTS[centerPoint.value] || { element: "Fire", icon: Flame };
  const ElementIcon = centerElement.icon;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-gradient-to-b from-surface via-surface-raised/40 to-surface p-6 sm:p-8 lg:p-10 shadow-elevation-mid">
      {/* Radiant Background Glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-chart-wealth/10 blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-border-subtle/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[11px] font-mono font-semibold uppercase tracking-wider text-brand-primary">
              <Sparkles className="w-3 h-3 animate-pulse" />
              Sovereign Energetic Profile
            </span>
            <span className="text-xs font-mono text-ink-muted">
              • {formattedDate}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-ink-primary tracking-tight">
            {userName ? `${userName}’s Archetypal Constellation` : "Your Archetypal Constellation"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-surface border border-border-strong text-ink-secondary">
            Major Arcana System
          </span>
        </div>
      </div>

      {/* Featured Primary Archetype Showcase */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Large Visual Tarot Archetype Emblem Card */}
        <div className="lg:col-span-5 relative group">
          <div className="relative overflow-hidden rounded-2xl border-2 border-brand-primary/40 bg-gradient-to-br from-brand-primary/10 via-surface to-brand-primary/5 p-6 sm:p-7 shadow-elevation-high text-center">
            {/* Top Ornamental Details */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-ink-muted pb-3 border-b border-border-subtle/60">
              <span>Arcana {ROMAN_NUMERALS[centerPoint.value] || centerPoint.value}</span>
              <span className="flex items-center gap-1 text-brand-primary font-semibold">
                <ElementIcon className="w-3.5 h-3.5" />
                {centerElement.element} Realm
              </span>
            </div>

            {/* Radiant Center Emblem */}
            <div className="my-6 relative flex items-center justify-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-brand-primary/25 via-chart-wealth/20 to-transparent flex items-center justify-center border-2 border-brand-primary/50 shadow-[0_0_24px_rgba(194,94,62,0.35)] group-hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface flex flex-col items-center justify-center border border-brand-primary/40">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-brand-primary">
                    {centerPoint.value}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
                    Core Soul
                  </span>
                </div>
              </div>
            </div>

            {/* Archetype Title */}
            <h3 className="text-xl sm:text-2xl font-display font-medium text-ink-primary">
              {centerArcana.name}
            </h3>
            <p className="text-xs text-brand-primary font-mono tracking-wide uppercase mt-1">
              Central Comfort Zone & Soul Sanctum
            </p>

            <p className="text-xs text-ink-secondary leading-relaxed mt-3 pt-3 border-t border-border-subtle/60 font-sans">
              {centerArcana.essence}
            </p>
          </div>
        </div>

        {/* Right: 4 Secondary Key Pillars Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Personality / Day of Birth */}
          <div className="rounded-2xl border border-border-subtle bg-surface p-4 sm:p-5 hover:border-chart-core/50 transition-colors shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-chart-core flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Social Persona
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-chart-core/10 text-chart-core font-bold">
                Arcana {dayPoint.value}
              </span>
            </div>
            <h4 className="text-base font-display font-medium text-ink-primary">
              {dayArcana.name}
            </h4>
            <p className="text-xs text-ink-secondary leading-relaxed mt-1 line-clamp-2">
              {dayArcana.personality.portrait}
            </p>
          </div>

          {/* 2. Karmic Tail Root */}
          <div className="rounded-2xl border border-border-subtle bg-surface p-4 sm:p-5 hover:border-chart-karmic/50 transition-colors shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-chart-karmic flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Karmic Task
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-chart-karmic/10 text-chart-karmic font-bold">
                Arcana {karmicRoot.value}
              </span>
            </div>
            <h4 className="text-base font-display font-medium text-ink-primary">
              {karmicArcana.name}
            </h4>
            <p className="text-xs text-ink-secondary leading-relaxed mt-1 line-clamp-2">
              Past-life karmic knot requiring conscious neutralization and shadow work.
            </p>
          </div>

          {/* 3. Romantic Synergy / Love Entrance */}
          <div className="rounded-2xl border border-border-subtle bg-surface p-4 sm:p-5 hover:border-chart-love/50 transition-colors shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-chart-love flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                Love & Union
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-chart-love/10 text-chart-love font-bold">
                Arcana {lovePoint.value}
              </span>
            </div>
            <h4 className="text-base font-display font-medium text-ink-primary">
              {loveArcana.name}
            </h4>
            <p className="text-xs text-ink-secondary leading-relaxed mt-1 line-clamp-2">
              {loveArcana.relationships.partnerProfile}
            </p>
          </div>

          {/* 4. Financial Catalyst / Wealth Channel */}
          <div className="rounded-2xl border border-border-subtle bg-surface p-4 sm:p-5 hover:border-chart-wealth/50 transition-colors shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-chart-wealth flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                Wealth Catalyst
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-chart-wealth/10 text-chart-wealth font-bold">
                Arcana {moneyPoint.value}
              </span>
            </div>
            <h4 className="text-base font-display font-medium text-ink-primary">
              {moneyArcana.name}
            </h4>
            <p className="text-xs text-ink-secondary leading-relaxed mt-1 line-clamp-2">
              {moneyArcana.money.financialMindset}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

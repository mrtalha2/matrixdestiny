"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Shield, ArrowUpRight, Flame, Compass } from "lucide-react";
import { ArcanaMeaning } from "@/content/arcana-meanings";

export const ROMAN_NUMERALS: Record<number, string> = {
  1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X",
  11: "XI", 12: "XII", 13: "XIII", 14: "XIV", 15: "XV", 16: "XVI", 17: "XVII", 18: "XVIII", 19: "XIX", 20: "XX",
  21: "XXI", 22: "XXII"
};

export const ARCANA_ELEMENTS: Record<number, { element: string; icon: string; color: string; gradient: string }> = {
  1: { element: "Air / Mind", icon: "💨", color: "text-amber-400", gradient: "from-amber-500/20 via-orange-500/10 to-transparent" },
  2: { element: "Water / Intuition", icon: "💧", color: "text-blue-400", gradient: "from-blue-500/20 via-cyan-500/10 to-transparent" },
  3: { element: "Earth / Fertility", icon: "🌍", color: "text-emerald-400", gradient: "from-emerald-500/20 via-teal-500/10 to-transparent" },
  4: { element: "Fire / Authority", icon: "🔥", color: "text-red-400", gradient: "from-red-500/20 via-orange-500/10 to-transparent" },
  5: { element: "Earth / Tradition", icon: "🌍", color: "text-amber-300", gradient: "from-amber-600/20 via-yellow-500/10 to-transparent" },
  6: { element: "Air / Harmony", icon: "💨", color: "text-pink-400", gradient: "from-pink-500/20 via-rose-500/10 to-transparent" },
  7: { element: "Water / Momentum", icon: "💧", color: "text-cyan-400", gradient: "from-cyan-500/20 via-blue-500/10 to-transparent" },
  8: { element: "Air / Justice", icon: "💨", color: "text-indigo-400", gradient: "from-indigo-500/20 via-purple-500/10 to-transparent" },
  9: { element: "Earth / Wisdom", icon: "🌍", color: "text-teal-400", gradient: "from-teal-500/20 via-emerald-500/10 to-transparent" },
  10: { element: "Fire / Luck", icon: "🔥", color: "text-amber-400", gradient: "from-amber-500/20 via-yellow-500/10 to-transparent" },
  11: { element: "Fire / Vitality", icon: "🔥", color: "text-orange-400", gradient: "from-orange-500/20 via-red-500/10 to-transparent" },
  12: { element: "Water / Service", icon: "💧", color: "text-sky-400", gradient: "from-sky-500/20 via-indigo-500/10 to-transparent" },
  13: { element: "Water / Rebirth", icon: "💧", color: "text-purple-400", gradient: "from-purple-600/20 via-indigo-500/10 to-transparent" },
  14: { element: "Fire / Alchemy", icon: "🔥", color: "text-cyan-400", gradient: "from-cyan-500/20 via-teal-500/10 to-transparent" },
  15: { element: "Earth / Magnetism", icon: "🌍", color: "text-rose-400", gradient: "from-rose-600/20 via-purple-500/10 to-transparent" },
  16: { element: "Fire / Awakening", icon: "🔥", color: "text-red-500", gradient: "from-red-600/20 via-amber-500/10 to-transparent" },
  17: { element: "Air / Inspiration", icon: "💨", color: "text-blue-300", gradient: "from-blue-400/20 via-indigo-500/10 to-transparent" },
  18: { element: "Water / Subconscious", icon: "💧", color: "text-violet-400", gradient: "from-violet-500/20 via-purple-500/10 to-transparent" },
  19: { element: "Fire / Radiance", icon: "🔥", color: "text-yellow-400", gradient: "from-yellow-500/20 via-orange-500/10 to-transparent" },
  20: { element: "Fire / Awakening", icon: "🔥", color: "text-purple-400", gradient: "from-purple-500/20 via-blue-500/10 to-transparent" },
  21: { element: "Earth / Expansion", icon: "🌍", color: "text-emerald-300", gradient: "from-emerald-400/20 via-cyan-500/10 to-transparent" },
  22: { element: "Air / Liberation", icon: "💨", color: "text-pink-300", gradient: "from-pink-400/20 via-purple-500/10 to-transparent" },
};

interface ArcanaTarotCardProps {
  arcana: ArcanaMeaning;
  tagline?: string;
  roleLabel?: string;
  accentColor?: "spirit" | "love" | "wealth" | "karma" | "core";
  showFrequencyMeter?: boolean;
  className?: string;
}

export function ArcanaTarotCard({
  arcana,
  tagline,
  roleLabel,
  accentColor = "spirit",
  showFrequencyMeter = true,
  className = "",
}: ArcanaTarotCardProps) {
  const roman = ROMAN_NUMERALS[arcana.number] || String(arcana.number);
  const elementInfo = ARCANA_ELEMENTS[arcana.number] || {
    element: "Cosmic",
    icon: "✨",
    color: "text-amber-400",
    gradient: "from-brand-primary/20 via-surface to-transparent",
  };

  const accentBorderMap = {
    spirit: "border-chart-spirit/40 hover:border-chart-spirit/70 shadow-chart-spirit/10",
    love: "border-chart-love/40 hover:border-chart-love/70 shadow-chart-love/10",
    wealth: "border-chart-wealth/40 hover:border-chart-wealth/70 shadow-chart-wealth/10",
    karma: "border-chart-karma/40 hover:border-chart-karma/70 shadow-chart-karma/10",
    core: "border-brand-primary/40 hover:border-brand-primary/70 shadow-brand-primary/10",
  };

  const accentTextMap = {
    spirit: "text-chart-spirit",
    love: "text-chart-love",
    wealth: "text-chart-wealth",
    karma: "text-chart-karma",
    core: "text-brand-primary",
  };

  const accentBadgeBgMap = {
    spirit: "bg-chart-spirit/15 text-chart-spirit border-chart-spirit/30",
    love: "bg-chart-love/15 text-chart-love border-chart-love/30",
    wealth: "bg-chart-wealth/15 text-chart-wealth border-chart-wealth/30",
    karma: "bg-chart-karma/15 text-chart-karma border-chart-karma/30",
    core: "bg-brand-primary/15 text-brand-primary border-brand-primary/30",
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border ${accentBorderMap[accentColor]} bg-surface/95 backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}
    >
      {/* Background Sacred Geometric Aura */}
      <div className={`absolute -top-24 -right-24 w-56 h-56 rounded-full bg-gradient-to-br ${elementInfo.gradient} blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Decorative Corner Filigree Glyphs */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-ink-muted/30 select-none">✦</div>
      <div className="absolute top-3 right-3 text-[10px] font-mono text-ink-muted/30 select-none">✦</div>
      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-ink-muted/30 select-none">✦</div>
      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-ink-muted/30 select-none">✦</div>

      <div className="relative space-y-4">
        {/* Top Header Badge Strip */}
        <div className="flex items-center justify-between gap-2">
          {roleLabel ? (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider border ${accentBadgeBgMap[accentColor]}`}>
              <Sparkles className="w-3 h-3" />
              {roleLabel}
            </span>
          ) : (
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted flex items-center gap-1">
              <span>{elementInfo.icon}</span>
              {elementInfo.element}
            </span>
          )}

          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs text-ink-muted font-bold tracking-wider">
              ARCANA
            </span>
            <span className={`font-serif text-lg sm:text-xl font-bold px-2.5 py-0.5 rounded-lg bg-surface-raised border border-border-subtle ${accentTextMap[accentColor]}`}>
              {roman}
            </span>
          </div>
        </div>

        {/* Arcana Title & Archetype Seal */}
        <div className="flex items-start justify-between gap-3 pt-1">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary">
              {arcana.name}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-ink-secondary mt-0.5">
              {tagline || arcana.archetype}
            </p>
          </div>

          {/* Sacred Geometry Mandala Seal */}
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-surface-raised border border-border-strong flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 40 40" className="w-8 h-8 text-ink-secondary/70">
              <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="20,7 32,27 8,27" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              <polygon points="20,33 32,13 8,13" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              <circle cx="20" cy="20" r="2.5" fill="currentColor" className={accentTextMap[accentColor]} />
            </svg>
          </div>
        </div>

        {/* Essence Description */}
        <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed line-clamp-3">
          {arcana.essence}
        </p>

        {/* Visual Frequency Balance Meter */}
        {showFrequencyMeter && (
          <div className="space-y-2 pt-2 border-t border-border-subtle/80">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="flex items-center gap-1 text-status-success font-medium">
                <Flame className="w-3.5 h-3.5" />
                Light Superpower (Active Flow)
              </span>
              <span className="text-status-warning font-medium">
                Shadow Pitfall to Guard
              </span>
            </div>

            {/* Dual Tone Meter Bar */}
            <div className="relative h-2 w-full rounded-full bg-surface-raised overflow-hidden border border-border-subtle flex">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-l-full"
                style={{ width: "72%" }}
              />
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-rose-400 rounded-r-full"
                style={{ width: "28%" }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-ink-muted leading-tight">
              <span className="truncate max-w-[50%] font-sans">
                {arcana.talents?.primaryGift || arcana.keywords[0]}
              </span>
              <span className="truncate max-w-[50%] text-right font-sans">
                {arcana.personality.shadowTendency.slice(0, 45)}...
              </span>
            </div>
          </div>
        )}

        {/* Keywords Pill Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {arcana.keywords.slice(0, 4).map((kw) => (
            <span
              key={kw}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-surface-raised border border-border-subtle text-ink-primary hover:border-border-strong transition-colors"
            >
              {kw}
            </span>
          ))}
        </div>

        {/* Footer Link to Full Arcana Hub */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] italic text-ink-muted truncate max-w-[70%]">
            &ldquo;{arcana.affirmation}&rdquo;
          </span>
          <Link
            href={`/arcana/${arcana.number}`}
            className={`inline-flex items-center gap-1 text-xs font-mono font-semibold ${accentTextMap[accentColor]} hover:underline`}
          >
            Explore #{arcana.number}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

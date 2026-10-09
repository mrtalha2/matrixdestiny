"use client";

import React, { useState } from "react";
import { Heart, Sparkles, MapPin, ShieldCheck, Flame, Compass } from "lucide-react";
import { ROMAN_NUMERALS } from "./ArcanaTarotCard";

interface LoveChannelVisualizerProps {
  loveEnergy: number;
  heartEnergy: number;
  comfortEnergy: number;
  loveName: string;
  heartName: string;
  meetingLocation: string;
  className?: string;
}

export function LoveChannelVisualizer({
  loveEnergy,
  heartEnergy,
  comfortEnergy,
  loveName,
  heartName,
  meetingLocation,
  className = "",
}: LoveChannelVisualizerProps) {
  const [activeFocal, setActiveFocal] = useState<"gate" | "heart" | "comfort">("gate");

  return (
    <div className={`rounded-3xl border border-chart-love/30 bg-gradient-to-b from-surface/90 via-surface to-surface-raised p-6 sm:p-8 shadow-card backdrop-blur-md space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-chart-love/15 text-chart-love border border-chart-love/30">
              <Heart className="w-4 h-4" />
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink-primary">
              Sacred Love Channel Geometry
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Visualizing the romantic energetic diagonal connecting your Heart Center to Soulmate Attraction.
          </p>
        </div>

        {/* Focal Switcher */}
        <div className="flex items-center gap-1.5 bg-surface-raised p-1 rounded-xl border border-border-subtle self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveFocal("gate")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              activeFocal === "gate"
                ? "bg-chart-love text-white shadow-sm"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            Love Gate #{loveEnergy}
          </button>
          <button
            type="button"
            onClick={() => setActiveFocal("heart")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              activeFocal === "heart"
                ? "bg-brand-primary text-white shadow-sm"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            Heart Anahata #{heartEnergy}
          </button>
          <button
            type="button"
            onClick={() => setActiveFocal("comfort")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              activeFocal === "comfort"
                ? "bg-chart-core text-white shadow-sm"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            Sanctuary #{comfortEnergy}
          </button>
        </div>
      </div>

      {/* Main Visual Layout: SVG Flow Canvas + Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Romantic Flow Diagonal (7 Cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center py-4">
          <svg viewBox="0 0 420 300" className="w-full max-w-[420px] h-auto select-none drop-shadow-md">
            <defs>
              <linearGradient id="loveFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
              </linearGradient>
              <filter id="loveHalo" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbiting Concentric Guides */}
            <circle cx="210" cy="150" r="110" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" className="text-border-strong opacity-35" />
            <circle cx="210" cy="150" r="60" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-border-strong opacity-35" />

            {/* Diagonal Love Channel Beam */}
            <line
              x1="70"
              y1="230"
              x2="210"
              y2="150"
              stroke="url(#loveFlow)"
              strokeWidth="3"
              className="animate-pulse"
            />
            <line
              x1="210"
              y1="150"
              x2="350"
              y2="70"
              stroke="url(#loveFlow)"
              strokeWidth="3"
              className="animate-pulse"
            />

            {/* Node 1: Sanctuary Baseline (Left Point E) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveFocal("comfort")}
            >
              {activeFocal === "comfort" && (
                <circle cx="70" cy="230" r="30" fill="#a855f7" fillOpacity="0.25" filter="url(#loveHalo)" />
              )}
              <circle
                cx="70"
                cy="230"
                r="22"
                fill="#3b0764"
                stroke={activeFocal === "comfort" ? "#c084fc" : "#a855f7"}
                strokeWidth={activeFocal === "comfort" ? "3" : "1.5"}
              />
              <text x="70" y="235" textAnchor="middle" fill="#ffffff" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold">
                {comfortEnergy}
              </text>
              <text x="70" y="270" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-sans)" fontWeight="bold" className="text-ink-primary">
                SOUL SANCTUARY
              </text>
            </g>

            {/* Node 2: Center Anahata Heart (Mid Point E2) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveFocal("heart")}
            >
              {activeFocal === "heart" && (
                <circle cx="210" cy="150" r="34" fill="#f43f5e" fillOpacity="0.3" filter="url(#loveHalo)" />
              )}
              <circle
                cx="210"
                cy="150"
                r="26"
                fill="#881337"
                stroke={activeFocal === "heart" ? "#fb7185" : "#f43f5e"}
                strokeWidth={activeFocal === "heart" ? "3.5" : "2"}
              />
              <text x="210" y="156" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="var(--font-mono)" fontWeight="bold">
                {heartEnergy}
              </text>
              <text x="210" y="112" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-sans)" fontWeight="bold" className="text-ink-primary">
                ANAHATA HEART
              </text>
            </g>

            {/* Node 3: Love Entrance Gate (Right Point C1) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveFocal("gate")}
            >
              {activeFocal === "gate" && (
                <circle cx="350" cy="70" r="34" fill="#ec4899" fillOpacity="0.3" filter="url(#loveHalo)" />
              )}
              <circle
                cx="350"
                cy="70"
                r="26"
                fill="#500724"
                stroke={activeFocal === "gate" ? "#f472b6" : "#ec4899"}
                strokeWidth={activeFocal === "gate" ? "3.5" : "2"}
              />
              <text x="350" y="76" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="var(--font-mono)" fontWeight="bold">
                {loveEnergy}
              </text>
              <text x="350" y="32" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-sans)" fontWeight="bold" className="text-ink-primary">
                LOVE GATE
              </text>
            </g>
          </svg>
        </div>

        {/* Dynamic Details & Romantic Harmony Gauges (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl border border-chart-love/30 bg-surface-raised space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase font-bold text-chart-love flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" />
                Active Romantic Coordinate
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-surface border border-border-subtle">
                Arcana {ROMAN_NUMERALS[activeFocal === "gate" ? loveEnergy : activeFocal === "heart" ? heartEnergy : comfortEnergy]}
              </span>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold text-ink-primary">
                {activeFocal === "gate"
                  ? `Love Gate — Arcana ${loveEnergy} (${loveName})`
                  : activeFocal === "heart"
                  ? `Heart Center — Arcana ${heartEnergy} (${heartName})`
                  : `Soul Sanctuary — Arcana ${comfortEnergy}`}
              </h4>
              <p className="text-xs text-ink-secondary mt-1 leading-relaxed">
                {activeFocal === "gate"
                  ? "The external frequency of attraction. Governs the personality traits, passions, and worldviews of your natural soulmate match."
                  : activeFocal === "heart"
                  ? "The inner sanctuary of trust. Where romantic intimacy directly impacts your financial stability and emotional security."
                  : "Your core personal frequency. When you stay true to this baseline, romantic confusion dissipates."}
              </p>
            </div>

            {activeFocal === "gate" && (
              <div className="p-3 rounded-xl bg-chart-love/10 border border-chart-love/20 text-xs text-ink-primary flex items-start gap-2">
                <MapPin className="w-4 h-4 text-chart-love shrink-0 mt-0.5" />
                <span>
                  <strong>Encounter Hotspot:</strong> {meetingLocation}
                </span>
              </div>
            )}
          </div>

          {/* Romantic Harmony Gauges */}
          <div className="p-5 rounded-2xl border border-border-subtle bg-surface space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-primary flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-chart-love" />
              Romantic Resonance Gauges
            </h4>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-ink-secondary">Vulnerability & Trust</span>
                  <span className="font-bold text-chart-love">92%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
                  <div className="h-full bg-chart-love rounded-full transition-all duration-500" style={{ width: "92%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-ink-secondary">Passionate Chemistry</span>
                  <span className="font-bold text-rose-500">86%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: "86%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-ink-secondary">Karmic Devotion</span>
                  <span className="font-bold text-brand-primary">89%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary rounded-full transition-all duration-500" style={{ width: "89%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

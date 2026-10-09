"use client";

import React, { useState } from "react";
import { DollarSign, TrendingUp, ShieldAlert, Sparkles, Compass } from "lucide-react";
import { ROMAN_NUMERALS } from "./ArcanaTarotCard";

interface MoneyChannelVisualizerProps {
  moneyEnergy: number;
  materialEnergy: number;
  heartEnergy: number;
  moneyName: string;
  materialName: string;
  careerPath: string;
  antiTrigger: string;
  className?: string;
}

export function MoneyChannelVisualizer({
  moneyEnergy,
  materialEnergy,
  heartEnergy,
  moneyName,
  materialName,
  careerPath,
  antiTrigger,
  className = "",
}: MoneyChannelVisualizerProps) {
  const [activeFocal, setActiveFocal] = useState<"gate" | "material" | "heart">("gate");

  return (
    <div className={`rounded-3xl border border-chart-wealth/30 bg-gradient-to-b from-surface/90 via-surface to-surface-raised p-6 sm:p-8 shadow-card backdrop-blur-md space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-chart-wealth/15 text-chart-wealth border border-chart-wealth/30">
              <DollarSign className="w-4 h-4" />
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink-primary">
              Sacred Wealth Channel Geometry
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Tracing the financial conduit from Heart Trust to Material Wealth and worldly realization.
          </p>
        </div>

        {/* Focal Switcher */}
        <div className="flex items-center gap-1.5 bg-surface-raised p-1 rounded-xl border border-border-subtle self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveFocal("gate")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              activeFocal === "gate"
                ? "bg-chart-wealth text-ink-primary shadow-sm font-bold"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            Money Gate #{moneyEnergy}
          </button>
          <button
            type="button"
            onClick={() => setActiveFocal("material")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              activeFocal === "material"
                ? "bg-brand-primary text-white shadow-sm"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            Material Fruits #{materialEnergy}
          </button>
          <button
            type="button"
            onClick={() => setActiveFocal("heart")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              activeFocal === "heart"
                ? "bg-chart-spirit text-white shadow-sm"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            Heart Trust #{heartEnergy}
          </button>
        </div>
      </div>

      {/* Main Visual Layout: SVG Flow Canvas + Financial Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Wealth Diagonal (7 Cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center py-4">
          <svg viewBox="0 0 420 300" className="w-full max-w-[420px] h-auto select-none drop-shadow-md">
            <defs>
              <linearGradient id="wealthFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#eab308" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
              </linearGradient>
              <filter id="wealthHalo" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbiting Concentric Guides */}
            <circle cx="210" cy="150" r="110" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" className="text-border-strong opacity-35" />
            <circle cx="210" cy="150" r="60" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-border-strong opacity-35" />

            {/* Diagonal Wealth Conduit */}
            <line
              x1="70"
              y1="70"
              x2="210"
              y2="150"
              stroke="url(#wealthFlow)"
              strokeWidth="3"
              className="animate-pulse"
            />
            <line
              x1="210"
              y1="150"
              x2="350"
              y2="230"
              stroke="url(#wealthFlow)"
              strokeWidth="3"
              className="animate-pulse"
            />

            {/* Node 1: Heart-Money Trust (Point E2) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveFocal("heart")}
            >
              {activeFocal === "heart" && (
                <circle cx="70" cy="70" r="32" fill="#8b5cf6" fillOpacity="0.25" filter="url(#wealthHalo)" />
              )}
              <circle
                cx="70"
                cy="70"
                r="24"
                fill="#2e1065"
                stroke={activeFocal === "heart" ? "#c084fc" : "#8b5cf6"}
                strokeWidth={activeFocal === "heart" ? "3" : "1.5"}
              />
              <text x="70" y="76" textAnchor="middle" fill="#ffffff" fontSize="15" fontFamily="var(--font-mono)" fontWeight="bold">
                {heartEnergy}
              </text>
              <text x="70" y="32" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-sans)" fontWeight="bold" className="text-ink-primary">
                HEART TRUST
              </text>
            </g>

            {/* Node 2: Money Gate Entrance (Point C2) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveFocal("gate")}
            >
              {activeFocal === "gate" && (
                <circle cx="210" cy="150" r="35" fill="#10b981" fillOpacity="0.3" filter="url(#wealthHalo)" />
              )}
              <circle
                cx="210"
                cy="150"
                r="26"
                fill="#064e3b"
                stroke={activeFocal === "gate" ? "#34d399" : "#10b981"}
                strokeWidth={activeFocal === "gate" ? "3.5" : "2"}
              />
              <text x="210" y="156" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="var(--font-mono)" fontWeight="bold">
                {moneyEnergy}
              </text>
              <text x="210" y="112" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-sans)" fontWeight="bold" className="text-ink-primary">
                MONEY GATE (C2)
              </text>
            </g>

            {/* Node 3: Material Fruits & Social Realization (Point C) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveFocal("material")}
            >
              {activeFocal === "material" && (
                <circle cx="350" cy="230" r="34" fill="#f59e0b" fillOpacity="0.3" filter="url(#wealthHalo)" />
              )}
              <circle
                cx="350"
                cy="230"
                r="26"
                fill="#78350f"
                stroke={activeFocal === "material" ? "#fbbf24" : "#f59e0b"}
                strokeWidth={activeFocal === "material" ? "3.5" : "2"}
              />
              <text x="350" y="236" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="var(--font-mono)" fontWeight="bold">
                {materialEnergy}
              </text>
              <text x="350" y="272" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-sans)" fontWeight="bold" className="text-ink-primary">
                MATERIAL FRUITS
              </text>
            </g>
          </svg>
        </div>

        {/* Dynamic Details & Financial Gauges (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl border border-chart-wealth/30 bg-surface-raised space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase font-bold text-chart-wealth flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Active Financial Node
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-surface border border-border-subtle">
                Arcana {ROMAN_NUMERALS[activeFocal === "gate" ? moneyEnergy : activeFocal === "material" ? materialEnergy : heartEnergy]}
              </span>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold text-ink-primary">
                {activeFocal === "gate"
                  ? `Money Gate — Arcana ${moneyEnergy} (${moneyName})`
                  : activeFocal === "material"
                  ? `Material Realization — Arcana ${materialEnergy} (${materialName})`
                  : `Heart-Money Junction — Arcana ${heartEnergy}`}
              </h4>
              <p className="text-xs text-ink-secondary mt-1 leading-relaxed">
                {activeFocal === "gate"
                  ? "The primary valve determining how fast money enters your life. When aligned, projects convert quickly into high-margin revenue."
                  : activeFocal === "material"
                  ? "The worldly container. Governs tangible assets, physical investments, real estate, and long-term generational wealth."
                  : "The emotional foundation of abundance. You cannot build sustainable wealth while your heart remains closed or distrustful."}
              </p>
            </div>

            {activeFocal === "gate" && (
              <div className="p-3 rounded-xl bg-status-warning/10 border border-status-warning/25 text-xs text-ink-primary flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-status-warning shrink-0 mt-0.5" />
                <span>
                  <strong>Anti-Trigger Trap:</strong> {antiTrigger}
                </span>
              </div>
            )}
          </div>

          {/* Financial Velocity Gauges */}
          <div className="p-5 rounded-2xl border border-border-subtle bg-surface space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-primary flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-chart-wealth" />
              Wealth Flow Velocity
            </h4>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-ink-secondary">Commercial Boldness</span>
                  <span className="font-bold text-chart-wealth">91%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
                  <div className="h-full bg-chart-wealth rounded-full transition-all duration-500" style={{ width: "91%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-ink-secondary">Cashflow Circulation</span>
                  <span className="font-bold text-emerald-500">86%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: "86%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-ink-secondary">Anti-Trigger Resistance</span>
                  <span className="font-bold text-amber-500">84%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: "84%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

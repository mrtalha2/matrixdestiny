"use client";

import React, { useState } from "react";
import { AlertTriangle, Sparkles, RefreshCw, Compass, ShieldCheck } from "lucide-react";
import { ROMAN_NUMERALS } from "./ArcanaTarotCard";

interface KarmicRootVisualizerProps {
  signature: string;
  triad: [number, number, number];
  tailName: string;
  archetype: string;
  shadowTrap: string;
  transmutationStep: string;
  className?: string;
}

export function KarmicRootVisualizer({
  signature,
  triad,
  tailName,
  archetype,
  shadowTrap,
  transmutationStep,
  className = "",
}: KarmicRootVisualizerProps) {
  const [selectedArcanaIndex, setSelectedArcanaIndex] = useState<0 | 1 | 2>(0);

  const arcanaLabels = [
    { label: "Point D — Anchor Root", role: "Primary Karmic Debt" },
    { label: "Subconscious Node", role: "Recursive Shadow Loop" },
    { label: "Past-Life Catalyst", role: "Transmutation Key" },
  ];

  return (
    <div className={`rounded-3xl border border-chart-karma/30 bg-gradient-to-b from-surface/90 via-surface to-surface-raised p-6 sm:p-8 shadow-card backdrop-blur-md space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-chart-karma/15 text-chart-karma border border-chart-karma/30">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink-primary">
              Subterranean Karmic Root Geometry
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Visualizing your 3-arcana past-life anchor ({signature}) and the energetic transmutation path.
          </p>
        </div>

        {/* Tail Triad Pill Badges */}
        <div className="flex items-center gap-1.5 bg-surface-raised p-1 rounded-xl border border-border-subtle self-start sm:self-auto">
          {triad.map((num, idx) => (
            <button
              key={`${num}-${idx}`}
              type="button"
              onClick={() => setSelectedArcanaIndex(idx as 0 | 1 | 2)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedArcanaIndex === idx
                  ? "bg-chart-karma text-white shadow-sm"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              #{num}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visual Layout: SVG Subterranean Triangle + Transmutation Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Subterranean Root (7 Cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center py-4">
          <svg viewBox="0 0 400 320" className="w-full max-w-[380px] h-auto select-none drop-shadow-md">
            <defs>
              <linearGradient id="karmaRootFlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#be123c" stopOpacity="0.9" />
              </linearGradient>
              <filter id="karmaHalo" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Earth Surface Horizon Line */}
            <line x1="40" y1="80" x2="360" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-border-strong opacity-40" />
            <text x="50" y="70" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)" className="text-ink-muted">
              SURFACE CONSCIOUSNESS
            </text>
            <text x="50" y="100" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)" className="text-chart-karma">
              ▼ SUBTERRANEAN KARMIC REALM
            </text>

            {/* Inverted Triangle Root Cords */}
            <line
              x1="120"
              y1="130"
              x2="280"
              y2="130"
              stroke="url(#karmaRootFlow)"
              strokeWidth="2.5"
              className="animate-pulse"
            />
            <line
              x1="120"
              y1="130"
              x2="200"
              y2="260"
              stroke="url(#karmaRootFlow)"
              strokeWidth="2.5"
              className="animate-pulse"
            />
            <line
              x1="280"
              y1="130"
              x2="200"
              y2="260"
              stroke="url(#karmaRootFlow)"
              strokeWidth="2.5"
              className="animate-pulse"
            />

            {/* Node 1: Left Past Node */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setSelectedArcanaIndex(1)}
            >
              {selectedArcanaIndex === 1 && (
                <circle cx="120" cy="130" r="30" fill="#f43f5e" fillOpacity="0.3" filter="url(#karmaHalo)" />
              )}
              <circle
                cx="120"
                cy="130"
                r="22"
                fill="#4c0519"
                stroke={selectedArcanaIndex === 1 ? "#fb7185" : "#f43f5e"}
                strokeWidth={selectedArcanaIndex === 1 ? "3" : "1.5"}
              />
              <text x="120" y="135" textAnchor="middle" fill="#ffffff" fontSize="15" fontFamily="var(--font-mono)" fontWeight="bold">
                {triad[1]}
              </text>
              <text x="120" y="96" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-sans)" fontWeight="bold" className="text-ink-primary">
                SHADOW 1
              </text>
            </g>

            {/* Node 2: Right Past Node */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setSelectedArcanaIndex(2)}
            >
              {selectedArcanaIndex === 2 && (
                <circle cx="280" cy="130" r="30" fill="#f43f5e" fillOpacity="0.3" filter="url(#karmaHalo)" />
              )}
              <circle
                cx="280"
                cy="130"
                r="22"
                fill="#4c0519"
                stroke={selectedArcanaIndex === 2 ? "#fb7185" : "#f43f5e"}
                strokeWidth={selectedArcanaIndex === 2 ? "3" : "1.5"}
              />
              <text x="280" y="135" textAnchor="middle" fill="#ffffff" fontSize="15" fontFamily="var(--font-mono)" fontWeight="bold">
                {triad[2]}
              </text>
              <text x="280" y="96" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-sans)" fontWeight="bold" className="text-ink-primary">
                SHADOW 2
              </text>
            </g>

            {/* Node 0: Deep Bottom Root Apex (Point D) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setSelectedArcanaIndex(0)}
            >
              {selectedArcanaIndex === 0 && (
                <circle cx="200" cy="260" r="34" fill="#e11d48" fillOpacity="0.35" filter="url(#karmaHalo)" />
              )}
              <circle
                cx="200"
                cy="260"
                r="26"
                fill="#881337"
                stroke={selectedArcanaIndex === 0 ? "#fda4af" : "#e11d48"}
                strokeWidth={selectedArcanaIndex === 0 ? "3.5" : "2"}
              />
              <text x="200" y="266" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="var(--font-mono)" fontWeight="bold">
                {triad[0]}
              </text>
              <text x="200" y="302" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-sans)" fontWeight="bold" className="text-ink-primary">
                POINT D (ROOT)
              </text>
            </g>
          </svg>
        </div>

        {/* Dynamic Details & Transmutation Progress (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl border border-chart-karma/30 bg-surface-raised space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase font-bold text-chart-karma flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {arcanaLabels[selectedArcanaIndex].role}
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-surface border border-border-subtle">
                Arcana {ROMAN_NUMERALS[triad[selectedArcanaIndex]] || triad[selectedArcanaIndex]}
              </span>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold text-ink-primary">
                {tailName} &mdash; Energy {triad[selectedArcanaIndex]}
              </h4>
              <p className="text-xs font-mono text-ink-muted">
                {archetype} ({arcanaLabels[selectedArcanaIndex].label})
              </p>
            </div>

            <p className="text-xs text-ink-secondary leading-relaxed">
              {selectedArcanaIndex === 0
                ? "The deepest subconscious anchor. This energy starts life in a heavy negative state, repeatedly manifesting the central test until consciously transmuted."
                : "A secondary trigger node that collaborates with the root debt to recreate familiar emotional traps until you break the cycle."}
            </p>
          </div>

          {/* Transmutation Polarity Meter */}
          <div className="p-5 rounded-2xl border border-border-subtle bg-surface space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-primary flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-chart-karma" />
              Transmutation Polarity Meter
            </h4>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-status-warning">Subconscious Debt Loop</span>
                  <span className="text-status-success font-bold">Transmuted Superpower</span>
                </div>
                <div className="h-2 w-full bg-surface-raised rounded-full overflow-hidden flex border border-border-subtle">
                  <div className="h-full bg-gradient-to-r from-rose-500 to-amber-500" style={{ width: "35%" }} />
                  <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400" style={{ width: "65%" }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-status-success/10 border border-status-success/20 text-xs text-ink-primary flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>
                  <strong>Mastery Key:</strong> {transmutationStep}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

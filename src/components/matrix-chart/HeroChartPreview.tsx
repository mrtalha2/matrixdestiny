"use client";

import React, { useState } from "react";
import { Sparkles, Heart, Coins, ShieldAlert, Compass } from "lucide-react";

export function HeroChartPreview() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-[480px] lg:max-w-[520px] xl:max-w-[600px] 2xl:max-w-[680px] mx-auto aspect-square flex items-center justify-center p-2 select-none">
      {/* Background Ambient Glow */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-primary/10 via-chart-wealth/8 to-brand-secondary/10 blur-2xl -z-10" />

      {/* Floating Archetype Chips */}
      <div className="absolute -top-1 sm:top-2 left-2 sm:left-4 z-10 flex items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur-sm border border-border-subtle px-2.5 py-1 text-[11px] font-medium text-ink-primary shadow-elevation-subtle">
        <span className="w-2 h-2 rounded-full bg-chart-spirit" />
        <span>Spiritual Channel</span>
      </div>

      <div className="absolute top-1/4 -right-1 sm:right-2 z-10 flex items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur-sm border border-border-subtle px-2.5 py-1 text-[11px] font-medium text-ink-primary shadow-elevation-subtle">
        <Coins className="w-3 h-3 text-chart-wealth" />
        <span>Money Line (21)</span>
      </div>

      <div className="absolute bottom-1/4 -left-1 sm:left-2 z-10 flex items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur-sm border border-border-subtle px-2.5 py-1 text-[11px] font-medium text-ink-primary shadow-elevation-subtle">
        <Heart className="w-3 h-3 text-chart-love" />
        <span>Love Channel (6)</span>
      </div>

      <div className="absolute -bottom-1 sm:bottom-2 right-2 sm:right-6 z-10 flex items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur-sm border border-border-subtle px-2.5 py-1 text-[11px] font-medium text-ink-primary shadow-elevation-subtle">
        <ShieldAlert className="w-3 h-3 text-chart-karmic" />
        <span>Karmic Tail (18)</span>
      </div>

      {/* The Central Octagram SVG */}
      <svg
        className="w-full h-full drop-shadow-sm transition-transform duration-700 hover:scale-[1.02]"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Perimeter Guide Circle */}
        <circle
          cx="250"
          cy="250"
          r="210"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="text-border-strong opacity-60"
        />

        {/* Secondary Concentric Circle */}
        <circle
          cx="250"
          cy="250"
          r="150"
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-border-subtle opacity-70"
        />

        {/* 1. Straight Earth Square (Physical Realm) */}
        <rect
          x="100"
          y="100"
          width="300"
          height="300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-border-strong"
        />

        {/* 2. Rotated Sky Square 45° (Spiritual Realm) */}
        <rect
          x="100"
          y="100"
          width="300"
          height="300"
          transform="rotate(45 250 250)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          className="text-border-strong"
        />

        {/* Cardinal Internal Connecting Axes */}
        <line x1="40" y1="250" x2="460" y2="250" stroke="currentColor" strokeWidth="1" className="text-border-subtle" />
        <line x1="250" y1="40" x2="250" y2="460" stroke="currentColor" strokeWidth="1" className="text-border-subtle" />

        {/* Diagonal Chords (Ancestral Lines) */}
        <line x1="100" y1="100" x2="400" y2="400" stroke="currentColor" strokeWidth="1" className="text-border-subtle" />
        <line x1="400" y1="100" x2="100" y2="400" stroke="currentColor" strokeWidth="1" className="text-border-subtle" />

        {/* Highlighted Relationship Line (Love) */}
        <line
          x1="250"
          y1="250"
          x2="330"
          y2="330"
          stroke="hsl(var(--chart-love))"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="opacity-75"
        />

        {/* Highlighted Wealth Line */}
        <line
          x1="250"
          y1="250"
          x2="380"
          y2="295"
          stroke="hsl(var(--chart-wealth))"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="opacity-75"
        />

        {/* Highlighted Karmic Tail Line */}
        <line
          x1="250"
          y1="250"
          x2="250"
          y2="460"
          stroke="hsl(var(--chart-karmic))"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="opacity-75"
        />

        {/* ================= NODES ================= */}

        {/* 1. Center Comfort Zone: 7 */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onMouseEnter={() => setActiveTooltip("Soul Center: Energy 7 (The Chariot)")}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <circle
            cx="250"
            cy="250"
            r="30"
            fill="hsl(var(--chart-core))"
            className="stroke-surface stroke-[3px] shadow-sm"
          />
          <text
            x="250"
            y="256"
            textAnchor="middle"
            className="fill-white font-mono font-bold text-base pointer-events-none tabular-nums"
          >
            7
          </text>
        </g>

        {/* 2. Top Vertex (Spirit): 12 */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onMouseEnter={() => setActiveTooltip("Spirit Vertex: Energy 12 (The Hanged Man)")}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <circle
            cx="250"
            cy="40"
            r="22"
            fill="hsl(var(--chart-spirit))"
            className="stroke-surface stroke-[3px]"
          />
          <text
            x="250"
            y="255"
            textAnchor="middle"
            className="fill-white font-mono font-bold text-xs pointer-events-none tabular-nums"
            style={{ transform: "translate(0, -210px)" }}
          >
            12
          </text>
        </g>

        {/* 3. Bottom Vertex (Karmic Tail Root): 18 */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onMouseEnter={() => setActiveTooltip("Karmic Tail: Energy 18 (The Moon)")}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <circle
            cx="250"
            cy="460"
            r="22"
            fill="hsl(var(--chart-karmic))"
            className="stroke-surface stroke-[3px]"
          />
          <text
            x="250"
            y="465"
            textAnchor="middle"
            className="fill-white font-mono font-bold text-xs pointer-events-none tabular-nums"
          >
            18
          </text>
        </g>

        {/* 4. Left Vertex (Physical Persona): 5 */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onMouseEnter={() => setActiveTooltip("Physical Persona: Energy 5 (The Hierophant)")}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <circle
            cx="40"
            cy="250"
            r="22"
            fill="hsl(var(--chart-physical))"
            className="stroke-surface stroke-[3px]"
          />
          <text
            x="40"
            y="255"
            textAnchor="middle"
            className="fill-white font-mono font-bold text-xs pointer-events-none tabular-nums"
          >
            5
          </text>
        </g>

        {/* 5. Right Vertex (Talents & Social realization): 9 */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onMouseEnter={() => setActiveTooltip("Talents & Realization: Energy 9 (The Hermit)")}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <circle
            cx="460"
            cy="250"
            r="22"
            fill="hsl(var(--chart-talent))"
            className="stroke-surface stroke-[3px]"
          />
          <text
            x="460"
            y="255"
            textAnchor="middle"
            className="fill-white font-mono font-bold text-xs pointer-events-none tabular-nums"
          >
            9
          </text>
        </g>

        {/* 6. Love Line Intersection Node: 6 */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onMouseEnter={() => setActiveTooltip("Love Line Key: Energy 6 (The Lovers)")}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <circle
            cx="330"
            cy="330"
            r="19"
            fill="hsl(var(--chart-love))"
            className="stroke-surface stroke-[2.5px]"
          />
          <text
            x="330"
            y="335"
            textAnchor="middle"
            className="fill-white font-mono font-bold text-[11px] pointer-events-none tabular-nums"
          >
            6
          </text>
        </g>

        {/* 7. Wealth Line Intersection Node: 21 */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onMouseEnter={() => setActiveTooltip("Wealth Line Key: Energy 21 (The World)")}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <circle
            cx="380"
            cy="295"
            r="19"
            fill="hsl(var(--chart-wealth))"
            className="stroke-surface stroke-[2.5px]"
          />
          <text
            x="380"
            y="300"
            textAnchor="middle"
            className="fill-white font-mono font-bold text-[11px] pointer-events-none tabular-nums"
          >
            21
          </text>
        </g>

        {/* 8. Paternal Line Top-Left: 4 */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onMouseEnter={() => setActiveTooltip("Paternal Program: Energy 4 (The Emperor)")}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <circle
            cx="100"
            cy="100"
            r="18"
            fill="hsl(var(--chart-paternal))"
            className="stroke-surface stroke-[2px]"
          />
          <text
            x="100"
            y="104"
            textAnchor="middle"
            className="fill-white font-mono font-bold text-[10px] pointer-events-none tabular-nums"
          >
            4
          </text>
        </g>

        {/* 9. Maternal Line Top-Right: 3 */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onMouseEnter={() => setActiveTooltip("Maternal Wisdom: Energy 3 (The Empress)")}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <circle
            cx="400"
            cy="100"
            r="18"
            fill="hsl(var(--chart-maternal))"
            className="stroke-surface stroke-[2px]"
          />
          <text
            x="400"
            y="104"
            textAnchor="middle"
            className="fill-white font-mono font-bold text-[10px] pointer-events-none tabular-nums"
          >
            3
          </text>
        </g>
      </svg>

      {/* Dynamic Hover Tooltip Display */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ink-primary text-canvas text-[11px] font-medium shadow-elevation-mid transition-all duration-200 opacity-0 pointer-events-none data-[visible=true]:opacity-100"
        data-visible={Boolean(activeTooltip)}
      >
        {activeTooltip || "Hover nodes to inspect archetypes"}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { designTokens } from "@/lib/design-tokens";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ChartZonePreview() {
  const [activeZoneId, setActiveZoneId] = useState<string>("core");
  const activeZone =
    designTokens.colors.chart.find((z) => z.id === activeZoneId) ||
    designTokens.colors.chart[0];

  return (
    <Card elevation="mid" className="w-full">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Interactive SVG Octagram Mini-Canvas */}
        <div className="relative flex flex-col items-center justify-center p-4">
          <svg
            className="w-72 h-72 sm:w-80 sm:h-80 select-none drop-shadow-sm"
            viewBox="0 0 400 400"
          >
            {/* Background Structural Octagram Lines */}
            <defs>
              <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Earth Square (Straight) */}
            <rect
              x="80"
              y="80"
              width="240"
              height="240"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="text-border-strong transition-colors duration-300"
            />

            {/* Sky Square (Rotated 45 degrees around center 200, 200) */}
            <rect
              x="80"
              y="80"
              width="240"
              height="240"
              transform="rotate(45 200 200)"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              className="text-border-strong transition-colors duration-300"
            />

            {/* Inner Diagonal Connecting Chords */}
            <line
              x1="80"
              y1="80"
              x2="320"
              y2="320"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-border-subtle"
            />
            <line
              x1="320"
              y1="80"
              x2="80"
              y2="320"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-border-subtle"
            />

            {/* Render Key Interactive Chart Nodes */}
            {/* 1. Center: Soul Comfort Zone */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveZoneId("core")}
            >
              <circle
                cx="200"
                cy="200"
                r="24"
                className={`transition-all duration-300 ${
                  activeZoneId === "core" ? "stroke-ink-primary stroke-2" : "stroke-surface stroke-2"
                }`}
                fill="hsl(var(--chart-core))"
              />
              <text
                x="200"
                y="205"
                textAnchor="middle"
                className="fill-white font-mono font-bold text-xs pointer-events-none tabular-nums"
              >
                7
              </text>
            </g>

            {/* 2. Top Vertex: Spirit / Divine */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveZoneId("spirit")}
            >
              <circle
                cx="200"
                cy="30"
                r="18"
                className={`transition-all duration-300 ${
                  activeZoneId === "spirit" ? "stroke-ink-primary stroke-2" : "stroke-surface stroke-2"
                }`}
                fill="hsl(var(--chart-spirit))"
              />
              <text
                x="200"
                y="34"
                textAnchor="middle"
                className="fill-white font-mono font-bold text-[11px] pointer-events-none tabular-nums"
              >
                12
              </text>
            </g>

            {/* 3. Bottom Vertex: Karmic Tail */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveZoneId("karmic")}
            >
              <circle
                cx="200"
                cy="370"
                r="18"
                className={`transition-all duration-300 ${
                  activeZoneId === "karmic" ? "stroke-ink-primary stroke-2" : "stroke-surface stroke-2"
                }`}
                fill="hsl(var(--chart-karmic))"
              />
              <text
                x="200"
                y="374"
                textAnchor="middle"
                className="fill-white font-mono font-bold text-[11px] pointer-events-none tabular-nums"
              >
                18
              </text>
            </g>

            {/* 4. Left Vertex: Earth / Physical */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveZoneId("physical")}
            >
              <circle
                cx="30"
                cy="200"
                r="18"
                className={`transition-all duration-300 ${
                  activeZoneId === "physical" ? "stroke-ink-primary stroke-2" : "stroke-surface stroke-2"
                }`}
                fill="hsl(var(--chart-physical))"
              />
              <text
                x="30"
                y="204"
                textAnchor="middle"
                className="fill-white font-mono font-bold text-[11px] pointer-events-none tabular-nums"
              >
                5
              </text>
            </g>

            {/* 5. Right Vertex: Higher Talents */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveZoneId("talent")}
            >
              <circle
                cx="370"
                cy="200"
                r="18"
                className={`transition-all duration-300 ${
                  activeZoneId === "talent" ? "stroke-ink-primary stroke-2" : "stroke-surface stroke-2"
                }`}
                fill="hsl(var(--chart-talent))"
              />
              <text
                x="370"
                y="204"
                textAnchor="middle"
                className="fill-white font-mono font-bold text-[11px] pointer-events-none tabular-nums"
              >
                9
              </text>
            </g>

            {/* 6. Love Line Node (Heart Anahata) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveZoneId("love")}
            >
              <circle
                cx="260"
                cy="270"
                r="16"
                className={`transition-all duration-300 ${
                  activeZoneId === "love" ? "stroke-ink-primary stroke-2" : "stroke-surface stroke-2"
                }`}
                fill="hsl(var(--chart-love))"
              />
              <text
                x="260"
                y="274"
                textAnchor="middle"
                className="fill-white font-mono font-bold text-[10px] pointer-events-none tabular-nums"
              >
                6
              </text>
            </g>

            {/* 7. Wealth Line Node (Manipura) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveZoneId("wealth")}
            >
              <circle
                cx="300"
                cy="240"
                r="16"
                className={`transition-all duration-300 ${
                  activeZoneId === "wealth" ? "stroke-ink-primary stroke-2" : "stroke-surface stroke-2"
                }`}
                fill="hsl(var(--chart-wealth))"
              />
              <text
                x="300"
                y="244"
                textAnchor="middle"
                className="fill-white font-mono font-bold text-[10px] pointer-events-none tabular-nums"
              >
                21
              </text>
            </g>

            {/* 8. Paternal Diagonal */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveZoneId("paternal")}
            >
              <circle
                cx="80"
                cy="80"
                r="15"
                className={`transition-all duration-300 ${
                  activeZoneId === "paternal" ? "stroke-ink-primary stroke-2" : "stroke-surface stroke-2"
                }`}
                fill="hsl(var(--chart-paternal))"
              />
              <text
                x="80"
                y="84"
                textAnchor="middle"
                className="fill-white font-mono font-bold text-[10px] pointer-events-none tabular-nums"
              >
                4
              </text>
            </g>

            {/* 9. Maternal Diagonal */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveZoneId("maternal")}
            >
              <circle
                cx="320"
                cy="80"
                r="15"
                className={`transition-all duration-300 ${
                  activeZoneId === "maternal" ? "stroke-ink-primary stroke-2" : "stroke-surface stroke-2"
                }`}
                fill="hsl(var(--chart-maternal))"
              />
              <text
                x="320"
                y="84"
                textAnchor="middle"
                className="fill-white font-mono font-bold text-[10px] pointer-events-none tabular-nums"
              >
                3
              </text>
            </g>

            {/* 10. Outer Cycle Node */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setActiveZoneId("cycle")}
            >
              <circle
                cx="140"
                cy="35"
                r="12"
                className={`transition-all duration-300 ${
                  activeZoneId === "cycle" ? "stroke-ink-primary stroke-2" : "stroke-surface stroke-2"
                }`}
                fill="hsl(var(--chart-cycle))"
              />
              <text
                x="140"
                y="39"
                textAnchor="middle"
                className="fill-white font-mono font-bold text-[9px] pointer-events-none tabular-nums"
              >
                10
              </text>
            </g>
          </svg>
          <span className="text-xs text-ink-muted mt-2">
            Click any node on the diagram to inspect zone details
          </span>
        </div>

        {/* Selected Zone Deep Dive */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-ink-muted">
                Selected Zone
              </span>
              <h3 className="text-xl font-display font-semibold text-ink-primary">
                {activeZone.label}
              </h3>
            </div>
            <div
              className="w-7 h-7 rounded-full border-2 border-surface shadow-sm"
              style={{ backgroundColor: activeZone.light }}
            />
          </div>

          <p className="text-sm text-ink-secondary leading-relaxed">
            {activeZone.meaning}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-md border border-border-subtle bg-surface-raised p-3">
              <span className="text-[11px] font-semibold text-ink-muted uppercase block mb-1">
                Light Token
              </span>
              <code className="text-xs font-mono font-medium text-ink-primary block">
                {activeZone.light}
              </code>
            </div>
            <div className="rounded-md border border-border-subtle bg-surface-raised p-3">
              <span className="text-[11px] font-semibold text-ink-muted uppercase block mb-1">
                Dark Token
              </span>
              <code className="text-xs font-mono font-medium text-ink-primary block">
                {activeZone.dark}
              </code>
            </div>
          </div>

          {/* Quick Zone Chips */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-ink-muted block mb-2 uppercase tracking-wide">
              Quick Select Zone (All 10 Harmonious Tones):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {designTokens.colors.chart.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZoneId(zone.id)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-all duration-150 border ${
                    activeZoneId === zone.id
                      ? "border-ink-primary bg-ink-primary text-canvas font-medium shadow-sm"
                      : "border-border-subtle bg-surface hover:bg-surface-raised text-ink-secondary"
                  }`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                    style={{ backgroundColor: zone.light }}
                  />
                  {zone.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

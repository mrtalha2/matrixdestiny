"use client";

import React, { useState } from "react";
import { Sparkles, Zap, Award, Compass, Eye } from "lucide-react";
import { ROMAN_NUMERALS } from "./ArcanaTarotCard";

interface TalentPointData {
  id: string;
  name: string;
  energy: number;
  label: string;
  description: string;
  accentClass: string;
}

interface TalentTriadVisualizerProps {
  spiritEnergy: number;
  personaEnergy: number;
  paternalEnergy: number;
  maternalEnergy: number;
  spiritName: string;
  personaName: string;
  className?: string;
}

export function TalentTriadVisualizer({
  spiritEnergy,
  personaEnergy,
  paternalEnergy,
  maternalEnergy,
  spiritName,
  personaName,
  className = "",
}: TalentTriadVisualizerProps) {
  const [selectedNode, setSelectedNode] = useState<"spirit" | "persona" | "ancestral">("spirit");

  const nodes: Record<"spirit" | "persona" | "ancestral", TalentPointData> = {
    spirit: {
      id: "spirit",
      name: spiritName,
      energy: spiritEnergy,
      label: "Spirit Month — Intuitive Vision",
      description: "Your celestial channel of insight, creative genius, and higher spiritual resonance. Operates effortlessly without manual effort.",
      accentClass: "text-chart-spirit bg-chart-spirit/15 border-chart-spirit",
    },
    persona: {
      id: "persona",
      name: personaName,
      energy: personaEnergy,
      label: "Persona Day — Worldly Charisma",
      description: "How you tangibly manifest ideas into the physical world, lead teams, articulate vision, and command respect in public environments.",
      accentClass: "text-brand-primary bg-brand-primary/15 border-brand-primary",
    },
    ancestral: {
      id: "ancestral",
      name: `Paternal ${paternalEnergy} & Maternal ${maternalEnergy}`,
      energy: paternalEnergy,
      label: "Ancestral Cross — Lineage Willpower",
      description: "Generational creative faculties passed through genetic and spiritual lineages, anchoring tenacity and deep emotional sensitivity.",
      accentClass: "text-chart-wealth bg-chart-wealth/15 border-chart-wealth",
    },
  };

  const active = nodes[selectedNode];

  return (
    <div className={`rounded-3xl border border-chart-spirit/30 bg-gradient-to-b from-surface/90 via-surface to-surface-raised p-6 sm:p-8 shadow-card backdrop-blur-md space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-chart-spirit/15 text-chart-spirit border border-chart-spirit/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink-primary">
              Sacred Talent Triad Geometry
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Tap any node to trace the energetic flow connecting your innate gifts.
          </p>
        </div>

        {/* Quick Node Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-surface-raised p-1 rounded-xl border border-border-subtle self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSelectedNode("spirit")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedNode === "spirit"
                ? "bg-chart-spirit text-white shadow-sm"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            Spirit #{spiritEnergy}
          </button>
          <button
            type="button"
            onClick={() => setSelectedNode("persona")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedNode === "persona"
                ? "bg-brand-primary text-white shadow-sm"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            Persona #{personaEnergy}
          </button>
          <button
            type="button"
            onClick={() => setSelectedNode("ancestral")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedNode === "ancestral"
                ? "bg-chart-wealth text-ink-primary shadow-sm"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            Lineage
          </button>
        </div>
      </div>

      {/* Main Visual Layout: SVG Triad Canvas + Interactive Description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Triad Graphic (7 Cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center py-4">
          <svg viewBox="0 0 400 360" className="w-full max-w-[380px] h-auto select-none drop-shadow-md">
            <defs>
              <linearGradient id="triadGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
              <filter id="nodeHalo" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Subtle Inner Sacred Circles */}
            <circle cx="200" cy="190" r="130" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" className="text-border-strong opacity-40" />
            <circle cx="200" cy="190" r="75" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-border-strong opacity-40" />

            {/* Connecting Geometric Triad Lines */}
            <line
              x1="200"
              y1="60"
              x2="80"
              y2="280"
              stroke="url(#triadGlow)"
              strokeWidth={selectedNode === "spirit" || selectedNode === "persona" ? "2.5" : "1.2"}
              strokeDasharray={selectedNode === "spirit" || selectedNode === "persona" ? "none" : "3 3"}
              className="transition-all duration-300"
            />
            <line
              x1="200"
              y1="60"
              x2="320"
              y2="280"
              stroke="url(#triadGlow)"
              strokeWidth={selectedNode === "spirit" || selectedNode === "ancestral" ? "2.5" : "1.2"}
              strokeDasharray={selectedNode === "spirit" || selectedNode === "ancestral" ? "none" : "3 3"}
              className="transition-all duration-300"
            />
            <line
              x1="80"
              y1="280"
              x2="320"
              y2="280"
              stroke="url(#triadGlow)"
              strokeWidth={selectedNode === "persona" || selectedNode === "ancestral" ? "2.5" : "1.2"}
              strokeDasharray={selectedNode === "persona" || selectedNode === "ancestral" ? "none" : "3 3"}
              className="transition-all duration-300"
            />

            {/* Center Core Sparkle */}
            <g transform="translate(200, 190)">
              <circle cx="0" cy="0" r="14" fill="currentColor" className="text-surface-raised" stroke="currentColor" strokeWidth="1" />
              <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#a855f7" />
            </g>

            {/* Node 1: Top Apex (Spirit Point B) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setSelectedNode("spirit")}
            >
              {selectedNode === "spirit" && (
                <circle cx="200" cy="60" r="32" fill="#8b5cf6" fillOpacity="0.25" filter="url(#nodeHalo)" />
              )}
              <circle
                cx="200"
                cy="60"
                r="24"
                fill="#1e1b4b"
                stroke={selectedNode === "spirit" ? "#a855f7" : "#6366f1"}
                strokeWidth={selectedNode === "spirit" ? "3" : "1.5"}
              />
              <text x="200" y="66" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="var(--font-mono)" fontWeight="bold">
                {spiritEnergy}
              </text>
              <text x="200" y="24" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600" className="text-ink-primary">
                SPIRIT (MONTH)
              </text>
            </g>

            {/* Node 2: Left Vertex (Persona Point A) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setSelectedNode("persona")}
            >
              {selectedNode === "persona" && (
                <circle cx="80" cy="280" r="32" fill="#3b82f6" fillOpacity="0.25" filter="url(#nodeHalo)" />
              )}
              <circle
                cx="80"
                cy="280"
                r="24"
                fill="#172554"
                stroke={selectedNode === "persona" ? "#60a5fa" : "#3b82f6"}
                strokeWidth={selectedNode === "persona" ? "3" : "1.5"}
              />
              <text x="80" y="286" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="var(--font-mono)" fontWeight="bold">
                {personaEnergy}
              </text>
              <text x="80" y="322" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600" className="text-ink-primary">
                PERSONA (DAY)
              </text>
            </g>

            {/* Node 3: Right Vertex (Ancestral Cross) */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => setSelectedNode("ancestral")}
            >
              {selectedNode === "ancestral" && (
                <circle cx="320" cy="280" r="32" fill="#10b981" fillOpacity="0.25" filter="url(#nodeHalo)" />
              )}
              <circle
                cx="320"
                cy="280"
                r="24"
                fill="#064e3b"
                stroke={selectedNode === "ancestral" ? "#34d399" : "#10b981"}
                strokeWidth={selectedNode === "ancestral" ? "3" : "1.5"}
              />
              <text x="320" y="286" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="var(--font-mono)" fontWeight="bold">
                {paternalEnergy}
              </text>
              <text x="320" y="322" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600" className="text-ink-primary">
                ANCESTRAL CROSS
              </text>
            </g>
          </svg>
        </div>

        {/* Selected Node Details & Superpower Radar (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl border border-border-subtle bg-surface-raised space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase font-bold text-chart-spirit">
                Active Focal Point
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-surface border border-border-subtle">
                Arcana {ROMAN_NUMERALS[active.energy] || active.energy}
              </span>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold text-ink-primary">
                {active.label}
              </h4>
              <p className="text-xs font-mono text-ink-muted">
                {active.name}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {active.description}
            </p>
          </div>

          {/* Superpower Expression Gauges */}
          <div className="p-5 rounded-2xl border border-border-subtle bg-surface space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-primary flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-chart-spirit" />
              Talent Activation Gauges
            </h4>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-ink-secondary">Intuitive Vision</span>
                  <span className="font-bold text-chart-spirit">94%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
                  <div className="h-full bg-chart-spirit rounded-full transition-all duration-500" style={{ width: "94%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-ink-secondary">Public Manifestation</span>
                  <span className="font-bold text-brand-primary">88%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary rounded-full transition-all duration-500" style={{ width: "88%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-ink-secondary">Lineage Tenacity</span>
                  <span className="font-bold text-chart-wealth">82%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
                  <div className="h-full bg-chart-wealth rounded-full transition-all duration-500" style={{ width: "82%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Sparkles, Heart, Coins, ShieldAlert, Activity, GitFork, Compass } from "lucide-react";

export type ChartLensMode = "all" | "karma" | "love" | "wealth" | "talents" | "chakras" | "ancestral";

interface ChartFocusLensProps {
  activeLens: ChartLensMode;
  onSelectLens: (lens: ChartLensMode) => void;
  className?: string;
}

interface LensItem {
  id: ChartLensMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  activeBadge: string;
}

const LENSES: LensItem[] = [
  {
    id: "all",
    label: "Full Matrix",
    icon: Compass,
    colorClass: "hover:text-brand-primary",
    activeBadge: "bg-brand-primary text-white shadow-sm border-brand-primary",
  },
  {
    id: "karma",
    label: "Karmic Tail",
    icon: ShieldAlert,
    colorClass: "hover:text-chart-karmic",
    activeBadge: "bg-chart-karmic text-white shadow-sm border-chart-karmic",
  },
  {
    id: "love",
    label: "Love Channel",
    icon: Heart,
    colorClass: "hover:text-chart-love",
    activeBadge: "bg-chart-love text-white shadow-sm border-chart-love",
  },
  {
    id: "wealth",
    label: "Wealth Key",
    icon: Coins,
    colorClass: "hover:text-chart-wealth",
    activeBadge: "bg-chart-wealth text-white shadow-sm border-chart-wealth",
  },
  {
    id: "talents",
    label: "Talents Triad",
    icon: Sparkles,
    colorClass: "hover:text-chart-spirit",
    activeBadge: "bg-chart-spirit text-white shadow-sm border-chart-spirit",
  },
  {
    id: "chakras",
    label: "7 Chakras",
    icon: Activity,
    colorClass: "hover:text-chart-core",
    activeBadge: "bg-chart-core text-white shadow-sm border-chart-core",
  },
  {
    id: "ancestral",
    label: "Ancestral Cross",
    icon: GitFork,
    colorClass: "hover:text-brand-secondary",
    activeBadge: "bg-brand-secondary text-white shadow-sm border-brand-secondary",
  },
];

export function ChartFocusLens({
  activeLens,
  onSelectLens,
  className = "",
}: ChartFocusLensProps) {
  return (
    <div className={`w-full max-w-[620px] flex flex-col items-center gap-1.5 ${className}`}>
      <div className="flex items-center justify-between w-full px-1 text-[11px] font-mono text-ink-muted">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
          Interactive Focus Lens:
        </span>
        <span className="hidden sm:inline">Isolate energetic channels on the octagram</span>
      </div>

      <div className="w-full flex items-center gap-1 p-1 bg-surface-raised/80 border border-border-strong rounded-xl backdrop-blur-md overflow-x-auto no-scrollbar shadow-inner">
        {LENSES.map((lens) => {
          const Icon = lens.icon;
          const isActive = activeLens === lens.id;
          return (
            <button
              key={lens.id}
              type="button"
              onClick={() => onSelectLens(lens.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 border ${
                isActive
                  ? lens.activeBadge
                  : `border-transparent text-ink-secondary bg-transparent ${lens.colorClass} hover:bg-surface`
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{lens.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

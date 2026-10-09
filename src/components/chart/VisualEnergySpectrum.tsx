"use client";

import React from "react";
import { Activity, Zap, Compass, Moon, Sun } from "lucide-react";
import { DestinyMatrix } from "@/lib/matrix-engine";

interface VisualEnergySpectrumProps {
  matrix: DestinyMatrix;
}

export function VisualEnergySpectrum({ matrix }: VisualEnergySpectrumProps) {
  // Calculate balanced ratios from matrix points
  const totalValue = matrix.points.reduce((acc, p) => acc + p.value, 0);
  const avgEnergy = Math.round((totalValue / (matrix.points.length || 1)) * 10) / 10;

  // Spirit (odd arcana) vs Matter (even arcana) representation
  const spiritPoints = matrix.points.filter((p) => p.value % 2 !== 0).length;
  const matterPoints = matrix.points.length - spiritPoints;
  const spiritPercent = Math.round((spiritPoints / matrix.points.length) * 100);
  const matterPercent = 100 - spiritPercent;

  // Yin vs Yang archetype estimation
  const yinPoints = matrix.points.filter((p) => [2, 3, 6, 9, 12, 14, 18, 20, 21].includes(p.value)).length;
  const yinPercent = Math.round((yinPoints / matrix.points.length) * 100);
  const yangPercent = 100 - yinPercent;

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-6 sm:p-7 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink-primary font-mono uppercase tracking-wider">
              Matrix Energy Distribution & Polarity
            </h3>
            <p className="text-xs text-ink-secondary">
              Energetic harmonic ratios across your 8-pointed octagram
            </p>
          </div>
        </div>
        <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-surface-raised border border-border-strong text-ink-primary font-semibold">
          Harmonic Mean: {avgEnergy}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Metric 1: Spirit vs Matter Axis */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-chart-spirit">
              <Zap className="w-3.5 h-3.5" />
              Spirit / Intuition ({spiritPercent}%)
            </span>
            <span className="flex items-center gap-1.5 font-medium text-chart-physical">
              Matter / Manifestation ({matterPercent}%)
              <Compass className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-surface-raised border border-border-subtle overflow-hidden flex">
            <div
              className="h-full bg-chart-spirit transition-all duration-700"
              style={{ width: `${spiritPercent}%` }}
              title={`Spirit plane: ${spiritPercent}%`}
            />
            <div
              className="h-full bg-chart-physical transition-all duration-700"
              style={{ width: `${matterPercent}%` }}
              title={`Matter plane: ${matterPercent}%`}
            />
          </div>

          <div className="flex justify-between text-[11px] text-ink-muted font-sans">
            <span>Higher Vision & Philosophy</span>
            <span>Grounding & Tangible Execution</span>
          </div>
        </div>

        {/* Metric 2: Yin vs Yang Polarity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-chart-love">
              <Moon className="w-3.5 h-3.5" />
              Yin / Receptive ({yinPercent}%)
            </span>
            <span className="flex items-center gap-1.5 font-medium text-brand-primary">
              Yang / Projective ({yangPercent}%)
              <Sun className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-surface-raised border border-border-subtle overflow-hidden flex">
            <div
              className="h-full bg-chart-love transition-all duration-700"
              style={{ width: `${yinPercent}%` }}
              title={`Yin Energy: ${yinPercent}%`}
            />
            <div
              className="h-full bg-brand-primary transition-all duration-700"
              style={{ width: `${yangPercent}%` }}
              title={`Yang Energy: ${yangPercent}%`}
            />
          </div>

          <div className="flex justify-between text-[11px] text-ink-muted font-sans">
            <span>Emotional Depth & Reflection</span>
            <span>Initiative & External Drive</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  Heart,
  Coins,
  ShieldAlert,
  Compass,
  User,
  Sliders,
  Smartphone,
  Monitor,
  Info,
} from "lucide-react";
import { calculateDestinyMatrix, MatrixPoint } from "@/lib/matrix-engine";
import { energiesData } from "@/lib/data/energies";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { DestinyChart } from "@/components/matrix-chart/DestinyChart";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function ChartDemoPage() {
  // Preset sample dates for quick interactive testing
  const samplePresets = [
    { label: "Aug 24, 1995 (Classic Archetype)", day: 24, month: 8, year: 1995, name: "Elena" },
    { label: "Feb 29, 2000 (Leap Year / Century)", day: 29, month: 2, year: 2000, name: "Marcus" },
    { label: "Dec 31, 1999 (Century Boundary)", day: 31, month: 12, year: 1999, name: "Sophia" },
    { label: "May 3, 2005 (Single Digits)", day: 3, month: 5, year: 2005, name: "Julian" },
  ];

  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const currentPreset = samplePresets[selectedPresetIdx];

  const matrix = calculateDestinyMatrix({
    day: currentPreset.day,
    month: currentPreset.month,
    year: currentPreset.year,
  });

  const [selectedPoint, setSelectedPoint] = useState<MatrixPoint>(
    matrix.points.find((p) => p.id === "comfortZone") || matrix.points[0]
  );
  const [showLabels, setShowLabels] = useState(true);
  const [simulatedMobileWidth, setSimulatedMobileWidth] = useState(false);

  // Format date display
  const formattedDate = new Date(
    currentPreset.year,
    currentPreset.month - 1,
    currentPreset.day
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const selectedEnergy = energiesData[selectedPoint.value] || energiesData[1];

  const handlePointSelect = (pt: MatrixPoint) => {
    setSelectedPoint(pt);
  };

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <SacredAuraBackground showGeometry intensity="subtle" />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-12">
        {/* Top Breadcrumb & Demo Mode Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink-primary transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span className="text-ink-muted text-xs">•</span>
              <Badge variant="brand" size="sm">
                Interactive Chart Demo
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink-primary tracking-tight">
              Destiny Matrix Octagram Visualization
            </h1>
          </div>

          {/* Sample Date Presets Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-ink-muted hidden md:inline">
              Sample Data:
            </span>
            <select
              value={selectedPresetIdx}
              onChange={(e) => {
                const idx = Number(e.target.value);
                setSelectedPresetIdx(idx);
                const nextMatrix = calculateDestinyMatrix({
                  day: samplePresets[idx].day,
                  month: samplePresets[idx].month,
                  year: samplePresets[idx].year,
                });
                setSelectedPoint(nextMatrix.points.find((p) => p.id === "comfortZone") || nextMatrix.points[0]);
              }}
              className="rounded-md border border-border-strong bg-surface px-3 py-1.5 text-xs font-medium text-ink-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            >
              {samplePresets.map((preset, idx) => (
                <option key={idx} value={idx}>
                  {preset.label}
                </option>
              ))}
            </select>

            {/* Simulated 375px Mobile Viewport Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSimulatedMobileWidth(!simulatedMobileWidth)}
              leftIcon={
                simulatedMobileWidth ? (
                  <Monitor className="w-3.5 h-3.5" />
                ) : (
                  <Smartphone className="w-3.5 h-3.5" />
                )
              }
            >
              {simulatedMobileWidth ? "Full Width" : "Simulate 375px"}
            </Button>
          </div>
        </div>

        {/* Chart Viewport Area (with simulated 375px container option) */}
        <div
          className={`mx-auto transition-all duration-300 ${
            simulatedMobileWidth
              ? "max-w-[375px] border-4 border-ink-primary/20 rounded-3xl p-3 bg-canvas shadow-elevation-high"
              : "w-full"
          }`}
        >
          {simulatedMobileWidth && (
            <div className="text-center py-2 mb-2 border-b border-border-subtle">
              <span className="text-[11px] font-mono font-semibold uppercase text-brand-primary">
                375px Mobile Screen Simulation
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: The Custom SVG Octagram Chart */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <DestinyChart
                matrix={matrix}
                selectedPointId={selectedPoint?.id}
                onSelectPoint={handlePointSelect}
                showLabels={showLabels}
                interactive={true}
              />

              {/* Chart Controls Footer */}
              <div className="mt-4 flex items-center justify-between w-full max-w-[580px] px-2 text-xs text-ink-muted">
                <span>
                  Date: <strong>{formattedDate}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowLabels(!showLabels)}
                  className="hover:text-ink-primary transition-colors underline"
                >
                  {showLabels ? "Hide Node Badges" : "Show Node Badges"}
                </button>
              </div>
            </div>

            {/* Right: Active Node Inspection Card on Desktop */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Interactive Node Inspector
                </span>
                <span className="text-xs text-ink-muted">Tap any node on chart</span>
              </div>

              {/* Selected Node Card */}
              <Card elevation="mid" className="border-t-4 border-t-brand-primary space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-xl font-bold text-white shadow-sm tabular-nums shrink-0"
                      style={{ backgroundColor: `hsl(var(--chart-${selectedPoint.zone}))` }}
                    >
                      {selectedPoint.value}
                    </div>
                    <div>
                      <Badge variant="chart" chartZone={selectedPoint.zone} size="sm">
                        {selectedPoint.label}
                      </Badge>
                      <h3 className="text-xl font-display font-medium text-ink-primary mt-1">
                        {selectedEnergy.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-ink-secondary italic leading-relaxed">
                  &ldquo;{selectedEnergy.tagline}&rdquo;
                </p>

                {/* Role in Destiny Matrix */}
                <div className="rounded-lg bg-surface-raised border border-border-subtle p-3 text-xs text-ink-secondary">
                  <strong className="text-ink-primary block mb-0.5">
                    Matrix Position Role:
                  </strong>
                  {selectedPoint.description || "Core energetic frequency for this quadrant."}
                </div>

                {/* Plus vs Minus Dual Breakdown */}
                <div className="space-y-2.5 pt-1">
                  <div className="rounded-md border border-status-success/25 bg-status-success/5 p-3 text-xs">
                    <span className="font-mono font-semibold uppercase text-status-success block mb-1">
                      + Resource Manifestation (Flow)
                    </span>
                    <ul className="text-ink-secondary space-y-1 list-disc list-inside">
                      {selectedEnergy.plus.slice(0, 2).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-md border border-status-error/25 bg-status-error/5 p-3 text-xs">
                    <span className="font-mono font-semibold uppercase text-status-error block mb-1">
                      - Shadow Trap (Blockage)
                    </span>
                    <ul className="text-ink-secondary space-y-1 list-disc list-inside">
                      {selectedEnergy.minus.slice(0, 2).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Love & Money Channel Insights */}
                <div className="border-t border-border-subtle pt-3 space-y-2 text-xs text-ink-secondary">
                  <div className="flex items-start gap-2">
                    <Heart className="w-3.5 h-3.5 text-chart-love shrink-0 mt-0.5" />
                    <p>
                      <strong>Love Gate: </strong>
                      {selectedEnergy.loveAdvice}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Coins className="w-3.5 h-3.5 text-chart-wealth shrink-0 mt-0.5" />
                    <p>
                      <strong>Money Gate: </strong>
                      {selectedEnergy.moneyAdvice}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Quick Jump to Chart Core Triads */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPoint(
                      matrix.points.find((p) => p.id === "karmicTailRoot") || matrix.points[0]
                    )
                  }
                  className="rounded-lg border border-border-strong bg-surface p-3 text-left hover:border-chart-karmic transition-colors"
                >
                  <span className="text-[10px] font-mono text-ink-muted uppercase block">
                    Karmic Tail
                  </span>
                  <span className="text-sm font-mono font-bold text-chart-karmic">
                    {matrix.karmicTail.points.join(" - ")}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedPoint(
                      matrix.points.find((p) => p.id === "comfortZone") || matrix.points[0]
                    )
                  }
                  className="rounded-lg border border-border-strong bg-surface p-3 text-left hover:border-brand-primary transition-colors"
                >
                  <span className="text-[10px] font-mono text-ink-muted uppercase block">
                    Comfort Zone
                  </span>
                  <span className="text-sm font-mono font-bold text-brand-primary">
                    Energy {matrix.points.find((p) => p.id === "comfortZone")?.value}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Written Interpretation Section (Linked from chart taps) */}
        <section id="full-readings-section" className="pt-8 border-t border-border-subtle space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary block mb-1">
              Full Written Interpretation
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
              Core Life Area Synthesis
            </h2>
            <p className="text-sm text-ink-secondary mt-1">
              Synthesized directly from the 24+ mathematical coordinates calculated for {formattedDate}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Life Purpose Card */}
            <Card elevation="low" className="p-6 border-t-4 border-t-chart-spirit space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="chart" chartZone="spirit" size="sm">
                  Personal Purpose (20–40)
                </Badge>
                <span className="font-mono text-base font-bold text-chart-spirit tabular-nums">
                  Energy {matrix.purposes.personal.total}
                </span>
              </div>
              <h3 className="text-lg font-display font-medium text-ink-primary">
                Soul & Ego Harmonization
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Formed by balancing your vertical Sky axis ({matrix.purposes.personal.sky}) with your
                horizontal Earth axis ({matrix.purposes.personal.earth}). Defines the central identity
                transition you master before age 40.
              </p>
            </Card>

            {/* Social Purpose Card */}
            <Card elevation="low" className="p-6 border-t-4 border-t-brand-primary space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="brand" size="sm">
                  Social Purpose (40–60)
                </Badge>
                <span className="font-mono text-base font-bold text-brand-primary tabular-nums">
                  Energy {matrix.purposes.social.total}
                </span>
              </div>
              <h3 className="text-lg font-display font-medium text-ink-primary">
                Ancestral & Community Service
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Formed by reconciling the male paternal lineage ({matrix.purposes.social.maleLine})
                with the female maternal lineage ({matrix.purposes.social.femaleLine}).
              </p>
            </Card>

            {/* Spiritual Purpose Card */}
            <Card elevation="low" className="p-6 border-t-4 border-t-chart-wealth space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="chart" chartZone="wealth" size="sm">
                  Spiritual Purpose (60+)
                </Badge>
                <span className="font-mono text-base font-bold text-chart-wealth tabular-nums">
                  Energy {matrix.purposes.spiritual.total}
                </span>
              </div>
              <h3 className="text-lg font-display font-medium text-ink-primary">
                Transcendent Legacy
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                The ultimate synthesis of personal integration ({matrix.purposes.personal.total}) and
                social realization ({matrix.purposes.social.total}), leaving an enduring mark.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

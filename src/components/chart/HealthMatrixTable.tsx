"use client";

import React, { useState } from "react";
import { HealthMatrix } from "@/lib/matrix-engine/types";
import { chakraMeanings } from "@/content/chakra-meanings";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Activity,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Heart,
  Flame,
  Zap,
} from "lucide-react";


interface HealthMatrixTableProps {
  healthMatrix: HealthMatrix;
}

export function HealthMatrixTable({ healthMatrix }: HealthMatrixTableProps) {
  const [expandedChakra, setExpandedChakra] = useState<string | null>(null);

  const toggleChakra = (chakraKey: string) => {
    setExpandedChakra((current) => (current === chakraKey ? null : chakraKey));
  };

  const getChakraColor = (chakraKey: string) => {
    switch (chakraKey) {
      case "Sahasrara":
        return {
          bg: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/25",
          dot: "bg-purple-500",
        };
      case "Ajna":
        return {
          bg: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/25",
          dot: "bg-indigo-500",
        };
      case "Vishuddha":
        return {
          bg: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
          dot: "bg-sky-500",
        };
      case "Anahata":
        return {
          bg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
          dot: "bg-emerald-500",
        };
      case "Manipura":
        return {
          bg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
          dot: "bg-amber-500",
        };
      case "Svadhisthana":
        return {
          bg: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/25",
          dot: "bg-orange-500",
        };
      case "Muladhara":
        return {
          bg: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25",
          dot: "bg-rose-500",
        };
      default:
        return {
          bg: "bg-brand-primary/10 text-brand-primary border-brand-primary/25",
          dot: "bg-brand-primary",
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm">
              7-Chakra Bio-Energetic Map
            </Badge>
            <span className="text-xs font-mono text-ink-muted">
              Physical &bull; Energy &bull; Emotions
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-semibold text-ink-primary mt-1">
            Chakra Health & Psychosomatic Matrix
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-ink-secondary bg-surface-raised px-3 py-1.5 rounded-lg border border-border-subtle self-start sm:self-auto">
          <Activity className="w-4 h-4 text-brand-primary" />
          <span>7 Energy Centers Computed</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-3xl">
        According to the Natalia Ladini methodology, your birth matrix maps directly across the 7 chakras.
        The <strong>Physical column</strong> reflects your earthly physical organs and bodily stamina;
        the <strong>Energy column</strong> represents spiritual and energetic inflow; and
        the <strong>Emotions column</strong> is the synthesized psychosomatic resonance where both planes meet.
      </p>

      {/* Holistic Framing Notice */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-status-info/5 border border-status-info/20 text-ink-secondary text-xs leading-relaxed">
        <Info className="w-4 h-4 text-status-info shrink-0 mt-0.5" />
        <div>
          <strong className="text-ink-primary font-semibold block mb-0.5">
            Holistic Psychosomatic Reference
          </strong>
          This calculation reflects subtle energetic patterns and emotional tendencies for self-awareness
          and mindful lifestyle balance. It does not replace professional medical diagnosis, clinical care, or treatment.
        </div>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-raised text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
                <th className="py-3 px-4">Chakra / Center</th>
                <th className="py-3 px-4 text-center">
                  <span className="inline-flex items-center gap-1">
                    <Flame className="w-3 h-3 text-brand-primary" />
                    Physical (Earth)
                  </span>
                </th>
                <th className="py-3 px-4 text-center">
                  <span className="inline-flex items-center gap-1">
                    <Zap className="w-3 h-3 text-chart-spirit" />
                    Energy (Sky)
                  </span>
                </th>
                <th className="py-3 px-4 text-center">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="w-3 h-3 text-chart-love" />
                    Emotions (Total)
                  </span>
                </th>
                <th className="py-3 px-4">Governed Organ Systems</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-xs">
              {healthMatrix.rows.map((row) => {
                const color = getChakraColor(row.chakra);
                const isExpanded = expandedChakra === row.chakra;
                const meaning = chakraMeanings[row.chakra];

                return (
                  <React.Fragment key={row.chakra}>
                    <tr
                      onClick={() => toggleChakra(row.chakra)}
                      className={`cursor-pointer transition-colors hover:bg-surface-raised/80 ${
                        isExpanded ? "bg-surface-raised" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4 font-medium text-ink-primary">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${color.dot}`} />
                          <div>
                            <span className="font-semibold block">{row.nameEn}</span>
                            <span className="text-[10px] text-ink-muted font-mono">
                              {row.order}. {row.sanskrit}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-sm font-bold text-ink-primary tabular-nums">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-canvas border border-border-subtle">
                          {row.physicalValue}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-sm font-bold text-chart-spirit tabular-nums">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-canvas border border-border-subtle">
                          {row.energyValue}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-sm font-bold text-chart-love tabular-nums">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-chart-love/10 border border-chart-love/25 text-chart-love font-extrabold">
                          {row.totalValue}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-ink-secondary max-w-xs truncate" title={row.systems}>
                        {row.systems}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          className="text-xs text-brand-primary hover:text-brand-primary-hover font-medium inline-flex items-center gap-1"
                          aria-label={`Toggle details for ${row.nameEn}`}
                        >
                          <span>{isExpanded ? "Hide" : "Explore"}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Psychosomatic Detail Row */}
                    {isExpanded && meaning && (
                      <tr className="bg-surface-raised/40">
                        <td colSpan={6} className="p-4 sm:p-6 border-t border-border-subtle animate-in fade-in duration-200">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="rounded-lg bg-surface border border-border-subtle p-4 space-y-2">
                              <span className="text-[11px] font-mono uppercase font-semibold text-brand-primary block">
                                Psychosomatic Theme
                              </span>
                              <p className="text-xs text-ink-secondary leading-relaxed">
                                {meaning.psychosomaticTheme}
                              </p>
                              <div className="pt-2 text-[11px] text-ink-muted">
                                <strong>Energy Synthesis:</strong> Energy {row.totalValue} harmonizes
                                physical bodily stamina ({row.physicalValue}) with higher intuitive inflow ({row.energyValue}).
                              </div>
                            </div>

                            <div className="rounded-lg bg-surface border border-border-subtle p-4 space-y-2">
                              <span className="text-[11px] font-mono uppercase font-semibold text-status-warning block">
                                Potential Imbalance Signals
                              </span>
                              <ul className="text-xs text-ink-secondary space-y-1 list-disc pl-4 leading-relaxed">
                                {meaning.imbalanceSigns.map((sign, idx) => (
                                  <li key={idx}>{sign}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="rounded-lg bg-surface border border-border-subtle p-4 space-y-2">
                              <span className="text-[11px] font-mono uppercase font-semibold text-status-success block">
                                Harmonization & Daily Balance
                              </span>
                              <ul className="text-xs text-ink-secondary space-y-1 list-disc pl-4 leading-relaxed">
                                {meaning.harmonizationPractices.map((practice, idx) => (
                                  <li key={idx}>{practice}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Total Vitality Row */}
              <tr className="bg-surface-raised font-semibold border-t-2 border-border-strong text-ink-primary">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-primary" />
                    <div>
                      <span className="font-display font-semibold block">Total Vitality Synthesis</span>
                      <span className="text-[10px] text-ink-muted font-mono font-normal">
                        Sum of all 7 Chakras (Reduced)
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 text-center font-mono text-base font-bold text-ink-primary tabular-nums">
                  <span className="inline-block px-3 py-1 rounded-md bg-canvas border border-border-subtle">
                    {healthMatrix.total.physical}
                  </span>
                </td>

                <td className="py-4 px-4 text-center font-mono text-base font-bold text-chart-spirit tabular-nums">
                  <span className="inline-block px-3 py-1 rounded-md bg-canvas border border-border-subtle">
                    {healthMatrix.total.energy}
                  </span>
                </td>

                <td className="py-4 px-4 text-center font-mono text-base font-bold text-chart-love tabular-nums">
                  <span className="inline-block px-3 py-1 rounded-md bg-chart-love/15 border border-chart-love/30 text-chart-love font-black">
                    {healthMatrix.total.total}
                  </span>
                </td>

                <td colSpan={2} className="py-4 px-4 text-xs text-ink-secondary font-normal">
                  Overall life energy equilibrium. High synthesis indicates resilient alignment between physical health and spiritual vitality.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Stacked Card View (< 768px) */}
      <div className="md:hidden space-y-3">
        {healthMatrix.rows.map((row) => {
          const color = getChakraColor(row.chakra);
          const isExpanded = expandedChakra === row.chakra;
          const meaning = chakraMeanings[row.chakra];

          return (
            <Card
              key={row.chakra}
              elevation="low"
              className="p-4 transition-all"
            >
              <div
                onClick={() => toggleChakra(row.chakra)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full shrink-0 ${color.dot}`} />
                  <div>
                    <h4 className="text-sm font-semibold text-ink-primary">
                      {row.nameEn}
                    </h4>
                    <span className="text-[10px] text-ink-muted font-mono">
                      {row.order}. {row.sanskrit}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold tabular-nums">
                    <span className="px-1.5 py-0.5 bg-canvas rounded border border-border-subtle text-ink-primary" title="Physical">
                      P: {row.physicalValue}
                    </span>
                    <span className="px-1.5 py-0.5 bg-canvas rounded border border-border-subtle text-chart-spirit" title="Energy">
                      E: {row.energyValue}
                    </span>
                    <span className="px-1.5 py-0.5 bg-chart-love/10 rounded border border-chart-love/25 text-chart-love font-black" title="Total">
                      T: {row.totalValue}
                    </span>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-ink-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ink-muted" />
                  )}
                </div>
              </div>

              <div className="mt-2 text-xs text-ink-muted">
                <span className="font-medium text-ink-secondary">Organs:</span> {row.systems}
              </div>

              {isExpanded && meaning && (
                <div className="mt-4 pt-4 border-t border-border-subtle space-y-3 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <strong className="text-[11px] font-mono uppercase text-brand-primary block">
                      Psychosomatic Theme
                    </strong>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      {meaning.psychosomaticTheme}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <strong className="text-[11px] font-mono uppercase text-status-warning block">
                      Imbalance Signals
                    </strong>
                    <ul className="text-xs text-ink-secondary space-y-1 list-disc pl-4">
                      {meaning.imbalanceSigns.map((sign, idx) => (
                        <li key={idx}>{sign}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <strong className="text-[11px] font-mono uppercase text-status-success block">
                      Harmonization
                    </strong>
                    <ul className="text-xs text-ink-secondary space-y-1 list-disc pl-4">
                      {meaning.harmonizationPractices.map((practice, idx) => (
                        <li key={idx}>{practice}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {/* Mobile Total Vitality Card */}
        <Card elevation="mid" className="p-4 bg-surface-raised border-2 border-border-strong space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <h4 className="text-sm font-display font-semibold text-ink-primary">
                Total Vitality Synthesis
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
            <div className="p-2 rounded bg-canvas border border-border-subtle">
              <span className="text-[10px] text-ink-muted uppercase block">Physical</span>
              <span className="text-base font-bold text-ink-primary">{healthMatrix.total.physical}</span>
            </div>
            <div className="p-2 rounded bg-canvas border border-border-subtle">
              <span className="text-[10px] text-ink-muted uppercase block">Energy</span>
              <span className="text-base font-bold text-chart-spirit">{healthMatrix.total.energy}</span>
            </div>
            <div className="p-2 rounded bg-chart-love/10 border border-chart-love/30">
              <span className="text-[10px] text-chart-love uppercase block">Total</span>
              <span className="text-base font-extrabold text-chart-love">{healthMatrix.total.total}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

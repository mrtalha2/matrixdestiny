"use client";

import React, { useState } from "react";
import { DestinyPurposes } from "@/lib/matrix-engine/types";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { purposeStagesInfo } from "@/content/purpose-meanings";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Milestone,
} from "lucide-react";


interface PurposeRoadmapSectionProps {
  purposes: DestinyPurposes;
  currentAge?: number;
}

export function PurposeRoadmapSection({
  purposes,
  currentAge = 25,
}: PurposeRoadmapSectionProps) {
  const [expandedStage, setExpandedStage] = useState<string | null>(
    currentAge < 40 ? "personal" : currentAge < 60 ? "social" : "spiritual"
  );

  const toggleStage = (stageKey: string) => {
    setExpandedStage((curr) => (curr === stageKey ? null : stageKey));
  };

  const personalArcana = arcanaMeanings[purposes.personal.total] || arcanaMeanings[1];
  const socialArcana = arcanaMeanings[purposes.social.total] || arcanaMeanings[1];
  const spiritualArcana = arcanaMeanings[purposes.spiritual.total] || arcanaMeanings[1];
  const planetaryArcana = arcanaMeanings[purposes.planetary.total] || arcanaMeanings[1];

  const stages = [
    {
      key: "personal" as const,
      stageNumber: "01",
      ageRange: "Ages 20 – 40",
      isCurrent: currentAge >= 20 && currentAge < 40,
      title: "Personal Purpose",
      arcanaValue: purposes.personal.total,
      arcanaName: personalArcana.name,
      formula: `Sky (${purposes.personal.sky}) + Earth (${purposes.personal.earth}) = ${purposes.personal.total}`,
      info: purposeStagesInfo.personal,
      borderTop: "border-t-brand-primary",
      badgeColor: "bg-brand-primary/10 text-brand-primary border-brand-primary/25",
    },
    {
      key: "social" as const,
      stageNumber: "02",
      ageRange: "Ages 40 – 60",
      isCurrent: currentAge >= 40 && currentAge < 60,
      title: "Social Purpose",
      arcanaValue: purposes.social.total,
      arcanaName: socialArcana.name,
      formula: `Male Line (${purposes.social.maleLine}) + Female Line (${purposes.social.femaleLine}) = ${purposes.social.total}`,
      info: purposeStagesInfo.social,
      borderTop: "border-t-chart-spirit",
      badgeColor: "bg-chart-spirit/10 text-chart-spirit border-chart-spirit/25",
    },
    {
      key: "spiritual" as const,
      stageNumber: "03",
      ageRange: "Ages 60+",
      isCurrent: currentAge >= 60,
      title: "Spiritual Integration",
      arcanaValue: purposes.spiritual.total,
      arcanaName: spiritualArcana.name,
      formula: `Personal (${purposes.personal.total}) + Social (${purposes.social.total}) = ${purposes.spiritual.total}`,
      info: purposeStagesInfo.spiritual,
      borderTop: "border-t-chart-wealth",
      badgeColor: "bg-chart-wealth/10 text-chart-wealth border-chart-wealth/25",
    },
    {
      key: "planetary" as const,
      stageNumber: "04",
      ageRange: "Lifelong Soul Mission",
      isCurrent: false,
      title: "Planetary Purpose",
      arcanaValue: purposes.planetary.total,
      arcanaName: planetaryArcana.name,
      formula: `Social (${purposes.social.total}) + Spiritual (${purposes.spiritual.total}) = ${purposes.planetary.total}`,
      info: purposeStagesInfo.planetary,
      borderTop: "border-t-chart-love",
      badgeColor: "bg-chart-love/10 text-chart-love border-chart-love/25",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm">
              4-Stage Chronology
            </Badge>
            <span className="text-xs font-mono text-ink-muted">
              Personal &bull; Social &bull; Spiritual &bull; Planetary
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-semibold text-ink-primary mt-1">
            Life Purpose Roadmap & Destiny Triads
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-ink-secondary bg-surface-raised px-3 py-1.5 rounded-lg border border-border-subtle self-start sm:self-auto">
          <Milestone className="w-4 h-4 text-brand-primary" />
          <span>Current Age: ~{currentAge} yrs</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-3xl">
        Your soul evolves in 4 distinct developmental seasons. Rather than a single static destiny, the matrix calculates
        precise arcanas for your youth and identity formation (20–40), your mature social contribution (40–60),
        your transcendent legacy (60+), and your overarching planetary contribution.
      </p>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stages.map((st) => {
          const isExpanded = expandedStage === st.key;

          return (
            <Card
              key={st.key}
              elevation={st.isCurrent ? "mid" : "low"}
              className={`p-6 border-t-4 ${st.borderTop} space-y-4 relative transition-all ${
                st.isCurrent ? "ring-2 ring-brand-primary/30 shadow-md" : ""
              }`}
            >
              {st.isCurrent && (
                <div className="absolute top-3 right-4">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-primary text-white px-2 py-0.5 rounded-full shadow-xs">
                    Active Era
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pr-14">
                <div>
                  <span className="text-[11px] font-mono font-semibold uppercase text-ink-muted block">
                    Stage {st.stageNumber} &bull; {st.ageRange}
                  </span>
                  <h4 className="text-xl font-display font-medium text-ink-primary mt-0.5">
                    {st.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-1 border-b border-border-subtle pb-3">
                <div>
                  <span className="text-xs text-ink-muted block font-medium">Archetype:</span>
                  <span className="text-base font-semibold text-ink-primary">
                    Arcana {st.arcanaValue}: {st.arcanaName}
                  </span>
                </div>
                <span className="font-mono text-2xl font-black text-ink-primary tabular-nums">
                  {st.arcanaValue}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {st.info.coreGuidance}
              </p>

              <div className="rounded-lg bg-surface-raised border border-border-subtle p-3 text-[11px] font-mono text-ink-muted">
                <strong>Formula:</strong> {st.formula}
              </div>

              {/* Expandable Milestones */}
              <div className="pt-2 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => toggleStage(st.key)}
                  className="text-xs text-brand-primary hover:text-brand-primary-hover font-medium flex items-center justify-between w-full"
                >
                  <span>{isExpanded ? "Hide Milestones" : "View Key Milestones & Directives"}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isExpanded && (
                  <div className="mt-3 p-3.5 rounded-lg bg-surface border border-border-subtle space-y-2 animate-in fade-in duration-200">
                    <span className="text-[11px] font-mono uppercase text-ink-primary font-semibold block">
                      Soul Development Milestones:
                    </span>
                    <ul className="space-y-1.5 text-xs text-ink-secondary">
                      {st.info.integrationMilestones.map((ms, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                          <span>{ms}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

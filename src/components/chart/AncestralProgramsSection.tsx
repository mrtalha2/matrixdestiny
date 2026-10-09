"use client";

import React, { useState } from "react";
import { AncestralLineageData, MatrixPoint } from "@/lib/matrix-engine/types";
import { arcanaMeanings } from "@/content/arcana-meanings";
import {
  defaultAncestralGuidance,
  getLineageArcanaGuidance,
} from "@/content/ancestral-meanings";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  GitBranch,
  Shield,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  Compass,
} from "lucide-react";


interface AncestralProgramsSectionProps {
  ancestralLineage: AncestralLineageData;
  pointsMap: Map<string, MatrixPoint>;
}

export function AncestralProgramsSection({
  ancestralLineage,
  pointsMap,
}: AncestralProgramsSectionProps) {
  const [showPaternalDetails, setShowPaternalDetails] = useState(false);
  const [showMaternalDetails, setShowMaternalDetails] = useState(false);

  const { paternal, maternal, socialPurpose } = ancestralLineage;

  const paternalTotalArcana = arcanaMeanings[paternal.total] || arcanaMeanings[1];
  const maternalTotalArcana = arcanaMeanings[maternal.total] || arcanaMeanings[1];
  const socialPurposeArcana = arcanaMeanings[socialPurpose] || arcanaMeanings[1];


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm">
              Generational Karma
            </Badge>
            <span className="text-xs font-mono text-ink-muted">
              Paternal &bull; Maternal &bull; Social Purpose
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-semibold text-ink-primary mt-1">
            Ancestral Lineage Programs & Clan Karma
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-ink-secondary bg-surface-raised px-3 py-1.5 rounded-lg border border-border-subtle self-start sm:self-auto">
          <GitBranch className="w-4 h-4 text-brand-primary" />
          <span>The Earth Square Diagonal</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-3xl">
        In the Destiny Matrix, the 45-degree tilted square (The Earth Square) represents the ancestral inheritance
        flowing from your father&rsquo;s and mother&rsquo;s bloodlines. Each lineage presents a <strong>Spiritual Task</strong> (values,
        worldview, ethics) and a <strong>Material Task</strong> (money, stamina, physical manifestation).
      </p>

      {/* Dual Card Layout: Father's Clan vs Mother's Clan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paternal Clan Card */}
        <Card elevation="low" className="p-6 border-t-4 border-t-chart-spirit space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-chart-spirit/15 flex items-center justify-center text-chart-spirit">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase text-chart-spirit block">
                  Father&rsquo;s Bloodline (Men&rsquo;s Line)
                </span>
                <h4 className="text-lg font-display font-medium text-ink-primary">
                  Paternal Ancestral Line
                </h4>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-ink-muted font-mono block">Male Clan Total</span>
              <span className="font-mono text-xl font-bold text-chart-spirit tabular-nums">
                Energy {paternal.total}
              </span>
            </div>
          </div>

          <p className="text-xs text-ink-secondary leading-relaxed">
            {defaultAncestralGuidance.paternalRole}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Spiritual Task (NW) */}
            <div className="p-3 rounded-lg bg-surface-raised border border-border-subtle space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-ink-muted font-semibold">
                  Spiritual Task (NW)
                </span>
                <span className="font-mono text-xs font-bold text-chart-spirit">
                  Energy {paternal.spiritual}
                </span>
              </div>
              <p className="text-[11px] text-ink-secondary leading-normal">
                {getLineageArcanaGuidance(paternal.spiritual, "paternal", "spiritual")}
              </p>
            </div>

            {/* Material Task (SW) */}
            <div className="p-3 rounded-lg bg-surface-raised border border-border-subtle space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-ink-muted font-semibold">
                  Material Task (SW)
                </span>
                <span className="font-mono text-xs font-bold text-chart-wealth">
                  Energy {paternal.material}
                </span>
              </div>
              <p className="text-[11px] text-ink-secondary leading-normal">
                {getLineageArcanaGuidance(paternal.material, "paternal", "material")}
              </p>
            </div>
          </div>

          {/* Expandable Paternal Insights */}
          <div className="pt-2 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setShowPaternalDetails(!showPaternalDetails)}
              className="text-xs text-brand-primary hover:text-brand-primary-hover font-medium flex items-center justify-between w-full"
            >
              <span>{showPaternalDetails ? "Hide Lineage Meaning" : "Explore Paternal Gift & Meaning"}</span>
              {showPaternalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showPaternalDetails && (
              <div className="mt-3 p-3.5 rounded-lg bg-surface border border-border-subtle text-xs space-y-2 animate-in fade-in duration-200">
                <strong className="text-ink-primary block font-semibold">
                  Arcana {paternal.total}: {paternalTotalArcana.name}
                </strong>
                <p className="text-ink-secondary leading-relaxed">
                  When you honor your father and resolve unconscious resistance to patriarchal authority,
                  Energy {paternal.total} unlocks immense willpower, decisive leadership, and sustained career stamina.
                </p>
                <div className="text-[11px] text-brand-primary">
                  <strong>Healing Assignment:</strong> Forgive any emotional absence, harshness, or unfulfilled expectations from male elders.
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Maternal Clan Card */}
        <Card elevation="low" className="p-6 border-t-4 border-t-chart-love space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-chart-love/15 flex items-center justify-center text-chart-love">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase text-chart-love block">
                  Mother&rsquo;s Bloodline (Women&rsquo;s Line)
                </span>
                <h4 className="text-lg font-display font-medium text-ink-primary">
                  Maternal Ancestral Line
                </h4>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-ink-muted font-mono block">Female Clan Total</span>
              <span className="font-mono text-xl font-bold text-chart-love tabular-nums">
                Energy {maternal.total}
              </span>
            </div>
          </div>

          <p className="text-xs text-ink-secondary leading-relaxed">
            {defaultAncestralGuidance.maternalRole}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Spiritual Task (NE) */}
            <div className="p-3 rounded-lg bg-surface-raised border border-border-subtle space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-ink-muted font-semibold">
                  Spiritual Task (NE)
                </span>
                <span className="font-mono text-xs font-bold text-chart-love">
                  Energy {maternal.spiritual}
                </span>
              </div>
              <p className="text-[11px] text-ink-secondary leading-normal">
                {getLineageArcanaGuidance(maternal.spiritual, "maternal", "spiritual")}
              </p>
            </div>

            {/* Material Task (SE) */}
            <div className="p-3 rounded-lg bg-surface-raised border border-border-subtle space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-ink-muted font-semibold">
                  Material Task (SE)
                </span>
                <span className="font-mono text-xs font-bold text-chart-wealth">
                  Energy {maternal.material}
                </span>
              </div>
              <p className="text-[11px] text-ink-secondary leading-normal">
                {getLineageArcanaGuidance(maternal.material, "maternal", "material")}
              </p>
            </div>
          </div>

          {/* Expandable Maternal Insights */}
          <div className="pt-2 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setShowMaternalDetails(!showMaternalDetails)}
              className="text-xs text-brand-primary hover:text-brand-primary-hover font-medium flex items-center justify-between w-full"
            >
              <span>{showMaternalDetails ? "Hide Lineage Meaning" : "Explore Maternal Gift & Meaning"}</span>
              {showMaternalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showMaternalDetails && (
              <div className="mt-3 p-3.5 rounded-lg bg-surface border border-border-subtle text-xs space-y-2 animate-in fade-in duration-200">
                <strong className="text-ink-primary block font-semibold">
                  Arcana {maternal.total}: {maternalTotalArcana.name}
                </strong>
                <p className="text-ink-secondary leading-relaxed">
                  When you reconcile with your mother and female ancestors, Energy {maternal.total} provides
                  deep emotional security, physical ease, intuitive receptivity, and harmonious family bonds.
                </p>
                <div className="text-[11px] text-chart-love">
                  <strong>Healing Assignment:</strong> Release subconscious patterns of female martyrdom, guilt, or fear of abandonment.
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Synthesis: Social Purpose (Ages 40-60) Banner */}
      <Card elevation="mid" className="p-6 bg-surface-raised border border-border-strong space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/15 flex items-center justify-center text-brand-primary">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase text-brand-primary block">
                Harmonization of Both Bloodlines
              </span>
              <h4 className="text-lg font-display font-medium text-ink-primary">
                Social Purpose Synthesis: Energy {socialPurpose} ({socialPurposeArcana.name})
              </h4>
            </div>
          </div>

          <div className="font-mono text-sm font-semibold text-ink-muted bg-canvas px-3 py-1.5 rounded-lg border border-border-subtle self-start sm:self-auto">
            Formula: Male ({paternal.total}) + Female ({maternal.total}) = {socialPurpose}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
          {defaultAncestralGuidance.socialPurposeGuidance}
        </p>

        <div className="p-3.5 rounded-lg bg-status-success/5 border border-status-success/20 text-xs text-status-success leading-relaxed">
          <strong>Legacy Directive:</strong> When you express Energy {socialPurpose}&rsquo;s highest qualities,
          you resolve generations of unresolved family tension and provide an enduring protective umbrella for your descendants.
        </div>
      </Card>
    </div>
  );
}

"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Baby,
  Sparkles,
  Heart,
  BookOpen,
  Shield,
  Lightbulb,
  Compass,
  ArrowRight,
  Smile,
  AlertCircle,
  HelpCircle,
  Eye,
} from "lucide-react";
import { DestinyChart } from "@/components/matrix-chart/DestinyChart";
import { calculateDestinyMatrix, DestinyMatrix } from "@/lib/matrix-engine";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/share/ShareButton";

interface ChildMatrixClientProps {
  initialDate?: string;
  initialName?: string;
}

export function ChildMatrixClient({
  initialDate = "2018-06-12",
  initialName = "Maya",
}: ChildMatrixClientProps) {
  const [childName, setChildName] = useState(initialName);
  const [birthDate, setBirthDate] = useState(initialDate);
  const [isPending, startTransition] = useTransition();

  // Parse YYYY-MM-DD
  const parseDate = (dStr: string) => {
    const parts = dStr.split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      return { year: parts[0], month: parts[1], day: parts[2] };
    }
    return { year: 2018, month: 6, day: 12 };
  };

  const matrix: DestinyMatrix = React.useMemo(() => {
    const birth = parseDate(birthDate);
    return calculateDestinyMatrix(birth);
  }, [birthDate]);

  // Key nodes for child analysis
  const centerNode = matrix.points.find((p) => p.id === "comfortZone");
  const dayNode = matrix.points.find((p) => p.id === "personality");
  const monthNode = matrix.points.find((p) => p.id === "spirit");
  const talentNode = matrix.points.find((p) => p.id === "spiritualTalent");
  const commNode = matrix.points.find((p) => p.id === "personalResource");
  const karmicRoot = matrix.points.find((p) => p.id === "karmicTailRoot");

  const centerArcana = centerNode ? arcanaMeanings[centerNode.value] : null;
  const dayArcana = dayNode ? arcanaMeanings[dayNode.value] : null;
  const monthArcana = monthNode ? arcanaMeanings[monthNode.value] : null;
  const talentArcana = talentNode ? arcanaMeanings[talentNode.value] : null;
  const karmicRootArcana = karmicRoot ? arcanaMeanings[karmicRoot.value] : null;

  return (
    <div className="w-full text-ink-primary">
      {/* Top Header Bar */}
      <section className="border-b border-border-subtle bg-surface/50 backdrop-blur-md sticky top-16 z-30 py-4 px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-chart-spirit/15 border border-chart-spirit/30 flex items-center justify-center text-chart-spirit">
              <Baby className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-medium tracking-tight">
                  {childName}&apos;s Child Matrix
                </h1>
                <Badge variant="brand" size="sm">
                  Parenting Guide
                </Badge>
              </div>
              <p className="text-xs text-ink-muted">
                Nurturing natural temperament, cognitive gifts & emotional safety
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShareButton
              title={`${childName}'s Child Destiny Matrix Blueprint`}
              text={`Explore ${childName}'s Matrix of Destiny parenting guide: natural gifts, emotional comfort zone, and communication temperament.`}
            />
          </div>
        </div>
      </section>

      <main className="site-container py-8 sm:py-12 space-y-12">
        {/* Child Birth-Date Form */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface shadow-card max-w-2xl mx-auto space-y-5">
          <div className="text-center space-y-1">
            <h2 className="font-display text-lg sm:text-xl font-medium text-ink-primary">
              Enter Your Child&apos;s Details
            </h2>
            <p className="text-xs text-ink-secondary">
              Calculate their developmental energy map with zero mysticism and non-judgmental guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                Child&apos;s First Name or Nickname
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Maya"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono"
              />
            </div>
          </div>
        </div>

        {/* Chart Visualization Card */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold">
              Energy Octagram
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-primary">
              {childName}&apos;s Innate Architectural Map
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Tap any node on the chart below to inspect its developmental meaning in childhood.
            </p>
          </div>

          <div className="p-4 sm:p-8 rounded-2xl border border-border-subtle bg-surface shadow-card flex justify-center">
            <div className="w-full max-w-3xl">
              <DestinyChart matrix={matrix} />
            </div>
          </div>
        </div>

        {/* 5 Core Parenting Pillars */}
        <section className="space-y-8">
          <div className="border-t border-border-subtle pt-10">
            <div className="max-w-2xl mx-auto text-center space-y-2 mb-10">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold">
                Developmental Pillars
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink-primary">
                How to Nurture {childName}&apos;s Nature
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary">
                Practical, psychological insights designed to help parents support autonomy, cultivate
                strengths, and avoid unintentional projection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1: Emotional Safety & Soul Comfort Zone */}
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-chart-core/15 flex items-center justify-center text-chart-core">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-medium text-ink-primary">
                      1. Emotional Comfort Zone & Recharge
                    </h4>
                    <span className="text-xs font-mono text-ink-muted">
                      Center Core: Arcana {centerNode?.value} ({centerArcana?.name})
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle space-y-2 text-xs">
                  <span className="font-semibold text-chart-core uppercase tracking-wider text-[10px] block">
                    What Makes {childName} Feel Safe
                  </span>
                  <p className="text-ink-secondary leading-relaxed">
                    {centerArcana?.personality.comfortZone}
                  </p>
                </div>
                <div className="space-y-2 text-xs text-ink-secondary">
                  <p className="font-medium text-ink-primary">Parenting Suggestion:</p>
                  <p className="leading-relaxed">
                    When {childName} is overtired or overwhelmed by school or social environments, avoid
                    demanding immediate explanations. Provide a quiet, low-stimulus space where they can
                    reconnect with their {centerArcana?.archetype.toLowerCase()} rhythm.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Natural Talents & Learning Spark */}
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-chart-talent/15 flex items-center justify-center text-chart-talent">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-medium text-ink-primary">
                      2. Natural Gifts & Learning Spark
                    </h4>
                    <span className="text-xs font-mono text-ink-muted">
                      Intuitive Talent: Arcana {talentNode?.value} ({talentArcana?.name})
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle space-y-2 text-xs">
                  <span className="font-semibold text-chart-talent uppercase tracking-wider text-[10px] block">
                    Primary Creative Inclination
                  </span>
                  <p className="text-ink-secondary leading-relaxed">
                    {talentArcana?.talents.primaryGift}
                  </p>
                </div>
                <div className="space-y-2 text-xs text-ink-secondary">
                  <p className="font-medium text-ink-primary">How to Stimulate Their Curiosity:</p>
                  <p className="leading-relaxed">
                    {talentArcana?.talents.activation} Encourage hands-on exploration without judging
                    early mistakes; their learning curve relies on playful curiosity rather than rigid drills.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Temperament & Communication */}
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-chart-physical/15 flex items-center justify-center text-chart-physical">
                    <Smile className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-medium text-ink-primary">
                      3. Temperament & Peer Interaction
                    </h4>
                    <span className="text-xs font-mono text-ink-muted">
                      Physical Portrait: Arcana {dayNode?.value} ({dayArcana?.name})
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle space-y-2 text-xs">
                  <span className="font-semibold text-chart-physical uppercase tracking-wider text-[10px] block">
                    Social Style in Class & Play
                  </span>
                  <p className="text-ink-secondary leading-relaxed">
                    {dayArcana?.personality.portrait}
                  </p>
                </div>
                <div className="space-y-2 text-xs text-ink-secondary">
                  <p className="font-medium text-ink-primary">Guidance on Social Boundaries:</p>
                  <p className="leading-relaxed">
                    Respect their natural pace. Whether they leap into group play as an initiator or prefer
                    observing from the perimeter before joining, validate their self-chosen rhythm without
                    comparing them to siblings or classmates.
                  </p>
                </div>
              </div>

              {/* Pillar 4: Sensitivities & Stress Triggers */}
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface shadow-card space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-chart-karmic/15 flex items-center justify-center text-chart-karmic">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-medium text-ink-primary">
                      4. Emotional Sensitivities under Pressure
                    </h4>
                    <span className="text-xs font-mono text-ink-muted">
                      Subconscious Trigger: Arcana {karmicRoot?.value} ({karmicRootArcana?.name})
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle space-y-2 text-xs">
                  <span className="font-semibold text-chart-karmic uppercase tracking-wider text-[10px] block">
                    Common Reaction to Frustration
                  </span>
                  <p className="text-ink-secondary leading-relaxed">
                    {karmicRootArcana?.personality.shadowTendency}
                  </p>
                </div>
                <div className="space-y-2 text-xs text-ink-secondary">
                  <p className="font-medium text-ink-primary">Parental Calming Strategy:</p>
                  <p className="leading-relaxed">
                    Help them name their emotion before enforcing discipline. Phrases like &ldquo;I see
                    you are feeling frustrated that this isn&apos;t working right away&rdquo; dissolve defensive
                    tantrums and teach emotional regulation.
                  </p>
                </div>
              </div>
            </div>

            {/* Full-width Card 5: The Parent's Reflection Guide (Avoiding Projection) */}
            <div className="mt-8 p-6 sm:p-8 rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-surface to-brand-primary/5 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-medium text-ink-primary">
                    The Parent&apos;s Sovereign Pledge: Supporting Without Projecting
                  </h4>
                  <p className="text-xs sm:text-sm text-ink-secondary mt-1">
                    Every child arrives with their own energetic blueprint. Our role as guardians is not
                    to mold them into an idealized replica of ourselves, but to serve as a steady anchor
                    while their authentic nature unfolds.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1.5">
                  <span className="text-xs font-bold font-mono text-brand-primary">1. Nurture Effort</span>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Praise perseverance, curiosity, and kindness rather than raw achievement or perfect scores.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1.5">
                  <span className="text-xs font-bold font-mono text-brand-primary">2. Model Boundaries</span>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Children absorb how parents regulate stress. Calm, steady emotional boundaries are far
                    more influential than spoken reprimands.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1.5">
                  <span className="text-xs font-bold font-mono text-brand-primary">3. Protect Autonomy</span>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Provide age-appropriate choices each day so {childName} develops confidence in their
                    own decision-making capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Soft Upsell / Next Steps */}
        <section className="p-8 rounded-3xl border border-border-subtle bg-surface text-center space-y-4">
          <h3 className="font-display text-xl sm:text-2xl font-medium text-ink-primary">
            Looking for More Insights?
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary max-w-xl mx-auto">
            Calculate your own Destiny Matrix to compare your parental energy with {childName}&apos;s,
            or explore the Relationship Compatibility tool to understand parent-child relational synergy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/">
              <Button variant="primary" size="sm">
                Calculate Adult Chart
              </Button>
            </Link>
            <Link href={`/compatibility?d1=${birthDate}&d2=1990-01-01&name1=${encodeURIComponent(childName)}&name2=Parent`}>
              <Button variant="outline" size="sm">
                Parent-Child Compatibility
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Explore Product Suite
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

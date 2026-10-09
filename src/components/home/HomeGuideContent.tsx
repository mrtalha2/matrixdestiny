"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Heart,
  Coins,
  ShieldAlert,
  Compass,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Users,
  Clock,
  Sparkle,
  Binary,
  Check,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function HomeGuideContent() {
  const scrollToCalculator = () => {
    const el = document.getElementById("calculator-hero");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const dayInput = document.getElementById("input-day");
      if (dayInput) {
        setTimeout(() => dayInput.focus(), 500);
      }
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-12 sm:py-16">
      {/* =========================================================================
          1. SECTION: IS A DESTINY MATRIX A PERSONALITY TEST?
          ========================================================================= */}
      <section aria-labelledby="personality-test-heading" className="site-container">
        <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-b from-surface to-surface-raised p-6 sm:p-10 shadow-elevation-subtle">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-mono font-medium text-brand-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Distinction</span>
            </div>

            <h2
              id="personality-test-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
            >
              Is a Destiny Matrix a personality test?
            </h2>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans mb-8">
              Not exactly. A personality test asks you questions and scores your answers. A Destiny
              Matrix works the other way: it starts from a fixed number — your birth date — and
              maps it onto a chart. Nothing about the chart changes based on how you answer anything,
              because you don&apos;t answer anything.
            </p>

            {/* Visual Contrast Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-border-subtle bg-surface/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-ink-muted text-xs font-mono uppercase tracking-wider mb-2">
                    <X className="w-4 h-4 text-status-warning" />
                    <span>Traditional Personality Tests</span>
                  </div>
                  <h3 className="text-base font-semibold text-ink-primary mb-2">
                    Questionnaire-Based Scoring
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Subject to conscious bias, mood variations, self-perception filters, and how you
                    wish to be seen on any given afternoon.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-brand-primary/30 bg-brand-primary/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-brand-primary text-xs font-mono uppercase tracking-wider mb-2">
                    <Check className="w-4 h-4 text-brand-primary" />
                    <span>The Destiny Matrix</span>
                  </div>
                  <h3 className="text-base font-semibold text-ink-primary mb-2">
                    Fixed Birth Date Octagram
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                    Unchanging sacred geometry calculated by modulo-22 mathematics. An objective diagnostic
                    mirror of your innate archetypal polarities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SECTION: WHAT IS THE DESTINY MATRIX?
          ========================================================================= */}
      <section aria-labelledby="what-is-heading" className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-raised border border-border-subtle text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
            <BookOpen className="w-3.5 h-3.5 text-brand-primary" />
            <span>Foundational Concept</span>
          </div>
          <h2
            id="what-is-heading"
            className="text-3xl sm:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
          >
            What Is the Destiny Matrix?
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            The Destiny Matrix is a chart built entirely from your date of birth. It converts the
            day, month, and year into a set of numbers, then places those numbers onto a diagram
            called an octagram, made up of 22 positions.
          </p>
        </div>

        {/* 4 Systems Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card elevation="low" className="p-5 sm:p-6 border border-border-subtle bg-surface">
            <div className="w-10 h-10 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4">
              <Binary className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-ink-primary mb-1.5">1. Numerology</h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              Pythagorean reduction of day, month, and year into foundational energetic coordinates.
            </p>
          </Card>

          <Card elevation="low" className="p-5 sm:p-6 border border-border-subtle bg-surface">
            <div className="w-10 h-10 rounded-lg bg-chart-spirit/10 border border-chart-spirit/20 flex items-center justify-center text-chart-spirit mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-ink-primary mb-1.5">2. Tarot Symbolism</h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              Each of the 22 positions maps directly onto the archetypes of the Major Arcana.
            </p>
          </Card>

          <Card elevation="low" className="p-5 sm:p-6 border border-border-subtle bg-surface">
            <div className="w-10 h-10 rounded-lg bg-chart-wealth/10 border border-chart-wealth/20 flex items-center justify-center text-chart-wealth mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-ink-primary mb-1.5">3. Kabbalah Tree</h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              Interconnected energetic conduits mirroring the sephirot structure of spiritual descent.
            </p>
          </Card>

          <Card elevation="low" className="p-5 sm:p-6 border border-border-subtle bg-surface">
            <div className="w-10 h-10 rounded-lg bg-chart-love/10 border border-chart-love/20 flex items-center justify-center text-chart-love mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-ink-primary mb-1.5">4. Seven-Chakra Model</h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              Bioenergetic mapping aligning physical health, emotional channels, and crown consciousness.
            </p>
          </Card>
        </div>

        <div className="p-4 sm:p-5 rounded-xl border border-border-subtle bg-surface-raised/50 text-xs sm:text-sm text-ink-secondary leading-relaxed">
          <span className="font-semibold text-ink-primary">Methodology Note:</span> The 22-energy
          matrix framework draws on four older systems — numerology, tarot symbolism, Kabbalah&apos;s
          tree-of-life structure, and the seven-chakra model — and combines them into a single chart
          rather than treating them separately. The modern geometric formulation was codified in 2006
          (popularized by Natalya Ladini) synthesizing ancient esoteric wisdom into an accessible psychological diagnostic map.
        </div>
      </section>

      {/* =========================================================================
          3. SECTION: WHAT THIS CHART CAN & CAN'T TELL YOU (Side-by-Side Comparison)
          ========================================================================= */}
      <section aria-labelledby="can-tell-heading" className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2
            id="can-tell-heading"
            className="text-3xl sm:text-4xl font-display font-normal text-ink-primary tracking-tight mb-3"
          >
            Realistic Boundaries of a Destiny Matrix
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
            Honest clarity on how to treat your chart: as a mirror for reflection, not a crystal ball.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* What it CAN tell you */}
          <div className="rounded-2xl border border-border-strong bg-surface p-6 sm:p-8 shadow-elevation-subtle flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-success/10 border border-status-success/20 text-xs font-semibold uppercase tracking-wider text-status-success mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>What This Chart Can Tell You</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-ink-primary mb-4">
                A Mirror for Subconscious Patterns
              </h3>
              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
                A Destiny Matrix reading can point to patterns: recurring relationship dynamics,
                tendencies around money and work, traits you may not think to name yourself. Many
                people find it useful the way they&apos;d find a well-written personality framework
                useful — as a mirror, not an instruction manual.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-border-subtle/70 text-xs sm:text-sm text-ink-secondary">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>Recurring relationship dynamics and instinctual attraction patterns</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>Subconscious tendencies around money, ambition, and work habits</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>Innate character gifts and unacknowledged behavioral blind spots</span>
              </div>
            </div>
          </div>

          {/* What it CAN'T tell you */}
          <div className="rounded-2xl border border-border-strong bg-surface p-6 sm:p-8 shadow-elevation-subtle flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-warning/10 border border-status-warning/20 text-xs font-semibold uppercase tracking-wider text-status-warning mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span>What This Chart Can&apos;t Tell You</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-ink-primary mb-4">
                Skepticism &amp; Ethical Boundaries
              </h3>
              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
                It can&apos;t predict specific events, diagnose health conditions, or replace
                financial or medical advice. If a reading tells you exactly what will happen on a
                certain date, or promises a specific outcome, treat that claim skeptically — that&apos;s
                a stronger claim than the method itself supports. Use it to think about your patterns,
                not to make decisions instead of thinking about them.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-border-subtle/70 text-xs sm:text-sm text-ink-secondary">
              <div className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-status-warning shrink-0 mt-0.5" />
                <span>Cannot predict deterministic future events or specific dates</span>
              </div>
              <div className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-status-warning shrink-0 mt-0.5" />
                <span>Cannot diagnose physical or psychological health conditions</span>
              </div>
              <div className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-status-warning shrink-0 mt-0.5" />
                <span>Does not replace financial, legal, medical, or life decision-making</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SECTION: HOW TO READ YOUR DESTINY MATRIX CHART
          ========================================================================= */}
      <section aria-labelledby="how-to-read-heading" className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-raised border border-border-subtle text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
            <Compass className="w-3.5 h-3.5 text-brand-primary" />
            <span>Reading Guide</span>
          </div>
          <h2
            id="how-to-read-heading"
            className="text-3xl sm:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
          >
            How to Read Your Destiny Matrix Chart
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            Understand how raw dates translate into archetypes, why every number is capped at 22,
            and what each coordinate position reveals.
          </p>
        </div>

        {/* Calculation Walkthrough Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* How the Numbers Are Calculated */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface">
            <h3 className="text-xl font-display font-semibold text-ink-primary mb-3">
              How the Numbers Are Calculated
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              Start with your full birth date written as day, month, year — for example,{" "}
              <strong className="text-ink-primary font-mono font-semibold">14.03.1994</strong>.
            </p>
            <div className="p-4 rounded-xl bg-surface-sunken border border-border-subtle space-y-2 mb-4 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink-muted">Sum all digits:</span>
                <span className="font-bold text-ink-primary">1+4+0+3+1+9+9+4 = 32</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-muted">Reduce if &gt; 22:</span>
                <span className="font-bold text-brand-primary">3 + 2 = 5</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-border-subtle/50 text-[11px] text-ink-muted">
                <span>Result:</span>
                <span>Arcana 5 sits at the center of your chart as your Core Energy.</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              The other 21 positions on the octagram are built the same way, using different
              combinations of your day, month, and year. Each combination produces a different
              number, and each number lands on a different position with a different meaning.
            </p>
          </div>

          {/* Why Every Number Reduces to 22 */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface">
            <h3 className="text-xl font-display font-semibold text-ink-primary mb-3">
              Why Every Number Reduces to 22
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              The chart never uses a number above 22, because there are only 22 Major Arcana cards to
              map onto. If a calculation produces a number over 22, it gets reduced by adding its
              digits together, the same way you reduced 32 down to 5 above.
            </p>
            <div className="p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/20 mb-4">
              <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-brand-primary mb-1">
                The Modulo-22 Principle
              </span>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                This is why two people with very different birth dates can still end up sharing a
                position — the reduction narrows every possible sum down to one of 22 archetypal outcomes.
              </p>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              Whether you are born on the 23rd (2+3=5) or calculated an intersection of 28 (2+8=10),
              every coordinate resolves into an accessible Major Arcana card.
            </p>
          </div>
        </div>

        {/* The Main Positions on the Octagram (Table) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-ink-primary">
              The Main Positions on the Octagram
            </h3>
            <span className="text-xs font-mono text-ink-muted uppercase">7 Core Anchors</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface shadow-elevation-subtle">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-raised/70">
                  <th className="py-3.5 px-4 sm:px-6 text-xs font-mono font-semibold uppercase tracking-wider text-ink-primary w-1/3 sm:w-1/4">
                    Position
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 text-xs font-mono font-semibold uppercase tracking-wider text-ink-primary">
                    What It Represents
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-sm">
                <tr className="hover:bg-surface-raised/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-ink-primary flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-primary shrink-0" />
                    <span>Core (center)</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-ink-secondary">
                    Your foundational energy — the trait everything else in the chart builds on
                  </td>
                </tr>
                <tr className="hover:bg-surface-raised/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-ink-primary flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-chart-spirit shrink-0" />
                    <span>Portrait</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-ink-secondary">
                    How other people tend to perceive you, which may differ from how you see yourself
                  </td>
                </tr>
                <tr className="hover:bg-surface-raised/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-ink-primary flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-chart-love shrink-0" />
                    <span>Love line</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-ink-secondary">
                    Relationship patterns and what you&apos;re drawn to in a partner
                  </td>
                </tr>
                <tr className="hover:bg-surface-raised/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-ink-primary flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-chart-wealth shrink-0" />
                    <span>Money line</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-ink-secondary">
                    Your relationship with work, ambition, and financial habits
                  </td>
                </tr>
                <tr className="hover:bg-surface-raised/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-ink-primary flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-chart-karmic shrink-0" />
                    <span>Karmic tail</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-ink-secondary">
                    Inherited patterns — tendencies that show up repeatedly without an obvious cause
                  </td>
                </tr>
                <tr className="hover:bg-surface-raised/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-ink-primary flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                    <span>Purpose (before 40)</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-ink-secondary">
                    What you&apos;re working toward internally in the first half of life
                  </td>
                </tr>
                <tr className="hover:bg-surface-raised/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-ink-primary flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                    <span>Purpose (after 40)</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-ink-secondary">
                    What you&apos;re oriented toward contributing externally in the second half
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* The Age Timeline & Reading in Practice */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Age Timeline */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted mb-3">
              <Calendar className="w-4 h-4 text-brand-primary" />
              <span>The Age Timeline (0–79)</span>
            </div>
            <h3 className="text-xl font-display font-semibold text-ink-primary mb-3">
              Lifecycle Periods Across the Octagram Edge
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              Along the outer edge of the chart, you&apos;ll see a scale running from age 0 to
              roughly age 79, broken into smaller bands. Each band is governed by a different position
              on the octagram, which is why certain years can feel dominated by a specific theme — a
              run of years focused on relationships, then a stretch focused on work, for example.
            </p>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              The timeline doesn&apos;t predict events. It shows which part of your chart is most
              active during that period of your life.
            </p>
          </div>

          {/* Reading in Practice */}
          <div className="p-6 sm:p-8 rounded-2xl border border-brand-primary/30 bg-gradient-to-b from-brand-primary/5 to-surface">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-primary mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Reading the Chart in Practice</span>
            </div>
            <h3 className="text-xl font-display font-semibold text-ink-primary mb-3">
              Connecting Positions in Synergy
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              A single number on its own tells you very little. The more useful approach is to read two
              or three positions together.
            </p>
            <div className="p-4 rounded-xl bg-surface border border-border-subtle text-xs sm:text-sm text-ink-secondary leading-relaxed mb-3">
              Say your love line and your karmic tail land on the same number. That&apos;s worth
              noticing — it suggests the pattern you keep repeating in relationships might trace back
              further than the relationships themselves. On its own, either number is just a data
              point. Together, they start to look like an explanation.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SECTION: DESTINY MATRIX COMPATIBILITY
          ========================================================================= */}
      <section aria-labelledby="compatibility-heading" className="site-container">
        <div className="rounded-2xl border border-border-strong bg-surface p-6 sm:p-10 shadow-elevation-subtle">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chart-love/10 border border-chart-love/20 text-xs font-mono font-medium text-chart-love mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Dual Chart Synastry</span>
            </div>
            <h2
              id="compatibility-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
            >
              Destiny Matrix Compatibility
            </h2>
            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans mb-4">
              A compatibility reading compares two people&apos;s charts against each other, rather
              than generating one chart from one birth date. It&apos;s a different calculation than
              astrology-based compatibility — it isn&apos;t comparing star signs or birth charts in
              the astrological sense, it&apos;s comparing the numeric positions each person&apos;s
              Destiny Matrix produces.
            </p>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-sans">
              To calculate compatibility, both people&apos;s birth dates are run through the same
              process described above, and the results are placed side by side. Overlapping numbers on
              certain positions — particularly the love line — are usually the first thing worth
              looking at, since they can point to shared instincts or, just as often, to friction over
              the same issue approached from opposite directions.
            </p>
          </div>

          {/* Example Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl border border-border-subtle bg-surface-raised/70">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted block mb-2">
                Real-World Example
              </span>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                If one partner&apos;s love line reduces to <strong className="text-ink-primary">7 (The Chariot)</strong> and
                the other&apos;s reduces to <strong className="text-ink-primary">16 (The Tower)</strong>, both are worth
                checking against the arcana meanings for those numbers rather than assuming a match or
                a mismatch from the numbers alone. A shared number isn&apos;t automatically &quot;good,&quot;
                and a different number isn&apos;t automatically &quot;bad&quot; — the value is in what each
                number describes, not whether they&apos;re identical.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border-subtle bg-surface-raised/70">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted block mb-2">
                Exact Birth Time Not Required
              </span>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-3">
                Does compatibility require an exact birth time? <strong>No.</strong> Compatibility
                works from date of birth alone, the same as the personal chart. Birth time and location
                can refine some calculators&apos; output, but they aren&apos;t required to generate a
                usable comparison.
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">
                This calculation works for romantic partners, parent &amp; child, siblings, or close friends.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border-subtle">
            <span className="text-xs sm:text-sm text-ink-muted">
              Compare two birth dates side-by-side with our dual-composite engine.
            </span>
            <Link href="/compatibility">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Calculate Compatibility
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECTION: THE LOVE LINE IN YOUR DESTINY MATRIX
          ========================================================================= */}
      <section aria-labelledby="love-line-heading" className="site-container">
        <div className="relative overflow-hidden rounded-2xl border border-chart-love/30 bg-gradient-to-br from-chart-love/5 via-surface to-surface p-6 sm:p-10 shadow-elevation-subtle">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chart-love/10 border border-chart-love/20 text-xs font-mono font-medium text-chart-love mb-4">
              <Heart className="w-3.5 h-3.5" />
              <span>Relationship Axis</span>
            </div>

            <h2
              id="love-line-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
            >
              The Love Line in Your Destiny Matrix
            </h2>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans mb-4">
              The love line is one specific position on the octagram, calculated from a particular
              combination of your birth date. It&apos;s the position most people check first, because
              it speaks directly to relationship patterns — what you&apos;re drawn to, what you tend to
              avoid, and what shows up again with different partners even when the relationship itself
              looks nothing like the last one.
            </p>

            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-sans mb-6">
              That last point is usually the reason people find their love line useful. It&apos;s
              rarely about any one relationship. It&apos;s about the thing that kept showing up across
              several of them — read alongside your karmic tail, as described above, it often points
              to where that pattern started.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/love-calculator">
                <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Explore Love Line Calculator
                </Button>
              </Link>
              <Link href="/karmic-tail-calculator">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Inspect Karmic Tail Roots
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. SECTION: ABOUT THIS CALCULATOR (Transparency, Privacy & Trust)
          ========================================================================= */}
      <section aria-labelledby="about-calculator-heading" className="site-container">
        <div className="rounded-2xl border border-border-subtle bg-surface p-6 sm:p-10 shadow-elevation-subtle">
          <div className="max-w-3xl mb-6">
            <h2
              id="about-calculator-heading"
              className="text-2xl sm:text-3xl font-display font-normal text-ink-primary tracking-tight mb-3"
            >
              About This Calculator
            </h2>
            <p className="text-base text-ink-secondary leading-relaxed mb-4">
              This calculator was built to give a complete, honest reading without gatekeeping the
              basic chart behind a paywall. The full chart, the compatibility comparison, and the
              explanations on this page are free to use as many times as you&apos;d like.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border-subtle text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle">
              <div className="flex items-center gap-2 font-semibold text-ink-primary mb-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span>Editorial &amp; Verification Team</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Reviewed and maintained by our computational numerology research group. Updated for the
                2026 Engine Edition with validated modulo-22 sacred geometry algorithms.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle">
              <div className="flex items-center gap-2 font-semibold text-ink-primary mb-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span>How Your Data Is Handled</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Your name and birth date are used only to generate the chart shown to you. Calculations
                run entirely client-side in your browser. Nothing is stored on our servers, no accounts
                are required, and no personal data is ever tracked or sold.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FINAL CTA: READY TO SEE YOUR CHART?
          ========================================================================= */}
      <section aria-labelledby="ready-cta-heading" className="site-container">
        <div className="relative overflow-hidden rounded-3xl border border-brand-primary/40 bg-gradient-to-b from-brand-primary/15 via-surface to-surface p-8 sm:p-12 text-center shadow-elevation-mid">
          <div className="absolute inset-0 bg-radial-gradient from-brand-primary/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-brand-primary/30 text-xs font-mono font-medium text-brand-primary mb-4 shadow-elevation-subtle">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Client-Side Calculation</span>
            </div>

            <h2
              id="ready-cta-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-ink-primary tracking-tight mb-4"
            >
              Ready to See Your Chart?
            </h2>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-8">
              Your Destiny Matrix is calculated the moment you enter your birth date — no account,
              no payment, no waiting.
            </p>

            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={scrollToCalculator}
              className="text-base font-semibold py-4 px-8 shadow-elevation-mid"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Calculate My Free Chart
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

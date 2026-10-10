"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Compass,
  Heart,
  Coins,
  ShieldAlert,
  Sparkles,
  User,
  Printer,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Quote,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Award,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { DestinyMatrix, MatrixPoint } from "@/lib/matrix-engine";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { calculateSovereignCurrent } from "@/lib/matrix-engine/sovereign-current";

import { DestinyChart } from "@/components/matrix-chart/DestinyChart";
import { VisualArchetypeHero } from "@/components/chart/VisualArchetypeHero";
import { VisualEnergySpectrum } from "@/components/chart/VisualEnergySpectrum";
import { SaveChartModal } from "@/components/chart/SaveChartModal";
import { ShareButton } from "@/components/share/ShareButton";
import { HealthMatrixTable } from "@/components/chart/HealthMatrixTable";
import { AncestralProgramsSection } from "@/components/chart/AncestralProgramsSection";
import { PurposeRoadmapSection } from "@/components/chart/PurposeRoadmapSection";
import { KarmicTailMicroCard } from "@/components/share/KarmicTailMicroCard";
import { PremiumDossierModal } from "@/components/chart/PremiumDossierModal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const MEETING_ENVIRONMENTS: Record<number, string> = {
  1: "Pioneering workshops, tech hackathons, startup hubs, or creative brainstorm events.",
  2: "Nature sanctuaries, wellness retreats, psychology seminars, or by water bodies.",
  3: "Art exhibitions, upscale design gatherings, garden parties, or luxury hospitality venues.",
  4: "Corporate summits, architecture or construction venues, finance meetings, or executive clubs.",
  5: "Universities, philosophical lectures, traditional ceremonies, libraries, or masterclasses.",
  6: "Beauty salons, fashion galas, aesthetic cafes, networking dinners, or matchmaking circles.",
  7: "Road trips, airports, fitness races, athletic tournaments, or high-speed commute hubs.",
  8: "Legal institutions, notary offices, contracts negotiation, or justice advocacy forums.",
  9: "Silent meditation retreats, ancient libraries, solo hiking trails, or academic archives.",
  10: "Spontaneous coincidences: missed flights, festival crowds, winning lotteries, or unexpected detours.",
  11: "Fitness centers, high-energy gyms, athletic bootcamps, or endurance challenge events.",
  12: "Volunteering initiatives, humanitarian projects, yoga studios, or alternative healing clinics.",
  13: "Life transformation workshops, major career transitions, hospital recovery, or crisis cleanups.",
  14: "Culinary cooking courses, tea ceremonies, watercolor studios, or tranquil spas.",
  15: "Vibrant nightlife, exclusive VIP lounges, high-stakes investments, or charismatic parties.",
  16: "Renovation sites, architectural marvels, sudden life shakeups, or spiritual rebuilding circles.",
  17: "Concert halls, stage performances, photography shoots, or creative talent showcases.",
  18: "Occult bookstores, evening twilight walks, moonlit gatherings, or dream-work circles.",
  19: "Sunny outdoor parks, children's celebrations, public festivals, or motivational conferences.",
  20: "Family reunions, ancestral heritage sites, genealogy archives, or court reconciliations.",
  21: "International airports, overseas travel, diplomatic summits, or multinational web communities.",
  22: "Backpacking hostels, spontaneous road journeys, comedy clubs, or radical freedom gatherings.",
};

interface ChartDashboardClientProps {
  matrix: DestinyMatrix;
  dateSlug: string;
  userName?: string | null;
  gender?: string | null;
}

export function ChartDashboardClient({
  matrix,
  dateSlug,
  userName,
  gender,
}: ChartDashboardClientProps) {
  const [selectedPointId, setSelectedPointId] = useState<string | null>("comfortZone");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personality: true,
    purpose: false,
    relationships: false,
    money: false,
    karma: false,
    talents: false,
  });

  const { day, month, year } = matrix.input;
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Points lookup
  const pointsMap = new Map<string, MatrixPoint>();
  matrix.points.forEach((p) => pointsMap.set(p.id, p));

  const centerPoint = pointsMap.get("comfortZone") || matrix.points[0];
  const dayPoint = pointsMap.get("personality") || matrix.points[0];
  const yearPoint = pointsMap.get("socialRealization") || matrix.points[0];

  const karmicRoot = pointsMap.get("karmicTailRoot") || matrix.points[0];
  const lovePoint = pointsMap.get("loveEntrance") || matrix.points[0];
  const moneyPoint = pointsMap.get("moneyEntrance") || matrix.points[0];

  const centerArcana = arcanaMeanings[centerPoint.value] || arcanaMeanings[1];
  const karmicArcana = arcanaMeanings[karmicRoot.value] || arcanaMeanings[1];
  const loveArcana = arcanaMeanings[lovePoint.value] || arcanaMeanings[1];
  const moneyArcana = arcanaMeanings[moneyPoint.value] || arcanaMeanings[1];

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingStory, setIsExportingStory] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  // Phase 3: The Sovereign Current Unifying Mythos
  const sovereignCurrent = calculateSovereignCurrent(
    dayPoint.value,
    centerPoint.value,
    karmicRoot.value
  );

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExportPdf = async () => {
    try {
      setIsExportingPdf(true);
      // Check if current page is in Arabic locale
      if (typeof window !== "undefined" && (document.documentElement.lang === "ar" || document.documentElement.dir === "rtl")) {
        alert(
          "ملاحظة: يجري حالياً تحسين تشكيل خطوط ملفات PDF المباشرة باللغة العربية. تم فتح نافذة الطباعة المباشرة لتصدير وحفظ التقرير بأعلى دقة وتنسيق متكامل."
        );
        window.print();
        return;
      }
      const { exportChartAsPdf } = await import("@/lib/utils/export-pdf");
      await exportChartAsPdf({
        matrix,
        dateSlug,
        userName,
      });
    } catch (err) {
      console.error("PDF export error:", err);
      // Graceful fallback to browser print dialog
      if (typeof window !== "undefined") {
        window.print();
      }
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportStory = async () => {
    try {
      setIsExportingStory(true);
      const { downloadOrShareStoryMode } = await import("@/lib/utils/export-story");
      const svgEl = document.querySelector("#matrix-chart-container svg") as SVGSVGElement | null;
      await downloadOrShareStoryMode({
        matrix,
        dateSlug,
        userName,
        svgElement: svgEl,
      });
    } catch (err) {
      console.error("Story export error:", err);
    } finally {
      setIsExportingStory(false);
    }
  };

  const [activeSection, setActiveSection] = useState<string>("section-personality");

  React.useEffect(() => {
    const sectionIds = [
      "section-personality",
      "section-purpose",
      "section-health",
      "section-relationships",
      "section-money",
      "section-ancestral",
      "section-karma",
      "section-talents",
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { label: "Personality", id: "section-personality" },
    { label: "Purpose", id: "section-purpose" },
    { label: "Health Map", id: "section-health" },
    { label: "Love & Match", id: "section-relationships" },
    { label: "Money & Career", id: "section-money" },
    { label: "Ancestral", id: "section-ancestral" },
    { label: "Karmic Tail", id: "section-karma" },
    { label: "Talent Triads", id: "section-talents" },
  ];

  return (
    <div className="space-y-12">
      {/* =========================================================================
          1. STICKY TOP SUMMARY & NAVIGATION BAR: Two-Tier Organized Architecture
          ========================================================================= */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 px-4 sm:px-6 lg:px-8 xl:px-12 bg-canvas/95 dark:bg-canvas/90 backdrop-blur-xl border-b border-border-subtle shadow-xs transition-all">
        <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto py-2.5 space-y-2">
          {/* Tier 1: User Identity & Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Left: Back Arrow + Chart Identity + Edit Link */}
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/"
                className="w-8 h-8 rounded-full border border-border-strong bg-surface hover:bg-surface-raised flex items-center justify-center text-ink-muted hover:text-ink-primary transition-colors shrink-0 shadow-xs"
                title="Recalculate or enter new date"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-sm sm:text-base font-display font-semibold text-ink-primary leading-tight truncate">
                    {userName ? `${userName}'s Destiny Matrix` : "Personal Destiny Matrix"}
                  </h1>
                  <Badge variant="brand" size="sm" className="font-mono text-[11px]">
                    {formattedDate}
                  </Badge>
                  {gender && gender !== "neutral" && (
                    <Badge variant="secondary" size="sm" className="font-mono text-[11px] capitalize">
                      {gender === "female" ? "♀ Yin Archetype" : "♂ Yang Archetype"}
                    </Badge>
                  )}
                </div>
                <div className="mt-0.5">
                  <Link
                    href="/"
                    className="text-[11px] text-brand-primary hover:text-brand-primary-hover underline font-medium inline-flex items-center gap-1"
                  >
                    Change birth date
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Global Action Buttons (Clean, responsive single row) */}
            <div className="flex items-center gap-1.5 sm:gap-2 justify-start sm:justify-end shrink-0 flex-wrap sm:flex-nowrap">
              {/* Save Chart */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSaveModalOpen(true)}
                leftIcon={<Bookmark className="w-3.5 h-3.5" />}
                className="text-xs h-8 px-2.5 sm:px-3"
              >
                Save
              </Button>

              {/* Story Mode 9:16 Export (Hidden on mobile for clean fit) */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportStory}
                isLoading={isExportingStory}
                leftIcon={<Smartphone className="w-3.5 h-3.5" />}
                className="text-xs h-8 px-2.5 sm:px-3 hidden md:inline-flex"
                title="Export 1080x1920 image for Instagram Story or TikTok"
              >
                {isExportingStory ? "Rendering..." : "Story (9:16)"}
              </Button>

              {/* Real Multi-Section Free PDF Export */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPdf}
                isLoading={isExportingPdf}
                leftIcon={<Printer className="w-3.5 h-3.5" />}
                className="text-xs h-8 px-2.5 sm:px-3"
              >
                {isExportingPdf ? "Exporting..." : "Free PDF"}
              </Button>

              {/* Native Share */}
              <ShareButton size="sm" />

              {/* Premium 40-Page Deep Dossier */}
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsPremiumModalOpen(true)}
                leftIcon={<Award className="w-3.5 h-3.5" />}
                className="bg-brand-primary hover:bg-brand-primary/90 text-white shadow-xs font-medium text-xs h-8 px-3 whitespace-nowrap"
              >
                40-Page Dossier
              </Button>
            </div>
          </div>

          {/* Tier 2: Dedicated Section Jump Navigation Strip */}
          <div className="pt-1.5 border-t border-border-subtle/70">
            <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-150 shrink-0 whitespace-nowrap shadow-xs ${
                      isActive
                        ? "bg-brand-primary text-white border border-brand-primary shadow-xs font-semibold"
                        : "border border-border-subtle bg-surface hover:bg-surface-raised hover:border-brand-primary/30 text-ink-secondary hover:text-ink-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* =========================================================================
          1. VISUAL ARCHETYPE HERO: Primary Sovereign Archetypes at a Glance
          ========================================================================= */}
      <VisualArchetypeHero
        centerPoint={centerPoint}
        dayPoint={dayPoint}
        karmicRoot={karmicRoot}
        lovePoint={lovePoint}
        moneyPoint={moneyPoint}
        formattedDate={formattedDate}
        userName={userName}
      />

      {/* =========================================================================
          2. THE INTERACTIVE DESTINY MATRIX CHART (Front & Center Visual Stage)
          ========================================================================= */}
      <section
        aria-labelledby="chart-section-title"
        className="relative overflow-hidden rounded-3xl border border-border-strong bg-gradient-to-b from-surface via-surface-raised/30 to-surface p-5 sm:p-8 lg:p-10 shadow-elevation-mid space-y-6"
      >
        {/* Subtle Ambient Cosmic Core Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,600px)] h-[min(90vw,600px)] bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-xs font-mono font-medium text-brand-primary uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Sacred Octagram</span>
          </div>
          <h2 id="chart-section-title" className="text-2xl sm:text-3xl font-display font-medium text-ink-primary tracking-tight">
            Your 22-Energy Octagram Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1 max-w-md mx-auto">
            Click or tap any node on the sacred geometry to highlight active channels and unveil its exact psychological reading.
          </p>
        </div>

        <div className="relative z-10">
          <DestinyChart
            matrix={matrix}
            selectedPointId={selectedPointId}
            onSelectPoint={(pt) => {
              setSelectedPointId(pt.id);
              if (pt.id === "comfortZone" || pt.id === "personality") {
                scrollToSection("section-personality");
              } else if (pt.id === "karmicTailRoot" || pt.id === "karmicTailInner" || pt.id === "karmicTailMiddle") {
                scrollToSection("section-karma");
              } else if (pt.id === "loveEntrance" || pt.id === "loveMoneyCenter") {
                scrollToSection("section-relationships");
              } else if (pt.id === "moneyEntrance" || pt.id === "socialRealizationInner" || pt.id === "socialRealization") {
                scrollToSection("section-money");
              }
            }}
            showLabels={true}
            interactive={true}
          />
        </div>
      </section>

      {/* =========================================================================
          3. VISUAL ENERGY SPECTRUM: Polarity, Spirit vs Matter & Harmonic Mean
          ========================================================================= */}
      <VisualEnergySpectrum matrix={matrix} />

      {/* =========================================================================
          4. THE SOVEREIGN CURRENT: Unifying Narrative Mythos (Phase 3 Core Concept)
          ========================================================================= */}
      <Card
        elevation="mid"
        className="border-l-4 border-l-chart-core bg-gradient-to-br from-surface to-surface-raised/60 p-6 sm:p-8 space-y-3"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-chart-core" />
            <span className="text-xs font-mono uppercase tracking-widest text-chart-core font-semibold">
              The Unifying Thread
            </span>
          </div>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-chart-core/10 text-chart-core border border-chart-core/25">
            Harmonic Core: Energy {sovereignCurrent.harmonicNumber}
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-display font-medium text-ink-primary">
            {sovereignCurrent.title}
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mt-2 font-serif italic">
            &ldquo;{sovereignCurrent.thesis}&rdquo;
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-surface border border-border-subtle text-xs text-ink-secondary leading-relaxed">
          <strong className="text-ink-primary block font-mono text-[11px] uppercase mb-1">
            Navigational Key:
          </strong>
          {sovereignCurrent.narrativeThread}
        </div>
      </Card>

      {/* =========================================================================
          5. "WHAT THIS MEANS FOR YOU": High-Value Synthesis Card
          ========================================================================= */}
      <Card
        elevation="mid"
        className="border-l-4 border-l-brand-primary bg-gradient-to-br from-surface to-surface-raised/50 p-6 sm:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary font-mono">
                Executive Synthesis
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
              What This Means For You
            </h2>
          </div>
          <span className="text-xs font-mono text-ink-muted">
            The 3 Sovereign Anchors for {formattedDate}
          </span>
        </div>

        {/* 3 Core Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Pillar 1: Soul Comfort Zone */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-chart-core/15 flex items-center justify-center font-mono text-xs font-bold text-chart-core">
                {centerPoint.value}
              </div>
              <h3 className="text-sm font-semibold text-ink-primary uppercase tracking-wide">
                1. Core Sanctuary
              </h3>
            </div>
            <h4 className="text-base font-display font-medium text-ink-primary">
              Energy {centerPoint.value}: {centerArcana.name}
            </h4>
            <p className="text-xs text-ink-secondary leading-relaxed font-sans">
              {centerArcana.personality.comfortZone}
            </p>
          </div>

          {/* Pillar 2: The Karmic Task */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-chart-karmic/15 flex items-center justify-center font-mono text-xs font-bold text-chart-karmic">
                {karmicRoot.value}
              </div>
              <h3 className="text-sm font-semibold text-ink-primary uppercase tracking-wide">
                2. Karmic Breakthrough
              </h3>
            </div>
            <h4 className="text-base font-display font-medium text-ink-primary">
              Energy {karmicRoot.value}: {karmicArcana.name}
            </h4>
            <p className="text-xs text-ink-secondary leading-relaxed font-sans">
              {karmicArcana.karmic.evolutionaryPath}
            </p>
          </div>

          {/* Pillar 3: Money & Partnership Junction */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-chart-wealth/15 flex items-center justify-center font-mono text-xs font-bold text-chart-wealth">
                {moneyPoint.value}
              </div>
              <h3 className="text-sm font-semibold text-ink-primary uppercase tracking-wide">
                3. Financial Catalyst
              </h3>
            </div>
            <h4 className="text-base font-display font-medium text-ink-primary">
              Energy {moneyPoint.value}: {moneyArcana.name}
            </h4>
            <p className="text-xs text-ink-secondary leading-relaxed font-sans">
              {moneyArcana.money.financialMindset}
            </p>
          </div>
        </div>
      </Card>

      {/* =========================================================================
          4. WRITTEN INTERPRETATION SECTIONS (Structured, Hierarchical, Expandable)
          ========================================================================= */}
      <div className="space-y-10 pt-6">
        {/* ---------------------------------------------------------------------
            SECTION 1: Personality & Core Identity
            --------------------------------------------------------------------- */}
        <section id="section-personality" className="space-y-6 pt-4 border-t border-border-subtle scroll-mt-36">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-chart-core/15 flex items-center justify-center text-chart-core">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-chart-core block">
                  Pillar 01
                </span>
                <h2 className="text-2xl font-display font-medium text-ink-primary">
                  Personality & Core Soul Battery
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleSection("personality")}
              className="text-xs text-ink-muted hover:text-ink-primary flex items-center gap-1 font-medium"
            >
              <span>{expandedSections.personality ? "Collapse" : "Expand"}</span>
              {expandedSections.personality ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Center Comfort Zone */}
            <Card elevation="low" className="p-6 border-t-4 border-t-chart-core space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="chart" chartZone="core" size="sm">
                  Center Node • Soul Comfort
                </Badge>
                <span className="font-mono text-xl font-bold text-chart-core tabular-nums">
                  Energy {centerPoint.value}
                </span>
              </div>
              <h3 className="text-xl font-display font-medium text-ink-primary">
                {centerArcana.name} &mdash; The Core Battery
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {centerArcana.essence}
              </p>

              {/* Pull Quote */}
              <div className="rounded-lg bg-surface-raised border border-border-subtle p-3.5 flex items-start gap-2.5">
                <Quote className="w-4 h-4 text-chart-core shrink-0 mt-0.5" />
                <p className="text-xs italic text-ink-primary font-display font-medium leading-relaxed">
                  &ldquo;{centerArcana.pullQuote}&rdquo;
                </p>
              </div>

              {expandedSections.personality && (
                <div className="space-y-3 pt-2 text-xs border-t border-border-subtle animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <strong className="text-ink-primary block font-semibold">How to Recharge:</strong>
                    <p className="text-ink-secondary leading-relaxed">{centerArcana.personality.comfortZone}</p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-status-error block font-semibold">Subtle Shadow Trap:</strong>
                    <p className="text-ink-secondary leading-relaxed">{centerArcana.personality.shadowTendency}</p>
                  </div>
                </div>
              )}
            </Card>

            {/* Day Persona (Outer Mask) */}
            <Card elevation="low" className="p-6 border-t-4 border-t-chart-physical space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="chart" chartZone="physical" size="sm">
                  Left Vertex • Day Persona
                </Badge>
                <span className="font-mono text-xl font-bold text-chart-physical tabular-nums">
                  Energy {dayPoint.value}
                </span>
              </div>
              <h3 className="text-xl font-display font-medium text-ink-primary">
                {arcanaMeanings[dayPoint.value]?.name} &mdash; Your Outer Presence
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {arcanaMeanings[dayPoint.value]?.personality.portrait}
              </p>

              <div className="rounded-lg bg-surface-raised border border-border-subtle p-3.5 text-xs space-y-1.5">
                <strong className="text-ink-primary block font-semibold">First Impression & Physical Body:</strong>
                <p className="text-ink-secondary leading-relaxed">
                  Calculated directly from day {day}. It shapes how you initiate action and enter unfamiliar rooms.
                </p>
              </div>

              {expandedSections.personality && (
                <div className="space-y-2 pt-2 text-xs border-t border-border-subtle animate-in fade-in duration-200">
                  <strong className="text-status-success block font-semibold">Archetypal Expression:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {arcanaMeanings[dayPoint.value]?.keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-surface-raised border border-border-subtle text-[11px] font-medium text-ink-primary">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </section>

        {/* ---------------------------------------------------------------------
            SECTION 2: 4-Stage Life Purpose Roadmap
            --------------------------------------------------------------------- */}
        <section id="section-purpose" className="space-y-6 pt-4 border-t border-border-subtle scroll-mt-36">
          <PurposeRoadmapSection
            purposes={matrix.purposes}
            currentAge={matrix.currentAge}
          />
        </section>

        {/* ---------------------------------------------------------------------
            SECTION 3: 7-Chakra Health & Psychosomatic Matrix
            --------------------------------------------------------------------- */}
        <section id="section-health" className="space-y-6 pt-4 border-t border-border-subtle scroll-mt-36">
          <HealthMatrixTable healthMatrix={matrix.healthMatrix} />
        </section>


        {/* ---------------------------------------------------------------------
            SECTION 4: Love & Relationships Channel
            --------------------------------------------------------------------- */}
        <section id="section-relationships" className="space-y-6 pt-4 border-t border-border-subtle scroll-mt-36">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-chart-love/15 flex items-center justify-center text-chart-love">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-chart-love block">
                  Pillar 04
                </span>
                <h2 className="text-2xl font-display font-medium text-ink-primary">
                  Relationships & The Love Gateway

                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleSection("relationships")}
              className="text-xs text-ink-muted hover:text-ink-primary flex items-center gap-1 font-medium"
            >
              <span>{expandedSections.relationships ? "Collapse" : "Expand"}</span>
              {expandedSections.relationships ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative overflow-hidden rounded-2xl border border-chart-love/30 bg-gradient-to-r from-surface via-surface to-chart-love/10 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-8 p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="chart" chartZone="love" size="sm">
                    Soul Connection Archetype
                  </Badge>
                  <span className="text-xs font-mono text-ink-muted">Energy {lovePoint.value} • {loveArcana.name}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-medium text-ink-primary">
                  The Sacred Union & Heart Channel
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-xl">
                  {loveArcana.relationships.partnerProfile}
                </p>
              </div>
              <div className="md:col-span-4 relative h-40 md:h-full min-h-[160px]">
                <Image
                  src="/images/calculators/love-union.webp"
                  alt="Love and Sacred Union Archetype"
                  fill
                  className="object-cover object-center opacity-85 hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card elevation="low" className="p-6 border-t-4 border-t-chart-love space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="chart" chartZone="love" size="sm">
                  Love Entrance Gate
                </Badge>
                <span className="font-mono text-xl font-bold text-chart-love tabular-nums">
                  Energy {lovePoint.value}
                </span>
              </div>
              <h3 className="text-xl font-display font-medium text-ink-primary">
                {loveArcana.name} &mdash; Ideal Partner Archetype
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {loveArcana.relationships.partnerProfile}
              </p>

              <div className="rounded-lg bg-surface-raised border border-border-subtle p-3.5 text-xs space-y-1">
                <strong className="text-ink-primary block font-semibold">Primary Relationship Dynamic:</strong>
                <p className="text-ink-secondary leading-relaxed">{loveArcana.relationships.dynamics}</p>
              </div>

              <div className="rounded-lg bg-surface-raised border border-border-subtle p-3.5 text-xs space-y-1">
                <strong className="text-chart-love block font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Natural Encounter Arenas:
                </strong>
                <p className="text-ink-secondary leading-relaxed">
                  {MEETING_ENVIRONMENTS[lovePoint.value] || "Collaborative projects, journeys, or educational circles."}
                </p>
              </div>

              {expandedSections.relationships && (
                <div className="space-y-2 pt-2 text-xs border-t border-border-subtle animate-in fade-in duration-200">
                  <strong className="text-status-warning block font-semibold">Subconscious Growth Edge:</strong>
                  <p className="text-ink-secondary leading-relaxed">{loveArcana.relationships.growthArea}</p>
                </div>
              )}
            </Card>

            <Card elevation="low" className="p-6 border-t-4 border-t-chart-love space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="chart" chartZone="love" size="sm">
                  Heart Center (Anahata Junction)
                </Badge>
                <span className="font-mono text-xl font-bold text-chart-love tabular-nums">
                  Energy {pointsMap.get("loveMoneyCenter")?.value}
                </span>
              </div>
              <h3 className="text-xl font-display font-medium text-ink-primary">
                Where Romantic Trust Meets Cash Flow
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                In the Destiny Matrix, the Love and Wealth channels cross at the Anahata node. When you
                hold emotional resentment or secrecy in partnership, financial flow constricts.
              </p>

              <div className="rounded-lg bg-status-success/5 border border-status-success/20 p-3.5 text-xs text-status-success">
                <strong>Empowerment Key:</strong> Maintaining radical transparency and emotional safety
                with your partner directly unblocks your capacity to receive worldly wealth.
              </div>
            </Card>
          </div>
        </section>

        {/* ---------------------------------------------------------------------
            SECTION 5: Wealth & Career Realization
            --------------------------------------------------------------------- */}
        <section id="section-money" className="space-y-6 pt-4 border-t border-border-subtle scroll-mt-36">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-chart-wealth/15 flex items-center justify-center text-chart-wealth">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-chart-wealth block">
                  Pillar 05
                </span>
                <h2 className="text-2xl font-display font-medium text-ink-primary">
                  Wealth Channel & Career Realization

                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleSection("money")}
              className="text-xs text-ink-muted hover:text-ink-primary flex items-center gap-1 font-medium"
            >
              <span>{expandedSections.money ? "Collapse" : "Expand"}</span>
              {expandedSections.money ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative overflow-hidden rounded-2xl border border-chart-wealth/30 bg-gradient-to-r from-surface via-surface to-chart-wealth/10 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-8 p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="chart" chartZone="wealth" size="sm">
                    Abundance Archetype
                  </Badge>
                  <span className="text-xs font-mono text-ink-muted">Energy {moneyPoint.value} • {moneyArcana.name}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-medium text-ink-primary">
                  The Wealth Channel & Abundance Gate
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-xl">
                  {moneyArcana.money.financialMindset}
                </p>
              </div>
              <div className="md:col-span-4 relative h-40 md:h-full min-h-[160px]">
                <Image
                  src="/images/calculators/money-abundance.webp"
                  alt="Abundance and Wealth Channel Archetype"
                  fill
                  className="object-cover object-center opacity-85 hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card elevation="low" className="p-6 border-t-4 border-t-chart-wealth space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="chart" chartZone="wealth" size="sm">
                  Money Entrance Key
                </Badge>
                <span className="font-mono text-xl font-bold text-chart-wealth tabular-nums">
                  Energy {moneyPoint.value}
                </span>
              </div>
              <h3 className="text-xl font-display font-medium text-ink-primary">
                {moneyArcana.name} &mdash; High-Leverage Career Gates
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {moneyArcana.money.careerPath}
              </p>

              <div className="rounded-lg bg-surface-raised border border-border-subtle p-3.5 text-xs space-y-1">
                <strong className="text-ink-primary block font-semibold">Wealth Manifestation Mindset:</strong>
                <p className="text-ink-secondary leading-relaxed">{moneyArcana.money.financialMindset}</p>
              </div>

              <div className="rounded-lg bg-status-error/5 border border-status-error/20 p-3.5 text-xs space-y-1">
                <strong className="text-status-error block font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  The Money Anti-Trigger:
                </strong>
                <p className="text-ink-secondary leading-relaxed">
                  {moneyArcana.money.potentialBlock}
                </p>
              </div>

              {expandedSections.money && (
                <div className="space-y-2 pt-2 text-xs border-t border-border-subtle animate-in fade-in duration-200">
                  <strong className="text-status-error block font-semibold">Unconscious Financial Block:</strong>
                  <p className="text-ink-secondary leading-relaxed">{moneyArcana.money.potentialBlock}</p>
                </div>
              )}
            </Card>

            <Card elevation="low" className="p-6 border-t-4 border-t-chart-wealth space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="chart" chartZone="wealth" size="sm">
                  Right Vertex • Year Energy
                </Badge>
                <span className="font-mono text-xl font-bold text-chart-wealth tabular-nums">
                  Energy {yearPoint.value}
                </span>
              </div>
              <h3 className="text-xl font-display font-medium text-ink-primary">
                {arcanaMeanings[yearPoint.value]?.name} &mdash; Societal Standing
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Calculated from the year of birth {year}. Represents your material fruits, the social status
                you attain in mature adulthood, and what you leave behind in physical infrastructure.
              </p>

              <div className="rounded-lg bg-surface-raised border border-border-subtle p-3.5 text-xs space-y-1">
                <strong className="text-ink-primary block font-semibold">Professional Calling:</strong>
                <p className="text-ink-secondary leading-relaxed">
                  Align your core trade with Energy {yearPoint.value}&rsquo;s highest octave to unlock financial stability.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* ---------------------------------------------------------------------
            SECTION 6: Ancestral Lineages & Clan Karma
            --------------------------------------------------------------------- */}
        <section id="section-ancestral" className="space-y-6 pt-4 border-t border-border-subtle scroll-mt-36">
          <AncestralProgramsSection
            ancestralLineage={matrix.ancestralLineage}
            pointsMap={pointsMap}
          />
        </section>

        {/* ---------------------------------------------------------------------
            SECTION 7: The Karmic Tail & Subconscious Traps
            --------------------------------------------------------------------- */}
        <section id="section-karma" className="space-y-6 pt-4 border-t border-border-subtle scroll-mt-36">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-chart-karmic/15 flex items-center justify-center text-chart-karmic">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-chart-karmic block">
                  Pillar 07
                </span>
                <h2 className="text-2xl font-display font-medium text-ink-primary">
                  The Karmic Tail & Subconscious Traps

                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleSection("karma")}
              className="text-xs text-ink-muted hover:text-ink-primary flex items-center gap-1 font-medium"
            >
              <span>{expandedSections.karma ? "Collapse" : "Expand"}</span>
              {expandedSections.karma ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative overflow-hidden rounded-2xl border border-chart-karmic/30 bg-gradient-to-r from-surface via-surface to-chart-karmic/10 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-8 p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="chart" chartZone="karmic" size="sm">
                    Karmic Transformation Triad
                  </Badge>
                  <span className="text-xs font-mono text-ink-muted">Tail: {matrix.karmicTail.points.join(" - ")}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-medium text-ink-primary">
                  {matrix.karmicTail.name || "The Evolutionary Karmic Code"}
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-xl">
                  {matrix.karmicTail.pastLifeStory || "Transmuting subconscious ancestral and past-life burdens into sovereign spiritual mastery."}
                </p>
              </div>
              <div className="md:col-span-4 relative h-40 md:h-full min-h-[160px]">
                <Image
                  src="/images/calculators/karmic-rebirth.webp"
                  alt="Karmic Rebirth Archetype"
                  fill
                  className="object-cover object-center opacity-85 hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <Card elevation="mid" className="p-6 border-t-4 border-t-chart-karmic space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-chart-karmic font-semibold">
                  Recognized Karmic Signature
                </span>
                <h3 className="text-xl font-display font-medium text-ink-primary mt-0.5">
                  {matrix.karmicTail.name || "Custom Karmic Triad"}
                </h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-base font-bold text-chart-karmic tabular-nums bg-chart-karmic/10 px-3.5 py-1.5 rounded-lg border border-chart-karmic/25">
                <span>{matrix.karmicTail.points[0]}</span>
                <span>&bull;</span>
                <span>{matrix.karmicTail.points[1]}</span>
                <span>&bull;</span>
                <span>{matrix.karmicTail.points[2]}</span>
              </div>
            </div>

            <p className="text-sm text-ink-secondary leading-relaxed font-sans">
              The Karmic Tail represents a 3-energy triad at the bottom of your octagram that begins life
              in the &ldquo;Minus&rdquo; (subconscious shadow). It explains why you may encounter the same
              emotional stumbling blocks across different jobs, cities, and relationships until conscious integration.
            </p>

            {/* Past-Life Origin & Narrative */}
            {matrix.karmicTail.pastLifeStory && (
              <div className="rounded-xl border border-chart-karmic/25 bg-chart-karmic/5 p-4 space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase text-chart-karmic block">
                  Past-Life Dilemma & Origin
                </span>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {matrix.karmicTail.pastLifeStory}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="rounded-lg border border-status-error/25 bg-status-error/5 p-4 space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase text-status-error block">
                  The Recursive Trap (Minus)
                </span>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  {matrix.karmicTail.currentLifeTrap || karmicArcana.karmic.pastLesson}
                </p>
              </div>

              <div className="rounded-lg border border-status-success/25 bg-status-success/5 p-4 space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase text-status-success block">
                  The Evolutionary Unlock (Plus)
                </span>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  {karmicArcana.karmic.evolutionaryPath}
                </p>
              </div>
            </div>

            {/* 4-Step Actionable Transmutation Recommendations */}
            {matrix.karmicTail.healingRecommendations && matrix.karmicTail.healingRecommendations.length > 0 && (
              <div className="rounded-xl border border-border-subtle bg-surface-raised p-4 space-y-2">
                <span className="text-xs font-mono font-semibold uppercase text-brand-primary block">
                  Actionable Transmutation Protocol
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-secondary">
                  {matrix.karmicTail.healingRecommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Share My Karmic Tail Micro-Card (Phase 2 Component) */}
            <div className="pt-3 border-t border-border-subtle">
              <KarmicTailMicroCard
                signature={matrix.karmicTail.points.join("-")}
                name={matrix.karmicTail.name || "Karmic Tail"}
                archetype={karmicArcana.archetype}
                trap={matrix.karmicTail.currentLifeTrap || karmicArcana.personality.shadowTendency}
                affirmation={karmicArcana.affirmation}
                dateSlug={dateSlug}
              />
            </div>
          </Card>
        </section>


        {/* ---------------------------------------------------------------------
            SECTION 8: Innate Talents & Intuitive Gifts
            --------------------------------------------------------------------- */}
        <section id="section-talents" className="space-y-6 pt-4 border-t border-border-subtle scroll-mt-36">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-chart-talent/15 flex items-center justify-center text-chart-talent">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-chart-talent block">
                  Pillar 08
                </span>
                <h2 className="text-2xl font-display font-medium text-ink-primary">
                  Innate Talents & Intuitive Gifts
                </h2>
              </div>
            </div>


            <button
              type="button"
              onClick={() => toggleSection("talents")}
              className="text-xs text-ink-muted hover:text-ink-primary flex items-center gap-1 font-medium"
            >
              <span>{expandedSections.talents ? "Collapse" : "Expand"}</span>
              {expandedSections.talents ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative overflow-hidden rounded-2xl border border-chart-talent/30 bg-gradient-to-r from-surface via-surface to-chart-talent/10 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-8 p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="chart" chartZone="talent" size="sm">
                    Innate Genius & Superpowers
                  </Badge>
                  <span className="text-xs font-mono text-ink-muted">Ancestral & Soul Lineage Gifts</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-medium text-ink-primary">
                  The Awakening of Innate Gifts
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-xl">
                  Unveiling subconscious creative talents, intuitive channels, and generational strengths ready for activation.
                </p>
              </div>
              <div className="md:col-span-4 relative h-40 md:h-full min-h-[160px]">
                <Image
                  src="/images/calculators/talent-superpowers.webp"
                  alt="Innate Talents and Superpowers Archetype"
                  fill
                  className="object-cover object-center opacity-85 hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paternal Line */}
            <Card elevation="low" className="p-5 border-t-4 border-t-chart-paternal space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="chart" chartZone="paternal" size="sm">
                  Father&rsquo;s Ancestral Line
                </Badge>
                <span className="font-mono text-base font-bold text-chart-paternal tabular-nums">
                  {pointsMap.get("ancestralPaternalSpirit")?.value} / {pointsMap.get("ancestralPaternalMaterial")?.value}
                </span>
              </div>
              <h3 className="text-lg font-display font-medium text-ink-primary">
                Paternal Lineage Programs
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Upper node ({pointsMap.get("ancestralPaternalSpirit")?.value}) represents spiritual moral codes
                transmitted by your father&rsquo;s ancestors; bottom node ({pointsMap.get("ancestralPaternalMaterial")?.value})
                governs physical stamina and discipline.
              </p>
            </Card>

            {/* Maternal Line */}
            <Card elevation="low" className="p-5 border-t-4 border-t-chart-maternal space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="chart" chartZone="maternal" size="sm">
                  Mother&rsquo;s Ancestral Line
                </Badge>
                <span className="font-mono text-base font-bold text-chart-maternal tabular-nums">
                  {pointsMap.get("ancestralMaternalSpirit")?.value} / {pointsMap.get("ancestralMaternalMaterial")?.value}
                </span>
              </div>
              <h3 className="text-lg font-display font-medium text-ink-primary">
                Maternal Wisdom Programs
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Upper node ({pointsMap.get("ancestralMaternalSpirit")?.value}) represents creative and emotional intuition
                from your mother&rsquo;s lineage; bottom node ({pointsMap.get("ancestralMaternalMaterial")?.value})
                reflects material health patterns.
              </p>
            </Card>
          </div>
        </section>
      </div>

      {/* =========================================================================
          5. SOFT UPSELL SECTION: Natural Next Steps (Compatibility & Deep Report)
          ========================================================================= */}
      <section className="pt-12 border-t border-border-subtle">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary block mb-1">
            Deepen Your Exploration
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
            Natural Next Steps
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Explore interpersonal dynamics or receive a complete archive of your 80-year cycle timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Option A: Compatibility Calculator */}
          <Card
            elevation="mid"
            className="p-6 border border-border-strong flex flex-col justify-between hover:border-brand-primary/40 transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-chart-love/15 flex items-center justify-center text-chart-love mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <Badge variant="chart" chartZone="love" size="sm" className="mb-2">
                Relationship Matrix
              </Badge>
              <h3 className="text-xl font-display font-medium text-ink-primary mb-2">
                Pair Compatibility
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6 font-sans">
                Overlay your birth date with a partner or collaborator to calculate your composite matrix,
                shared frequencies, and relational karmic lessons.
              </p>
            </div>
            <Link
              href={`/compatibility?d1=${dateSlug}${userName ? `&name1=${encodeURIComponent(userName)}` : ""}`}
            >
              <Button variant="outline" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Calculate Couple Synergy
              </Button>
            </Link>
          </Card>

          {/* Option B: Yearly Energy Forecast */}
          <Card
            elevation="mid"
            className="p-6 border border-border-strong flex flex-col justify-between hover:border-brand-primary/40 transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-chart-wealth/15 flex items-center justify-center text-chart-wealth mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <Badge variant="chart" chartZone="wealth" size="sm" className="mb-2">
                Annual Transit
              </Badge>
              <h3 className="text-xl font-display font-medium text-ink-primary mb-2">
                Yearly Influence & Cycle
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6 font-sans">
                Track your active personal year energy and explore your lifecycle progression along
                the 0–80 years octagram perimeter with 4 quarterly rhythms.
              </p>
            </div>
            <Link
              href={`/yearly-forecast?date=${dateSlug}${userName ? `&name=${encodeURIComponent(userName)}` : ""}`}
            >
              <Button variant="outline" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Yearly Forecast
              </Button>
            </Link>
          </Card>

          {/* Option C: Tools Hub & Child Matrix */}
          <Card
            elevation="mid"
            className="p-6 border border-border-strong bg-surface-raised/40 flex flex-col justify-between hover:border-brand-primary/40 transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <Badge variant="brand" size="sm" className="mb-2">
                Complete Suite
              </Badge>
              <h3 className="text-xl font-display font-medium text-ink-primary mb-2">
                Destiny Tools Suite
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6 font-sans">
                Explore our full family of tools, including the Child Destiny Matrix for conscious
                parenting, interactive SVG demos, and design system specifications.
              </p>
            </div>
            <Link href="/tools">
              <Button variant="primary" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore All Tools
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Save Chart Modal Drawer */}
      <SaveChartModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        dateSlug={dateSlug}
        chartName={userName || undefined}
      />

      {/* Premium 40-Page Deep Dossier Modal (Phase 2 Paid Tier) */}
      <PremiumDossierModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        matrix={matrix}
        dateSlug={dateSlug}
        userName={userName}
      />
    </div>
  );
}

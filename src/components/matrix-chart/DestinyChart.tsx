"use client";

import React, { useState, useRef, useEffect } from "react";
import { Download, RefreshCw } from "lucide-react";
import { DestinyMatrix, MatrixPoint } from "@/lib/matrix-engine";

import { ShareButton } from "@/components/share/ShareButton";
import { NodeDetailDrawer } from "./NodeDetailDrawer";
import { Button } from "@/components/ui/Button";
import { ChartFocusLens, ChartLensMode } from "./ChartFocusLens";

export interface DestinyChartProps {
  matrix: DestinyMatrix;
  selectedPointId?: string | null;
  onSelectPoint?: (point: MatrixPoint) => void;
  showLabels?: boolean;
  interactive?: boolean;
  activeLens?: ChartLensMode;
  showLensControl?: boolean;
  className?: string;
}

export function DestinyChart({
  matrix,
  selectedPointId = null,
  onSelectPoint,
  showLabels = true,
  interactive = true,
  activeLens = "all",
  showLensControl = true,
  className = "",
}: DestinyChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const [activePointId, setActivePointId] = useState<string | null>(selectedPointId);
  const [currentLens, setCurrentLens] = useState<ChartLensMode>(activeLens);
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);
  const [drawerPoint, setDrawerPoint] = useState<MatrixPoint | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Trigger replay
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Sync external activeLens if provided
  useEffect(() => {
    if (activeLens) {
      setCurrentLens(activeLens);
    }
  }, [activeLens]);

  // Sync external prop if controlled
  useEffect(() => {
    if (selectedPointId !== undefined) {
      setActivePointId(selectedPointId);
    }
  }, [selectedPointId]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Determine current active node (hover takes precedence during cursor inspection)
  const currentFocusedId = hoveredPointId || activePointId;

  // Find connected line IDs for the currently active node
  const connectedLineIds = new Set<string>();
  if (currentFocusedId) {
    matrix.lines.forEach((line) => {
      if (line.pointIds.includes(currentFocusedId)) {
        connectedLineIds.add(line.id);
      }
    });
  }

  // Find currently active age node from ageCycle
  const currentAgePointId = matrix.ageCycle?.find((n) => n.isCurrentAge)?.pointId;

  // Handle node selection

  const handleNodeClick = (point: MatrixPoint) => {
    if (!interactive) return;
    setActivePointId(point.id);
    if (onSelectPoint) onSelectPoint(point);

    // On mobile screens (< 768px), open bottom sheet
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setDrawerPoint(point);
    }
  };

  // Export to PNG handler (dynamically imported to optimize bundle)
  const handleDownload = async () => {
    if (!svgRef.current || isExporting) return;
    try {
      setIsExporting(true);
      const { exportSvgToPng } = await import("@/lib/utils/export-svg");
      const { day, month, year } = matrix.input;
      const fileName = `destiny-matrix-${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}.png`;
      await exportSvgToPng(svgRef.current, fileName, 2);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Unable to export chart image. Please try again or take a screenshot.");
    } finally {
      setIsExporting(false);
    }
  };

  // Replay entrance animation
  const handleReplayAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  // Point lookup map for fast line path generation
  const pointsMap = new Map<string, MatrixPoint>();
  matrix.points.forEach((p) => pointsMap.set(p.id, p));

  // Helper to generate SVG polyline points string
  const getLineCoordinates = (pointIds: string[]): string => {
    return pointIds
      .map((id) => {
        const pt = pointsMap.get(id);
        return pt ? `${pt.position.x},${pt.position.y}` : "";
      })
      .filter(Boolean)
      .join(" ");
  };

  // Dynamic zone styling mapping for SVG fills and strokes
  const getZoneColor = (zone: string) => `hsl(var(--chart-${zone}))`;

  // Filter helpers for interactive focus lens
  const isPointInLens = (pointId: string, pointZone: string): boolean => {
    if (currentLens === "all") return true;
    if (currentLens === "karma") {
      return pointZone === "karmic" || pointId.toLowerCase().includes("karmic");
    }
    if (currentLens === "love") {
      return ["loveEntrance", "loveMoneyCenter", "comfortZone"].includes(pointId);
    }
    if (currentLens === "wealth") {
      return ["moneyEntrance", "loveMoneyCenter", "socialRealizationInner", "socialRealization"].includes(pointId);
    }
    if (currentLens === "talents") {
      return ["spirit", "ancestralPaternalSpirit", "ancestralMaternalSpirit", "personality"].includes(pointId);
    }
    if (currentLens === "chakras") {
      return (
        ["spirit", "ajna", "vishuddha", "comfortZone", "manipura", "svadhisthana", "karmicTailRoot"].includes(pointId) ||
        pointZone === "core" ||
        pointZone === "spirit"
      );
    }
    if (currentLens === "ancestral") {
      return ["ancestralPaternalSpirit", "ancestralMaternalSpirit", "ancestralMaternalMaterial", "ancestralPaternalMaterial"].includes(pointId);
    }
    return true;
  };

  const isLineInLens = (lineId: string): boolean => {
    if (currentLens === "all") return true;
    if (currentLens === "karma") return lineId.toLowerCase().includes("karma") || lineId === "earthSquare";
    if (currentLens === "love") return lineId === "loveMoneyChannel" || lineId.toLowerCase().includes("love");
    if (currentLens === "wealth") return lineId === "loveMoneyChannel" || lineId.toLowerCase().includes("money");
    if (currentLens === "talents") return lineId === "skyDiamond";
    if (currentLens === "chakras") return lineId === "skyDiamond";
    if (currentLens === "ancestral") return lineId === "earthSquare";
    return true;
  };

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* Top Toolbar Actions */}
      <div className="w-full max-w-[580px] flex items-center justify-between gap-2 mb-3 px-1 text-xs">
        <div className="flex items-center gap-2 text-ink-muted font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse-subtle" />
            <span>Octagram 1000×1000</span>
          </div>
          {matrix.currentAge !== undefined && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-[11px] font-semibold border border-brand-primary/20">
              Age: {matrix.currentAge} yrs
            </span>
          )}
        </div>


        <div className="flex items-center gap-2">
          {/* Replay Animation */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReplayAnimation}
            aria-label="Replay entrance animation"
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Replay
          </Button>

          {/* Download Image Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            isLoading={isExporting}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            PNG
          </Button>

          {/* Share Button */}
          <ShareButton size="sm" />
        </div>
      </div>

      {/* SVG Container with fixed aspect ratio (Zero CLS) */}
      <div className="relative w-full max-w-[620px] aspect-square flex items-center justify-center p-2 sm:p-4 rounded-2xl bg-surface border border-border-strong shadow-elevation-mid overflow-hidden">
        {/* Subtle Ambient Radial Glow behind chart */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-brand-primary/8 via-chart-wealth/6 to-brand-secondary/8 blur-3xl pointer-events-none" />

        <svg
          key={animationKey}
          ref={svgRef}
          id="destiny-matrix-octagram-svg"
          data-matrix-chart="true"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full drop-shadow-sm overflow-visible destiny-chart destiny-octagram matrix-octagram-svg"
          role="img"
          aria-label={`Destiny Matrix Octagram Chart for ${matrix.input.day}/${matrix.input.month}/${matrix.input.year}`}
        >
          <title>{`Destiny Matrix Octagram Chart for ${matrix.input.day}/${matrix.input.month}/${matrix.input.year}`}</title>
          <desc>
            An eight-pointed star numerology chart displaying 22 archetypal energy points computed
            from your birth date.
          </desc>

          <defs>
            {/* Soft Ambient Node Shadow */}
            <filter id="node-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
            </filter>
            {/* Active Node Highlight Glow */}
            <filter id="active-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Concentric Energy Calibration Circles */}
          <g className="calibration-circles" opacity="0.45" stroke="currentColor">
            <circle cx="500" cy="500" r="420" fill="none" strokeWidth="1" strokeDasharray="4 6" className="text-border-subtle" />
            <circle cx="500" cy="500" r="300" fill="none" strokeWidth="1" strokeDasharray="3 5" className="text-border-subtle" />
            <circle cx="500" cy="500" r="170" fill="none" strokeWidth="1" strokeDasharray="2 4" className="text-border-subtle" />
          </g>

          {/* Cardinal & Ancestral Perimeter Age Markers (0 to 80 Years) */}
          <g className="age-markers" opacity="0.75">
            {[
              { age: "0", x: 80, y: 505, anchor: "end" },
              { age: "10", x: 195, y: 200, anchor: "end" },
              { age: "20", x: 500, y: 70, anchor: "middle" },
              { age: "30", x: 805, y: 200, anchor: "start" },
              { age: "40", x: 920, y: 505, anchor: "start" },
              { age: "50", x: 805, y: 810, anchor: "start" },
              { age: "60", x: 500, y: 935, anchor: "middle" },
              { age: "70", x: 195, y: 810, anchor: "end" },
            ].map((m) => (
              <text
                key={m.age}
                x={m.x}
                y={m.y}
                textAnchor={m.anchor as "end" | "middle" | "start"}
                className="text-[11px] font-mono font-bold fill-ink-muted tracking-wider"
              >
                {m.age}
              </text>
            ))}
          </g>


          {/* =========================================================================
              2. STRUCTURAL GEOMETRIC LINES (Animated Entrance)
              ========================================================================= */}
          <g className="structural-lines">
            {matrix.lines.map((line) => {
              const isConnected = connectedLineIds.has(line.id);
              const isAnyFocused = Boolean(currentFocusedId);
              const polyPoints = getLineCoordinates(line.pointIds);
              const matchesLens = isLineInLens(line.id);
              const isLensFiltered = currentLens !== "all";

              // Line color mapping based on line archetype
              let strokeColor = "currentColor";
              let strokeWidth = "1.5";

              if (line.id === "loveMoneyChannel") {
                strokeColor = "hsl(var(--chart-love))";
                strokeWidth = "2.5";
              } else if (line.id === "skyDiamond") {
                strokeColor = "hsl(var(--chart-spirit))";
                strokeWidth = "1.8";
              } else if (line.id === "earthSquare") {
                strokeColor = "hsl(var(--chart-physical))";
                strokeWidth = "1.8";
              }

              return (
                <polyline
                  key={line.id}
                  points={polyPoints}
                  fill="none"
                  stroke={isConnected ? "hsl(var(--brand-primary))" : strokeColor}
                  strokeWidth={isConnected ? "3.5" : strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-all duration-300 ${
                    isConnected
                      ? "opacity-100 drop-shadow-sm"
                      : isLensFiltered
                      ? matchesLens
                        ? "opacity-95 drop-shadow-sm"
                        : "opacity-15 text-border-subtle"
                      : isAnyFocused
                      ? "opacity-20 text-border-subtle"
                      : "opacity-60 text-border-strong"
                  } ${!prefersReducedMotion ? "animate-draw-line" : ""}`}
                  style={{
                    strokeDasharray: !prefersReducedMotion ? 2400 : undefined,
                    strokeDashoffset: !prefersReducedMotion ? 0 : undefined,
                  }}
                />
              );
            })}
          </g>

          {/* =========================================================================
              3. MATRIX ENERGY NODES (Staggered Fade/Scale Entrance)
              ========================================================================= */}
          <g className="matrix-nodes">
            {matrix.points.map((point, index) => {
              const isSelected = activePointId === point.id;
              const isHovered = hoveredPointId === point.id;
              const isFocused = isSelected || isHovered;
              const inLens = isPointInLens(point.id, point.zone);
              const isLensFiltered = currentLens !== "all";

              // Node radius sizing: Center and Cardinal Vertices are larger for legibility
              const isCenter = point.id === "comfortZone";
              const isCardinal = ["personality", "spirit", "socialRealization", "karmicTailRoot"].includes(point.id);
              const isClan = ["ancestralPaternalSpirit", "ancestralMaternalSpirit", "ancestralMaternalMaterial", "ancestralPaternalMaterial"].includes(point.id);

              let radius = 22;
              let fontSize = 14;

              if (isCenter) {
                radius = 34;
                fontSize = 18;
              } else if (isCardinal) {
                radius = 28;
                fontSize = 16;
              } else if (isClan) {
                radius = 24;
                fontSize = 14;
              }

              // Staggered delay for tasteful entrance (capped under 1.2s)
              const entranceDelay = prefersReducedMotion ? "0ms" : `${400 + Math.min(index * 25, 700)}ms`;

              return (
                <g
                  key={point.id}
                  transform={`translate(${point.position.x}, ${point.position.y})`}
                  onClick={() => handleNodeClick(point)}
                  onMouseEnter={() => setHoveredPointId(point.id)}
                  onMouseLeave={() => setHoveredPointId(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleNodeClick(point);
                    }
                  }}
                  aria-label={`${point.label}: Energy ${point.value}`}
                  className={`cursor-pointer group outline-none transition-all duration-300 ${
                    isLensFiltered
                      ? inLens
                        ? "opacity-100 scale-105"
                        : "opacity-25"
                      : "opacity-100"
                  }`}
                  style={{
                    transitionDelay: entranceDelay,
                  }}
                >
                  {/* Generous Invisible Touch Target (Guarantees 80px+ hit area on mobile) */}
                  <circle r={42} fill="transparent" />

                  {/* Active Focus Lens Pulsing Halo Ring */}
                  {isLensFiltered && inLens && (
                    <circle
                      r={radius + 9}
                      fill="none"
                      stroke={getZoneColor(point.zone)}
                      strokeWidth="2.5"
                      strokeDasharray="5 3"
                      className="animate-pulse"
                    />
                  )}

                  {/* Current Age Active Influence Ring */}
                  {point.id === currentAgePointId && (
                    <circle
                      r={radius + 14}
                      fill="none"
                      stroke="hsl(var(--brand-primary))"
                      strokeWidth="2"
                      strokeDasharray="5 3"
                      className="animate-spin-slow opacity-90"
                    />
                  )}

                  {/* Active / Focus Glow Halo */}
                  {isFocused && (
                    <circle
                      r={radius + 8}
                      fill="none"
                      stroke={getZoneColor(point.zone)}
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-spin-slow opacity-80"
                    />
                  )}


                  {/* Outer Contrast Ring */}
                  <circle
                    r={radius + 2}
                    fill="hsl(var(--surface))"
                    className="transition-transform duration-200 group-hover:scale-110"
                  />

                  {/* Main Node Circle */}
                  <circle
                    r={radius}
                    fill={getZoneColor(point.zone)}
                    filter="url(#node-shadow)"
                    className={`transition-all duration-200 group-hover:scale-110 ${
                      isFocused ? "stroke-ink-primary stroke-[2.5px]" : "stroke-surface stroke-2"
                    }`}
                  />

                  {/* Energy Number (Tabular Monospace for perfect centering) */}
                  <text
                    y={fontSize * 0.35}
                    textAnchor="middle"
                    className="fill-white font-mono font-bold select-none pointer-events-none tabular-nums"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {point.value}
                  </text>

                  {/* Optional Exterior Node Label Badges */}
                  {showLabels && isCardinal && (
                    <g
                      transform={`translate(0, ${
                        point.position.y > 600 ? radius + 20 : point.position.y < 400 ? -(radius + 12) : radius + 20
                      })`}
                      className="pointer-events-none select-none transition-opacity duration-200"
                    >
                      <rect
                        x="-48"
                        y="-10"
                        width="96"
                        height="20"
                        rx="10"
                        fill="hsl(var(--surface))"
                        stroke="hsl(var(--border-strong))"
                        strokeWidth="1"
                        className="shadow-elevation-subtle"
                      />
                      <text
                        textAnchor="middle"
                        y="4"
                        className="font-sans font-semibold text-[10px] fill-ink-secondary uppercase tracking-wider"
                      >
                        {point.id === "personality"
                          ? "Day"
                          : point.id === "spirit"
                          ? "Month"
                          : point.id === "socialRealization"
                          ? "Year"
                          : "Karma"}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Selected Node Floating Tooltip Badge on Desktop */}
        {currentFocusedId && (
          <div className="hidden sm:flex absolute bottom-3 left-1/2 -translate-x-1/2 items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink-primary text-canvas text-xs font-medium shadow-elevation-high animate-in fade-in zoom-in-95 duration-150">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: getZoneColor(pointsMap.get(currentFocusedId)?.zone || "core"),
              }}
            />
            <span>
              {pointsMap.get(currentFocusedId)?.label}:{" "}
              <strong>Energy {pointsMap.get(currentFocusedId)?.value}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Interactive Chart Focus Lens Control */}
      {showLensControl && (
        <ChartFocusLens
          activeLens={currentLens}
          onSelectLens={setCurrentLens}
          className="mt-3"
        />
      )}

      {/* Screen-Reader Accessible Coordinates Table (WCAG AA) */}
      <div className="sr-only">
        <h3>Destiny Matrix Coordinates Table</h3>
        <p>
          Calculated octagram numerological coordinates for birth date {matrix.input.day}/
          {matrix.input.month}/{matrix.input.year}.
        </p>
        <table>
          <caption>Matrix of Destiny Coordinates and Archetypes</caption>
          <thead>
            <tr>
              <th scope="col">Coordinate / Axis</th>
              <th scope="col">Zone</th>
              <th scope="col">Arcana Value</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {matrix.points.map((pt) => (
              <tr key={pt.id}>
                <th scope="row">{pt.label}</th>
                <td>{pt.zone}</td>
                <td>Energy {pt.value}</td>
                <td>{pt.description || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Touch Guidance Tip */}
      <span className="sm:hidden text-[11px] text-ink-muted mt-2 text-center">
        Tap any node to view detailed archetypal breakdown
      </span>

      {/* Mobile Bottom Sheet Drawer for Selected Point */}
      <NodeDetailDrawer
        point={drawerPoint}
        onClose={() => setDrawerPoint(null)}
        onScrollToFullReading={() => {
          const readingSection = document.getElementById("full-readings-section");
          if (readingSection) {
            readingSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
    </div>
  );
}

/**
 * Multi-section Client-Side PDF Generation Utility for Matrix of Destiny.
 * 
 * Uses jsPDF (dynamically imported) to construct a professional, high-resolution
 * 3-page A4 dossier featuring the rendered SVG octagram chart and structured
 * interpretations adhering to the terracotta, slate, and cream design tokens.
 */

import { DestinyMatrix, MatrixPoint } from "@/lib/matrix-engine";
import { arcanaMeanings, ArcanaMeaning } from "@/content/arcana-meanings";
import { getSvgAsPngDataUrl } from "./export-svg";
import { SITE_URL } from "@/lib/seo/structured-data";

export interface ExportPdfOptions {
  matrix: DestinyMatrix;
  dateSlug: string;
  userName?: string | null;
  svgElement?: SVGSVGElement | null;
}

// Brand color palette (RGB)
const COLORS = {
  terracotta: [194, 94, 62] as [number, number, number], // #C25E3E
  terracottaDark: [168, 80, 52] as [number, number, number],
  slate: [45, 70, 94] as [number, number, number],       // #2D465E
  cream: [250, 248, 245] as [number, number, number],    // #FAF8F5
  cardBg: [246, 243, 237] as [number, number, number],   // #F6F3ED
  border: [231, 226, 218] as [number, number, number],   // #E7E2DA
  inkDark: [26, 29, 32] as [number, number, number],     // #1A1D20
  inkMuted: [107, 114, 128] as [number, number, number], // #6B7280
  white: [255, 255, 255] as [number, number, number],
};

function getArcana(value: number): ArcanaMeaning {
  return arcanaMeanings[value] || arcanaMeanings[1];
}

export async function exportChartAsPdf({
  matrix,
  dateSlug,
  userName,
  svgElement,
}: ExportPdfOptions): Promise<void> {
  // Dynamically load jsPDF to prevent bundle bloat
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2; // 178mm
  const totalPages = 4;


  const { day, month, year } = matrix.input;
  const formattedBirthDate = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const generationTimestamp = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Points mapping
  const pointsMap = new Map<string, MatrixPoint>();
  matrix.points.forEach((p) => pointsMap.set(p.id, p));

  const centerPt = pointsMap.get("comfortZone") || matrix.points[0];
  const personalityPt = pointsMap.get("personality") || matrix.points[0];
  const spiritPt = pointsMap.get("spirit") || matrix.points[0];
  const socialPt = pointsMap.get("socialRealization") || matrix.points[0];
  const karmicRootPt = pointsMap.get("karmicTailRoot") || matrix.points[0];
  const lovePt = pointsMap.get("loveEntrance") || matrix.points[0];
  const moneyPt = pointsMap.get("moneyEntrance") || matrix.points[0];


  const centerArcana = getArcana(centerPt.value);
  const personalityArcana = getArcana(personalityPt.value);
  const spiritArcana = getArcana(spiritPt.value);
  const socialArcana = getArcana(socialPt.value);
  const karmicRootArcana = getArcana(karmicRootPt.value);
  const loveArcana = getArcana(lovePt.value);
  const moneyArcana = getArcana(moneyPt.value);

  // Helper: render running header and footer on each page
  const renderHeaderFooter = (pageNum: number, sectionKicker: string) => {
    // Top border line
    doc.setDrawColor(...COLORS.terracotta);
    doc.setLineWidth(0.8);
    doc.line(margin, 10, pageWidth - margin, 10);

    // Kicker & Report Identifier
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.terracotta);
    doc.text(sectionKicker.toUpperCase(), margin, 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.inkMuted);
    doc.text("DESTINY MATRIX SACRED GEOMETRY", pageWidth - margin, 14, { align: "right" });

    // Bottom Running Footer
    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.inkMuted);
    doc.text(`Generated on ${generationTimestamp} • ${SITE_URL}`, margin, pageHeight - 8);

    doc.setFont("helvetica", "bold");
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: "right" });
  };

  // ===========================================================================
  // PAGE 1: COVER & ARCHITECTURAL BLUEPRINT (Octagram + Synthesis)
  // ===========================================================================
  renderHeaderFooter(1, "Sovereign Architectural Blueprint");

  // Main Report Title
  let curY = 22;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...COLORS.slate);
  const titleText = userName ? `${userName}'s Destiny Matrix` : "Personal Destiny Matrix";
  doc.text(titleText, margin, curY);

  curY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.inkDark);
  doc.text(`Birth Date: ${formattedBirthDate}  |  22 Major Arcana Calculation`, margin, curY);

  // Quick Archetype Summary Badges (4 boxes)
  curY += 6;
  const badgeWidth = (contentWidth - 9) / 4;
  const badgeHeight = 13;
  const badges = [
    { label: "SOUL CENTER", val: `${centerPt.value} • ${centerArcana.name}` },
    { label: "PERSONALITY", val: `${personalityPt.value} • ${personalityArcana.name}` },
    { label: "SPIRIT", val: `${spiritPt.value} • ${spiritArcana.name}` },
    { label: "REALIZATION", val: `${socialPt.value} • ${socialArcana.name}` },
  ];

  badges.forEach((b, i) => {
    const bx = margin + i * (badgeWidth + 3);
    doc.setFillColor(...COLORS.cardBg);
    doc.setDrawColor(...COLORS.border);
    doc.roundedRect(bx, curY, badgeWidth, badgeHeight, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.setTextColor(...COLORS.terracotta);
    doc.text(b.label, bx + 2.5, curY + 4);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.slate);
    // Truncate if too wide
    const clippedVal = doc.splitTextToSize(b.val, badgeWidth - 5)[0] || b.val;
    doc.text(clippedVal, bx + 2.5, curY + 9.5);
  });

  // Chart Image Rendering
  curY += badgeHeight + 5;
  const chartTarget = svgElement || (document.getElementById("destiny-matrix-octagram-svg") as SVGSVGElement | null);
  
  const chartSize = 105; // 105mm x 105mm square
  const chartX = margin + (contentWidth - chartSize) / 2;

  if (chartTarget) {
    try {
      const chartDataUrl = await getSvgAsPngDataUrl(chartTarget, 2, "#FAF8F5");
      doc.addImage(chartDataUrl, "PNG", chartX, curY, chartSize, chartSize, undefined, "FAST");
    } catch (e) {
      console.warn("Chart rasterization fallback to placeholder:", e);
      doc.setFillColor(...COLORS.cardBg);
      doc.roundedRect(chartX, curY, chartSize, chartSize, 2, 2, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...COLORS.inkMuted);
      doc.text("[Destiny Matrix Octagram]", chartX + chartSize / 2, curY + chartSize / 2, { align: "center" });
    }
  }

  // Executive Synthesis Card (Bottom of Page 1)
  curY += chartSize + 6;
  const synthCardHeight = 48;
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin, curY, contentWidth, synthCardHeight, 2, 2, "FD");

  // Terracotta accent line on left of card
  doc.setFillColor(...COLORS.terracotta);
  doc.rect(margin, curY, 2, synthCardHeight, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.terracotta);
  doc.text("EXECUTIVE SYNTHESIS: THREE SOVEREIGN ANCHORS", margin + 6, curY + 6.5);

  const pillars = [
    {
      num: `1. Core Sanctuary (Energy ${centerPt.value})`,
      text: centerArcana.essence,
    },
    {
      num: `2. Karmic Evolutionary Path (Energy ${karmicRootPt.value})`,
      text: karmicRootArcana.karmic.evolutionaryPath,
    },
    {
      num: `3. Financial Mindset (Energy ${moneyPt.value})`,
      text: moneyArcana.money.financialMindset,
    },
  ];

  let pY = curY + 12;
  pillars.forEach((p) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.slate);
    doc.text(p.num, margin + 6, pY);

    pY += 3.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.inkDark);
    const splitDesc = doc.splitTextToSize(p.text, contentWidth - 12);
    // Print first 2 lines
    const snippet = splitDesc.slice(0, 2);
    doc.text(snippet, margin + 6, pY);
    pY += snippet.length * 3 + 2;
  });

  // ===========================================================================
  // PAGE 2: PERSONALITY, SOUL BATTERY & KARMIC TAIL
  // ===========================================================================
  doc.addPage();
  renderHeaderFooter(2, "Archetypal Readings: Identity & Karma");

  curY = 22;

  // Header Banner
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.slate);
  doc.text("Pillar I: Personality & Core Soul Battery", margin, curY);

  curY += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.inkMuted);
  doc.text("Derived from Day of Birth and Central Comfort Zone Archetypes", margin, curY);

  // Section: Comfort Zone (Center)
  curY += 6;
  const comfortBoxH = 50;
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin, curY, contentWidth, comfortBoxH, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.terracotta);
  doc.text(`Center Comfort Zone • Energy ${centerPt.value}: ${centerArcana.name} (${centerArcana.archetype})`, margin + 6, curY + 7);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.slate);
  doc.text(`"${centerArcana.pullQuote}"`, margin + 6, curY + 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.inkDark);
  const essenceLines = doc.splitTextToSize(centerArcana.essence, contentWidth - 12);
  doc.text(essenceLines.slice(0, 3), margin + 6, curY + 17);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.slate);
  doc.text("Recharging & Autonomy:", margin + 6, curY + 28);
  doc.setFont("helvetica", "normal");
  const czLines = doc.splitTextToSize(centerArcana.personality.comfortZone, contentWidth - 12);
  doc.text(czLines.slice(0, 2), margin + 6, curY + 32);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.terracottaDark);
  doc.text("Shadow Trap to Harmonize:", margin + 6, curY + 41);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);
  const shadowLines = doc.splitTextToSize(centerArcana.personality.shadowTendency, contentWidth - 12);
  doc.text(shadowLines.slice(0, 2), margin + 6, curY + 45);

  // Section: Day of Birth (Personality)
  curY += comfortBoxH + 6;
  const persBoxH = 46;
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin, curY, contentWidth, persBoxH, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.slate);
  doc.text(`Birth Day Energy • Energy ${personalityPt.value}: ${personalityArcana.name}`, margin + 6, curY + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.inkDark);
  const portraitLines = doc.splitTextToSize(personalityArcana.personality.portrait, contentWidth - 12);
  doc.text(portraitLines.slice(0, 3), margin + 6, curY + 13);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.slate);
  doc.text("Core Sovereign Keywords:", margin + 6, curY + 26);
  doc.setFont("helvetica", "normal");
  doc.text(personalityArcana.keywords.join(" • "), margin + 6, curY + 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.terracotta);
  doc.text("Personal Empowerment Affirmation:", margin + 6, curY + 37);
  doc.setFont("helvetica", "italic");
  doc.text(`"${personalityArcana.affirmation}"`, margin + 6, curY + 41);

  // ===========================================================================
  // SECTION: 7-CHAKRA HEALTH & PSYCHOSOMATIC MATRIX (PAGE 2)
  // ===========================================================================
  curY += persBoxH + 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.slate);
  doc.text("Pillar II: 7-Chakra Bio-Energetic Health Matrix", margin, curY);

  curY += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.inkMuted);
  doc.text("Mapping physical organ systems, intuitive energy inflow, and emotional synthesis", margin, curY);

  curY += 5;
  const rowH = 7.2;

  // Table Header
  doc.setFillColor(...COLORS.slate);
  doc.rect(margin, curY, contentWidth, rowH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.white);
  doc.text("CHAKRA / CENTER", margin + 3, curY + 4.8);
  doc.text("PHYSICAL (EARTH)", margin + 46 + 10, curY + 4.8, { align: "center" });
  doc.text("ENERGY (SKY)", margin + 70 + 10, curY + 4.8, { align: "center" });
  doc.text("TOTAL (SYNTHESIS)", margin + 94 + 11, curY + 4.8, { align: "center" });
  doc.text("GOVERNED ORGAN SYSTEMS", margin + 118 + 3, curY + 4.8);

  curY += rowH;

  // 7 Chakra Rows
  matrix.healthMatrix.rows.forEach((row, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 246, isEven ? 255 : 243, isEven ? 255 : 237);
    doc.rect(margin, curY, contentWidth, rowH, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.inkDark);
    doc.text(`${row.order}. ${row.nameEn}`, margin + 3, curY + 4.8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(String(row.physicalValue), margin + 46 + 10, curY + 4.8, { align: "center" });
    doc.text(String(row.energyValue), margin + 70 + 10, curY + 4.8, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.terracotta);
    doc.text(String(row.totalValue), margin + 94 + 11, curY + 4.8, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...COLORS.inkMuted);
    const sysText = doc.splitTextToSize(row.systems, 54);
    doc.text(sysText[0] || "", margin + 118 + 3, curY + 4.8);

    curY += rowH;
  });

  // Total Vitality Row
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.terracotta);
  doc.setLineWidth(0.4);
  doc.rect(margin, curY, contentWidth, rowH + 1, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.terracotta);
  doc.text("TOTAL VITALITY (REDUCED)", margin + 3, curY + 5.2);
  doc.text(String(matrix.healthMatrix.total.physical), margin + 46 + 10, curY + 5.2, { align: "center" });
  doc.text(String(matrix.healthMatrix.total.energy), margin + 70 + 10, curY + 5.2, { align: "center" });
  doc.text(String(matrix.healthMatrix.total.total), margin + 94 + 11, curY + 5.2, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...COLORS.slate);
  doc.text("Equilibrium between earthly body & spiritual flow", margin + 118 + 3, curY + 5.2);

  // ===========================================================================
  // PAGE 3: ANCESTRAL LINEAGE PROGRAMS & THE 26 KARMIC TAILS
  // ===========================================================================
  doc.addPage();
  renderHeaderFooter(3, "Ancestral Bloodlines & Subconscious Karmic Programs");

  curY = 22;

  // Pillar 3: Ancestral Lineage Programs
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.slate);
  doc.text("Pillar III: Ancestral Lineages & Clan Karma (Earth Square)", margin, curY);

  curY += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.inkMuted);
  doc.text("Programs inherited from paternal and maternal bloodlines across the 45-degree diagonal", margin, curY);

  curY += 5;
  const clanBoxH = 38;
  const halfW = (contentWidth - 6) / 2;

  // Paternal Card
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin, curY, halfW, clanBoxH, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.slate);
  doc.text("Father's Bloodline (Men's Line)", margin + 5, curY + 6.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.inkDark);
  doc.text(`Spiritual Task (NW): Energy ${matrix.ancestralLineage.paternal.spiritual}`, margin + 5, curY + 14);
  doc.text(`Material Task (SW): Energy ${matrix.ancestralLineage.paternal.material}`, margin + 5, curY + 20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.terracotta);
  doc.text(`Male Clan Total: Energy ${matrix.ancestralLineage.paternal.total}`, margin + 5, curY + 28);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...COLORS.inkMuted);
  doc.text("Carries willpower, authority, career discipline & grounding.", margin + 5, curY + 34);

  // Maternal Card
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin + halfW + 6, curY, halfW, clanBoxH, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.slate);
  doc.text("Mother's Bloodline (Women's Line)", margin + halfW + 11, curY + 6.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.inkDark);
  doc.text(`Spiritual Task (NE): Energy ${matrix.ancestralLineage.maternal.spiritual}`, margin + halfW + 11, curY + 14);
  doc.text(`Material Task (SE): Energy ${matrix.ancestralLineage.maternal.material}`, margin + halfW + 11, curY + 20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.terracotta);
  doc.text(`Female Clan Total: Energy ${matrix.ancestralLineage.maternal.total}`, margin + halfW + 11, curY + 28);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...COLORS.inkMuted);
  doc.text("Carries emotional warmth, intuition, fertility & domestic peace.", margin + halfW + 11, curY + 34);

  // Social Purpose Synthesis Banner
  curY += clanBoxH + 4;
  const synthH = 16;
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.slate);
  doc.roundedRect(margin, curY, contentWidth, synthH, 1.5, 1.5, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.slate);
  doc.text(`Social Purpose Synthesis (Ages 40-60): Energy ${matrix.ancestralLineage.socialPurpose}`, margin + 5, curY + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...COLORS.inkDark);
  doc.text(`Harmonizing Male (${matrix.ancestralLineage.paternal.total}) + Female (${matrix.ancestralLineage.maternal.total}) resolves generational karma for future descendants.`, margin + 5, curY + 11);

  // Pillar 4: The Karmic Tail Program
  curY += synthH + 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.slate);
  doc.text("Pillar IV: The Karmic Tail & Subconscious Traps", margin, curY);

  curY += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.inkMuted);
  doc.text(`Triad Signature: ${matrix.karmicTail.points.join(" - ")}  •  ${matrix.karmicTail.name || "Custom Karmic Triad"}`, margin, curY);

  curY += 6;
  const karmicBoxH = 88;
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin, curY, contentWidth, karmicBoxH, 2, 2, "FD");

  // Accent line
  doc.setFillColor(220, 38, 38);
  doc.rect(margin, curY, 2, karmicBoxH, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(185, 28, 28);
  doc.text(`Karmic Archetype: ${matrix.karmicTail.name || "Custom Karmic Triad"}`, margin + 6, curY + 7);

  // Past Life Story
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.slate);
  doc.text("Past-Life Dilemma & Origin:", margin + 6, curY + 14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);
  const storyText = matrix.karmicTail.pastLifeStory || karmicRootArcana.karmic.pastLesson;
  const storyLines = doc.splitTextToSize(storyText, contentWidth - 12);
  doc.text(storyLines.slice(0, 3), margin + 6, curY + 18);

  // Recursive Loop Trap (Minus)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(185, 28, 28);
  doc.text("The Recursive Present-Life Trap (Minus):", margin + 6, curY + 34);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);
  const trapText = matrix.karmicTail.currentLifeTrap || karmicRootArcana.karmic.pastLesson;
  const trapLines = doc.splitTextToSize(trapText, contentWidth - 12);
  doc.text(trapLines.slice(0, 3), margin + 6, curY + 38);

  // Transmutation Protocol
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.terracotta);
  doc.text("Transmutation Protocol (Evolutionary Unlock):", margin + 6, curY + 54);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);

  if (matrix.karmicTail.healingRecommendations && matrix.karmicTail.healingRecommendations.length > 0) {
    matrix.karmicTail.healingRecommendations.slice(0, 3).forEach((rec, rIdx) => {
      const recLines = doc.splitTextToSize(`• ${rec}`, contentWidth - 12);
      doc.text(recLines[0] || "", margin + 6, curY + 60 + rIdx * 5);
    });
  } else {
    const evolLines = doc.splitTextToSize(karmicRootArcana.karmic.evolutionaryPath, contentWidth - 12);
    doc.text(evolLines.slice(0, 2), margin + 6, curY + 60);
  }

  // ===========================================================================
  // PAGE 4: WEALTH, RELATIONSHIPS, TALENTS & HOLISTIC DISCLAIMER
  // ===========================================================================
  doc.addPage();
  renderHeaderFooter(4, "Archetypal Readings: Material & Relational Realization");


  curY = 22;

  // Pillar 3: Money & Career Realization
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.slate);
  doc.text(`Pillar III: Financial Realization • Energy ${moneyPt.value}: ${moneyArcana.name}`, margin, curY);

  curY += 5;
  const moneyBoxH = 46;
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin, curY, contentWidth, moneyBoxH, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.slate);
  doc.text("Optimal Career Avenues & Fields:", margin + 6, curY + 6);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);
  const careerLines = doc.splitTextToSize(moneyArcana.money.careerPath, contentWidth - 12);
  doc.text(careerLines.slice(0, 2), margin + 6, curY + 10);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.terracotta);
  doc.text("Wealth Mindset & Expansion:", margin + 6, curY + 19);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);
  const mindsetLines = doc.splitTextToSize(moneyArcana.money.financialMindset, contentWidth - 12);
  doc.text(mindsetLines.slice(0, 2), margin + 6, curY + 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.slate);
  doc.text("Potential Financial Blockage:", margin + 6, curY + 32);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);
  const blockLines = doc.splitTextToSize(moneyArcana.money.potentialBlock, contentWidth - 12);
  doc.text(blockLines.slice(0, 2), margin + 6, curY + 36);

  // Pillar 4: Love & Relational Harmony
  curY += moneyBoxH + 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.slate);
  doc.text(`Pillar IV: Relationships & Partnership • Energy ${lovePt.value}: ${loveArcana.name}`, margin, curY);

  curY += 5;
  const loveBoxH = 46;
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin, curY, contentWidth, loveBoxH, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.slate);
  doc.text("Relational Dynamics:", margin + 6, curY + 6);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);
  const relLines = doc.splitTextToSize(loveArcana.relationships.dynamics, contentWidth - 12);
  doc.text(relLines.slice(0, 2), margin + 6, curY + 10);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.terracotta);
  doc.text("Resonant Partner Archetype:", margin + 6, curY + 19);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);
  const partnerLines = doc.splitTextToSize(loveArcana.relationships.partnerProfile, contentWidth - 12);
  doc.text(partnerLines.slice(0, 2), margin + 6, curY + 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.slate);
  doc.text("Key Growth Area:", margin + 6, curY + 32);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);
  const growthLines = doc.splitTextToSize(loveArcana.relationships.growthArea, contentWidth - 12);
  doc.text(growthLines.slice(0, 2), margin + 6, curY + 36);

  // Pillar 5: Higher Talents & Spiritual Realization
  curY += loveBoxH + 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.slate);
  doc.text(`Pillar V: Higher Talents & Spiritual Realization • Energy ${spiritPt.value}: ${spiritArcana.name}`, margin, curY);

  curY += 5;
  const spiritBoxH = 34;
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin, curY, contentWidth, spiritBoxH, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.slate);
  doc.text("Primary Sovereign Talent:", margin + 6, curY + 6);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);
  const giftLines = doc.splitTextToSize(spiritArcana.talents.primaryGift, contentWidth - 12);
  doc.text(giftLines.slice(0, 2), margin + 6, curY + 10);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.terracotta);
  doc.text("Activation Protocol:", margin + 6, curY + 19);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.inkDark);
  const actLines = doc.splitTextToSize(spiritArcana.talents.activation, contentWidth - 12);
  doc.text(actLines.slice(0, 2), margin + 6, curY + 23);

  // Disclaimer & Verification Note (Bottom of Page 3)
  curY += spiritBoxH + 6;
  const disclaimerH = 26;
  doc.setFillColor(243, 240, 235);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin, curY, contentWidth, disclaimerH, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.slate);
  doc.text("HOLISTIC DISCLAIMER & PRODUCT VERIFICATION", margin + 5, curY + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...COLORS.inkMuted);
  const disclaimerBody = "This Matrix of Destiny dossier is generated for personal contemplation, spiritual introspection, and entertainment purposes only. It is not intended as medical, psychological, financial, or legal counsel. To explore interactive charts, calculate relationship compatibility, or recalculate with alternative dates, visit:";
  const discLines = doc.splitTextToSize(disclaimerBody, contentWidth - 10);
  doc.text(discLines, margin + 5, curY + 9.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.terracotta);
  doc.text(SITE_URL, margin + 5, curY + 21);

  // Save the generated PDF
  const outputFileName = userName
    ? `Destiny-Matrix-${userName.replace(/[^a-zA-Z0-9_-]/g, "_")}-${dateSlug}.pdf`
    : `Destiny-Matrix-${dateSlug}.pdf`;

  doc.save(outputFileName);
}

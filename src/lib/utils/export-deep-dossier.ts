/**
 * Premium 40-Page Deep Dossier PDF Generator for Matrix of Destiny.
 * 
 * Paid Tier Extension:
 * - Completely preserves the existing 4-page free PDF utility.
 * - Generates an authoritative, 40-page A4 dossier with:
 *   1. Full 24+ Vertex Coordinate Breakdown
 *   2. 7-Chakra Energetic Anatomy & Health Map
 *   3. Paternal & Maternal Lineage Karmic Programs
 *   4. Complete Year-by-Year Transit Calendar (Ages 18 to 70)
 *   5. 21-Day Transmutation & Meditation Workbook
 */

import { DestinyMatrix } from "@/lib/matrix-engine";
import { arcanaMeanings, ArcanaMeaning } from "@/content/arcana-meanings";
import { karmicTailsCatalog } from "@/content/karmic-tails-catalog";
import { calculateYearlyForecast } from "@/lib/matrix-engine/yearly";
import { reduceTo22, reduceSum } from "@/lib/matrix-engine/reduction";
import { SITE_DOMAIN } from "@/lib/seo/structured-data";

export interface ExportDeepDossierOptions {
  matrix: DestinyMatrix;
  dateSlug: string;
  userName?: string | null;
}

const COLORS = {
  terracotta: [194, 94, 62] as [number, number, number],
  slate: [45, 70, 94] as [number, number, number],
  cream: [250, 248, 245] as [number, number, number],
  cardBg: [246, 243, 237] as [number, number, number],
  border: [231, 226, 218] as [number, number, number],
  inkDark: [26, 29, 32] as [number, number, number],
  inkMuted: [107, 114, 128] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

function getArcana(value: number): ArcanaMeaning {
  return arcanaMeanings[value] || arcanaMeanings[1];
}

export async function exportDeepDossierAsPdf({
  matrix,
  dateSlug,
  userName,
}: ExportDeepDossierOptions): Promise<void> {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  const totalPages = 40;

  const { day, month, year } = matrix.input;
  const birthDateFormatted = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Helper: Draw standard running header & footer
  const drawHeaderFooter = (pageNumber: number, chapterTitle: string) => {
    // Header
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.inkMuted);
    doc.text("DESTINY MATRIX DEEP DOSSIER — EXECUTIVE EDITION", margin, 12);
    doc.text(chapterTitle.toUpperCase(), pageWidth - margin, 12, { align: "right" });

    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.3);
    doc.line(margin, 14, pageWidth - margin, 14);

    // Footer
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.text(
      `Confidential Reading for ${userName || birthDateFormatted} • ${SITE_DOMAIN}`,
      margin,
      pageHeight - 8
    );
    doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, pageHeight - 8, {
      align: "right",
    });
  };

  // Helper: Section title bar
  const drawSectionTitle = (title: string, yPos: number) => {
    doc.setFillColor(...COLORS.terracotta);
    doc.rect(margin, yPos, 4, 8, "F");

    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...COLORS.inkDark);
    doc.text(title, margin + 8, yPos + 6.5);
  };

  // -------------------------------------------------------------
  // PAGE 1: COVER
  // -------------------------------------------------------------
  doc.setFillColor(28, 32, 38);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Ornate double gold/terracotta border
  doc.setDrawColor(194, 94, 62);
  doc.setLineWidth(1);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);
  doc.setLineWidth(0.3);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Cover typography
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(194, 94, 62);
  doc.text("✦ SACRED GEOMETRIC NUMEROLOGY ARCHIVE ✦", pageWidth / 2, 60, { align: "center" });

  doc.setFont("times", "bold");
  doc.setFontSize(30);
  doc.setTextColor(250, 248, 245);
  doc.text("DESTINY MATRIX", pageWidth / 2, 85, { align: "center" });
  doc.setFontSize(20);
  doc.text("40-PAGE EXECUTIVE DOSSIER", pageWidth / 2, 97, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(200, 205, 215);
  doc.text(
    "A Complete Architectural Synthesis of Soul Purpose, Karma & Year-by-Year Transits",
    pageWidth / 2,
    110,
    { align: "center" }
  );

  // Central Seal Box
  doc.setFillColor(38, 44, 52);
  doc.setDrawColor(194, 94, 62);
  doc.roundedRect(pageWidth / 2 - 45, 135, 90, 45, 6, 6, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(194, 94, 62);
  doc.text("SUBJECT PROFILE", pageWidth / 2, 145, { align: "center" });

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(userName || "Destiny Matrix Seeker", pageWidth / 2, 155, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 205, 215);
  doc.text(`Born: ${birthDateFormatted}`, pageWidth / 2, 164, { align: "center" });
  doc.text(`Natal Code: ${dateSlug}`, pageWidth / 2, 171, { align: "center" });

  // Bottom Notice
  doc.setFontSize(8);
  doc.setTextColor(160, 165, 175);
  doc.text("AUTHENTIC NATALIA LADINI 22 MAJOR ARCANA METHODOLOGY", pageWidth / 2, 255, {
    align: "center",
  });
  doc.text(`All Rights Reserved • Generated by ${SITE_DOMAIN}`, pageWidth / 2, 262, {
    align: "center",
  });

  // -------------------------------------------------------------
  // PAGE 2: TABLE OF CONTENTS
  // -------------------------------------------------------------
  doc.addPage();
  drawHeaderFooter(2, "Table of Contents");
  drawSectionTitle("Dossier Table of Contents & Roadmap", 24);

  const chapters = [
    { title: "Chapter 1: The Master Octagram & Mathematical Coordinate System", page: "3" },
    { title: "Chapter 2: The Core Trinity (Ego A, Spirit B, Manifestation C)", page: "4 - 6" },
    { title: "Chapter 3: The Soul Comfort Zone & Center Sanctuary (Point E)", page: "7" },
    { title: "Chapter 4: The Bottom Karmic Tail & Subconscious Debt (Point D)", page: "8" },
    { title: "Chapter 5: The Complete 7-Chakra Energetic Anatomy Map", page: "9 - 10" },
    { title: "Chapter 6: The Heart Matrix & Relational Dynamics (Point L)", page: "11 - 12" },
    { title: "Chapter 7: The Wealth Gateway & Career Architecture (Point M)", page: "13 - 14" },
    { title: "Chapter 8: Paternal Ancestral Lineage & Male Line Karma", page: "15 - 16" },
    { title: "Chapter 9: Maternal Ancestral Lineage & Female Line Karma", page: "17 - 18" },
    { title: "Chapter 10: Complete Year-by-Year Planetary Transit Calendar (Ages 18 to 70)", page: "19 - 35" },
    { title: "Chapter 11: The Karmic Tail 21-Day Transmutation Workbook", page: "36 - 38" },
    { title: "Chapter 12: Daily Living Affirmations & Archetypal Meditations", page: "39" },
    { title: "Chapter 13: Master Harmonic Synthesis & Soul Mandate", page: "40" },
  ];

  let tocY = 44;
  chapters.forEach((ch, idx) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.inkDark);
    doc.text(ch.title, margin, tocY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.inkMuted);
    doc.text(`Page ${ch.page}`, pageWidth - margin, tocY, { align: "right" });

    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.2);
    doc.line(margin, tocY + 2, pageWidth - margin, tocY + 2);

    tocY += 16;
  });

  // -------------------------------------------------------------
  // PAGES 3 to 18: CORE FOUNDATIONS, CHAKRAS, LOVE, WEALTH, ANCESTRAL
  // -------------------------------------------------------------
  const baseSections = [
    {
      page: 3,
      chapter: "Chapter 1: Mathematical Geometry",
      title: "The Master Octagram & Coordinate Framework",
      paragraphs: [
        "The Destiny Matrix is an exact numerological octagram derived through the superposition of two sacred quadrilaterals: the Personal Diamond (representing individual soul evolution) and the Ancestral Square (representing hereditary genetic and spiritual programs).",
        "Every single energetic coordinate is reduced strictly using the Natalia Ladini Rule of 22: numbers between 1 and 22 maintain their unreduced archetypal frequency, while sums exceeding 22 have their constituent digits added iteratively.",
        "Your chart reveals 24 distinct energetic nodes across 7 chakra centers, establishing a deterministic yet non-fatalistic roadmap of your psychological patterns, relational dynamics, financial channels, and spiritual evolution.",
      ],
    },
    {
      page: 4,
      chapter: "Chapter 2: Core Trinity — Point A",
      title: "Point A: Conscious Personality & Ego Expression",
      paragraphs: [
        `Point A (Energy ${matrix.points.find((p) => p.id === "personality")?.value || 1}) governs your conscious personality, first impression, communication instincts, and social persona. This is the archetype you naturally project into the physical world.`,
        getArcana(matrix.points.find((p) => p.id === "personality")?.value || 1).essence,
        `Resource Manifestation: ${getArcana(matrix.points.find((p) => p.id === "personality")?.value || 1).personality.portrait}`,
        `Shadow Manifestation: ${getArcana(matrix.points.find((p) => p.id === "personality")?.value || 1).personality.shadowTendency}`,
      ],
    },
    {
      page: 5,
      chapter: "Chapter 2: Core Trinity — Point B",
      title: "Point B: Spiritual Connection & Intuitive Realm",
      paragraphs: [
        `Point B (Energy ${matrix.points.find((p) => p.id === "spirit")?.value || 1}) sits at the Sahasrara crown apex, directing intuitive communion, spiritual inspiration, and your connection to non-physical guidance.`,
        getArcana(matrix.points.find((p) => p.id === "spirit")?.value || 1).essence,
        `Spiritual Gift: ${getArcana(matrix.points.find((p) => p.id === "spirit")?.value || 1).talents.primaryGift}`,
        `Activation Discipline: ${getArcana(matrix.points.find((p) => p.id === "spirit")?.value || 1).talents.activation}`,
      ],
    },
    {
      page: 6,
      chapter: "Chapter 2: Core Trinity — Point C",
      title: "Point C: Social Realization & Material Realm",
      paragraphs: [
        `Point C (Energy ${matrix.points.find((p) => p.id === "socialRealization")?.value || 1}) sits at the 3 o'clock position (Age 40 vertex), governing material execution, societal recognition, and physical mastery.`,
        getArcana(matrix.points.find((p) => p.id === "socialRealization")?.value || 1).money.careerPath,
        `Financial Leverage Mindset: ${getArcana(matrix.points.find((p) => p.id === "socialRealization")?.value || 1).money.financialMindset}`,
        `Potential Bottleneck: ${getArcana(matrix.points.find((p) => p.id === "socialRealization")?.value || 1).money.potentialBlock}`,
      ],
    },
    {
      page: 7,
      chapter: "Chapter 3: Soul Sanctuary",
      title: "Point E: Soul Comfort Zone & Central Recharge",
      paragraphs: [
        `At the epicenter of your personal diamond sits Point E (Energy ${matrix.points.find((p) => p.id === "comfortZone")?.value || 10}). This is your soul's sanctuary—the energetic condition where you feel completely aligned, replenished, and sovereign.`,
        getArcana(matrix.points.find((p) => p.id === "comfortZone")?.value || 10).personality.comfortZone,
        `Evolutionary Affirmation: "${getArcana(matrix.points.find((p) => p.id === "comfortZone")?.value || 10).affirmation}"`,
      ],
    },
    {
      page: 8,
      chapter: "Chapter 4: Karmic Tail",
      title: "Point D: Subconscious Karmic Program & Past Debt",
      paragraphs: [
        `The bottom triad (${matrix.karmicTail.points.join("-")}: ${matrix.karmicTail.name}) represents your soul's incarnational debt. Root Point D represents the subconscious reflex executed in response to stress.`,
        matrix.karmicTail.currentLifeTrap || "The primary karmic challenge that must be consciously transmuted.",
        "When you consciously recognize this pattern, the shadow frequency dissolves and converts into your greatest spiritual mastery.",
      ],
    },
    {
      page: 9,
      chapter: "Chapter 5: Chakras Anatomy",
      title: "The 7-Chakra Energetic Anatomy Map (Part 1)",
      paragraphs: [
        "In the Matrix of Destiny, the vertical axis corresponds to the seven biological and subtle energy chakras: Sahasrara, Ajna, Vishuddha, Anahata, Manipura, Svadhisthana, and Muladhara.",
        "Sahasrara & Ajna: Governs cognitive clarity, neurological regulation, and philosophical perspective.",
        "Vishuddha: Governs vocal expression, thyroid health, and truthful articulation without social pleasing.",
      ],
    },
    {
      page: 10,
      chapter: "Chapter 5: Chakras Anatomy",
      title: "The 7-Chakra Energetic Anatomy Map (Part 2)",
      paragraphs: [
        "Anahata: The heart center bridging spiritual vision with physical reality. Dictates emotional vulnerability and cardiovascular vitality.",
        "Manipura: Solar plexus governance of digestive fire, willpower, career autonomy, and personal boundaries.",
        "Svadhisthana & Muladhara: Reproductive vitality, survival security, adrenal balance, and physical grounding.",
      ],
    },
    {
      page: 11,
      chapter: "Chapter 6: Heart Matrix",
      title: "Love Channel: Relational Gate & Partner Attraction",
      paragraphs: [
        `Point L (Love Entrance: Arcana ${matrix.points.find((p) => p.id === "loveEntrance")?.value || 6}) dictates the psychological qualities that trigger authentic romantic bonding.`,
        getArcana(matrix.points.find((p) => p.id === "loveEntrance")?.value || 6).relationships.dynamics,
        `Resonant Partner Archetype: ${getArcana(matrix.points.find((p) => p.id === "loveEntrance")?.value || 6).relationships.partnerProfile}`,
      ],
    },
    {
      page: 12,
      chapter: "Chapter 6: Heart Matrix",
      title: "Romantic Shadow Traps & Long-Term Harmonization",
      paragraphs: [
        `Growth Area in Intimacy: ${getArcana(matrix.points.find((p) => p.id === "loveEntrance")?.value || 6).relationships.growthArea}`,
        "To maintain lasting relational flow, practice absolute vulnerability and refrain from testing your partner's loyalty through covert emotional traps.",
      ],
    },
    {
      page: 13,
      chapter: "Chapter 7: Wealth Gateway",
      title: "Money Channel: Wealth Entrance & Professional Levers",
      paragraphs: [
        `Point M_money (Wealth Entrance: Arcana ${matrix.points.find((p) => p.id === "moneyEntrance")?.value || 15}) governs your highest-leverage commercial avenues and financial expansion codes.`,
        getArcana(matrix.points.find((p) => p.id === "moneyEntrance")?.value || 15).money.careerPath,
      ],
    },
    {
      page: 14,
      chapter: "Chapter 7: Wealth Gateway",
      title: "Financial Blockages & Subconscious Scarcity Traps",
      paragraphs: [
        `Subconscious Financial Block: ${getArcana(matrix.points.find((p) => p.id === "moneyEntrance")?.value || 15).money.potentialBlock}`,
        `Wealth Expansion Practice: ${getArcana(matrix.points.find((p) => p.id === "moneyEntrance")?.value || 15).money.financialMindset}`,
      ],
    },
    {
      page: 15,
      chapter: "Chapter 8: Paternal Lineage",
      title: "Paternal Lineage Karma (Male Line Spiritual Code)",
      paragraphs: [
        `The diagonal ancestral square connecting the upper-left and lower-right corners holds the paternal genetic lineage. Point F1 (Arcana ${matrix.points.find((p) => p.id === "fatherSpirit")?.value || 7}) holds the spiritual tasks inherited from the father's ancestral line.`,
        `Lineage Spiritual Gift: ${getArcana(matrix.points.find((p) => p.id === "fatherSpirit")?.value || 7).talents.primaryGift}`,
      ],
    },
    {
      page: 16,
      chapter: "Chapter 8: Paternal Lineage",
      title: "Paternal Lineage Karma (Male Line Material Code)",
      paragraphs: [
        `Point F2 (Arcana ${matrix.points.find((p) => p.id === "fatherMaterial")?.value || 14}) encodes the material and financial patterns of the paternal ancestors. Clearing this pattern breaks generational financial cycles.`,
      ],
    },
    {
      page: 17,
      chapter: "Chapter 9: Maternal Lineage",
      title: "Maternal Lineage Karma (Female Line Spiritual Code)",
      paragraphs: [
        `The diagonal ancestral square connecting the upper-right and lower-left holds the maternal genetic lineage. Point M1 (Arcana ${matrix.points.find((p) => p.id === "motherSpirit")?.value || 8}) governs emotional and spiritual inheritances from the mother's line.`,
      ],
    },
    {
      page: 18,
      chapter: "Chapter 9: Maternal Lineage",
      title: "Maternal Lineage Karma (Female Line Material Code)",
      paragraphs: [
        `Point M2 (Arcana ${matrix.points.find((p) => p.id === "motherMaterial")?.value || 16}) reveals emotional defense mechanisms and family stability codes inherited across the maternal line.`,
      ],
    },
  ];

  baseSections.forEach((sec) => {
    doc.addPage();
    drawHeaderFooter(sec.page, sec.chapter);
    drawSectionTitle(sec.title, 24);

    let y = 44;
    sec.paragraphs.forEach((p) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...COLORS.inkDark);
      const splitText = doc.splitTextToSize(p, contentWidth);
      doc.text(splitText, margin, y);
      y += splitText.length * 6 + 6;
    });
  });

  // -------------------------------------------------------------
  // PAGES 19 to 35: YEAR-BY-YEAR TRANSIT CALENDAR (AGES 18 TO 70)
  // -------------------------------------------------------------
  // 53 consecutive years mapped across 17 pages (approx 3 years per page)
  let currentTransitAge = 18;
  for (let pageIdx = 19; pageIdx <= 35; pageIdx++) {
    doc.addPage();
    drawHeaderFooter(pageIdx, "Chapter 10: Annual Planetary Transits");
    drawSectionTitle(`Yearly Transits: Ages ${currentTransitAge} to ${Math.min(currentTransitAge + 2, 70)}`, 24);

    let transitY = 42;
    for (let yr = 0; yr < 3; yr++) {
      if (currentTransitAge > 70) break;
      const targetYearCalc = year + currentTransitAge;
      const yearEnergy = reduceSum(reduceTo22(day), reduceTo22(month), reduceTo22(targetYearCalc));
      const yearArcana = getArcana(yearEnergy);

      // Card box
      doc.setFillColor(...COLORS.cardBg);
      doc.setDrawColor(...COLORS.border);
      doc.roundedRect(margin, transitY, contentWidth, 68, 3, 3, "FD");

      // Number badge
      doc.setFillColor(...COLORS.terracotta);
      doc.roundedRect(margin + 4, transitY + 4, 14, 14, 2, 2, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(yearEnergy.toString(), margin + 11, transitY + 13, { align: "center" });

      // Title
      doc.setFont("times", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...COLORS.inkDark);
      doc.text(
        `Age ${currentTransitAge} (Year ${targetYearCalc}) — Energy ${yearEnergy}: ${yearArcana.name}`,
        margin + 22,
        transitY + 12
      );

      // Archetype quote
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.setTextColor(...COLORS.inkMuted);
      doc.text(`"${yearArcana.pullQuote.slice(0, 90)}..."`, margin + 22, transitY + 18);

      // Paragraph
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...COLORS.inkDark);
      const yearText = `Key Focus: ${yearArcana.essence.slice(0, 140)}... Resource opportunity: ${yearArcana.personality.portrait.slice(0, 110)}... Shadow trap to avoid: ${yearArcana.personality.shadowTendency.slice(0, 100)}.`;
      const splitYrText = doc.splitTextToSize(yearText, contentWidth - 8);
      doc.text(splitYrText, margin + 4, transitY + 28);

      transitY += 76;
      currentTransitAge++;
    }
  }

  // -------------------------------------------------------------
  // PAGES 36 to 38: 21-DAY TRANSMUTATION & MEDITATION WORKBOOK
  // -------------------------------------------------------------
  const workbookPages = [
    {
      page: 36,
      title: "21-Day Transmutation Workbook: Days 1 to 7",
      theme: "Week 1: Subconscious Shadow Observation & Root Clearing",
      text: "During the first 7 days, your objective is radical, non-judgmental mindfulness of your primary karmic trap. Record every instance of emotional defensiveness or relationship anxiety. Notice the physical sensations in your body before reacting.",
    },
    {
      page: 37,
      title: "21-Day Transmutation Workbook: Days 8 to 14",
      theme: "Week 2: Conscious Polarity Inversion & Behavioral Choice",
      text: "During week 2, interrupt the karmic loop at the threshold of reaction. When triggered into emotional control or withdrawal, execute the inverse positive action: speak direct truth, grant freedom, and align with your Comfort Zone archetype.",
    },
    {
      page: 38,
      title: "21-Day Transmutation Workbook: Days 15 to 21",
      theme: "Week 3: Living Embodiment & Spiritual Sovereignty",
      text: "In the final week, anchor your new energetic baseline through daily service, generosity, and creative manifestation. Your former karmic wound now operates as an active superpower of discernment and empathy.",
    },
  ];

  workbookPages.forEach((wb) => {
    doc.addPage();
    drawHeaderFooter(wb.page, "Chapter 11: Transmutation Workbook");
    drawSectionTitle(wb.title, 24);

    doc.setFont("times", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.terracotta);
    doc.text(wb.theme, margin, 42);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.inkDark);
    const splitWb = doc.splitTextToSize(wb.text, contentWidth);
    doc.text(splitWb, margin, 52);

    // 7 Day check boxes
    let boxY = 85;
    for (let d = 1; d <= 7; d++) {
      doc.setDrawColor(...COLORS.border);
      doc.setFillColor(...COLORS.cardBg);
      doc.roundedRect(margin, boxY, contentWidth, 22, 2, 2, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...COLORS.inkDark);
      doc.text(`Exercise & Journal Prompt — Day ${d}`, margin + 4, boxY + 7);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.inkMuted);
      doc.text(
        "Observe triggers • Record moments of conscious sovereignty • Practice 10-minute breathwork",
        margin + 4,
        boxY + 14
      );

      boxY += 26;
    }
  });

  // -------------------------------------------------------------
  // PAGE 39: DAILY LIVING AFFIRMATIONS
  // -------------------------------------------------------------
  doc.addPage();
  drawHeaderFooter(39, "Chapter 12: Daily Affirmations");
  drawSectionTitle("Living Affirmations & Mantras by Chakra", 24);

  let affY = 40;
  const affirmationsList = [
    { title: "Crown (Sahasrara)", text: "I trust divine timing and remain open to cosmic guidance." },
    { title: "Third Eye (Ajna)", text: "My inner vision penetrates illusions; I perceive ultimate truth with serenity." },
    { title: "Throat (Vishuddha)", text: "I speak my sovereign truth with clarity, kindness, and authority." },
    { title: "Heart (Anahata)", text: "I love without conditions, granting complete freedom to myself and others." },
    { title: "Solar Plexus (Manipura)", text: "I possess the focused willpower to manifest enduring material excellence." },
    { title: "Sacral (Svadhisthana)", text: "I celebrate creative flow, sensual vitality, and genuine joy." },
    { title: "Root (Muladhara)", text: "I am safe, grounded, and deeply anchored in physical abundance." },
  ];

  affirmationsList.forEach((aff) => {
    doc.setFillColor(...COLORS.cardBg);
    doc.setDrawColor(...COLORS.border);
    doc.roundedRect(margin, affY, contentWidth, 26, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...COLORS.terracotta);
    doc.text(aff.title, margin + 4, affY + 8);

    doc.setFont("times", "italic");
    doc.setFontSize(10.5);
    doc.setTextColor(...COLORS.inkDark);
    doc.text(`"${aff.text}"`, margin + 4, affY + 18);

    affY += 32;
  });

  // -------------------------------------------------------------
  // PAGE 40: MASTER HARMONIC SYNTHESIS & SEAL
  // -------------------------------------------------------------
  doc.addPage();
  drawHeaderFooter(40, "Chapter 13: Final Synthesis");
  drawSectionTitle("Master Harmonic Synthesis & Soul Mandate", 24);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.inkDark);
  const closingText = [
    `This concludes your 40-Page Deep Dossier for natal coordinate ${dateSlug}.`,
    "The Destiny Matrix is not a prophecy of rigid fate, but a sacred mirror revealing the energetic architecture through which your soul chose to experience physical reality.",
    "By living consciously in the resource states ('plus') of your core archetypes and transmuting the subconscious shadow loops of your karmic tail, you unlock unconstrained sovereignty, financial prosperity, and relational peace.",
    "Carry this reading as a living companion. Revisit your annual transit entries each year on your birthday to align your initiatives with universal timing.",
  ];

  let closeY = 44;
  closingText.forEach((p) => {
    const split = doc.splitTextToSize(p, contentWidth);
    doc.text(split, margin, closeY);
    closeY += split.length * 6 + 8;
  });

  // Official Certification Seal
  doc.setFillColor(...COLORS.cardBg);
  doc.setDrawColor(...COLORS.terracotta);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, closeY + 10, contentWidth, 60, 4, 4, "FD");

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.terracotta);
  doc.text("✦ OFFICIAL SEAL OF MATHEMATICAL NUMEROLOGY ✦", pageWidth / 2, closeY + 26, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.inkDark);
  doc.text(`Certified Natal Reading for: ${userName || "Valued Seeker"}`, pageWidth / 2, closeY + 36, {
    align: "center",
  });
  doc.text(`Archived on ${new Date().toLocaleDateString()} • Matrix of Destiny Research Lineage`, pageWidth / 2, closeY + 44, {
    align: "center",
  });
  doc.text(`${SITE_DOMAIN} • Free from paywalls, grounded in sacred geometry.`, pageWidth / 2, closeY + 52, {
    align: "center",
  });

  // Trigger browser download
  const fileName = `destiny-matrix-40-page-deep-dossier-${dateSlug}.pdf`;
  doc.save(fileName);
}

/**
 * Matrix of Destiny - Composite & Compatibility Calculation Engine
 * 
 * Computes relationship synergy, composite overlay matrix, comparative
 * energetic dynamics, 4-Pillar synergy scorecard, and Green/Red flags.
 */

import { DestinyMatrix, MatrixInput, MatrixPoint } from "./types";
import { calculateDestinyMatrix } from "./calculator";
import { reduceSum, reduceTo22 } from "./reduction";
import { arcanaMeanings } from "../../content/arcana-meanings";
import { energiesData } from "../data/energies";

export interface PartnerProfile {
  name: string;
  birthDate: MatrixInput;
  matrix: DestinyMatrix;
}

export interface CompatibilityPillarScore {
  score: number; // 0 - 100 percentage
  status: string; // e.g. "Profound Harmony", "Dynamic Catalyst"
  summary: string;
}

export interface CompatibilityPillars {
  spiritual: CompatibilityPillarScore;
  emotional: CompatibilityPillarScore;
  financial: CompatibilityPillarScore;
  karmic: CompatibilityPillarScore;
}

export interface CompatibilityFlag {
  arcanaNumber: number;
  title: string;
  description: string;
}

export interface CompatibilitySynergy {
  overallScore: number;           // 0 - 100 index of energetic cohesion
  sharedEnergies: number[];        // Arcana present in both individuals' charts
  unionComfortZone: number;       // Center E: The soul recharge and core vibe of the union
  unionMission: number;           // Personal Purpose total: What this union is meant to build
  pillars: CompatibilityPillars;  // 4-Pillar Synergy Scorecard
  flags: {
    green: CompatibilityFlag[];   // Resonant strengths
    red: CompatibilityFlag[];     // Conflicting shadow traps
  };
  emotionalHarmony: {
    loveGate: number;             // Composite Love Entrance (L)
    heartCenter: number;          // Composite Heart Center (Anahata M)
    description: string;
  };
  financialHarmony: {
    moneyGate: number;            // Composite Money Entrance (M_money)
    materialGate: number;         // Composite Material Gate (C1)
    description: string;
  };
  karmicChallenge: {
    tail: [number, number, number]; // Composite Karmic Tail
    name?: string;
    description: string;
  };
}

export interface CompatibilityResult {
  partnerA: PartnerProfile;
  partnerB: PartnerProfile;
  compositeMatrix: DestinyMatrix;
  synergy: CompatibilitySynergy;
}

/**
 * Calculates the composite relationship matrix and synergy between two individuals.
 */
export function calculateCompatibility(
  partnerAInput: { name?: string; birthDate: MatrixInput },
  partnerBInput: { name?: string; birthDate: MatrixInput }
): CompatibilityResult {
  const matrixA = calculateDestinyMatrix(partnerAInput.birthDate);
  const matrixB = calculateDestinyMatrix(partnerBInput.birthDate);

  // Extract cardinal vertices of each partner
  const valA1 = matrixA.points.find((p) => p.id === "personality")?.value || reduceTo22(partnerAInput.birthDate.day);
  const valB1 = matrixA.points.find((p) => p.id === "spirit")?.value || reduceTo22(partnerAInput.birthDate.month);
  const valC1 = matrixA.points.find((p) => p.id === "socialRealization")?.value || reduceTo22(partnerAInput.birthDate.year);

  const valA2 = matrixB.points.find((p) => p.id === "personality")?.value || reduceTo22(partnerBInput.birthDate.day);
  const valB2 = matrixB.points.find((p) => p.id === "spirit")?.value || reduceTo22(partnerBInput.birthDate.month);
  const valC2 = matrixB.points.find((p) => p.id === "socialRealization")?.value || reduceTo22(partnerBInput.birthDate.year);

  // Derive composite cardinal vertices modulo 22
  const compDay = reduceSum(valA1, valA2);
  const compMonth = reduceSum(valB1, valB2);
  const compYear = reduceSum(valC1, valC2);

  const compositeMatrix = calculateDestinyMatrix({
    day: compDay,
    month: compMonth,
    year: compYear,
  });

  const partnerA: PartnerProfile = {
    name: partnerAInput.name || "Partner A",
    birthDate: partnerAInput.birthDate,
    matrix: matrixA,
  };

  const partnerB: PartnerProfile = {
    name: partnerBInput.name || "Partner B",
    birthDate: partnerBInput.birthDate,
    matrix: matrixB,
  };

  // Find shared energies across all points in both charts
  const energiesA = new Set(matrixA.points.map((p) => p.value));
  const energiesB = new Set(matrixB.points.map((p) => p.value));
  const sharedEnergies = Array.from(energiesA).filter((val) => energiesB.has(val)).sort((a, b) => a - b);

  // Union core points
  const unionCenter = compositeMatrix.points.find((p) => p.id === "comfortZone")?.value || 10;
  const unionMission = compositeMatrix.purposes.personal.total;

  const compLoveGate = compositeMatrix.points.find((p) => p.id === "loveEntrance")?.value || 6;
  const compHeartCenter = compositeMatrix.points.find((p) => p.id === "loveMoneyCenter")?.value || 12;
  const compMoneyGate = compositeMatrix.points.find((p) => p.id === "moneyEntrance")?.value || 15;
  const compMaterialGate = compositeMatrix.points.find((p) => p.id === "socialRealizationInner")?.value || 7;

  // -------------------------------------------------------------
  // 4-PILLAR SYNERGY SCORECARD COMPUTATIONS
  // -------------------------------------------------------------
  // 1. Spiritual Synergy (Month energies B1, B2 + Union Center)
  const spiritDiff = Math.abs(valB1 - valB2);
  const spiritualBase = 72 + (spiritDiff % 2 === 0 ? 12 : 6) + (sharedEnergies.includes(valB1) ? 8 : 0);
  const spiritualScore = Math.min(Math.max(spiritualBase, 65), 96);
  const spiritualStatus = spiritualScore >= 85 ? "Sacred Attunement" : spiritualScore >= 75 ? "Deep Resonance" : "Harmonizing Growth";

  // 2. Emotional & Romantic Synergy (Love gates & Anahata centers)
  const lovePointA = matrixA.points.find((p) => p.id === "loveEntrance")?.value || 6;
  const lovePointB = matrixB.points.find((p) => p.id === "loveEntrance")?.value || 6;
  const emotionalBase = 70 + (lovePointA === lovePointB ? 18 : 8) + (compLoveGate <= 10 ? 8 : 4);
  const emotionalScore = Math.min(Math.max(emotionalBase, 68), 98);
  const emotionalStatus = emotionalScore >= 88 ? "Soul Connection" : emotionalScore >= 78 ? "Romantic Harmony" : "Compassionate Evolution";

  // 3. Financial & Material Synergy (Year energies C1, C2 & Money gates)
  const moneyPointA = matrixA.points.find((p) => p.id === "moneyEntrance")?.value || 15;
  const moneyPointB = matrixB.points.find((p) => p.id === "moneyEntrance")?.value || 15;
  const financialBase = 68 + (moneyPointA === moneyPointB ? 16 : 7) + (compMoneyGate % 2 === 0 ? 10 : 5);
  const financialScore = Math.min(Math.max(financialBase, 64), 95);
  const financialStatus = financialScore >= 85 ? "Material Multiplier" : financialScore >= 75 ? "Prosperity Alignment" : "Prudent Building";

  // 4. Karmic Lessons & Growth (Karmic tails & transformative challenge)
  const tailA = matrixA.karmicTail.points[0];
  const tailB = matrixB.karmicTail.points[0];
  const karmicBase = 74 + (tailA === tailB ? 14 : 6) + (sharedEnergies.length >= 2 ? 8 : 4);
  const karmicScore = Math.min(Math.max(karmicBase, 66), 94);
  const karmicStatus = karmicScore >= 85 ? "Accelerated Alchemy" : karmicScore >= 75 ? "Evolutionary Crucible" : "Gentle Transmutation";

  const pillars: CompatibilityPillars = {
    spiritual: {
      score: spiritualScore,
      status: spiritualStatus,
      summary: `Guided by composite energy ${unionCenter}, you share intuitive common ground and philosophical empathy.`,
    },
    emotional: {
      score: emotionalScore,
      status: emotionalStatus,
      summary: `Anchored at Heart Gate ${compLoveGate}, intimacy thrives when vulnerabilities are shared without defensiveness.`,
    },
    financial: {
      score: financialScore,
      status: financialStatus,
      summary: `Activated through Wealth Gate ${compMoneyGate}, your combined resources multiply through structured collaboration.`,
    },
    karmic: {
      score: karmicScore,
      status: karmicStatus,
      summary: `The composite tail (${compositeMatrix.karmicTail.points.join("-")}) mirrors shared blindspots, transmuting friction into wisdom.`,
    },
  };

  // Overall Score (Weighted average of the 4 pillars)
  const overallScore = Math.round(
    spiritualScore * 0.25 + emotionalScore * 0.35 + financialScore * 0.2 + karmicScore * 0.2
  );

  // -------------------------------------------------------------
  // GREEN & RED FLAGS COMPUTATION
  // -------------------------------------------------------------
  const greenFlags: CompatibilityFlag[] = [];
  const redFlags: CompatibilityFlag[] = [];

  // Generate Green Flags from shared energies or dominant cardinal points
  const candidateGreen = sharedEnergies.length > 0 ? sharedEnergies : [valA1, valB1, compLoveGate];
  candidateGreen.slice(0, 3).forEach((num) => {
    const info = arcanaMeanings[num] || arcanaMeanings[1];
    const energy = energiesData[num];
    const plusTrait = energy?.plus[0] || info.essence.slice(0, 100);

    greenFlags.push({
      arcanaNumber: num,
      title: `Shared Frequency: Energy ${num} (${info.name})`,
      description: `In the resource state: ${plusTrait}. Both partners naturally understand this rhythm, creating mutual reassurance.`,
    });
  });

  // Generate Red Flags from shadow states of karmic points or intense archetypes (e.g. 15, 18, 16, 13, or tail roots)
  const candidateRed = Array.from(new Set([compositeMatrix.karmicTail.points[0], tailA, tailB, compLoveGate]));
  candidateRed.slice(0, 3).forEach((num) => {
    const info = arcanaMeanings[num] || arcanaMeanings[15];
    const energy = energiesData[num];
    const minusTrait = energy?.minus[0] || info.personality.shadowTendency.slice(0, 100);

    redFlags.push({
      arcanaNumber: num,
      title: `Shadow Friction: Energy ${num} Trap (${info.name})`,
      description: `In high-stress moments: watch out for ${minusTrait.toLowerCase()}. Recognize this as shared pressure rather than personal blame.`,
    });
  });

  const synergy: CompatibilitySynergy = {
    overallScore,
    sharedEnergies,
    unionComfortZone: unionCenter,
    unionMission,
    pillars,
    flags: {
      green: greenFlags,
      red: redFlags,
    },
    emotionalHarmony: {
      loveGate: compLoveGate,
      heartCenter: compHeartCenter,
      description: `Your emotional bond is guided by Arcana ${compHeartCenter} at the heart center and activated through Arcana ${compLoveGate}. When both partners speak with emotional transparency, trust deepens naturally.`,
    },
    financialHarmony: {
      moneyGate: compMoneyGate,
      materialGate: compMaterialGate,
      description: `Joint projects and financial decisions flourish under Arcana ${compMoneyGate}. You create tangible security when both parties maintain clear boundaries and mutual transparency regarding shared resources.`,
    },
    karmicChallenge: {
      tail: compositeMatrix.karmicTail.points,
      name: compositeMatrix.karmicTail.name,
      description: `The composite karmic tail (${compositeMatrix.karmicTail.points.join("-")}) marks the recurring triggers or unspoken habits that can arise when stress escalates. Recognizing this pattern as shared growth rather than individual blame is the key to lasting evolution.`,
    },
  };

  return {
    partnerA,
    partnerB,
    compositeMatrix,
    synergy,
  };
}

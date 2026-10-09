/**
 * Matrix of Destiny - Yearly Forecast & Age Cycle Engine
 * 
 * Computes the personal annual energy archetype, age perimeter cycle (0–80 years),
 * life development phases, quarterly energetic rhythms, and 3 decomposed transit sub-layers:
 * 1. Manifest Horizon (Outer Action Energy)
 * 2. Evolutionary Crucible (Inner Karmic Refinement)
 * 3. Sovereign Synthesis (Harmonizing Master Action)
 */

import { MatrixInput, DestinyMatrix } from "./types";
import { calculateDestinyMatrix } from "./calculator";
import { reduceSum, reduceTo22 } from "./reduction";
import { arcanaMeanings } from "../../content/arcana-meanings";

export interface AgeCycleMilestone {
  age: number;
  label: string;
  nodeKey: string;
  value: number;
  meaning: string;
}

export interface QuarterForecast {
  quarter: 1 | 2 | 3 | 4;
  label: string;
  months: string;
  energy: number;
  focus: string;
  advice: string;
}

export interface DecomposedTransitLayers {
  manifestHorizon: {
    number: number;
    title: string;
    description: string;
  };
  evolutionaryCrucible: {
    number: number;
    title: string;
    description: string;
  };
  sovereignSynthesis: {
    number: number;
    title: string;
    description: string;
  };
}

export interface YearlyForecast {
  targetYear: number;
  age: number;
  personalYearEnergy: number;
  transitLayers: DecomposedTransitLayers;
  lifePhase: {
    title: string;
    ageRange: string;
    theme: string;
    description: string;
  };
  cycleProgress: {
    startAge: number;
    endAge: number;
    startNode: string;
    endNode: string;
    percentComplete: number;
  };
  quarters: QuarterForecast[];
  milestones: AgeCycleMilestone[];
  yearlyAdvice: {
    opportunities: string[];
    shadowTraps: string[];
    harmonizingAction: string;
  };
}

/**
 * Calculates the annual forecast and life-cycle perimeter position for a given birth date and target year.
 */
export function calculateYearlyForecast(
  input: MatrixInput,
  targetYear: number = new Date().getFullYear()
): YearlyForecast {
  const matrix: DestinyMatrix = calculateDestinyMatrix(input);
  const { day, month, year } = input;

  // Personal Year Energy: Day + Month + Target Year (reduced modulo 22)
  const reducedDay = reduceTo22(day);
  const reducedMonth = reduceTo22(month);
  const reducedTargetYear = reduceTo22(targetYear);
  const personalYearEnergy = reduceSum(reducedDay, reducedMonth, reducedTargetYear);

  // Age at target year (clamped for 0-80 cycle)
  const age = Math.max(0, targetYear - year);
  const cycleAge = age % 80;

  // Determine major 0-80 octagram perimeter nodes
  const valA = matrix.points.find((p) => p.id === "personality")?.value || reducedDay;
  const valF = matrix.points.find((p) => p.id === "ancestralPaternalSpirit")?.value || reduceSum(valA, reducedMonth);
  const valB = matrix.points.find((p) => p.id === "spirit")?.value || reducedMonth;
  const valG = matrix.points.find((p) => p.id === "ancestralMaternalSpirit")?.value || reduceSum(reducedMonth, reduceTo22(year));
  const valC = matrix.points.find((p) => p.id === "socialRealization")?.value || reduceTo22(year);
  const valH = matrix.points.find((p) => p.id === "ancestralMaternalMaterial")?.value || reduceSum(valC, reduceSum(valA, valB, valC));
  const valD = matrix.points.find((p) => p.id === "karmicTailRoot")?.value || reduceSum(valA, valB, valC);
  const valI = matrix.points.find((p) => p.id === "ancestralPaternalMaterial")?.value || reduceSum(valA, valD);

  const milestones: AgeCycleMilestone[] = [
    { age: 0, label: "Birth & Inception", nodeKey: "personality", value: valA, meaning: "Innate vitality and physical manifestation." },
    { age: 10, label: "Childhood Socialization", nodeKey: "ancestralPaternalSpirit", value: valF, meaning: "Paternal lineage gifts and early moral worldview." },
    { age: 20, label: "Spiritual Awakening", nodeKey: "spirit", value: valB, meaning: "Intuitive awakening and initial adult independence." },
    { age: 30, label: "Maternal Creative Integration", nodeKey: "ancestralMaternalSpirit", value: valG, meaning: "Empathy, relational refinement, and emotional resilience." },
    { age: 40, label: "Social & Material Peak", nodeKey: "socialRealization", value: valC, meaning: "Career harvest, worldly authority, and external creation." },
    { age: 50, label: "Ancestral Material Balance", nodeKey: "ancestralMaternalMaterial", value: valH, meaning: "Sustaining long-term abundance and grounding family resources." },
    { age: 60, label: "Karmic Resolution", nodeKey: "karmicTailRoot", value: valD, meaning: "Deep subconscious resolution and liberation from old patterns." },
    { age: 70, label: "Grounding of Wisdom", nodeKey: "ancestralPaternalMaterial", value: valI, meaning: "Elder stewardship, physical conservation, and rooted wisdom." },
    { age: 80, label: "Cycle Rebirth", nodeKey: "personality", value: valA, meaning: "Full return to pure archetypal innocence and legacy handover." },
  ];

  // -------------------------------------------------------------
  // DECOMPOSED TRANSIT LAYERS (3 SUB-NUMBERS)
  // -------------------------------------------------------------
  const layer1Num = reduceSum(reducedDay, reducedTargetYear);
  const layer2Num = reduceSum(valD, reducedTargetYear);
  const layer3Num = reduceSum(layer1Num, layer2Num);

  const arc1 = arcanaMeanings[layer1Num] || arcanaMeanings[1];
  const arc2 = arcanaMeanings[layer2Num] || arcanaMeanings[15];
  const arc3 = arcanaMeanings[layer3Num] || arcanaMeanings[7];

  const transitLayers: DecomposedTransitLayers = {
    manifestHorizon: {
      number: layer1Num,
      title: `The Manifest Horizon: Arcana ${layer1Num} (${arc1.name})`,
      description: `Governs your outer, surface-level environmental focus. This year brings opportunities in ${arc1.essence.slice(0, 110)}...`,
    },
    evolutionaryCrucible: {
      number: layer2Num,
      title: `The Evolutionary Crucible: Arcana ${layer2Num} (${arc2.name})`,
      description: `Your inner psychological test to transmute. Watch out for shadow friction around ${arc2.personality.shadowTendency.slice(0, 110)}...`,
    },
    sovereignSynthesis: {
      number: layer3Num,
      title: `The Sovereign Synthesis: Arcana ${layer3Num} (${arc3.name})`,
      description: `The harmonizing master action. Resolve the tension between your outer horizon and inner crucible through "${arc3.affirmation}"`,
    },
  };

  // Find surrounding milestones
  let startMilestone = milestones[0];
  let endMilestone = milestones[1];

  for (let i = 0; i < milestones.length - 1; i++) {
    if (cycleAge >= milestones[i].age && cycleAge < milestones[i + 1].age) {
      startMilestone = milestones[i];
      endMilestone = milestones[i + 1];
      break;
    }
  }

  // Calculate percentage along current segment
  const segmentDuration = endMilestone.age - startMilestone.age;
  const elapsedInSegment = cycleAge - startMilestone.age;
  const percentComplete = Math.round((elapsedInSegment / segmentDuration) * 100);

  // Life phase definitions
  let lifePhase = {
    title: "The Formative Arc",
    ageRange: "0–20 Years",
    theme: "Absorbing Family Dynamics & Personal Individuation",
    description: "During this early phase, you are constructing your basic personality armor, absorbing paternal/maternal subconscious lessons, and developing your initial ego strength.",
  };

  if (age >= 20 && age < 40) {
    lifePhase = {
      title: "The Creative & Social Construction Arc",
      ageRange: "20–40 Years",
      theme: "Personal Mastery, Career Foundation & Romantic Entrances",
      description: "A pivotal phase of trial, error, and worldly ambition. You confront your karmic tail programs in relationships and establish your initial material footprint.",
    };
  } else if (age >= 40 && age < 60) {
    lifePhase = {
      title: "The Social Realization & Harvest Arc",
      ageRange: "40–60 Years",
      theme: "Societal Purpose, Ancestral Healing & Authority",
      description: "The period where your actions directly shape the collective. You resolve inherited family patterns and step into mentorship, stewardship, and societal contribution.",
    };
  } else if (age >= 60) {
    lifePhase = {
      title: "The Spiritual Integration & Sovereign Arc",
      ageRange: "60+ Years",
      theme: "Spiritual Alchemy, Transmutation & Timeless Legacy",
      description: "The sacred phase of releasing material grasping. You transmute past karmic burdens into unconditional wisdom, offering guidance to younger generations with calm sovereignty.",
    };
  }

  // 4 Quarters Rhythms
  const q1Energy = reduceSum(personalYearEnergy, 1);
  const q2Energy = reduceSum(personalYearEnergy, 2);
  const q3Energy = reduceSum(personalYearEnergy, 3);
  const q4Energy = reduceSum(personalYearEnergy, 4);

  const quarters: QuarterForecast[] = [
    {
      quarter: 1,
      label: "Quarter 1 (Jan - Mar)",
      months: "January, February, March",
      energy: q1Energy,
      focus: "Seeding Intentions & Initial Breakthroughs",
      advice: `Channel Energy ${q1Energy}'s initiative to launch priority projects. Avoid premature doubt.`,
    },
    {
      quarter: 2,
      label: "Quarter 2 (Apr - Jun)",
      months: "April, May, June",
      energy: q2Energy,
      focus: "Relational Calibration & Emotional Stability",
      advice: `Energy ${q2Energy} invites diplomatic collaboration, listening to intuition, and steadying emotional balance.`,
    },
    {
      quarter: 3,
      label: "Quarter 3 (Jul - Sep)",
      months: "July, August, September",
      energy: q3Energy,
      focus: "Material Manifestation & Structural Building",
      advice: `Energy ${q3Energy} supports physical execution, branding, family comfort, and tangible harvest.`,
    },
    {
      quarter: 4,
      label: "Quarter 4 (Oct - Dec)",
      months: "October, November, December",
      energy: q4Energy,
      focus: "Integration, Review & Transmutation",
      advice: `Energy ${q4Energy} requires clearing out obsolete commitments and organizing the foundation for the next annual cycle.`,
    },
  ];

  const opportunities = [
    `Consciously channel Arcana ${personalYearEnergy}'s creative resources into your primary ambitions.`,
    "Take initiative where you previously felt hesitant; this year's vibration supports authentic self-direction.",
    "Cultivate intentional environments and surround yourself with collaborators who mirror your standard.",
  ];

  const shadowTraps = [
    `Over-identifying with temporary friction or forcing outcomes against the natural flow of Arcana ${personalYearEnergy}.`,
    "Procrastinating on necessary boundary conversations out of comfort or fear of conflict.",
    "Neglecting physical recovery rhythms when external demands peak.",
  ];

  const harmonizingAction = `Dedicate quiet time weekly to review whether your daily calendar aligns with Arcana ${personalYearEnergy}'s core lessons of authentic integrity and conscious choice.`;

  return {
    targetYear,
    age,
    personalYearEnergy,
    transitLayers,
    lifePhase,
    cycleProgress: {
      startAge: startMilestone.age,
      endAge: endMilestone.age,
      startNode: startMilestone.label,
      endNode: endMilestone.label,
      percentComplete: Math.max(0, Math.min(percentComplete, 100)),
    },
    quarters,
    milestones,
    yearlyAdvice: {
      opportunities,
      shadowTraps,
      harmonizingAction,
    },
  };
}

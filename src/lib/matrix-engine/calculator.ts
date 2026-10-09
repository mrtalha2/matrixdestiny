/**
 * Matrix of Destiny - Core Calculation Engine
 * 
 * Implements the standard 22 Major Arcana numerology method (Natalia Ladini framework).
 * Completely decoupled from any UI/SVG components, pure functions with zero side effects.
 */

import {
  DestinyMatrix,
  MatrixInput,
  MatrixPoint,
  MatrixLine,
  DestinyPurposes,
  KarmicTail,
  HealthChakraRow,
  HealthMatrix,
  AncestralLineageData,
  AgeCycleNode,
} from "./types";
import { reduceTo22, reduceSum } from "./reduction";
import { findKarmicTail } from "../../content/karmic-tails-catalog";


/**
 * Calculates the complete Destiny Matrix for a given birth date.
 * 
 * @param input Day, Month, and Year of birth (e.g. { day: 24, month: 8, year: 1995 })
 * @returns Fully populated, strongly-typed DestinyMatrix object
 */
export function calculateDestinyMatrix(input: MatrixInput): DestinyMatrix {
  const { day, month, year } = input;

  // =========================================================================
  // 1. PRIMARY CARDINAL VERTICES (The Personal Diamond / Sky Square)
  // =========================================================================

  // Point A (Left Vertex): Personal Portrait & Physical Persona
  // Defined by the Day of Birth reduced to [1, 22].
  const valA = reduceTo22(day);

  // Point B (Top Vertex): Spiritual Connection & Divine Inspiration
  // Defined by the Month of Birth (months 1-12 are naturally <= 22).
  const valB = reduceTo22(month);

  // Point C (Right Vertex): Material Realization & Social Standing
  // Defined by the sum of digits of the Year of Birth reduced to [1, 22].
  const valC = reduceTo22(year);

  // Point D (Bottom Vertex): Base of the Karmic Tail (Past-Life Burden)
  // Calculated as the sum of Left (A) + Top (B) + Right (C).
  const valD = reduceSum(valA, valB, valC);

  // Point E (Center): Soul Comfort Zone & Inner Core Recharge
  // Calculated as the sum of all 4 cardinal vertices: A + B + C + D.
  const valE = reduceSum(valA, valB, valC, valD);

  // =========================================================================
  // 2. ANCESTRAL CLAN VERTICES (The Earth Square / 45° Intersecting Square)
  // =========================================================================

  // Point F (Top-Left): Paternal Spiritual Lineage
  // Sum of Left (A) + Top (B).
  const valF = reduceSum(valA, valB);

  // Point G (Top-Right): Maternal Spiritual Lineage
  // Sum of Top (B) + Right (C).
  const valG = reduceSum(valB, valC);

  // Point H (Bottom-Right): Maternal Material Lineage
  // Sum of Right (C) + Bottom (D).
  const valH = reduceSum(valC, valD);

  // Point I (Bottom-Left): Paternal Material Lineage
  // Sum of Left (A) + Bottom (D).
  const valI = reduceSum(valA, valD);

  // =========================================================================
  // 3. INTERNAL CARDINAL NODES (Between Vertices and Center E)
  // =========================================================================

  // A1: Throat Chakra / Communication & Physical Resources (Between A and E)
  const valA1 = reduceSum(valA, valE);

  // B1: Ajna Chakra / Intuition & Spiritual Talents (Between B and E)
  const valB1 = reduceSum(valB, valE);

  // C1: Manipura Chakra / Material & Financial Entrance (Between C and E)
  const valC1 = reduceSum(valC, valE);

  // D1: Svadhisthana Chakra / Karmic Tail Inner Anchor (Between D and E)
  const valD1 = reduceSum(valD, valE);

  // D2: Muladhara Chakra / Karmic Tail Middle Bridge (Between D and D1)
  const valD2 = reduceSum(valD, valD1);

  // =========================================================================
  // 4. LOVE & MONEY INTERSECTION CHANNEL (Between C1 and D1)
  // =========================================================================

  // Point M: Anahata / Heart Center (Where Money and Love cross)
  // Sum of Material Gate (C1) + Karmic Gate (D1).
  const valM = reduceSum(valC1, valD1);

  // Point L: Love Channel Entrance
  // Sum of Heart Center (M) + Karmic Gate (D1).
  const valL = reduceSum(valM, valD1);

  // Point M_money: Money Channel Entrance
  // Sum of Heart Center (M) + Material Gate (C1).
  const valMoney = reduceSum(valM, valC1);

  // =========================================================================
  // 5. ANCESTRAL INNER INTERMEDIATE NODES (Between F, G, H, I and Center E)
  // =========================================================================
  const valF1 = reduceSum(valF, valE);
  const valG1 = reduceSum(valG, valE);
  const valH1 = reduceSum(valH, valE);
  const valI1 = reduceSum(valI, valE);

  // =========================================================================
  // 6. LIFE PURPOSES & DESTINY TRIADS
  // =========================================================================

  // 1. Personal Purpose (Ages 20–40): Search for Identity & Inner Balance
  const skyPersonal = reduceSum(valB, valD);  // Sky Vertical Axis
  const earthPersonal = reduceSum(valA, valC);// Earth Horizontal Axis
  const totalPersonal = reduceSum(skyPersonal, earthPersonal);

  // 2. Social Purpose (Ages 40–60): Contribution to Society & Ancestral Balance
  const maleSocial = reduceSum(valF, valH);   // Paternal Diagonal
  const femaleSocial = reduceSum(valG, valI); // Maternal Diagonal
  const totalSocial = reduceSum(maleSocial, femaleSocial);

  // 3. Spiritual Purpose (Ages 60+): Transcendent Wisdom & Soul Maturation
  const totalSpiritual = reduceSum(totalPersonal, totalSocial);

  // 4. Planetary Purpose: Global / Collective Evolution
  const totalPlanetary = reduceSum(totalSocial, totalSpiritual);

  const purposes: DestinyPurposes = {
    personal: {
      sky: skyPersonal,
      earth: earthPersonal,
      total: totalPersonal,
      description: "Integration of physical ego (Earth) with higher spiritual intuition (Sky).",
    },
    social: {
      maleLine: maleSocial,
      femaleLine: femaleSocial,
      total: totalSocial,
      description: "Fulfillment of social responsibility and harmonization of ancestral lineages.",
    },
    spiritual: {
      total: totalSpiritual,
      description: "Transcendent integration and legacy alignment for mature adulthood.",
    },
    planetary: {
      total: totalPlanetary,
      description: "Harmonization with collective human consciousness.",
    },
  };

  // =========================================================================
  // 7. KARMIC TAIL DEFINITION (Full 26-Catalog Lookup)
  // =========================================================================
  const matchedTail = findKarmicTail(valD, valD2, valD1);
  const karmicTail: KarmicTail = {
    points: [valD, valD2, valD1],
    pointIds: ["karmicTailRoot", "karmicTailMiddle", "karmicTailInner"],
    name: matchedTail?.name || getKarmicTailName(valD, valD2, valD1) || "Custom Karmic Triad",
    pastLifeStory: matchedTail?.pastLifeStory,
    currentLifeTrap: matchedTail?.currentLifeTrap,
    healingRecommendations: matchedTail?.healingRecommendations,
  };


  // =========================================================================
  // 8. ASSEMBLE ALL MATRIX POINTS WITH CANONICAL COORDINATES
  // Center is at (500, 500) on a 1000x1000 canvas with radius R = 400.
  // =========================================================================
  const points: MatrixPoint[] = [
    // Center Point E
    {
      id: "comfortZone",
      label: "Center: Soul Comfort Zone",
      value: valE,
      position: { x: 500, y: 500 },
      zone: "core",
      chakra: "Manipura/Center",
      description: "Your inner sanctuary and core battery. The frequency where your soul feels at rest.",
    },

    // Diamond (Sky) Cardinal Vertices
    {
      id: "personality",
      label: "Left Vertex: Physical Persona (Day)",
      value: valA,
      position: { x: 100, y: 500 },
      zone: "physical",
      chakra: "Vishuddha",
      description: "How you naturally introduce yourself to the outer world; physical vitality.",
    },
    {
      id: "spirit",
      label: "Top Vertex: Spiritual Connection (Month)",
      value: valB,
      position: { x: 500, y: 100 },
      zone: "spirit",
      chakra: "Sahasrara",
      description: "Spiritual intuition, divine guardian support, and subtle inspiration.",
    },
    {
      id: "socialRealization",
      label: "Right Vertex: Material Realization (Year)",
      value: valC,
      position: { x: 900, y: 500 },
      zone: "wealth",
      chakra: "Manipura",
      description: "Social achievement, career potential, and financial harvest.",
    },
    {
      id: "karmicTailRoot",
      label: "Bottom Vertex: Karmic Tail Root",
      value: valD,
      position: { x: 500, y: 900 },
      zone: "karmic",
      chakra: "Muladhara",
      description: "Unresolved past-life burdens and deep subconscious instincts.",
    },

    // Earth Square (Clan / Ancestral) Vertices
    {
      id: "ancestralPaternalSpirit",
      label: "Top-Left: Father's Spiritual Line",
      value: valF,
      position: { x: 217, y: 217 },
      zone: "paternal",
      description: "Spiritual gifts and moral values inherited through the paternal bloodline.",
    },
    {
      id: "ancestralMaternalSpirit",
      label: "Top-Right: Mother's Spiritual Line",
      value: valG,
      position: { x: 783, y: 217 },
      zone: "maternal",
      description: "Creative inspiration and emotional wisdom inherited through the maternal bloodline.",
    },
    {
      id: "ancestralMaternalMaterial",
      label: "Bottom-Right: Mother's Material Line",
      value: valH,
      position: { x: 783, y: 783 },
      zone: "maternal",
      description: "Material health, abundance, and worldly patterns from the mother's ancestry.",
    },
    {
      id: "ancestralPaternalMaterial",
      label: "Bottom-Left: Father's Material Line",
      value: valI,
      position: { x: 217, y: 783 },
      zone: "paternal",
      description: "Financial discipline, endurance, and physical grounding from the father's ancestry.",
    },

    // Internal Cardinal Intermediate Nodes
    {
      id: "personalResource",
      label: "Throat Chakra: Personal Resources",
      value: valA1,
      position: { x: 300, y: 500 },
      zone: "physical",
      chakra: "Vishuddha",
      description: "Self-expression, bodily health, and personal speech energy.",
    },
    {
      id: "spiritualTalent",
      label: "Ajna Chakra: Intuitive Talents",
      value: valB1,
      position: { x: 500, y: 300 },
      zone: "spirit",
      chakra: "Ajna",
      description: "Mental clarity, vision, and inner philosophical guidance.",
    },
    {
      id: "socialRealizationInner",
      label: "Money Channel Gate",
      value: valC1,
      position: { x: 700, y: 500 },
      zone: "wealth",
      chakra: "Manipura",
      description: "Entrance to material wealth and tangible financial expression.",
    },
    {
      id: "karmicTailInner",
      label: "Karmic Tail Anchor",
      value: valD1,
      position: { x: 500, y: 700 },
      zone: "karmic",
      chakra: "Svadhisthana",
      description: "Subconscious gate where past emotional traps interface with love and purpose.",
    },
    {
      id: "karmicTailMiddle",
      label: "Karmic Tail Bridge",
      value: valD2,
      position: { x: 500, y: 800 },
      zone: "karmic",
      chakra: "Muladhara",
      description: "The behavioral bridge linking past trauma with present physical reactions.",
    },

    // Love & Money Intersection Line
    {
      id: "loveMoneyCenter",
      label: "Heart Center (Anahata): Love & Money Union",
      value: valM,
      position: { x: 600, y: 600 },
      zone: "love",
      chakra: "Anahata",
      description: "The delicate balance point where romantic trust directly fuels financial prosperity.",
    },
    {
      id: "loveEntrance",
      label: "Love Channel Key",
      value: valL,
      position: { x: 550, y: 650 },
      zone: "love",
      chakra: "Anahata",
      description: "Ideal partner archetype, emotional opening, and relationship harmony.",
    },
    {
      id: "moneyEntrance",
      label: "Wealth Channel Key",
      value: valMoney,
      position: { x: 650, y: 550 },
      zone: "wealth",
      chakra: "Manipura",
      description: "Primary catalyst for professional wealth generation and career focus.",
    },

    // Ancestral Inner Intermediate Points
    {
      id: "ancestralPaternalSpiritInner",
      label: "Paternal Spiritual Focus",
      value: valF1,
      position: { x: 359, y: 359 },
      zone: "paternal",
    },
    {
      id: "ancestralMaternalSpiritInner",
      label: "Maternal Spiritual Focus",
      value: valG1,
      position: { x: 641, y: 359 },
      zone: "maternal",
    },
    {
      id: "ancestralMaternalMaterialInner",
      label: "Maternal Material Focus",
      value: valH1,
      position: { x: 641, y: 641 },
      zone: "maternal",
    },
    {
      id: "ancestralPaternalMaterialInner",
      label: "Paternal Material Focus",
      value: valI1,
      position: { x: 359, y: 641 },
      zone: "paternal",
    },
  ];

  // =========================================================================
  // 9. ASSEMBLE STRUCTURAL OCTAGRAM CONNECTING LINES
  // =========================================================================
  const lines: MatrixLine[] = [
    {
      id: "skyDiamond",
      label: "Personal Sky Diamond",
      pointIds: ["spirit", "socialRealization", "karmicTailRoot", "personality", "spirit"],
    },
    {
      id: "earthSquare",
      label: "Ancestral Earth Square",
      pointIds: [
        "ancestralPaternalSpirit",
        "ancestralMaternalSpirit",
        "ancestralMaternalMaterial",
        "ancestralPaternalMaterial",
        "ancestralPaternalSpirit",
      ],
    },
    {
      id: "cardinalHorizontal",
      label: "Earth Line (Physical Plane)",
      pointIds: ["personality", "personalResource", "comfortZone", "socialRealizationInner", "socialRealization"],
    },
    {
      id: "cardinalVertical",
      label: "Sky Line (Spiritual Plane)",
      pointIds: [
        "spirit",
        "spiritualTalent",
        "comfortZone",
        "karmicTailInner",
        "karmicTailMiddle",
        "karmicTailRoot",
      ],
    },
    {
      id: "paternalDiagonal",
      label: "Paternal Lineage Axis",
      pointIds: [
        "ancestralPaternalSpirit",
        "ancestralPaternalSpiritInner",
        "comfortZone",
        "ancestralMaternalMaterialInner",
        "ancestralMaternalMaterial",
      ],
    },
    {
      id: "maternalDiagonal",
      label: "Maternal Lineage Axis",
      pointIds: [
        "ancestralMaternalSpirit",
        "ancestralMaternalSpiritInner",
        "comfortZone",
        "ancestralPaternalMaterialInner",
        "ancestralPaternalMaterial",
      ],
    },
    {
      id: "loveMoneyChannel",
      label: "Relationship & Financial Junction",
      pointIds: ["socialRealizationInner", "moneyEntrance", "loveMoneyCenter", "loveEntrance", "karmicTailInner"],
    },
  ];

  // =========================================================================
  // 10. 7-CHAKRA HEALTH MATRIX CALCULATION (PHYSICAL & ENERGY BODIES)
  // =========================================================================
  // 1. Sahasrara (Crown): Physical = A (Day), Energy = B (Month)
  const sahasraraPhys = valA;
  const sahasraraEnergy = valB;
  const sahasraraTotal = reduceSum(sahasraraPhys, sahasraraEnergy);

  // 2. Ajna (Third Eye): Physical = A1 (A+E), Energy = B1 (B+E)
  const ajnaPhys = valA1;
  const ajnaEnergy = valB1;
  const ajnaTotal = reduceSum(ajnaPhys, ajnaEnergy);

  // 3. Vishuddha (Throat): Physical = (A + A1), Energy = (B + B1)
  const vishuddhaPhys = reduceSum(valA, valA1);
  const vishuddhaEnergy = reduceSum(valB, valB1);
  const vishuddhaTotal = reduceSum(vishuddhaPhys, vishuddhaEnergy);

  // 4. Anahata (Heart): Center E
  const anahataPhys = valE;
  const anahataEnergy = valE;
  const anahataTotal = valE;

  // 5. Manipura (Solar Plexus): Physical = C1, Energy = D1, Total = M (Heart/Money Junction)
  const manipuraPhys = valC1;
  const manipuraEnergy = valD1;
  const manipuraTotal = valM;

  // 6. Svadhisthana (Sacral): Physical = (C1 + C), Energy = (D1 + D2)
  const svadhisthanaPhys = reduceSum(valC1, valC);
  const svadhisthanaEnergy = reduceSum(valD1, valD2);
  const svadhisthanaTotal = reduceSum(svadhisthanaPhys, svadhisthanaEnergy);

  // 7. Muladhara (Root): Physical = C (Year), Energy = D (Karmic Root)
  const muladharaPhys = valC;
  const muladharaEnergy = valD;
  const muladharaTotal = reduceSum(muladharaPhys, muladharaEnergy);

  const healthRows: HealthChakraRow[] = [
    {
      chakra: "Sahasrara",
      nameEn: "Crown Chakra",
      sanskrit: "Sahasrara",
      order: 7,
      physicalValue: sahasraraPhys,
      energyValue: sahasraraEnergy,
      totalValue: sahasraraTotal,
      systems: "Brain, cerebral cortex, central nervous system, pineal gland",
      theme: "Connection to Divine, spiritual life mission, existential trust",
    },
    {
      chakra: "Ajna",
      nameEn: "Third Eye Chakra",
      sanskrit: "Ajna",
      order: 6,
      physicalValue: ajnaPhys,
      energyValue: ajnaEnergy,
      totalValue: ajnaTotal,
      systems: "Eyes, sinuses, optic nerves, pituitary gland, hearing",
      theme: "Intuitive perception, intellectual vision, foresight",
    },
    {
      chakra: "Vishuddha",
      nameEn: "Throat Chakra",
      sanskrit: "Vishuddha",
      order: 5,
      physicalValue: vishuddhaPhys,
      energyValue: vishuddhaEnergy,
      totalValue: vishuddhaTotal,
      systems: "Thyroid gland, vocal cords, neck, larynx, trachea",
      theme: "Authentic truth, communication, creative realization",
    },
    {
      chakra: "Anahata",
      nameEn: "Heart Center",
      sanskrit: "Anahata",
      order: 4,
      physicalValue: anahataPhys,
      energyValue: anahataEnergy,
      totalValue: anahataTotal,
      systems: "Heart, circulatory system, lungs, thymus, immune vitality",
      theme: "Unconditional love, empathy, forgiveness, grief healing",
    },
    {
      chakra: "Manipura",
      nameEn: "Solar Plexus",
      sanskrit: "Manipura",
      order: 3,
      physicalValue: manipuraPhys,
      energyValue: manipuraEnergy,
      totalValue: manipuraTotal,
      systems: "Stomach, liver, pancreas, digestive tract, metabolism",
      theme: "Willpower, boundaries, social confidence, ambition",
    },
    {
      chakra: "Svadhisthana",
      nameEn: "Sacral Chakra",
      sanskrit: "Svadhisthana",
      order: 2,
      physicalValue: svadhisthanaPhys,
      energyValue: svadhisthanaEnergy,
      totalValue: svadhisthanaTotal,
      systems: "Reproductive organs, kidneys, bladder, pelvis, lumbar spine",
      theme: "Sensuality, pleasure, creative passion, financial flow",
    },
    {
      chakra: "Muladhara",
      nameEn: "Root Chakra",
      sanskrit: "Muladhara",
      order: 1,
      physicalValue: muladharaPhys,
      energyValue: muladharaEnergy,
      totalValue: muladharaTotal,
      systems: "Colon, bones, skeletal structure, legs, feet, adrenals",
      theme: "Physical survival, safety, grounding, connection to Earth",
    },
  ];

  const totalPhys = reduceSum(
    sahasraraPhys,
    ajnaPhys,
    vishuddhaPhys,
    anahataPhys,
    manipuraPhys,
    svadhisthanaPhys,
    muladharaPhys
  );
  const totalEnergy = reduceSum(
    sahasraraEnergy,
    ajnaEnergy,
    vishuddhaEnergy,
    anahataEnergy,
    manipuraEnergy,
    svadhisthanaEnergy,
    muladharaEnergy
  );
  const totalEmotions = reduceSum(
    sahasraraTotal,
    ajnaTotal,
    vishuddhaTotal,
    anahataTotal,
    manipuraTotal,
    svadhisthanaTotal,
    muladharaTotal
  );

  const healthMatrix: HealthMatrix = {
    rows: healthRows,
    total: {
      physical: totalPhys,
      energy: totalEnergy,
      total: totalEmotions,
    },
  };

  // =========================================================================
  // 11. ANCESTRAL LINEAGE (FATHER & MOTHER CLAN TASKS)
  // =========================================================================
  const paternalTotal = reduceSum(valF, valI);
  const maternalTotal = reduceSum(valG, valH);
  const ancestralLineage: AncestralLineageData = {
    paternal: {
      spiritual: valF,
      material: valI,
      total: paternalTotal,
    },
    maternal: {
      spiritual: valG,
      material: valH,
      total: maternalTotal,
    },
    socialPurpose: reduceSum(paternalTotal, maternalTotal),
  };

  // =========================================================================
  // 12. 0-80 AGE PERIMETER CYCLE & CURRENT AGE DETERMINATION
  // =========================================================================
  const today = new Date();
  let calculatedAge = today.getFullYear() - year;
  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
    calculatedAge -= 1;
  }
  const currentAge = Math.max(0, calculatedAge);
  const cycleAge = currentAge % 80;

  const perimeterAges: { age: number; value: number; angleDeg: number; x: number; y: number; pointId: string }[] = [
    { age: 0, value: valA, angleDeg: 180, x: 100, y: 500, pointId: "personality" },
    { age: 10, value: valF, angleDeg: 225, x: 217, y: 217, pointId: "ancestralPaternalSpirit" },
    { age: 20, value: valB, angleDeg: 270, x: 500, y: 100, pointId: "spirit" },
    { age: 30, value: valG, angleDeg: 315, x: 783, y: 217, pointId: "ancestralMaternalSpirit" },
    { age: 40, value: valC, angleDeg: 0, x: 900, y: 500, pointId: "socialRealization" },
    { age: 50, value: valH, angleDeg: 45, x: 783, y: 783, pointId: "ancestralMaternalMaterial" },
    { age: 60, value: valD, angleDeg: 90, x: 500, y: 900, pointId: "karmicTailRoot" },
    { age: 70, value: valI, angleDeg: 135, x: 217, y: 783, pointId: "ancestralPaternalMaterial" },
  ];

  let closestIndex = 0;
  let minDiff = 999;
  perimeterAges.forEach((node, idx) => {
    const diff = Math.abs(node.age - cycleAge);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = idx;
    }
  });

  const ageCycle: AgeCycleNode[] = perimeterAges.map((node, idx) => ({
    age: node.age,
    value: node.value,
    pointId: node.pointId,
    angleDeg: node.angleDeg,
    x: node.x,
    y: node.y,
    isCurrentAge: idx === closestIndex,
  }));

  return {
    input,
    points,
    lines,
    purposes,
    karmicTail,
    healthMatrix,
    ancestralLineage,
    ageCycle,
    currentAge,
  };
}

/**
 * Returns a recognized archetypal name for standard karmic tail triplets
 */
function getKarmicTailName(d: number, d2: number, d1: number): string | undefined {
  const signature = `${d}-${d2}-${d1}`;
  const knownTails: Record<string, string> = {
    "18-6-6": "The Magic & Deception Triad",
    "18-9-9": "The Hermit & Mystery Triad",
    "15-20-5": "The Rebel & Clan Betrayal Triad",
    "15-8-11": "The Passion & Aggression Triad",
    "9-3-21": "The Overseer & Global Burden Triad",
    "6-17-11": "The Pride & Unrecognized Talent Triad",
    "21-4-10": "The Oppressed Soul Triad",
    "12-19-7": "The Warrior & Sacrificial Triad",
    "3-7-22": "The Captive & Freedom Triad",
    "20-8-6": "The Family Burden & Clan Karma Triad",
    "15-6-18": "The Seduction & Dark Illusions Triad",
    "6-14-8": "The Peacekeeper & Disappointed Idealist Triad",
  };

  return knownTails[signature];
}

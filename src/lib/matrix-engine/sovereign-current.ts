/**
 * Matrix of Destiny — The Sovereign Current (Unifying Narrative Thread)
 * 
 * Synthesizes the dynamic tripartite relationship between:
 * 1. Point A: Conscious Personality (Day Energy) — How you initiate
 * 2. Point E: Soul Sanctuary (Center Energy) — Where you recharge
 * 3. Point D: Karmic Root (Tail Energy) — What triggers your subconscious shadow
 * 
 * Binds the entire multi-section chart into a coherent, singular personal mythos.
 */

import { reduceSum, reduceTo22 } from "./reduction";
import { arcanaMeanings } from "../../content/arcana-meanings";

export interface SovereignCurrent {
  title: string;
  harmonicNumber: number;
  thesis: string;
  narrativeThread: string;
  sectionThreads: {
    personality: string;
    karma: string;
    love: string;
    wealth: string;
    purpose: string;
  };
}

export function calculateSovereignCurrent(
  pointA: number,
  pointE: number,
  pointD: number
): SovereignCurrent {
  // Harmonic Synthesis number
  const harmonicNumber = reduceSum(pointA, pointE, pointD);
  const arcA = arcanaMeanings[pointA] || arcanaMeanings[1];
  const arcE = arcanaMeanings[pointE] || arcanaMeanings[10];
  const arcD = arcanaMeanings[pointD] || arcanaMeanings[15];
  const arcH = arcanaMeanings[harmonicNumber] || arcanaMeanings[7];

  const title = `The Sovereign Current: ${arcA.name} navigating ${arcD.name} through ${arcE.name}`;

  const thesis = `Your life narrative is not a collection of fragmented traits, but an evolutionary current. Your conscious persona (${arcA.name}: Energy ${pointA}) constantly seeks to express itself, but is repeatedly tested by the subconscious defense loops of ${arcD.name} (Energy ${pointD}). Your ultimate sovereign integration is achieved whenever you anchor your decisions in your Soul Sanctuary (${arcE.name}: Energy ${pointE}), manifesting the master synthesis of Arcana ${harmonicNumber} (${arcH.name}).`;

  const narrativeThread = `When stress mounts, your reflex is to slip into the minus state of Energy ${pointD}. Recognizing this loop allows Energy ${pointE} to restore balance, freeing Energy ${pointA} to lead with sovereign grace.`;

  return {
    title,
    harmonicNumber,
    thesis,
    narrativeThread,
    sectionThreads: {
      personality: `In your daily personality, the Sovereign Current asks you to lead with the original brilliance of ${arcA.name} without projecting the defensive doubts of Energy ${pointD}.`,
      karma: `In your karmic homework, the Sovereign Current demands transmuting the ${arcD.name} shadow into selfless mastery.`,
      love: `In your relationships, intimate safety deepens when you step back from karmic testing and re-center in the calm sanctuary of ${arcE.name}.`,
      wealth: `In your finances, prosperity multiplies as soon as your career decisions align with the creative authenticity of ${arcA.name} rather than scarcity fears.`,
      purpose: `Your life purpose roadmap is the gradual, mature embodiment of Arcana ${harmonicNumber} (${arcH.name}) across all three life stages.`,
    },
  };
}

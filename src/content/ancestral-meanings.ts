/**
 * Ancestral Lineage Programs - Meanings & Interpretations
 * 
 * In the Destiny Matrix (Natalia Ladini method), the 45-degree tilted square represents
 * the Ancestral / Clan Square (Earth Square).
 * - Paternal Line (Father): Top-Left (F, Spiritual) and Bottom-Left (I, Material)
 * - Maternal Line (Mother): Top-Right (G, Spiritual) and Bottom-Right (H, Material)
 */

export interface AncestralMeaning {
  paternalTasks: {
    spiritual: string;
    material: string;
    healingFocus: string;
  };
  maternalTasks: {
    spiritual: string;
    material: string;
    healingFocus: string;
  };
}

export const defaultAncestralGuidance = {
  paternalRole:
    "The paternal line carries programs of will, social protection, career discipline, authority, relationship to fathers, and financial stamina. When healed, it grants strong grounding, decisive execution, and societal respect.",
  maternalRole:
    "The maternal line carries programs of emotional warmth, intuition, acceptance, physical fertility/health, domestic peace, and receptivity to abundance. When healed, it grants deep psychological ease, compassion, and emotional security.",
  socialPurposeGuidance:
    "Between ages 40 and 60, human development shifts from personal survival to societal legacy. By balancing what you owe your father's and mother's lineages, you dissolve generational blockages for your descendants.",
};

/**
 * Returns specific clan task interpretations for given Arcana numbers.
 */
export function getLineageArcanaGuidance(arcana: number, lineage: "paternal" | "maternal", realm: "spiritual" | "material"): string {
  const themes: Record<number, { spiritual: string; material: string }> = {
    1: {
      spiritual: "Pioneering thought, initiating spiritual breakthroughs, speaking truth courageously.",
      material: "Taking decisive leadership, founding independent enterprises, overcoming passive waiting.",
    },
    2: {
      spiritual: "Healing intuitive doubts, clearing secrecy and hypocrisy, cultivating deep diplomacy.",
      material: "Working with natural elements, food, herbalism, and resolving passive manipulation in the clan.",
    },
    3: {
      spiritual: "Honoring mother figures, sacred feminine creation, nurturing unconditional care.",
      material: "Managing domestic wealth, real estate, luxurious comfort, and resolving maternal conflicts.",
    },
    4: {
      spiritual: "Benevolent masculine protection, order, respecting spiritual hierarchy and fatherhood.",
      material: "Building enduring physical organizations, disciplined financial stewardship, overcoming tyranny.",
    },
    5: {
      spiritual: "Preserving sacred wisdom, learning from mentors, transmitting moral principles.",
      material: "Teaching, family traditions, resolving clan legal disputes, breaking dogmatic prejudices.",
    },
    6: {
      spiritual: "Unconditional love, overcoming idealism, accepting people as they truly are.",
      material: "Aesthetic trades, creating beautiful spaces, harmonizing partner relations without codependency.",
    },
    7: {
      spiritual: "Clear purposeful direction, spiritual victory, steering the soul toward higher ideals.",
      material: "Strategic execution, travel, automotive/logistics, reaching career peaks through teamwork.",
    },
    8: {
      spiritual: "Understanding karma and cause-and-effect, releasing the desire to blame external fate.",
      material: "Legal integrity, transparent accounting, justice, resolving ancestral court or financial wrongs.",
    },
    9: {
      spiritual: "Deep philosophical contemplation, spiritual mentorship, finding solace in quiet contemplation.",
      material: "Science, writing, research, transmitting specialized knowledge while overcoming reclusive isolation.",
    },
    10: {
      spiritual: "Trusting divine providence, riding the cycles of good fortune, surrendering anxiety.",
      material: "Fluid financial flow, lucky opportunities, teamwork, releasing heavy exhausting labor.",
    },
    11: {
      spiritual: "Endurance through gentleness, harnessing primal life force for spiritual stamina.",
      material: "Physical vitality, sports, tireless productivity, overcoming aggressive or domineering outbursts.",
    },
    12: {
      spiritual: "Selfless service without martyrdom, viewing reality from innovative upside-down angles.",
      material: "Charity, psychology, music, medicine, learning to charge fair compensation for helpful work.",
    },
    13: {
      spiritual: "Embracing transformation, letting outlived forms die peacefully, welcoming soul rebirth.",
      material: "Crisis management, emergency relief, revamping dying systems, clearing outdated clutter.",
    },
    14: {
      spiritual: "Soul temperance, patience, emotional equilibrium, connecting with subtle angelic frequencies.",
      material: "Art, medicine, pharmacology, moderation in food and consumption, diplomatic mediation.",
    },
    15: {
      spiritual: "Seeing through shadow illusions, transforming dark urges into magnetic charisma.",
      material: "High finance, large capital, business psychology, avoiding manipulation and addictive vices.",
    },
    16: {
      spiritual: "Spiritual awakening through structural demolition, rebuilding faith on indestructible truth.",
      material: "Architecture, construction, physical renovation, staying resilient when physical assets shift.",
    },
    17: {
      spiritual: "Unveiling your authentic guiding star, sharing divine inspiration with the collective.",
      material: "Public performance, creative fame, artistic renown, overcoming false vanity or imposter syndrome.",
    },
    18: {
      spiritual: "Mastering the subconscious, transmuting fears into creative imagination, lucid intuition.",
      material: "Visual arts, cinema, psychology, water-related businesses, avoiding self-deception and illusions.",
    },
    19: {
      spiritual: "Radiant solar generosity, boundless joy, illuminating many without burning them.",
      material: "Large-scale entrepreneurship, social philanthropy, leadership that enriches large communities.",
    },
    20: {
      spiritual: "Ancestral resurrection, healing multi-generational bloodline karma, listening to higher calls.",
      material: "Family businesses, state institutions, clan unification, clearing ancestral legal and moral debts.",
    },
    21: {
      spiritual: "Global consciousness, unity of all traditions, peacemaking across international borders.",
      material: "International commerce, diplomacy, foreign travel, internet technologies, expanding horizons.",
    },
    22: {
      spiritual: "Cosmic freedom, beginner's mind, pure trust in the universe, playful spiritual enlightenment.",
      material: "Entertainment, travel, innovative non-traditional vocations, living unencumbered by rigid dogma.",
    },
  };

  const item = themes[arcana] || themes[1];
  const realmText = realm === "spiritual" ? item.spiritual : item.material;
  const prefix = lineage === "paternal" ? "Father's Line Task" : "Mother's Line Task";
  return `${prefix}: ${realmText}`;
}

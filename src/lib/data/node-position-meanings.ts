/**
 * Position-Specific Matrix Node Context Lookup Table
 * 
 * Maps (arcana number × position type) to provide deeply tailored, contextual
 * interpretations when a user inspects critical chart vertices:
 * - moneyEntrance: Wealth Gate & Material Realization
 * - loveEntrance: Relationship Gate & Romantic Attraction
 * - karmicTailRoot: Bottom Vertex D / Primary Subconscious Debt
 * - comfortZone: Center E / Soul Sanctuary & Energetic Recharge
 */

export interface PositionSpecificMeaning {
  positionTitle: string;
  specificGuidance: string;
  actionPrompt: string;
  cautionaryWarning: string;
}

export type PositionType = "moneyEntrance" | "loveEntrance" | "karmicTailRoot" | "comfortZone";

// Partial mapping for arcana 1 to 22 across the 4 key positions
export const nodePositionMeanings: Record<string, Partial<Record<number, PositionSpecificMeaning>>> = {
  moneyEntrance: {
    1: {
      positionTitle: "Autonomous Enterprise & Original Pioneering",
      specificGuidance: "At the Wealth Gate, Arcana 1 opens financial flow through solopreneurship, original inventions, and individual initiative. You make money when you set your own terms rather than climbing corporate hierarchies.",
      actionPrompt: "Launch proprietary projects and monetize intellectual property directly.",
      cautionaryWarning: "Micromanaging collaborators or abandoning ventures before monetization cycles mature.",
    },
    2: {
      positionTitle: "Intuitive Consulting, Research & Mediation",
      specificGuidance: "At the Wealth Gate, Arcana 2 thrives in background strategy, confidentiality, counseling, and deep information brokerage. Your intuition senses market shifts before they appear on spreadsheets.",
      actionPrompt: "Cultivate advisory roles, holistic wellness ventures, or strategic diplomacy.",
      cautionaryWarning: "Financial indecision stemming from over-analyzing dual market scenarios.",
    },
    3: {
      positionTitle: "Aesthetic Design, Abundance & Maternal Enterprise",
      specificGuidance: "At the Wealth Gate, Arcana 3 attracts material luxury through physical beauty, premium branding, hospitality, real estate, and nurturing businesses.",
      actionPrompt: "Invest in high-aesthetic presentation and create welcoming, comfortable client environments.",
      cautionaryWarning: "Emotional overspending or attempting to control business partners as dependents.",
    },
    4: {
      positionTitle: "Systemic Scaling, Executive Governance & Real Assets",
      specificGuidance: "At the Wealth Gate, Arcana 4 manifests wealth through structured systems, delegation, large-scale organization, and physical infrastructure.",
      actionPrompt: "Establish crystal-clear operational processes and lead with calm, grounded authority.",
      cautionaryWarning: "Authoritarian rigidity that alienates key employees or resists innovative disruption.",
    },
    5: {
      positionTitle: "Education, Intellectual Authority & Legal Precision",
      specificGuidance: "At the Wealth Gate, Arcana 5 creates prosperity through teaching, certification, legal ethics, and upholding trusted standards.",
      actionPrompt: "Monetize specialized knowledge via academies, publishing, or authoritative consultancy.",
      cautionaryWarning: "Dogmatic attachment to theoretical models that have ceased producing ROI.",
    },
    6: {
      positionTitle: "Relational Sales, Partnerships & Curated Elegance",
      specificGuidance: "At the Wealth Gate, Arcana 6 multiplies capital through warm interpersonal networks, community building, and aesthetic taste.",
      actionPrompt: "Build businesses centered on hospitality, networking, or visual aesthetics.",
      cautionaryWarning: "Making financial compromises purely to avoid interpersonal conflict or seek approval.",
    },
    7: {
      positionTitle: "Targeted Velocity, Transportation & Strategic Conquest",
      specificGuidance: "At the Wealth Gate, Arcana 7 demands clear objective milestones. You prosper through logistics, tech scaling, sports, and aggressive milestone completion.",
      actionPrompt: "Set concrete quarterly targets with clear competitive differentiators.",
      cautionaryWarning: "Aggressive burnout and treating colleagues as mere instruments toward victory.",
    },
    8: {
      positionTitle: "Legal Fairness, Equilibrium & High-Stakes Finance",
      specificGuidance: "At the Wealth Gate, Arcana 8 demands absolute ethical transparency. Clean accounting and adherence to universal cause-and-effect generate immense stability.",
      actionPrompt: "Focus on contractual precision, tax integrity, and dispute resolution.",
      cautionaryWarning: "Secret deals or attempting to bend financial regulations — instant karmic retribution.",
    },
    9: {
      positionTitle: "Deep Research, Solo Expertise & Scientific Depth",
      specificGuidance: "At the Wealth Gate, Arcana 9 builds elite wealth through rare, specialized depth. You are paid for unique mastery that cannot be replicated by algorithms.",
      actionPrompt: "Package profound research into premium books, proprietary methodologies, or senior advisory.",
      cautionaryWarning: "Undercharging for genius due to intellectual aloofness or disdain for marketing.",
    },
    10: {
      positionTitle: "Serendipitous Networking & Cyclical Momentum",
      specificGuidance: "At the Wealth Gate, Arcana 10 prospers by riding emerging market waves and staying light on its feet. Rigorous micro-planning restricts your natural luck.",
      actionPrompt: "Follow energetic curiosity and join dynamic, forward-moving circles.",
      cautionaryWarning: "Passive laziness waiting for luck without positioning yourself in active currents.",
    },
    11: {
      positionTitle: "Stamina, High-Output Productivity & Athleticism",
      specificGuidance: "At the Wealth Gate, Arcana 11 unlocks wealth through relentless physical energy, manufacturing, sports, or high-volume project delivery.",
      actionPrompt: "Channel intense willpower into scalable physical output or coaching.",
      cautionaryWarning: "Physical exhaustion and pushing teams beyond sustainable human limits.",
    },
    12: {
      positionTitle: "Altruistic Innovation, Creative Perspective & Service",
      specificGuidance: "At the Wealth Gate, Arcana 12 creates wealth by solving non-obvious problems from a fresh vantage point. Social impact, design thinking, and psychology thrive here.",
      actionPrompt: "Position your offerings as compassionate service that eliminates customer struggle.",
      cautionaryWarning: "Victim mentality, chronic under-pricing, or offering free services to your own detriment.",
    },
    13: {
      positionTitle: "Crisis Turnarounds, Restructuring & Total Rebirth",
      specificGuidance: "At the Wealth Gate, Arcana 13 excels in bankruptcies, corporate pivots, emergency management, and clearing out dying legacy assets.",
      actionPrompt: "Charge premium retainers for high-stakes business transformations.",
      cautionaryWarning: "Clinging to obsolete business models out of sentimentality or fear of the unknown.",
    },
    14: {
      positionTitle: "Patience, Artistry, Moderation & Holistic Alchemy",
      specificGuidance: "At the Wealth Gate, Arcana 14 builds long-term compound wealth through steady moderation, pharmaceutical chemistry, or refined crafts.",
      actionPrompt: "Focus on compound interest, long-term brand equity, and tranquil customer service.",
      cautionaryWarning: "Impatience seeking get-rich-quick gambles that disrupt organic compounding.",
    },
    15: {
      positionTitle: "High-Volume Capital, Shadow Psychology & Mass Influence",
      specificGuidance: "At the Wealth Gate, Arcana 15 possesses raw magnetism for large sums of money, luxury real estate, show business, and raw commercial instinct.",
      actionPrompt: "Leverage charismatic salesmanship and master deep human desires with integrity.",
      cautionaryWarning: "Addictive greed, manipulative exploitation, or associating with criminal ventures.",
    },
    16: {
      positionTitle: "Structural Construction, Architecture & Radical Overhauls",
      specificGuidance: "At the Wealth Gate, Arcana 16 thrives in physical building, demolition, heavy engineering, and breaking through organizational bottlenecks.",
      actionPrompt: "Lead bold rebuilds of broken systems and construct enduring physical structures.",
      cautionaryWarning: "Catastrophic financial collapses triggered by ego-driven stubbornness.",
    },
    17: {
      positionTitle: "Celebrity Visibility, Performing Arts & Brand Stardom",
      specificGuidance: "At the Wealth Gate, Arcana 17 demands being visible. Personal branding, keynote speaking, creative arts, and spotlight careers unlock maximum revenue.",
      actionPrompt: "Step onto public stages and cultivate a distinctive, unmistakable visual presence.",
      cautionaryWarning: "Star sickness, arrogant condescension toward subordinates, or sterile vanity.",
    },
    18: {
      positionTitle: "Imagination, Esoteric Mastery & Psychological Branding",
      specificGuidance: "At the Wealth Gate, Arcana 18 converts subconscious archetypes, film, photography, esoteric sciences, and dream psychology into tangible wealth.",
      actionPrompt: "Monetize creative imagination, deep subconscious therapies, or mystical arts.",
      cautionaryWarning: "Subconscious fears of financial ruin that manifest as self-fulfilling scarcity prophecies.",
    },
    19: {
      positionTitle: "Solar Charisma, Philanthropy & Multi-Channel Abundance",
      specificGuidance: "At the Wealth Gate, Arcana 19 commands vast financial joy. Generous wealth sharing, festive events, entertainment, and children's enterprises shine.",
      actionPrompt: "Spread warmth, share abundance joyfully, and build cheerful, radiant team cultures.",
      cautionaryWarning: "Scorching colleagues with tyrannical demands or guilt around holding vast wealth.",
    },
    20: {
      positionTitle: "Family Dynasties, Generational Wealth & Heritage",
      specificGuidance: "At the Wealth Gate, Arcana 20 thrives in family businesses, ancestral land, legal lineage trusts, and restoring ancestral commercial names.",
      actionPrompt: "Build intergenerational wealth vehicles and heal inherited financial scarcity codes.",
      cautionaryWarning: "Allowing family feuds or conservative ancestral guilt to paralyze modern ventures.",
    },
    21: {
      positionTitle: "Global E-Commerce, International Expansion & Web Scale",
      specificGuidance: "At the Wealth Gate, Arcana 21 transcends local borders. Global imports, cross-border digital platforms, tourism, and multilingual operations multiply capital.",
      actionPrompt: "Eliminate geographic constraints; build planetary offerings and international networks.",
      cautionaryWarning: "Disdaining local administrative realities while chasing grandiose global dreams.",
    },
    22: {
      positionTitle: "Radical Autonomy, Nomad Economy & Unconstrained Freedom",
      specificGuidance: "At the Wealth Gate, Arcana 22 generates income through location-independent ventures, comedy, festival production, and unconventional business formats.",
      actionPrompt: "Embrace playful agility, zero-overhead models, and unconventional revenue experiments.",
      cautionaryWarning: "Reckless financial irresponsibility, squandering capital, or refusing legal contracts.",
    },
  },

  loveEntrance: {
    1: {
      positionTitle: "Autonomous Sovereignty & Romantic Equality",
      specificGuidance: "At the Love Entrance, Energy 1 requires a partner who is equally independent and self-driven. Subconscious need for admiration must be balanced with genuine mutual vulnerability.",
      actionPrompt: "Celebrate your partner's separate passions without feeling threatened.",
      cautionaryWarning: "Treating the partnership as a one-person show or competing with your beloved.",
    },
    2: {
      positionTitle: "Soulful Sensitivity & Unspoken Attunement",
      specificGuidance: "At the Love Entrance, Energy 2 seeks profound emotional communion. Mutual confidentiality and gentle, psychic understanding form the bedrock of safety.",
      actionPrompt: "Directly state unspoken desires rather than dropping obscure emotional hints.",
      cautionaryWarning: "Passive-aggressive emotional withdrawal or chronic fear of abandonment.",
    },
    3: {
      positionTitle: "Sensual Nurturing, Emotional Safety & Family Warmth",
      specificGuidance: "At the Love Entrance, Energy 3 flourishes when providing and receiving physical affection, domestic comfort, and generous emotional appreciation.",
      actionPrompt: "Create a serene, luxurious sanctuary and nurture without micromanaging.",
      cautionaryWarning: "Using emotional guilt or maternal smothering to control partner decisions.",
    },
    6: {
      positionTitle: "Unconditional Acceptance & Idealized Harmony",
      specificGuidance: "At the Love Entrance, Energy 6 is the authentic lover's archetype. Romance requires releasing perfectionist expectations and embracing human flaws.",
      actionPrompt: "Love your partner for who they are today, not an idealized future fantasy.",
      cautionaryWarning: "Chronic doubt, testing partner devotion, or paralyzing fear of romantic rejection.",
    },
    12: {
      positionTitle: "Deep Empathy, Compassionate Devotion & Service",
      specificGuidance: "At the Love Entrance, Energy 12 loves with immense psychological tenderness and selflessness. Healthy boundaries are critical to prevent codependency.",
      actionPrompt: "Ensure mutual energetic exchange; practice receiving love as graciously as giving it.",
      cautionaryWarning: "Playing the self-sacrificing romantic martyr to earn affection through suffering.",
    },
    15: {
      positionTitle: "Primal Magnetism, Passion & Shadow Integration",
      specificGuidance: "At the Love Entrance, Energy 15 generates electrifying chemistry and intense emotional depth. Trust requires radical transparency around temptations and jealousies.",
      actionPrompt: "Transmute possessiveness into sacred erotic devotion and emotional honesty.",
      cautionaryWarning: "Subconscious manipulation, jealousy games, or emotional power struggles.",
    },
  },

  karmicTailRoot: {
    6: {
      positionTitle: "Past Romantic Binding & Love Magic Debt",
      specificGuidance: "At the bottom karmic root, Arcana 6 indicates past-life emotional manipulation, love spells, or conditional affection. The incarnational task is loving freely without coercion.",
      actionPrompt: "Renounce all subtle psychological coercion and cultivate self-worth independent of partners.",
      cautionaryWarning: "Obsessive romantic infatuation with emotionally unavailable individuals.",
    },
    15: {
      positionTitle: "Abuse of Dark Esoteric Power & Material Temptation",
      specificGuidance: "At the karmic root, Arcana 15 warns of past exploitation of secret knowledge, addictions, or predatory financial games. Total ethical purity is mandatory.",
      actionPrompt: "Use acute psychological insight exclusively to liberate and heal others.",
      cautionaryWarning: "Succumbing to quick-cash schemes, vices, or secret emotional betrayals.",
    },
    18: {
      positionTitle: "Subconscious Illusions, Occult Debt & Paralysis",
      specificGuidance: "At the karmic root, Arcana 18 signals past escapism, deception, or fearful esoteric rituals. Your imagination easily manifests either nightmares or miracles.",
      actionPrompt: "Ground spiritual awareness in concrete daily work; dissolve subconscious phobias with conscious presence.",
      cautionaryWarning: "Living in paranoiac fear of negative energies or escaping reality into fantasy.",
    },
    21: {
      positionTitle: "Fanaticism, Xenophobia & Ideological Warfare",
      specificGuidance: "At the karmic root, Arcana 21 reflects past dogmatic crusades or prejudice against other nations and cultures. The soul task is global peacemaking.",
      actionPrompt: "Travel widely, celebrate foreign traditions, and build planetary brotherhood.",
      cautionaryWarning: "Rigid dogmatism or cyclical loss of faith when life doesn't obey your personal timeline.",
    },
  },

  comfortZone: {
    10: {
      positionTitle: "The Cyclical Stream & Effortless Trust",
      specificGuidance: "At the Soul Comfort Zone, Energy 10 recharges by relaxing into the flow of life. Forcing outcomes drains your life force; relaxed faith magnetically attracts solutions.",
      actionPrompt: "When overwhelmed, step away from spreadsheets and trust divine timing.",
      cautionaryWarning: "Forcing closed doors or succumbing to anxious hyper-control.",
    },
    14: {
      positionTitle: "The Quiet Sanctuary & Artistic Temperance",
      specificGuidance: "At the Soul Comfort Zone, Energy 14 rejuvenates through nature, acoustic music, water therapy, and unhurried artistic creation.",
      actionPrompt: "Spend solitary time beside moving water and cultivate inner emotional neutrality.",
      cautionaryWarning: "Excessive sensory consumption, chemical stimulants, or chaotic drama.",
    },
    19: {
      positionTitle: "The Radiating Sun & Joyful Generosity",
      specificGuidance: "At the Soul Comfort Zone, Energy 19 recharges by spreading warmth to others, playing with children, basking in sunlight, and smiling unconditionally.",
      actionPrompt: "Radiate unconditional positivity without demanding applause or reciprocation.",
      cautionaryWarning: "Self-centered melancholy when not receiving constant external admiration.",
    },
  },
};

/**
 * Retrieves position-specific context for an (arcana number, positionId) combination
 */
export function getPositionSpecificMeaning(
  positionId: string,
  arcanaNumber: number
): PositionSpecificMeaning | null {
  const table = nodePositionMeanings[positionId];
  if (table && table[arcanaNumber]) {
    return table[arcanaNumber]!;
  }
  return null;
}

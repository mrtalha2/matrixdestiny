/**
 * Matrix of Destiny - Arcana Meaning Data Models
 * Additive extensions preserving 100% backward compatibility with all calculators and charts.
 */

export interface ArcanaBalanceRow {
  aspect: string;
  balanced: string;
  shadow: string;
  noticeSignal: string;
}

export interface ArcanaPositionMap {
  personality: string;      // Point A / Day of Birth (Physical Persona)
  spirit: string;           // Point B / Month of Birth (Spiritual Connection)
  socialRealization: string;// Point C / Year of Birth (Material Realization)
  karmicTailRoot: string;   // Point D / Bottom Vertex (Karmic Tail Root)
  comfortZone: string;      // Point E / Center (Soul Comfort Zone)
  loveEntrance: string;     // Point L / Love Channel Key
  moneyEntrance: string;    // Point M_money / Wealth Channel Key
}

export interface ArcanaFaq {
  question: string;
  answer: string;
}

export interface ArcanaMeaning {
  number: number;
  name: string;
  archetype: string;
  keywords: string[];
  essence: string;
  pullQuote: string;
  affirmation: string;
  personality: {
    portrait: string;
    comfortZone: string;
    shadowTendency: string;
  };
  relationships: {
    dynamics: string;
    partnerProfile: string;
    growthArea: string;
  };
  money: {
    careerPath: string;
    financialMindset: string;
    potentialBlock: string;
  };
  karmic: {
    pastLesson: string;
    evolutionaryPath: string;
  };
  talents: {
    primaryGift: string;
    activation: string;
  };
  // Additive fields for expanded 600-900 word editorial architecture
  lastUpdated?: string;
  metaTitle?: string;
  metaDescription?: string;
  intro?: string;
  balanceTable?: ArcanaBalanceRow[];
  positions?: ArcanaPositionMap;
  reflectionPrompts?: string[];
  faqs?: ArcanaFaq[];
}

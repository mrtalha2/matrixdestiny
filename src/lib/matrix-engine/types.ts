/**
 * Matrix of Destiny - Type Definitions
 * 
 * Strict TypeScript models for the numerological calculation engine.
 * Fully decoupled from any UI framework or SVG renderer.
 */

export interface MatrixInput {
  day: number;
  month: number;
  year: number;
}

export interface MatrixPosition {
  x: number;
  y: number;
}

export type MatrixZone =
  | "core"
  | "spirit"
  | "physical"
  | "karmic"
  | "talent"
  | "love"
  | "wealth"
  | "paternal"
  | "maternal"
  | "intermediate"
  | "cycle";

export interface MatrixPoint {
  id: string;             // Unique identifier, e.g. "personality", "purpose", "karmicTailRoot"
  label: string;          // Human-readable title, e.g. "Soul Comfort Zone", "Day of Birth"
  value: number;          // Modulo-22 reduced value (1-22)
  position: MatrixPosition;// Normalized (0-1000) coordinates for rendering on octagram
  zone: MatrixZone;       // Archetypal zone categorization
  chakra?: string;        // Optional associated chakra (Sahasrara, Ajna, Vishuddha, Anahata, Manipura, Svadhisthana, Muladhara)
  description?: string;   // Brief numerological explanation
}

export interface MatrixLine {
  id: string;             // Identifier, e.g. "skyDiamond", "earthSquare", "loveLine", "moneyLine"
  label: string;          // Human-readable name
  pointIds: string[];     // Sequential list of point IDs forming this line
}

export interface PurposeStage {
  total: number;          // Total reduced energy (1-22)
  description: string;
}

export interface PersonalPurpose extends PurposeStage {
  sky: number;            // Vertical axis (Top B + Bottom D)
  earth: number;          // Horizontal axis (Left A + Right C)
}

export interface SocialPurpose extends PurposeStage {
  maleLine: number;       // Paternal diagonal (F + H)
  femaleLine: number;     // Maternal diagonal (G + I)
}

export interface DestinyPurposes {
  personal: PersonalPurpose;  // Ages 20–40 (Search for Self)
  social: SocialPurpose;      // Ages 40–60 (Service to Community & Lineage)
  spiritual: PurposeStage;    // Ages 60+ (Transcendent Integration)
  planetary: PurposeStage;    // Global evolution
}

export interface HealthChakraRow {
  chakra: "Sahasrara" | "Ajna" | "Vishuddha" | "Anahata" | "Manipura" | "Svadhisthana" | "Muladhara";
  nameEn: string;
  sanskrit: string;
  order: number;
  physicalValue: number;  // Earth line coordinate
  energyValue: number;    // Sky line coordinate
  totalValue: number;     // Physical + Energy reduced
  systems: string;        // Physical body systems & organs
  theme: string;          // Spiritual / psychological focus
}

export interface HealthMatrix {
  rows: HealthChakraRow[];
  total: {
    physical: number;
    energy: number;
    total: number;
  };
}

export interface AncestralLineageData {
  paternal: {
    spiritual: number; // Point F (NW)
    material: number;  // Point I (SW)
    total: number;     // F + I
  };
  maternal: {
    spiritual: number; // Point G (NE)
    material: number;  // Point H (SE)
    total: number;     // G + H
  };
  socialPurpose: number; // Paternal Total + Maternal Total
}

export interface AgeCycleNode {
  age: number;         // 0, 10, 20, 30, 40, 50, 60, 70, 80
  value: number;       // Reduced Arcana energy for that age
  pointId?: string;
  angleDeg: number;    // Polar angle around chart (0 deg = East / Right)
  x: number;
  y: number;
  isCurrentAge?: boolean;
}

export interface KarmicTail {
  points: [number, number, number]; // [Root D, Middle D2, Inner D1]
  pointIds: [string, string, string];
  name?: string;                     // Well-known karmic program name if identified
  pastLifeStory?: string;
  currentLifeTrap?: string;
  healingRecommendations?: string[];
}

export interface DestinyMatrix {
  input: MatrixInput;
  points: MatrixPoint[];
  lines: MatrixLine[];
  purposes: DestinyPurposes;
  karmicTail: KarmicTail;
  healthMatrix: HealthMatrix;
  ancestralLineage: AncestralLineageData;
  ageCycle: AgeCycleNode[];
  currentAge?: number;
}


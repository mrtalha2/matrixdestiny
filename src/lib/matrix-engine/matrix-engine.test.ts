import { describe, it, expect } from "vitest";
import { reduceTo22, sumDigits, reduceSum } from "./reduction";
import { calculateDestinyMatrix } from "./calculator";

describe("Matrix of Destiny Numerology Engine", () => {
  // =========================================================================
  // 1. UNIT TESTS: The Rule of 22 Reduction
  // =========================================================================
  describe("Rule of 22 Reduction (reduceTo22)", () => {
    it("should preserve numbers from 1 to 22 without modification", () => {
      for (let i = 1; i <= 22; i++) {
        expect(reduceTo22(i)).toBe(i);
      }
    });

    it("should strictly preserve 22 as 22 (The 22nd Major Arcana / The Fool)", () => {
      expect(reduceTo22(22)).toBe(22);
    });

    it("should reduce 23 to 5 (2 + 3 = 5)", () => {
      expect(reduceTo22(23)).toBe(5);
    });

    it("should reduce 31 to 4 (3 + 1 = 4)", () => {
      expect(reduceTo22(31)).toBe(4);
    });

    it("should reduce year 1995 to 6 (1+9+9+5 = 24 -> 2+4 = 6)", () => {
      expect(reduceTo22(1995)).toBe(6);
    });

    it("should reduce year 1999 to 10 (1+9+9+9 = 28 -> 2+8 = 10)", () => {
      expect(reduceTo22(1999)).toBe(10);
    });

    it("should reduce year 2000 to 2 (2+0+0+0 = 2)", () => {
      expect(reduceTo22(2000)).toBe(2);
    });

    it("should handle large multi-stage numbers correctly (e.g. 99 -> 18)", () => {
      expect(reduceTo22(99)).toBe(18); // 9 + 9 = 18 <= 22
    });

    it("should reduce sum of multiple numbers accurately with reduceSum", () => {
      expect(reduceSum(6, 8, 6)).toBe(20);
      expect(reduceSum(6, 8, 6, 20)).toBe(4); // 40 -> 4 + 0 = 4
      expect(reduceSum(20, 4)).toBe(6);      // 24 -> 2 + 4 = 6
    });
  });

  // =========================================================================
  // 2. INTEGRATION TEST: Known Birth Date with Hand-Verified Output
  // Target Date: August 24, 1995
  // =========================================================================
  describe("Hand-Verified Known Date: August 24, 1995", () => {
    const matrix = calculateDestinyMatrix({ day: 24, month: 8, year: 1995 });

    it("calculates correct primary cardinal diamond vertices", () => {
      // Day 24 -> 2 + 4 = 6
      expect(matrix.points.find((p) => p.id === "personality")?.value).toBe(6);

      // Month 8 -> 8
      expect(matrix.points.find((p) => p.id === "spirit")?.value).toBe(8);

      // Year 1995 -> 1+9+9+5 = 24 -> 2+4 = 6
      expect(matrix.points.find((p) => p.id === "socialRealization")?.value).toBe(6);

      // Bottom D (Karmic Root): A + B + C = 6 + 8 + 6 = 20
      expect(matrix.points.find((p) => p.id === "karmicTailRoot")?.value).toBe(20);

      // Center E (Comfort Zone): A + B + C + D = 6 + 8 + 6 + 20 = 40 -> 4
      expect(matrix.points.find((p) => p.id === "comfortZone")?.value).toBe(4);
    });

    it("calculates correct ancestral earth square vertices", () => {
      // Top-Left F (Paternal Spirit): A + B = 6 + 8 = 14
      expect(matrix.points.find((p) => p.id === "ancestralPaternalSpirit")?.value).toBe(14);

      // Top-Right G (Maternal Spirit): B + C = 8 + 6 = 14
      expect(matrix.points.find((p) => p.id === "ancestralMaternalSpirit")?.value).toBe(14);

      // Bottom-Right H (Maternal Material): C + D = 6 + 20 = 26 -> 2 + 6 = 8
      expect(matrix.points.find((p) => p.id === "ancestralMaternalMaterial")?.value).toBe(8);

      // Bottom-Left I (Paternal Material): A + D = 6 + 20 = 26 -> 2 + 6 = 8
      expect(matrix.points.find((p) => p.id === "ancestralPaternalMaterial")?.value).toBe(8);
    });

    it("calculates correct inner cardinal chakra points", () => {
      // A1 (Throat): A + E = 6 + 4 = 10
      expect(matrix.points.find((p) => p.id === "personalResource")?.value).toBe(10);

      // B1 (Ajna): B + E = 8 + 4 = 12
      expect(matrix.points.find((p) => p.id === "spiritualTalent")?.value).toBe(12);

      // C1 (Manipura): C + E = 6 + 4 = 10
      expect(matrix.points.find((p) => p.id === "socialRealizationInner")?.value).toBe(10);

      // D1 (Karmic Inner): D + E = 20 + 4 = 24 -> 6
      expect(matrix.points.find((p) => p.id === "karmicTailInner")?.value).toBe(6);

      // D2 (Karmic Middle): D + D1 = 20 + 6 = 26 -> 8
      expect(matrix.points.find((p) => p.id === "karmicTailMiddle")?.value).toBe(8);
    });

    it("calculates correct love and money channel points", () => {
      // M (Heart Center): C1 + D1 = 10 + 6 = 16
      expect(matrix.points.find((p) => p.id === "loveMoneyCenter")?.value).toBe(16);

      // L (Love Entrance): M + D1 = 16 + 6 = 22
      expect(matrix.points.find((p) => p.id === "loveEntrance")?.value).toBe(22);

      // Money Entrance: M + C1 = 16 + 10 = 26 -> 8
      expect(matrix.points.find((p) => p.id === "moneyEntrance")?.value).toBe(8);
    });

    it("calculates correct Karmic Tail triplet [20, 8, 6]", () => {
      expect(matrix.karmicTail.points).toEqual([20, 8, 6]);
      expect(matrix.karmicTail.name).toBe("Disappointment of Lineage & Clan Karma");
    });


    it("calculates correct Life Purpose triads", () => {
      // Personal Purpose (20–40):
      // Sky = B + D = 8 + 20 = 28 -> 10
      // Earth = A + C = 6 + 6 = 12
      // Total = 10 + 12 = 22
      expect(matrix.purposes.personal.sky).toBe(10);
      expect(matrix.purposes.personal.earth).toBe(12);
      expect(matrix.purposes.personal.total).toBe(22);

      // Social Purpose (40–60):
      // Male = F + H = 14 + 8 = 22
      // Female = G + I = 14 + 8 = 22
      // Total = 22 + 22 = 44 -> 8
      expect(matrix.purposes.social.maleLine).toBe(22);
      expect(matrix.purposes.social.femaleLine).toBe(22);
      expect(matrix.purposes.social.total).toBe(8);

      // Spiritual Purpose (60+):
      // Total = Personal (22) + Social (8) = 30 -> 3
      expect(matrix.purposes.spiritual.total).toBe(3);

      // Planetary Purpose:
      // Total = Social (8) + Spiritual (3) = 11
      expect(matrix.purposes.planetary.total).toBe(11);
    });
  });

  // =========================================================================
  // 3. EDGE CASES: Leap Years, Boundaries, Single vs Double Digits
  // =========================================================================
  describe("Edge Case Dates", () => {
    it("handles February 29 leap year on year 2000 boundary (29/02/2000)", () => {
      const matrix = calculateDestinyMatrix({ day: 29, month: 2, year: 2000 });

      // Day: 29 -> 2 + 9 = 11
      expect(matrix.points.find((p) => p.id === "personality")?.value).toBe(11);

      // Month: 2
      expect(matrix.points.find((p) => p.id === "spirit")?.value).toBe(2);

      // Year 2000: 2 + 0 + 0 + 0 = 2
      expect(matrix.points.find((p) => p.id === "socialRealization")?.value).toBe(2);

      // D: 11 + 2 + 2 = 15
      expect(matrix.points.find((p) => p.id === "karmicTailRoot")?.value).toBe(15);

      // E: 11 + 2 + 2 + 15 = 30 -> 3
      expect(matrix.points.find((p) => p.id === "comfortZone")?.value).toBe(3);

      // Karmic Tail: D=15, D1=15+3=18, D2=15+18=33->6 => [15, 6, 18]
      expect(matrix.karmicTail.points).toEqual([15, 6, 18]);
      expect(matrix.karmicTail.name).toBe("Dark Mage & Forbidden Power");
    });


    it("handles December 31, 1999 (double digits + century boundary)", () => {
      const matrix = calculateDestinyMatrix({ day: 31, month: 12, year: 1999 });

      // Day 31 -> 3 + 1 = 4
      expect(matrix.points.find((p) => p.id === "personality")?.value).toBe(4);

      // Month 12 -> 12
      expect(matrix.points.find((p) => p.id === "spirit")?.value).toBe(12);

      // Year 1999 -> 1+9+9+9 = 28 -> 10
      expect(matrix.points.find((p) => p.id === "socialRealization")?.value).toBe(10);

      // D: 4 + 12 + 10 = 26 -> 8
      expect(matrix.points.find((p) => p.id === "karmicTailRoot")?.value).toBe(8);

      // All points must be within 1..22
      for (const pt of matrix.points) {
        expect(pt.value).toBeGreaterThanOrEqual(1);
        expect(pt.value).toBeLessThanOrEqual(22);
      }
    });

    it("handles single-digit day and month: May 3, 2005 (03/05/2005)", () => {
      const matrix = calculateDestinyMatrix({ day: 3, month: 5, year: 2005 });

      // Day: 3
      expect(matrix.points.find((p) => p.id === "personality")?.value).toBe(3);

      // Month: 5
      expect(matrix.points.find((p) => p.id === "spirit")?.value).toBe(5);

      // Year 2005: 2 + 0 + 0 + 5 = 7
      expect(matrix.points.find((p) => p.id === "socialRealization")?.value).toBe(7);

      // D: 3 + 5 + 7 = 15
      expect(matrix.points.find((p) => p.id === "karmicTailRoot")?.value).toBe(15);
    });

    it("handles 22nd day of birth without reducing to 4 (e.g. 22/11/1988)", () => {
      const matrix = calculateDestinyMatrix({ day: 22, month: 11, year: 1988 });

      // Day: 22 stays 22!
      expect(matrix.points.find((p) => p.id === "personality")?.value).toBe(22);
    });
  });

  // =========================================================================
  // 4. STRUCTURAL INTEGRITY & SCHEMA COMPLIANCE
  // =========================================================================
  describe("Structural Integrity & Schema Compliance", () => {
    const matrix = calculateDestinyMatrix({ day: 15, month: 7, year: 1984 });

    it("ensures every point has a value between 1 and 22", () => {
      for (const pt of matrix.points) {
        expect(pt.value).toBeGreaterThanOrEqual(1);
        expect(pt.value).toBeLessThanOrEqual(22);
      }
    });

    it("ensures all point IDs are unique", () => {
      const ids = matrix.points.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it("ensures all lines reference point IDs that actually exist in points array", () => {
      const pointIdSet = new Set(matrix.points.map((p) => p.id));
      for (const line of matrix.lines) {
        for (const ptId of line.pointIds) {
          expect(pointIdSet.has(ptId)).toBe(true);
        }
      }
    });

    it("ensures all positions have valid coordinates within the 1000x1000 canvas", () => {
      for (const pt of matrix.points) {
        expect(pt.position.x).toBeGreaterThanOrEqual(0);
        expect(pt.position.x).toBeLessThanOrEqual(1000);
        expect(pt.position.y).toBeGreaterThanOrEqual(0);
        expect(pt.position.y).toBeLessThanOrEqual(1000);
      }
    });
  });

  // =========================================================================
  // 5. COMPATIBILITY & COMPOSITE MATRIX
  // =========================================================================
  describe("Relationship Compatibility & Composite Matrix", () => {
    const partnerA = { name: "Alex", birthDate: { day: 24, month: 8, year: 1995 } };
    const partnerB = { name: "Jordan", birthDate: { day: 15, month: 3, year: 1996 } };

    it("calculates composite cardinal points and overall score", async () => {
      const { calculateCompatibility } = await import("./composite");
      const result = calculateCompatibility(partnerA, partnerB);

      expect(result.partnerA.name).toBe("Alex");
      expect(result.partnerB.name).toBe("Jordan");
      expect(result.compositeMatrix.points.length).toBeGreaterThanOrEqual(18);

      // Alex day: 24 -> 6. Jordan day: 15 -> 15. Composite day: reduceSum(6, 15) = 21
      const compA = result.compositeMatrix.points.find((p) => p.id === "personality")?.value;
      expect(compA).toBe(21);

      // Alex month: 8. Jordan month: 3. Composite month: reduceSum(8, 3) = 11
      const compB = result.compositeMatrix.points.find((p) => p.id === "spirit")?.value;
      expect(compB).toBe(11);

      // Alex year: 1995 -> 6. Jordan year: 1996 -> 7. Composite year: reduceSum(6, 7) = 13
      const compC = result.compositeMatrix.points.find((p) => p.id === "socialRealization")?.value;
      expect(compC).toBe(13);

      // Synergy score should be in a valid realistic range [50, 100]
      expect(result.synergy.overallScore).toBeGreaterThanOrEqual(50);
      expect(result.synergy.overallScore).toBeLessThanOrEqual(100);
      expect(Array.isArray(result.synergy.sharedEnergies)).toBe(true);

      // Phase 2: 4-Pillar Synergy Scorecard & Green/Red Flags
      expect(result.synergy.pillars).toBeDefined();
      expect(result.synergy.pillars.spiritual.score).toBeGreaterThanOrEqual(40);
      expect(result.synergy.pillars.emotional.score).toBeGreaterThanOrEqual(40);
      expect(result.synergy.pillars.financial.score).toBeGreaterThanOrEqual(40);
      expect(result.synergy.pillars.karmic.score).toBeGreaterThanOrEqual(40);
      expect(result.synergy.flags.green.length).toBeGreaterThanOrEqual(1);
      expect(result.synergy.flags.red.length).toBeGreaterThanOrEqual(1);
    });
  });

  // =========================================================================
  // 6. YEARLY FORECAST & AGE CYCLE
  // =========================================================================
  describe("Yearly Forecast & Age Cycle Timeline", () => {
    const input = { day: 24, month: 8, year: 1995 };

    it("computes personal year energy and 4 quarterly rhythms", async () => {
      const { calculateYearlyForecast } = await import("./yearly");
      const forecast2025 = calculateYearlyForecast(input, 2025);

      // Day: 6, Month: 8, 2025: 9 -> reduceSum(6, 8, 9) = reduceTo22(23) = 5
      expect(forecast2025.personalYearEnergy).toBe(5);
      expect(forecast2025.targetYear).toBe(2025);
      expect(forecast2025.age).toBe(30);
      expect(forecast2025.quarters.length).toBe(4);

      // Check life phase at age 30
      expect(forecast2025.lifePhase.title).toBe("The Creative & Social Construction Arc");
      expect(forecast2025.milestones.length).toBe(9);
      expect(forecast2025.transitLayers).toBeDefined();
      expect(forecast2025.transitLayers.manifestHorizon.number).toBeGreaterThanOrEqual(1);
    });
  });

  // =========================================================================
  // 7. 7-CHAKRA HEALTH MATRIX & ANCESTRAL LINEAGE SUITE
  // =========================================================================
  describe("7-Chakra Health Matrix & Ancestral Lineages", () => {
    const matrix = calculateDestinyMatrix({ day: 24, month: 8, year: 1995 });

    it("calculates all 7 chakra rows with valid reduced arcana", () => {
      expect(matrix.healthMatrix.rows.length).toBe(7);

      matrix.healthMatrix.rows.forEach((row) => {
        expect(row.physicalValue).toBeGreaterThanOrEqual(1);
        expect(row.physicalValue).toBeLessThanOrEqual(22);
        expect(row.energyValue).toBeGreaterThanOrEqual(1);
        expect(row.energyValue).toBeLessThanOrEqual(22);
        expect(row.totalValue).toBeGreaterThanOrEqual(1);
        expect(row.totalValue).toBeLessThanOrEqual(22);
        expect(row.systems.length).toBeGreaterThan(5);
        expect(row.theme.length).toBeGreaterThan(5);
      });

      // Sahasrara (Crown): Physical = A (6), Energy = B (8), Total = 6 + 8 = 14
      const crown = matrix.healthMatrix.rows.find((r) => r.chakra === "Sahasrara");
      expect(crown?.physicalValue).toBe(6);
      expect(crown?.energyValue).toBe(8);
      expect(crown?.totalValue).toBe(14);

      // Muladhara (Root): Physical = C (6), Energy = D (20), Total = 6 + 20 = 26 -> 8
      const root = matrix.healthMatrix.rows.find((r) => r.chakra === "Muladhara");
      expect(root?.physicalValue).toBe(6);
      expect(root?.energyValue).toBe(20);
      expect(root?.totalValue).toBe(8);

      // Total row vitality
      expect(matrix.healthMatrix.total.physical).toBeGreaterThanOrEqual(1);
      expect(matrix.healthMatrix.total.physical).toBeLessThanOrEqual(22);
      expect(matrix.healthMatrix.total.energy).toBeGreaterThanOrEqual(1);
      expect(matrix.healthMatrix.total.energy).toBeLessThanOrEqual(22);
      expect(matrix.healthMatrix.total.total).toBeGreaterThanOrEqual(1);
      expect(matrix.healthMatrix.total.total).toBeLessThanOrEqual(22);
    });

    it("computes Paternal and Maternal ancestral programs", () => {
      // Paternal Spiritual = F = A + B = 6 + 8 = 14
      expect(matrix.ancestralLineage.paternal.spiritual).toBe(14);
      // Paternal Material = I = A + D = 6 + 20 = 26 -> 8
      expect(matrix.ancestralLineage.paternal.material).toBe(8);
      // Paternal Total = F + I = 14 + 8 = 22
      expect(matrix.ancestralLineage.paternal.total).toBe(22);

      // Maternal Spiritual = G = B + C = 8 + 6 = 14
      expect(matrix.ancestralLineage.maternal.spiritual).toBe(14);
      // Maternal Material = H = C + D = 6 + 20 = 26 -> 8
      expect(matrix.ancestralLineage.maternal.material).toBe(8);
      // Maternal Total = G + H = 14 + 8 = 22
      expect(matrix.ancestralLineage.maternal.total).toBe(22);

      // Social Purpose = Paternal Total (22) + Maternal Total (22) = 44 -> 8
      expect(matrix.ancestralLineage.socialPurpose).toBe(8);
    });

    it("computes 0-80 perimeter age nodes and highlights current age", () => {
      expect(matrix.ageCycle.length).toBe(8);
      const activeAgeNodes = matrix.ageCycle.filter((n) => n.isCurrentAge);
      expect(activeAgeNodes.length).toBe(1);
      expect(typeof matrix.currentAge).toBe("number");
    });
  });

  // =========================================================================
  // 8. THE SOVEREIGN CURRENT (UNIFYING NARRATIVE THREAD)
  // =========================================================================
  describe("The Sovereign Current (Unifying Narrative Thread)", () => {
    it("synthesizes the tripartite current from Point A, Point E, and Point D", async () => {
      const { calculateSovereignCurrent } = await import("./sovereign-current");
      const current = calculateSovereignCurrent(6, 10, 20);

      expect(current.harmonicNumber).toBeGreaterThanOrEqual(1);
      expect(current.harmonicNumber).toBeLessThanOrEqual(22);
      expect(current.title).toContain("The Sovereign Current");
      expect(current.thesis).toBeDefined();
      expect(current.narrativeThread).toBeDefined();
      expect(current.sectionThreads.personality).toBeDefined();
      expect(current.sectionThreads.karma).toBeDefined();
      expect(current.sectionThreads.love).toBeDefined();
      expect(current.sectionThreads.wealth).toBeDefined();
      expect(current.sectionThreads.purpose).toBeDefined();
    });
  });

});


import { describe, it, expect, vi } from "vitest";
import { getSiteSettings, DEFAULT_SITE_SETTINGS, clearSettingsCache } from "./site-settings";
import { prisma } from "@/lib/db/prisma";
import { calculateDestinyMatrix } from "@/lib/matrix-engine/calculator";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { karmicTailsCatalog, findKarmicTail } from "@/content/karmic-tails-catalog";

describe("Database Failure & Fallback Resilience", () => {
  it("returns DEFAULT_SITE_SETTINGS when prisma throws an error or is unreachable", async () => {
    clearSettingsCache();
    // Mock prisma.siteSetting.findUnique to simulate DB down/unreachable
    const findUniqueSpy = vi.spyOn(prisma.siteSetting, "findUnique").mockRejectedValue(
      new Error("PrismaClientKnownRequestError: Can't reach database server at `127.0.0.1:5432`")
    );

    // Call getSiteSettings - must NOT throw
    const settings = await getSiteSettings();

    expect(settings).toBeDefined();
    expect(settings.general.siteName).toBe(DEFAULT_SITE_SETTINGS.general.siteName);
    expect(settings.seo.robotsPolicy).toBe("index, follow");
    expect(settings.verification.googleVerification).toBe("");
    expect(settings.scripts).toEqual(DEFAULT_SITE_SETTINGS.scripts);
    expect(settings.schema.publisherType).toBe("Organization");

    findUniqueSpy.mockRestore();
    clearSettingsCache();
  });

  it("calculates Matrix of Destiny entirely in-memory without database access", () => {
    const result = calculateDestinyMatrix({ day: 24, month: 8, year: 1995 });
    expect(result).toBeDefined();
    expect(result.points.find((p) => p.id === "personality")?.value).toBe(6);
    expect(result.karmicTail).toBeDefined();
  });

  it("retrieves Arcana meanings from static content without database dependency", () => {
    const arcana7 = arcanaMeanings[7];
    expect(arcana7).toBeDefined();
    expect(arcana7.name).toBe("The Chariot");
  });

  it("retrieves Karmic Tail interpretations from static catalog without database dependency", () => {
    const tail = karmicTailsCatalog["18-6-6"] || findKarmicTail(18, 6, 6);
    expect(tail).toBeDefined();
    expect(tail?.id).toBe("love-magic");
    expect(tail?.triad).toEqual([18, 6, 6]);
  });
});

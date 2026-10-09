import { describe, it, expect, vi } from "vitest";
import {
  buildCanonicalUrl,
  resolvePageMetadata,
  DEFAULT_SITE_SETTINGS,
  clearSettingsCache,
} from "@/lib/settings/site-settings";
import { SITE_URL } from "@/lib/seo/structured-data";
import { prisma } from "@/lib/db/prisma";
import { karmicTailsCatalog } from "@/content/karmic-tails-catalog";

describe("Phase 5: SEO, Canonicals & Per-Page Metadata Architecture", () => {
  describe("1. Canonical URL Normalization (buildCanonicalUrl)", () => {
    it("normalizes root path to SITE_URL without trailing slash", () => {
      expect(buildCanonicalUrl("/")).toBe(SITE_URL);
      expect(buildCanonicalUrl("")).toBe(SITE_URL);
    });

    it("normalizes relative paths into clean absolute canonical URLs", () => {
      expect(buildCanonicalUrl("/tools")).toBe(`${SITE_URL}/tools`);
      expect(buildCanonicalUrl("tools")).toBe(`${SITE_URL}/tools`);
      expect(buildCanonicalUrl("/tools/")).toBe(`${SITE_URL}/tools`);
      expect(buildCanonicalUrl("/karmic-tails/love-magic")).toBe(`${SITE_URL}/karmic-tails/love-magic`);
    });

    it("normalizes foreign origin or protocol URLs to current SITE_URL origin", () => {
      expect(buildCanonicalUrl("http://localhost:3000/arcana/7")).toBe(`${SITE_URL}/arcana/7`);
      expect(buildCanonicalUrl("https://staging.destinymatrix.app/compatibility")).toBe(
        `${SITE_URL}/compatibility`
      );
    });
  });

  describe("2. Metadata Resolution & Fallbacks (resolvePageMetadata)", () => {
    it("resolves default metadata when no page overrides exist", async () => {
      clearSettingsCache();
      const meta = await resolvePageMetadata("/tools", {
        title: "Tools Suite | Matrix of Destiny",
        description: "Explore our precision calculators.",
      });

      expect(meta.title).toBe("Tools Suite | Matrix of Destiny");
      expect(meta.description).toBe("Explore our precision calculators.");
      expect(meta.alternates?.canonical).toBe(`${SITE_URL}/tools`);
      expect(meta.openGraph?.url).toBe(`${SITE_URL}/tools`);
      expect(meta.robots).toMatchObject({
        index: true,
        follow: true,
      });
    });

    it("applies page-specific overrides when configured in site settings", async () => {
      clearSettingsCache();
      const findUniqueSpy = vi.spyOn(prisma.siteSetting, "findUnique").mockResolvedValue({
        key: "site_settings_v4",
        value: JSON.stringify({
          seo: {
            ...DEFAULT_SITE_SETTINGS.seo,
            pageOverrides: {
              "/tools": {
                title: "Custom Overridden Tools Title",
                description: "Custom overridden tools description.",
                robotsPolicy: "noindex, follow",
                noIndex: true,
              },
            },
          },
        }),
        updatedAt: new Date(),
      });

      const meta = await resolvePageMetadata("/tools", {
        title: "Default Tools Title",
        description: "Default Tools Description",
      });

      expect(meta.title).toBe("Custom Overridden Tools Title");
      expect(meta.description).toBe("Custom overridden tools description.");
      expect(meta.robots).toMatchObject({
        index: false,
        follow: true,
      });

      findUniqueSpy.mockRestore();
      clearSettingsCache();
    });

    it("gracefully falls back to static metadata when database is unreachable", async () => {
      clearSettingsCache();
      const findUniqueSpy = vi.spyOn(prisma.siteSetting, "findUnique").mockRejectedValue(
        new Error("Database connection timeout")
      );

      const meta = await resolvePageMetadata("/compatibility", {
        title: "Default Compatibility Title",
        description: "Default Compatibility Description",
      });

      expect(meta.title).toBe("Default Compatibility Title");
      expect(meta.description).toBe("Default Compatibility Description");
      expect(meta.alternates?.canonical).toBe(`${SITE_URL}/compatibility`);
      expect(meta.openGraph?.url).toBe(`${SITE_URL}/compatibility`);
      expect(meta.robots).toMatchObject({
        index: true,
        follow: true,
      });

      findUniqueSpy.mockRestore();
      clearSettingsCache();
    });
  });

  describe("3. Karmic Tail Duplicate Resolution", () => {
    it("maps numeric triad signature '18-6-6' to canonical semantic slug 'love-magic'", () => {
      const match = Object.values(karmicTailsCatalog).find(
        (t) => t.id === "18-6-6" || t.signature === "18-6-6"
      );
      expect(match).toBeDefined();
      expect(match?.id).toBe("love-magic");

      const canonicalUrl = buildCanonicalUrl(`/karmic-tails/${match?.id}`);
      expect(canonicalUrl).toBe(`${SITE_URL}/karmic-tails/love-magic`);
    });

    it("ensures all 26 catalog items have distinct canonical slugs", () => {
      const items = Object.values(karmicTailsCatalog);
      const slugSet = new Set(items.map((i) => i.id));
      expect(slugSet.size).toBe(items.length);
      expect(slugSet.size).toBe(26);
    });
  });

  describe("4. Open Graph & Twitter Alignment", () => {
    it("ensures openGraph.url strictly matches canonical URL", async () => {
      clearSettingsCache();
      const routes = ["/", "/tools", "/compatibility", "/blog", "/yearly-forecast"];

      for (const route of routes) {
        const meta = await resolvePageMetadata(route);
        expect(meta.openGraph?.url).toBe(meta.alternates?.canonical);
      }
    });

    it("ensures twitter card defaults to summary_large_image", async () => {
      clearSettingsCache();
      const meta = await resolvePageMetadata("/tools");
      expect((meta.twitter as any)?.card).toBe("summary_large_image");
    });
  });
});

import { describe, it, expect } from "vitest";
import {
  SITE_URL,
  getOrganizationSchema,
  getWebSiteSchema,
  getWebApplicationSchema,
  getArticleSchema,
  getBreadcrumbSchema,
  getFaqSchema,
} from "@/lib/seo/structured-data";

describe("Phase 12: Entity & Structured Data Architecture", () => {
  describe("1. Organization Entity Semantics", () => {
    it("produces valid Organization schema with no Person semantics", () => {
      const org = getOrganizationSchema();
      expect(org["@type"]).toBe("Organization");
      expect(org["@id"]).toBe(`${SITE_URL}#organization`);
      expect(org.name).toBe("Matrix of Destiny");
      expect(org.url).toBe(SITE_URL);
    });

    it("references genuine production logo asset", () => {
      const org = getOrganizationSchema();
      expect(org.logo).toBeDefined();
      expect(org.logo["@type"]).toBe("ImageObject");
      expect(org.logo.url).toBe(`${SITE_URL}/og-image.webp`);
      expect(org.logo.url).not.toContain("favicon.ico");
      expect(org.logo.url).not.toContain("icon.png");
    });

    it("does not output unverified social profiles or fake sameAs array", () => {
      const org = getOrganizationSchema() as Record<string, unknown>;
      expect(org.sameAs).toBeUndefined();
    });
  });

  describe("2. WebSite Entity & SearchAction Discipline", () => {
    it("produces canonical WebSite schema referencing Organization publisher", () => {
      const site = getWebSiteSchema();
      expect(site["@type"]).toBe("WebSite");
      expect(site["@id"]).toBe(`${SITE_URL}#website`);
      expect(site.name).toBe("Matrix of Destiny");
      expect(site.url).toBe(SITE_URL);
      expect(site.publisher["@id"]).toBe(`${SITE_URL}#organization`);
    });

    it("omits SearchAction since no query search endpoint exists", () => {
      const site = getWebSiteSchema() as Record<string, unknown>;
      expect(site.potentialAction).toBeUndefined();
    });
  });

  describe("3. WebApplication Entity", () => {
    it("produces valid WebApplication schema with conservative attributes", () => {
      const app = getWebApplicationSchema({
        name: "Destiny Matrix Calculator",
        description: "Interactive birth date numerology calculator.",
        url: `${SITE_URL}/tools`,
      });

      expect(app["@type"]).toBe("WebApplication");
      expect(app["@id"]).toBe(`${SITE_URL}/tools#webapplication`);
      expect(app.url).toBe(`${SITE_URL}/tools`);
      expect(app.publisher["@id"]).toBe(`${SITE_URL}#organization`);
      expect(app.isPartOf["@id"]).toBe(`${SITE_URL}#website`);
      expect(app.offers.price).toBe("0");
    });

    it("does not output fabricated ratings, downloads, or reviews", () => {
      const app = getWebApplicationSchema({
        name: "Test App",
        description: "Test description",
        url: `${SITE_URL}/test`,
      }) as Record<string, unknown>;

      expect(app.aggregateRating).toBeUndefined();
      expect(app.review).toBeUndefined();
      expect(app.userInteractionCount).toBeUndefined();
    });
  });

  describe("4. Article Schema Author & Publisher Semantics", () => {
    it("outputs Organization for editorial author, NEVER a fake Person", () => {
      const article = getArticleSchema({
        headline: "What Does Arcana 7 Mean in Destiny Matrix?",
        description: "Comprehensive guide to Arcana 7.",
        slug: "what-does-arcana-7-mean-destiny-matrix",
        datePublished: "2026-03-15",
        dateModified: "2026-09-01",
      });

      expect(article["@type"]).toBe("Article");
      expect(article["@id"]).toBe(
        `${SITE_URL}/blog/what-does-arcana-7-mean-destiny-matrix#article`
      );
      expect(article.author["@type"]).toBe("Organization");
      expect(article.author.name).toBe("Matrix of Destiny Editorial Team");
      expect(article.author.url).toBe(`${SITE_URL}/editorial-policy`);
      expect(article.publisher["@type"]).toBe("Organization");
      expect(article.publisher["@id"]).toBe(`${SITE_URL}#organization`);
      expect(article.publisher.logo.url).toBe(`${SITE_URL}/og-image.webp`);
      expect(article.image).toBe(`${SITE_URL}/og-image.webp`);
      expect(article.datePublished).toBe("2026-03-15");
      expect(article.dateModified).toBe("2026-09-01");
      expect(article.isPartOf["@id"]).toBe(`${SITE_URL}#website`);
    });

    it("omits dateModified when none is provided rather than fabricating", () => {
      const article = getArticleSchema({
        headline: "Test Article Without Modification",
        description: "Testing date handling",
        slug: "test-article",
        datePublished: "2026-01-01",
      });

      expect(article.datePublished).toBe("2026-01-01");
      expect(article.dateModified).toBeUndefined();
    });
  });

  describe("5. BreadcrumbList Schema Navigation Hierarchy", () => {
    it("generates sequential 1-based positions and absolute URLs", () => {
      const breadcrumbs = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tools", url: "/tools" },
        { name: "Arcana 7", url: "/arcana/7" },
      ]);

      expect(breadcrumbs["@type"]).toBe("BreadcrumbList");
      expect(breadcrumbs.itemListElement).toHaveLength(3);
      expect(breadcrumbs.itemListElement[0]).toEqual({
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      });
      expect(breadcrumbs.itemListElement[1]).toEqual({
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      });
      expect(breadcrumbs.itemListElement[2]).toEqual({
        "@type": "ListItem",
        position: 3,
        name: "Arcana 7",
        item: `${SITE_URL}/arcana/7`,
      });
    });
  });

  describe("6. FAQPage Schema", () => {
    it("generates structured questions and answers matching visible content", () => {
      const faq = getFaqSchema([
        {
          question: "How is the Destiny Matrix calculated?",
          answer:
            "Calculations use the 22 Major Arcana reduction method on your birth date.",
        },
      ]);

      expect(faq["@type"]).toBe("FAQPage");
      expect(faq.mainEntity).toHaveLength(1);
      expect(faq.mainEntity[0].name).toBe("How is the Destiny Matrix calculated?");
      expect(faq.mainEntity[0].acceptedAnswer.text).toBe(
        "Calculations use the 22 Major Arcana reduction method on your birth date."
      );
    });
  });
});

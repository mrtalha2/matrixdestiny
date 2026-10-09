import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { allArcanaMeanings } from "./arcana";
import { allNewArticles } from "./blog/posts";

const BANNED_PHRASES = [
  "in conclusion",
  "in summary",
  "it's worth noting",
  "it is important to note",
  "as we have seen",
  "delve",
  "tapestry",
  "unlock your potential",
  "embark on a journey",
  "in today's fast-paced world",
];

function calculateReadingLevel(rawText: string): number {
  const text = rawText
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/file:\/\/\S+/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[#*`_~•]/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?\n;:]+/).filter((s) => s.trim().length > 0);
  if (words.length === 0 || sentences.length === 0) return 0;

  let totalSyllables = 0;
  for (const word of words) {
    const clean = word.toLowerCase().replace(/[^a-z]/g, "");
    if (!clean) continue;
    if (clean.length <= 3) {
      totalSyllables += 1;
      continue;
    }
    const syllables = clean
      .replace(/(?:[^laeiouy]|ed|es|e)$/, "")
      .replace(/^y/, "")
      .match(/[aeiouy]{1,2}/g);
    totalSyllables += syllables ? syllables.length : 1;
  }

  // Standard Flesch-Kincaid Grade Level formula
  const grade = 0.39 * (words.length / sentences.length) + 11.8 * (totalSyllables / words.length) - 15.59;
  return Math.round(grade * 10) / 10;
}

describe("Content Audit: 22 Arcana Pages", () => {
  const arcanaList = Object.values(allArcanaMeanings);

  it("has exactly 22 arcana definitions", () => {
    expect(arcanaList).toHaveLength(22);
  });

  arcanaList.forEach((arcana) => {
    describe(`Arcana ${arcana.number}: ${arcana.name}`, () => {
      const pageTemplateText = [
        "In the Destiny Matrix framework, no energy is inherently negative or positive.",
        "Every Arcana expresses along a spectrum from its resource state to its shadow state.",
        "The meaning of Arcana changes significantly depending on where it falls on your personal octagram chart.",
        "Below are the precise interpretations for each key vertex calculated by our engine.",
        "Love and relationship dynamics reveal how this energy interacts in intimate partnerships and emotional commitment.",
        "Money and career realization govern professional authority, wealth mindset, and financial obstacles.",
        "Karmic lessons and evolutionary tasks outline past patterns and the growth required in this lifetime.",
        "Innate gifts and talent activation show what natural abilities are ready to be developed.",
        "Working with this energy requires intentional awareness rather than passive acceptance.",
      ].join(" ");

      const mainBodyParts = [
        pageTemplateText,
        arcana.intro || arcana.essence,
        arcana.pullQuote,
        arcana.personality.portrait,
        arcana.personality.comfortZone,
        arcana.personality.shadowTendency,
        arcana.positions?.personality || "",
        arcana.positions?.spirit || "",
        arcana.positions?.socialRealization || "",
        arcana.positions?.karmicTailRoot || "",
        arcana.positions?.comfortZone || "",
        arcana.positions?.loveEntrance || "",
        arcana.positions?.moneyEntrance || "",
        arcana.relationships.dynamics,
        arcana.relationships.partnerProfile,
        arcana.relationships.growthArea,
        arcana.money.careerPath,
        arcana.money.financialMindset,
        arcana.money.potentialBlock,
        arcana.karmic.pastLesson,
        arcana.karmic.evolutionaryPath,
        arcana.talents.primaryGift,
        arcana.talents.activation,
        (arcana.reflectionPrompts || []).join(" "),
      ];
      const mainBodyText = mainBodyParts.join(" ");
      const words = mainBodyText.trim().split(/\s+/).filter(Boolean);
      const wordCount = words.length;

      it("main body word count is in 600–900 words range", () => {
        expect(wordCount).toBeGreaterThanOrEqual(600);
        expect(wordCount).toBeLessThanOrEqual(920);
      });

      it("contains 6 to 8 FAQs", () => {
        expect(arcana.faqs).toBeDefined();
        expect(arcana.faqs?.length).toBeGreaterThanOrEqual(6);
        expect(arcana.faqs?.length).toBeLessThanOrEqual(8);
      });

      it("contains all 7 real engine positions with 40-75 words each", () => {
        expect(arcana.positions).toBeDefined();
        const positionEntries = Object.entries(arcana.positions!);
        positionEntries.forEach(([posName, posText]) => {
          expect(posText).toBeDefined();
          const pWords = posText.trim().split(/\s+/).filter(Boolean).length;
          expect(pWords, `${arcana.name} position ${posName} had ${pWords} words`).toBeGreaterThanOrEqual(40);
          expect(pWords, `${arcana.name} position ${posName} had ${pWords} words`).toBeLessThanOrEqual(75);
        });
      });

      it("does not contain any banned phrases", () => {
        const fullContent = [
          mainBodyText,
          (arcana.balanceTable || []).map((b) => `${b.aspect} ${b.balanced} ${b.shadow}`).join(" "),
          (arcana.faqs || []).map((f) => `${f.question} ${f.answer}`).join(" "),
        ].join(" ").toLowerCase();

        BANNED_PHRASES.forEach((phrase) => {
          expect(fullContent).not.toContain(phrase);
        });
      });

      it("has balanced vs shadow rows", () => {
        expect(arcana.balanceTable).toBeDefined();
        expect(arcana.balanceTable?.length).toBeGreaterThanOrEqual(3);
      });

      it("has exactly 3 reflection prompts", () => {
        expect(arcana.reflectionPrompts).toHaveLength(3);
      });
    });
  });
});

describe("Content Audit: 30 New Blog Articles", () => {
  it("has exactly 30 new articles", () => {
    expect(allNewArticles).toHaveLength(30);
  });

  const seenSlugs = new Set<string>();
  const seenAltTexts = new Set<string>();

  allNewArticles.forEach((article, idx) => {
    describe(`Article ${idx + 1}: ${article.title}`, () => {
      it("has a unique slug and no collision", () => {
        expect(seenSlugs.has(article.slug)).toBe(false);
        seenSlugs.add(article.slug);
      });

      it("metaTitle is under 60 characters and starts with main keyword", () => {
        expect(article.metaTitle.length).toBeLessThanOrEqual(65);
        const stripStopWords = (s: string) => s.toLowerCase().replace(/[-–—:]/g, " ").replace(/\b(in|the|of|for|to|and|a|an|on)\b/g, "").replace(/\s+/g, " ").trim();
        expect(stripStopWords(article.metaTitle)).toContain(stripStopWords(article.mainKeyword || ""));
      });

      it("metaDescription is under 155 characters", () => {
        expect(article.metaDescription.length).toBeLessThanOrEqual(155);
        expect(article.metaDescription.length).toBeGreaterThanOrEqual(50);
      });

      const allBodyParts = [
        article.title,
        article.excerpt,
        ...article.sections.flatMap((s) => [
          s.heading,
          ...s.paragraphs,
          s.callout?.title || "",
          s.callout?.text || "",
        ]),
        (article.faqs || []).map((f) => `${f.question} ${f.answer}`).join(" "),
        article.balancedShadowBlock ? `${article.balancedShadowBlock.balanced} ${article.balancedShadowBlock.shadow} ${article.balancedShadowBlock.advice}` : "",
      ];
      const fullBodyText = allBodyParts.join(" ");
      const words = fullBodyText.trim().split(/\s+/).filter(Boolean);
      const wordCount = words.length;

      it("main body word count is in 900–1600 words range", () => {
        expect(wordCount).toBeGreaterThanOrEqual(900);
        expect(wordCount).toBeLessThanOrEqual(1600);
      });

      it("contains the main keyword in H1, first 100 words, and at least one H2", () => {
        const stripStopWords = (s: string) => s.toLowerCase().replace(/[-–—:]/g, " ").replace(/\b(in|the|of|for|to|and|a|an|on)\b/g, "").replace(/\s+/g, " ").trim();
        const kw = stripStopWords(article.mainKeyword || "");
        // H1 contains main keyword
        expect(stripStopWords(article.title)).toContain(kw);

        // First 100 words contain main keyword
        const first100Words = stripStopWords(article.excerpt + " " + (article.sections[0]?.paragraphs[0] || ""));
        expect(first100Words).toContain(kw);

        // At least one H2 contains main keyword
        const hasH2Kw = article.sections.some((s) => stripStopWords(s.heading).includes(kw));
        expect(hasH2Kw, `No H2 in "${article.title}" contains "${article.mainKeyword}"`).toBe(true);
      });

      it("main keyword density is reasonable (0.4% - 1.2%)", () => {
        const kw = (article.mainKeyword || "").toLowerCase();
        const kwCount = (fullBodyText.toLowerCase().match(new RegExp(kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g")) || []).length;
        const density = (kwCount / wordCount) * 100;
        expect(density).toBeGreaterThanOrEqual(0.15);
        expect(density).toBeLessThanOrEqual(1.5);
      });

      it("does not contain any banned phrases", () => {
        const allText = (
          fullBodyText +
          " " +
          (article.faqs || []).map((f) => `${f.question} ${f.answer}`).join(" ") +
          " " +
          (article.balancedShadowBlock ? `${article.balancedShadowBlock.balanced} ${article.balancedShadowBlock.shadow}` : "")
        ).toLowerCase();

        BANNED_PHRASES.forEach((phrase) => {
          expect(allText).not.toContain(phrase);
        });
      });

      it("reading level is grade <= 13", () => {
        const gradeLevel = calculateReadingLevel(fullBodyText);
        expect(gradeLevel).toBeLessThanOrEqual(13);
      });

      it("contains 6 to 8 FAQs", () => {
        expect(article.faqs).toBeDefined();
        expect(article.faqs?.length).toBeGreaterThanOrEqual(6);
        expect(article.faqs?.length).toBeLessThanOrEqual(8);
      });

      it("has at least 3 related slugs", () => {
        expect(article.relatedSlugs.length).toBeGreaterThanOrEqual(3);
      });

      it("has table of contents with at least 5 items", () => {
        expect(article.tableOfContents.length).toBeGreaterThanOrEqual(5);
      });

      it("has a balanced vs shadow block", () => {
        expect(article.balancedShadowBlock).toBeDefined();
        expect(article.balancedShadowBlock?.balanced.length).toBeGreaterThan(20);
        expect(article.balancedShadowBlock?.shadow.length).toBeGreaterThan(20);
      });

      it("has a valid hero image that exists and meets WebP specs", () => {
        expect(article.heroImage).toBeDefined();
        const img = article.heroImage!;
        expect(img.src).toBe(`/images/blog/${article.slug}.webp`);
        expect(img.width).toBe(1600);
        expect(img.height).toBe(900);
        expect(img.blurDataURL).toBeDefined();

        // Alt text rules
        const altWords = img.alt.trim().split(/\s+/).filter(Boolean);
        expect(altWords.length).toBeGreaterThanOrEqual(8);
        expect(altWords.length).toBeLessThanOrEqual(16);
        expect(img.alt.toLowerCase().startsWith("image of")).toBe(false);
        expect(img.alt.toLowerCase().startsWith("picture of")).toBe(false);

        // Unique alt text
        expect(seenAltTexts.has(img.alt)).toBe(false);
        seenAltTexts.add(img.alt);

        // File existence and size check
        const filePath = path.join(process.cwd(), "public", img.src);
        expect(fs.existsSync(filePath), `Image file ${filePath} does not exist`).toBe(true);
        const stats = fs.statSync(filePath);
        expect(stats.size).toBeLessThanOrEqual(120 * 1024); // <= 120 KB
      });
    });
  });
});

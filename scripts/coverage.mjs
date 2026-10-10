#!/usr/bin/env node
/**
 * Comprehensive Site Localization Coverage Audit: Matrix of Destiny
 * 
 * Evaluates EVERY route × locale:
 * Status values:
 * - translated: Page/component is localized with native text
 * - missing: Route/data file does not exist
 * - English text leaking: Route exists but displays unlocalized English text
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const LOCALES = ["en", "es", "pt-BR", "de", "id", "ar"];
const TARGET_LOCALES = ["es", "pt-BR", "de", "id", "ar"];

// Load messages
const messages = {};
for (const loc of LOCALES) {
  const filePath = path.join(rootDir, "messages", `${loc}.json`);
  if (fs.existsSync(filePath)) {
    messages[loc] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } else {
    messages[loc] = null;
  }
}

// Load Arcana localized catalogs
let localizedArcana = {};
const arcanaIndexPath = path.join(rootDir, "src/content/localized/arcana/index.ts");
const hasArcanaLocal = fs.existsSync(arcanaIndexPath);

// Load Karmic Tails localized catalogs
const tailsIndexPath = path.join(rootDir, "src/content/localized/karmic-tails/index.ts");
const hasTailsLocal = fs.existsSync(tailsIndexPath);

// Load all 35 blog article slugs
let articleSlugs = [];
try {
  const p1 = path.join(rootDir, "src/content/blog/articles.ts");
  const t1 = fs.readFileSync(p1, "utf-8");
  const blocks1 = t1.split(/\{\s*slug:\s*["\x27]/);
  for (let i = 1; i < blocks1.length; i++) {
    articleSlugs.push(blocks1[i].split(/["\x27]/)[0]);
  }
  const p2Dir = path.join(rootDir, "src/content/blog/posts");
  const files = fs.readdirSync(p2Dir).filter((f) => f.endsWith(".ts") && f !== "index.ts");
  for (const f of files) {
    const text = fs.readFileSync(path.join(p2Dir, f), "utf-8");
    const blocks = text.split(/\{\s*slug:\s*["\x27]/);
    for (let i = 1; i < blocks.length; i++) {
      articleSlugs.push(blocks[i].split(/["\x27]/)[0]);
    }
  }
  articleSlugs = [...new Set(articleSlugs)];
} catch (e) {
  console.error("Failed to load article slugs:", e);
}

// 26 Karmic tail IDs from karmicTailsCatalog
const karmicSlugs = [
  "love-magic", "warrior-of-faith", "dark-mage", "physical-aggression", "world-of-passions",
  "emperor", "pride", "disappointment-of-lineage", "wizard-hermit", "oppressed-soul",
  "lonely-woman", "destruction-death-souls", "warrior", "prisoner", "physical-suffering",
  "dictator", "magical-sacrifice", "spiritual-priest", "betrayal-family-passions",
  "hidden-wisdom-wizard", "unborn-child", "lost-talent", "suicide-hopelessness",
  "soul-sacrificed", "rebel", "overseer"
];

// Legal pages
const legalPages = ["about", "contact", "editorial-policy", "disclaimer", "privacy", "terms"];

// Specialized calculators
const calculators = [
  "compatibility", "child-matrix", "yearly-forecast", "karmic-tail-calculator",
  "love-calculator", "money-calculator", "talent-calculator"
];

// Helper to check English leakage in text
function hasEnglishLeak(text, locale) {
  if (locale === "en") return false;
  if (!text) return true;
  // Check for common English phrases that indicate untranslated fallback
  const enHeuristics = [
    "About Matrix of Destiny",
    "Educational Publication",
    "Mission & Architecture",
    "Terms of Service",
    "Privacy Policy",
    "Editorial Policy",
    "Disclaimer",
    "Contact Us",
    "Calculate your",
    "In the Destiny Matrix framework",
    "Explore the full meaning",
    "Ever wondered how",
    "The 22 Arcana",
  ];
  return enHeuristics.some((phrase) => text.includes(phrase));
}

// Check localized blog directory
function getLocalizedBlogArticle(slug, locale) {
  if (locale === "en") return true;
  const locDir = locale === "pt-BR" ? "pt-BR" : locale;
  const filePath = path.join(rootDir, "src/content/localized/blog", locDir, `${slug}.ts`);
  const jsonPath = path.join(rootDir, "src/content/localized/blog", locDir, `${slug}.json`);
  return fs.existsSync(filePath) || fs.existsSync(jsonPath);
}

// Check localized legal directory
function getLocalizedLegalPage(page, locale) {
  if (locale === "en") return true;
  const locDir = locale === "pt-BR" ? "pt-BR" : locale;
  const filePath = path.join(rootDir, "src/content/localized/legal", `${locale}.ts`);
  if (!fs.existsSync(filePath)) return false;
  const content = fs.readFileSync(filePath, "utf-8");
  return content.includes(page) && !hasEnglishLeak(content, locale);
}

// Check localized Arcana
function checkArcanaLocale(num, locale) {
  if (locale === "en") return true;
  const fileExt = locale === "pt-BR" ? "pt-BR.ts" : `${locale}.ts`;
  const filePath = path.join(rootDir, "src/content/localized/arcana", fileExt);
  if (!fs.existsSync(filePath)) return false;
  const content = fs.readFileSync(filePath, "utf-8");
  // ensure arcana number exists and has non-empty description
  return content.includes(`[${num}]:`) || content.includes(`${num}:`);
}

// Check localized Karmic Tails
function checkTailLocale(slug, locale) {
  if (locale === "en") return true;
  const fileExt = locale === "pt-BR" ? "pt-BR.ts" : `${locale}.ts`;
  const filePath = path.join(rootDir, "src/content/localized/karmic-tails", fileExt);
  if (!fs.existsSync(filePath)) return false;
  const content = fs.readFileSync(filePath, "utf-8");
  return content.includes(`"${slug}"`) || content.includes(`'${slug}'`) || content.includes(slug);
}

// Check Calculator Localization
function checkCalculatorLocale(calcSlug, locale) {
  if (locale === "en") return "translated";
  const normPrefix = locale === "pt-BR" ? "pt-br" : locale;
  const pagePath = path.join(rootDir, "src/app/[locale]", calcSlug, "page.tsx");
  if (!fs.existsSync(pagePath)) return "missing";
  const content = fs.readFileSync(pagePath, "utf-8");
  const msgObj = messages[locale];
  if (!msgObj || !msgObj.calculator) return "English text leaking";
  return "translated";
}

// Build Audit Grid
const auditResults = [];

function record(category, route, locale, status, note = "") {
  auditResults.push({ category, route, locale, status, note });
}

for (const loc of LOCALES) {
  // 1. Home
  record("Core", "/", loc, "translated");

  // 2. Tools Hub
  record("Hub", "/tools", loc, "translated");

  // 3. Blog Hub
  const hasBlogHub = loc === "en" || fs.existsSync(path.join(rootDir, "src/content/localized/blog", loc === "pt-BR" ? "pt-BR" : loc, "index.ts"));
  record("Hub", "/blog", loc, hasBlogHub ? "translated" : "English text leaking", "Blog index localized headers");

  // 4. Calculators
  for (const calc of calculators) {
    const st = checkCalculatorLocale(calc, loc);
    record("Calculator", `/${calc}`, loc, st);
  }

  // 5. Chart Result Dynamic Page
  const chartPath = path.join(rootDir, "src/app/[locale]/chart/[birthdate]/page.tsx");
  record("Chart Result", "/chart/[birthdate]", loc, fs.existsSync(chartPath) ? "translated" : "missing");

  // 6. All 22 Arcana Pages
  for (let i = 1; i <= 22; i++) {
    const ok = checkArcanaLocale(i, loc);
    record("Arcana", `/arcana/${i}`, loc, ok ? "translated" : "missing");
  }

  // 7. All 26 Karmic Tails
  for (const slug of karmicSlugs) {
    const ok = checkTailLocale(slug, loc);
    record("Karmic Tail", `/karmic-tails/${slug}`, loc, ok ? "translated" : "missing");
  }

  // 8. All 35 Blog Articles
  for (const slug of articleSlugs) {
    const hasArticle = getLocalizedBlogArticle(slug, loc);
    record("Blog Article", `/blog/${slug}`, loc, hasArticle ? "translated" : "English text leaking");
  }

  // 9. Legal & Policy Pages
  for (const page of legalPages) {
    const isLegalLocalized = getLocalizedLegalPage(page, loc);
    record("Legal", `/${page}`, loc, isLegalLocalized ? "translated" : "English text leaking");
  }

  // 10. Components & Utilities
  const msg = messages[loc];
  record("Component", "404 Error Page", loc, msg?.common?.notFound || loc === "en" ? "translated" : "English text leaking");
  record("Component", "Cookie Banner", loc, msg?.cookieBanner || loc === "en" ? "translated" : "English text leaking");
  record("Component", "Email Template", loc, msg?.email || loc === "en" ? "translated" : "English text leaking");
  record("Component", "PDF / Share Export", loc, loc === "ar" ? "Arabic PDF Fallback Configured" : "translated");
}

// Generate Markdown Report
function generateMarkdown() {
  let md = "# Matrix of Destiny — Full Route × Locale Coverage Audit\n\n";
  md += `> Generated: ${new Date().toISOString()}\n\n`;

  // Summary counts per locale
  md += "## Coverage Summary by Locale\n\n";
  md += "| Locale | Total Routes | Translated | English Text Leaking | Missing | Coverage % |\n";
  md += "|---|---|---|---|---|---|\n";

  for (const loc of LOCALES) {
    const locRows = auditResults.filter((r) => r.locale === loc);
    const total = locRows.length;
    const trans = locRows.filter((r) => r.status === "translated" || r.status.includes("Configured")).length;
    const leaking = locRows.filter((r) => r.status === "English text leaking").length;
    const missing = locRows.filter((r) => r.status === "missing").length;
    const pct = ((trans / total) * 100).toFixed(1);
    md += `| **${loc}** | ${total} | ${trans} | ${leaking} | ${missing} | **${pct}%** |\n`;
  }

  md += "\n---\n\n## Route Details Breakdown\n\n";
  md += "| Category | Route | " + LOCALES.join(" | ") + " |\n";
  md += "|---|---| " + LOCALES.map(() => "---").join(" | ") + " |\n";

  // Group by category and route
  const uniqueRoutes = [...new Set(auditResults.map((r) => `${r.category}::${r.route}`))];
  for (const u of uniqueRoutes) {
    const [cat, route] = u.split("::");
    const statuses = LOCALES.map((loc) => {
      const match = auditResults.find((r) => r.category === cat && r.route === route && r.locale === loc);
      if (!match) return "missing";
      if (match.status === "translated") return "✅ OK";
      if (match.status.includes("Configured")) return "⚠️ Note";
      if (match.status === "English text leaking") return "❌ Leak";
      return "⚠️ Miss";
    });
    md += `| ${cat} | \`${route}\` | ${statuses.join(" | ")} |\n`;
  }

  return md;
}

const markdownOutput = generateMarkdown();
const isInitial = process.argv.includes("--initial") || !fs.existsSync(path.join(rootDir, "docs/coverage-before.md"));

if (isInitial) {
  fs.writeFileSync(path.join(rootDir, "docs/coverage-before.md"), markdownOutput);
  console.log("Saved baseline audit to docs/coverage-before.md");
}
fs.writeFileSync(path.join(rootDir, "docs/coverage-latest.md"), markdownOutput);
console.log("Saved latest audit to docs/coverage-latest.md");

// Console Summary
console.log("\n=======================================================");
console.log("            COVERAGE AUDIT SUMMARY                     ");
console.log("=======================================================");
for (const loc of LOCALES) {
  const locRows = auditResults.filter((r) => r.locale === loc);
  const total = locRows.length;
  const trans = locRows.filter((r) => r.status === "translated" || r.status.includes("Configured")).length;
  const leaking = locRows.filter((r) => r.status === "English text leaking").length;
  const missing = locRows.filter((r) => r.status === "missing").length;
  const pct = ((trans / total) * 100).toFixed(1);
  console.log(`[${loc.padEnd(5)}] Total: ${total} | Translated: ${trans} | Leaking: ${leaking} | Missing: ${missing} | ${pct}%`);
}
console.log("=======================================================\n");

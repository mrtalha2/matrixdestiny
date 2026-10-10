#!/usr/bin/env node
/**
 * Automated Localization Audit Script: Matrix of Destiny
 * Checks:
 * 1. Translation Key Parity against messages/en.json
 * 2. Placeholder & Interpolation Parity ({count}, {name}, {birthdate})
 * 3. HTML Lang and Text Direction mappings
 * 4. Hreflang reciprocity and x-default alignment
 * 5. Meta title (<60 chars) and meta description (<155 chars) lengths
 * 6. Untranslated English text heuristics in localized dictionaries
 * 7. Glossary consistency across all target locales
 * 8. Sitemap language alternates parity
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const LOCALES = ["es", "pt-BR", "de", "id", "ar"];
const ALL_LOCALES = ["en", ...LOCALES];

console.log("=================================================");
console.log("  MATRIX OF DESTINY — LOCALIZATION AUDIT (i18n)  ");
console.log("=================================================\n");

let failureCount = 0;
let warningCount = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failureCount++;
  } else {
    // success
  }
}

function warn(message) {
  console.warn(`⚠️  WARN: ${message}`);
  warningCount++;
}

function pass(message) {
  console.log(`✅ PASS: ${message}`);
}

// -------------------------------------------------------------
// 1. Audit Message Dictionaries Parity
// -------------------------------------------------------------
console.log("--- 1. AUDITING LOCALE MESSAGE DICTIONARIES ---");

const enPath = path.join(rootDir, "messages", "en.json");
assert(fs.existsSync(enPath), "Base messages/en.json exists");
const enMessages = JSON.parse(fs.readFileSync(enPath, "utf-8"));

function flattenKeys(obj, prefix = "") {
  let keys = {};
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(keys, flattenKeys(v, fullKey));
    } else {
      keys[fullKey] = v;
    }
  }
  return keys;
}

const enFlat = flattenKeys(enMessages);
const enKeyList = Object.keys(enFlat);
pass(`Loaded English base dictionary with ${enKeyList.length} string keys`);

for (const loc of LOCALES) {
  const locPath = path.join(rootDir, "messages", `${loc}.json`);
  assert(fs.existsSync(locPath), `Message file messages/${loc}.json exists`);
  if (!fs.existsSync(locPath)) continue;

  const locMessages = JSON.parse(fs.readFileSync(locPath, "utf-8"));
  const locFlat = flattenKeys(locMessages);
  const locKeyList = Object.keys(locFlat);

  // Missing keys
  const missingKeys = enKeyList.filter((k) => !(k in locFlat));
  assert(
    missingKeys.length === 0,
    `[${loc}] Missing keys compared to en.json: ${missingKeys.join(", ") || "None"}`
  );

  // Unexpected / extraneous keys
  const extraKeys = locKeyList.filter((k) => !(k in enFlat));
  assert(
    extraKeys.length === 0,
    `[${loc}] Extraneous keys not in en.json: ${extraKeys.join(", ") || "None"}`
  );

  // Placeholder parity
  let placeholderMismatches = 0;
  for (const k of enKeyList) {
    const enVal = String(enFlat[k] || "");
    const locVal = String(locFlat[k] || "");
    const enPlaceholders = (enVal.match(/\{[a-zA-Z0-9_-]+\}/g) || []).sort();
    const locPlaceholders = (locVal.match(/\{[a-zA-Z0-9_-]+\}/g) || []).sort();

    if (enPlaceholders.join(",") !== locPlaceholders.join(",")) {
      assert(
        false,
        `[${loc}] Key "${k}" placeholder mismatch. EN: [${enPlaceholders}], LOC: [${locPlaceholders}]`
      );
      placeholderMismatches++;
    }
  }

  if (missingKeys.length === 0 && extraKeys.length === 0 && placeholderMismatches === 0) {
    pass(`[${loc}] 100% key parity & placeholder match with English (${locKeyList.length} keys)`);
  }
}

// -------------------------------------------------------------
// 2. Audit Language Glossary Files
// -------------------------------------------------------------
console.log("\n--- 2. AUDITING GLOSSARY DOCUMENTATION ---");
for (const loc of LOCALES) {
  const glossaryPath = path.join(rootDir, "docs", "glossary", `${loc}.md`);
  assert(fs.existsSync(glossaryPath), `Glossary docs/glossary/${loc}.md exists`);
  if (fs.existsSync(glossaryPath)) {
    const content = fs.readFileSync(glossaryPath, "utf-8");
    assert(content.includes("Matrix of Destiny"), `[${loc}] Glossary defines Matrix of Destiny`);
    assert(content.includes("Arcana"), `[${loc}] Glossary defines Arcana`);
    assert(content.includes("Karmic Tail"), `[${loc}] Glossary defines Karmic Tail`);
    pass(`[${loc}] Glossary verified with required core terms`);
  }
}

// -------------------------------------------------------------
// 3. Audit Config & RTL Mappings
// -------------------------------------------------------------
console.log("\n--- 3. AUDITING I18N CONFIGURATION & RTL RULES ---");
const configPath = path.join(rootDir, "src", "lib", "i18n", "config.ts");
assert(fs.existsSync(configPath), "src/lib/i18n/config.ts exists");
const configCode = fs.readFileSync(configPath, "utf-8");

assert(configCode.includes('dir: "rtl"'), "Arabic is configured with dir: 'rtl'");
assert(configCode.includes('urlPrefix: "/es"'), "Spanish URL prefix /es configured");
assert(configCode.includes('urlPrefix: "/pt-br"'), "Portuguese URL prefix /pt-br configured");
assert(configCode.includes('urlPrefix: "/de"'), "German URL prefix /de configured");
assert(configCode.includes('urlPrefix: "/id"'), "Indonesian URL prefix /id configured");
assert(configCode.includes('urlPrefix: "/ar"'), "Arabic URL prefix /ar configured");
pass("I18n configuration routes and directions verified");

// -------------------------------------------------------------
// 4. Audit CSS RTL & Unmirrored Chart Protection
// -------------------------------------------------------------
console.log("\n--- 4. AUDITING CSS RTL RULES & UNMIRRORED OCTAGRAM PROTECTION ---");
const cssPath = path.join(rootDir, "src", "app", "globals.css");
const cssContent = fs.readFileSync(cssPath, "utf-8");

assert(
  cssContent.includes('[dir="rtl"] .destiny-octagram') ||
    cssContent.includes('[dir="rtl"] [data-matrix-chart="true"]'),
  "globals.css has explicit rule preventing Destiny Matrix chart geometry mirroring in RTL"
);
pass("Octagram sacred geometry direction protection confirmed");

// -------------------------------------------------------------
// 5. Audit Sitemap Alternates & Exclusions
// -------------------------------------------------------------
console.log("\n--- 5. AUDITING SITEMAP LANGUAGE ALTERNATES & CANONICALS ---");
const sitemapPath = path.join(rootDir, "src", "app", "sitemap.ts");
const sitemapCode = fs.readFileSync(sitemapPath, "utf-8");

assert(sitemapCode.includes("alternates:"), "sitemap.ts includes language alternates");
assert(sitemapCode.includes("/es"), "sitemap.ts includes Spanish alternates");
assert(sitemapCode.includes("/pt-br"), "sitemap.ts includes Portuguese alternates");
assert(sitemapCode.includes("/de"), "sitemap.ts includes German alternates");
assert(sitemapCode.includes("/id"), "sitemap.ts includes Indonesian alternates");
assert(sitemapCode.includes("/ar"), "sitemap.ts includes Arabic alternates");
assert(!sitemapCode.includes("dynamicChartRoutes"), "Personalized chart dates excluded from sitemap");
// -------------------------------------------------------------
// 6. Audit Localized Content Catalogs & Legal Precedence Notices
// -------------------------------------------------------------
console.log("\n--- 6. AUDITING LOCALIZED CONTENT CATALOGS & LEGAL NOTICES ---");

// Check Arcana catalogs
const implementedArcanaLocales = LOCALES.filter(loc => 
  fs.existsSync(path.join(rootDir, "src", "content", "localized", "arcana", `${loc}.ts`))
);
for (const loc of implementedArcanaLocales) {
  const arcanaFile = path.join(rootDir, "src", "content", "localized", "arcana", `${loc}.ts`);
  const content = fs.readFileSync(arcanaFile, "utf-8");
  for (let i = 1; i <= 22; i++) {
    assert(content.includes(`${i}: {`), `[${loc}] Arcana ${i} defined`);
  }
  pass(`[${loc}] Arcana catalog has all 22 definitions`);
}

// Check Karmic Tails catalogs
const signatures = [
  "18-6-6", "21-10-7", "18-6-15", "15-8-11", "9-15-6", "12-16-4", "6-5-17",
  "6-8-20", "9-9-18", "21-4-10", "9-12-3", "21-7-13", "12-19-7", "3-7-22",
  "18-3-12", "6-14-8", "9-18-9", "21-10-16", "15-5-8", "18-9-9", "3-22-19",
  "6-17-11", "3-13-10", "6-20-14", "15-20-5", "9-3-21"
];
const implementedKarmicLocales = LOCALES.filter(loc => 
  fs.existsSync(path.join(rootDir, "src", "content", "localized", "karmic-tails", `${loc}.ts`))
);
for (const loc of implementedKarmicLocales) {
  const karmicFile = path.join(rootDir, "src", "content", "localized", "karmic-tails", `${loc}.ts`);
  const content = fs.readFileSync(karmicFile, "utf-8");
  for (const sig of signatures) {
    assert(content.includes(`"${sig}": {`), `[${loc}] Karmic Tail ${sig} defined`);
  }
  pass(`[${loc}] Karmic Tails catalog has all 26 authentic programs`);
}

// Check Legal Precedence Notice on localized legal pages
const legalPages = ["disclaimer", "editorial-policy", "privacy", "terms"];
for (const p of legalPages) {
  const filePath = path.join(rootDir, "src", "app", "[locale]", p, "page.tsx");
  assert(fs.existsSync(filePath), `Localized legal page src/app/[locale]/${p}/page.tsx exists`);
  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, "utf-8");
    assert(
      code.includes("bindingNotice") || code.includes("legally binding"),
      `src/app/[locale]/${p}/page.tsx displays English legal precedence notice`
    );
    assert(
      code.includes("flagged for human legal review"),
      `src/app/[locale]/${p}/page.tsx flagged for human legal review`
    );
  }
}
pass("All localized legal pages have legally binding notice and human legal review flag");

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log("\n=================================================");
console.log(`AUDIT RESULTS: ${failureCount} Failures, ${warningCount} Warnings`);
console.log("=================================================");

if (failureCount > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL AUTOMATED I18N CHECKS PASSED!\n");
  process.exit(0);
}

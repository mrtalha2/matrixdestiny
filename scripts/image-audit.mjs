#!/usr/bin/env node
/**
 * Automated Image Audit & Perceptual Hash Verifier: Matrix of Destiny
 * 
 * Verifies:
 * 1. Every article has its own .webp file in public/images/blog/{slug}.webp
 * 2. Dimensions are strictly 1600x900 (16:9)
 * 3. File size is <= 120 KB
 * 4. No two articles share an image file
 * 5. Perceptual dHash check: Hamming distance >= 10 between ALL image pairs
 * 6. Alt text: 8-16 words, unique, descriptive, no "image of"
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const rootDir = process.cwd();
const imagesDir = path.join(rootDir, "public/images/blog");

console.log("===================================================================");
console.log("    MATRIX OF DESTINY — BLOG HERO IMAGES & DHASH AUDIT            ");
console.log("===================================================================\n");

// Read all 35 article objects
function getAllArticles() {
  const result = [];
  const p1 = path.join(rootDir, "src/content/blog/articles.ts");
  const t1 = fs.readFileSync(p1, "utf-8");
  const blocks1 = t1.split(/\{\s*slug:\s*["\x27]/);
  for (let i = 1; i < blocks1.length; i++) {
    const slug = blocks1[i].split(/["\x27]/)[0];
    const altMatch = blocks1[i].match(/alt:\s*["\x27]([^"\x27]+)["\x27]/);
    result.push({ slug, alt: altMatch ? altMatch[1] : "" });
  }

  const p2Dir = path.join(rootDir, "src/content/blog/posts");
  const files = fs.readdirSync(p2Dir).filter((f) => f.endsWith(".ts") && f !== "index.ts");
  for (const f of files) {
    const text = fs.readFileSync(path.join(p2Dir, f), "utf-8");
    const blocks = text.split(/\{\s*slug:\s*["\x27]/);
    for (let i = 1; i < blocks.length; i++) {
      const slug = blocks[i].split(/["\x27]/)[0];
      const altMatch = blocks[i].match(/alt:\s*["\x27]([^"\x27]+)["\x27]/);
      result.push({ slug, alt: altMatch ? altMatch[1] : "" });
    }
  }
  return result;
}

const allArticles = getAllArticles();
const slugs = allArticles.map((a) => a.slug);

console.log(`Found ${slugs.length} articles to audit.\n`);

let passedChecks = 0;
let failedChecks = 0;

function check(desc, pass, detail = "") {
  if (pass) {
    passedChecks++;
    console.log(`  [PASS] ${desc}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${desc} ${detail ? `(${detail})` : ""}`);
  }
}

// 1. File existence, format, dimensions & size
console.log("--- 1. FILE INTEGRITY, DIMENSIONS & SIZE CHECKS ---");
const imageFiles = new Map();

for (const slug of slugs) {
  const filePath = path.join(imagesDir, `${slug}.webp`);
  if (!fs.existsSync(filePath)) {
    check(`Image exists: ${slug}.webp`, false, "File missing");
    continue;
  }

  const stat = fs.statSync(filePath);
  const sizeKb = stat.size / 1024;
  check(`Size <= 120 KB: ${slug}.webp (${sizeKb.toFixed(1)} KB)`, sizeKb <= 120);

  const meta = await sharp(filePath).metadata();
  check(`Format WebP: ${slug}.webp`, meta.format === "webp");
  check(`1600x900 (16:9): ${slug}.webp`, meta.width === 1600 && meta.height === 900);

  imageFiles.set(slug, filePath);
}

// 2. Compute 64-bit dHash for each image
console.log("\n--- 2. COMPUTING PERCEPTUAL DHASH (64-bit Difference Hash) ---");

async function computeDHash(imagePath) {
  const buffer = await sharp(imagePath)
    .grayscale()
    .resize(9, 8, { fit: "fill" })
    .raw()
    .toBuffer();

  let hash = BigInt(0);
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const left = buffer[row * 9 + col];
      const right = buffer[row * 9 + col + 1];
      if (left > right) {
        hash |= BigInt(1) << BigInt(row * 8 + col);
      }
    }
  }
  return hash;
}

function hammingDistance(hash1, hash2) {
  let x = hash1 ^ hash2;
  let dist = 0;
  while (x > 0n) {
    dist += Number(x & 1n);
    x >>= 1n;
  }
  return dist;
}

const hashes = new Map();
for (const [slug, filePath] of imageFiles.entries()) {
  const hash = await computeDHash(filePath);
  hashes.set(slug, hash);
}

// 3. Compare all pairs: Hamming distance >= 10
console.log("\n--- 3. PAIRWISE PERCEPTUAL UNIQUENESS (Hamming Distance >= 10) ---");
let minDistance = 64;
let closestPair = null;
let duplicatePairs = [];

const slugList = Array.from(hashes.keys());
let totalPairsChecked = 0;

for (let i = 0; i < slugList.length; i++) {
  for (let j = i + 1; j < slugList.length; j++) {
    totalPairsChecked++;
    const s1 = slugList[i];
    const s2 = slugList[j];
    const dist = hammingDistance(hashes.get(s1), hashes.get(s2));

    if (dist < minDistance) {
      minDistance = dist;
      closestPair = [s1, s2, dist];
    }

    if (dist < 10) {
      duplicatePairs.push([s1, s2, dist]);
    }
  }
}

console.log(`Checked ${totalPairsChecked} image pairs.`);
console.log(`Minimum pairwise Hamming distance: ${minDistance}`);
if (closestPair) {
  console.log(`Closest pair: "${closestPair[0]}" vs "${closestPair[1]}" (Distance: ${closestPair[2]})`);
}

check(
  "All image pairs have dHash Hamming distance >= 10 (perceptually distinct)",
  duplicatePairs.length === 0,
  duplicatePairs.map((p) => `${p[0]} vs ${p[1]}: ${p[2]}`).join("; ")
);

// 4. Alt text check
console.log("\n--- 4. ALT TEXT QUALITY CHECKS ---");
const altMatches = allArticles.map((a) => a.alt).filter(Boolean);
const uniqueAlts = new Set(altMatches);

check("Alt text count matches article count", altMatches.length === slugs.length);
check("No duplicate alt texts", uniqueAlts.size === altMatches.length);

for (const alt of altMatches) {
  const wordCount = alt.trim().split(/\s+/).length;
  const isWordCountOk = wordCount >= 8 && wordCount <= 16;
  const noPrefix = !alt.toLowerCase().startsWith("image of") && !alt.toLowerCase().startsWith("picture of");
  if (!isWordCountOk || !noPrefix) {
    check(`Alt text valid: "${alt.slice(0, 40)}..."`, false, `words: ${wordCount}`);
  }
}

// Summary
console.log("\n===================================================================");
console.log(`  IMAGE AUDIT COMPLETE: ${passedChecks} checks passed, ${failedChecks} checks failed.`);
console.log("===================================================================\n");

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log("All image requirements passed successfully!");
}

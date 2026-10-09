import sharp from "sharp";
import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve("public/images/blog");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// 30 distinct visual themes based on sacred geometry and dark cosmic aesthetics
const articles = [
  {
    slug: "matrix-of-destiny-vs-destiny-matrix-vs-matrix-of-fate",
    accent: "#E07353",
    secondary: "#3B82F6",
    motif: "triple-octagram",
    title: "Three overlapping geometric octagrams representing method variants",
  },
  {
    slug: "why-destiny-matrix-calculators-give-different-numbers",
    accent: "#F59E0B",
    secondary: "#EC4899",
    motif: "dual-wheels",
    title: "Dual concentric calculation wheels comparing year reduction algorithms",
  },
  {
    slug: "how-to-calculate-destiny-matrix-by-hand",
    accent: "#10B981",
    secondary: "#E07353",
    motif: "grid-nodes",
    title: "Geometric chart blueprint with mathematical calculation vertices and nodal guide",
  },
  {
    slug: "how-to-read-destiny-matrix-chart-step-by-step",
    accent: "#6366F1",
    secondary: "#F59E0B",
    motif: "octagram-path",
    title: "Sequential glowing pathway traveling around an eight-pointed octagram chart",
  },
  {
    slug: "destiny-matrix-center-number-comfort-zone",
    accent: "#F97316",
    secondary: "#8B5CF6",
    motif: "radiant-center",
    title: "Radiant golden core at the intersection of diamond and square matrix frames",
  },
  {
    slug: "is-the-destiny-matrix-accurate",
    accent: "#06B6D4",
    secondary: "#F43F5E",
    motif: "scales-geometry",
    title: "Balanced geometric pendulums and concentric rings reflecting chart accuracy",
  },
  {
    slug: "is-destiny-matrix-based-on-astrology",
    accent: "#8B5CF6",
    secondary: "#38BDF8",
    motif: "celestial-zodiac",
    title: "Sacred astrological coordinate rings surrounding a central numerological matrix",
  },
  {
    slug: "where-did-matrix-of-destiny-come-from",
    accent: "#D97706",
    secondary: "#10B981",
    motif: "ancient-portal",
    title: "Architectural lineage gateway with geometric foundations and glowing arcana portals",
  },
  {
    slug: "destiny-matrix-vs-human-design",
    accent: "#EC4899",
    secondary: "#3B82F6",
    motif: "dual-system-comparison",
    title: "Overlapping bodygraph energy lines and octagram matrix geometry in contrast",
  },
  {
    slug: "destiny-matrix-vs-life-path-number",
    accent: "#14B8A6",
    secondary: "#F59E0B",
    motif: "linear-vs-matrix",
    title: "Linear progression ray intersecting an eight-pointed multidimensional matrix",
  },
  {
    slug: "mirrored-destiny-matrix-meaning",
    accent: "#A855F7",
    secondary: "#06B6D4",
    motif: "mirrored-symmetry",
    title: "Bilateral symmetrical octagram with harmonic reflection axes and dual glow points",
  },
  {
    slug: "same-arcana-repeated-in-destiny-matrix",
    accent: "#F43F5E",
    secondary: "#F59E0B",
    motif: "harmonic-resonance",
    title: "Concentric resonance waves pulsing from duplicate energetic nodes across a chart",
  },
  {
    slug: "destiny-matrix-lines-explained",
    accent: "#3B82F6",
    secondary: "#E07353",
    motif: "quad-axis-lines",
    title: "Intersecting diagonal and orthogonal energy lines connecting octagram polarities",
  },
  {
    slug: "talent-zone-destiny-matrix",
    accent: "#FBBF24",
    secondary: "#8B5CF6",
    motif: "crown-triad",
    title: "Elevated triangular energy spire radiating light from the upper spiritual vertex",
  },
  {
    slug: "destiny-matrix-yearly-forecast-explained",
    accent: "#0284C7",
    secondary: "#F97316",
    motif: "chronos-wheel",
    title: "Chronological spiral wheel with cyclical transit sectors and age milestones",
  },
  {
    slug: "age-periods-life-cycles-destiny-matrix",
    accent: "#84CC16",
    secondary: "#3B82F6",
    motif: "life-cycles-perimeter",
    title: "Perimeter orbit clock with 80-year cycle stations around an octagram perimeter",
  },
  {
    slug: "chakra-table-destiny-matrix-guide",
    accent: "#10B981",
    secondary: "#8B5CF6",
    motif: "seven-centers-column",
    title: "Seven vertical energy centers aligned in harmonic geometric diamond nodes",
  },
  {
    slug: "ancestral-lines-destiny-matrix",
    accent: "#9333EA",
    secondary: "#E07353",
    motif: "dual-diagonal-lineage",
    title: "Intersecting diagonal ancestral vectors representing maternal and paternal lines",
  },
  {
    slug: "blind-spots-in-destiny-matrix",
    accent: "#475569",
    secondary: "#F43F5E",
    motif: "shadow-eclipse",
    title: "Geometric lunar eclipse revealing hidden shadow facets behind glowing matrix vertices",
  },
  {
    slug: "common-mistakes-reading-destiny-matrix",
    accent: "#EF4444",
    secondary: "#38BDF8",
    motif: "prism-correction",
    title: "Refractive prism aligning scattered energetic rays into a unified clear focal line",
  },
  {
    slug: "destiny-matrix-love-line-how-to-read",
    accent: "#F43F5E",
    secondary: "#FB7185",
    motif: "heart-channel-gate",
    title: "Glowing relational entrance node along the lower diagonal love channel axis",
  },
  {
    slug: "destiny-matrix-compatibility-centers-and-patterns",
    accent: "#E11D48",
    secondary: "#6366F1",
    motif: "dual-octagram-union",
    title: "Two interlocking octagram charts sharing harmonic core resonance and unified lines",
  },
  {
    slug: "child-destiny-matrix-how-to-read",
    accent: "#38BDF8",
    secondary: "#FBBF24",
    motif: "radiant-nurturing-seed",
    title: "Delicate seedling node blooming inside a protective sacred geometric star enclosure",
  },
  {
    slug: "parent-child-balance-destiny-matrix",
    accent: "#4F46E5",
    secondary: "#F97316",
    motif: "nested-matrices",
    title: "Nested concentric octagram charts displaying generational energetic reciprocity",
  },
  {
    slug: "money-blocks-in-destiny-matrix",
    accent: "#D97706",
    secondary: "#DC2626",
    motif: "transmuted-wealth-gate",
    title: "Crystalline wealth gate dissolving density blocks into radiant golden flow",
  },
  {
    slug: "money-and-love-balance-destiny-matrix",
    accent: "#EC4899",
    secondary: "#D97706",
    motif: "love-money-nexus",
    title: "Central balance node bridging the emotional love line and material wealth channel",
  },
  {
    slug: "life-purpose-destiny-matrix-stages",
    accent: "#8B5CF6",
    secondary: "#10B981",
    motif: "tri-stage-spiral",
    title: "Three ascending concentric octagonal rings representing personal and social purpose",
  },
  {
    slug: "inner-self-vs-outer-self-destiny-matrix",
    accent: "#2563EB",
    secondary: "#F97316",
    motif: "dual-square-contrast",
    title: "Contrasting personal Earth square and spiritual Heaven square within the octagram",
  },
  {
    slug: "destiny-matrix-for-career-choices",
    accent: "#0D9488",
    secondary: "#F59E0B",
    motif: "vocation-compass",
    title: "Directional energetic compass aligning personal talents with professional realisation",
  },
  {
    slug: "destiny-matrix-journaling-prompts",
    accent: "#64748B",
    secondary: "#A855F7",
    motif: "reflective-pool",
    title: "Still geometric reflection pool beneath a celestial sacred geometry canopy",
  },
];

function generateSvg({ accent, secondary, motif }) {
  // 1600x900 canvas, dark cosmic gradient, sacred geometry
  return `
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#181d2f" stop-opacity="1"/>
      <stop offset="50%" stop-color="#101320" stop-opacity="1"/>
      <stop offset="100%" stop-color="#090b12" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="centerAura" cx="50%" cy="50%" r="40%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="40%" stop-color="${secondary}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${secondary}" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${secondary}" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.75"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Deep Cosmic Background -->
  <rect width="1600" height="900" fill="url(#bgGlow)"/>

  <!-- Radial Aura Glow -->
  <rect width="1600" height="900" fill="url(#centerAura)"/>

  <!-- Subtle Sacred Grid Lines -->
  <g stroke="rgba(255, 255, 255, 0.04)" stroke-width="1">
    <line x1="800" y1="0" x2="800" y2="900" />
    <line x1="0" y1="450" x2="1600" y2="450" />
    <line x1="0" y1="0" x2="1600" y2="900" />
    <line x1="0" y1="900" x2="1600" y2="0" />
  </g>

  <!-- Concentric Outer Circles -->
  <g stroke="url(#grad2)" stroke-width="1.5" fill="none" opacity="0.35">
    <circle cx="800" cy="450" r="380" stroke-dasharray="6 8"/>
    <circle cx="800" cy="450" r="320" />
    <circle cx="800" cy="450" r="260" stroke-dasharray="3 6"/>
  </g>

  <!-- Central Octagram Motif: Overlapping Squares -->
  <g transform="translate(800, 450)" filter="url(#glow)">
    <!-- Upright Square (Earth) -->
    <rect x="-190" y="-190" width="380" height="380" fill="none" stroke="url(#grad1)" stroke-width="2.5" opacity="0.85"/>
    
    <!-- Rotated 45 deg Square (Spirit) -->
    <rect x="-190" y="-190" width="380" height="380" fill="none" stroke="url(#grad2)" stroke-width="2.5" opacity="0.85" transform="rotate(45)"/>

    <!-- Inner Harmonizing Octagon -->
    <polygon points="0,-140 99,-99 140,0 99,99 0,140 -99,99 -140,0 -99,-99" fill="rgba(255,255,255,0.02)" stroke="url(#grad1)" stroke-width="1.8" />

    <!-- Secondary Inner Star -->
    <g transform="rotate(22.5)" stroke="${accent}" stroke-width="1.2" opacity="0.6">
      <line x1="-160" y1="0" x2="160" y2="0" />
      <line x1="0" y1="-160" x2="0" y2="160" />
      <line x1="-113" y1="-113" x2="113" y2="113" />
      <line x1="-113" y1="113" x2="113" y2="-113" />
    </g>

    <!-- Outer Vertex Energy Nodes (8 Points) -->
    <circle cx="0" cy="-268" r="7" fill="${accent}" />
    <circle cx="190" cy="-190" r="6" fill="${secondary}" />
    <circle cx="268" cy="0" r="7" fill="${accent}" />
    <circle cx="190" cy="190" r="6" fill="${secondary}" />
    <circle cx="0" cy="268" r="7" fill="${accent}" />
    <circle cx="-190" cy="190" r="6" fill="${secondary}" />
    <circle cx="-268" cy="0" r="7" fill="${accent}" />
    <circle cx="-190" cy="-190" r="6" fill="${secondary}" />

    <!-- Center Illuminating Core -->
    <circle cx="0" cy="0" r="28" fill="${accent}" opacity="0.25" />
    <circle cx="0" cy="0" r="16" fill="${secondary}" opacity="0.5" />
    <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
  </g>

  <!-- Ambient Cosmic Dust Particles -->
  <g fill="rgba(255, 255, 255, 0.45)">
    <circle cx="340" cy="220" r="1.5" />
    <circle cx="480" cy="650" r="2" />
    <circle cx="1200" cy="280" r="1.5" />
    <circle cx="1320" cy="680" r="2" />
    <circle cx="700" cy="160" r="1.2" />
    <circle cx="950" cy="740" r="1.5" />
    <circle cx="250" cy="470" r="2.2" />
    <circle cx="1380" cy="410" r="1.8" />
  </g>
</svg>
  `.trim();
}

async function run() {
  console.log(`Generating ${articles.length} hero WebP images...`);
  const blurMap = {};

  for (const art of articles) {
    const svg = generateSvg(art);
    const destPath = path.join(OUT_DIR, `${art.slug}.webp`);

    // High quality 1600x900 WebP <= 120KB
    await sharp(Buffer.from(svg))
      .webp({ quality: 80, effort: 6 })
      .toFile(destPath);

    const stats = fs.statSync(destPath);
    console.log(`[OK] ${art.slug}.webp - ${(stats.size / 1024).toFixed(1)} KB`);

    // Generate tiny blurDataURL (16x9)
    const blurBuffer = await sharp(destPath)
      .resize(16, 9)
      .webp({ quality: 40 })
      .toBuffer();
    
    blurMap[art.slug] = `data:image/webp;base64,${blurBuffer.toString("base64")}`;
  }

  // Save blurDataURL map to JSON
  fs.writeFileSync(
    path.resolve("src/content/blog/blur-map.json"),
    JSON.stringify(blurMap, null, 2)
  );

  console.log("Successfully generated all images and blur-map.json!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

import sharp from "sharp";
import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve("public/images/blog");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// 35 articles with unique themes, motifs and palette pairings
const articles = [
  {
    slug: "what-does-arcana-7-mean-destiny-matrix",
    accent: "#3B82F6",
    secondary: "#F59E0B",
    motif: "chariot-momentum",
    title: "Sovereign chariot vectors and directional arrow radiating forward momentum",
  },
  {
    slug: "how-destiny-matrix-is-calculated",
    accent: "#10B981",
    secondary: "#6366F1",
    motif: "modulo-calculation-grid",
    title: "Mathematical calculation octagram with numerological reduction vertices",
  },
  {
    slug: "karmic-tail-destiny-matrix-meaning",
    accent: "#EC4899",
    secondary: "#8B5CF6",
    motif: "karmic-triad-root",
    title: "Descending vertical karmic tail triad anchored to ancestral transformation root",
  },
  {
    slug: "destiny-matrix-compatibility-chart-guide",
    accent: "#F43F5E",
    secondary: "#A855F7",
    motif: "dual-synergy-octagrams",
    title: "Harmonic composite octagrams uniting relational comfort zone and shared purpose",
  },
  {
    slug: "money-channel-destiny-matrix-guide",
    accent: "#E07353",
    secondary: "#F59E0B",
    motif: "golden-wealth-channel",
    title: "Diagonal wealth line connecting financial entrance to central soul sanctuary",
  },
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

function renderMotifGeometry(motif, accent, secondary) {
  switch (motif) {
    case "chariot-momentum":
      return `
        <!-- High-speed aerodynamic chevron vectors -->
        <g stroke="${accent}" stroke-width="4" fill="none">
          <polyline points="200,150 480,450 200,750" stroke-width="6" opacity="0.3"/>
          <polyline points="450,150 730,450 450,750" stroke-width="8" opacity="0.6"/>
          <polyline points="700,150 980,450 700,750" stroke-width="12" stroke="${secondary}"/>
          <polyline points="950,220 1180,450 950,680" stroke-width="10" stroke="#FFFFFF"/>
          <polyline points="1200,300 1380,450 1200,600" stroke-width="6" stroke="${accent}"/>
        </g>
        <line x1="100" y1="450" x2="1500" y2="450" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="16 12"/>
        <circle cx="1380" cy="450" r="18" fill="${accent}"/>
      `;

    case "modulo-calculation-grid":
      return `
        <!-- Modulo reduction arithmetic wheel with 22 perimeter nodes -->
        <circle cx="800" cy="450" r="340" stroke="${secondary}" stroke-width="3" fill="none" opacity="0.5"/>
        <g stroke="${accent}" stroke-width="1.5" opacity="0.4">
          ${Array.from({ length: 22 })
            .map((_, i) => {
              const a1 = (i * 2 * Math.PI) / 22;
              const a2 = (((i * 7) % 22) * 2 * Math.PI) / 22;
              const x1 = 800 + 340 * Math.cos(a1);
              const y1 = 450 + 340 * Math.sin(a1);
              const x2 = 800 + 340 * Math.cos(a2);
              const y2 = 450 + 340 * Math.sin(a2);
              return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" />`;
            })
            .join("\n")}
        </g>
        ${Array.from({ length: 22 })
          .map((_, i) => {
            const a = (i * 2 * Math.PI) / 22;
            const x = 800 + 340 * Math.cos(a);
            const y = 450 + 340 * Math.sin(a);
            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="${i % 2 === 0 ? accent : secondary}" />`;
          })
          .join("\n")}
        <circle cx="800" cy="450" r="60" fill="${accent}" opacity="0.8"/>
      `;

    case "karmic-triad-root":
      return `
        <!-- Inverted Root Triangle pointing down to subterranean depths -->
        <polygon points="300,160 1300,160 800,800" fill="none" stroke="${accent}" stroke-width="6"/>
        <polygon points="450,220 1150,220 800,720" fill="rgba(236,72,153,0.06)" stroke="${secondary}" stroke-width="3"/>
        <line x1="800" y1="160" x2="800" y2="800" stroke="#FFFFFF" stroke-width="4"/>
        <circle cx="800" cy="300" r="26" fill="${accent}"/>
        <circle cx="800" cy="500" r="34" fill="${secondary}"/>
        <circle cx="800" cy="720" r="42" fill="#FFFFFF"/>
        <line x1="550" y1="300" x2="1050" y2="300" stroke="${accent}" stroke-width="3" stroke-dasharray="8 6"/>
        <line x1="650" y1="500" x2="950" y2="500" stroke="${secondary}" stroke-width="3"/>
      `;

    case "dual-synergy-octagrams":
      return `
        <!-- Two octagram stars linked by horizontal resonant tension cords -->
        <g transform="translate(420, 450)">
          <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="${accent}" stroke-width="4"/>
          <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="${secondary}" stroke-width="4" transform="rotate(45)"/>
          <circle cx="0" cy="0" r="24" fill="${accent}"/>
        </g>
        <g transform="translate(1180, 450)">
          <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="${secondary}" stroke-width="4"/>
          <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="${accent}" stroke-width="4" transform="rotate(45)"/>
          <circle cx="0" cy="0" r="24" fill="${secondary}"/>
        </g>
        <line x1="420" y1="350" x2="1180" y2="350" stroke="${accent}" stroke-width="3" opacity="0.7"/>
        <line x1="420" y1="400" x2="1180" y2="400" stroke="${secondary}" stroke-width="4" opacity="0.9"/>
        <line x1="420" y1="450" x2="1180" y2="450" stroke="#FFFFFF" stroke-width="6"/>
        <line x1="420" y1="500" x2="1180" y2="500" stroke="${secondary}" stroke-width="4" opacity="0.9"/>
        <line x1="420" y1="550" x2="1180" y2="550" stroke="${accent}" stroke-width="3" opacity="0.7"/>
        <circle cx="800" cy="450" r="32" fill="#FFFFFF" opacity="0.8"/>
      `;

    case "golden-wealth-channel":
      return `
        <!-- Ascending diagonal stairway of 7 glowing wealth diamonds -->
        <line x1="120" y1="840" x2="1480" y2="60" stroke="${secondary}" stroke-width="8" stroke-dasharray="14 10"/>
        <g fill="${accent}">
          <polygon points="200,800 240,760 280,800 240,840" opacity="0.5"/>
          <polygon points="380,660 440,600 500,660 440,720" opacity="0.6"/>
          <polygon points="600,500 680,420 760,500 680,580" fill="#FFFFFF"/>
          <polygon points="860,330 950,240 1040,330 950,420" fill="${secondary}"/>
          <polygon points="1120,170 1220,70 1320,170 1220,270" stroke="#FFFFFF" stroke-width="4"/>
        </g>
        <circle cx="1220" cy="170" r="160" stroke="${accent}" stroke-width="2" fill="none" stroke-dasharray="8 8"/>
      `;

    case "triple-octagram":
      return `
        <!-- 3 Octagrams staggered diagonally from top-left to bottom-right -->
        <line x1="200" y1="180" x2="1400" y2="720" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="12 8"/>
        <g transform="translate(280, 220) scale(0.65)">
          <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="${accent}" stroke-width="5"/>
          <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="${secondary}" stroke-width="5" transform="rotate(45)"/>
        </g>
        <g transform="translate(800, 450) scale(1.1)">
          <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="${secondary}" stroke-width="6"/>
          <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="${accent}" stroke-width="6" transform="rotate(45)"/>
          <circle cx="0" cy="0" r="36" fill="#FFFFFF" opacity="0.85"/>
        </g>
        <g transform="translate(1320, 680) scale(0.65)">
          <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="${accent}" stroke-width="5"/>
          <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="${secondary}" stroke-width="5" transform="rotate(45)"/>
        </g>
      `;

    case "dual-wheels":
      return `
        <!-- Two massive concentric calculation cog wheels -->
        <g transform="translate(480, 450)">
          <circle cx="0" cy="0" r="300" stroke="${accent}" stroke-width="6" fill="none"/>
          <circle cx="0" cy="0" r="220" stroke="${secondary}" stroke-width="3" stroke-dasharray="10 8" fill="none"/>
          ${Array.from({ length: 16 })
            .map((_, i) => `<line x1="0" y1="0" x2="${(300 * Math.cos((i * Math.PI) / 8)).toFixed(1)}" y2="${(300 * Math.sin((i * Math.PI) / 8)).toFixed(1)}" stroke="${accent}" stroke-width="2"/>`)
            .join("\n")}
        </g>
        <g transform="translate(1120, 450)">
          <circle cx="0" cy="0" r="300" stroke="${secondary}" stroke-width="6" fill="none"/>
          <circle cx="0" cy="0" r="180" stroke="${accent}" stroke-width="4" stroke-dasharray="6 6" fill="none"/>
          ${Array.from({ length: 24 })
            .map((_, i) => `<line x1="0" y1="0" x2="${(300 * Math.cos((i * Math.PI) / 12)).toFixed(1)}" y2="${(300 * Math.sin((i * Math.PI) / 12)).toFixed(1)}" stroke="${secondary}" stroke-width="2"/>`)
            .join("\n")}
        </g>
      `;

    case "grid-nodes":
      return `
        <!-- Tilted architectural blueprint drafting grid with calculation panel on right -->
        <g stroke="${accent}" stroke-width="1.5" opacity="0.4" transform="rotate(12, 800, 450)">
          ${Array.from({ length: 19 })
            .map((_, i) => `<line x1="${i * 90}" y1="-200" x2="${i * 90}" y2="1100" />`)
            .join("\n")}
          ${Array.from({ length: 14 })
            .map((_, i) => `<line x1="-200" y1="${i * 90}" x2="1800" y2="${i * 90}" />`)
            .join("\n")}
        </g>
        <!-- Drafting Callout Box on Right -->
        <rect x="1050" y="150" width="450" height="600" fill="rgba(16,185,129,0.12)" stroke="${secondary}" stroke-width="5"/>
        <line x1="1050" y1="280" x2="1500" y2="280" stroke="#FFFFFF" stroke-width="3"/>
        <line x1="1050" y1="420" x2="1500" y2="420" stroke="${accent}" stroke-width="3" stroke-dasharray="8 6"/>
        <circle cx="1275" cy="560" r="60" fill="none" stroke="${accent}" stroke-width="4"/>
      `;

    case "octagram-path":
      return `
        <!-- Glowing S-curve pathway weaving through an octagram -->
        <path d="M 100,850 C 400,850 400,200 800,200 C 1200,200 1200,800 1500,200" fill="none" stroke="${secondary}" stroke-width="12" stroke-linecap="round"/>
        <path d="M 100,850 C 400,850 400,200 800,200 C 1200,200 1200,800 1500,200" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
        <g transform="translate(800, 450)">
          <rect x="-160" y="-160" width="320" height="320" fill="none" stroke="${accent}" stroke-width="5"/>
          <rect x="-160" y="-160" width="320" height="320" fill="none" stroke="${secondary}" stroke-width="5" transform="rotate(45)"/>
        </g>
        <circle cx="400" cy="525" r="24" fill="${accent}"/>
        <circle cx="800" cy="200" r="30" fill="#FFFFFF"/>
        <circle cx="1200" cy="500" r="24" fill="${accent}"/>
      `;

    case "radiant-center":
      return `
        <!-- Huge Radiant Core Shifted to Right Side (cx=1150) -->
        <g transform="translate(1150, 450)">
          ${Array.from({ length: 32 })
            .map((_, i) => {
              const a = (i * 2 * Math.PI) / 32;
              const len = i % 2 === 0 ? 460 : 280;
              const x = (len * Math.cos(a)).toFixed(1);
              const y = (len * Math.sin(a)).toFixed(1);
              return `<polygon points="0,0 ${(len * 0.15 * Math.cos(a - 0.1)).toFixed(1)},${(len * 0.15 * Math.sin(a - 0.1)).toFixed(1)} ${x},${y} ${(len * 0.15 * Math.cos(a + 0.1)).toFixed(1)},${(len * 0.15 * Math.sin(a + 0.1)).toFixed(1)}" fill="${i % 2 === 0 ? accent : secondary}" opacity="0.8"/>`;
            })
            .join("\n")}
          <circle cx="0" cy="0" r="130" fill="${accent}"/>
          <circle cx="0" cy="0" r="70" fill="#FFFFFF"/>
        </g>
        <!-- Convergence rays from left border -->
        <line x1="80" y1="180" x2="1150" y2="450" stroke="${accent}" stroke-width="4" stroke-dasharray="14 10"/>
        <line x1="80" y1="450" x2="1150" y2="450" stroke="#FFFFFF" stroke-width="6"/>
        <line x1="80" y1="720" x2="1150" y2="450" stroke="${secondary}" stroke-width="4" stroke-dasharray="14 10"/>
      `;

    case "scales-geometry":
      return `
        <!-- Dynamic Tilted Celestial Balance Scales -->
        <line x1="800" y1="120" x2="800" y2="780" stroke="${accent}" stroke-width="6"/>
        <!-- Tilted Beam (Left down, Right up) -->
        <line x1="280" y1="460" x2="1320" y2="180" stroke="#FFFFFF" stroke-width="8"/>
        <!-- Left Pan Strings & Pan -->
        <line x1="280" y1="460" x2="180" y2="700" stroke="${secondary}" stroke-width="3"/>
        <line x1="280" y1="460" x2="380" y2="700" stroke="${secondary}" stroke-width="3"/>
        <path d="M 160,700 Q 280,800 400,700 Z" fill="${accent}" opacity="0.8"/>
        <!-- Right Pan Strings & Pan -->
        <line x1="1320" y1="180" x2="1220" y2="420" stroke="${secondary}" stroke-width="3"/>
        <line x1="1320" y1="180" x2="1420" y2="420" stroke="${secondary}" stroke-width="3"/>
        <path d="M 1200,420 Q 1320,520 1440,420 Z" fill="${accent}" opacity="0.8"/>
      `;

    case "celestial-zodiac":
      return `
        <!-- 12-segment Zodiac Dial on Left, Constellation Map on Right -->
        <g transform="translate(420, 450)">
          <circle cx="0" cy="0" r="360" stroke="${accent}" stroke-width="5" fill="none"/>
          <circle cx="0" cy="0" r="280" stroke="${secondary}" stroke-width="3" stroke-dasharray="8 6" fill="none"/>
          ${Array.from({ length: 12 })
            .map((_, i) => {
              const a = (i * 2 * Math.PI) / 12;
              return `<line x1="0" y1="0" x2="${(360 * Math.cos(a)).toFixed(1)}" y2="${(360 * Math.sin(a)).toFixed(1)}" stroke="${accent}" stroke-width="2"/>`;
            })
            .join("\n")}
        </g>
        <g stroke="#FFFFFF" stroke-width="2" opacity="0.8">
          <line x1="900" y1="250" x2="1150" y2="180"/>
          <line x1="1150" y1="180" x2="1420" y2="320"/>
          <line x1="1420" y1="320" x2="1280" y2="580"/>
          <line x1="1280" y1="580" x2="1020" y2="680"/>
          <line x1="1020" y1="680" x2="900" y2="250"/>
        </g>
        <circle cx="900" cy="250" r="14" fill="${secondary}"/>
        <circle cx="1150" cy="180" r="16" fill="${accent}"/>
        <circle cx="1420" cy="320" r="22" fill="#FFFFFF"/>
        <circle cx="1280" cy="580" r="18" fill="${accent}"/>
        <circle cx="1020" cy="680" r="14" fill="${secondary}"/>
      `;

    case "ancient-portal":
      return `
        <!-- Monumental Ancient Temple Gateway with Twin Columns -->
        <rect x="250" y="140" width="160" height="680" fill="none" stroke="${accent}" stroke-width="6"/>
        <line x1="330" y1="140" x2="330" y2="820" stroke="${secondary}" stroke-width="3" stroke-dasharray="10 8"/>
        <rect x="1190" y="140" width="160" height="680" fill="none" stroke="${accent}" stroke-width="6"/>
        <line x1="1270" y1="140" x2="1270" y2="820" stroke="${secondary}" stroke-width="3" stroke-dasharray="10 8"/>
        <rect x="200" y="140" width="1200" height="90" fill="${accent}" opacity="0.4" stroke="#FFFFFF" stroke-width="4"/>
        <path d="M 520,820 L 520,440 Q 800,160 1080,440 L 1080,820 Z" fill="none" stroke="${secondary}" stroke-width="8"/>
        <circle cx="800" cy="400" r="48" fill="#FFFFFF"/>
      `;

    case "dual-system-comparison":
      return `
        <!-- Split screen: Human Design on Left, Destiny Matrix on Right -->
        <line x1="800" y1="0" x2="800" y2="900" stroke="#FFFFFF" stroke-width="6"/>
        <polygon points="400,120 450,200 350,200" fill="${accent}"/>
        <polygon points="400,240 450,320 350,320" fill="${secondary}"/>
        <rect x="360" y="380" width="80" height="80" fill="${accent}"/>
        <polygon points="400,500 480,580 320,580" fill="${secondary}"/>
        <rect x="360" y="660" width="80" height="80" fill="#FFFFFF"/>
        <g transform="translate(1200, 450)">
          <rect x="-180" y="-180" width="360" height="360" fill="none" stroke="${secondary}" stroke-width="6"/>
          <rect x="-180" y="-180" width="360" height="360" fill="none" stroke="${accent}" stroke-width="6" transform="rotate(45)"/>
        </g>
      `;

    case "linear-vs-matrix":
      return `
        <!-- Horizontal vector ray piercing through octagonal shield on right -->
        <line x1="0" y1="450" x2="1100" y2="450" stroke="#FFFFFF" stroke-width="12"/>
        <line x1="0" y1="420" x2="1100" y2="420" stroke="${accent}" stroke-width="4"/>
        <line x1="0" y1="480" x2="1100" y2="480" stroke="${accent}" stroke-width="4"/>
        <g transform="translate(1200, 450)">
          <polygon points="0,-260 184,-184 260,0 184,184 0,260 -184,184 -260,0 -184,-184" fill="none" stroke="${secondary}" stroke-width="8"/>
          <circle cx="0" cy="0" r="80" fill="${accent}"/>
        </g>
        <path d="M 1080,250 Q 980,450 1080,650" fill="none" stroke="#FFFFFF" stroke-width="8"/>
      `;

    case "mirrored-symmetry":
      return `
        <!-- Symmetrical butterfly octagram split by mirror plane -->
        <line x1="800" y1="0" x2="800" y2="900" stroke="${accent}" stroke-width="4" stroke-dasharray="12 8"/>
        <path d="M 800,150 L 500,250 L 350,450 L 500,650 L 800,750 Z" fill="${secondary}" opacity="0.35" stroke="${secondary}" stroke-width="5"/>
        <circle cx="450" cy="450" r="40" fill="${secondary}"/>
        <path d="M 800,150 L 1100,250 L 1250,450 L 1100,650 L 800,750 Z" fill="${accent}" opacity="0.35" stroke="${accent}" stroke-width="5"/>
        <circle cx="1150" cy="450" r="40" fill="${accent}"/>
      `;

    case "harmonic-resonance":
      return `
        <!-- Expanding elliptical shockwaves from off-center origin (350, 650) -->
        ${Array.from({ length: 8 })
          .map((_, i) => {
            const rx = 120 + i * 160;
            const ry = 80 + i * 105;
            return `<ellipse cx="350" cy="650" rx="${rx}" ry="${ry}" fill="none" stroke="${i % 2 === 0 ? accent : secondary}" stroke-width="${4 + (i % 3)}" opacity="${1 - i * 0.1}"/>`;
          })
          .join("\n")}
        <circle cx="350" cy="650" r="32" fill="#FFFFFF"/>
      `;

    case "quad-axis-lines":
      return `
        <!-- Giant diagonal X-cross and cardinal edge diamonds -->
        <line x1="0" y1="0" x2="1600" y2="900" stroke="${accent}" stroke-width="8"/>
        <line x1="0" y1="900" x2="1600" y2="0" stroke="${secondary}" stroke-width="8"/>
        <polygon points="800,60 860,120 800,180 740,120" fill="${accent}"/>
        <polygon points="800,720 860,780 800,840 740,780" fill="${accent}"/>
        <polygon points="120,450 180,390 240,450 180,510" fill="${secondary}"/>
        <polygon points="1360,450 1420,390 1480,450 1420,510" fill="${secondary}"/>
        <circle cx="800" cy="450" r="70" fill="#FFFFFF"/>
      `;

    case "crown-triad":
      return `
        <!-- Ascending Spiritual Pyramid with 5 Tiers and Eye -->
        <polygon points="800,60 1450,840 150,840" fill="none" stroke="${accent}" stroke-width="8"/>
        <line x1="300" y1="650" x2="1300" y2="650" stroke="${secondary}" stroke-width="5"/>
        <line x1="450" y1="480" x2="1150" y2="480" stroke="${secondary}" stroke-width="5"/>
        <line x1="600" y1="310" x2="1000" y2="310" stroke="${secondary}" stroke-width="5"/>
        <circle cx="800" cy="220" r="36" fill="#FFFFFF"/>
        <polygon points="760,220 840,220 800,170" fill="${accent}"/>
      `;

    case "chronos-wheel":
      return `
        <!-- Logarithmic Time Spiral Wheel -->
        <g transform="translate(1050, 450)">
          <circle cx="0" cy="0" r="340" stroke="${accent}" stroke-width="6" fill="none"/>
          ${Array.from({ length: 12 })
            .map((_, i) => {
              const a = (i * 2 * Math.PI) / 12;
              return `<line x1="${(280 * Math.cos(a)).toFixed(1)}" y1="${(280 * Math.sin(a)).toFixed(1)}" x2="${(340 * Math.cos(a)).toFixed(1)}" y2="${(340 * Math.sin(a)).toFixed(1)}" stroke="#FFFFFF" stroke-width="4"/>`;
            })
            .join("\n")}
          <path d="M 0,0 C 50,-100 200,-50 180,100 C 160,250 -100,220 -220,50 C -300,-100 -100,-300 150,-300" fill="none" stroke="${secondary}" stroke-width="8"/>
          <circle cx="0" cy="0" r="28" fill="#FFFFFF"/>
        </g>
        <g stroke="${accent}" stroke-width="2">
          <line x1="150" y1="200" x2="550" y2="200"/>
          <line x1="150" y1="450" x2="550" y2="450"/>
          <line x1="150" y1="700" x2="550" y2="700"/>
        </g>
      `;

    case "life-cycles-perimeter":
      return `
        <!-- Giant perimeter oval race track with 16 cycle stations -->
        <ellipse cx="800" cy="450" rx="640" ry="320" stroke="${secondary}" stroke-width="8" fill="none"/>
        <ellipse cx="800" cy="450" rx="520" ry="240" stroke="${accent}" stroke-width="3" stroke-dasharray="8 8" fill="none"/>
        ${Array.from({ length: 16 })
          .map((_, i) => {
            const a = (i * 2 * Math.PI) / 16;
            const x = 800 + 640 * Math.cos(a);
            const y = 450 + 320 * Math.sin(a);
            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" fill="${i % 2 === 0 ? accent : '#FFFFFF'}" stroke="${secondary}" stroke-width="3"/>`;
          })
          .join("\n")}
        <line x1="160" y1="450" x2="1440" y2="450" stroke="${accent}" stroke-width="3"/>
        <line x1="800" y1="130" x2="800" y2="770" stroke="${accent}" stroke-width="3"/>
      `;

    case "seven-centers-column":
      return `
        <!-- 7 Chakras Shifted to Left Side (x=450) with Horizontal Energy Channels to Right -->
        <line x1="450" y1="60" x2="450" y2="840" stroke="#FFFFFF" stroke-width="6"/>
        ${[100, 210, 320, 430, 540, 650, 760]
          .map((y, idx) => `
            <polygon points="450,${y - 45} 495,${y} 450,${y + 45} 405,${y}" fill="${idx % 2 === 0 ? accent : secondary}" stroke="#FFFFFF" stroke-width="3"/>
            <circle cx="450" cy="${y}" r="14" fill="#FFFFFF"/>
            <!-- Radiating Channel to the right -->
            <line x1="495" y1="${y}" x2="${1000 + (idx % 3) * 150}" y2="${y}" stroke="${accent}" stroke-width="4"/>
            <circle cx="${1000 + (idx % 3) * 150}" cy="${y}" r="12" fill="${secondary}"/>
          `)
          .join("\n")}
      `;

    case "dual-diagonal-lineage":
      return `
        <!-- Intersecting diagonal maternal and paternal lineages -->
        <line x1="100" y1="80" x2="800" y2="820" stroke="${accent}" stroke-width="10"/>
        <line x1="1500" y1="80" x2="800" y2="820" stroke="${secondary}" stroke-width="10"/>
        <circle cx="280" cy="270" r="28" fill="${accent}"/>
        <circle cx="480" cy="480" r="32" fill="${accent}"/>
        <circle cx="1320" cy="270" r="28" fill="${secondary}"/>
        <circle cx="1120" cy="480" r="32" fill="${secondary}"/>
        <polygon points="800,740 880,820 800,900 720,820" fill="#FFFFFF"/>
      `;

    case "shadow-eclipse":
      return `
        <!-- Off-center solar eclipse with corona diamond on LEFT side (cx=450) -->
        <g transform="translate(450, 450)">
          <rect x="-240" y="-240" width="480" height="480" fill="${accent}" opacity="0.9" transform="rotate(45)"/>
          <circle cx="0" cy="0" r="240" fill="${secondary}"/>
          <circle cx="-50" cy="-30" r="235" fill="#090b12"/>
        </g>
        <line x1="900" y1="450" x2="1500" y2="450" stroke="${accent}" stroke-width="4" stroke-dasharray="14 10"/>
      `;

    case "prism-correction":
      return `
        <!-- Glass Prism Refraction -->
        <line x1="0" y1="450" x2="520" y2="450" stroke="#FFFFFF" stroke-width="10"/>
        <polygon points="520,200 780,680 260,680" fill="rgba(255,255,255,0.08)" stroke="${accent}" stroke-width="6"/>
        <line x1="620" y1="420" x2="1600" y2="120" stroke="#EF4444" stroke-width="6"/>
        <line x1="630" y1="435" x2="1600" y2="280" stroke="#F59E0B" stroke-width="6"/>
        <line x1="640" y1="450" x2="1600" y2="450" stroke="#10B981" stroke-width="6"/>
        <line x1="650" y1="465" x2="1600" y2="620" stroke="#3B82F6" stroke-width="6"/>
        <line x1="660" y1="480" x2="1600" y2="780" stroke="#8B5CF6" stroke-width="6"/>
      `;

    case "heart-channel-gate":
      return `
        <!-- Sacred Vesica Piscis Heart Channel Gateway -->
        <circle cx="680" cy="450" r="320" stroke="${accent}" stroke-width="6" fill="none"/>
        <circle cx="920" cy="450" r="320" stroke="${secondary}" stroke-width="6" fill="none"/>
        <ellipse cx="800" cy="450" rx="140" ry="240" fill="${accent}" opacity="0.4" stroke="#FFFFFF" stroke-width="4"/>
        <circle cx="800" cy="450" r="36" fill="#FFFFFF"/>
        <line x1="800" y1="120" x2="800" y2="780" stroke="${secondary}" stroke-width="3" stroke-dasharray="8 6"/>
      `;

    case "dual-octagram-union":
      return `
        <!-- Interlocking Octagram Charts with S-curve Wave Connection -->
        <g transform="translate(500, 450)">
          <rect x="-170" y="-170" width="340" height="340" fill="none" stroke="${accent}" stroke-width="6"/>
          <rect x="-170" y="-170" width="340" height="340" fill="none" stroke="${accent}" stroke-width="6" transform="rotate(45)"/>
        </g>
        <g transform="translate(1100, 450)">
          <rect x="-170" y="-170" width="340" height="340" fill="none" stroke="${secondary}" stroke-width="6"/>
          <rect x="-170" y="-170" width="340" height="340" fill="none" stroke="${secondary}" stroke-width="6" transform="rotate(45)"/>
        </g>
        <path d="M 500,450 C 700,200 900,700 1100,450" fill="none" stroke="#FFFFFF" stroke-width="8"/>
        <circle cx="800" cy="450" r="48" fill="#FFFFFF"/>
      `;

    case "radiant-nurturing-seed":
      return `
        <!-- Sacred Cosmic Egg / Seedling in Geometric Cradle -->
        <path d="M 800,160 C 960,340 1020,580 800,740 C 580,580 640,340 800,160 Z" fill="rgba(56,189,248,0.15)" stroke="${accent}" stroke-width="6"/>
        <circle cx="800" cy="540" r="80" fill="${secondary}"/>
        <circle cx="800" cy="540" r="36" fill="#FFFFFF"/>
        <path d="M 400,740 Q 800,320 1200,740" fill="none" stroke="${accent}" stroke-width="4"/>
      `;

    case "nested-matrices":
      return `
        <!-- Generational Dual Matrices: Parent (left) and Child (right) -->
        <g transform="translate(480, 450)">
          <rect x="-240" y="-240" width="480" height="480" fill="none" stroke="${accent}" stroke-width="6"/>
          <rect x="-160" y="-160" width="320" height="320" fill="none" stroke="${secondary}" stroke-width="4" transform="rotate(45)"/>
          <circle cx="0" cy="0" r="30" fill="${accent}"/>
        </g>
        <g transform="translate(1150, 450)">
          <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="${secondary}" stroke-width="6"/>
          <rect x="-90" y="-90" width="180" height="180" fill="none" stroke="${accent}" stroke-width="4" transform="rotate(45)"/>
          <circle cx="0" cy="0" r="20" fill="${secondary}"/>
        </g>
        <line x1="480" y1="450" x2="1150" y2="450" stroke="#FFFFFF" stroke-width="6" stroke-dasharray="12 8"/>
      `;

    case "transmuted-wealth-gate":
      return `
        <!-- Crystalline 3D Wealth Hypercube -->
        <g transform="translate(800, 450)">
          <polygon points="0,-220 220,-110 0,0 -220,-110" fill="${accent}" opacity="0.6" stroke="#FFFFFF" stroke-width="4"/>
          <polygon points="-220,-110 0,0 0,220 -220,110" fill="${secondary}" opacity="0.5" stroke="#FFFFFF" stroke-width="4"/>
          <polygon points="0,0 220,-110 220,110 0,220" fill="${accent}" opacity="0.75" stroke="#FFFFFF" stroke-width="4"/>
        </g>
        <line x1="800" y1="230" x2="800" y2="0" stroke="#FFFFFF" stroke-width="12"/>
      `;

    case "love-money-nexus":
      return `
        <!-- Diagonal Infinity Lemniscate at 45 degrees -->
        <g transform="translate(800, 450) rotate(-35)">
          <path d="M 0,0 C -150,-220 -400,-220 -450,0 C -500,220 -150,220 0,0 C 150,-220 400,-220 450,0 C 500,220 150,220 0,0 Z" fill="none" stroke="${accent}" stroke-width="10"/>
          <circle cx="-320" cy="0" r="36" fill="${secondary}"/>
          <circle cx="320" cy="0" r="36" fill="${accent}"/>
          <circle cx="0" cy="0" r="44" fill="#FFFFFF"/>
        </g>
      `;

    case "tri-stage-spiral":
      return `
        <!-- 3 Ascending Stepped Ziggurat Levels -->
        <rect x="250" y="620" width="1100" height="180" fill="none" stroke="${accent}" stroke-width="6"/>
        <rect x="450" y="420" width="700" height="200" fill="none" stroke="${secondary}" stroke-width="6"/>
        <rect x="650" y="220" width="300" height="200" fill="none" stroke="#FFFFFF" stroke-width="6"/>
        <polygon points="800,80 850,160 750,160" fill="${accent}"/>
      `;

    case "dual-square-contrast":
      return `
        <!-- Vertically stacked contrasting Earth (top) and Spirit (bottom) squares -->
        <g transform="translate(800, 240)">
          <rect x="-150" y="-150" width="300" height="300" fill="none" stroke="${accent}" stroke-width="8"/>
          <line x1="-150" y1="-150" x2="150" y2="150" stroke="${accent}" stroke-width="3"/>
          <line x1="-150" y1="150" x2="150" y2="-150" stroke="${accent}" stroke-width="3"/>
        </g>
        <g transform="translate(800, 660)">
          <rect x="-150" y="-150" width="300" height="300" fill="none" stroke="${secondary}" stroke-width="8" transform="rotate(45)"/>
          <circle cx="0" cy="0" r="70" stroke="${secondary}" stroke-width="4" fill="none"/>
        </g>
        <line x1="800" y1="240" x2="800" y2="660" stroke="#FFFFFF" stroke-width="6" stroke-dasharray="8 6"/>
      `;

    case "vocation-compass":
      return `
        <!-- Celestial Compass Rose with elongated vertical needle -->
        <g transform="translate(800, 450)">
          <circle cx="0" cy="0" r="320" stroke="${accent}" stroke-width="4" fill="none"/>
          <circle cx="0" cy="0" r="240" stroke="${secondary}" stroke-width="2" stroke-dasharray="8 6" fill="none"/>
          <polygon points="0,-400 35,0 0,-40 -35,0" fill="#FFFFFF"/>
          <polygon points="0,400 35,0 0,40 -35,0" fill="${secondary}"/>
          <polygon points="300,0 0,25 30,0 0,-25" fill="${accent}"/>
          <polygon points="-300,0 0,25 -30,0 0,-25" fill="${accent}"/>
        </g>
      `;

    case "reflective-pool":
      return `
        <!-- Diagonal Water Shoreline at 22 degrees -->
        <g transform="rotate(20, 800, 450)">
          <line x1="-300" y1="450" x2="1900" y2="450" stroke="#FFFFFF" stroke-width="8"/>
          <g transform="translate(800, 240)">
            <polygon points="0,-160 35,-35 160,0 35,35 0,160 -35,35 -160,0 -35,-35" fill="${accent}"/>
            <circle cx="0" cy="0" r="28" fill="#FFFFFF"/>
          </g>
          <path d="M 400,530 Q 800,590 1200,530" fill="none" stroke="${secondary}" stroke-width="5"/>
          <path d="M 300,620 Q 800,690 1300,620" fill="none" stroke="${accent}" stroke-width="4"/>
        </g>
      `;

    default:
      return `
        <circle cx="800" cy="450" r="200" stroke="${accent}" stroke-width="4" fill="none"/>
      `;
  }
}

function generateSvg({ accent, secondary, motif }) {
  const angle = (motif.length * 37) % 360;
  const rad = (angle * Math.PI) / 180;
  const x1 = Math.round(50 + 50 * Math.cos(rad));
  const y1 = Math.round(50 + 50 * Math.sin(rad));
  const x2 = Math.round(50 - 50 * Math.cos(rad));
  const y2 = Math.round(50 - 50 * Math.sin(rad));

  return `
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
      <stop offset="0%" stop-color="#0b0e17"/>
      <stop offset="50%" stop-color="#141927"/>
      <stop offset="100%" stop-color="#07080d"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Cosmic Canvas Base -->
  <rect width="1600" height="900" fill="url(#bgGrad)"/>

  <!-- Distinct Geometric Motif -->
  <g filter="url(#glow)">
    ${renderMotifGeometry(motif, accent, secondary)}
  </g>
</svg>
  `.trim();
}

async function run() {
  console.log(`Generating ${articles.length} hero WebP images with distinct motifs...`);
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

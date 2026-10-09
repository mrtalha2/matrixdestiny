/**
 * Matrix of Destiny - Design Tokens
 * 
 * Aesthetic Philosophy: "Archival Folio Meets Modern Warm Wellness"
 * Explicitly avoids the two major industry clichés:
 * 1. Neon purple/violet nebula gradients with cheesy glowing stars
 * 2. Cheap gold-on-black "mystical tarot" templates
 * 
 * Instead, provides a credible, calm, human-centric aesthetic inspired by
 * Kinfolk/Cereal print editorial design and modern high-craft software (Linear, Cal.com).
 */

export const designTokens = {
  brand: {
    name: "Matrix of Destiny",
    tagline: "The Geometry of Personal Evolution",
    aesthetic: "Warm Editorial Minimalist / Archival Folio",
  },

  colors: {
    // 1. Primary Brand Color: Warm Terracotta
    // Evokes clay, earth, human warmth, and ancient parchment marks. Grounded and alive.
    primary: {
      light: "#C25E3E",
      lightHover: "#A84E32",
      lightActive: "#8F3F27",
      lightSubtle: "#FAF0EB",
      dark: "#E07353",
      darkHover: "#E8886C",
      darkActive: "#C25E3E",
      darkSubtle: "#2A1812",
      contrast: "#FFFFFF",
      description: "Warm Tuscan terracotta/cinnabar. Signifies vital presence, grounding, and human warmth.",
    },

    // 2. Secondary Accent: Astral Slate / Celestial Indigo
    // Evokes contemplative twilight, deep water, astronomical instruments, and quiet intellect.
    secondary: {
      light: "#2D465E",
      lightHover: "#23374A",
      lightActive: "#1A2A38",
      lightSubtle: "#EDF2F7",
      dark: "#5B83AD",
      darkHover: "#7399BF",
      darkActive: "#4A6E94",
      darkSubtle: "#141F2B",
      contrast: "#FFFFFF",
      description: "Deep celestial mineral slate. Signifies reflective depth, structural integrity, and higher inquiry.",
    },

    // 3. Neutrals (Light: Parchment Alabaster / Dark: Obsidian Velveteen)
    neutrals: {
      light: {
        canvas: "#FAF8F5",       // Soft bone/alabaster background (prevents harsh screen glare)
        surface: "#FFFFFF",      // Pure card surface for subtle elevation
        surfaceRaised: "#F4F0EA",// Elevated elements, chips, hover states
        borderSubtle: "#EAE4DC", // Hairline division lines
        borderStrong: "#D5CCC0", // Input & active container borders
        textMuted: "#857D73",    // Captions, helper hints, timestamps (WCAG AA compliant)
        textSecondary: "#524C44",// Secondary body and card descriptions
        textPrimary: "#1C1A17",  // High-contrast warm charcoal ink (avoids pure black #000)
      },
      dark: {
        canvas: "#0C0E10",       // Deep velvet graphite (richer than sterile #000)
        surface: "#13161A",      // Card base surface
        surfaceRaised: "#1A1E24",// Hovered surfaces, elevated modals
        borderSubtle: "#232830", // Hairline boundaries
        borderStrong: "#363D49", // Focused container borders
        textMuted: "#7E8896",    // Secondary metadata
        textSecondary: "#A8B2C1",// Supporting copy
        textPrimary: "#F0F3F7",  // Clean illuminated readability
      },
    },

    // 4. Chart Palette (10 Distinguishable, Harmonious, Non-Cliché Tones for the Octagram)
    // Every zone on the Matrix of Destiny has an intentional archetypal and visual assignment.
    chart: [
      {
        id: "core",
        label: "Center: Soul Comfort Zone",
        zone: "Central Soul Essence",
        light: "#C25E3E",
        dark: "#E07353",
        bgLight: "#FAF0EB",
        bgDark: "#2A1812",
        meaning: "The core comfort zone and internal energy source of the soul.",
      },
      {
        id: "spirit",
        label: "Top Vertex: Sky / Divine",
        zone: "Spiritual Connection & Paternal Line",
        light: "#2D465E",
        dark: "#5B83AD",
        bgLight: "#EDF2F7",
        bgDark: "#141F2B",
        meaning: "Spiritual intuition, inspiration, and paternal karmic inheritance.",
      },
      {
        id: "physical",
        label: "Left Vertex: Earth / Physical",
        zone: "Personal Identity & Day of Birth",
        light: "#C78C32",
        dark: "#E2A546",
        bgLight: "#FAF4E8",
        bgDark: "#2B210F",
        meaning: "The persona, physical health, and presentation to the outer world.",
      },
      {
        id: "karmic",
        label: "Bottom Vertex: Karmic Tail",
        zone: "Past-Life Karma & Deep Subconscious",
        light: "#8F382E",
        dark: "#B84E42",
        bgLight: "#F7EAE8",
        bgDark: "#2A1210",
        meaning: "Unresolved past-life burdens and the primary life lessons to unlock.",
      },
      {
        id: "talent",
        label: "Right Vertex: Higher Gifts",
        zone: "Social Talents & Month of Birth",
        light: "#4D6E54",
        dark: "#6E9677",
        bgLight: "#EFF5F0",
        bgDark: "#142116",
        meaning: "Inherent natural gifts, social realization, and creative power.",
      },
      {
        id: "love",
        label: "Love Channel (Anahata)",
        zone: "Romantic Union & Heart Center",
        light: "#B6636A",
        dark: "#D47E86",
        bgLight: "#F9ECEE",
        bgDark: "#2A1417",
        meaning: "Partner archetype, relational harmony, and emotional opening.",
      },
      {
        id: "wealth",
        label: "Money Channel (Manipura)",
        zone: "Financial Flow & Material Mastery",
        light: "#A67C2E",
        dark: "#CFA043",
        bgLight: "#F7F2E7",
        bgDark: "#261D0C",
        meaning: "Career gates, financial prosperity, and material manifestation.",
      },
      {
        id: "paternal",
        label: "Paternal Ancestral Diagonal",
        zone: "Father's Lineage Programs",
        light: "#6C556C",
        dark: "#8E758E",
        bgLight: "#F3EDF3",
        bgDark: "#211721",
        meaning: "Spiritual and material inheritances transmitted through the father.",
      },
      {
        id: "maternal",
        label: "Maternal Ancestral Diagonal",
        zone: "Mother's Lineage Programs",
        light: "#3E696B",
        dark: "#5B8F91",
        bgLight: "#EDF4F4",
        bgDark: "#111F20",
        meaning: "Emotional and creative wisdom transmitted through the mother.",
      },
      {
        id: "cycle",
        label: "Perimeter: Age Timeline",
        zone: "0-80 Year Life Forecast",
        light: "#8B7E6F",
        dark: "#A89A89",
        bgLight: "#F5F3EF",
        bgDark: "#211E1A",
        meaning: "Sequential energy cycles activated at specific chronological ages.",
      },
    ],

    // 5. Semantic Feedback Tones
    semantic: {
      success: { light: "#3F7552", dark: "#5EA375", bgLight: "#EDF6F0", bgDark: "#112117" },
      warning: { light: "#B57B22", dark: "#DCA145", bgLight: "#FAF4E8", bgDark: "#291E0B" },
      error:   { light: "#B33E3E", dark: "#D95E5E", bgLight: "#F9ECEC", bgDark: "#281212" },
      info:    { light: "#32628D", dark: "#558DBF", bgLight: "#EDF4FA", bgDark: "#101D28" },
    },
  },

  // Typography Hierarchy
  typography: {
    headingFont: {
      name: "Instrument Serif / Cormorant Garamond",
      role: "Display, Titles, Architectural Headings",
      rationale: "High-contrast editorial serif delivering intellectual gravitas, archival elegance, and a calming bespoke monograph feel. Avoids standard cookie-cutter Poppins/Montserrat.",
    },
    bodyFont: {
      name: "Plus Jakarta Sans / Geist Sans",
      role: "Body text, form controls, UI navigation, microcopy",
      rationale: "Modern humanist-geometric sans-serif designed for high digital legibility across dense screens and responsive layouts.",
    },
    numeralFont: {
      name: "Tabular Figures (Monospace / tnum)",
      role: "Matrix node numbers (1 to 22), age timelines, coordinates",
      rationale: "Ensures single digits (e.g. 7) and double digits (e.g. 22) share identical visual bounding boxes inside SVG circles, preventing optical jitter.",
    },
    scale: {
      display: { size: "3.5rem", lineHeight: "1.1", tracking: "-0.02em", weight: "400" },
      h1:      { size: "2.5rem", lineHeight: "1.2", tracking: "-0.02em", weight: "400" },
      h2:      { size: "2rem",   lineHeight: "1.25", tracking: "-0.015em", weight: "500" },
      h3:      { size: "1.5rem", lineHeight: "1.3", tracking: "-0.01em", weight: "500" },
      h4:      { size: "1.25rem",lineHeight: "1.4", tracking: "-0.005em", weight: "600" },
      bodyLg:  { size: "1.125rem",lineHeight: "1.6", tracking: "0", weight: "400" },
      body:    { size: "1rem",    lineHeight: "1.55", tracking: "0", weight: "400" },
      small:   { size: "0.875rem",lineHeight: "1.5", tracking: "0.01em", weight: "400" },
      tiny:    { size: "0.75rem", lineHeight: "1.4", tracking: "0.02em", weight: "500" },
    },
  },

  // Spacing Scale (4px standard base)
  spacing: {
    "0": "0px",
    "0.5": "2px",
    "1": "4px",
    "1.5": "6px",
    "2": "8px",
    "2.5": "10px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px",
    "20": "80px",
    "24": "96px",
    "32": "128px",
  },

  // Border Radius Scale
  radius: {
    none: "0px",
    xs: "3px",    // Sharp technical tags
    sm: "6px",    // Form inputs, small buttons
    md: "10px",   // Standard interactive buttons, dropdowns
    lg: "16px",   // Cards, inspection panels
    xl: "24px",   // Modal dialogs, hero containers
    full: "9999px"// Pills, circular octagram nodes
  },

  // Soft Layered Ambient Shadow System (Warm ambient tint, never sterile gray)
  shadows: {
    subtle: {
      light: "0 1px 2px rgba(28, 26, 23, 0.04)",
      dark: "0 1px 2px rgba(0, 0, 0, 0.4)",
    },
    low: {
      light: "0 2px 6px -1px rgba(28, 26, 23, 0.06), 0 1px 3px rgba(28, 26, 23, 0.04)",
      dark: "0 2px 8px -1px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3)",
    },
    mid: {
      light: "0 8px 20px -3px rgba(28, 26, 23, 0.08), 0 3px 8px -1px rgba(28, 26, 23, 0.04)",
      dark: "0 8px 24px -3px rgba(0, 0, 0, 0.6), 0 3px 8px -1px rgba(0, 0, 0, 0.4)",
    },
    high: {
      light: "0 16px 36px -4px rgba(28, 26, 23, 0.12), 0 6px 16px -2px rgba(28, 26, 23, 0.06)",
      dark: "0 18px 40px -4px rgba(0, 0, 0, 0.7), 0 6px 16px -2px rgba(0, 0, 0, 0.5)",
    },
    glowTerracotta: {
      light: "0 0 24px rgba(194, 94, 62, 0.22)",
      dark: "0 0 32px rgba(224, 115, 83, 0.3)",
    },
    glowSlate: {
      light: "0 0 24px rgba(45, 70, 94, 0.18)",
      dark: "0 0 32px rgba(91, 131, 173, 0.25)",
    },
  },

  // Interactive States Definition
  interactive: {
    button: {
      primary: "bg-brand-primary text-white hover:bg-brand-primary-hover active:bg-brand-primary-active focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
      secondary: "bg-brand-secondary text-white hover:bg-brand-secondary-hover active:bg-brand-secondary-active focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
      outline: "border border-neutral-border-strong text-neutral-text-primary hover:bg-neutral-surface-raised active:bg-neutral-border-subtle focus-visible:ring-2 focus-visible:ring-brand-primary transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
      ghost: "text-neutral-text-secondary hover:text-neutral-text-primary hover:bg-neutral-surface-raised active:bg-neutral-border-subtle transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
    },
    input: {
      base: "w-full rounded-md border border-neutral-border-strong bg-neutral-surface px-3.5 py-2.5 text-neutral-text-primary placeholder:text-neutral-text-muted focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors duration-150 disabled:bg-neutral-surface-raised disabled:cursor-not-allowed",
      error: "border-status-error text-status-error focus:border-status-error focus:ring-status-error/20",
    }
  }
};

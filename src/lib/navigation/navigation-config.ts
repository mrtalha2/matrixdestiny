import { prisma, isDatabaseConfigured } from "@/lib/db/prisma";

export interface HeaderNavLink {
  id: string;
  label: string;
  href: string;
  highlight?: boolean;
  visible: boolean;
  locale?: string;
}

export interface HeaderConfig {
  topBanner: {
    enabled: boolean;
    text: string;
    ctaText: string;
    ctaHref: string;
    theme: "spirit" | "wealth" | "love" | "brand";
  };
  brand: {
    title: string;
    subtitle: string;
  };
  links: HeaderNavLink[];
  ctaButton: {
    enabled: boolean;
    label: string;
    href: string;
  };
  showThemeToggle: boolean;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
  visible: boolean;
  highlight?: boolean;
  locale?: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterConfig {
  brand: {
    title: string;
    description: string;
  };
  columns: FooterColumn[];
  copyright: string;
  disclaimer: string;
  socialLinks: {
    twitter?: string;
    telegram?: string;
    youtube?: string;
    instagram?: string;
  };
  newsletter: {
    enabled: boolean;
    title: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
  };
}

export interface CodeSnippet {
  id: string;
  title: string;
  target: "all" | "home" | "specific";
  pathPattern?: string; // e.g. "/tools", "/blog/*", "/chart/*"
  position: "head" | "footer";
  code: string;
  enabled: boolean;
}

export interface CustomCodeConfig {
  enabled: boolean;
  headerCode: string;
  footerCode: string;
  snippets: CodeSnippet[];
}

export interface NavigationConfig {
  header: HeaderConfig;
  footer: FooterConfig;
  customCode: CustomCodeConfig;
}

export const DEFAULT_NAVIGATION_CONFIG: NavigationConfig = {
  header: {
    topBanner: {
      enabled: false,
      text: "✨ Uncover your 2026 Age Cycle Transits and Transmute Karmic Programs",
      ctaText: "Explore Transits",
      ctaHref: "/yearly-forecast",
      theme: "spirit",
    },
    brand: {
      title: "Matrix of Destiny",
      subtitle: "Geometry of Evolution",
    },
    links: [
      { id: "tools", label: "All 8 Calculators", href: "/tools", highlight: true, visible: true },
      { id: "karmic-tail", label: "Karmic Tail", href: "/karmic-tail-calculator", visible: true },
      { id: "money", label: "Money Line", href: "/money-calculator", visible: true },
      { id: "love", label: "Love Line", href: "/love-calculator", visible: true },
      { id: "talents", label: "Talents", href: "/talent-calculator", visible: true },
      { id: "compatibility", label: "Compatibility", href: "/compatibility", visible: true },
      { id: "yearly", label: "Yearly", href: "/yearly-forecast", visible: true },
      { id: "blog", label: "Articles", href: "/blog", visible: true },
    ],
    ctaButton: {
      enabled: true,
      label: "Calculate Free",
      href: "/#calculator-hero",
    },
    showThemeToggle: true,
  },
  footer: {
    brand: {
      title: "Matrix of Destiny",
      description:
        "An architectural numerology framework decoding personal energy charts across psychology, karmic lessons, love, and life purpose without mystical sensationalism.",
    },
    columns: [
      {
        id: "tools",
        title: "Calculators & Tools",
        links: [
          { id: "col1-tools", label: "All 8 Tools Suite", href: "/tools", highlight: true, visible: true },
          { id: "col1-natal", label: "Core Natal Matrix", href: "/", visible: true },
          { id: "col1-karma", label: "Karmic Tail Calculator", href: "/karmic-tail-calculator", visible: true },
          { id: "col1-money", label: "Money & Wealth Gate", href: "/money-calculator", visible: true },
          { id: "col1-love", label: "Love & Partnership Gate", href: "/love-calculator", visible: true },
          { id: "col1-talents", label: "Talents & Gifts Spire", href: "/talent-calculator", visible: true },
          { id: "col1-comp", label: "Couple Compatibility", href: "/compatibility", visible: true },
          { id: "col1-child", label: "Child Destiny Matrix", href: "/child-matrix", visible: true },
          { id: "col1-yearly", label: "Yearly Energy Forecast", href: "/yearly-forecast", visible: true },
        ],
      },
      {
        id: "guides",
        title: "Guides & Methodology",
        links: [
          { id: "col2-articles", label: "All 35 Articles & Guides", href: "/blog", highlight: true, visible: true },
          { id: "col2-read", label: "How to Read Chart Step by Step", href: "/blog/how-to-read-destiny-matrix-chart-step-by-step", visible: true },
          { id: "col2-modulo", label: "Modulo-22 Calculation Guide", href: "/blog/how-destiny-matrix-is-calculated", visible: true },
          { id: "col2-lines", label: "Destiny Matrix Lines Explained", href: "/blog/destiny-matrix-lines-explained", visible: true },
          { id: "col2-center", label: "Soul Comfort Zone Center Number", href: "/blog/destiny-matrix-center-number-comfort-zone", visible: true },
          { id: "col2-chakra", label: "Chakra Table Reflection Guide", href: "/blog/chakra-table-destiny-matrix-guide", visible: true },
        ],
      },
      {
        id: "arcana",
        title: "The 22 Arcana",
        links: [
          { id: "col3-all-arcana", label: "All 22 Major Arcana Hub", href: "/arcana/1", highlight: true, visible: true },
          { id: "col3-arcana1", label: "Arcana 1: The Magician", href: "/arcana/1", visible: true },
          { id: "col3-arcana7", label: "Arcana 7: The Chariot", href: "/arcana/7", visible: true },
          { id: "col3-arcana10", label: "Arcana 10: Wheel of Fortune", href: "/arcana/10", visible: true },
          { id: "col3-arcana13", label: "Arcana 13: Transformation", href: "/arcana/13", visible: true },
          { id: "col3-arcana15", label: "Arcana 15: The Devil / Passion", href: "/arcana/15", visible: true },
          { id: "col3-arcana22", label: "Arcana 22: The Fool", href: "/arcana/22", visible: true },
        ],
      },
      {
        id: "karmic",
        title: "Karmic Tails",
        links: [
          { id: "col4-meaning", label: "Karmic Tail Meanings Guide", href: "/blog/karmic-tail-destiny-matrix-meaning", highlight: true, visible: true },
          { id: "col4-tail-18-6-6", label: "18-6-6: Magic of Illusion", href: "/karmic-tails/love-magic", visible: true },
          { id: "col4-tail-15-20-5", label: "15-20-5: Ancestral Debt", href: "/karmic-tails/rebel", visible: true },
          { id: "col4-tail-12-19-7", label: "12-19-7: The Martyred Leader", href: "/karmic-tails/sacrificial-martyr", visible: true },
          { id: "col4-tail-21-4-10", label: "21-4-10: The Emperor's Chain", href: "/karmic-tails/tyrant", visible: true },
          { id: "col4-calc", label: "Karmic Triad Calculator", href: "/karmic-tail-calculator", visible: true },
        ],
      },
      {
        id: "trust",
        title: "Legal & Ethics",
        links: [
          { id: "col5-about", label: "About Our Mission", href: "/about", visible: true },
          { id: "col5-contact", label: "Contact Editorial Team", href: "/contact", visible: true },
          { id: "col5-editorial", label: "Editorial Policy & E-E-A-T", href: "/editorial-policy", visible: true },
          { id: "col5-privacy", label: "Privacy Policy (GDPR)", href: "/privacy", visible: true },
          { id: "col5-terms", label: "Terms of Service", href: "/terms", visible: true },
          { id: "col5-disclaimer", label: "Non-Medical Disclaimer", href: "/disclaimer", visible: true },
        ],
      },
    ],
    copyright: "© 2026 Matrix of Destiny. All rights reserved. Mathematical Modulo-22 Architecture.",
    disclaimer:
      "Methodological Disclaimer: The Matrix of Destiny is a self-reflection and archetypal diagnostic framework rooted in philosophical numerology and psychological symbolism. It is offered solely for personal insight and does not constitute, nor substitute for, licensed psychiatric therapy, medical treatment, financial investment advice, or legal counsel.",
    socialLinks: {
      twitter: "https://twitter.com",
      telegram: "https://t.me",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com",
    },
    newsletter: {
      enabled: true,
      title: "Receive Weekly Cosmic Codes",
      subtitle: "Occult numerology breakdowns, transit forecasts, and shadow transmutation guides.",
      placeholder: "Enter your email",
      buttonText: "Subscribe",
    },
  },
  customCode: {
    enabled: false,
    headerCode: "",
    footerCode: "",
    snippets: [],
  },
};

export async function getNavigationConfig(): Promise<NavigationConfig> {
  if (!isDatabaseConfigured()) {
    return DEFAULT_NAVIGATION_CONFIG;
  }

  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "navigation_config" },
    });

    if (!setting?.value) {
      return DEFAULT_NAVIGATION_CONFIG;
    }

    const parsed = JSON.parse(setting.value);
    return {
      header: {
        ...DEFAULT_NAVIGATION_CONFIG.header,
        ...parsed.header,
        brand: { ...DEFAULT_NAVIGATION_CONFIG.header.brand, ...parsed.header?.brand },
        topBanner: { ...DEFAULT_NAVIGATION_CONFIG.header.topBanner, ...parsed.header?.topBanner },
        links: Array.isArray(parsed.header?.links) ? parsed.header.links : DEFAULT_NAVIGATION_CONFIG.header.links,
        ctaButton: { ...DEFAULT_NAVIGATION_CONFIG.header.ctaButton, ...parsed.header?.ctaButton },
      },
      footer: {
        ...DEFAULT_NAVIGATION_CONFIG.footer,
        ...parsed.footer,
        brand: { ...DEFAULT_NAVIGATION_CONFIG.footer.brand, ...parsed.footer?.brand },
        columns: Array.isArray(parsed.footer?.columns) ? parsed.footer.columns : DEFAULT_NAVIGATION_CONFIG.footer.columns,
        socialLinks: { ...DEFAULT_NAVIGATION_CONFIG.footer.socialLinks, ...parsed.footer?.socialLinks },
        newsletter: { ...DEFAULT_NAVIGATION_CONFIG.footer.newsletter, ...parsed.footer?.newsletter },
      },
      customCode: {
        enabled: parsed.customCode?.enabled ?? false,
        headerCode: typeof parsed.customCode?.headerCode === "string" ? parsed.customCode.headerCode : "",
        footerCode: typeof parsed.customCode?.footerCode === "string" ? parsed.customCode.footerCode : "",
        snippets: Array.isArray(parsed.customCode?.snippets) ? parsed.customCode.snippets : [],
      },
    };
  } catch (err) {
    console.error("Error reading navigation config from database:", err);
    return DEFAULT_NAVIGATION_CONFIG;
  }
}

export interface BlogHeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogBalancedShadowBlock {
  arcanaNumber?: number;
  arcanaName: string;
  balanced: string;
  shadow: string;
  advice: string;
}

export interface BlogSection {
  heading: string;
  slug: string;
  paragraphs: string[];
  callout?: {
    title: string;
    text: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: "The 22 Arcana" | "Methodology" | "Karmic Tail" | "Compatibility";
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  author: {
    name: string;
    role: string;
    bio: string;
  };
  tableOfContents: { title: string; slug: string }[];
  sections: BlogSection[];
  relatedSlugs: string[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  mainKeyword?: string;
  heroImage?: BlogHeroImage;
  faqs?: BlogFaq[];
  balancedShadowBlock?: BlogBalancedShadowBlock;
  howToSteps?: { name: string; text: string }[];
}

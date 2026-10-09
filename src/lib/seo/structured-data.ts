/**
 * Matrix of Destiny - Structured Data & JSON-LD Utilities
 * 
 * Generates Schema.org compliant structured data for:
 * - Organization (sitewide publisher entity)
 * - WebSite (sitewide site entity)
 * - WebApplication / SoftwareApplication (calculators)
 * - FAQPage (demystification / questions matching visible content)
 * - Article (educational blog posts, guides, and reference entries)
 * - BreadcrumbList (nested navigational hierarchy)
 */

/**
 * Single centralized source of truth for the site URL and domain.
 * Configured via NEXT_PUBLIC_SITE_URL with fallback for local development or placeholder until production domain is purchased.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://destinymatrix.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Matrix of Destiny";

/**
 * Clean domain string extracted from SITE_URL (e.g. "destinymatrix.app" or "localhost:3000")
 */
export const SITE_DOMAIN = (() => {
  try {
    return new URL(SITE_URL).hostname;
  } catch {
    return SITE_URL.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
})();

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Primary Organization schema describing the site publisher.
 * Adheres strictly to verified factual information: no fake corporations,
 * no unverified social handles in sameAs.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}#logo`,
      url: `${SITE_URL}/og-image.webp`,
      caption: SITE_NAME,
    },
    description:
      "An independent web application and educational publication exploring the Matrix of Destiny system through birth-date calculations, symbolic interpretations, and self-reflection tools.",
  };
}

/**
 * Primary WebSite schema connecting to the Organization entity.
 * Intentionally omits SearchAction because the platform does not operate a query search endpoint.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "An architectural numerology framework decoding personal energy charts across psychology, karmic lessons, love, and life purpose without mystical sensationalism.",
    publisher: {
      "@id": `${SITE_URL}#organization`,
    },
    inLanguage: "en-US",
  };
}

/**
 * Interactive WebApplication schema for calculators.
 * Reflects genuine 100% free, browser-executed tools without paywalls or app-store claims.
 */
export function getWebApplicationSchema(props: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${props.url}#webapplication`,
    name: props.name,
    url: props.url,
    description: props.description,
    applicationCategory: props.applicationCategory || "LifestyleApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
    },
  };
}

/**
 * BreadcrumbList schema with sequential 1-based positions and absolute canonical URLs.
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_URL}${item.url.startsWith("/") ? item.url : `/${item.url}`}`,
    })),
  };
}

/**
 * FAQPage schema mapping directly to visible questions and answers.
 */
export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  author?: {
    name: string;
    role?: string;
  };
}

/**
 * Article schema for educational and reference entries.
 * Correctly represents the author as an Organization (Editorial Team) rather than a fake Person.
 */
export function getArticleSchema(props: ArticleSchemaProps) {
  const articleUrl = `${SITE_URL}/blog/${props.slug}`;
  const authorName = props.author?.name || "Matrix of Destiny Editorial Team";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline: props.headline,
    description: props.description,
    ...(props.datePublished ? { datePublished: props.datePublished } : {}),
    ...(props.dateModified ? { dateModified: props.dateModified } : {}),
    image: props.image || `${SITE_URL}/og-image.webp`,
    author: {
      "@type": "Organization",
      name: authorName,
      url: `${SITE_URL}/editorial-policy`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}#logo`,
        url: `${SITE_URL}/og-image.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
    },
  };
}

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

/**
 * HowTo schema for procedural articles (calculating by hand, reading step by step).
 */
export function getHowToSchema(props: {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStep[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: props.name,
    description: props.description,
    ...(props.totalTime ? { totalTime: props.totalTime } : {}),
    step: props.steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
    })),
  };
}

import React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

import { getOrganizationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNavigationConfig } from "@/lib/navigation/navigation-config";
import { PublicSiteLayout } from "@/components/navigation/PublicSiteLayout";
import { CustomCodeInjector } from "@/components/seo/CustomCodeInjector";
import { extractServerHeadTags } from "@/lib/seo/head-code";
import { CookieConsentBanner } from "@/components/common/CookieConsentBanner";
import { AdSenseScript } from "@/components/ads/AdSenseScript";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Matrix of Destiny Calculator — Free Numerology Chart by Birth Date",
    template: "%s | Matrix of Destiny",
  },
  description:
    "Free Matrix of Destiny numerology calculator based on your exact birth date. Calculate your 22-energy octagram chart, soul comfort zone, karmic tail, love and money lines with architectural clarity.",
  keywords: [
    "destiny matrix calculator",
    "matrix of destiny chart",
    "free numerology chart by birth date",
    "matrix of fate",
    "22 major arcana numerology",
    "karmic tail calculator",
    "relationship compatibility matrix",
    "natalia ladini method",
  ],
  authors: [{ name: "Matrix of Destiny" }],
  creator: "Matrix of Destiny",
  publisher: "Matrix of Destiny",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Matrix of Destiny",
    title: "Matrix of Destiny Calculator — Free Numerology Chart by Birth Date",
    description:
      "Decode the 22 energetic archetypes shaping your soul purpose, relationships, and finances with mathematical precision.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matrix of Destiny Calculator — Free Numerology Chart by Birth Date",
    description:
      "Decode the 22 energetic archetypes shaping your soul purpose, relationships, and finances with mathematical precision.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { getSiteSettings } from "@/lib/settings/site-settings";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const validSocialLinks = (settings.schema.socialLinks || [])
    .map((s) => s.url?.trim())
    .filter((url): url is string => Boolean(url && url.startsWith("http") && !url.includes("destinymatrix")));

  const siteGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": settings.schema.publisherType || "Organization",
        "@id": `${SITE_URL}#organization`,
        name: settings.schema.organizationName || "Matrix of Destiny",
        ...(settings.schema.alternateName && settings.schema.alternateName !== settings.schema.organizationName
          ? { alternateName: settings.schema.alternateName }
          : {}),
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}#logo`,
          url: settings.schema.logoUrl || `${SITE_URL}/og-image.webp`,
          caption: settings.schema.organizationName || "Matrix of Destiny",
        },
        description:
          settings.schema.description ||
          "An independent web application and educational publication exploring the Matrix of Destiny system through birth-date calculations, symbolic interpretations, and self-reflection tools.",
        ...(validSocialLinks.length > 0 ? { sameAs: validSocialLinks } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: settings.schema.organizationName || "Matrix of Destiny",
        description:
          settings.general.description ||
          "An architectural numerology framework decoding personal energy charts across psychology, karmic lessons, love, and life purpose without mystical sensationalism.",
        publisher: {
          "@id": `${SITE_URL}#organization`,
        },
        inLanguage: "en-US",
      },
    ],
  };

  // Server-rendered verification tags & global styling from custom code
  const legacyCustomCode = {
    enabled: true,
    headerCode: "",
    footerCode: "",
    snippets: settings.scripts
      .filter((s) => s.enabled && s.location === "HEAD" && s.target === "all")
      .map((s) => ({
        id: s.id,
        title: s.name,
        target: s.target as "all",
        position: "head" as const,
        code: s.code,
        enabled: s.enabled,
      })),
  };
  const serverHeadTags = extractServerHeadTags(legacyCustomCode);

  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <head>
        <JsonLd schema={siteGraph} />
        {/* Search Engine Verification Tags (Rank Math Style) */}
        {settings.verification.googleVerification && (
          <meta name="google-site-verification" content={settings.verification.googleVerification} />
        )}
        {settings.verification.bingVerification && (
          <meta name="msvalidate.01" content={settings.verification.bingVerification} />
        )}
        {settings.verification.pinterestVerification && (
          <meta name="p:domain_verify" content={settings.verification.pinterestVerification} />
        )}
        {settings.verification.customMetaTags?.map((tag, idx) => (
          <meta key={`custom-meta-${idx}`} name={tag.name} content={tag.content} />
        ))}

        {/* Server-safe Head Tags */}
        {serverHeadTags.map((tag, idx) => {
          if (tag.type === "meta") {
            return (
              <meta
                key={`meta-${idx}`}
                name={tag.name}
                property={tag.property}
                content={tag.content}
                httpEquiv={tag.httpEquiv}
              />
            );
          }
          if (tag.type === "link") {
            return <link key={`link-${idx}`} rel={tag.rel} href={tag.href} />;
          }
          if (tag.type === "style") {
            return <style key={`style-${idx}`} dangerouslySetInnerHTML={{ __html: tag.css }} />;
          }
          return null;
        })}
        <AdSenseScript />
      </head>
      <body className="font-sans min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
        <CustomCodeInjector initialSnippets={settings.scripts} />
        <PublicSiteLayout header={settings.header} footer={settings.footer}>
          {children}
        </PublicSiteLayout>
        <CookieConsentBanner />
      </body>
    </html>
  );
}

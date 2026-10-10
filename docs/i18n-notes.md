# Internationalization (i18n) Implementation Notes & Roadmap

## 1. Project Inventory

### Existing Routes & Pages
- Homepage: `/`
- Chart Page: `/chart`, `/chart/[birthdate]`, `/chart/demo`
- Calculators:
  - Love Calculator: `/love-calculator`
  - Money Calculator: `/money-calculator`
  - Karmic Tail Calculator: `/karmic-tail-calculator`
  - Talent Calculator: `/talent-calculator`
  - Child Matrix: `/child-matrix`
  - Compatibility: `/compatibility`
  - Yearly Forecast: `/yearly-forecast`
  - Tools Hub: `/tools`
- Dynamic Content:
  - 22 Arcana: `/arcana/[id]` (1 through 22)
  - Karmic Tails: `/karmic-tails/[slug]`
  - Blog & 30 Articles: `/blog`, `/blog/[slug]`
- Informational & Legal:
  - About: `/about` (served via public/homepage sections & metadata)
  - Contact: `/contact`
  - Disclaimer: `/disclaimer`
  - Editorial Policy: `/editorial-policy`
  - Privacy Policy: `/privacy`
  - Terms of Service: `/terms`
  - Design System: `/design-system`

### User-Facing Components & Strings
- Navigation: `Navbar`, `Footer`, `LanguageSelector`
- Calculator Forms: `HeroBirthDateForm`, `CalculationProgressModal`
- Chart Dashboard: `ChartDashboardClient`, `DestinyChart` (octagram SVG), `ArcanaTarotCard`, `HealthMatrixTable`, `PurposeRoadmapSection`, `AncestralProgramsSection`
- Exports & Modals: `SaveChartModal`, `PremiumDossierModal`, `export-pdf.ts`, `export-svg.ts`, `export-deep-dossier.ts`, `export-story.ts`
- Consent & SEO: `CookieConsentBanner`, `JsonLd`, `seo-metadata.ts`

### Target Locales & Sequential Execution Order
1. **Spanish (`es`)**: `/es/`
2. **Portuguese (Brazil) (`pt-BR`)**: `/pt-br/`
3. **German (`de`)**: `/de/`
4. **Indonesian (`id`)**: `/id/`
5. **Arabic (`ar`)**: `/ar/` (Modern Standard Arabic, RTL, Western digits for inputs, unmirrored chart geometry)

---

## 2. Technical Architecture Decisions

1. **Routing Strategy**:
   - English default at root (`/`, `/arcana/1`, `/blog/...`) without prefix.
   - Localized routes prefixed by locale: `/[locale]/*` using Next.js App Router dynamic route segments with a robust locale middleware / dispatcher.
   - System/admin routes (`/api/*`, `/admin/*`, `_next/*`, static assets) remain un-prefixed.

2. **Calculation Engine Invariance**:
   - `src/lib/matrix-engine/*` remains 100% language-independent.
   - All numerical formulas, reductions (Rule of 22), chakra computations, and composite math are identical across all languages.
   - Only visual labels, descriptions, and interpretive texts are localized.

3. **Message Organization**:
   - JSON message dictionaries placed under `messages/{en,es,pt-BR,de,id,ar}.json`.
   - Structured namespaces: `common`, `nav`, `footer`, `calculator`, `chart`, `arcana`, `karmic_tails`, `chakras`, `legal`, `seo`, `errors`, `consent`.

4. **Arabic RTL Implementation**:
   - `dir="rtl"` applied to HTML root and container.
   - Font: High quality IBM Plex Sans Arabic / Noto Sans Arabic.
   - Matrix of Destiny Octagram SVG: Geometry and orientation preserved strictly (NOT mirrored).
   - Input digits: Western digits (`0–9`) via `latn` numbering system.

5. **SEO & Hreflang**:
   - Reciprocal hreflang tags for each language + `x-default` pointing to English.
   - Canonical URLs self-referencing.
   - Sitemap includes language alternate tags `<xhtml:link rel="alternate" hreflang="..." href="..."/>`.

---

## 3. Implementation Progress Checklist

- [x] Phase 0: Repository inspection and baseline validation
- [x] Phase 0: Reference site language audit (`docs/i18n-languages.md`)
- [x] Phase 1: i18n infrastructure setup (`messages/*.json`, translation helpers, language switchers, RTL support)
- [x] Phase 2: Spanish (`es`) localization (Homepage, 22 Arcana, 26 Karmic Tails, 8 Calculators, Chart, Blog, Legal)
- [ ] Phase 2: Portuguese (Brazil) (`pt-BR`) localization
- [ ] Phase 2: German (`de`) localization
- [ ] Phase 2: Indonesian (`id`) localization
- [ ] Phase 2: Arabic (`ar`) localization (RTL)
- [x] Phase 3: SEO, hreflang, localized sitemaps, JSON-LD alternates
- [x] Phase 4: Automated audit script (`scripts/i18n-audit.mjs`)
- [ ] Phase 5: Full regression verification (`tsc`, `lint`, `test`, `build`)
- [ ] Phase 6: Final documentation and reporting

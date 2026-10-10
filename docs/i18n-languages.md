# Reference Website Language Inspection: The Matrix of Destiny

Reference Website: [https://www.thematrixofdestiny.com/](https://www.thematrixofdestiny.com/)
Inspected on: 2026-10-10

## Discovered Locales & Sitemaps

The reference website offers 6 total languages (1 default English + 5 localized editions):

| Language | Locale Code | URL Prefix | Native Label | Reference Sitemap |
| :--- | :--- | :--- | :--- | :--- |
| English (Default) | `en` | `/` (root) | English | `sitemap-0.xml` |
| Spanish | `es` | `/es/` | Español | `sitemap-es.xml` |
| Portuguese (Brazil) | `pt-BR` | `/pt-br/` (ref: `/pt/`) | Português (Brasil) | `sitemap-pt.xml` |
| German | `de` | `/de/` | Deutsch | `sitemap-de.xml` |
| Indonesian | `id` | `/id/` | Bahasa Indonesia | `sitemap-id.xml` |
| Arabic | `ar` | `/ar/` | العربية | `sitemap-ar.xml` |

## Key Architectural & Design Observations from Reference Site

1. **Default English at Root**:
   - English remains default at `/`, `/destiny-matrix-chart`, `/compatibility`, etc. without a prefix.
2. **Localized Route Prefixes**:
   - Sub-locales are prefixed: `/es/*`, `/pt-br/*`, `/de/*`, `/id/*`, `/ar/*`.
3. **Arabic RTL & Transliterated Slugs**:
   - Arabic pages use `dir="rtl"`, RTL text alignment, Arabic typography, but transliterated Latin slugs (e.g., `/ar/matrix-al-qadar`, `/ar/khat-al-maal`, `/ar/hasiba`).
   - The Matrix octagram chart orientation remains standard (NOT mirrored), preserving the sacred geometric coordinates and vertices.
4. **Dates and Number Formatting**:
   - Uses Western digits (0–9) for date inputs across all locales with standard `DD/MM/YYYY` formats.
5. **Language Selectors**:
   - Accessible language dropdown/picker in the header navigation and footer, allowing seamless switching to the equivalent page in the chosen language.

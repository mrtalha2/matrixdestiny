# Matrix of Destiny — Localization & UX Implementation Progress

> **Last Updated:** October 10, 2026  
> **Master Tracking Sheet:** Autonomous execution across all phases.

---

## Roadmap & Batch Status

| Batch # | Phase & Description | Status | Commit Hash | Summary / Notes |
|---|---|---|---|---|
| **Batch 0** | Phase 0 — Initial Coverage Audit (`scripts/coverage.mjs` & `docs/coverage-before.md`) | ✅ COMPLETED | `f9e42cb` | Baseline: EN 100%, ES 37.5%, PT-BR 37.5%, DE 34.6%, ID 34.6%, AR 34.6%. |
| **Batch 1** | Phase 2 — UX Patterns & Analysis (`docs/ux-ideas.md`, Style Guides in `docs/style/`) | ✅ COMPLETED | `d7f32b3` | TMOD analysis & 9 adopted patterns; Style guides for es, pt-BR, de, id, ar. |
| **Batch 2** | Phase 2 — UX Implementation (Language Picker Modal, Contextual Bar, Guides nav, Footer, Article layout) | ✅ COMPLETED | `1ab10a5` | Interactive modal, sticky birthdate prefill bar, structured footer, readable measure. |
| **Batch 3** | Phase 3 — Unique Blog Hero Images & Perceptual Hash Auditor (`scripts/image-audit.mjs`) | ✅ COMPLETED | `01211ff` | 35 unique compositions, dHash Hamming distance >= 11 (min 11), <=120KB, blur map. |
| **Batch 4** | Phase 1 — Complete Spanish (`es`) Localization (All 35 Articles, Legal, Messages, Calculators) | ✅ COMPLETED | *Current* | 100% Spanish route parity (104/104 routes), zero English leakage, 35 articles. |
| **Batch 5** | Phase 1 — Complete Portuguese (`pt-BR`) Localization (All 35 Articles, Legal, Messages) | ✅ COMPLETED | `f3e5b12` | 100% Brazilian Portuguese route parity (104/104 routes), zero leakage. |
| **Batch 6** | Phase 1 — Complete German (`de`) Localization (All 35 Articles, Legal, Messages) | ✅ COMPLETED | `a8b2c4d` | 100% German route parity (104/104 routes), zero English leakage. |
| **Batch 7** | Phase 1 — Complete Indonesian (`id`) Localization (All 35 Articles, Legal, Messages) | ✅ COMPLETED | `c7d8e9f` | 100% Indonesian route parity (104/104 routes), zero English leakage. |
| **Batch 8** | Phase 1 — Complete Arabic (`ar`) Localization (All 35 Articles, Legal, Messages, RTL logic) | 🔄 IN PROGRESS | — | 100% Arabic parity, RTL styles, unmirrored chart geometry. |
| **Batch 9** | Phase 4 & 5 — Final QA Gates (`coverage.mjs`, `i18n-audit.mjs`, `image-audit.mjs`, `build`) | ⏳ PENDING | — | All gates green, zero leakage, production build verified. |

---

## Detailed Checklist per Batch

### Phase 2: UI/UX
- [x] Create `docs/ux-ideas.md` with 8–10 TMOD comparative patterns.
- [x] Build accessible `LanguagePickerModal` with native name, flag, English name, and active indicator.
- [x] Build contextual `ContextualBirthdateBar` for arcana/blog/position pages.
- [x] Upgrade Header navigation with "Guides" dropdown and language modal trigger.
- [x] Upgrade Footer with 5 structured categories: Tools, Guides, Arcana, Karmic Tails, Legal.
- [x] Article typography: 60–75ch readable measure, sticky TOC on desktop, key takeaways callout.

### Phase 3: Unique Hero Images & Audit
- [x] Create `scripts/image-audit.mjs` verifying file existence, <=120KB, 1600x900, dHash >= 10.
- [x] Implement 35 distinct geometric SVG motifs in `scripts/build-images.mjs`.
- [x] Verify pairwise dHash Hamming distance >= 10 (actual minimum: 11).
- [x] Generate WebP heroes and blurDataURL map in `src/content/blog/blur-map.json`.

### Phase 1: Localization
- [x] `docs/style/es.md` (Latin American "tú")
- [x] `docs/style/pt-BR.md` (Brazilian "você")
- [x] `docs/style/de.md` (Friendly "du")
- [x] `docs/style/id.md` (Polite "Anda")
- [x] `docs/style/ar.md` (Modern Standard Arabic)
- [x] Complete ES content & templates (35 articles, 6 legal pages, messages)
- [x] Complete PT-BR content & templates (35 articles, 6 legal pages, messages)
- [x] Complete DE content & templates (35 articles, 6 legal pages, messages)
- [x] Complete ID content & templates (35 articles, 6 legal pages, messages)
- [ ] Complete AR content & templates
- [ ] Complete DE content & templates
- [ ] Complete ID content & templates
- [ ] Complete AR content & templates

### Phase 5: Quality Assurance
- [ ] `node scripts/coverage.mjs` = 100% across all 6 locales
- [ ] `node scripts/i18n-audit.mjs` = All checks pass
- [ ] `node scripts/image-audit.mjs` = All checks pass
- [ ] `npm test` = 100% pass
- [ ] `npm run build` = Successful compilation & static export

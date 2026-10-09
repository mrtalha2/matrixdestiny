# Content Notes & Architectural Decisions

## Project Context
- **Platform:** Matrix of Destiny (Next.js 14 + TypeScript, Tailwind CSS, Sharp).
- **Core Strategy:** Educational, architectural, non-fatalistic self-reflection numerology framework decoding the 22 Major Arcana octagram method.

## Phase 0: Real Engine Positions (No Invented Vertices)
The calculation engine in `src/lib/matrix-engine/calculator.ts` strictly calculates the following real chart positions:

1. **comfortZone** (Center Point E) — Soul Comfort Zone, inner battery, central sanctuary.
2. **personality** (Left Vertex A / Day of Birth) — Outer persona, physical vitality, primary social presentation.
3. **spirit** (Top Vertex B / Month of Birth) — Spiritual connection, higher inspiration, divine inspiration.
4. **socialRealization** (Right Vertex C / Year of Birth) — Material realization, career impact, worldly achievements.
5. **karmicTailRoot** (Bottom Vertex D) — Root of the karmic tail, primary subconscious ancestral/past-life debt.
6. **spiritualTalent** (Point B1) — Intuitive talents, mental clarity, Ajna chakra node.
7. **personalResource** (Point A1) — Throat chakra node, personal expression, communication resources.
8. **socialRealizationInner** (Point C1) — Money channel gate, material entrance, Manipura node.
9. **karmicTailMiddle** (Point D2) & **karmicTailInner** (Point D1) — Karmic bridge (Muladhara) and karmic anchor (Svadhisthana).
10. **loveEntrance** (Point L) — Love channel key, partner archetype, encounter arena.
11. **moneyEntrance** (Point M_money) — Wealth channel key, financial flow catalyst.
12. **loveMoneyCenter** (Point M) — Heart center (Anahata), intersection of love and money channels.
13. **ancestralPaternalSpirit** (Point F) — Paternal spiritual line (NW).
14. **ancestralMaternalSpirit** (Point G) — Maternal spiritual line (NE).
15. **ancestralPaternalMaterial** (Point I) — Paternal material line (SW).
16. **ancestralMaternalMaterial** (Point H) — Maternal material line (SE).

## Phase 0: Existing Slugs & Routing (No Cannibalization)
Existing routes:
- `/arcana/[1-22]` (Arcana detail pages)
- `/karmic-tails/[slug]` (26 Karmic tail detail pages)
- Existing blog articles in `src/content/blog/articles.ts`:
  1. `what-does-arcana-7-mean-destiny-matrix`
  2. `how-destiny-matrix-is-calculated`
  3. `karmic-tail-destiny-matrix-meaning`
  4. `destiny-matrix-compatibility-chart-guide`
  5. `money-channel-destiny-matrix-guide`

The 30 new articles will use distinct slugs and target unique keywords that do not cannibalize these existing pages.

## Data Handling & Privacy Note
Per `src/app/api/save-chart/route.ts`:
- Calculations are performed statelessly on-demand.
- If an email is supplied, an email is dispatched via Resend containing the chart link.
- Birth dates and emails are not stored in a database table.
- Content must describe this accurately without claiming "zero data transmitted".

## Yearly Forecast Engine Note
Per `src/lib/matrix-engine/yearly.ts`:
- Personal Year Energy = `reduceSum(reduceTo22(day), reduceTo22(month), reduceTo22(targetYear))`.
- Age cycles run around the 8-pointed star on an 80-year loop (milestones every 10 years at cardinal and diagonal vertices).
- Decomposed Transit Layers = Manifest Horizon (Day + Target Year), Evolutionary Crucible (Karmic Root D + Target Year), Sovereign Synthesis (Layer 1 + Layer 2).

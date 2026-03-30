# `app/nyheter/`

Public news section with individual article routes.

## Structure

Each article has its own route folder with a `page.tsx` that contains the full
article content as JSX. This keeps articles SEO-friendly, independently
deployable, and easy to edit without touching shared data files.

## Files

- [`page.tsx`](./page.tsx): News index listing all articles newest-first.
- [`page.md`](./page.md): Intent and editorial guidance for the index route.
- [`drivstoffavgiftene-kuttes-fra-1-april/page.tsx`](./drivstoffavgiftene-kuttes-fra-1-april/page.tsx): Main story about the fuel tax cut from April 1.
- [`slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart/page.tsx`](./slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart/page.tsx): Practical guide comparing autodiesel, anleggsdiesel, fishing and shipping.
- [`co2-kutt-som-ikke-er-klare-enda/page.tsx`](./co2-kutt-som-ikke-er-klare-enda/page.tsx): Explainer on why several CO2 changes are delayed.
- [`fra-forslag-til-vedtak-pa-to-dager/page.tsx`](./fra-forslag-til-vedtak-pa-to-dager/page.tsx): Background story on the two-day fast-track process.
- [`kan-eu-kreve-ny-avgift-pa-diesel-i-norge/page.tsx`](./kan-eu-kreve-ny-avgift-pa-diesel-i-norge/page.tsx): Explainer published on debate day about what ETS2 is and what Sp's proposal meant.
- [`stortinget-sa-ja-til-ets2/page.tsx`](./stortinget-sa-ja-til-ets2/page.tsx): Follow-up: Stortinget voted down Sp's proposal to stop ETS2. Covers the vote split, party positions, and price impact (2026-02-03).

## Adding a new article

1. Create a folder under `app/nyheter/` with a URL-friendly slug.
2. Add a `page.tsx` with metadata and content using `NewsArticleLayout`.
3. Add an entry to `NEWS_INDEX` in `lib/news-articles.ts`.
4. The sitemap picks it up automatically.

# `app/nyheter/`

Public news section with individual article routes.

## Structure

Each article has its own route folder with a `page.tsx` that contains the full
article content as JSX. This keeps articles SEO-friendly, independently
deployable, and easy to edit without touching shared data files.

## Files

- [`page.tsx`](./page.tsx): News index listing all articles newest-first.
- [`page.md`](./page.md): Intent and editorial guidance for the index route.

## Articles (newest first)

- [`drivstoffavgiftene-kuttes-fra-1-april/page.tsx`](./drivstoffavgiftene-kuttes-fra-1-april/page.tsx): Main story about the fuel tax cut from April 1 (Nyhet, 2026-03-30).
- [`slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart/page.tsx`](./slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart/page.tsx): Practical guide comparing autodiesel, anleggsdiesel, fishing and shipping (Forklart, 2026-03-30).
- [`co2-kutt-som-ikke-er-klare-enda/page.tsx`](./co2-kutt-som-ikke-er-klare-enda/page.tsx): Explainer on why several CO₂ changes are delayed due to EEA state aid rules (Forklart, 2026-03-30).
- [`fra-forslag-til-vedtak-pa-to-dager/page.tsx`](./fra-forslag-til-vedtak-pa-to-dager/page.tsx): Background story on the two-day fast-track process in Stortinget (Bakgrunn, 2026-03-26).
- [`krig-i-midtosten-sender-dieselprisen-over-30-kroner/page.tsx`](./krig-i-midtosten-sender-dieselprisen-over-30-kroner/page.tsx): Breaking news on the Hormuz crisis sending diesel past 30 kr/liter (Nyhet, 2026-03-20).
- [`stortinget-sa-ja-til-ets2/page.tsx`](./stortinget-sa-ja-til-ets2/page.tsx): Stortinget voted down Sp's proposal to stop ETS2, covering vote split and price impact (Nyhet, 2026-02-03).
- [`kan-eu-kreve-ny-avgift-pa-diesel-i-norge/page.tsx`](./kan-eu-kreve-ny-avgift-pa-diesel-i-norge/page.tsx): Explainer on what ETS2 is and what Sp's reservation proposal meant (Forklart, 2026-01-29).
- [`oljearet-2025-prisen-falt-men-dieselen-ble-dyrere/page.tsx`](./oljearet-2025-prisen-falt-men-dieselen-ble-dyrere/page.tsx): Year-in-review: Brent fell 19% but Norwegian diesel prices rose (Bakgrunn, 2026-01-10).
- [`dieselavgiftene-for-2026-er-vedtatt/page.tsx`](./dieselavgiftene-for-2026-er-vedtatt/page.tsx): 2026 fuel taxes: CO₂ up 63 øre, new structure with sector-specific rates (Nyhet, 2025-12-22).
- [`hva-er-opec-og-hva-har-de-med-dieselprisen-a-gjore/page.tsx`](./hva-er-opec-og-hva-har-de-med-dieselprisen-a-gjore/page.tsx): Explainer on OPEC+ and how their 2025 production decisions affect diesel prices (Forklart, 2025-09-15).
- [`kronekursen-og-dieselprisen-en-sammenheng-fa-tenker-pa/page.tsx`](./kronekursen-og-dieselprisen-en-sammenheng-fa-tenker-pa/page.tsx): Explainer on how NOK/USD exchange rate directly affects diesel pump prices (Forklart, 2025-06-15).
- [`slik-settes-dieselprisen-fra-oljefat-til-pumpe/page.tsx`](./slik-settes-dieselprisen-fra-oljefat-til-pumpe/page.tsx): Evergreen explainer on how diesel prices form — crude to refining to taxes to pump (Forklart, 2025-02-15).
- [`dieselavgiftene-for-2025-nok-et-ar-med-okt-co2-avgift/page.tsx`](./dieselavgiftene-for-2025-nok-et-ar-med-okt-co2-avgift/page.tsx): 2025 fuel taxes: CO₂ up 20%, veibruk flat, net +60 øre/liter (Nyhet, 2024-12-13).
- [`dieselavgiftene-for-2024-co2-avgiften-stiger-videre/page.tsx`](./dieselavgiftene-for-2024-co2-avgiften-stiger-videre/page.tsx): 2024 fuel taxes: CO₂ up 25%, net +43 øre/liter (Nyhet, 2023-12-19).

## Adding a new article

1. Create a folder under `app/nyheter/` with a URL-friendly slug.
2. Add a `page.tsx` with metadata and content using `NewsArticleLayout`.
3. Add an entry to `NEWS_INDEX` in `lib/news-articles.ts`.
4. The sitemap picks it up automatically.

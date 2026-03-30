# `lib/`

Shared utilities and pricing models used across the app.

## Files

- [`get-diesel-prices.ts`](./get-diesel-prices.ts): Cached ICE/Norges Bank loader (`"use cache"`, tag `diesel-prices`, `cacheLife("dieselPrices")` profile from [`next.config.mjs`](../next.config.mjs)); warmed by [`/api/revalidate-diesel`](../app/api/revalidate-diesel/route.ts) cron on Vercel. Loads gasoil plus a parallel **ICE Brent** daily series (90 days) for the crude benchmark card; Brent failure only clears that series.
- [`diesel-prices-payload.ts`](./diesel-prices-payload.ts): Shared `DieselPricesPayload` shape and the honest empty payload when live ICE/TradingView data is missing (no fabricated prices).
- [`news-articles.ts`](./news-articles.ts): Typed article content, sorting helpers, and slug lookup for the public `/nyheter` overview and `/nyheter/[slug]` pages.
- [`news-articles.md`](./news-articles.md): Intent and copy principles for the news article data.
- [`pump-price-model.ts`](./pump-price-model.ts): Shared pump price composition logic with date-based tax rates for historical views.
- [`pump-price-model.md`](./pump-price-model.md): Intent, rate sources, and modeling limits for the pump price schedule.
- [`regional-price-model.ts`](./regional-price-model.ts): Shared regional selector data and modeled distribution assumptions for estimate sections.
- [`regional-price-model.md`](./regional-price-model.md): Intent, scope, and modeling limits for the regional estimate layer.
- [`region-route.ts`](./region-route.ts): Builds region URLs (`/` for default/national, `/{regionId}` for others).
- [`region-page-metadata.ts`](./region-page-metadata.ts): Shared `metadata` for each static region route.

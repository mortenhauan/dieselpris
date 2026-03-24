# `lib/`

Shared utilities and pricing models used across the app.

## Files

- [`pump-price-model.ts`](./pump-price-model.ts): Shared pump price composition logic with date-based tax rates for historical views.
- [`pump-price-model.md`](./pump-price-model.md): Intent, rate sources, and modeling limits for the pump price schedule.
- [`regional-price-model.ts`](./regional-price-model.ts): Shared regional selector data and modeled distribution assumptions for estimate sections.
- [`regional-price-model.md`](./regional-price-model.md): Intent, scope, and modeling limits for the regional estimate layer.
- [`region-route.ts`](./region-route.ts): Builds region URLs (`/` for default/national, `/{regionId}` for others).
- [`region-page-metadata.ts`](./region-page-metadata.ts): Shared `metadata` for each static region route.

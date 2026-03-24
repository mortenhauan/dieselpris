# `regional-margins.tsx`

Regional explanation section for distribution and margin.

## Intent

Explain regional diesel price differences in plain Norwegian without pretending the app knows the exact live pump price in every area.

The section should help users understand two things:

- why prices can differ between broad parts of Norway
- why local competition and timing still create large differences inside the same region

## UX role

This section is explanatory, but it also mirrors the selected region from the header.

That means it should stay aligned with the shared regional model in `lib/regional-price-model.ts` so the page does not show one regional assumption in the explainer and another in the estimate cards.

## Copy principles

- Write for drivers and fleet owners, not energy traders.
- Prefer "kan", "ofte", and "påvirker" over absolute claims.
- Keep logistics explanations simple.
- Remind the user that station, chain, campaign, and weekday can matter as much as region.

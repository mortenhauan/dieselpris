# `regional-price-model.ts`

Shared region model for estimated diesel pump prices.

## Intent

Keep one source of truth for the app's regional distribution and margin assumptions so the same region choice can drive:

- the header selector
- the estimated price breakdown
- the historical estimate chart
- the futures-based estimate
- the regional explainer section

## What it models

The file does not try to predict live station prices.

It only models the `distribution + margin` part of the estimate, while:

- `råvarepris` still comes from ICE gasoil and FX
- `veibruksavgift`, `CO2-avgift`, and `MVA` stay national

## Region choices

The first version uses broad practical regions:

- `Oslo og østlandsområdet` (rute: `/ost`)
- `Sørlandet` (`/sor`)
- `Vestlandet` (`/vest`)
- `Midt-Norge` (`/midt`)
- `Nord-Norge` (`/nord`)

There is also a `Norge (snitt)` fallback so the page still has a neutral default before the user chooses a region.

## Modeling limits

- This is a teaching model for drivers and fleet owners.
- It should stay simple and explainable.
- The values should be read as modeled estimate inputs, not observed market truth for each region.
- Local competition can matter more than transport alone, so the copy should avoid overclaiming precision.

## Sources behind the copy direction

- Konkurransetilsynet: local competition and weekly price cycles are major drivers of variation
- Motor / DrivstoffAppen: practical evidence of large local price differences across Norway

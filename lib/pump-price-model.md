# `pump-price-model.ts`

Shared pricing model for estimated diesel pump price.

## Intent

Keep one source of truth for how the app turns a raw diesel price in `NOK/liter` into a pump-price estimate:

- raw price
- distribution / margin estimate
- `veibruksavgift`
- `CO2-avgift`
- `MVA`

The model is used by the current price breakdown, the 90-day history chart, and the futures-based forecast so the same math is applied everywhere. Termingrafen bruker **1. i hver leveringsmåned** (`duty_at_utc_ymd` fra ICE-kontraktene) som avgiftsdato, ikke bare siste spot-dag — slik at mai–aug. i en kontraktsrekke får sommerkutt når det ligger i planen.

Regional selection is layered on top through [`regional-price-model.ts`](./regional-price-model.ts). Public taxes remain national, while the modeled `distribution` part can vary by selected region.

## Historical handling

The tax schedule is date-aware. This matters because the 90-day chart can span a year boundary.

- `2025-01-01`: `veibruksavgift 2.69`, `CO2-avgift 3.79`, `MVA 25%`
- `2026-01-01`: `veibruksavgift 2.28`, `CO2-avgift 4.42`, `MVA 25%` (ordinære 2026-satser)
- `2026-05-01`: midlertidig `veibruksavgift 0`, `CO2-avgift 3.09` (autodiesel vei) — modellert startdato; Stortinget tillater også ikrafttredelse fra 1. april; da flyttes denne raden til `2026-04-01` i koden
- `2026-09-01`: tilbake til ordinære 2026-satser (`2.28` / `4.42`)

Vedtakene som ligger bak kuttperioden er [Stortinget, sak p=107811](https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811) (vedtak 595 og 599 m.fl.).

If the chart later expands further back in time, this schedule should be extended with older official rates instead of reusing the newest year for all points.

## Sources

- Regjeringen, `Avgiftssatser 2026`: includes side-by-side 2025 and 2026 rates for diesel-related særavgifter
- Skatteetaten, `Veibruksavgift på drivstoff`: confirms current `2026` diesel veibruksavgift
- Skatteetaten, `Merverdiavgift`: confirms general `25 %` sats
- Lovdata, `Stortingsvedtak om CO2-avgift på mineralske produkter for 2026`
- Lovdata, `Stortingsvedtak om veibruksavgift på drivstoff for 2025`
- Stortinget, vedtak i sak [p=107811](https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811): midlertidig veibruks 0 og CO₂ 3,09 kr/l for autodiesel (appens modell bruker 1. mai–31. aug. 2026)

## Hero slice

`rawPlusPublicDutiesNokPerLiter` reuses the same veibruks, CO₂, and MVA stacking as the full pump model, but skips the modeled `distribution` layer. Used next to the pure raw NOK/liter figure on the landing hero.

## Non-tax assumption

`distribution` is not an official tax rate. The national default remains in this file, while region-specific estimate inputs live in `regional-price-model.ts`.

Historical correctness in this file covers the public avgifter and `MVA`, not changing retail margins over time.

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
- `2026-04-01`: midlertidig `veibruksavgift 0`, `CO2-avgift 4.42`, `MVA 25%` (innført for veidiesel etter regjeringens oppfølging 30.03.2026)
- `2026-05-01`: midlertidig `veibruksavgift 0`, `CO2-avgift 3.09`, `MVA 25%` (lagt inn i appen etter Stortingets vedtak for autodiesel)
- `2026-09-01`: tilbake til ordinære 2026-satser (`2.28` / `4.42`)

Vedtakene som ligger bak kuttperioden er [Stortinget, sak p=107811](https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811) (vedtak 595 og 599 m.fl.). Regjeringens oppfølging 30.03.2026 sier at veibruksavgiften settes til null fra 1. april til 1. september, mens de øvrige vedtakene om CO2-avgift fortsatt reiser praktiske og statsstøtterettslige spørsmål som må avklares før de eventuelt iverksettes. Appen legger likevel inn autodiesel-satsen fra vedtak 595 fra 1. mai, og merker dette i UI som vedtatt men ikke endelig avklart.

If the chart later expands further back in time, this schedule should be extended with older official rates instead of reusing the newest year for all points.

## Sources

- Regjeringen, `Avgiftssatser 2026`: includes side-by-side 2025 and 2026 rates for diesel-related særavgifter
- Regjeringen, `Oppfølging av Stortingets vedtak om reduksjon i avgifter på drivstoff` (30.03.2026): confirms `veibruksavgift 0` for road diesel from `1. april` to `1. september`, and that road-diesel `CO2` changes are not yet implemented
- Skatteetaten, `Veibruksavgift på drivstoff`: confirms current `2026` diesel veibruksavgift
- Skatteetaten, `Merverdiavgift`: confirms general `25 %` sats
- Lovdata, `Stortingsvedtak om CO2-avgift på mineralske produkter for 2026` (generell mineraloljesats og reduserte satser for fiske etter bruksområde)
- Lovdata, `Stortingsvedtak om veibruksavgift på drivstoff for 2025`
- Stortinget, vedtak i sak [p=107811](https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811): `CO₂ 3,09 kr/l` for autodiesel fra `1. mai`; appen bruker denne satsen i estimater med tydelig forbehold

## Fiske-sammenligninger (tre kategorier)

CO₂-avgift på mineralolje til fiske har tre forskjellige satstabeller, basert på [Stortingsvedtak om CO₂-avgift for 2026](https://lovdata.no/dokument/STV/forskrift/2025-12-18-2763) og [Skatteetaten](https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/saravgifter/om/mineralske-produkter/):

| Kategori               | 2025 | 2026            | 1. apr–1. sep 2026 | Vedtak    | Status             |
| ---------------------- | ---- | --------------- | ------------------ | --------- | ------------------ |
| Fjerne farvann         | 0,93 | 1,11            | **0**              | 591       | Iverksatt          |
| Nære og fjerne farvann | 3,79 | 2,76            | **0**              | 592       | Iverksatt          |
| Kun nære farvann       | 3,79 | 4,42 (generell) | 4,42               | 594 (→ 0) | **Ikke iverksatt** |

«Kun nære» har ingen redusert sats i gjeldende lov og betaler ordinær CO₂. Vedtak 594 ville opprettet en ny post med 0 kr/l, men er ikke iverksatt grunnet statsstøtterettslige spørsmål. `FISKE_KUN_NAERE_RATE_SCHEDULE` oppdateres med 0-sats når forskriftsendring er bekreftet.

Alle tre schedules bruker veibruksavgift 0 og MVA 25 %. `estimateComparisonPriceNokPerLiter` er den generiske prisformelen som brukes for alle sammenligningsrader.

Se [nyhetsartikkelen om ulik påvirkning](/nyheter/slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart) for brukerrettet forklaring.

## Hero slice

`rawPlusPublicDutiesNokPerLiter` reuses the same veibruks, CO₂, and MVA stacking as the full pump model, but skips the modeled `distribution` layer. Used next to the pure raw NOK/liter figure on the landing hero.

## Non-tax assumption

`distribution` is not an official tax rate. The national default remains in this file, while region-specific estimate inputs live in `regional-price-model.ts`.

Historical correctness in this file covers the public avgifter and `MVA`, not changing retail margins over time.

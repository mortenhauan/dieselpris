# `tax-breakdown.tsx`

Estimated pump-price breakdown card shown on the diesel price page.

## Intent

Help users understand what makes up the estimated pump price without requiring tax or commodity-market knowledge.

The card now reflects the selected region for the modeled `distribution` part of the estimate, while public taxes remain national.

The item labels stay short in the main list, while the info buttons provide short plain-language explanations for:

- `Råvarepris`
- `Modellert distribusjon`
- `Veibruksavgift`
- `CO2-avgift`
- `MVA`

The footer may also show a very small comparison line for `anleggsdiesel` when that helps explain why it can be cheaper than `autodiesel`. Keep this as a rough comparison only, not a second full breakdown card, and make it follow the same reference date as the main estimate.

## Copy principles

- Write for drivers, fleet owners, and other non-expert readers.
- Keep each explanation short enough to scan in a tooltip.
- Prefer everyday wording over finance or policy jargon.
- Treat `råvarepris` as the pre-tax product/market price, not just the crude-oil price.
- If showing `anleggsdiesel`, say clearly that it is only a rough comparison based on the same raw price and modeled distribution, but still use the correct rules for the card's current date.

## Sources used for the tooltip content

- Regjeringen: fuel tax overview and purpose of `veibruksavgift`
- SSB: explanations of what affects pump prices beyond crude oil alone

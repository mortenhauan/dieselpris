# `tax-breakdown.tsx`

Estimated pump-price breakdown card shown on the diesel price page.

## Intent

Help users understand what makes up the estimated pump price without requiring tax or commodity-market knowledge.

The card now reflects the selected region for the modeled `distribution` part of the estimate, while public taxes remain national.

The item labels stay short in the main list, while the info buttons provide short plain-language explanations for:

- `Råvarepris`
- `Distribusjon`
- `Veibruksavgift`
- `CO2-avgift`
- `MVA`

## Copy principles

- Write for drivers, fleet owners, and other non-expert readers.
- Keep each explanation short enough to scan in a tooltip.
- Prefer everyday wording over finance or policy jargon.
- Treat `råvarepris` as the pre-tax product/market price, not just the crude-oil price.

## Sources used for the tooltip content

- Regjeringen: fuel tax overview and purpose of `veibruksavgift`
- SSB: explanations of what affects pump prices beyond crude oil alone

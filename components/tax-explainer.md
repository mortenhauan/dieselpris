# `tax-explainer.tsx`

End-user explainer for Norwegian diesel taxes.

## Intent

Help drivers and fleet owners understand the main public taxes on diesel without reading legal or budget documents.

The section should:

- show the rates that are actually used in the app's price estimates
- explain what the taxes are in plain Norwegian
- explain clearly when a rate is included because it follows a political vedtak but can still change later

## Copy principles

- Write for drivers and fleet owners, not for politicians, traders, or developers.
- Prefer short, direct wording over legal or budget language.
- If a tax change is adopted politically and included in the estimates before implementation is fully settled, say that plainly in end-user language and warn that it can still change.
- When there is uncertainty, explain what the app uses in its estimates right now and why.

## 2026 handling

- `veibruksavgift` is shown as `0 kr/l` from `1. april` to `1. september` because that is the implemented road-diesel change.
- `CO₂-avgift 3,09 kr/l` is included from `1. mai` in the estimates because the user wants to follow the vedtak in the product.
- The section must warn clearly that the `CO₂` part still awaits clarification from the government and may change.

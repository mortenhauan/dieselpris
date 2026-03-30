# Lessons

- For responsive layout fixes in this repo, prefer Tailwind/CSS-only solutions before introducing breakpoint hooks or JS-driven viewport logic.
- For layout overflow bugs, collect runtime measurements of `documentElement` width and the actual offending DOM elements before attempting visual fixes.
- Do not show fabricated diesel price or futures data when upstream feeds fail; use an honest empty state and short Norwegian copy instead of static “example” curves.
- For Norwegian pricing copy aimed at drivers and fleet owners, avoid compressed shorthand that skips the subject; say clearly what the number includes, use `estimert` when values are converted or modeled, and link directly to the relevant explainer section when the card references a concept like distribusjon.
- In metadata, OG images, and share previews, avoid wording like `pumpepris`, `oppdatert jevnlig`, or anything that implies local station pricing; prefer simple plain Norwegian such as `Forstå bedre råvarepriser og avgifter på diesel i Norge`.
- When tax policy is politically adopted but not fully finalized, ask whether the product should follow the current government implementation or the Storting vedtak before changing the pricing model; if the product follows the vedtak, include the rate in estimates and add a plain end-user disclaimer that it may still change.
- When adding side-by-side fuel comparisons like `anleggsdiesel`, do not hardcode one seasonal window; reuse the same date-aware rate logic as the main estimate so the comparison matches the page's reference date.

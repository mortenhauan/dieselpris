# `site-seo-copy.ts`

Single source for **short site summaries** reused in `<meta name="description">`, the visible hero intro on diesel region pages (`PriceHero`), and sitewide `WebSite` JSON-LD.

- **National** copy highlights market reference, duties, regional estimates, and audience (drivers and fleet owners), with indicative framing—not a lookup of pump price at the user’s station.
- **Regional** pages append the territory label from [`regional-price-model.ts`](./regional-price-model.ts).

When adjusting wording, align with editorial rules in AGENTS.md and keep region metadata in sync (`region-page-metadata.ts` consumes this module).

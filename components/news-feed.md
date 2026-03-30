# `news-feed.tsx`

Renderer for the `/nyheter` page.

## Intent

- Present a small newsroom for ordinary drivers, not policy specialists.
- Separate `vedtak`, `oppfølging`, and `forklart` so readers can quickly see
  what is decided, what is implemented, and what is still uncertain.
- Keep each article short, plain-language, and clearly sourced.

## Notes

- The component reads typed article data from
  [`lib/news-articles.ts`](../lib/news-articles.ts).
- Every article ends with direct links to the original public sources.

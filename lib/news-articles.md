# `news-articles.ts`

Lightweight index of all news articles for the `/nyheter` listing and sitemap.

## Intent

- Keep the article registry slim: just slug, title, intro, category, date.
- Actual article content lives in each route's own `page.tsx`.
- Sorted newest-first for the news feed.

## Adding a new article

Add an entry to the `entries` array and create a matching route folder under
`app/nyheter/`. The sitemap and index page pick it up automatically.

---
name: news-article-writer
description: "Write and publish news articles for the dieselpris.no /nyheter section. Uses a two-agent workflow: a redaktør (editor) plans articles and a journalist subagent writes each one. Use when adding news articles, covering Stortinget decisions, explaining tax changes, writing about fuel price developments, or when the user mentions nyheter, artikler, news, or wants to explain a policy change to ordinary diesel users. Also use when researching stortinget.no, regjeringen.no, or lovdata.no for article-worthy developments."
---

# News Article Writer for Dieselpris.no

Two-agent editorial workflow: **redaktør** plans, **journalist** writes.

## Audience

Truck drivers, fleet owners, fishers, construction workers, and regular car owners in Norway. They do not read political documents. They want: what happened, what changes for me, when, and how much.

## Editorial Principles

1. **Truth and accuracy over agenda.** No political spin. State facts. When something is uncertain, say so clearly.
2. **Write journalism, not meta-commentary.** Tell the story. Never write "how to read this article" — the article IS the explanation.
3. **The reader will not click your sources.** The article must stand alone. Sources are for verification, not comprehension.
4. **Write as if you were there.** For backdated articles, write from the perspective of that date. Do not reference future events.
5. **Concrete over abstract.** "170 kroner spart per fylling" beats "merkbar besparelse". Always calculate practical examples.
6. **Name the fuel types separately.** Autodiesel, anleggsdiesel, and sjøfart are different. Never say just "diesel" when the rules differ.
7. **Norwegian bokmål.** Plain, direct language. Short paragraphs. No political or bureaucratic jargon.

## Redaktør Workflow

When the user wants new articles, act as redaktør first:

### 1. Evaluate sources

For each source URL, determine:

- What actually happened (specific decision, date, numbers)
- Who it affects (which fuel types, which users)
- Is it newsworthy for our audience? (Skip procedural/technical saker that don't affect pump prices)

### 2. Plan articles

Decide which articles to write. Consider:

- **Nyhet**: Something concrete changed (tax rate, law, implementation)
- **Forklart**: A complex topic needs plain-language explanation
- **Bakgrunn**: A story behind the story (political process, historical context)
- Does this fill a gap in the existing timeline? Read `lib/news-articles.ts` for current coverage.
- Would a truck driver or fisher care about this?

### 3. Dispatch journalist subagents

Launch one subagent per article with a detailed brief. See [references/journalist-brief.md](references/journalist-brief.md) for the complete prompt template.

### 4. Register and verify

After journalists deliver:

- Add entries to `lib/news-articles.ts` (if not done by journalist)
- Run `pnpm dlx ultracite check` and `pnpm typecheck`
- Verify article reads like journalism, not a government summary

## Article Technical Spec

Each article is a static Next.js route at `app/nyheter/{slug}/page.tsx`.

### File structure

```tsx
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "...";
const DESCRIPTION = "..."; // SEO description, max ~155 chars
const SLUG = "...";
const CANONICAL = `${SITE_URL}/nyheter/${SLUG}`;

export const metadata: Metadata = {
  alternates: { canonical: CANONICAL },
  description: DESCRIPTION,
  openGraph: {
    description: DESCRIPTION,
    locale: "nb_NO",
    siteName: "dieselpris.no",
    title: TITLE,
    type: "article",
    url: CANONICAL,
  },
  title: TITLE,
  twitter: {
    card: "summary_large_image",
    description: DESCRIPTION,
    title: TITLE,
  },
};

const SOURCES: NewsSource[] = [
  { href: "https://...", label: "Regjeringen: ..." },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          category="Nyhet"
          publishedAtIso="2026-03-30T13:00:00+02:00"
          sources={SOURCES}
          title={TITLE}
        >
          {/* Article body as JSX children */}
        </NewsArticleLayout>
      </main>
    </div>
  );
};
export default Page;
```

### Categories

| Category   | Use for                    |
| ---------- | -------------------------- |
| `Nyhet`    | Something concrete changed |
| `Forklart` | Plain-language explainer   |
| `Bakgrunn` | Story behind the story     |

### Content elements

- **Lead paragraph**: `<p className="text-lg font-medium">` — most important fact first
- **Headings**: `<h2 className="text-xl font-bold">`
- **Body**: Plain `<p>` tags
- **Lists**: `<ul className="list-disc space-y-1.5 pl-5">`
- **Fact box**: `<div className="rounded-2xl border border-border bg-secondary/40 p-5">`
- **Confirmed status**: `<div className="rounded-2xl border border-accent/25 bg-accent/8 p-5">`
- **Waiting status**: `<div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">`
- **Tables**: `<div className="overflow-x-auto"><table className="w-full text-sm">` with `<th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">`
- **Blockquotes**: `<blockquote className="border-l-4 border-accent/50 pl-5 italic text-muted-foreground">`

### Constraints

- Max 300 lines per file
- Max 155 characters for SEO description
- Slug: lowercase ASCII, hyphens only
- Function style: `const Page = function Page() {`
- Always include at least one source from the original public record

### Index registration

Add entry to `lib/news-articles.ts`:

```ts
{
  category: "Nyhet",
  intro: "One-sentence summary for the listing card.",
  publishedAtIso: "2026-03-30T13:00:00+02:00",
  slug: "the-slug",
  title: "The title",
},
```

The array is auto-sorted newest-first. Sitemap picks up slugs automatically.

## Article Quality Checklist

Before marking an article done:

- [ ] Opens with what matters to the reader, not background
- [ ] Includes at least one concrete calculation (kr saved per filling, yearly cost)
- [ ] Names specific fuel types when rules differ
- [ ] No meta-commentary ("this article explains..." or "we recommend reading...")
- [ ] For backdated articles: written from that date's perspective, no future knowledge
- [ ] Dates are correct (check calendar — does the weekday match?)
- [ ] Numbers match the cited sources exactly
- [ ] Sources are linked in the footer
- [ ] SEO metadata is set with canonical URL
- [ ] Entry added to news index
- [ ] Lint and typecheck pass

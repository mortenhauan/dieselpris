---
name: social-media-content
description: Create and plan social media posts for dieselpris.no on X and Facebook. Use when the user wants to draft posts, create a publishing plan, share articles on social media, or discuss social media strategy for the diesel price audience.
---

# Social Media Content for dieselpris.no

## Brand Context

- **Site:** dieselpris.no – helps Norwegian drivers and fleet owners understand diesel prices
- **Audience:** Sjåfører og flåteeiere (drivers and fleet owners)
- **Tone:** Faktabasert, forklarende, kort bokmål. Never salesy or clickbait.
- **Independence:** Not affiliated with fuel chains. Show indicative data, not price guarantees.
- **Accounts:** X @DieselprisNo, Facebook dieselpris.no (see `social-media/README.md`)

## Content Pillars

| Pillar                 | Description                                                                      | Example                                               |
| ---------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Prispuls**           | Daily short post about price movement. Read from dieselpris.no, never fabricate. | Gasoil opp 2 %, krone svakere, veiledende pris stiger |
| **Nyheter**            | Share news articles from /nyheter                                                | Tax changes, OPEC decisions, geopolitics              |
| **Forklart**           | Educational content about price mechanics                                        | How the price is built, FX effect, what OPEC does     |
| **Markedsoppdatering** | Deeper observations on price movements                                           | Oil price drop, currency shift, new duty rate         |
| **Engasjement**        | Questions, polls, seasonal hooks                                                 | Sommerpriser, "visste du at"                          |

## Platform Guidelines

### X (@DieselprisNo)

- **Length:** 1–3 sentences + link. Max 280 chars preferred, thread for longer takes.
- **Frequency:** 7–10 per week (daily prispuls on weekdays + articles/forklart)
- **Hashtags:** 1–3 per post. Use: #diesel #dieselpris #drivstoff #avgifter #transport
- **Timing:** Prispuls 08–09, articles/other 15–17 on weekdays
- **Voice:** Direct, factual, no filler. Lead with the most interesting fact.
- **Prispuls template (daily, 08–09):**

```
Diesel i dag: gasoil [opp/ned X %], [NOK/USD retning]. Veiledende literpris [retning].

Se hele bildet 👉 dieselpris.no
```

- **Article template:**

```
[Key fact or hook – one sentence]

[Context or implication – one sentence]

👉 dieselpris.no/nyheter/[slug]
```

### Facebook (dieselpris.no)

- **Length:** 3–6 sentences. Bold the first line as a headline.
- **Frequency:** 3–4 per week + prispuls 2–3×/week (Mon, Wed/Fri typically)
- **Timing:** 08–10 or 16–18 on weekdays
- **Voice:** Slightly more explanatory than X. Still concise.
- **Format template:**

```
**[Headline]**

[2–3 sentences expanding on the topic. Plain language, explain why it matters to the reader.]

👉 dieselpris.no/nyheter/[slug]
```

## Workflow: Creating Posts

1. **Check current news** – Read `lib/news-articles.ts` for the article index with slugs, categories, and intros
2. **Check the site** – Look at dieselpris.no for current price context if writing market updates
3. **Draft posts** – Write for both X and Facebook. Adapt length and tone per platform.
4. **Store the plan** – Save to `social-media/plan-YYYY-uke-NN.md` following the existing format
5. **Link from README** – Update `social-media/README.md` with a link to the new plan

## Workflow: Logging Published Posts

When the user confirms a post has been published or scheduled:

1. Add entry to `social-media/logg/x.md` or `social-media/logg/facebook.md`
2. Newest entries go at the top (after the header)
3. Each entry includes: date+time, type (Prispuls/Nyheter/Forklart/Lansering/etc), the post text, and post URL if available
4. Format:

```markdown
## YYYY-MM-DD ~HH:MM

**Type:** [type]
**Lenke:** [url if available]

> [post content]
```

## Workflow: Creating a Publishing Plan

1. Decide time period (usually 1–2 weeks)
2. Review which articles haven't been shared yet
3. Check the calendar for hooks (holidays, seasonal, known policy dates)
4. Balance pillars: mix nyheter, forklart, markedsoppdatering, engasjement
5. Write day-by-day plan with ready-to-post copy for both platforms
6. Include a summary table at the end
7. Save to `social-media/plan-YYYY-uke-NN.md`

## Rules

- Never fabricate data or imply specific pump prices
- Always link to dieselpris.no (articles or front page)
- Use Norwegian bokmål only
- Keep "veiledende" and "indikativ" framing – we don't promise exact prices
- React to breaking news (oil price moves, policy decisions) with timely posts
- Respond to comments and questions to build trust on new pages
- Use site screenshots (price chart, breakdown) as visual content when possible

## Existing Plans

Check `social-media/README.md` for links to all published plans.

## Reference Files

- Article index: `lib/news-articles.ts`
- Site URL: `lib/site-url.ts`

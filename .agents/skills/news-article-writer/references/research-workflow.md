# Research Workflow

How to find article-worthy developments for the news section.

> **Automated research:** The [news-researcher skill](../../news-researcher/SKILL.md)
> handles discovery across Twitter/X, Norwegian newspapers, and official sources,
> and returns a structured brief you can feed directly into the redaktør workflow.
> Use it before starting a writing session.

## Primary sources

| Source                      | URL pattern                                 | What to look for                                           |
| --------------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| Stortinget saker            | stortinget.no/Saker-og-publikasjoner/Saker/ | Representantforslag, vedtak about avgifter, drivstoff, CO2 |
| Stortinget vedtak           | stortinget.no/Vedtak/Vedtak/Sak/            | Concrete rate changes, budget decisions                    |
| Regjeringen pressemeldinger | regjeringen.no/no/aktuelt/                  | Implementation of vedtak, avgiftssatser announcements      |
| Regjeringen avgiftssatser   | regjeringen.no/avgiftssatser-{year}/        | Annual tax rate tables                                     |
| Lovdata                     | lovdata.no                                  | Formal rate schedules                                      |

## What to search for

Useful search terms for finding relevant Stortinget activity:

- `veibruksavgift`, `drivstoffavgift`, `dieselavgift`
- `CO2-avgift mineralske produkter`
- `biodrivstoff omsetningskrav`
- `ETS2`, `klimakvotesystem`
- `anleggsdiesel`, `farget diesel`, `marin diesel`
- `statsbudsjettet {year} avgifter`

## Editorial filter

Not everything on Stortinget is newsworthy. Apply these filters:

### Write about it if:

- A concrete tax rate changed or will change
- A concrete adopted or announced measure affects pump prices or operating costs; distinguish announced, adopted, and effective status
- The decision directly impacts one of our user groups
- It explains WHY something happened that readers noticed

### Skip it if:

- It's procedural (committee assignments, hearing dates)
- It's a proposal that was rejected without broader implications
- The same topic is already covered by an existing article
- It requires deep policy expertise to understand and doesn't affect costs

## Cross-referencing existing coverage

Before writing, read `lib/news-articles.ts` to see the existing timeline.
For discovery, apply the current-event cutoff and editorial filter in the
news-researcher skill. Avoid duplicate coverage and historical gap-filling;
revise older coverage only when the user requests it or a current development
requires a correction. This reference does not override that canonical filter.

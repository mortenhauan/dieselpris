# Research Workflow

How to find article-worthy developments for the news section.

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
- A proposal affects pump prices or operating costs
- The decision directly impacts one of our user groups
- It explains WHY something happened that readers noticed

### Skip it if:

- It's procedural (committee assignments, hearing dates)
- It's a proposal that was rejected without broader implications
- The same topic is already covered by an existing article
- It requires deep policy expertise to understand and doesn't affect costs

## Cross-referencing existing coverage

Before writing, read `lib/news-articles.ts` to see the existing timeline.
Ask: does this fill a gap, or would it duplicate something we already have?

The goal is a coherent chronological timeline the reader can browse to
understand how diesel taxes developed over time.

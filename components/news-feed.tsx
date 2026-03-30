import { ArrowUpRight, Newspaper } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NEWS_ARTICLES } from "@/lib/news-articles";

const topFacts = [
  "Veibruksavgiften på drivstoff skal ned til 0 kroner i perioden.",
  "Regjeringen sier at diesel kan bli 2,85 kroner billigere per liter inkludert mva hvis kuttet slår fullt ut.",
  "Ikke alle CO2-endringene er klare ennå, så det er viktig å lese kildene riktig.",
];

export const NewsFeed = function NewsFeed() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex rounded-full border border-border bg-secondary/70 px-3 py-1 text-sm text-muted-foreground">
            Nyheter og forklaringer
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Nyheter om dieselpris og avgifter
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Her samler vi korte saker om det som faktisk kan flytte prisen på
            pumpa. Vi skriver enkelt, forklarer hva vedtakene betyr i praksis,
            og lenker alltid til originalkildene.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background">
              <Newspaper className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Kort fortalt akkurat nå
              </h2>
              <p className="text-sm text-muted-foreground">
                Dette er de viktigste punktene å få med seg før du åpner
                detaljene.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {topFacts.map((fact) => (
              <div
                key={fact}
                className="rounded-2xl border border-border bg-secondary/40 p-4 text-sm leading-relaxed text-foreground"
              >
                {fact}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6">
          {NEWS_ARTICLES.map((article) => (
            <article id={article.id} key={article.id} className="scroll-mt-24">
              <Card className="gap-0 overflow-hidden rounded-3xl border-border shadow-none">
                <CardHeader className="gap-4 border-b border-border px-6 py-6 md:px-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {article.publishedAt}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <CardTitle className="text-2xl leading-tight md:text-3xl">
                      {article.title}
                    </CardTitle>
                    <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                      {article.intro}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="grid gap-8 px-6 py-6 md:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] md:px-8">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Oppsummert
                    </h3>
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground">
                      {article.summary}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-secondary/40 p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {article.takeawayTitle}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground">
                      {article.takeaways.map((takeaway) => (
                        <li key={takeaway} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col items-start gap-3 border-t border-border px-6 py-5 md:flex-row md:flex-wrap md:items-center md:px-8">
                  <span className="text-sm font-medium text-muted-foreground">
                    Kilder:
                  </span>
                  {article.sources.map((source) => (
                    <a
                      key={source.href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 transition hover:text-accent hover:no-underline"
                      href={source.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {source.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ))}
                </CardFooter>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

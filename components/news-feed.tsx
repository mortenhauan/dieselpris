import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNewsDate, NEWS_INDEX } from "@/lib/news-articles";

export const NewsFeed = function NewsFeed() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Nyheter om dieselpris og avgifter
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Korte saker om vedtak og endringer som kan påvirke prisen du betaler
            for diesel. Skrevet for folk som fyller tanken, ikke for politikere.
          </p>
        </div>

        <div className="mt-12 grid gap-6">
          {NEWS_INDEX.map((entry) => (
            <Link
              key={entry.slug}
              className="group block"
              href={`/nyheter/${entry.slug}`}
            >
              <Card className="gap-0 overflow-hidden rounded-3xl border-border shadow-none transition-colors group-hover:border-accent/40">
                <CardHeader className="gap-3 px-6 py-6 md:px-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary">{entry.category}</Badge>
                    <time
                      className="text-sm text-muted-foreground"
                      dateTime={entry.publishedAtIso}
                    >
                      {formatNewsDate(entry.publishedAtIso)}
                    </time>
                  </div>
                  <CardTitle className="text-2xl leading-tight md:text-3xl">
                    {entry.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-6 md:px-8">
                  <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                    {entry.intro}
                  </p>
                </CardContent>

                <CardFooter className="px-6 py-5 md:px-8">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                    Les hele saken
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

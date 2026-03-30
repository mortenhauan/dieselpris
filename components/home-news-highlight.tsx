import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatNewsDate, getRecentNewsEntries } from "@/lib/news-articles";

const TEASER_COUNT = 3;

export const HomeNewsHighlight = function HomeNewsHighlight() {
  const items = getRecentNewsEntries(TEASER_COUNT);
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="home-news-heading"
      className="border-t border-border bg-secondary/30 py-10 md:py-12"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2
            className="text-xl font-semibold tracking-tight text-foreground md:text-2xl"
            id="home-news-heading"
          >
            Siste fra nyhetene
          </h2>
          <Link
            className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground"
            href="/nyheter"
          >
            Alle nyheter
          </Link>
        </div>

        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {items.map((entry) => (
            <li key={entry.slug}>
              <Link
                className="group flex flex-col gap-2 px-4 py-4 transition-colors hover:bg-secondary/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:px-5"
                href={`/nyheter/${entry.slug}`}
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{entry.category}</Badge>
                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={entry.publishedAtIso}
                    >
                      {formatNewsDate(entry.publishedAtIso)}
                    </time>
                  </div>
                  <p className="font-medium leading-snug text-foreground group-hover:text-accent">
                    {entry.title}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  Les mer
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

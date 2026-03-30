import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { NewsSource } from "@/lib/news-articles";
import { formatNewsDate } from "@/lib/news-articles";

interface NewsArticleLayoutProps {
  category: string;
  children: React.ReactNode;
  publishedAtIso: string;
  sources: NewsSource[];
  title: string;
}

export const NewsArticleLayout = function NewsArticleLayout({
  category,
  children,
  publishedAtIso,
  sources,
  title,
}: NewsArticleLayoutProps) {
  return (
    <article className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          href="/nyheter"
        >
          <ArrowLeft className="h-4 w-4" />
          Alle nyheter
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">{category}</Badge>
            <time
              className="text-sm text-muted-foreground"
              dateTime={publishedAtIso}
            >
              {formatNewsDate(publishedAtIso)}
            </time>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h1>
        </header>

        <div className="prose-diesel mt-10 space-y-8 text-base leading-relaxed text-foreground">
          {children}
        </div>

        <footer className="mt-12 border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Kilder
          </h2>
          <ul className="mt-4 space-y-3">
            {sources.map((source) => (
              <li key={source.href}>
                <a
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 transition hover:text-accent hover:no-underline"
                  href={source.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {source.label}
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </article>
  );
};

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import type { NewsSource } from "@/lib/news-articles";
import { formatNewsDate, NEWS_INDEX } from "@/lib/news-articles";
import { articleJsonLd } from "@/lib/site-structured-data";

interface NewsArticleLayoutProps {
  canonicalUrl: string;
  category: string;
  children: React.ReactNode;
  description?: string;
  publishedAtIso: string;
  sources: NewsSource[];
  title: string;
}

export const NewsArticleLayout = ({
  canonicalUrl,
  category,
  children,
  description,
  publishedAtIso,
  sources,
  title,
}: NewsArticleLayoutProps) => {
  const slug = canonicalUrl.split("/").at(-1);
  const indexEntry = NEWS_INDEX.find((entry) => entry.slug === slug);
  return (
    <article className="bg-background py-12 md:py-20">
      <JsonLd
        data={articleJsonLd({
          canonicalUrl,
          datePublished: publishedAtIso,
          dateModified: indexEntry?.modifiedAtIso,
          description,
          headline: title,
        })}
      />
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
          {indexEntry?.modifiedAtIso ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Oppdatert{" "}
              <time dateTime={indexEntry.modifiedAtIso}>
                {formatNewsDate(indexEntry.modifiedAtIso)}
              </time>
              . {indexEntry.updateNote}
            </p>
          ) : null}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h1>
        </header>

        <aside
          className="mt-8 rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground"
          aria-label="Om tidspunktet for artikkelen"
        >
          Artikkelen beskriver situasjonen på publiseringsdatoen. Senere
          oppdateringer er merket med dato. Priser, avgifter og vedtak kan ha
          endret seg.{" "}
          <Link
            href="/#avgifter"
            className="text-foreground underline underline-offset-4"
          >
            Se avgiftssatsene i prisoversikten
          </Link>
          .
        </aside>

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

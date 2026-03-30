import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { NewsFeed } from "@/components/news-feed";
import { SITE_URL } from "@/lib/site-url";

const canonical = `${SITE_URL}/nyheter`;
const description =
  "Enkel nyhetsoversikt om dieselpris, avgifter og offentlige vedtak som kan påvirke prisen på pumpa.";
const title = "Nyheter om dieselpris | Dieselpris.no";

export const metadata: Metadata = {
  alternates: { canonical },
  description,
  openGraph: {
    description,
    siteName: "Dieselpris.no",
    title,
    url: canonical,
  },
  title,
  twitter: {
    card: "summary_large_image",
    description,
    title,
  },
};

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/95">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            href="/"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake til dieselprisene
          </Link>
        </div>
      </header>

      <main>
        <NewsFeed />
      </main>
    </div>
  );
};

export default Page;

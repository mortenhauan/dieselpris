import type { Metadata } from "next";

import { Header } from "@/components/header";
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
      <Header activeNav="news" variant="content" />
      <main>
        <NewsFeed />
      </main>
    </div>
  );
};

export default Page;

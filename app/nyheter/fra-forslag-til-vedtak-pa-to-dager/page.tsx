import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Fra forslag til vedtak på to dager";
const DESCRIPTION =
  "Forslaget om null veibruksavgift ble datert 25. mars 2026 og vedtatt dagen etter. Her er vedtakene og den senere oppfølgingen.";
const SLUG = "fra-forslag-til-vedtak-pa-to-dager";
const CANONICAL = `${SITE_URL}/nyheter/${SLUG}`;

export const metadata: Metadata = {
  alternates: { canonical: CANONICAL },
  description: DESCRIPTION,
  openGraph: {
    description: DESCRIPTION,
    locale: "nb_NO",
    siteName: "dieselpris.no",
    title: TITLE,
    type: "article",
    url: CANONICAL,
  },
  title: TITLE,
  twitter: {
    card: "summary_large_image",
    description: DESCRIPTION,
    title: TITLE,
  },
};

const SOURCES: NewsSource[] = [
  {
    href: "https://www.stortinget.no/no/saker-og-publikasjoner/publikasjoner/representantforslag/2025-2026/dok8-202526-222s/?m=0",
    label: "Stortinget: Dokument 8:222 S, datert 25. mars 2026",
  },
  {
    href: "https://stortinget.no/no/saker-og-publikasjoner/publikasjoner/referater/stortinget/2025-2026/refs-202526-03-26/?m=10",
    label: "Stortinget: voteringer 26. mars 2026, sak 8",
  },
  {
    href: "https://www.regjeringen.no/no/aktuelt/oppfolging-av-stortingets-vedtak-om-reduksjon-i-avgifter-pa-drivstoff/id3155277/",
    label: "Finansdepartementet: gjennomføring og inntektsanslag 30. mars 2026",
  },
];

const Page = () => (
  <div className="min-h-screen bg-background">
    <Header activeNav="news" variant="content" />
    <main>
      <NewsArticleLayout
        canonicalUrl={CANONICAL}
        category="Bakgrunn"
        publishedAtIso="2026-03-26"
        description={DESCRIPTION}
        sources={SOURCES}
        title={TITLE}
      >
        <p className="text-lg font-medium">
          Onsdag 25. mars ble Høyres forslag om å fjerne veibruksavgiften
          midlertidig datert. Torsdag 26. mars vedtok Stortinget nullsatser med
          52 mot 49 stemmer. Det gikk fra forslag til vedtak på to påfølgende
          kalenderdager.
        </p>
        <h2 className="text-xl font-bold">Forslaget: et midlertidig kutt</h2>
        <p>
          Nikolai Astrup og Trond Helleland sto bak Dokument 8:222 S. De foreslo
          å suspendere veibruksavgiften fra 1. april til 1. september 2026 for å
          dempe belastningen fra høye drivstoffpriser etter krigen i Midtøsten.
        </p>
        <p>
          Forslaget omfattet bensin, autodiesel, naturgass, LPG, bioetanol og
          biodiesel. Det var ikke et forslag om å fjerne MVA på drivstoff.
        </p>
        <h2 className="text-xl font-bold">Vedtaket torsdag 26. mars</h2>
        <p>
          Under behandlingen ble det opprinnelige forslaget erstattet av forslag
          nummer 23 fra Høyre. Fremskrittspartiet, Senterpartiet og Kristelig
          Folkeparti støttet forslaget.
        </p>
        <p>
          Vedtaket satte satsene i veibruksavgiften til null fra 1. april, eller
          dersom strengt nødvendig fra den dato regjeringen bestemte, senest 1.
          mai. Sluttdatoen var 1. september 2026.
        </p>
        <p>
          Stortinget vedtok også Senterpartiets forslag nummer 15–22 med 52 mot
          49 stemmer. Disse gjaldt CO₂-avgiften for flere bruksområder og en
          reduksjon i budsjetterte CO₂-avgiftsinntekter. De konkrete satsene og
          startdatoene måtte følges opp i regelverket.
        </p>
        <h2 className="text-xl font-bold">Ikke alle forslag fikk flertall</h2>
        <p>
          Fremskrittspartiets forslag om null veibruksavgift frem til 31.
          desember ble forkastet med 72 mot 29 stemmer. Arbeiderpartiets forslag
          om å be regjeringen komme tilbake med tiltak i revidert
          nasjonalbudsjett ble vedtatt med 93 mot 7 stemmer.
        </p>
        <h2 className="text-xl font-bold">Senere oppfølging: 30. mars</h2>
        <p className="text-sm text-muted-foreground">
          Denne delen er lagt til ved gjennomgangen 15. november 2026 og
          beskriver det som skjedde etter den opprinnelige publiseringen.
        </p>
        <p>
          Mandag 30. mars bekreftet Finansdepartementet null veibruksavgift fra
          1. april til og med 31. august. For autodiesel beregnet departementet
          en mulig prisvirkning på 2,85 kroner per liter inkludert MVA ved full
          overføring til kunden. Det tilsvarer 1140 kroner for 400 liter. Andre
          prisendringer kan påvirke sluttprisen ved pumpa.
        </p>
        <p>
          Departementet anslo inntektstapet fra veibruksavgiftskuttet alene til
          om lag 3,3 milliarder kroner. CO₂-avgiften ble samtidig satt til null
          for fiske i fjerne farvann og i nære og fjerne farvann. Øvrige
          CO₂-endringer ventet på praktiske avklaringer og vurdering av
          statsstøttereglene per 30. mars.
        </p>

        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Les også
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="font-medium underline underline-offset-4"
                href="/nyheter/drivstoffavgiftene-kuttes-fra-1-april"
              >
                Drivstoffavgiftene kuttes fra 1. april – dette er det som skjer
              </Link>
            </li>
            <li>
              <Link
                className="font-medium underline underline-offset-4"
                href="/nyheter/krig-i-midtosten-sender-dieselprisen-over-30-kroner"
              >
                Krig i Midtøsten sender dieselprisen over 30 kroner
              </Link>
            </li>
          </ul>
        </div>
      </NewsArticleLayout>
    </main>
  </div>
);

export default Page;

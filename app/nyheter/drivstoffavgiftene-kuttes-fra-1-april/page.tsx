import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Drivstoffavgiftene kuttes fra 1. april – dette er det som skjer";
const DESCRIPTION =
  "Veibruksavgiften settes til null fra 1. april til 31. august 2026. Mulig prisvirkning for autodiesel er 2,85 kr/l inkludert MVA.";
const SLUG = "drivstoffavgiftene-kuttes-fra-1-april";
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
    href: "https://www.regjeringen.no/no/aktuelt/oppfolging-av-stortingets-vedtak-om-reduksjon-i-avgifter-pa-drivstoff/id3155277/",
    label: "Regjeringen: oppfølging av drivstoffvedtaket",
  },
  {
    href: "https://stortinget.no/no/saker-og-publikasjoner/publikasjoner/referater/stortinget/2025-2026/refs-202526-03-26/?m=10",
    label: "Stortinget: voteringer 26. mars 2026, sak 8",
  },
  {
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/avgiftssatser-2026/id3121982/",
    label: "Finansdepartementet: avgiftssatser 2026 og MVA",
  },
];

const Page = () => (
  <div className="min-h-screen bg-background">
    <Header activeNav="news" variant="content" />
    <main>
      <NewsArticleLayout
        canonicalUrl={CANONICAL}
        category="Nyhet"
        publishedAtIso="2026-03-30T13:00:00+02:00"
        description={DESCRIPTION}
        sources={SOURCES}
        title={TITLE}
      >
        <p className="text-lg font-medium">
          Veibruksavgiften settes til null fra onsdag 1. april til og med 31.
          august 2026. Finansdepartementet beregner en mulig prisvirkning på
          2,85 kroner per liter autodiesel inkludert MVA, dersom hele
          avgiftskuttet kommer kunden til gode.
        </p>
        <p>
          For 60 liter tilsvarer det 171 kroner. For en lastebil som fyller 400
          liter, er beløpet 1140 kroner inkludert MVA. Regnestykkene isolerer
          avgiftskuttet: endringer i råvarepris og andre kostnader kan påvirke
          det du faktisk betaler ved pumpa.
        </p>
        <h2 className="text-xl font-bold">Dette gjelder fra 1. april</h2>
        <p>
          Regjeringen bekreftet gjennomføringen 30. mars. Veibruksavgiften på
          mineralolje og biodiesel til veibruk går fra 2,28 til 0 kroner per
          liter. MVA på 25 prosent gir den beregnede prisvirkningen på 2,85
          kroner. Merket anleggsdiesel har ikke veibruksavgift og får derfor
          ingen lettelse fra dette kuttet.
        </p>
        <p>
          Alle satsene i veibruksavgiften settes til null. For bensin avhenger
          utslaget av blandingen: departementets eksempel med 85 prosent fossil
          bensin og 15 prosent bioetanol gir 4,41 kroner per liter inkludert MVA
          ved full overføring til kunden.
        </p>
        <h2 className="text-xl font-bold">Fiske får egne endringer</h2>
        <p>
          CO₂-avgiften settes samtidig til null for fiske og fangst i fjerne
          farvann og i nære og fjerne farvann. Dette gjelder ikke kategorien
          fiske bare i nære farvann fra 1. april.
        </p>
        <h2 className="text-xl font-bold">
          Andre CO₂-kutt venter på avklaring
        </h2>
        <p>
          Stortinget vedtok også lavere CO₂-satser for blant annet autodiesel,
          anleggsdiesel og sjøfart. Per 30. mars sier regjeringen at praktiske
          spørsmål og statsstøttereglene må avklares før disse endringene
          gjennomføres. Vedtak og ikrafttredelse er to forskjellige ting.
        </p>
        <h2 className="text-xl font-bold">Hva koster veibruksavgiftskuttet?</h2>
        <p>
          Finansdepartementet anslår at den midlertidige reduksjonen i
          veibruksavgiften gir staten om lag 3,3 milliarder kroner mindre i
          avgiftsinntekter. Dette beløpet gjelder veibruksavgiften, ikke summen
          av alle CO₂- og veibruksavgiftsendringene.
        </p>
        <h2 className="text-xl font-bold">
          Avgiftene kommer tilbake 1. september
        </h2>
        <p>
          De gjennomførte nullsatsene er midlertidige. Fra 1. september viser
          departementets tabell igjen 2,28 kroner per liter i veibruksavgift for
          mineralolje og biodiesel til veibruk.
        </p>

        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Les også
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="font-medium underline underline-offset-4"
                href="/nyheter/slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart"
              >
                Slik påvirkes prisen for autodiesel, anleggsdiesel og sjøfart
              </Link>
            </li>
            <li>
              <Link
                className="font-medium underline underline-offset-4"
                href="/nyheter/co2-kutt-som-ikke-er-klare-enda"
              >
                Flere CO₂-kutt er vedtatt, men ennå ikke satt i verk
              </Link>
            </li>
            <li>
              <Link
                className="font-medium underline underline-offset-4"
                href="/nyheter/fra-forslag-til-vedtak-pa-to-dager"
              >
                Fra forslag til vedtak på to dager
              </Link>
            </li>
          </ul>
        </div>
      </NewsArticleLayout>
    </main>
  </div>
);

export default Page;

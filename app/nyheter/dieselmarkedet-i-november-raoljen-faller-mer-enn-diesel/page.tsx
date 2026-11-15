import type { Metadata } from "next";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Råoljen har falt kraftig – dieselmarkedet er fortsatt stramt";
const DESCRIPTION =
  "Europas dieselpris har falt mindre enn råoljen siden oktober. IEA peker på knapp tilgang på ferdig drivstoff. Slik ser markedet ut nå.";
const SLUG = "dieselmarkedet-i-november-raoljen-faller-mer-enn-diesel";
const PUBLISHED_AT = "2026-11-15T19:29:45Z";
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
    publishedTime: PUBLISHED_AT,
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
    href: "https://www.iea.org/reports/oil-market-report-november-2026",
    label:
      "IEA: Oil Market Report, 13. november 2026 – åpne hovedpunkter og markedsvurdering",
  },
  {
    href: "https://www.tradingview.com/symbols/ICEEUR-ULS1!/",
    label:
      "TradingView: ICEEUR:ULS1!, daglige sluttverdier 6.–13. november 2026",
  },
  {
    href: "https://www.ice.com/products/34361119/Low-Sulphur-Gasoil-Futures",
    label: "ICE: kontraktbeskrivelse for Low Sulphur Gasoil Futures",
  },
  {
    href: "https://www.norges-bank.no/tema/Statistikk/Valutakurser/",
    label: "Norges Bank: valutakurser og metode",
  },
  {
    href: "https://data.norges-bank.no/api/data/EXR/B.USD.NOK.SP?format=sdmx-json&lastNObservations=10",
    label: "USD/NOK-observasjoner fra API",
  },
];

const Page = () => (
  <div className="min-h-screen bg-background">
    <Header activeNav="news" variant="content" />
    <main>
      <NewsArticleLayout
        canonicalUrl={CANONICAL}
        category="Forklart"
        publishedAtIso={PUBLISHED_AT}
        description={DESCRIPTION}
        sources={SOURCES}
        title={TITLE}
      >
        <p className="text-lg font-medium">
          Europeisk diesel har blitt billigere siden starten av oktober, men
          langt mindre enn råoljen. I rapporten 13. november peker Det
          internasjonale energibyrået (IEA) fortsatt på knapp tilgang på diesel.
        </p>
        <p>
          IEA oppgir at den fysiske råoljereferansen North Sea Dated falt 32
          prosent fra toppen tidlig i oktober til om lag 93 dollar fatet da
          rapporten ble skrevet. Europeiske dieselpriser falt 11 prosent i samme
          periode, til nær 180 dollar fatet. Det er priser i råvaremarkedet, før
          norske drivstoffavgifter og MVA.
        </p>
        <h2 className="text-xl font-bold">
          Mer råolje løser ikke hele dieselproblemet
        </h2>
        <p>
          Ifølge IEA har økt oljeeksport fra Persiabukta lettet presset på
          råoljemarkedet. Tilgangen på ferdige produkter er fortsatt stram,
          særlig for diesel. Angrep på russisk energiinfrastruktur begrenser
          leveranser til verdensmarkedet, i tillegg til bortfallet fra
          Midtøsten.
        </p>
        <p>
          Frigivelse av beredskapslagret diesel skal bidra mens produksjonen
          henter seg inn, ifølge IEA.
        </p>
        <h2 className="text-xl font-bold">
          Den siste uka viser fortsatt store svingninger
        </h2>
        <p>
          Fredag 13. november var siste daglige sluttverdi for ICE Low Sulphur
          Gasoil i TradingViews sammenhengende futuresserie{" "}
          <strong>1287,50 dollar per tonn</strong>. Fredag 6. november var den
          1301,75 dollar. Nedgangen mellom de to datoene er dermed om lag 1,1
          prosent.
        </p>
        <p>
          Veien mellom dem var ujevn: tirsdag 10. november var sluttverdien 1218
          dollar per tonn. Fredag var den 69,50 dollar høyere. Et fall over
          flere uker betyr altså ikke at prisen synker hver dag.
        </p>
        <p>
          Dette er en sammenhengende serie av futureskontrakter: priser for
          levering fram i tid, som også påvirkes når serien bytter kontrakt. Det
          er en annen markedsreferanse enn de fysiske prisene IEA omtaler.
          Prosentene skal derfor ikke behandles som målinger av nøyaktig samme
          vare og periode.
        </p>
        <h2 className="text-xl font-bold">Hva betyr tallene i kroner?</h2>
        <p>
          Med Norges Banks USD/NOK-kurs på{" "}
          <strong>9,5634 fra 13. november</strong>, og dieselpris.no sin faste
          modellantakelse om <strong>1176 liter per tonn</strong>, tilsvarer
          fredagens futuresverdi omtrent{" "}
          <strong>10,47 kroner per liter i råvarekomponent</strong>:
        </p>
        <p>1287,50 × 9,5634 ÷ 1176 = 10,47 kroner per liter.</p>
        <p>
          For å vise størrelsen på ukesendringen kan begge fredagsverdiene
          regnes med samme valutakurs. Forskjellen på 14,25 dollar per tonn blir
          da rundt <strong>12 øre per liter</strong>, eller{" "}
          <strong>46 kroner for 400 liter</strong>, før avgifter og MVA. Det er
          et regneeksempel som isolerer futuresendringen. Det er ikke målt
          besparelse ved pumpa, og det tar ikke med endringen i valutakurs
          mellom datoene.
        </p>
        <p>
          Pumpeprisen avhenger også av avgifter, biodrivstoff, transport,
          innkjøpsvilkår og stasjonsmarginer. En råvarekomponent på 10,47 kroner
          er derfor ingen pris du kan forvente å finne på en lokal
          dieselstasjon.
        </p>
      </NewsArticleLayout>
    </main>
  </div>
);
export default Page;

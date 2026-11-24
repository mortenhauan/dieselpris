import type { Metadata } from "next";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Dieselråvaren falt 10 prosent på én uke";
const DESCRIPTION =
  "Dieselråvaren falt 10 prosent i dollar fra 16. til 23. november. Med en svakere krone ble fallet rundt 83 øre per liter i beregnet råvarekostnad.";
const SLUG = "dieselravaren-falt-ti-prosent-pa-en-uke";
const PUBLISHED_AT = "2026-11-24T16:15:48Z";
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
    href: "https://www.tradingview.com/symbols/ICEEUR-ULS1!/",
    label: "TradingView: ICE-gasoil, sluttverdier 16. og 23. november 2026",
  },
  {
    href: "https://www.ice.com/products/34361119/Low-Sulphur-Gasoil-Futures",
    label: "ICE: kontraktbeskrivelse for Low Sulphur Gasoil Futures",
  },
  {
    href: "https://data.norges-bank.no/api/data/EXR/B.USD.NOK.SP?format=sdmx-csv&startPeriod=2026-11-16&endPeriod=2026-11-24",
    label: "Norges Bank: USD/NOK for de aktuelle børsdagene",
  },
  {
    href: "https://www.norges-bank.no/tema/Statistikk/Valutakurser/",
    label: "Norges Bank: valutakurser og metode",
  },
  {
    href: "https://www.eia.gov/todayinEnergy/detail.php?id=68485",
    label: "EIA, 19. november: mer olje gjennom Hormuzstredet",
  },
  {
    href: "https://think.ing.com/downloads/pdf/article/the-commodities-feed-nvidia-led-rally-lifts-gold-and-copper",
    label: "ING, 24. november: råoljepris og forventninger om samtaler",
  },
  {
    href: "https://www.iea.org/reports/oil-market-report-november-2026",
    label: "IEA, 13. november: fortsatt knapp tilgang på diesel",
  },
];

const Page = () => (
  <div className="min-h-screen bg-background">
    <Header activeNav="news" variant="content" />
    <main>
      <NewsArticleLayout
        canonicalUrl={CANONICAL}
        category="Nyhet"
        description={DESCRIPTION}
        publishedAtIso={PUBLISHED_AT}
        sources={SOURCES}
        title={TITLE}
      >
        <p className="text-lg font-medium">
          Den europeiske markedsreferansen for diesel falt rundt 10 prosent i
          dollar fra 16. til 23. november. Målt i norske kroner ble fallet
          mindre. Råvaredelen i dieselpris.no sitt estimat falt rundt 83 øre per
          liter før avgifter og MVA.
        </p>
        <p>
          Referansen ICE Low Sulphur Gasoil falt fra 1246,75 til 1121,25 dollar
          per tonn målt ved børsslutt de to mandagene. Den følger kontrakter for
          framtidig levering av lavsvovlet diesel i området rundt Amsterdam,
          Rotterdam og Antwerpen.
        </p>
        <h2 className="text-xl font-bold">En svakere krone dempet fallet</h2>
        <p>
          Samtidig steg Norges Banks dollarkurs fra 9,6005 til 9,8076 kroner.
          Dermed falt den beregnede råvaredelen fra 10,18 til 9,35 kroner per
          liter. Uten endringen i valutakursen ville råvaredelen falt rundt 1,02
          kroner per liter.
        </p>
        <p>
          Forskjellen på rundt 83 øre per liter tilsvarer omtrent{" "}
          <strong>331 kroner for 400 liter</strong> i råvaredelen, før avgifter
          og MVA. Hvor mye du betaler for autodiesel, avhenger også av blant
          annet biodrivstoff, avgifter, transport og innkjøpsvilkår.
        </p>
        <h2 className="text-xl font-bold">Råoljen har også falt</h2>
        <p>
          Det amerikanske energibyrået EIA peker på økt oljeflyt gjennom
          Hormuzstredet som en grunn til lavere råoljepris. ING knytter
          mandagens råoljefall til forventninger om mulige samtaler mellom USA
          og Iran. Hvor mye disse forholdene bidro til fallet i
          dieselreferansen, er usikkert.
        </p>
        <p>
          Tilgangen på ferdig diesel kan fortsatt være knapp selv når råoljen
          blir billigere. Det internasjonale energibyrået IEA beskrev et stramt
          dieselmarked i rapporten 13. november, før børsfallet i denne saken.
        </p>
        <h2 className="text-xl font-bold">Slik er tallene regnet ut</h2>
        <p>
          Vi bruker sluttverdiene fra de to avsluttede børsdagene i TradingViews
          sammenhengende serie ICEEUR:ULS1! og Norges Banks veiledende
          valutakurs for hver dato. Vi ganger dollarprisen per tonn med
          dollarkursen og deler på 1176 liter per tonn, som er modellens
          antakelse. Eksemplet for 400 liter er regnet fra de uavrundede
          verdiene.
        </p>
      </NewsArticleLayout>
    </main>
  </div>
);
export default Page;

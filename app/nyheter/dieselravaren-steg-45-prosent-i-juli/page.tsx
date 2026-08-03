import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE =
  "Dieselråvaren steg 45 prosent i juli – Trump varslet pause i angrep mot Iran";
const DESCRIPTION =
  "ICE-gasoil steg 45 prosent i juli. Etter at Trump varslet pause i nye USA-angrep mot Iran, falt råvaren 8,6 prosent 3. august.";
const SLUG = "dieselravaren-steg-45-prosent-i-juli";
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
    href: "https://apnews.com/article/oil-prices-iran-war-trump-194ab3d3130bb44de445cf3d05954beb",
    label:
      "AP: Trump ba amerikanske styrker holde igjen nye Iran-angrep, 2. august 2026",
  },
  {
    href: "https://apnews.com/article/b8bfaf782877957bbaa7196b70a4d725",
    label: "AP: Nye kamper sendte Brent opp 7,3 prosent, 29. juli 2026",
  },
  {
    href: "https://www.iea.org/reports/oil-market-report-july-2026",
    label: "IEA: Oil Market Report, juli 2026",
  },
  {
    href: "https://www.aftenposten.no/verden/i/XM4J5n/usa-med-nye-angrep-mot-iran-oljeprisen-stiger",
    label: "Aftenposten: Nye amerikanske angrep mot Iran, 13. juli 2026",
  },
  {
    href: "https://www.aftenposten.no/verden/i/Ar0eEx/oljeprisen-steg-etter-nye-amerikanske-angrep-mot-iran",
    label: "Aftenposten: Oljeprisen steg etter nye angrep, 20. juli 2026",
  },
  {
    href: "https://www.tradingview.com/symbols/ICEEUR-ULSQ2026/",
    label: "TradingView: ICE Low Sulphur Gasoil, augustkontrakten ULSQ2026",
  },
  {
    href: "https://www.norges-bank.no/tema/Statistikk/Valutakurser/?id=USD&tab=currency",
    label: "Norges Bank: USD/NOK-referansekurser",
  },
];

const TABLE_HEADER =
  "border-b border-border px-3 py-3 text-right font-semibold text-foreground";
const TABLE_CELL = "border-b border-border px-3 py-3 text-right";

const Page = () => (
  <div className="min-h-screen bg-background">
    <Header activeNav="news" variant="content" />
    <main>
      <NewsArticleLayout
        canonicalUrl={CANONICAL}
        category="Nyhet"
        description={DESCRIPTION}
        publishedAtIso="2026-08-04T01:20:00+02:00"
        sources={SOURCES}
        title={TITLE}
      >
        <p className="text-lg font-medium">
          Augustkontrakten for ICE-gasoil steg 44,9 prosent gjennom juli mens
          konflikten med Iran blusset opp igjen. Etter at Donald Trump varslet
          pause i nye USA-angrep, falt kontrakten 8,6 prosent mandag 3. august.
        </p>

        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
            Ikke en lokal pumpepris
          </p>
          <p className="text-sm">
            Tallene gjelder ICE Low Sulphur Gasoil-kontrakten for levering i
            august 2026. Den beregnede kroneverdien er et indikativt
            råvaregrunnlag – ikke et oppslag av prisen på din lokale stasjon.
            Pumpeprisen følger ikke markedet krone for krone eller samme dag.
          </p>
        </div>

        <h2 className="text-xl font-bold">
          Fra juniro til kraftig julioppgang
        </h2>

        <p>
          Juli startet med optimisme etter den foreløpige avtalen mellom USA og
          Iran i juni. 1. juli stengte augustkontrakten på 910,50 dollar per
          tonn. Med dollarkursen den dagen tilsvarte det et beregnet
          råvaregrunnlag på 7,69 kroner literen.
        </p>

        <p>
          Men roen holdt ikke. IEA beskriver at energiflyten gjennom
          Hormuz-stredet bare hadde hentet seg delvis inn etter juni, før
          konflikten eskalerte igjen 7. og 8. juli. Eksporten av raffinerte
          produkter og LPG samlet lå fortsatt under halvparten av nivået før
          krigen. Produktmarkedene var stramme, mens raffineringsmarginene steg
          til det høyeste nivået på fire år.
        </p>

        <p>
          Augustkontrakten steg til 1 075 dollar per tonn 8. juli. Markedet steg
          flere ganger samtidig med nye amerikanske angrep senere i måneden, og
          23. juli var kontrakten oppe i 1 291,50 dollar. Da kampene blusset opp
          på nytt 29. juli, steg Brent 7,3 prosent til 88,09 dollar fatet,
          ifølge AP. Gasoil-kontrakten steg samme dag 84 dollar til 1 308,50
          dollar per tonn.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-xl text-sm">
            <thead>
              <tr>
                <th className={`${TABLE_HEADER} text-left`}>Dato</th>
                <th className={TABLE_HEADER}>Augustkontrakt, USD/tonn</th>
                <th className={TABLE_HEADER}>Råvare, kr/l</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${TABLE_CELL} text-left`}>1. juli</td>
                <td className={TABLE_CELL}>910,50</td>
                <td className={TABLE_CELL}>7,69</td>
              </tr>
              <tr>
                <td className={`${TABLE_CELL} text-left`}>8. juli</td>
                <td className={TABLE_CELL}>1 075,00</td>
                <td className={TABLE_CELL}>8,93</td>
              </tr>
              <tr>
                <td className={`${TABLE_CELL} text-left`}>23. juli</td>
                <td className={TABLE_CELL}>1 291,50</td>
                <td className={TABLE_CELL}>10,56</td>
              </tr>
              <tr>
                <td className={`${TABLE_CELL} text-left`}>31. juli</td>
                <td className={TABLE_CELL}>1 319,25</td>
                <td className={TABLE_CELL}>10,69</td>
              </tr>
              <tr>
                <td className="px-3 py-3 text-left">3. august</td>
                <td className="px-3 py-3 text-right">1 206,25</td>
                <td className="px-3 py-3 text-right">9,78</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground">
          Sluttkurser fra TradingView-markedsuttrekk for augustkontrakten
          ULSQ2026. Råvareverdien er omregnet med Norges Banks
          USD/NOK-referansekurs for hver dato og dieselpris.no-modellens faste
          antakelse om 1 176 liter per metrisk tonn. Det faktiske literantallet
          varierer med produkt, tetthet og temperatur.
        </p>

        <h2 className="text-xl font-bold">
          Gasoil er ikke det samme som Brent
        </h2>

        <p>
          Fra 1. til 31. juli steg augustkontrakten med 408,75 dollar per tonn,
          eller 44,9 prosent. Det er denne endringen som er avrundet til 45
          prosent i overskriften.
        </p>

        <p>
          Råolje alene forteller ikke hva som skjer med dieselråvaren. IEA peker
          på lav eksport av ferdige produkter og stramme produktmarkeder i
          regionen. Det er en viktig del av bakteppet for gasoilmarkedet, men
          forklarer ikke nødvendigvis alle bevegelsene.
        </p>

        <h2 className="text-xl font-bold">
          Tre kroner mer per liter i råvareverdi
        </h2>

        <p>
          Omregnet til kroner steg det beregnede råvaregrunnlaget fra 7,69 til
          10,69 kroner literen gjennom juli. Det er en forskjell på 3,00 kroner
          per liter før biodrivstoff, distribusjon, marginer, avgifter og mva.
        </p>

        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Eksempler på forskjellen i råvareverdi
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            <li>60 liter: om lag 180 kroner høyere råvaregrunnlag</li>
            <li>400 liter: om lag 1 200 kroner høyere råvaregrunnlag</li>
            <li>2 000 liter: om lag 6 000 kroner høyere råvaregrunnlag</li>
          </ul>
          <p className="mt-3 text-sm">
            Dette er regneeksempler på markedsreferansen fra 1. til 31. juli,
            ikke observerte prisøkninger eller ekstraregninger ved pumpa.
          </p>
        </div>

        <h2 className="text-xl font-bold">Ny angrepspause snudde markedet</h2>

        <p>
          Sent søndag 2. august amerikansk tid, natt til mandag i Norge, sa
          Donald Trump at han ville be amerikanske styrker holde igjen nye
          angrep mot Iran. Han hevdet at en avtale om å avslutte kampene var
          nær, ifølge AP. På den første komplette markedsdagen etter meldingen
          falt augustkontrakten 113 dollar per tonn, eller 8,6 prosent, til 1
          206,25 dollar.
        </p>

        <p>
          AP rapporterte at Brent falt kraftig til rundt 83 dollar fatet etter
          meldingen. Den beregnede råvareverdien for gasoil falt fra 10,69
          kroner literen 31. juli til 9,78 kroner 3. august – om lag 91 øre per
          liter.
        </p>

        <p>
          Det brå fallet er ikke bevis på en varig avtale. Hvis angrepene
          starter igjen eller skipstrafikken gjennom Hormuz svekkes, kan
          retningen snu på nytt. Juli viste hvor raskt markedet reagerer på nye
          meldinger fra konflikten.
        </p>

        <h2 className="text-xl font-bold">Hva betyr det for dieselkjøpere?</h2>

        <p>
          Gasoil-referansen er relevant for råvaregrunnlaget i autodiesel,
          anleggsdiesel og marine destillater. Men avgiftene er forskjellige, og
          innkjøpstidspunkt, biodrivstoff, transport og marginer påvirker når og
          hvor mye en markedsbevegelse merkes i den faktiske prisen.
        </p>

        <p>
          For bilister og flåteeiere betyr det at juli la et tydelig høyere
          råvaregrunnlag under dieselmarkedet. Fallet 3. august tok bort noe av
          oppgangen, men gir ikke grunnlag for å love et like stort og
          umiddelbart kutt ved pumpa.
        </p>

        <p>
          Juniavtalen som innledet perioden er omtalt i{" "}
          <Link
            className="underline underline-offset-4"
            href="/nyheter/iran-avtale-sender-dieselravaren-ned"
          >
            saken om hvorfor råvarefall ikke slår inn over natten
          </Link>
          . Se også{" "}
          <Link
            className="underline underline-offset-4"
            href="/nyheter/slik-settes-dieselprisen-fra-oljefat-til-pumpe"
          >
            forklaringen på hvordan dieselprisen settes
          </Link>
          .
        </p>
      </NewsArticleLayout>
    </main>
  </div>
);

export default Page;

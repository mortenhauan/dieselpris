import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE =
  "To måneder inn i konflikten: Hormuz fortsatt stengt – diesel forblir dyr";
const DESCRIPTION =
  "Hormuz er fortsatt en flaskehals for oljemarkedet. Brent lå rundt 109 dollar mandag, og dieselråvaren er fortsatt dyr.";
const SLUG = "hormuz-fortsatt-stengt-diesel-sommeren";
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
    href: "https://www.iea.org/reports/oil-market-report-april-2026",
    label: "IEA: Oil Market Report april 2026",
  },
  {
    href: "https://www.cnn.com/2026/05/04/world/live-news/iran-war-hormuz-trump",
    label: "CNN: Iran war live updates, 4. mai 2026",
  },
  {
    href: "https://www.cnn.com/2026/04/29/world/iran-war-gulf-hormuz-shipping-maps-intl-vis",
    label: "CNN: Shipping through the Strait of Hormuz, 29. april 2026",
  },
  {
    href: "https://www.eia.gov/pressroom/releases/press586.php",
    label:
      "EIA: Short-Term Energy Outlook april 2026 – pressmelding (press586)",
  },
  {
    href: "https://www.norges-bank.no/tema/Statistikk/Valutakurser/?tab=currency&id=USD",
    label:
      "Norges Bank: Valutakurser – USD/NOK (referansekurs hentet 30. april 2026)",
  },
  {
    href: "https://www.theice.com/products/34361119/Low-Sulphur-Gasoil-Futures",
    label:
      "ICE: Low Sulphur Gasoil Futures (ULS1) – kontraktspesifikasjon og prisgrunnlag hentet 4. mai 2026",
  },
  {
    href: "https://www.tradingview.com/symbols/ICEEUR-ULS1!/",
    label: "TradingView: ICEEUR:ULS1! markedsuttrekk, 4. mai 2026",
  },
  {
    href: "https://lovdata.no/forskrift/2026-03-30-525",
    label:
      "Lovdata: Finansdepartementets vedtak om iverksettelse 1. mai (nr. 525/2026)",
  },
  {
    href: "https://lovdata.no/forskrift/2026-03-26-483",
    label: "Lovdata: Stortingsvedtak om CO₂-avgift autodiesel (nr. 483/2026)",
  },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          canonicalUrl={CANONICAL}
          category="Nyhet"
          description={DESCRIPTION}
          publishedAtIso="2026-05-04T13:15:00+02:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            To måneder etter at konflikten mellom USA og Iran brøt ut, er
            Hormuz-stredet fortsatt stengt i praksis. Den to ukers våpenhvilen
            fra april har ikke gitt normal trafikk gjennom stredet. CNN skrev
            mandag morgen at stredet var «almost empty», og Brent lå da like
            under 109 dollar fatet. Modellberegnet norsk dieselpris holder seg
            over 20 kroner literen.
          </p>

          <h2 className="text-xl font-bold">Hva skjedde med våpenhvilen?</h2>

          <p>
            En våpenhvile ble meldt i april, men den har ikke gitt normal
            gjennomfart i stredet. CNNs gjennomgang av skipstrafikken 29. april
            viste at trafikken gjennom Hormuz de siste to månedene hadde ligget
            på rundt 5 prosent av normalen.
          </p>

          <p>
            Ifølge Det internasjonale energibyrået (IEA) er
            forsyningsforstyrrelsene store. EIAs Short-Term Energy Outlook for
            april anslår at om lag 9,1 millioner fat per dag var ute av markedet
            i april som følge av produksjonsstans i regionen.
          </p>

          <h2 className="text-xl font-bold">Markedet mandag 4. mai</h2>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Nøkkeltall per 4. mai 2026
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>ICE Brent:</strong> 108,97 USD/fat tidlig mandag
                (CNN/ICE)
              </li>
              <li>
                <strong>ICE gasoil (ULS1):</strong> 1 308,50 USD/tonn
              </li>
              <li>
                <strong>USD/NOK:</strong> 9,3252 (Norges Bank, 30. april)
              </li>
              <li>
                <strong>Råvarekostnad diesel:</strong> ca. 10,31 kr/l (kun
                råvare, beregnet med ICE-tetthet 0,845 kg/l)
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Gasoil-tallet er et markedsuttrekk fra nærmeste ULS1-kontrakt.
              Råvareberegningen er: USD/tonn × USD/NOK × 0,845 kg/l ÷ 1000.
            </p>
          </div>

          <p>
            Råvarekostnaden på 10,31 kr/l er ikke pumpeprisen. Norske avgifter,
            raffinerimargin, distribusjon og stasjonsmarginer legges oppå. Med
            dagens avgiftsnivå – etter at veibruksavgiften ble fjernet
            midlertidig fra 1. april og CO₂-avgiften på autodiesel ble kuttet
            fra 1. mai – peker modellberegninger mot et indikativt
            pumpeprispress på rundt 20–21 kroner literen. Faktisk pris varierer
            mellom stasjoner og regioner.
          </p>

          <h2 className="text-xl font-bold">Hva betyr det for deg?</h2>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Dieselregning ved illustrerende 20,50 kr/l
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Personbil (60 l tank):</strong> ca. 1 230 kr per fylling
              </li>
              <li>
                <strong>Langdistanse lastebil (400 l tank):</strong> ca. 8 200
                kr per fylling – og hver krone opp eller ned betyr 400 kr per
                fylling
              </li>
              <li>
                <strong>Anleggsdiesel og sjøfart:</strong> følger samme
                råvarepris; en gravemaskin eller fiskebåt merker hvert
                øreopprykk
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Tallene er illustrerende. Faktisk pris avhenger av kronekurs,
              råvarepris, stasjonsmarginer og hvilke avgiftsnivåer som gjelder
              for den enkelte brukstype.
            </p>
          </div>

          <h2 className="text-xl font-bold">
            Hormuz er verdens viktigste oljekorridor
          </h2>

          <p>
            Gjennom Hormuz-stredet fraktes normalt rundt 20 millioner fat olje
            per dag – omtrent én av fem fat som handles globalt. Det er ingen
            fullgod alternativ rute. Saudi-Arabia og De forente arabiske
            emirater har rørledninger som kan avlaste noe, men kapasiteten er
            langt fra tilstrekkelig til å erstatte full gjennomfart.
          </p>

          <p>
            IEA beskriver i april-rapporten sin at forsyningsforstyrrelsene er
            betydelige. EIA anslo 9,1 mb/d produksjonsstans i april og 6,7 mb/d
            i mai under en forutsetning om gradvis gjenopptakelse. EIA skrev
            samtidig at full normalisering av flytene vil ta måneder.
          </p>

          <h2 className="text-xl font-bold">
            Hvorfor faller ikke dieselprisen mer?
          </h2>

          <p>
            Brent er nede fra de høyeste nivåene i krisen, men dieselmarkedet er
            fortsatt stramt. Det henger sammen med at Hormuz ikke bare er viktig
            for råolje. Regionen leverer også ferdig drivstoff og råstoff som
            raffinerier bruker til å lage diesel.
          </p>

          <h2 className="text-xl font-bold">Hva skjer fremover?</h2>

          <p>
            For flåteeiere og transportbedrifter som planlegger sommerdriften,
            er det viktigste å følge råvarepris, kronekurs og leverandørvilkår
            tett. For privatbilister og fiskere er situasjonen uendret:
            pumpeprisen vil holde seg høy så lenge råvarekostnaden gjør det.
          </p>

          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              Usikkerheter per 4. mai
            </p>
            <ul className="space-y-2 text-sm">
              <li>Hormuz er fortsatt en kraftig flaskehals for markedet</li>
              <li>USAs plan om å eskortere skip gjennom stredet er usikker</li>
              <li>
                EIA anslår 9,1 mb/d produksjonsstans i april; omfanget fremover
                er usikkert
              </li>
              <li>
                Selv med en avtale vil normalisering ta måneder, ifølge IEA og
                EIA
              </li>
              <li>
                Kronekursen forsterker eller demper råvaresjokket; ved 9,33
                kr/USD er effekten direkte synlig på pumpeprisen
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Les også
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/vapenhvile-iran-oljeprisen-stuper-men-dieselen-forblir-dyr"
                >
                  Våpenhvile mellom USA og Iran – oljeprisen stuper, men
                  dieselen forblir dyr
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/raolje-stabil-men-gasoil-stiger"
                >
                  Råoljeprisen holder seg – gasoilen stiger likevel
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/dieselkutt-kan-vaere-ulovlig-statsstotte"
                >
                  Dieselkutt kommer 1. mai – men kan måtte betales tilbake
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/slik-settes-dieselprisen-fra-oljefat-til-pumpe"
                >
                  Slik settes dieselprisen: fra oljefat til pumpe
                </Link>
              </li>
            </ul>
          </div>
        </NewsArticleLayout>
      </main>
    </div>
  );
};

export default Page;

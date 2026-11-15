import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE =
  "Dieselmarkedet strammes til – råvaren er blitt dyrere i september";
const DESCRIPTION =
  "ICE-gasoil steg 10,8 prosent fra 9. til 16. september. Lav eksport og fallende lagre strammer til dieselmarkedet.";
const SLUG = "dieselmangel-presser-prisene-i-september";
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
    href: "https://www.iea.org/reports/oil-market-report-september-2026",
    label: "IEA: Oil Market Report, september 2026",
  },
  {
    href: "https://www.eia.gov/outlooks/steo/",
    label: "EIA: Short-Term Energy Outlook, 9. september 2026",
  },
  {
    href: "https://www.tradingview.com/symbols/ICEEUR-ULS1!/",
    label: "TradingView: ICE Low Sulphur Gasoil, ULS1!",
  },
  {
    href: "https://www.norges-bank.no/tema/Statistikk/Valutakurser/",
    label: "Norges Bank: USD/NOK-referansekurs, 17. september 2026",
  },
  {
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/avgiftssatser-2026/id3121982/",
    label: "Finansdepartementet: avgiftssatser 2026",
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
        publishedAtIso="2026-09-17T19:40:00+02:00"
        sources={SOURCES}
        title={TITLE}
      >
        <p className="text-lg font-medium">
          Referanseprisen for dieselråvaren steg 10,8 prosent fra onsdag 9. til
          onsdag 16. september. Samtidig melder Det internasjonale energibyrået
          IEA om lav eksport og fallende lagre. Det gir et dyrere
          råvaregrunnlag, men sier ikke hva diesel koster på din lokale stasjon.
        </p>

        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
            Ikke en pumpepris
          </p>
          <p className="text-sm">
            ICE-gasoil er en futuresreferanse – børskontrakter for framtidig
            levering av dieselråvare. Pumpeprisen inkluderer også biodrivstoff,
            transport, marginer, avgifter og mva. Innkjøp og lager gjør dessuten
            at markedsbevegelser kan slå inn senere og med en annen størrelse.
          </p>
        </div>

        <h2 className="text-xl font-bold">Råvareverdien steg 1,20 kr/l</h2>

        <p>
          Den kontinuerlige frontmånedskontrakten ICEEUR:ULS1! stengte på 1
          388,25 dollar per tonn 9. september og 1 538 dollar 16. september. Det
          er en oppgang på 149,75 dollar per tonn, eller 10,8 prosent.
        </p>

        <p>
          Med Norges Banks USD/NOK-kurs på 9,4286 fra 17. september og en fast
          omregning på 1 176 liter per tonn økte den beregnede råvareverdien fra
          11,13 til 12,33 kroner literen. Forskjellen er 1,20 kroner per liter.
          Samme valutakurs er brukt på begge dager for å vise endringen i
          råvarekontrakten alene.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                  Dato
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                  ULS1!
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                  Beregnet råvareverdi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-border px-4 py-3">
                  9. september
                </td>
                <td className="border-b border-border px-4 py-3">
                  1 388,25 USD/tonn
                </td>
                <td className="border-b border-border px-4 py-3">11,13 kr/l</td>
              </tr>
              <tr>
                <td className="px-4 py-3">16. september</td>
                <td className="px-4 py-3">1 538,00 USD/tonn</td>
                <td className="px-4 py-3">12,33 kr/l</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground">
          ULS1! følger nærmeste futureskontrakt og kan skifte kontrakt mellom
          datoene. Sammenligningen kan derfor omfatte ulike leveringsmåneder;
          den er ikke prisen på den samme fysiske dieselen på to datoer.
        </p>

        <h2 className="text-xl font-bold">Eksporten er kraftig redusert</h2>

        <p>
          IEA anslår at nettoeksporten av diesel og gasoil fra Gulfen var rundt
          390 000 fat per dag i august, litt over en firedel av nivået før
          krigen. Samlet nettoeksport fra Gulfen og Russland var 1,6 millioner
          fat per dag lavere enn i februar. Forstyrrelser ved raffinerier og
          begrenset trafikk gjennom Hormuz har gjort tilgangen strammere.
        </p>

        <p>
          Verdens oljelagre falt samtidig med 95 millioner fat i august, ifølge
          IEA. Byrået har skjøvet forventningen om full gjeninnhenting i
          oljeforsyningen fra Midtøsten til 2027, men dette er en prognose og
          ingen garanti for rask normalisering.
        </p>

        <p>
          USAs energibyrå EIA ventet 9. september at den globale produksjonen av
          destillater ville ligge under fjorårets nivå de kommende månedene.
          Prognosen bygger på data ferdigstilt 3. september. Den er usikker og
          er ikke et varsel om norsk pumpepris.
        </p>

        <h2 className="text-xl font-bold">Torsdag falt kontrakten tilbake</h2>

        <p>
          ULS1! ble observert rundt 1 490,75 dollar per tonn klokken 19.38 norsk
          tid torsdag 17. september. Det var 3,1 prosent under sluttkursen dagen
          før og tilsvarte omtrent 11,95 kroner literen med samme valutakurs.
          Tallet var en intradagobservasjon, ikke en sluttkurs.
        </p>

        <h2 className="text-xl font-bold">Hva kan det bety ved fylling?</h2>

        <p>
          Dersom pumpeprisen hypotetisk øker med én krone per liter inkludert
          mva, blir en fylling på 60 liter 60 kroner dyrere. For 400 liter er
          forskjellen 400 kroner. Dette er bare regneeksempler – ikke en
          observert eller ventet overføring fra futuresmarkedet til pumpa.
        </p>

        <p>
          Fra 1. september er veibruksavgiften for mineralolje til veibruk 2,28
          kroner per liter før mva, mens CO₂-avgiften på den fossile delen av
          autodiesel er 4,42 kroner per liter før mva. Satsene kan ikke bare
          summeres for en ferdig dieselblanding, fordi biodrivstoffandelen har
          egne regler. Les mer i{" "}
          <Link
            className="underline underline-offset-4"
            href="/nyheter/dieselavgiftene-oker-1-september"
          >
            saken om avgiftsendringene 1. september
          </Link>
          .
        </p>

        <p>
          For bilister og flåteeiere er signalet at råvaredelen fortsatt er høy
          og urolig. Den neste lokale pumpeprisen kan likevel ikke leses direkte
          av futureskurven.
        </p>
      </NewsArticleLayout>
    </main>
  </div>
);

export default Page;

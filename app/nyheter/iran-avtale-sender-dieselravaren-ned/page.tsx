import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE =
  "Iran-avtale sender dieselråvaren ned – men pumpa faller ikke over natten";
const DESCRIPTION =
  "Foreløpig USA-Iran-avtale sender Brent og dieselråvaren ned. Men norske pumpepriser følger ikke råmarkedet over natten.";
const SLUG = "iran-avtale-sender-dieselravaren-ned";
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
    href: "https://apnews.com/article/77406473da38c6c126818610a219dc20",
    label:
      "AP: USA og Iran enige om foreløpig avtale om våpenhvile og Hormuz, 15. juni 2026",
  },
  {
    href: "https://apnews.com/article/f2ee51f1b0686688b3e50068b4b71d70",
    label: "AP: Brent falt 4,8 prosent etter avtalen, 15. juni 2026",
  },
  {
    href: "https://apnews.com/article/8304cc39c6ebe6f863f6f39ee6ce9768",
    label:
      "AP: Selv med avtale kan olje- og gassflyt bruke uker eller måneder på å normaliseres, 15. juni 2026",
  },
  {
    href: "https://www.tradingview.com/symbols/ICEEUR-ULS1!/",
    label:
      "TradingView: ICEEUR:ULS1! markedsuttrekk brukt i dieselpris.no, 15. juni 2026",
  },
  {
    href: "https://www.norges-bank.no/tema/Statistikk/Valutakurser/?id=USD&tab=currency",
    label: "Norges Bank: USD/NOK-referansekurs, 15. juni 2026",
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
        publishedAtIso="2026-06-15T18:00:00+02:00"
        sources={SOURCES}
        title={TITLE}
      >
        <p className="text-lg font-medium">
          En foreløpig avtale mellom USA og Iran om å forlenge våpenhvilen og
          gjenåpne Hormuz-stredet sendte mandag både olje og dieselråvare ned.
          Det gir lavere råvaregrunnlag for autodiesel, anleggsdiesel og marine
          destillater, men det betyr ikke at pumpeprisen faller samme kveld.
        </p>

        <div className="rounded-2xl border border-accent/25 bg-accent/8 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
            Bekreftet mandag 15. juni
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            <li>
              AP opplyser at USA og Iran har nådd en foreløpig avtale om å
              forlenge våpenhvilen og gjenåpne Hormuz-stredet.
            </li>
            <li>
              Avtalen var ventet signert fredag i Genève, men verken USA eller
              Iran sa mandag at gjennomføringen hadde startet.
            </li>
            <li>
              Brent falt 4,8 prosent til 83,14 dollar fatet, ifølge APs
              markedsoppdatering.
            </li>
            <li>
              ICE Low Sulphur Gasoil ULS1 stengte på 933,75 dollar per tonn, ned
              33,50 dollar på dagen.
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-bold">
          Råvaredelen er nesten en krone lavere
        </h2>

        <p>
          For norske dieselkunder er det særlig gasoil-kontrakten som betyr noe.
          Det er denne råvaren som ligger nærmest prisen på dieselproduktet før
          avgifter, biodrivstoff, frakt og marginer legges på.
        </p>

        <p>
          Dieselpris.no sitt markedsuttrekk viser at ULS1 stengte på 1 055,50
          dollar per tonn 5. juni. Mandag 15. juni var sluttkursen 933,75. Med
          USD/NOK på 9,5249 gir det en beregnet råvarekostnad på 7,56 kroner
          literen, mot 8,55 kroner literen 5. juni.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                  Markedstall
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                  5. juni
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                  15. juni
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-border px-4 py-3">ULS1</td>
                <td className="border-b border-border px-4 py-3">
                  1 055,50 USD/tonn
                </td>
                <td className="border-b border-border px-4 py-3">
                  933,75 USD/tonn
                </td>
              </tr>
              <tr>
                <td className="border-b border-border px-4 py-3">
                  Råvarekostnad
                </td>
                <td className="border-b border-border px-4 py-3">8,55 kr/l</td>
                <td className="border-b border-border px-4 py-3">7,56 kr/l</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Endring</td>
                <td className="px-4 py-3" colSpan={2}>
                  -121,75 USD/tonn og om lag -0,99 kr/l i ren råvaredel
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Det er mye penger når volumene blir store. En personbil med 60 liters
          tank har da et råvaregrunnlag som er rundt 59 kroner lavere enn 5.
          juni. En lastebil med 400 liters tank ligger rundt 396 kroner lavere.
          For en båt eller maskin som fyller 2 000 liter, er råvaregrunnlaget
          nesten 1 980 kroner lavere.
        </p>

        <h2 className="text-xl font-bold">
          Men råvarefall er ikke det samme som pumpefall
        </h2>

        <p>
          Det er viktig å skille mellom råvarekostnad og pris ved pumpa.
          Pumpeprisen på autodiesel inkluderer også veibruksavgift, CO₂-avgift,
          biodrivstoff, distribusjon, stasjonsmargin og 25 prosent mva på hele
          summen.
        </p>

        <p>
          For anleggsdiesel, fiske og annen sjøfart er avgiftsbildet annerledes,
          men poenget er det samme: råvaredelen er bare én del av regningen. I
          tillegg kommer timing. Drivstoff som selges i dag kan være kjøpt inn
          tidligere, og leverandørene justerer ikke alltid prisene i takt med
          hvert hopp i futuresmarkedet.
        </p>

        <p>
          Vi har skrevet mer om denne sammenhengen i{" "}
          <Link
            className="underline underline-offset-4"
            href="/nyheter/slik-settes-dieselprisen-fra-oljefat-til-pumpe"
          >
            en egen sak om hvordan dieselprisen settes
          </Link>
          .
        </p>

        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Slik ser markedet ut nå
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            <li>
              Brent i APs markedsmelding: 83,14 dollar fatet, ned 4,8 prosent
              mandag
            </li>
            <li>
              Brent i dieselpris.no sitt 7-dagersuttrekk: 83,29 dollar fatet,
              med topp på 98,08 og bunn på 82,40
            </li>
            <li>
              ULS1 siste 48 timer: lav 919,75 og høy 1 040,50 dollar per tonn
            </li>
            <li>
              Total bevegelse siste 48 timer i ULS1: -76,00 dollar per tonn
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-bold">
          Hvorfor reagerer markedet så kraftig?
        </h2>

        <p>
          Hormuz-stredet er en av verdens viktigste flaskehalser for energi. APs
          energianalyse viser til at stredet før krigen fraktet rundt en femdel
          av verdens råolje. Når markedet tror at den ruten kan åpnes igjen,
          faller risikopåslaget raskt.
        </p>

        <p>
          Men AP peker også på det motsatte: selv med en avtale kan det ta uker
          eller måneder før olje- og gassflyten er tilbake på normalnivå. Skip
          skal tilbake i rute, forsikring og sikkerhet må på plass, og detaljene
          i avtalen er fortsatt uklare.
        </p>

        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
            Det som fortsatt er uavklart
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            <li>
              Den planlagte signeringen i Genève var mandag fortsatt ikke
              gjennomført.
            </li>
            <li>
              Verken amerikanske myndigheter eller Iran sa at gjenåpningen av
              Hormuz allerede var satt i verk.
            </li>
            <li>
              Det er ikke sikkert hvor raskt tankskip faktisk kan seile som
              normalt gjennom stredet.
            </li>
            <li>
              Et nytt tilbakeslag i forhandlingene kan sende både olje og
              dieselråvare opp igjen.
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-bold">Hva betyr det for deg nå?</h2>

        <p>
          For bilister er hovedpoenget enkelt: råvaremarkedet peker ned, men du
          bør ikke forvente at stasjonsprisen faller krone for krone med en
          gang. For flåteeiere, fiskere og entreprenører er signalet likevel
          viktig, fordi et lavere råvaregrunnlag kan dempe kostnadspresset
          dersom avtalen faktisk holder og skipstrafikken kommer i gang igjen.
        </p>

        <p>
          Mandagens marked gir altså et pusterom. Men det er foreløpig bare et
          markedssignal, ikke en garanti for billigere diesel denne uka.
        </p>
      </NewsArticleLayout>
    </main>
  </div>
);

export default Page;

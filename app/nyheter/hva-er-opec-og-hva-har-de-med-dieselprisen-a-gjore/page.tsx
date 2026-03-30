import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Hva er OPEC+ og hva har de med dieselprisen å gjøre?";
const DESCRIPTION =
  "23 land bestemmer hvor mye olje verden får. I 2025 har de åpnet kranene – og det merkes på pumpa.";
const SLUG = "hva-er-opec-og-hva-har-de-med-dieselprisen-a-gjore";
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
    href: "https://www.reuters.com/business/energy/opec-considers-raising-oil-output-by-550000-bpd-august-sources-say-2025-07-05/",
    label:
      "Reuters: OPEC+ speeds up oil output hikes, adds 548,000 bpd in August",
  },
  {
    href: "https://www.reuters.com/business/energy/opec-set-raise-oil-output-further-october-sources-say-2025-09-07/",
    label: "Reuters: OPEC+ agrees further oil output boost from October",
  },
  {
    href: "https://www.iea.org/reports/oil-market-report-september-2025",
    label: "IEA: Oil Market Report, september 2025",
  },
  {
    href: "https://www.opec.org/opec_web/en/about_us/24.htm",
    label: "OPEC: About us",
  },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          category="Forklart"
          publishedAtIso="2025-09-15T11:00:00+02:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Siden april har 23 oljeproduserende land pumpet over to millioner
            fat mer olje per dag ut på verdensmarkedet. Oljeprisen har falt med
            omtrent ti dollar fatet. Du skulle tro det ga billigere diesel – men
            så enkelt er det ikke.
          </p>

          <h2 className="text-xl font-bold">Kort fortalt: hva er OPEC+?</h2>

          <p>
            OPEC er en allianse av oljeeksporterende land, opprinnelig grunnlagt
            i 1960. Plusstegnet betyr at flere land er med – blant dem Russland.
            Til sammen er det 23 land, ledet av Saudi-Arabia og Russland, som
            koordinerer hvor mye olje de pumper opp.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              OPEC+ i korte trekk
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              <li>
                23 land som sammen kontrollerer rundt 40 prosent av verdens
                oljeproduksjon
              </li>
              <li>
                Møtes jevnlig (ofte i Wien) for å bestemme hvor mye olje hvert
                land skal pumpe
              </li>
              <li>
                Når de kutter produksjon, blir det mindre olje på markedet – og
                prisen stiger
              </li>
              <li>
                Når de øker produksjon, blir det mer olje – og prisen faller
              </li>
              <li>
                Beslutningene tas av oljeministre, men rammer helt ned til det
                du betaler på pumpa
              </li>
            </ul>
          </div>

          <p>
            Tenk på det som en kran. OPEC+ bestemmer hvor mye den skal stå åpen.
            Stenger de litt, stiger prisen. Åpner de, synker den. Og fordi olje
            er råvaren diesel lages av, treffer det direkte.
          </p>

          <h2 className="text-xl font-bold">Hva har skjedd i 2025?</h2>

          <p>
            Under koronapandemien i 2020 kuttet OPEC+ produksjonen med nesten ti
            millioner fat per dag – det største kuttet noensinne. Målet var å
            hindre at oljeprisen kollapset fullstendig da verden sluttet å
            bevege seg.
          </p>

          <p>
            I årene etter holdt de igjen mye av denne oljen. Men fra april 2025
            begynte de å skru opp kranene igjen – og tempoet har økt for hver
            måned.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Produksjonsøkningene i 2025
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              <li>April: 138 000 fat per dag</li>
              <li>Mai–juli: 411 000 fat per dag (hver måned)</li>
              <li>August: 548 000 fat per dag</li>
              <li>September: 555 000 fat per dag (nettopp besluttet)</li>
            </ul>
            <p className="mt-3 text-sm">
              Til sammen har OPEC+ økt produksjonen med over to millioner fat
              per dag siden april.
            </p>
          </div>

          <p>
            Saudi-Arabia har ledet an. En viktig grunn er at amerikanske
            skiferprodusenter har tatt stadig større markedsandeler – altså
            solgt mer og mer olje – mens OPEC+-landene har holdt igjen sin.
            Saudiene vil ha tilbake sin del av kaken.
          </p>

          <p>
            Også USAs president Trump har lagt press på OPEC+ om å pumpe mer for
            å holde drivstoffprisene nede for amerikanske forbrukere.
          </p>

          <h2 className="text-xl font-bold">Hva betyr det for oljeprisen?</h2>

          <p>
            Mer olje på markedet betyr lavere pris. Brent-oljen – som er
            referanseprisen for det meste av oljen som handles i Europa –
            startet 2025 på rundt 75 dollar fatet. I midten av september ligger
            den på 65–68 dollar. Det er et fall på omtrent ti dollar, eller
            rundt 13 prosent.
          </p>

          <h2 className="text-xl font-bold">Hva merker du på pumpa?</h2>

          <p>
            I teorien burde et fall på ti dollar per fat gi merkbart billigere
            diesel. Tommelfingerregelen er at ti dollar lavere oljepris gir
            60–80 øre billigere diesel per liter, inkludert momseffekten.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Regneeksempel for en som kjører mye
            </p>
            <p className="text-sm">
              En personbil som bruker 1 500 liter diesel i året, kunne i teorien
              spart 900–1 200 kroner på et prisfall på 60–80 øre literen. For et
              vogntog som bruker 40 000 liter, snakker vi om 24 000–32 000
              kroner.
            </p>
            <p className="mt-3 text-sm">
              Men i praksis har avgiftsøkningene i 2025 spist opp mye av denne
              gevinsten.
            </p>
          </div>

          <h2 className="text-xl font-bold">Avgiftene spiser besparelsen</h2>

          <p>
            Fra nyttår 2025 økte CO₂-avgiften på diesel fra 3,16 til 3,79 kroner
            per liter – en økning på 63 øre. Med moms på toppen blir det rundt
            79 øre ekstra per liter i avgifter.
          </p>

          <p>
            Det betyr at det meste av det oljeprisfallet gir deg i billigere
            råvare, blir hentet inn igjen av staten. Nettoresultatet for
            lommeboka er beskjedent – kanskje noen få øre per liter, avhengig av
            kronekursen og tidspunktet.
          </p>

          <h2 className="text-xl font-bold">
            Tre ting som bestemmer det du betaler
          </h2>

          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>Oljeprisen</strong> – styrt av tilbud og etterspørsel, der
              OPEC+ er den største enkeltfaktoren på tilbudssiden
            </li>
            <li>
              <strong>Kronekursen</strong> – olje handles i dollar, så en svak
              krone gjør oljen dyrere for norske importører selv om dollarprisen
              faller
            </li>
            <li>
              <strong>Avgifter</strong> – veibruksavgift, CO₂-avgift og 25
              prosent moms utgjør over halvparten av det du betaler på pumpa
            </li>
          </ul>

          <p>
            OPEC+ kontrollerer kun den første. Men fordi oljeprisen er
            utgangspunktet alt annet regnes fra, merkes beslutningene deres i
            hele kjeden – fra raffineri til pumpepris.
          </p>

          <h2 className="text-xl font-bold">Hva skjer videre?</h2>

          <p>
            OPEC+ har varslet at de vil fortsette å øke produksjonen, men at de
            kan bremse opp hvis oljeprisen faller for mye. De neste
            ministermøtene vil vise om tempoet holder seg.
          </p>

          <p>
            For deg som tanker diesel betyr det at råvareprisen trolig holder
            seg moderat utover høsten – med mindre noe uventet skjer i
            verdensmarkedet. Men avgiftene er der uansett, og kronekursen kan
            svinge begge veier.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Les også
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/slik-settes-dieselprisen-fra-oljefat-til-pumpe"
                >
                  Slik settes dieselprisen: fra oljefat til pumpe
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/kronekursen-og-dieselprisen-en-sammenheng-fa-tenker-pa"
                >
                  Kronekursen og dieselprisen – en sammenheng få tenker på
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

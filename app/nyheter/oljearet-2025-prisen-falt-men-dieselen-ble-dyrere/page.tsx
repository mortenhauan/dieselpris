import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Oljeåret 2025: prisen falt, men dieselen ble dyrere";
const DESCRIPTION =
  "Brent-oljen falt 19 prosent i 2025. Likevel endte norske dieselpriser høyere enn året før. Her er forklaringen.";
const SLUG = "oljearet-2025-prisen-falt-men-dieselen-ble-dyrere";
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
    href: "https://www.reuters.com/business/energy/oil-slips-brent-heads-longest-stretch-annual-losses-2025-2025-12-31/",
    label: "Reuters: Oil prices log steepest annual drop since 2020",
  },
  {
    href: "https://www.iea.org/reports/oil-market-report-december-2025",
    label: "IEA: Oil Market Report December 2025",
  },
  {
    href: "https://lastebil.no/Aktuelt/Nyhetsarkiv/2025/Stigende-dieselpriser-avsluttet-2024-ny-kraftig-oekning-i-2025",
    label:
      "NLF: Stigende dieselpriser avsluttet 2024 – ny kraftig økning i 2025",
  },
  {
    href: "https://lovdata.no/dokument/STV/forskrift/2025-12-18-2763/",
    label: "Lovdata: CO₂-avgift 2025",
  },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          canonicalUrl={CANONICAL}
          category="Bakgrunn"
          publishedAtIso="2026-01-10T12:00:00+01:00"
          description={DESCRIPTION}
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            I 2025 falt oljeprisen nesten 20 prosent. Det burde gitt billigere
            diesel. I stedet betalte norske sjåfører og transportører mer enn
            noen gang. Forklaringen ligger i skatt, valuta og geopolitikk.
          </p>

          <h2 className="text-xl font-bold">
            Oljen: det bratteste fallet siden 2020
          </h2>

          <p>
            Brent-oljen startet 2025 på rundt 75 dollar fatet. Nyttårsaften ble
            siste notering 60,85 dollar – et fall på 19 prosent. Det er det
            kraftigste årsdroppet siden pandemien i 2020, og tredje år på rad
            med nedgang.
          </p>

          <p>
            OPECs referansekurv endte desember på 61,74 dollar i snitt. IEA
            anslår at verdens oljeetterspørsel vokste med 830 000 fat per dag i
            2025 – men tilbudet vokste raskere.
          </p>

          <p>
            OPEC+ begynte å løse opp produksjonskuttene fra april, og økte
            produksjonen med over 2,7 millioner fat per dag innen oktober. I
            fjerde kvartal bremset de til 137 000 fat i månedlig økning, og før
            jul annonserte de en pause i økningen for første kvartal 2026.
          </p>

          <h2 className="text-xl font-bold">
            Dieselprisen: en helt annen virkelighet
          </h2>

          <p>
            Mens oljeprisen falt på verdensmarkedet, steg dieselprisen i Norge.
            Nyttårsaften 2024 sto snittprisen på 16,33 kroner literen. Bare to
            uker inn i 2025 hadde den steget til 17,50 – en økning på 7,2
            prosent.
          </p>

          <p>
            I august nådde snittet 20,81 kroner literen. Til sammenligning var
            gjennomsnittet for hele 2024 på 16,15 kroner.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Hva betyr det i kroner?
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Vogntog</strong> (ca. 400 liter per fylling): I januar
                kostet en full tank 6 530 kr. I august: 8 324 kr. Det er{" "}
                <strong>1 790 kroner mer per fylling</strong>.
              </li>
              <li>
                <strong>Personbil</strong> (ca. 50 liter per fylling): I januar
                betalte du 817 kr. I august: 1 041 kr. Forskjellen:{" "}
                <strong>224 kroner per fylling</strong>.
              </li>
              <li>
                <strong>Over et helt år</strong> bruker et typisk vogntog rundt
                35 000 liter. Forskjellen mellom 2024-snittet (16,15 kr) og
                august-toppen (20,81 kr) tilsvarer over{" "}
                <strong>163 000 kroner</strong>.
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">
            Hvorfor billig olje ikke ga billig diesel
          </h2>

          <p>
            Fire faktorer forklarer hvorfor norske dieselpriser gikk motsatt vei
            av råoljen.
          </p>

          <h2 className="text-xl font-bold">1. Avgiftene økte igjen</h2>

          <p>
            CO₂-avgiften på diesel steg fra 3,16 kroner literen i 2024 til{" "}
            <Link href="/nyheter/dieselavgiftene-for-2025-nok-et-ar-med-okt-co2-avgift">
              3,79 kroner i 2025
            </Link>{" "}
            – en økning på 20 prosent. Veibruksavgiften ble justert marginalt.
            Til sammen økte de faste avgiftene med rundt 60 øre per liter fra
            nyttår.
          </p>

          <p>
            For et vogntog som bruker 35 000 liter i året betyr 60 øre mer per
            liter en ekstraregning på 21 000 kroner – bare i avgifter.
          </p>

          <h2 className="text-xl font-bold">2. Svak krone</h2>

          <p>
            Olje handles i dollar. Gjennom store deler av 2025 lå dollarkursen
            mellom 10 og 11 kroner. Når kronen er svak, koster importert olje
            mer i norske kroner – selv når dollarprisen faller. En del av
            oljenedgangen ble rett og slett spist opp av valutaen.
          </p>

          <h2 className="text-xl font-bold">
            3. Russland-sanksjoner strammet til
          </h2>

          <p>
            I januar 2025 innførte USA og Storbritannia nye sanksjoner mot den
            russiske tankerflåten. Russland hadde vært en stor leverandør av
            diesel til Europa. Da skipene ble vanskeligere å bruke, måtte
            europeiske raffinerier og importører finne dyrere alternativer. Det
            holdt dieselmarginen oppe selv når råoljen ble billigere.
          </p>

          <h2 className="text-xl font-bold">
            4. Raffinerimarginene holdt seg høye
          </h2>

          <p>
            Sesongmessig vedlikehold ved europeiske raffinerier, kombinert med
            sterk etterspørsel etter mellomdestillater, holdt dieselens
            crack-spread – forskjellen mellom råolje og ferdig diesel – på et
            høyt nivå gjennom året. Selv med billigere olje inn, ble ikke den
            ferdige dieselen tilsvarende billigere ut.
          </p>

          <h2 className="text-xl font-bold">
            Året sluttet med nye avgiftsøkninger
          </h2>

          <p>
            Den 18. desember 2025 vedtok Stortinget budsjettet for 2026.
            CO₂-avgiften på diesel øker fra 3,79 til{" "}
            <Link href="/nyheter/dieselavgiftene-for-2026-er-vedtatt">
              4,42 kroner literen
            </Link>
            . Veibruksavgiften justeres fra 2,25 til 2,28 kroner. Det gir
            ytterligere 66 øre i avgiftsøkning per liter fra 1. januar 2026.
          </p>

          <p>
            For en som fyller diesel i dag, betyr det at avgiftene alene har økt
            med over 1,25 kroner per liter på to år – fra 2024 til 2026.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              CO₂-avgift de siste tre årene
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>2024:</strong> 3,16 kr/l
              </li>
              <li>
                <strong>2025:</strong> 3,79 kr/l (+20 %)
              </li>
              <li>
                <strong>2026:</strong> 4,42 kr/l (+17 %)
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">Hva nå?</h2>

          <p>
            Oljeprisen starter 2026 lavere enn på lenge. OPEC+ har varslet en
            pause i produksjonsøkningene for første kvartal. Hvordan det
            påvirker prisen avhenger av etterspørselen – og av hva som skjer med
            den norske kronen.
          </p>

          <p>
            Det som derimot er sikkert, er at avgiftssiden fortsetter å trekke
            oppover. For den som kjører diesel i Norge er det ikke oljeprisen
            alene som bestemmer hva du betaler på pumpa. Skatt, krone og
            geopolitikk veier minst like tungt.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Oppsummert: oljeåret 2025
            </p>
            <ul className="space-y-2 text-sm">
              <li>Brent-oljen falt 19 % – fra ~75 til 60,85 dollar fatet.</li>
              <li>
                Norsk dieselpris steg fra 16,33 kr/l ved årsskiftet til over 20
                kr/l i august.
              </li>
              <li>
                CO₂-avgiften økte 20 % og forklarer en stor del av prisøkningen.
              </li>
              <li>
                Svak krone dempet effekten av billigere olje for norske
                forbrukere.
              </li>
              <li>Russland-sanksjoner holdt europeiske dieselpriser oppe.</li>
              <li>
                Nye avgiftsøkninger fra 1. januar 2026 gjør diesel enda dyrere.
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
                  href="/nyheter/kronekursen-og-dieselprisen-en-sammenheng-fa-tenker-pa"
                >
                  Kronekursen og dieselprisen – en sammenheng få tenker på
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/hva-er-opec-og-hva-har-de-med-dieselprisen-a-gjore"
                >
                  Hva er OPEC+ og hva har de med dieselprisen å gjøre?
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

import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Dieselavgiftene for 2026 er vedtatt";
const DESCRIPTION =
  "CO₂-avgiften øker, mens veibruksavgiften faller fra 2025 til 2026. For helt fossil veidiesel er samlet økning 22 øre/l før MVA.";
const SLUG = "dieselavgiftene-for-2026-er-vedtatt";
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
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/avgiftssatser-2026/id3121982/",
    label: "Finansdepartementet: vedtatte avgiftssatser for 2025 og 2026",
  },
  {
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/avgiftssatser-2025/id3057881/",
    label: "Finansdepartementet: avgiftssatser 2025",
  },
];

const Page = () => (
  <div className="min-h-screen bg-background">
    <Header activeNav="news" variant="content" />
    <main>
      <NewsArticleLayout
        canonicalUrl={CANONICAL}
        category="Nyhet"
        publishedAtIso="2025-12-22T18:00:00+01:00"
        description={DESCRIPTION}
        sources={SOURCES}
        title={TITLE}
      >
        <p className="text-lg font-medium">
          CO₂-avgiften på den fossile delen av autodiesel øker med 63 øre per
          liter fra 2025 til 2026. Samtidig faller veibruksavgiften med 41 øre.
          For helt fossil veidiesel øker summen med 22 øre per liter før MVA.
        </p>
        <p>
          Sammenligningen gjelder de ordinære satsene som ble vedtatt fra 1.
          januar 2026. Tabellen viser mineralolje, altså helt fossil diesel, og
          ikke avgiften på enhver dieselblanding ved pumpa.
        </p>

        <h2 className="text-xl font-bold">Satsene: 2025 mot 2026</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                  Avgift
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                  2025
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                  2026
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                  Endring
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b border-border">
                  Veibruksavgift
                </td>
                <td className="py-3 px-4 border-b border-border">2,69 kr/l</td>
                <td className="py-3 px-4 border-b border-border">2,28 kr/l</td>
                <td className="py-3 px-4 border-b border-border">−0,41 kr</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-border">
                  CO₂-avgift (generell sats)
                </td>
                <td className="py-3 px-4 border-b border-border">3,79 kr/l</td>
                <td className="py-3 px-4 border-b border-border">4,42 kr/l</td>
                <td className="py-3 px-4 border-b border-border">+0,63 kr</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-border font-semibold">
                  Sum for helt fossil veidiesel
                </td>
                <td className="py-3 px-4 border-b border-border font-semibold">
                  6,48 kr/l
                </td>
                <td className="py-3 px-4 border-b border-border font-semibold">
                  6,70 kr/l
                </td>
                <td className="py-3 px-4 border-b border-border font-semibold">
                  +0,22 kr
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-border">MVA</td>
                <td className="py-3 px-4 border-b border-border">25 %</td>
                <td className="py-3 px-4 border-b border-border">25 %</td>
                <td className="py-3 px-4 border-b border-border">Uendret</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          CO₂-satsen går fra 3,79 til 4,42 kroner per liter fossil diesel, en
          økning på rundt 17 prosent. Veibruksavgiften går fra 2,69 til 2,28
          kroner. Summen blir dermed 6,70 kroner mot 6,48 i 2025. Alle disse
          beløpene er uten MVA.
        </p>

        <h2 className="text-xl font-bold">Hva betyr det i kroner?</h2>

        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Regneeksempel med helt fossil veidiesel
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Personbil</strong> (ca. 1 500 liter/år): avgiftsøkningen
              koster rundt <strong>330 kr mer</strong> i året (før MVA).
            </li>
            <li>
              <strong>Vogntog</strong> (ca. 35 000 liter/år): økningen utgjør
              <strong>7700 kr mer før MVA</strong> i året.
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Eksemplene forutsetter helt fossil veidiesel og samme literforbruk.
            Med MVA blir beløpene 412,50 og 9625 kroner. De isolerer
            avgiftsendringen og er ikke en prognose for pumpeprisen.
          </p>
        </div>

        <h2 className="text-xl font-bold">Biodrivstoff endrer regnestykket</h2>
        <p>
          Veibruksavgiften på biodiesel til veibruk går også fra 2,69 til 2,28
          kroner per liter. CO₂-avgiften beregnes av den fossile delen. Har
          drivstoffet en lavere fossilandel, blir økningen i CO₂-avgift mindre
          enn i eksemplene over. Veibruksavgiftskuttet gjelder begge
          bestanddelene. Endret innblanding kan derfor endre nettoresultatet.
        </p>
        <p>
          Merket anleggsdiesel har ikke veibruksavgift, og får ikke den samme
          motvekten fra dette kuttet. Satser for fiske og sjøfart må vurderes
          for det aktuelle bruksområdet. Tabellen for helt fossil veidiesel skal
          ikke brukes som et avgiftsregnestykke for disse kjøpene.
        </p>

        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Les også
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="font-medium underline underline-offset-4"
                href="/nyheter/dieselavgiftene-for-2025-nok-et-ar-med-okt-co2-avgift"
              >
                Dieselavgiftene for 2025: nok et år med økt CO₂-avgift
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

export default Page;

import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Dieselavgiftene for 2025: nok et år med økt CO₂-avgift";
const DESCRIPTION =
  "CO₂-avgiften på diesel øker med 20 prosent fra nyttår. Slik slår de nye satsene ut for sjåfører og transportnæringen.";
const SLUG = "dieselavgiftene-for-2025-nok-et-ar-med-okt-co2-avgift";
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
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/avgiftssatser-2025/id3057881/",
    label: "Regjeringen: avgiftssatser 2025",
  },
  {
    href: "https://lovdata.no/forskrift/2024-12-13-3215/%C2%A71",
    label: "Lovdata: veibruksavgift 2025",
  },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          category="Nyhet"
          publishedAtIso="2024-12-13T17:00:00+01:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            For fjerde år på rad øker CO₂-avgiften på diesel med rundt 20
            prosent. Fra nyttår betaler du 60 øre mer per liter i faste
            avgifter.
          </p>

          <p>
            Stortinget har vedtatt statsbudsjettet for 2025, inkludert nye
            avgiftssatser på drivstoff. Budsjettet ble vedtatt med støtte fra
            Ap, SV, Sp, Rødt og MDG. De nye satsene gjelder fra 1. januar.
          </p>

          <h2 className="text-xl font-bold">Dieselavgiftene: 2024 mot 2025</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    Avgift
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    2024
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    2025
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
                  <td className="py-3 px-4 border-b border-border">
                    2,71 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    2,69 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">−0,02 kr</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border">
                    CO₂-avgift (generell sats)
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    3,17 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    3,79 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">+0,62 kr</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    Sum faste avgifter
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    5,88 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    6,48 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    +0,60 kr
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
            Veibruksavgiften er tilnærmet uendret. Det er CO₂-avgiften som
            driver økningen: fra 3,17 til 3,79 kroner literen, opp 20 prosent på
            ett år. Det generelle avgiftsopplegget ble prisjustert med rundt 3
            prosent for inflasjon, men CO₂-avgiften øker langt utover det.
          </p>

          <h2 className="text-xl font-bold">CO₂-avgiften siden 2022</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    År
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    CO₂-avgift
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    Veibruksavgift
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    Sum
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b border-border">2022</td>
                  <td className="py-3 px-4 border-b border-border">
                    2,05 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    3,52 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    5,57 kr/l
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border">2023</td>
                  <td className="py-3 px-4 border-b border-border">
                    2,53 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    3,07 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    5,60 kr/l
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border">2024</td>
                  <td className="py-3 px-4 border-b border-border">
                    3,17 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    2,71 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    5,88 kr/l
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    2025
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    3,79 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    2,69 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    6,48 kr/l
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            CO₂-avgiften har økt 85 prosent på tre år – fra 2,05 til 3,79 kroner
            literen. I samme periode har veibruksavgiften gått ned fra 3,52 til
            2,69 kroner. Mønsteret er tydelig: staten skifter avgiftsgrunnlaget
            fra veibruk til CO₂.
          </p>

          <p>
            Nettoresultatet er likevel en økning. De samlede faste avgiftene på
            en liter diesel har gått fra 5,57 kroner i 2022 til 6,48 kroner i
            2025 – opp 91 øre.
          </p>

          <h2 className="text-xl font-bold">Hva betyr det i kroner?</h2>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Regneeksempel – økning fra 2024 til 2025
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Personbil</strong> (ca. 1 500 liter/år): økningen koster
                rundt <strong>900 kr mer</strong> i året (før MVA).
              </li>
              <li>
                <strong>Vogntog</strong> (ca. 35 000 liter/år): økningen utgjør
                omtrent <strong>21 000 kr mer</strong> i året.
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              MVA på 25 % kommer i tillegg for kjøretøy uten fradragsrett.
            </p>
          </div>

          <h2 className="text-xl font-bold">Bensin: større kutt enn diesel</h2>

          <p>
            Veibruksavgiften på bensin ble kuttet fra 4,62 til 4,16 kroner
            literen – en nedgang på 46 øre. Til sammenligning fikk diesel bare 2
            øre i kutt. NAF og flere har påpekt skjevheten. CO₂-avgiften på
            bensin øker samtidig fra 2,72 til 3,25 kroner, men nettoeffekten for
            bensinbilister er likevel flatere enn for diesel.
          </p>

          <h2 className="text-xl font-bold">Politisk uenighet</h2>

          <p>
            Budsjettavtalen ble inngått mellom Ap, SV, Sp, Rødt og MDG. FrP har
            gjentatte ganger stemt mot økningene i CO₂-avgiften. Sp har også,
            når de har stått utenfor regjering, vært kritiske til tempoet i
            opptrappingen. Kritikerne peker på at økningen rammer
            transportnæringen, distriktssjåfører og næringer med høyt
            dieselforbruk hardest.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Oppsummert
            </p>
            <ul className="space-y-2 text-sm">
              <li>CO₂-avgiften øker 20 % – fra 3,17 til 3,79 kr/l.</li>
              <li>Veibruksavgiften er tilnærmet flat (−2 øre).</li>
              <li>Samlet avgiftsøkning: 60 øre/liter før MVA.</li>
              <li>
                Siden 2022 har CO₂-avgiften økt 85 %, mens veibruksavgiften er
                kuttet.
              </li>
              <li>Alle satser gjelder fra 1. januar 2025.</li>
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
                  href="/nyheter/dieselavgiftene-for-2024-co2-avgiften-stiger-videre"
                >
                  Dieselavgiftene for 2024: CO₂-avgiften stiger videre
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/dieselavgiftene-for-2026-er-vedtatt"
                >
                  Dieselavgiftene for 2026 er vedtatt
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

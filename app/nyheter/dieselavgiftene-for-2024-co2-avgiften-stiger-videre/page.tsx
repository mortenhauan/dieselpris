import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Dieselavgiftene for 2024: CO₂-avgiften stiger videre";
const DESCRIPTION =
  "CO₂-avgiften på diesel øker 25 prosent fra nyttår. Veibruksavgiften senkes noe, men samlet betaler du 43 øre mer per liter i faste avgifter.";
const SLUG = "dieselavgiftene-for-2024-co2-avgiften-stiger-videre";
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
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/avgiftssatser-2024/id3016920/",
    label: "Regjeringen: avgiftssatser 2024",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Saker/Sak/?p=96889",
    label: "Stortinget: skatter og avgifter 2024",
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
          publishedAtIso="2023-12-19T17:00:00+01:00"
          description={DESCRIPTION}
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            CO₂-avgiften på diesel stiger 25 prosent fra nyttår.
            Veibruksavgiften settes ned med 21 øre, men CO₂-avgiften øker med 64
            øre. Netto betaler du 43 øre mer per liter i faste avgifter.
          </p>
          <p>
            Stortinget har ferdigbehandlet statsbudsjettet for 2024. Mønsteret
            fortsetter: veibruksavgiften går litt ned, CO₂-avgiften går mye opp,
            og summen per liter øker.
          </p>
          <h2 className="text-xl font-bold">Satsene: 2023 mot 2024</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    Avgift (diesel)
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    2023
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    2024
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
                    2,92 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    2,71 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">−0,21 kr</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border">
                    CO₂-avgift (generell sats)
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    2,53 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    3,17 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">+0,64 kr</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    Sum faste avgifter
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    5,45 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    5,88 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    +0,43 kr
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
            Veibruksavgiften kuttes med 21 øre (−7 %), men CO₂-avgiften øker med
            64 øre (+25 %). Netto avgiftsøkning: 43 øre per liter før moms.
          </p>
          <h2 className="text-xl font-bold">
            CO₂-avgiften har økt 55 prosent på to år
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    År
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    CO₂-avgift diesel
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                    Endring fra året før
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b border-border">2022</td>
                  <td className="py-3 px-4 border-b border-border">
                    2,05 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">—</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border">2023</td>
                  <td className="py-3 px-4 border-b border-border">
                    2,53 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    +0,48 kr (+23 %)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    2024
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    3,17 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    +0,64 kr (+25 %)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Fra 2022 til 2024 har CO₂-avgiften på diesel gått fra 2,05 til 3,17
            kroner literen – en økning på 1,12 kroner, eller 55 prosent på to
            år.
          </p>

          <h2 className="text-xl font-bold">Hva betyr det i kroner?</h2>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Regneeksempel (43 øre/liter mer)
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Personbil/varebil</strong> (ca. 1 500 liter/år):
                avgiftsøkningen koster rundt <strong>645 kr mer</strong> i året
                (før MVA).
              </li>
              <li>
                <strong>Vogntog</strong> (ca. 35 000 liter/år): økningen utgjør
                omtrent <strong>15 000 kr mer</strong> i året.
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              MVA på 25 % kommer i tillegg for kjøretøy uten fradragsrett.
            </p>
          </div>

          <h2 className="text-xl font-bold">Skiftet fra veibruk til CO₂</h2>

          <p>
            Regjeringen flytter bevisst avgiftstrykket fra veibruksavgift til
            CO₂-avgift. For deg som kjører diesel betyr etiketten lite – det er
            summen som teller. I 2023 fjernet regjeringen grunnavgiften på
            mineralolje (1,76 kr/l i 2022), noe som veide opp for fjorårets
            CO₂-økning. I år er det ingen slik motvekt.
          </p>

          <p>
            Bensin følger samme mønster: veibruksavgiften senkes fra 4,70 til
            4,62 kr/l, mens CO₂-avgiften øker fra 2,21 til 2,72 kr/l. Biodiesel
            får samme veibruksavgift som vanlig diesel: 2,71 kr/l.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Oppsummert
            </p>
            <ul className="space-y-2 text-sm">
              <li>Veibruksavgift diesel ned 21 øre til 2,71 kr/l.</li>
              <li>CO₂-avgift diesel opp 64 øre til 3,17 kr/l (+25 %).</li>
              <li>Samlet avgiftsøkning: 43 øre/liter før MVA.</li>
              <li>CO₂-avgiften har steget 55 % på to år (2022–2024).</li>
              <li>Alle satser gjelder fra 1. januar 2024.</li>
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
                  href="/nyheter/dieselavgiftene-for-2025-nok-et-ar-med-okt-co2-avgift"
                >
                  Dieselavgiftene for 2025: nok et år med økt CO₂-avgift
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

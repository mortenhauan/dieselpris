import type { Metadata } from "next";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Dieselavgiftene for 2026 er vedtatt";
const DESCRIPTION =
  "Stortinget har vedtatt neste års avgifter. CO2-avgiften på diesel øker med over 60 øre per liter. Slik slår det ut for deg.";
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
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Saker/Sak/?p=104896",
    label: "Stortinget: skatter og avgifter 2026",
  },
  {
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/avgiftssatser-2026/id3121982/",
    label: "Regjeringen: avgiftssatser 2026",
  },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          category="Nyhet"
          publishedAtIso="2025-12-22T18:00:00+01:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Stortinget har vedtatt neste års avgifter. CO₂-avgiften på diesel
            øker med over 60 øre per liter. For en vanlig dieselbil betyr det
            rundt tusen kroner mer i året. For et vogntog kan det bli over 20
            000.
          </p>

          <p>
            Den 18. og 22. desember stemte Stortinget over statsbudsjettet for
            2026, inkludert alle avgiftssatser på drivstoff. Budsjettet ble
            vedtatt med støtte fra Ap, Sp, SV, Rødt og MDG. De nye satsene
            gjelder fra 1. januar.
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
                  <td className="py-3 px-4 border-b border-border">
                    2,25 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    2,28 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">+0,03 kr</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border">
                    CO₂-avgift (generell sats)
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    3,79 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">
                    4,42 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border">+0,63 kr</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    Sum faste avgifter
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    6,04 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    6,70 kr/l
                  </td>
                  <td className="py-3 px-4 border-b border-border font-semibold">
                    +0,66 kr
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
            Veibruksavgiften øker bare med 3 øre – en ren prisjustering. Det er
            CO₂-avgiften som trekker opp: fra 3,79 til 4,42 kroner literen, en
            økning på 17 prosent på ett år. Til sammen går de faste avgiftene
            opp med 66 øre per liter før moms.
          </p>

          <h2 className="text-xl font-bold">Hva betyr det i kroner?</h2>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Regneeksempel
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Personbil</strong> (ca. 1 500 liter/år): avgiftsøkningen
                koster rundt <strong>1 000 kr mer</strong> i året (før MVA).
              </li>
              <li>
                <strong>Vogntog</strong> (ca. 35 000 liter/år): økningen utgjør
                omtrent <strong>23 000 kr mer</strong> i året.
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              MVA på 25 % kommer i tillegg for kjøretøy uten fradragsrett.
            </p>
          </div>

          <h2 className="text-xl font-bold">Ny struktur for CO₂-avgiften</h2>

          <p>
            I tillegg til selve satsøkningen har CO₂-avgiften fått en ny
            struktur. Etter godkjenning fra ESA (EFTAs overvåkingsorgan) er
            systemet lagt om for å unngå dobbeltprising av virksomheter som
            allerede betaler for utslippskvoter.
          </p>

          <p>
            Det betyr at autodiesel, anleggsdiesel og sjøfart kan få ulike
            satser framover. Detaljene i de sektorvise satsene vil bli viktige å
            følge for anlegg, fiske og kystfart – men hovedbildet for vanlig
            veidiesel er klart: 4,42 kroner literen fra nyttår.
          </p>

          <h2 className="text-xl font-bold">Hvorfor øker CO₂-avgiften?</h2>

          <p>
            Økningen er del av regjeringens klimapolitikk. Målet er å gjøre
            fossilt drivstoff gradvis dyrere, slik at utslippene går ned over
            tid. CO₂-avgiften har steget hvert år de siste årene, og budsjettet
            for 2026 fortsetter den trenden.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Oppsummert
            </p>
            <ul className="space-y-2 text-sm">
              <li>Veibruksavgiften øker marginalt (+3 øre).</li>
              <li>CO₂-avgiften øker kraftig (+63 øre, opp 17 %).</li>
              <li>Samlet avgiftsøkning: ca. 66 øre/liter før MVA.</li>
              <li>
                Ny CO₂-struktur gir ulike satser for vei, anlegg og sjøfart.
              </li>
              <li>Alle satser gjelder fra 1. januar 2026.</li>
            </ul>
          </div>
        </NewsArticleLayout>
      </main>
    </div>
  );
};

export default Page;

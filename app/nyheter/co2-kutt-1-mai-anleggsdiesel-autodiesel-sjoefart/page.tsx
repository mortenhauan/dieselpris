import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "CO₂-avgiften på anleggsdiesel og autodiesel kuttes fra 1. mai";
const DESCRIPTION =
  "Stoltenberg bekrefter kuttet fra 1. mai. Anleggsdiesel sparer 3,13 kr/l, autodiesel 1,66 kr/l ekstra. Men ESA-avklaringen er ikke ferdig.";
const SLUG = "co2-kutt-1-mai-anleggsdiesel-autodiesel-sjoefart";
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
    href: "https://lovdata.no/forskrift/2026-03-30-525",
    label:
      "Lovdata: Finansdepartementets vedtak om utsatt iverksettelse (nr. 525/2026)",
  },
  {
    href: "https://lovdata.no/forskrift/2026-03-26-483",
    label: "Lovdata: Stortingsvedtak om autodiesel (nr. 483/2026)",
  },
  {
    href: "https://lovdata.no/forskrift/2026-03-26-484",
    label: "Lovdata: Stortingsvedtak om anleggsdiesel (nr. 484/2026)",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811",
    label: "Stortinget: vedtakene fra 26. mars 2026",
  },
  {
    href: "https://www.regjeringen.no/no/aktuelt/oppfolging-av-stortingets-vedtak-om-reduksjon-i-avgifter-pa-drivstoff/id3155277/",
    label: "Regjeringen: oppfølging av Stortingets vedtak (30. mars 2026)",
  },
  {
    href: "https://www.nrk.no/nyheter/stoltenberg-svarer-vedum---lover-flere-dieselkutt-1.17838837",
    label: "NRK: Stoltenberg bekrefter 1. mai (8. april 2026)",
  },
  {
    href: "https://www.vg.no/nyheter/i/6q4nkL/jens-stoltenberg-lover-diesel-priskutt-innen-1-mai",
    label: "VG: Stoltenberg lover diesel-priskutt innen 1. mai (8. april 2026)",
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
          publishedAtIso="2026-04-20T14:00:00+02:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Finansdepartementet fastsatte 30. mars at CO₂-kuttene for
            anleggsdiesel, autodiesel, sjøfart og fiske i nære farvann trer i
            kraft 1. mai. Finansminister Stoltenberg har bekreftet datoen – men
            advarer om at bedriftene kan måtte tilbakebetale kuttet hvis ESA
            senere dømmer det som ulovlig statsstøtte.
          </p>

          <p>
            Da regjeringen la frem sin oppfølging av Stortingets vedtak 30.
            mars, iverksatte de bare deler av kuttene med én gang. Resten ble
            utsatt fordi de krevde avklaring mot EØS-reglene om statsstøtte.
            Finansdepartementet utstedte samtidig et eget vedtak som satte 1.
            mai som iverksettelsesdato – den absolutte fristen Stortinget hadde
            satt.
          </p>

          <div className="rounded-2xl border border-accent/25 bg-accent/8 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Nye CO₂-satser fra 1. mai
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                      Drivstofftype
                    </th>
                    <th className="border-b border-border px-4 py-3 text-right font-semibold text-foreground">
                      Nå
                    </th>
                    <th className="border-b border-border px-4 py-3 text-right font-semibold text-foreground">
                      Fra 1. mai
                    </th>
                    <th className="border-b border-border px-4 py-3 text-right font-semibold text-foreground">
                      Sparing inkl. MVA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3">Anleggsdiesel</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      4,42 kr/l
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      1,92 kr/l
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-accent">
                      −3,13 kr/l
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3">Autodiesel</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      4,42 kr/l
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      3,09 kr/l
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-accent">
                      −1,66 kr/l
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3">Innenriks sjøfart</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      4,42 kr/l
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      3,17 kr/l
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-accent">
                      −1,56 kr/l
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3">Kvotepliktig sjøfart</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      2,15 kr/l
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      0,90 kr/l
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-accent">
                      −1,56 kr/l
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Fiske i nære farvann</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      generell sats
                    </td>
                    <td className="px-4 py-3 text-right font-medium">0 kr/l</td>
                    <td className="px-4 py-3 text-right font-semibold text-accent">
                      ned til 0
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Sparing inkl. MVA = avgiftsreduksjon × 1,25. Gjelder frem til 1.
              september 2026.
            </p>
          </div>

          <h2 className="text-xl font-bold">
            Anleggsbransjen: ingen kutt fra april – alt fra mai
          </h2>

          <p>
            Anleggsdiesel (rødt diesel til gravemaskiner, bulldosere og annet
            anleggsutstyr) betaler ikke veibruksavgift. Det betyr at
            april-kuttet der avgiften ble satt til null, ikke gjaldt for
            anleggsbransjen. Fra 1. mai er CO₂-avgiften på anleggsdiesel ned fra
            4,42 til 1,92 kroner per liter.
          </p>

          <p>
            En gravemaskin som bruker 300 liter per dag sparer 750 kroner per
            dag i CO₂-avgift alene. Over hele perioden frem til 1. september –
            123 dager fra 1. mai – er det over 90 000 kroner i lavere
            avgiftskostnad.
          </p>

          <h2 className="text-xl font-bold">
            Lastebil og buss: enda et kutt oppå april
          </h2>

          <p>
            Lastebiler og busser som kjører på autodiesel fikk kutt i
            veibruksavgiften fra 1. april. Dersom hele avgiftsreduksjonen veltes
            over i pumpeprisen, gir det 2,85 kroner per liter lavere pris
            inkludert MVA – slik regjeringen selv anslår. Fra 1. mai kommer
            ytterligere 1,66 kroner per liter i CO₂-avgiftkutt.
          </p>

          <p>
            Samlet indikativ prisvirkning for autodiesel fra april til september
            er dermed rundt 4,51 kroner per liter inkludert MVA – igjen gitt at
            hele reduksjonen slår ut i pumpeprisen. For et vogntog som tanker
            600 liter tilsvarer det i så fall rundt 2 700 kroner spart per
            fylling sammenlignet med prisene før 1. april.
          </p>

          <h2 className="text-xl font-bold">
            Hva er det juridiske grunnlaget?
          </h2>

          <p>
            Stortingets vedtak fra 26. mars satte 1. april som startdato, men ga
            regjeringen anledning til å utsette inntil 1. mai dersom det var
            «strengt nødvendig». Finansdepartementet brukte denne muligheten og
            fastsatte 30. mars at vedtakene om autodiesel, anleggsdiesel og
            sjøfart trer i kraft 1. mai 2026.
          </p>

          <p>
            Finansminister Jens Stoltenberg bekreftet 8. april offentlig at
            kuttene kommer på dato. For å rekke fristen dropper regjeringen
            vanlige høringer på forskriftene.
          </p>

          <h2 className="text-xl font-bold">
            Men: tilbakebetaling er ikke utelukket
          </h2>

          <p>
            Stoltenberg har samtidig advart om at den EØS-rettslige avklaringen
            ikke er ferdig. Til NRK 8. april sa han:
          </p>

          <blockquote className="border-l-4 border-accent/50 pl-5 italic text-muted-foreground">
            Det vil ta lengre tid å avklare de EØS-rettslige spørsmålene om
            statsstøtte. Det vil derfor være risiko knyttet til om vedtakene kan
            innebære ulovlig statsstøtte […]
          </blockquote>

          <p>
            Til VG sa han at det er «for tidlig å spekulere i» hva som skjer om
            EFTAs overvåkingsorgan ESA senere kommer tilbake og sier kuttene
            bryter statsstøtteregelverket. I verste fall kan bedrifter som har
            fått avgiftskuttet bli pålagt å betale tilbake hele besparelsen i
            etterkant.
          </p>

          <p>
            For anleggsentreprenører, rederier og andre som skal planlegge
            kostnader gjennom sommeren betyr det at kuttet er reelt fra 1. mai,
            men at det foreløpig hviler på regjeringens egen vurdering – ikke på
            en ESA-godkjenning.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Kort oppsummert
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                CO₂-avgiften på anleggsdiesel, autodiesel, sjøfart og fiske i
                nære farvann kuttes fra 1. mai
              </li>
              <li>
                Finansdepartementet fastsatte 30. mars 1. mai som juridisk
                iverksettelsesdato
              </li>
              <li>
                Anleggsdiesel: 3,13 kr/l billigere inkl. MVA – det første kuttet
                for anleggsbransjen
              </li>
              <li>
                Autodiesel: 1,66 kr/l ekstra i CO₂-kutt; samlet indikativ
                prisvirkning fra april er 4,51 kr/l inkl. MVA ved full
                overveltning
              </li>
              <li>Alle kuttene gjelder frem til 1. september 2026</li>
              <li>
                ESA-avklaringen er ikke ferdig – i verste fall kan bedrifter
                måtte tilbakebetale besparelsen
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
                  href="/nyheter/co2-kutt-som-ikke-er-klare-enda"
                >
                  Flere CO₂-kutt er vedtatt, men ennå ikke satt i verk
                </Link>{" "}
                – bakgrunn om EØS-avklaringen
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart"
                >
                  Slik påvirkes prisen for autodiesel, anleggsdiesel og sjøfart
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

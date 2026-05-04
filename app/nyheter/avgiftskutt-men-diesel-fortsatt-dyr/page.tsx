import type { Metadata } from "next";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Avgiftskutt er nå i kraft – men diesel er fortsatt dyr";
const DESCRIPTION =
  "CO₂-avgiften ble kuttet fra 1. mai, men høy råvarepris gjør at mange ikke merker hele lettelsen ved pumpen.";
const SLUG = "avgiftskutt-men-diesel-fortsatt-dyr";
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
      "Lovdata: Finansdepartementets vedtak om iverksettelse 1. mai (nr. 525/2026)",
  },
  {
    href: "https://lovdata.no/forskrift/2026-03-26-483",
    label: "Lovdata: Stortingsvedtak om CO₂-avgift autodiesel (nr. 483/2026)",
  },
  {
    href: "https://lovdata.no/forskrift/2026-03-26-484",
    label:
      "Lovdata: Stortingsvedtak om CO₂-avgift anleggsdiesel (nr. 484/2026)",
  },
  {
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/avgiftssatser-2026/id3121982/",
    label: "Regjeringen: avgiftssatser 2026",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Sporsmal/Skriftlige-sporsmal-og-svar/Skriftlig-sporsmal/?qnid=122883",
    label: "Stortinget: skriftlig svar om CO₂-kutt og statsstøtte, 24. april",
  },
  {
    href: "https://www.norges-bank.no/tema/Statistikk/Valutakurser/?tab=currency&id=USD",
    label:
      "Norges Bank: valutakurser USD/NOK (referansekurs hentet 30. april 2026)",
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
          publishedAtIso="2026-05-04T13:25:00+02:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            CO₂-avgiften på autodiesel og anleggsdiesel ble kuttet fra 1. mai,
            som vedtatt av Stortinget. Men på samme tid har ICE gasoil-futures –
            råvaren bak norsk diesel – ligget høyt. Effekten ved pumpen er
            reell, men langt mindre enn avgiftstallene alene skulle tilsi.
          </p>

          <p>
            Mandag 4. mai beregner dieselpris.no råvarekomponenten i norsk
            diesel til rundt 10,31 kroner per liter, basert på ICE ULS1-futures
            på 1 308,50 dollar per tonn og Norges Banks referansekurs på 9,3252
            kroner per dollar. Beregningen bruker ICE-kontraktens tetthet på
            0,845 kg/l. Når råvareleddet ligger så høyt, betyr verdensmarkedet
            mer for pumpeprisen enn avgiftskuttet alene.
          </p>

          <div className="rounded-2xl border border-accent/25 bg-accent/8 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Hva endret seg fra 1. mai?
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                      Drivstofftype
                    </th>
                    <th className="border-b border-border px-4 py-3 text-right font-semibold text-foreground">
                      CO₂ før
                    </th>
                    <th className="border-b border-border px-4 py-3 text-right font-semibold text-foreground">
                      CO₂ nå
                    </th>
                    <th className="border-b border-border px-4 py-3 text-right font-semibold text-foreground">
                      Kutt inkl. MVA
                    </th>
                  </tr>
                </thead>
                <tbody>
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
                  <tr>
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
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Kutt inkl. MVA = avgiftsreduksjon × 1,25. Gjelder frem til 1.
              september 2026. Veibruksavgiften er allerede null fra 1. april.
            </p>
          </div>

          <h2 className="text-xl font-bold">Hva betyr det i praksis?</h2>

          <p>
            CO₂-kuttet på autodiesel er 1,33 kroner per liter før MVA, og 1,66
            kroner inkludert MVA. Dette er en reell avgiftsreduksjon – men den
            kommer oppå at veibruksavgiften allerede er satt til null fra 1.
            april. Samlet teoretisk avgiftslettelse for autodiesel fra april til
            september er dermed rundt 4,51 kroner per liter inkludert MVA,
            forutsatt at hele reduksjonen veltes over i pumpeprisen.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Teoretisk avgiftseffekt – CO₂-kuttet fra 1. mai (autodiesel)
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>60 liter</strong> (personbil): 1,66 × 60 ={" "}
                <strong>ca. 100 kr</strong> spart per fylling
              </li>
              <li>
                <strong>400 liter</strong> (lastebil): 1,66 × 400 ={" "}
                <strong>ca. 664 kr</strong> spart per fylling
              </li>
              <li>
                <strong>30 000 liter per år</strong> (flåte): 1,66 × 30 000 ={" "}
                <strong>ca. 49 800 kr</strong> spart i avgift
              </li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Indikativ avgiftseffekt – ikke faktisk pumpeprisdifferanse, som
              avhenger av lokale priser og råvareprisbevegelser.
            </p>
          </div>

          <h2 className="text-xl font-bold">
            Anleggsdiesel: størst prosentvis lettelse
          </h2>

          <p>
            Anleggsdiesel (rød diesel til gravemaskiner og annet anleggsutstyr)
            betalte ikke veibruksavgift, og fikk dermed ingen fordel av
            april-kuttet. Fra 1. mai er CO₂-avgiften ned fra 4,42 til 1,92
            kroner per liter – et kutt på 2,50 kroner per liter, eller 3,13
            kroner inkludert MVA.
          </p>

          <p>
            En gravemaskin som bruker 300 liter om dagen, sparer inntil 939
            kroner per dag i CO₂-avgift inkludert MVA. For MVA-registrerte
            virksomheter er nettoeffekten 750 kroner per dag, fordi MVA kan
            fradragsføres.
          </p>

          <h2 className="text-xl font-bold">Hvorfor er pumpen likevel dyr?</h2>

          <p>
            Avgiftskuttet er reelt, men råvareprisen har beveget seg i motsatt
            retning. ICE ULS1-gasoilfutures ligger per 4. mai 2026 på 1 308,50
            dollar per tonn. Det bidrar til at råvarekomponenten i prisen – som
            dieselpris.no beregner fra ICE ULS1-futures, ICE-tetthet 0,845 kg/l
            og Norges Banks valutakurs – nå er rundt 10,31 kroner per liter.
          </p>

          <p>
            Når råvaren stiger, spiser det inn i avgiftslettelsene – forenklet
            sagt: avgiften går ned, råvaren går opp, og nettoen for sjåføren er
            mindre enn tabellene over isolert sett viser.
          </p>

          <p>
            Indikative pumpepriser i Norge ligger mandag rundt 21 kroner literen
            for autodiesel, avhengig av aktør og sted. Derfor er ikke
            avgiftskuttet alene nok til å gi en billig dieselhverdag.
          </p>

          <h2 className="text-xl font-bold">
            ESA-avklaringen er fortsatt ikke på plass
          </h2>

          <p>
            For flåteeiere og anleggsentreprenører er det en ekstra usikkerhet:
            finansminister Jens Stoltenberg sa i et skriftlig svar til
            Stortinget 24. april at fire av CO₂-kuttene – for autodiesel,
            anleggsdiesel og to sjøfartssatser – etter all sannsynlighet er
            ulovlig statsstøtte etter EØS-reglene. EFTAs overvåkingsorgan ESA
            har ikke ferdigbehandlet saken.
          </p>

          <p>
            Det betyr at besparelsen er reell nå, men at virksomheter som mottar
            kuttet kan bli pålagt å betale det tilbake hvis ESA senere kjenner
            støtten ulovlig. For private bilister er risikoen lav, men for
            bedrifter som håndterer større volumer er det grunn til å holde
            oversikt over besparelsene inntil saken er avklart.
          </p>

          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              ESA-risiko
            </p>
            <p className="text-sm">
              Kuttene for autodiesel, anleggsdiesel og innenriks sjøfart er
              iverksatt, men lov om offentlig støtte og EØS-reglene åpner for at
              støtte gitt i strid med iverksettelsesforbudet kan kreves tilbake.
              Ingen endelig ESA-avgjørelse foreligger per 4. mai 2026.
            </p>
          </div>
        </NewsArticleLayout>
      </main>
    </div>
  );
};

export default Page;

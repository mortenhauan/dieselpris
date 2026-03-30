import type { Metadata } from "next";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Stortinget sa ja til ETS2 – forslaget om å stoppe ble nedstemt";
const DESCRIPTION =
  "Et bredt flertall stemte ned forslaget om å stanse ETS2. Den nye EU-kvoteprisen på drivstoff kommer til Norge, trolig fra 2028.";
const SLUG = "stortinget-sa-ja-til-ets2";
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
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Saker/Sak/?p=104877",
    label: "Stortinget: saksgang og vedtak",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Publikasjoner/Innstillinger/Stortinget/2025-2026/inns-202526-058s/",
    label: "Innst. 58 S (2025–2026): komitéinnstillingen",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Publikasjoner/Referater/Stortinget/2025-2026/refs-202526-01-29?teleession=10",
    label: "Stortingsdebatten 29. januar 2026",
  },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          category="Nyhet"
          publishedAtIso="2026-02-03T13:00:00+01:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Stortinget stemte i dag over Senterpartiets forslag om å stanse ETS2
            – EUs nye kvotesystem for drivstoff. Et bredt flertall sa nei. Bare
            Sp og FrP stemte for å stoppe. Den nye EU-kvoteprisen på diesel
            kommer til Norge, trolig fra 2028.
          </p>

          <h2 className="text-xl font-bold">
            Tre avstemninger, samme resultat
          </h2>

          <p>
            Stortinget tok tre voteringer. Først ble FrPs forslag om å fjerne
            CO₂-avgiften på områder dekket av ETS2 nedstemt med 119 mot 47.
            Deretter ble Senterpartiets forslag om å stanse ETS2 helt nedstemt
            med 110 mot 55. Til slutt ble komiteens tilråding – at forslaget
            ikke vedtas – godkjent med 109 mot 57 stemmer.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Slik stemte partiene
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-semibold">For å stoppe ETS2:</span>{" "}
                Senterpartiet og Fremskrittspartiet (57 stemmer)
              </li>
              <li>
                <span className="font-semibold">Mot å stoppe ETS2:</span>{" "}
                Arbeiderpartiet, Høyre, SV, Rødt, MDG, Venstre og KrF (109
                stemmer)
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">
            Kjernen i debatten: dobbel avgift
          </h2>

          <p>
            Stortingsdebatten 29. januar handlet i stor grad om ett spørsmål:
            skal norske bilister betale både CO₂-avgift og ETS2-kvotepris
            samtidig? I dag betaler du 3,79 kroner per liter diesel i
            CO₂-avgift. Hvis ETS2 legger seg oppå, kan totalbelastningen bli
            betydelig.
          </p>

          <p>
            Fremskrittspartiet brukte regjeringens egne ord mot den. I
            statsbudsjettet for 2026 fjernet regjeringen CO₂-avgiften på
            luftfart som er dekket av EUs kvotesystem, med følgende begrunnelse:
          </p>

          <blockquote className="border-l-4 border-accent/50 pl-5 italic text-muted-foreground">
            «Ileggelse av både avgift og kvoteplikt innebærer en uhensiktsmessig
            dobbel virkemiddelbruk. Et avgiftsfritak vil gi en mer effektiv
            klimapolitikk ettersom avgift i tillegg til kvoteplikt har begrenset
            eller ingen klimaeffekt.»
          </blockquote>

          <p>
            FrP spurte hvorfor samme logikk ikke gjelder for diesel. Sp pekte på
            at mange i distriktene ikke har noe alternativ til bil – og at
            lastebilsjåfører, bønder og fiskere allerede bærer en høy
            klimaregning.
          </p>

          <h2 className="text-xl font-bold">
            Flertallet: EØS-forpliktelsene veier tyngst
          </h2>

          <p>
            Arbeiderpartiet understreket at Norge kan søke om midlertidig unntak
            og kompensere gjennom andre avgifter dersom det blir nødvendig. EU
            har utsatt oppstarten til 2028, noe Ap mener gir bedre tid til å
            forberede seg.
          </p>

          <p>
            Høyre og Venstre la vekt på at EØS-avtalen er avgjørende for norsk
            økonomi. ETS2-regelverket er allerede gjennomført i norsk lov – å
            stoppe nå ville bety å rive opp vedtatt lovverk. De argumenterte for
            at like regler sikrer at norske bedrifter konkurrerer på samme
            vilkår som i EU.
          </p>

          <p>
            Rødt hadde en mer sammensatt posisjon. Partiet anerkjente at
            klimasamarbeid krever felles regler, men advarte mot at ETS2
            overfører kontroll fra Stortinget til EU-markedet. Rødt viste til
            protestbevegelsen «de gule vestene» i Frankrike i 2018 som eksempel
            på hva som skjer når avgiftsøkninger mangler folkelig forankring.
            Likevel stemte Rødt med flertallet.
          </p>

          <h2 className="text-xl font-bold">Også EU-land vil ha endringer</h2>

          <p>
            Motstanden mot ETS2 finnes ikke bare i Norge. I sommer sendte
            Tsjekkia, Tyskland, Italia, Spania, Polen og 13 andre EU-land brev
            til EU-kommisjonen der de ba om endringer – blant annet at
            kvoteprisen holdes nær gulvet på 45 euro per tonn. Foreløpig har de
            ikke fått gjennomslag.
          </p>

          <h2 className="text-xl font-bold">
            Hva betyr dette for dieselprisen?
          </h2>

          <p>
            Regjeringen la selv frem prisscenarioer i Prop. 104 L. Ved den
            høyeste kvoteprisen på 200 euro per tonn (2020-kroner) kan påslaget
            bli opptil 7,49 kroner per liter diesel og 6,54 kroner per liter
            bensin.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Hva det kan koste deg
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                      Scenario
                    </th>
                    <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                      Ekstra per liter
                    </th>
                    <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                      Per fylling (60 L)
                    </th>
                    <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                      Vogntog per år
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-border/50 px-4 py-3">
                      Lav (45 €/tonn)
                    </td>
                    <td className="border-b border-border/50 px-4 py-3">
                      ca. 1,50 kr
                    </td>
                    <td className="border-b border-border/50 px-4 py-3">
                      ca. 90 kr
                    </td>
                    <td className="border-b border-border/50 px-4 py-3">
                      ca. 30 000 kr
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Høy (200 €/tonn)</td>
                    <td className="px-4 py-3">ca. 7,50 kr</td>
                    <td className="px-4 py-3">ca. 450 kr</td>
                    <td className="px-4 py-3">ca. 150 000 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Vogntog-anslaget forutsetter ca. 20 000 liter diesel i året.
              Endelig påslag avhenger av kvotepris, valutakurs og eventuelle
              kompenserende avgiftskutt fra regjeringen.
            </p>
          </div>

          <h2 className="text-xl font-bold">Hva skjer videre?</h2>

          <p>
            EU har utsatt ETS2-oppstarten med ett år, til tidligst 1. januar
            2028. Det gir regjeringen tid til å avklare om CO₂-avgiften skal
            reduseres for å unngå dobbel virkemiddelbruk – slik den allerede har
            gjort for luftfarten. Regjeringen har signalisert at de vil vurdere
            kompenserende tiltak, men ingenting er vedtatt.
          </p>

          <p>
            For deg som kjører på diesel betyr vedtaket at ETS2 ligger fast i
            planene. Det eneste spørsmålet som gjenstår er hvor mye av
            kostnadene som dempes gjennom kutt i andre avgifter.
          </p>
        </NewsArticleLayout>
      </main>
    </div>
  );
};

export default Page;

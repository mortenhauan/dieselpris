import type { Metadata } from "next";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Dieselkutt kommer 1. mai – men kan måtte betales tilbake";
const DESCRIPTION =
  "Stoltenberg sier fire CO₂-kutt etter all sannsynlighet er ulovlig statsstøtte. De kommer 1. mai, men kan kreves tilbake.";
const SLUG = "dieselkutt-kan-vaere-ulovlig-statsstotte";
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
    href: "https://stortinget.no/no/Saker-og-publikasjoner/Sporsmal/Skriftlige-sporsmal-og-svar/Skriftlig-sporsmal/?qnid=122883",
    label: "Stortinget: skriftlig svar fra finansministeren (24. april 2026)",
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
    href: "https://lovdata.no/lov/1992-11-27-109/e%C3%B8sl/a61",
    label: "Lovdata: EØS-avtalen artikkel 61 om statsstøtte",
  },
  {
    href: "https://lovdata.no/lov/2022-03-04-7/%C2%A75",
    label: "Lovdata: støtteprosessloven § 5 om iverksettelsesforbud",
  },
  {
    href: "https://lovdata.no/lov/2022-03-04-7/%C2%A712",
    label: "Lovdata: støtteprosessloven § 12 om tilbakeføring",
  },
  {
    href: "https://www.eftasurv.int/state-aid/state-aid-guidelines",
    label: "ESA: retningslinjer for offentlig støtte",
  },
  {
    href: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:E2022C0029",
    label: "EU/EØS: retningslinjer for klima-, miljø- og energistøtte fra 2022",
  },
  {
    href: "https://regjeringen.no/no/aktuelt/avvikler-klimaavgift-for-virksomheter-med-kvoteplikt/id3150513/",
    label: "Regjeringen: CO₂-avgift avvikles for kvotepliktige virksomheter",
  },
  {
    href: "https://www.regjeringen.no/no/aktuelt/oppfolging-av-stortingets-vedtak-om-reduksjon-i-avgifter-pa-drivstoff/id3155277/",
    label: "Regjeringen: oppfølging av drivstoffvedtakene (30. mars 2026)",
  },
  {
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/avgiftssatser-2026/id3121982/",
    label: "Regjeringen: avgiftssatser 2026",
  },
  {
    href: "https://e24.no/norsk-oekonomi/i/Okykmb/dette-er-stoltenbergs-drivstoff-dilemma",
    label: "E24: kommentar om Stoltenbergs drivstoffdilemma",
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
          publishedAtIso="2026-04-25T10:15:00+02:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            CO₂-kuttene for autodiesel, anleggsdiesel og deler av sjøfarten
            kommer fortsatt 1. mai. Men finansminister Jens Stoltenberg sier nå
            at fire av kuttene etter all sannsynlighet er ulovlig statsstøtte.
            Da kan bedrifter i verste fall måtte betale støtten tilbake senere.
          </p>

          <p>
            Svaret kom i et skriftlig svar til Stortinget 24. april. Der skriver
            Stoltenberg at departementet har hatt dialog med ESA, som passer på
            at EØS-reglene om statsstøtte følges. Konklusjonen hans er tydelig:
            kuttene utgjør trolig statsstøtte, og statsstøtten er trolig
            ulovlig.
          </p>

          <p>
            Likevel blir kuttene satt i verk. Stortinget har bestemt at de skal
            gjelde senest fra 1. mai, og regjeringen sier den ikke har fullmakt
            til å vente lenger.
          </p>

          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Dette er risikoen
            </p>
            <p>
              Kuttet kan merkes som lavere kostnad nå. Men støtteprosessloven
              sier at støtte som er gitt i strid med iverksettelsesforbudet,
              skal kreves tilbake. Plikten kan falle bort hvis ESA senere
              godkjenner støtten som forenlig med EØS-avtalen. For en lastebil
              som fyller 600 liter autodiesel, er CO₂-kuttet alene rundt 998
              kroner per fylling inkludert MVA. For en anleggsmaskin som bruker
              300 liter om dagen, er kuttet rundt 938 kroner per dag.
              MVA-registrerte virksomheter fører vanligvis MVA fradrag, slik at
              direkte kostnadseffekt før MVA er lavere.
            </p>
          </div>

          <h2 className="text-xl font-bold">Hvilke kutt er problemet?</h2>

          <p>
            Stoltenberg peker på fire vedtak: lavere CO₂-avgift for autodiesel
            (595), anleggsdiesel (596), innenriks sjøfart uten kvoteplikt (597)
            og innenriks sjøfart med kvoteplikt (593). Fellesnevneren er at de
            gir lavere avgift til bestemte bruksområder, ikke til alle utslipp
            som avgiften vanligvis dekker.
          </p>

          <p>
            Autodiesel får CO₂-avgiften ned fra 4,42 til 3,09 kroner per liter.
            Med MVA er det 1,66 kroner per liter i lavere kostnad dersom hele
            kuttet slår ut i prisen. Anleggsdiesel går fra 4,42 til 1,92 kroner
            per liter, som gir 3,13 kroner per liter inkludert MVA.
          </p>

          <p>
            Dette kommer på toppen av at veibruksavgiften på autodiesel allerede
            er satt til null fra 1. april til 1. september. Det kuttet er ikke
            den vanskelige delen i svaret fra Stoltenberg. Det er de selektive
            CO₂-kuttene som skaper EØS-risikoen.
          </p>

          <h2 className="text-xl font-bold">
            Hvorfor kan dette være statsstøtte?
          </h2>

          <p>
            EØS-avtalen artikkel 61 forbyr støtte fra staten som vrir eller kan
            vri konkurransen ved å begunstige enkelte foretak eller enkelte
            varer. En avgiftslettelse kan være slik støtte hvis den gir noen
            virksomheter en fordel konkurrenter ikke får.
          </p>

          <p>
            Det avgjørende er derfor ikke bare om formålet er å få ned
            drivstoffregningen. Spørsmålet er om avgiftssystemet behandler like
            utslipp og like virksomheter likt. Hvis én type mineralolje til én
            næring får lavere CO₂-avgift enn andre drivstoff eller næringer i
            samme situasjon, kan det bli en selektiv fordel.
          </p>

          <p>
            ESA og EU-kommisjonen bruker vanligvis en tretrinnstest for slike
            skattesaker: Hva er den normale avgiften? Avviker tiltaket fra den?
            Og kan avviket forklares av avgiftens egen logikk? Stoltenbergs svar
            sier at de nye kuttene bryter med CO₂-systemet ESA nylig aksepterte.
          </p>

          <h2 className="text-xl font-bold">
            Det gamle problemet var dobbelt betaling
          </h2>

          <p>
            Bakgrunnen er kvotesystemet. Noen virksomheter betaler allerede for
            CO₂-utslipp gjennom EUs kvotesystem. Norge har i flere år forsøkt å
            unngå at disse virksomhetene både betaler kvoter og full CO₂-avgift
            for samme utslipp.
          </p>

          <p>
            Fra 1. mars 2026 fikk Norge på plass en ny struktur: utslipp utenfor
            kvotesystemet betaler generell sats, utslipp som bare er
            kvotepliktige fritas, og utslipp som både er kvotepliktige og
            omfattet av innsatsfordelingen får redusert sats. Regjeringen sier
            dette er systemet ESA har akseptert.
          </p>

          <p>
            De nye drivstoffkuttene passer ikke inn i den strukturen.
            Stoltenberg advarer derfor om at Norge i verste fall kan risikere
            mer enn disse fire kuttene. Hvis systemet rakner, kan kvotepliktig
            industri, luftfart og sjøfart igjen måtte betale både kvoter og
            CO₂-avgift.
          </p>

          <h2 className="text-xl font-bold">
            Hva betyr dette for deg som kjøper diesel?
          </h2>

          <p>
            For vanlige bilister og transportbedrifter er hovedbildet enkelt:
            prisen kan bli lavere fra 1. mai hvis avgiftskuttet veltes over i
            pumpeprisen. Men usikkerheten ligger hos virksomhetene som får
            fordelen, særlig der kuttet skjer gjennom refusjon eller
            bruksbestemte satser.
          </p>

          <p>
            For flåteeiere og entreprenører betyr det at besparelsen bør
            behandles som usikker helt til EØS-spørsmålet er avklart. En
            entreprenør som sparer 938 kroner dagen på én maskin, kan få en
            tydelig likviditetseffekt nå. Men hvis støtten senere kreves
            tilbake, kan det samme beløpet bli en etterregning.
          </p>

          <p>
            Det er ikke det samme som at tilbakebetaling er bestemt. Foreløpig
            finnes det ingen endelig ESA-avgjørelse eller dom. Stoltenbergs svar
            er departementets vurdering etter dialog med ESA.
          </p>

          <h2 className="text-xl font-bold">
            Hvorfor kan ikke Norge bare gjøre det?
          </h2>

          <p>
            Norge bestemmer egne avgifter, men EØS-avtalen setter grenser for
            selektiv støtte til næringslivet. Støtteprosessloven sier også at ny
            støtte som må meldes til ESA, ikke kan settes i verk før ESA har
            godkjent den. Det kalles iverksettelsesforbudet.
          </p>

          <p>
            Hvis støtte likevel gis i strid med forbudet, skal støttegiver kreve
            den tilbake. Loven sier også at det skal betales renter fra den
            dagen støtten ble stilt til mottakerens rådighet. For
            drivstoffkuttene kan dette bli administrativt krevende fordi svært
            mange virksomheter kan være berørt.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Kort oppsummert
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              <li>CO₂-kuttene trer etter planen i kraft 1. mai 2026.</li>
              <li>
                Stoltenberg sier fire kutt etter all sannsynlighet er ulovlig
                statsstøtte.
              </li>
              <li>
                Risikoen gjelder autodiesel, anleggsdiesel og to satser for
                innenriks sjøfart.
              </li>
              <li>
                Autodiesel sparer 1,66 kr/l inkludert MVA hvis hele kuttet slår
                ut i prisen.
              </li>
              <li>
                Anleggsdiesel sparer 3,13 kr/l inkludert MVA, men kan være mer
                utsatt for refusjon og etterkontroll.
              </li>
              <li>
                Tilbakebetaling er ikke bestemt, men er en reell risiko hvis
                støtten senere blir kjent ulovlig.
              </li>
            </ul>
          </div>
        </NewsArticleLayout>
      </main>
    </div>
  );
};

export default Page;

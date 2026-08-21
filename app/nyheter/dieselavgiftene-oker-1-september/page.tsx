import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Dieselavgiftene øker igjen 1. september – slik slår det ut";
const DESCRIPTION =
  "Dieselkuttet utløper 1. september. Finansdepartementet anslår en mulig prisvirkning på 4,26 kr/l for en vanlig dieselblanding.";
const SLUG = "dieselavgiftene-oker-1-september";
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
    href: "https://www.regjeringen.no/no/aktuelt/forskrift-om-redusert-co2-avgift-trer-i-kraft-1.-mai/id3158130/",
    label: "Finansdepartementet: midlertidig redusert CO₂-avgift fra 1. mai",
  },
  {
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/avgiftssatser-2026/id3121982/",
    label: "Finansdepartementet: avgiftssatser 2026",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Sporsmal/Skriftlige-sporsmal-og-svar/Skriftlig-sporsmal/?qnid=120728",
    label: "Stortinget: svar om når veibruksavgiften beregnes",
  },
  {
    href: "https://www.regjeringen.no/no/dokumenter/prop.-95-ls-20252026/id3159628/?ch=9",
    label: "Prop. 95 LS (2025–2026): dieselblanding, avgiftseffekt og CO₂-plan",
  },
  {
    href: "https://www.stortinget.no/globalassets/pdf/dokumentserien/2025-2026/dok15-202526-2607-vedlegg.pdf",
    label: "Finansministerens svar 12. mai: videre opptrapping av CO₂-avgiften",
  },
  {
    href: "https://www.regjeringen.no/no/aktuelt/utsetter-kvoteplikten-med-ett-ar/id3148939/",
    label: "Klima- og miljødepartementet: ETS2-kvoteplikten utsatt til 2028",
  },
  {
    href: "https://www.skatteetaten.no/bedrift-og-organisasjon/rapportering-og-bransjer/bransjer-med-egne-regler/transport-overnatting-service/varetransport-og-budtjenester/",
    label: "Skatteetaten: MVA-fradrag for drivstoff i transportvirksomhet",
  },
];

const Page = () => (
  <div className="min-h-screen bg-background">
    <Header activeNav="news" variant="content" />
    <main>
      <NewsArticleLayout
        canonicalUrl={CANONICAL}
        category="Nyhet"
        description={DESCRIPTION}
        publishedAtIso="2026-08-21T11:00:00+02:00"
        sources={SOURCES}
        title={TITLE}
      >
        <p className="text-lg font-medium">
          De midlertidige avgiftskuttene på diesel utløper tirsdag 1. september.
          For autodiesel øker veibruksavgiften med 2,28 kroner literen og
          CO₂-avgiften på mineraloljedelen med 1,33 kroner. For en blanding med
          85 prosent mineralolje og 15 prosent biodiesel anslår
          Finansdepartementet en mulig prisvirkning på 4,26 kroner per liter
          inkludert MVA, dersom hele økningen veltes over i prisen.
        </p>

        <p>
          Det er en mulig avgiftseffekt, ikke et varsel om en bestemt pumpepris.
          Råvarepris, dollarkurs, konkurranse og stasjonens lager avgjør hva som
          faktisk står på skiltet.
        </p>

        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Vanlig veidiesel fra 1. september
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Veibruksavgift:</strong> 0,00 → 2,28 kr/l
            </li>
            <li>
              <strong>CO₂-avgift på mineraloljedelen:</strong> 3,09 → 4,42 kr/l
            </li>
            <li>
              <strong>CO₂-effekt i en 85/15-blanding:</strong> ca. 1,13 kr/l før
              MVA
            </li>
            <li>
              <strong>Samlet i samme blanding:</strong> ca. 3,41 kr/l før MVA
            </li>
            <li>
              <strong>Mulig utslag inkl. MVA:</strong> 4,26 kr/l dersom hele
              endringen veltes over
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-bold">Hva kan det bety ved fylling?</h2>

        <p>
          For en privatbil eller varebil med 60 liter diesel tilsvarer 4,26
          kroner per liter omtrent 256 kroner. En 400-liters tank tilsvarer
          omtrent 1 704 kroner. Begge regnestykkene forutsetter at den fulle
          avgiftsøkningen blir en del av utsalgsprisen.
        </p>

        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Regneeksempler for autodiesel
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>60 liter:</strong> 4,26 × 60 = <strong>ca. 256 kr</strong>{" "}
              inkludert MVA
            </li>
            <li>
              <strong>400 liter:</strong> 4,26 × 400 ={" "}
              <strong>ca. 1 704 kr</strong> inkludert MVA
            </li>
            <li>
              <strong>
                30 000 liter i en transportvirksomhet med fradragsrett:
              </strong>{" "}
              3,41 × 30 000 = <strong>ca. 102 300 kr</strong> ekskludert MVA
            </li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Regneeksemplene bruker samme 85/15-blanding som Finansdepartementets
            anslag. Virksomhetseksempelet gjelder dersom alle literne kjøpes med
            de høyere 2026-satsene. Fradragsretten avhenger av kjøretøyet og
            bruken. Det er som hovedregel ikke MVA-fradrag for drivstoff til
            personbil eller varebil klasse 1.
          </p>
        </div>

        <h2 className="text-xl font-bold">
          Avgiften endres før pumpen nødvendigvis gjør det
        </h2>

        <p>
          Veibruksavgiften beregnes når drivstoffet tas ut av et tankanlegg for
          videre distribusjon, ikke når du fyller tanken. Drivstoff som er tatt
          ut før 1. september, har nullsats for veibruksavgiften selv om det
          selges senere fra en energistasjon.
        </p>

        <p>
          Stasjonene må derfor ikke endre prisen akkurat ved midnatt. Når
          kostnaden slår ut, avhenger av lageret, nye leveranser og hver enkelt
          kjedes prissetting.
        </p>

        <h2 className="text-xl font-bold">
          Anleggsdiesel, fiske og sjøfart får egne satser
        </h2>

        <p>
          Anleggsdiesel har ikke veibruksavgift. Her er det CO₂-avgiften som går
          fra 1,92 til 4,42 kroner per liter: 2,50 kroner før MVA, eller 3,13
          kroner inkludert MVA. For entreprenører med fradragsrett for
          drivstoffet er den direkte avgiftseffekten 2,50 kroner per liter før
          MVA.
        </p>

        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            CO₂-satser fra 1. september
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Fiske og fangst i nære farvann:</strong> 0,00 → 4,42 kr/l
            </li>
            <li>
              <strong>Innenriks ikke-kvotepliktig sjøfart:</strong> 3,17 → 4,42
              kr/l
            </li>
            <li>
              <strong>Innenriks kvotepliktig sjøfart:</strong> 0,90 → 2,15 kr/l
            </li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Satsene gjelder mineralolje og er oppgitt før MVA. Tabellen viser
            utvalgte satser; andre regler kan gjelde for andre typer bruk.
          </p>
        </div>

        <h2 className="text-xl font-bold">Markedet kan trekke motsatt vei</h2>

        <p>
          Avgiftsøkningen er bare én del av pumpeprisen. Faller dieselråvaren
          eller dollaren før september, kan det motvirke noe av avgiftseffekten.
          Stiger de, kan det forsterke den. Det er derfor ikke mulig å regne ut
          en bestemt lokal pumpepris fra avgiftene alene.
        </p>

        <h2 className="text-xl font-bold">2027 er ikke fastsatt</h2>

        <p>
          Det finnes per 21. august ikke foreslåtte eller vedtatte, konkrete
          dieselavgiftssatser for 2027. Regjeringens plan er likevel å trappe
          CO₂-prisen opp til 2 400 kroner per tonn i 2025-kroner i 2030 og 3 400
          kroner i 2035. De faktiske satsene og eventuelle motvekter i
          veibruksavgiften avgjøres i de årlige budsjettene.
        </p>

        <p>
          Finansministeren har oppgitt at den generelle CO₂-satsen på
          mineralolje i denne planen tilsvarer 6,66 kroner per liter i 2030 og
          9,44 kroner i 2035, målt i 2026-priser. Det er en planlagt bane, ikke
          vedtatte satser. Med den varslede økningen i biodrivstoffinnblandingen
          anslår departementet at avgiftsplanen kan gi rundt 3,40 kroner høyere
          dieselpris per liter inkludert MVA fram til 2035. Et personbilbruk på
          12 000 kilometer i året og 0,6 liter per mil tilsvarer rundt 2 400
          kroner i året i dette anslaget.
        </p>

        <p>
          Samtidig er omsetningskravet for biodrivstoff i veitrafikken planlagt
          økt fra 20 til 33 volumprosent i 2030. Kravet er ikke det samme som
          fysisk innblanding i hver liter. Biodiesel kan også ha en annen
          innkjøpspris enn fossil diesel. Det gjør at det samlede utslaget på
          pumpeprisen ikke kan leses direkte av CO₂-satsen alene.
        </p>

        <p>
          ETS2 endrer også bildet på sikt. Fra 2028 må leverandører av blant
          annet bensin og diesel kjøpe klimakvoter for utslippene drivstoffet
          gir. Hvordan kvotekostnaden slår ut ved pumpen, vil blant annet
          avhenge av kvoteprisen og avgiftsopplegget som gjelder da.
        </p>

        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Les også
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="font-medium underline underline-offset-4"
                href="/nyheter/drivstoffavgiftene-kuttes-fra-1-april"
              >
                Drivstoffavgiftene kuttes fra 1. april – dette er det som skjer
              </Link>
            </li>
            <li>
              <Link
                className="font-medium underline underline-offset-4"
                href="/nyheter/stortinget-sa-ja-til-ets2"
              >
                Stortinget lot ETS2 stå – forslagene om å stoppe ble nedstemt
              </Link>
            </li>
          </ul>
        </div>
      </NewsArticleLayout>
    </main>
  </div>
);

export default Page;

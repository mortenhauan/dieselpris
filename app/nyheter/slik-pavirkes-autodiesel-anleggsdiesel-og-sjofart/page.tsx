import type { Metadata } from "next";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import { SITE_URL } from "@/lib/site-url";

const canonical = `${SITE_URL}/nyheter/slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart`;
const title =
  "Slik påvirkes prisen for autodiesel, anleggsdiesel og sjøfart | Dieselpris.no";
const description =
  "Ikke all diesel er lik. Se hva avgiftsendringene betyr for autodiesel på pumpa, farget anleggsdiesel og drivstoff til fiske og sjøfart.";

export const metadata: Metadata = {
  alternates: { canonical },
  description,
  openGraph: {
    description,
    siteName: "Dieselpris.no",
    title,
    url: canonical,
  },
  title,
  twitter: {
    card: "summary_large_image",
    description,
    title,
  },
};

const Badge = function Badge({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="inline-flex rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
      Bekreftet
    </span>
  ) : (
    <span className="inline-flex rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-700">
      Venter
    </span>
  );
};

const TH =
  "text-left py-3 px-4 font-semibold text-foreground border-b border-border";
const TD = "py-3 px-4 border-b border-border";

const rows: [string, string, string, boolean][] = [
  ["Autodiesel", "Veibruksavgift → 0 kr/l", "1. april", true],
  ["Autodiesel", "CO₂-avgift → 3,09 kr/l", "Senest 1. mai", false],
  ["Anleggsdiesel", "CO₂-avgift → 1,92 kr/l", "Senest 1. mai", false],
  ["Fiske, fjerne farvann", "CO₂-avgift → 0 kr/l", "1. april", true],
  ["Fiske, nære + fjerne", "CO₂-avgift → 0 kr/l", "1. april", true],
  ["Fiske, nære farvann", "CO₂-avgift → 0 kr/l", "Senest 1. mai", false],
  ["Innenriks sjøfart", "CO₂-avgift → 3,17 kr/l", "Senest 1. mai", false],
  ["Kvotepliktig sjøfart", "CO₂-avgift → 0,90 kr/l", "Senest 1. mai", false],
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          category="Forklart"
          publishedAtIso="2026-03-30T11:00:00+02:00"
          sources={[
            {
              href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811",
              label: "Stortinget: alle vedtakene med satser",
            },
            {
              href: "https://www.regjeringen.no/no/aktuelt/oppfolging-av-stortingets-vedtak-om-reduksjon-i-avgifter-pa-drivstoff/id3155277/",
              label: "Regjeringen: hva som er iverksatt",
            },
          ]}
          title="Slik påvirkes prisen for autodiesel, anleggsdiesel og sjøfart"
        >
          <p className="text-lg font-medium">
            Ikke all diesel er lik i denne saken. Avgiftsendringene som
            Stortinget har vedtatt slår ulikt ut avhengig av om du fyller vanlig
            pumpe-diesel, bruker farget anleggsdiesel eller driver fiskebåt. Her
            er en praktisk oversikt over hva som gjelder for din drivstofftype.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            Autodiesel — det du fyller på pumpa
          </h2>
          <p>
            Vanlig autodiesel til biler og lastebiler er rammet av to avgifter:
            veibruksavgift og CO₂-avgift. Veibruksavgiften er satt til 0 kr/l
            fra 1.&nbsp;april til 1.&nbsp;september (ned fra 2,28 kr/l). Det er
            bekreftet og allerede i kraft.
          </p>
          <p>
            Med moms gir dette en besparelse på omtrent{" "}
            <strong>2,85 kr/l på pumpa</strong>.
          </p>
          <p>
            I tillegg vedtok Stortinget å redusere CO₂-avgiften fra 4,42 til
            3,09 kr/l, med virkning senest 1.&nbsp;mai. Men denne delen er{" "}
            <strong>ennå ikke iverksatt</strong>. Regjeringen sier den trenger
            nærmere avklaring. Hvis den trer i kraft, blir det enda billigere —
            men akkurat nå er det kun veibruksavgiften som er fjernet.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            Anleggsdiesel — farget diesel for maskiner
          </h2>
          <p>
            Driver du gravemaskin, hjullaster eller annet tungt utstyr som
            bruker farget diesel? Da har du aldri betalt veibruksavgift, fordi
            maskinene dine ikke kjører på vei. Derfor gir fjerningen av
            veibruksavgiften <strong>null effekt</strong> for deg.
          </p>
          <p>
            Det som kan gi lavere pris er CO₂-avgiften. Stortinget vedtok å
            kutte den til 1,92 kr/l (lavere enn autodieselens 3,09 kr/l) med
            virkning senest 1.&nbsp;mai. Men heller ikke dette er iverksatt
            ennå. Regjeringen peker på at EØS-regler og statsstøtte-vurdering må
            avklares først.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="font-medium">Kort sagt for anleggsdiesel:</p>
            <p>
              Ingen endring i dag. Eventuell besparelse avhenger av CO₂-vedtaket
              som fortsatt venter på iverksetting.
            </p>
          </div>

          <h2 className="text-2xl font-bold tracking-tight">Fiske og fangst</h2>
          <p>
            Har du fiskebåt? Her er bildet delt. Drivstoff til fiske i{" "}
            <strong>fjerne farvann</strong> og til fiske som dekker{" "}
            <strong>både nære og fjerne farvann</strong> har fått CO₂-avgiften
            satt til 0 kr/l fra 1.&nbsp;april. Det er bekreftet og i kraft.
          </p>
          <p>
            For fiske utelukkende i <strong>nære farvann</strong> vedtok
            Stortinget også 0 kr/l, men dette er ennå ikke iverksatt.
          </p>
          <p>
            Hvorfor forskjellen? Fiske i fjerne farvann konkurrerer
            internasjonalt og fikk prioritet. Nære farvann krever en egen
            forskriftsendring som regjeringen fortsatt jobber med.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            Innenriks sjøfart
          </h2>
          <p>
            Driver du innenriks skipsfart — ferger, supplybåter eller fraktskip
            langs kysten? Stortinget vedtok å sette CO₂-avgiften til 3,17 kr/l
            for vanlig innenriks sjøfart og 0,90 kr/l for kvotepliktig innenriks
            sjøfart. Ingen av delene er iverksatt ennå.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            Samletabell: status per drivstofftype
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={TH}>Drivstofftype</th>
                  <th className={TH}>Avgiftsendring</th>
                  <th className={TH}>Fra når</th>
                  <th className={TH}>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([fuel, change, when, ok]) => (
                  <tr key={`${fuel}-${change}`}>
                    <td className={`${TD} font-medium`}>{fuel}</td>
                    <td className={TD}>{change}</td>
                    <td className={TD}>{when}</td>
                    <td className={TD}>
                      <Badge ok={ok} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold tracking-tight">
            Hva betyr «vedtatt, men ikke iverksatt»?
          </h2>
          <p>
            Stortinget har stemt ja til alle satsene i tabellen over. Men flere
            av dem krever forskriftsendringer som regjeringen ennå ikke har
            gjennomført. For anleggsdiesel og noen sjøfartstyper peker
            regjeringen på at EØS-avtalen og regler om statsstøtte må avklares.
            Inntil forskriftene er på plass, gjelder de gamle satsene.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="font-medium">Oppsummert:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>
                <strong>Autodiesel:</strong> 2,85 kr/l billigere inkl. mva fra
                1.&nbsp;april (veibruksavgift). CO₂-kutt kan komme i tillegg.
              </li>
              <li>
                <strong>Anleggsdiesel:</strong> Ingen endring ennå. Venter på
                CO₂-kutt til 1,92 kr/l.
              </li>
              <li>
                <strong>Fiske (fjerne/begge farvann):</strong> 0 kr i CO₂-avgift
                fra 1.&nbsp;april.
              </li>
              <li>
                <strong>Fiske (kun nære farvann):</strong> Vedtatt 0 kr, men
                venter.
              </li>
              <li>
                <strong>Innenriks sjøfart:</strong> Vedtatt lavere satser, men
                venter.
              </li>
            </ul>
          </div>
        </NewsArticleLayout>
      </main>
    </div>
  );
};

export default Page;

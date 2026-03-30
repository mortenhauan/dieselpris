import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Flere CO₂-kutt er vedtatt, men ennå ikke satt i verk";
const DESCRIPTION =
  "Stortinget vedtok lavere CO₂-avgift for anleggsdiesel, sjøfart og autodiesel. Men regjeringen kan ikke gjennomføre alt ennå – fordi det kan bryte med EØS-reglene.";
const SLUG = "co2-kutt-som-ikke-er-klare-enda";
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
    href: "https://www.regjeringen.no/no/aktuelt/oppfolging-av-stortingets-vedtak-om-reduksjon-i-avgifter-pa-drivstoff/id3155277/",
    label: "Regjeringen: oppfølging og statsstøttevurdering",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811",
    label: "Stortinget: vedtakene",
  },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          category="Forklart"
          publishedAtIso="2026-03-30T09:00:00+02:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Du har kanskje hørt at CO₂-avgiften på anleggsdiesel skal ned. Det
            stemmer – Stortinget har vedtatt det. Men endringen gjelder ikke
            ennå.
          </p>

          <p>
            Den 26. mars vedtok Stortinget lavere CO₂-avgift for flere
            drivstofftyper: autodiesel, anleggsdiesel, innenriks sjøfart,
            kvotepliktig sjøfart og fiske i nære farvann. Men da regjeringen 30.
            mars la frem sin oppfølging, var bare deler av vedtaket satt i verk.
          </p>

          <div className="rounded-2xl border border-accent/25 bg-accent/8 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Dette gjelder fra 1. april
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Veibruksavgift = 0 kr/l</strong> for alt drivstoff
                (diesel, bensin, biodiesel, bioetanol, LPG, naturgass)
              </li>
              <li>
                <strong>CO₂-avgift for fiske = 0 kr/l</strong> i fjerne farvann,
                og for fiske som dekker nære og fjerne farvann
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Vedtatt, men venter på avklaring
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Autodiesel:</strong> CO₂-avgift ned til 3,09 kr/l
              </li>
              <li>
                <strong>Anleggsdiesel:</strong> CO₂-avgift ned til 1,92 kr/l
              </li>
              <li>
                <strong>Innenriks sjøfart:</strong> CO₂-avgift ned til 3,17 kr/l
              </li>
              <li>
                <strong>Kvotepliktig sjøfart:</strong> CO₂-avgift ned til 0,90
                kr/l
              </li>
              <li>
                <strong>Fiske i nære farvann:</strong> CO₂-avgift ned til 0 kr/l
                (egen sats)
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">
            Hvorfor kan det ikke bare settes i verk?
          </h2>

          <p>
            Norge har gjennom EØS-avtalen forpliktet seg til regler om
            statsstøtte. Kort sagt: staten kan ikke gi enkeltbransjer store
            skatteletter uten at det er godkjent, fordi det kan forvri
            konkurransen i det felles europeiske markedet.
          </p>

          <p>
            CO₂-avgiftssystemet ble nylig omstrukturert for å unngå at norske
            bedrifter betaler dobbelt – både CO₂-avgift og EU-kvotepris. ESA,
            som er EFTAs overvåkingsorgan, godkjente den nye strukturen. Flere
            av satsene Stortinget nå har vedtatt kan bryte med det godkjente
            opplegget.
          </p>

          <p>
            Dersom endringene gjennomføres uten avklaring og senere viser seg å
            være ulovlig statsstøtte, risikerer bedriftene som har fått
            avgiftsletten å måtte betale tilbake hele besparelsen i etterkant.
          </p>

          <h2 className="text-xl font-bold">
            Hva betyr det for deg som driver anlegg eller sjøfart?
          </h2>

          <p>
            Det betyr at du ikke kan legge de nye CO₂-satsene inn i kalkylen din
            ennå. Stortinget har sagt hva de vil, men vedtaket er ikke satt i
            verk. Skal du planlegge drivstoffkostnader for våren og sommeren, må
            du forholde deg til satsene som faktisk gjelder i dag.
          </p>

          <p>
            I tillegg krever noen av endringene forskriftsendring og en
            høringsprosess, som tar tid. Regjeringen har ikke gitt en konkret
            dato.
          </p>

          <h2 className="text-xl font-bold">Hva sier regjeringen?</h2>

          <p>
            Regjeringen sier de vil følge opp Stortingets vedtak «så raskt som
            mulig». Finansminister Stoltenberg sa under debatten:
          </p>

          <blockquote className="border-l-4 border-accent/50 pl-5 italic text-muted-foreground">
            Vi vil følge opp Stortingets vedtak, men vi må sørge for at det er
            forsvarlig og ikke i strid med andre regler Stortinget selv har
            vedtatt.
          </blockquote>

          <p>
            I praksis betyr det at de gjennomfører det de kan umiddelbart –
            veibruksavgift og fiske – og tar resten når forholdet til
            EØS-reglene er avklart.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Kort oppsummert
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                Stortinget vedtok lavere CO₂-avgift for autodiesel,
                anleggsdiesel, sjøfart og fiske
              </li>
              <li>
                Bare fiske (0 kr/l) og veibruksavgift (0 kr/l) gjelder fra 1.
                april
              </li>
              <li>
                Resten er satt på vent fordi det kan bryte med EØS-avtalens
                statsstøtteregler
              </li>
              <li>
                Om det gjennomføres feil, kan bedrifter måtte betale tilbake
                besparelsen
              </li>
              <li>Regjeringen jobber med avklaring, men har ingen dato</li>
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
                  href="/nyheter/drivstoffavgiftene-kuttes-fra-1-april"
                >
                  Drivstoffavgiftene kuttes fra 1. april – dette er det som
                  skjer
                </Link>
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

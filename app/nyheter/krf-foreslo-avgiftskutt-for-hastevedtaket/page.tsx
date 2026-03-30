import type { Metadata } from "next";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "KrF vil fjerne veibruksavgiften midlertidig";
const DESCRIPTION =
  "KrF foreslår å fjerne veibruksavgiften i tre måneder. For diesel betyr det rundt 2,85 kr billigere per liter – hvis forslaget får flertall.";
const SLUG = "krf-foreslo-avgiftskutt-for-hastevedtaket";
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
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Publikasjoner/Representantforslag/2025-2026/dok8-202526-189s/",
    label: "Stortinget: Dokument 8:189 S (2025–2026)",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Saker/Sak/?p=200123",
    label: "Stortinget: saksgang og status",
  },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          category="Nyhet"
          publishedAtIso="2026-03-19T16:00:00+01:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Kristelig Folkeparti la i dag fram forslag om å fjerne
            veibruksavgiften midlertidig i tre måneder. Får forslaget flertall,
            blir diesel rundt 2,85 kroner billigere per liter og bensin nesten 5
            kroner billigere.
          </p>

          <p>
            Forslaget kommer etter at dieselprisene har skutt i været de siste
            ukene. Krigen mellom USA, Israel og Iran har sendt oljeprisen til
            himmels, og på norske pumper nærmer dieselen seg 30 kroner literen.
          </p>

          <h2 className="text-xl font-bold">Hva foreslår KrF?</h2>

          <p>
            Representantene Jørgen H. Kristiansen, Jonas Andersen Sayed og Hans
            Edvard Askjer har levert Dokument 8:189 S til Stortinget. Forslaget
            er enkelt: regjeringen skal fjerne veibruksavgiften midlertidig i
            tre måneder. Hvis prisene fortsatt er høye etter det, ber KrF
            regjeringen komme raskt tilbake til Stortinget med forslag om
            forlengelse.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Hva ville det bety i praksis?
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Diesel:</strong> Veibruksavgiften er 2,28 kr/l → ca.
                2,85 kr/l billigere inkl. mva.
              </li>
              <li>
                <strong>Bensin:</strong> Veibruksavgiften er 3,53 kr/l → ca.
                4,41 kr/l billigere inkl. mva.
              </li>
              <li>
                <strong>Personbil (60 L diesel):</strong> ca. 170 kr spart per
                fylling
              </li>
              <li>
                <strong>Lastebil (400 L tank):</strong> ca. 910 kr spart per
                fylling (ekskl. mva.)
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">
            Drivstoffavgifter rammer de med minst
          </h2>

          <p>
            KrF begrunner forslaget med at høye drivstoffpriser slår usosialt
            ut. De viser til tall fra Kongelig Norsk Automobilklub: blant dem
            som tjener under 600 000 kroner i året, kjører bare 26 prosent
            elbil. Blant dem som tjener over 900 000 kroner, er elbil-andelen
            nesten 60 prosent.
          </p>

          <p>
            De som har minst, er altså mest avhengig av fossilt drivstoff. Når
            prisene stiger, er det de med lavest inntekt som merker det hardest.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Elbil-andel etter inntekt (KNA)
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Under 600 000 kr:</strong> 26 % kjører elbil
              </li>
              <li>
                <strong>Over 900 000 kr:</strong> nesten 60 % kjører elbil
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Jo lavere inntekt, jo større andel av lønna går til drivstoff.
            </p>
          </div>

          <p>
            Mange er avhengige av bil i hverdagen – for å komme seg på jobb, for
            å kjøre barna på trening, for å handle mat. Spesielt i distriktene,
            der kollektivtilbudet ikke er det samme som i byene. Også bedrifter
            som er avhengige av veitransport rammes hardt.
          </p>

          <h2 className="text-xl font-bold">Ikke alene om kravet</h2>

          <p>
            KrF er ikke alene om å ville kutte drivstoffavgifter.
            Fremskrittspartiet la fram sitt eget forslag om avgiftskutt allerede
            12. mars. Presset på Stortinget for å gjøre noe med de høye
            drivstoffprisene øker fra uke til uke.
          </p>

          <p>
            Spørsmålet er om det finnes flertall. KrF-forslaget går nå til
            komitébehandling i finanskomiteen. Der kan det ta uker – kanskje
            måneder – før det kommer til votering. Mange bilister og
            transportbedrifter spør seg om de kan vente så lenge.
          </p>

          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              Status: til behandling
            </p>
            <p className="text-sm">
              KrFs forslag (Dok 8:189 S) er levert til Stortinget og skal
              oversendes finanskomiteen. Ingen dato for komitébehandling er satt
              ennå.
            </p>
          </div>

          <h2 className="text-xl font-bold">
            Bakteppet: krig og rekordhøy oljepris
          </h2>

          <p>
            Det som driver drivstoffprisene oppover er krigen i Midtøsten. Etter
            at USA og Israel angrep Iran, har Hormuz-stredet blitt delvis
            stengt. Rundt 20 prosent av verdens daglige oljeforsyning fraktes
            normalt gjennom stredet. Oljeprisen har steget fra rundt 75 dollar
            fatet til over 100 dollar.
          </p>

          <p>
            For norske bilister betyr det at råvarekostnaden for drivstoff har
            økt kraftig. Avgiftene kommer på toppen. Veibruksavgiften er den
            største enkeltavgiften på diesel etter CO₂-avgiften. Fjernes den,
            kuttes den delen av prisen som Stortinget faktisk kan gjøre noe med.
          </p>

          <p>
            For en som fyller 60 liter diesel i uka, betyr 2,85 kroner per liter
            nesten 9 000 kroner spart i løpet av et halvår. For en lastebil som
            bruker 35 000 liter i året, er besparelsen over 80 000 kroner.
          </p>
        </NewsArticleLayout>
      </main>
    </div>
  );
};

export default Page;

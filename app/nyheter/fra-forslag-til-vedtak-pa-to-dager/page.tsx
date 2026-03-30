import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Fra forslag til vedtak på to dager";
const DESCRIPTION =
  "Historien om hvordan Norges største avgiftskutt på drivstoff gikk fra innlevert forslag til vedtatt lov på under 48 timer – og hva det kostet av parlamentarisk orden.";
const SLUG = "fra-forslag-til-vedtak-pa-to-dager";
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
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Saker/Sak/?p=107811",
    label: "Stortinget: saksgang og status",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Publikasjoner/Referater/Stortinget/2025-2026/refs-202526-03-26?m=8",
    label: "Stortinget: referat fra debatten 26. mars",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811",
    label: "Stortinget: vedtakene",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Saker/Sak/Voteringsoversikt/?p=107811&dnid=1",
    label: "Stortinget: voteringsoversikt",
  },
  {
    href: "https://www.regjeringen.no/no/aktuelt/oppfolging-av-stortingets-vedtak-om-reduksjon-i-avgifter-pa-drivstoff/id3155277/",
    label: "Regjeringen: oppfølging 30. mars",
  },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          category="Bakgrunn"
          publishedAtIso="2026-03-26T19:00:00+01:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Tirsdag morgen lå forslaget på bordet. Onsdag kveld var det vedtatt.
            På under to døgn snudde Stortinget milliardbeløp i statsbudsjettet –
            uten komitébehandling, uten utredning, og uten at alle visste helt
            hva det ville koste.
          </p>

          <h2 className="text-xl font-bold">
            Bakteppet: krig og 30 kr literen
          </h2>

          <p>
            Da USA angrep Iran i starten av mars og Hormuz-stredet ble delvis
            stengt, eksploderte oljeprisen. Dieselen på norske pumper nærmet seg
            30 kroner literen. Lastebileierne regnet på konkurs. Pendlerne
            regnet på bussbillett. Fiskerne la til kai.
          </p>

          <p>
            Allerede 12. mars hadde Fremskrittspartiet levert forslag om kutt i
            drivstoffavgiftene. En uke senere fulgte Kristelig Folkeparti med
            sitt eget. Begge ble sendt til finanskomiteen – der forslag
            vanligvis bruker uker, ofte måneder, på å bli behandlet.
          </p>

          <h2 className="text-xl font-bold">
            Tirsdag 25. mars: hasteforslaget
          </h2>

          <p>
            Så kom Høyre. Tirsdag morgen leverte Nikolai Astrup og Trond
            Helleland Dokument 8:222 S – et representantforslag om å suspendere
            veibruksavgiften fra 1. april til 1. september. Men i motsetning til
            FrP og KrF ba Høyre om noe uvanlig: hastebehandling.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Hva er hastebehandling?
            </p>
            <p className="text-sm">
              Stortingets forretningsorden § 39 annet ledd bokstav c åpner for å
              behandle en sak uten komitébehandling «dersom det foreligger
              særlige grunner». Det er sjelden brukt. Det betyr at saken går
              rett fra innlevering til debatt og votering i salen – uten den
              vanlige høringsprosessen der eksperter, departementer og
              interesseorganisasjoner får si sitt.
            </p>
          </div>

          <p>
            Da referatsakene ble lest opp tirsdag ettermiddag, tok Astrup ordet.
            Folk kunne ikke vente tre måneder på en komitéinnstilling,
            argumenterte han. Prisene var allerede uholdbare. Avgiftskuttet
            måtte gjelde fra 1. april – fem dager unna.
          </p>

          <h2 className="text-xl font-bold">Salen kokte</h2>

          <p>
            Det som fulgte var en uvanlig opphetet debatt om selve
            behandlingsformen. Arbeiderpartiets Tuva Moflag kalte
            hastebehandlingen «uansvarlig» – man kunne ikke snu milliarder i
            statsbudsjettet uten utredning og kostnadsberegning. Venstre støttet
            Ap. SV, MDG og Rødt ville heller ha andre løsninger: prisregulering,
            klimakompensasjon, profittkontroll.
          </p>

          <p>
            Men FrPs Hans Andreas Limi var krystallklar: «Vi har ventet lenge
            nok.» Og Senterpartiets Trygve Slagsvold Vedum – finansminister i
            regjeringen Arbeiderpartiet ledet – brøt med sine egne
            budsjettpartnere: «Vi må lytte til folk.»
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Votering om behandlingsform – 25. mars
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>For hastebehandling (52):</strong> Høyre,
                Fremskrittspartiet, Senterpartiet, Kristelig Folkeparti
              </li>
              <li>
                <strong>Mot (49):</strong> Arbeiderpartiet, Sosialistisk
                Venstreparti, Venstre, Miljøpartiet De Grønne, Rødt
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Senterpartiet stemte altså mot sine egne budsjettpartnere Ap, SV
              og MDG.
            </p>
          </div>

          <h2 className="text-xl font-bold">Onsdag 26. mars: debatten</h2>

          <p>
            Dagen etter – sak nr. 8 på dagsorden – fikk Stortinget sin
            storslåtte debatt. Over femti representanter tok ordet. Noen
            sammenlignet situasjonen med Willoch-regjeringens fall i 1986, da en
            bensinskatt utløste kabinettspørsmål og regjeringskrise. Andre mente
            opposisjonen drev parlamentarisk hasardspill.
          </p>

          <p>
            Finansminister Stoltenberg advarte fra regjeringens bord: et
            avgiftskutt på over seks milliarder kroner ville presse opp
            inflasjonen og gi Norges Bank grunn til å holde renten oppe lenger.
            Pengene måtte tas fra noe annet.
          </p>

          <p>
            Men flertallet var allerede klart. Høyre, FrP, Senterpartiet og KrF
            hadde 52 stemmer – tre mer enn de trengte. Løse forslag haglet inn.
            Senterpartiet la fram egne forslag om lavere CO₂-avgift for sjøfart,
            anleggsdiesel og fiske. FrP ville strekke kuttet til nyttår. MDG
            ville betale CO₂-inntektene tilbake til innbyggerne. SV ville ha
            prisregulering på pumpene.
          </p>

          <h2 className="text-xl font-bold">Onsdag kveld: voteringen</h2>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Nøkkelresultater – 26. mars
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Forslag 23</strong> (Høyre: veibruksavgift = 0 kr):
                vedtatt 52–49
              </li>
              <li>
                <strong>Forslag 15–22</strong> (Sp: endringer i CO₂-avgift):
                vedtatt 52–49
              </li>
              <li>
                <strong>Forslag 8</strong> (Ap: be regjeringen komme tilbake med
                tiltak): vedtatt 93–7 – nesten enstemmig
              </li>
              <li>
                <strong>FrPs forslag</strong> om å forlenge kuttet til nyttår:
                forkastet
              </li>
              <li>
                <strong>MDGs forslag</strong> om å tilbakebetale CO₂-inntekter
                til borgerne: forkastet
              </li>
              <li>
                <strong>SVs forslag</strong> om prisregulering på
                bensinstasjoner: forkastet
              </li>
            </ul>
          </div>

          <p>
            Klokken var blitt kveld da president Gharahkhani leste opp
            resultatet. Veibruksavgiften på alt drivstoff – diesel, bensin,
            bioetanol, biodiesel, naturgass, LPG – var vedtatt satt til null
            kroner fra 1. april. En midlertidig ordning på fem måneder.
            Prislappen: anslagsvis 6,3 milliarder kroner i tapte
            avgiftsinntekter.
          </p>

          <h2 className="text-xl font-bold">
            Hva det kostet av parlamentarisk orden
          </h2>

          <p>
            Kritikerne – også noen som stemte for selve avgiftskuttet – påpekte
            at prosessen brøt med grunnleggende prinsipper. Det fantes ingen
            komitéinnstilling. Ingen offentlig høring. Ingen kostnadsanalyse fra
            Finansdepartementet. Budsjettforliket mellom Ap, Sp, SV og MDG lå i
            ruiner. Senterpartiet hadde i praksis forlatt sin egen regjerings
            linje.
          </p>

          <p>
            Tilhengerne svarte at demokratiet handler om å lytte når krisen er
            akutt. Tre måneders komitéarbeid ville bety tre måneder med
            30-kronersdiesel.
          </p>

          <h2 className="text-xl font-bold">
            Etterspillet: regjeringen fulgte opp
          </h2>

          <p>
            Søndag 30. mars – fire dager etter voteringen – publiserte
            regjeringen en pressemelding som bekreftet at veibruksavgiften går
            til null fra 1. april. Men de delene av vedtaket som gjaldt
            CO₂-avgiften for autodiesel, anleggsdiesel og sjøfart ble satt på
            vent. Regjeringen trengte tid til å avklare forholdet til
            EØS-avtalen og statsstøttereglene.
          </p>

          <p>
            Fra tirsdag morgen til søndag kveld – fem dager totalt, to i
            stortingssalen – hadde norsk drivstoffpolitikk gjennomgått den
            raskeste og mest dramatiske endringen på en generasjon.
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
                  Drivstoffavgiftene kuttes fra 1. april – dette er det som
                  skjer
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/krig-i-midtosten-sender-dieselprisen-over-30-kroner"
                >
                  Krig i Midtøsten sender dieselprisen over 30 kroner
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

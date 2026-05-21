import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE =
  "Stortinget vil utrede opptil 90 dagers dieselberedskap – Norge har 20 i dag";
const DESCRIPTION =
  "Energi- og miljøkomiteen ber regjeringen utrede 61–90 dagers lagring av diesel og flybensin. Det endrer ikke pumpeprisen nå, men kan styrke tilgangen ved krise.";
const SLUG = "stortinget-vil-utrede-dieselberedskap-61-90-dager";
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
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Publikasjoner/Innstillinger/Stortinget/2025-2026/inns-202526-295s/",
    label: "Stortinget: Innst. 295 S (2025–2026), energi- og miljøkomiteen",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Saker/Sak/?p=200108",
    label: "Stortinget: sak om beredskapslagring av diesel og flybensin",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Publikasjoner/Representantforslag/2025-2026/dok8-202526-178s/",
    label: "Stortinget: Dokument 8:178 S (2025–2026), representantforslag (Sp)",
  },
  {
    href: "https://lovdata.no/dokument/SF/forskrift/2006-09-01-1019",
    label: "Lovdata: forskrift om beredskapslagring av petroleumsprodukt (§ 4)",
  },
  {
    href: "https://www.regjeringen.no/no/statsbudsjett/2026/rnb/a-til-aa/id3155656/",
    label: "Regjeringen: revidert nasjonalbudsjett 2026 – drivstoffberedskap",
  },
  {
    href: "https://www.ffi.no/publikasjoner/arkiv/nasjonal-forsyningssikkerhet-i-krise-og-krig-sarbarheter-konsekvenser-og-tiltak-for-mat-og-drivstofforsyningen",
    label:
      "FFI: Nasjonal forsyningssikkerhet i krise og krig (rapport 26/010, mars 2026)",
  },
  {
    href: "https://www.nrk.no/vestland/noreg-styrker-beredskapen_-diesel--og-flydrivstofflager-aukar-til-61-dagar-1.17881328",
    label: "NRK Vestland: beredskapslagring, 20. mai 2026",
  },
  {
    href: "https://www.at.no/transport/fra-20-til-90-dager-det-er-lettere-sagt-enn-gjort/1261655",
    label: "AT Transport: Drivkraft Norge om utvidelse av lagre",
  },
  {
    href: "https://www.tu.no/nyhetsstudio/regjeringen-skal-utrede-oekte-drivstofflagre/117044",
    label: "TU/NTB: regjeringen skal utrede økte drivstofflagre",
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
          publishedAtIso="2026-05-21T15:30:00+02:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Norge krever i dag beredskapslagring tilsvarende om lag 20 dagers
            innenlands forbruk av diesel og flybensin. Energi- og miljøkomiteen
            har anbefalt at regjeringen utreder å heve ambisjonen til 61 eller
            90 dager – nivåer som naboland som Sverige og Finland allerede
            opererer med. Stortinget behandler innstillingen i plenum torsdag
            21. mai. Dette handler om tilgang ved krise, ikke om pris ved pumpen
            i dag.
          </p>

          <h2 className="text-xl font-bold">
            Hva betyr det for deg som kjører?
          </h2>

          <p>
            Beredskapslagre er et nasjonalt sikkerhetsgrep. De betyr ikke at din
            lokale dieselstasjon har 20 dager med diesel i bakgården. Lovkravet
            pålegger importører og produsenter som omsetter store volumer å
            holde lagre som til sammen tilsvarer 20 dagers forbruk av
            lagringspliktige produkter – blant annet diesel og flybensin.
          </p>

          <p>
            For en transportbedrift med ti lastebiler som fyller 400 liter per
            bil én gang i uken, er det 4 000 liter i uken. Nasjonale lagre skal
            sikre at samfunnet – Forsvaret, nødetater, landbruk, fiskeri og
            godstransport – ikke går tom for drivstoff hvis importen stopper
            opp. FFI pekte i mars 2026 på at svikt her raskt kan ramme både
            militær evne og sivile funksjoner.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Dagens krav og det komiteen vil utrede
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                      Nivå
                    </th>
                    <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                      Hva det betyr
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-border px-4 py-3">
                      20 dager (i dag)
                    </td>
                    <td className="border-b border-border px-4 py-3">
                      Lovfestet minimum i forskrift om beredskapslagring (§ 4)
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-border px-4 py-3">
                      61 dager (utredes)
                    </td>
                    <td className="border-b border-border px-4 py-3">
                      Alternativ komiteen viser til når man legger innenlands
                      forbruk til grunn (jf. innstillingen)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">90 dager (utredes)</td>
                    <td className="px-4 py-3">
                      Nivå i Sverige og Finland; også mål i Senterpartiets
                      representantforslag
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-xl font-bold">Hva komiteen anbefaler 12. mai</h2>

          <p>
            Energi- og miljøkomiteen avgav Innst. 295 S 12. mai 2026, med
            bakgrunn i representantforslag fra Senterpartiet (Dokument 8:178 S)
            og FFI-rapporten om forsyningssikkerhet. Komiteens tilråding til
            Stortinget er tre vedtak:
          </p>

          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              Regjeringen skal gå i dialog med naboland – blant annet i Norden
              og med Storbritannia – om tettere samarbeid om produksjon og
              lagring.
            </li>
            <li>
              Regjeringen skal vurdere tiltak for å sikre mer produksjon av
              diesel og flybensin i Norge, og komme tilbake til Stortinget
              senest høsten 2026.
            </li>
            <li>
              Regjeringen skal foreslå økte ambisjoner for lagerkapasitet av
              diesel og flydrivstoff, utrede alternativer for 61 og 90 dager, og
              rapportere i forbindelse med statsbudsjettet for 2027.
            </li>
          </ul>

          <p>
            Plenumsbehandling i Stortinget er planlagt 21. mai 2026. Frem til
            Stortinget har stemt, er dette en anbefaling – ikke endelig vedtak.
          </p>

          <h2 className="text-xl font-bold">
            4 millioner til utredning i budsjettet
          </h2>

          <p>
            I revidert nasjonalbudsjett 2026 foreslår regjeringen fire millioner
            kroner til en ekstern utredning som skal skissere alternativer for
            hvordan Norge kan nå ambisjonen om økt drivstoffberedskap. Det er
            planleggingspenger – ikke bygging av nye tankanlegg ennå.
          </p>

          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
            <p className="font-semibold text-foreground">Ikke klart ennå</p>
            <p className="mt-2 text-muted-foreground">
              Verken Stortingets plenumsvotering, nye lovkrav eller fysiske
              lagre er på plass. Næringsminister Cecilie Myrseth har ifølge
              medier pekt mot et mer konkret forslag i statsbudsjettet for 2027.
              Drivkraft Norge advarer om at firedobling av kapasitet ikke finnes
              i dag, at drivstoff har begrenset holdbarhet, og at staten må ta
              en tydelig koordinerende rolle.
            </p>
          </div>

          <h2 className="text-xl font-bold">Hvorfor Norge er sårbart</h2>

          <p>
            Etter at Esso-raffineriet på Slagentangen ble lagt ned, er Mongstad
            Norges eneste oljeraffineri. Landet er i stor grad avhengig av
            importert diesel og flydrivstoff – Mongstad dekker en vesentlig del
            av flybensinbehovet, men ikke alt – mens mye råolje eksporteres. I
            en alvorlig krise – eller ved langvarige forstyrrelser i
            handelsruter som vi har skrevet om i forbindelse med{" "}
            <Link
              className="font-medium text-accent underline-offset-2 hover:underline"
              href="/nyheter/hormuz-fortsatt-stengt-diesel-sommeren"
            >
              Hormuz og dieselprisen
            </Link>{" "}
            – kan 20 dagers lagring bli for kort, ifølge både FFI og en bred
            politisk enighet i komiteen.
          </p>

          <p>
            Komiteens Ap-medlemmer viser i innstillingen til konservative
            kostnadsanslag (basert på drivstoffpriser før Hormuz-blokaden):
            rundt 1,8 milliarder kroner for å kjøpe inn volum til 61 dagers nivå
            dersom staten eier lagrene fullt ut, og om lag 7 milliarder for å
            kjøpe inn 70 ekstra dager – altså opp fra 20 til 90 dager. Det
            gjelder produktkjøp – ikke investering i nye tankanlegg og drift.
            Tallene er politiske vurderinger i innstillingen, ikke et bindende
            budsjettvedtak.
          </p>

          <h2 className="text-xl font-bold">Pumpepris og råvare</h2>

          <p>
            Økt beredskapslagring kan på sikt påvirke kostnader som staten eller
            næringen bærer, men det er ikke det samme som en avgiftsendring ved
            pumpen. Autodiesel og anleggsdiesel følger fortsatt egne
            avgiftsregler; flybensin er et eget produkt i beredskapsdebatten.
            Høy råvarepris har preget dieselmarkedet i vår, uavhengig av denne
            beredskapssaken – som vi har skrevet om i{" "}
            <Link
              className="font-medium text-accent underline-offset-2 hover:underline"
              href="/nyheter/avgiftskutt-men-diesel-fortsatt-dyr"
            >
              avgiftskutt og pumpepris
            </Link>
            . Beredskapsutredningen endrer ikke avgifter eller margin ved
            pumpen.
          </p>

          <div className="rounded-2xl border border-accent/25 bg-accent/8 p-5">
            <p className="font-semibold text-foreground">Oppsummert</p>
            <p className="mt-2 text-muted-foreground">
              Stortinget skal torsdag 21. mai behandle om regjeringen skal
              utrede å gå fra 20 til 61–90 dagers beredskapslagring av diesel og
              flybensin. Regjeringen har satt av 4 millioner kroner til
              planlegging i revidert budsjett. For sjåfører og flåteeiere betyr
              det foreløpig lite ved pumpen – men mye for hvor lenge Norge kan
              holde hjulene i gang hvis importen bryter sammen.
            </p>
          </div>
        </NewsArticleLayout>
      </main>
    </div>
  );
};
export default Page;

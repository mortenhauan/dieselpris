import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Drivstoffavgiftene kuttes fra 1. april – dette er det som skjer";
const DESCRIPTION =
  "Stortinget fjerner veibruksavgiften midlertidig. For diesel betyr det 2,85 kr billigere per liter ved pumpa – fra onsdag 1. april.";
const SLUG = "drivstoffavgiftene-kuttes-fra-1-april";
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
    label: "Regjeringen: oppfølging av drivstoffvedtaket",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811",
    label: "Stortinget: vedtakene i saken",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Saker/Sak/?p=107811",
    label: "Stortinget: saksgang og status",
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
          publishedAtIso="2026-03-30T13:00:00+02:00"
          description={DESCRIPTION}
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Diesel blir billigere fra onsdag. Regjeringen bekreftet i dag at
            veibruksavgiften settes til null kroner fra 1. april. For vanlig
            diesel betyr det 2,85 kroner mindre per liter ved pumpa.
          </p>

          <p>
            Fyller du 60 liter diesel, sparer du omtrent 170 kroner per fylling.
            For en lastebil med 400-literstank er besparelsen over 1 100 kroner
            hver gang.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Hva betyr det i praksis?
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Diesel:</strong> Veibruksavgiften kuttes med 2,28 kr/l →
                2,85 kr/l billigere inkl. mva.
              </li>
              <li>
                <strong>Bensin:</strong> Kutt på 3,53 kr/l → 4,41 kr/l billigere
                inkl. mva.
              </li>
              <li>
                <strong>Fiske:</strong> CO₂-avgiften settes til 0 kr/l for fiske
                i fjerne farvann og fiske i nære og fjerne farvann. For fiske
                kun i nære farvann er endringen ennå ikke iverksatt.
              </li>
              <li>
                <strong>Gjelder fra:</strong> 1. april 2026
              </li>
              <li>
                <strong>Gjelder til:</strong> 1. september 2026
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">
            Bakgrunnen: krig og rekordhøye pumpepriser
          </h2>

          <p>
            Da USA gikk til angrep mot Iran og Hormuz-stredet ble delvis stengt,
            skjøt oljeprisen i været. Dieselprisene på norske pumper nærmet seg
            30 kroner literen. For mange – fra langtransport til fiskere til
            pendlere – ble det uholdbart.
          </p>

          <p>
            Høyres Nikolai Astrup og Trond Helleland la fram et hasteforslag
            tirsdag 25. mars. Dagen etter stemte Stortinget. Vedtaket gikk
            igjennom med 52 mot 49 stemmer.
          </p>

          <h2 className="text-xl font-bold">Hva vedtok Stortinget?</h2>

          <p>
            Stortinget vedtok to ting: at veibruksavgiften på alt drivstoff
            settes til null, og at CO₂-avgiften endres for flere drivstofftyper.
          </p>

          <p>
            Men regjeringen kan foreløpig bare gjennomføre deler av vedtaket.
            Fra 1. april er dette på plass:
          </p>

          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              Veibruksavgiften settes til 0 kr/l for all drivstoff (diesel,
              bensin, bioetanol, biodiesel, LPG, naturgass)
            </li>
            <li>
              CO₂-avgiften for fiske i fjerne farvann og for fiske i nære og
              fjerne farvann settes til 0 kr/l (ikke for fiske kun i nære
              farvann)
            </li>
          </ul>

          <h2 className="text-xl font-bold">CO₂-kutt som ennå ikke er klare</h2>

          <p>
            Stortinget vedtok også lavere CO₂-avgift for autodiesel (3,09 kr/l),
            anleggsdiesel (1,92 kr/l), sjøfart (3,17 kr/l) og kvotepliktig
            sjøfart (0,90 kr/l). Men her må regjeringen først avklare forholdet
            til EØS-avtalen og statsstøttereglene. Det betyr at disse endringene
            ikke gjelder fra 1. april.
          </p>

          <p>
            For deg som kjører vanlig bil eller lastebil på veien, er det
            veibruksavgiften som gir den umiddelbare besparelsen. CO₂-endringene
            ville kommet i tillegg, men er altså satt på vent.
          </p>

          <h2 className="text-xl font-bold">Hva koster det staten?</h2>

          <p>
            Å fjerne veibruksavgiften i fem måneder koster anslagsvis 6,3
            milliarder kroner i tapte avgiftsinntekter for 2026. Det er prisen
            Stortinget er villig til å betale for å dempe den akutte
            belastningen på norske bilister og næringsliv.
          </p>

          <h2 className="text-xl font-bold">Hvor lenge varer det?</h2>

          <p>
            Nullsatsen gjelder fra 1. april til 1. september 2026 – altså fem
            måneder. Etter 1. september går avgiftene tilbake til vanlig nivå,
            med mindre Stortinget vedtar noe annet.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Kort oppsummert
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                Veibruksavgiften fjernes midlertidig fra 1. april til 1.
                september 2026
              </li>
              <li>Diesel blir ca. 2,85 kr/l billigere, bensin ca. 4,41 kr/l</li>
              <li>CO₂-avgiften for fiske fjernes helt i samme periode</li>
              <li>Andre CO₂-kutt er vedtatt, men venter på avklaring</li>
              <li>Koster staten ca. 6,3 milliarder kroner</li>
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
                  href="/nyheter/slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart"
                >
                  Slik påvirkes prisen for autodiesel, anleggsdiesel og sjøfart
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/co2-kutt-som-ikke-er-klare-enda"
                >
                  Flere CO₂-kutt er vedtatt, men ennå ikke satt i verk
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/fra-forslag-til-vedtak-pa-to-dager"
                >
                  Fra forslag til vedtak på to dager
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

import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Råoljeprisen holder seg – gasoilen stiger likevel";
const DESCRIPTION =
  "Torsdag 9. april steg ICE gasoil-futures 12,45 prosent mens råoljeprisen holdt seg rolig. Her er grunnen til at de to prisene ikke følger hverandre.";
const SLUG = "raolje-stabil-men-gasoil-stiger";
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
    href: "https://www.eia.gov/petroleum/supply/weekly/",
    label: "EIA: Weekly Petroleum Supply Report, 9. april 2026",
  },
  {
    href: "https://www.vortexa.com/insights/europes-middle-distillate-supply-at-risk",
    label: "Vortexa: Europe's middle distillate supply at risk",
  },
  {
    href: "https://www.indexbox.io/blog/ara-fuel-oil-and-gasoil-inventories-decline-in-march-2026/",
    label: "IndexBox: ARA gasoil stocks mars 2026",
  },
  {
    href: "https://www.theice.com/products/34361119/Low-Sulphur-Gasoil-Futures",
    label: "ICE: Low Sulphur Gasoil Futures",
  },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          canonicalUrl={CANONICAL}
          category="Forklart"
          description={DESCRIPTION}
          publishedAtIso="2026-04-09T21:15:00+02:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Torsdag 9. april holdt råoljeprisen seg relativt rolig rundt 96–97
            dollar fatet. Samme dag steg ICE gasoil-futures 12,45 prosent.
            Hvorfor gikk diesel i motsatt retning av det overskriftene om
            råoljeprisen skulle tilsi?
          </p>

          <h2 className="text-xl font-bold">
            Råolje og diesel er ikke det samme
          </h2>

          <p>
            Råolje er utgangspunktet. Diesel er sluttproduktet du får etter at
            råoljen er raffinert. De to prisene henger sammen over tid, men de
            reagerer forskjellig på nyheter.
          </p>

          <p>
            Onsdag hadde råoljeprisen stupt 14 prosent da USA og Iran kunngjorde
            våpenhvile. Torsdag lå Brent rolig rundt 96–97 dollar fatet. ICE
            gasoil-futures – råvaren som bestemmer hva norsk diesel faktisk
            koster – brukte samme torsdag til å stige 12,45 prosent og toppe ut
            på 1 412 dollar per tonn. Det er en ekstrem skillelinje.
          </p>

          <h2 className="text-xl font-bold">Knapphet på ferdig diesel</h2>

          <p>
            Konflikten i Midtøsten rammet ikke bare råoljestrømmen. Raffinerier
            i regionen ble forstyrret eller stengt. Det betyr at leveransene av
            ferdig dieselolje er lavere enn normalt, uavhengig av hva som skjer
            med selve råoljeprisene.
          </p>

          <p>
            EIA publiserte torsdag tall for uken som endte 3. april.
            Destillatlagrene i USA – der diesel og fyringsolje regnes med – falt
            med 3,1 millioner fat og er nå fem prosent under
            femårsgjennomsnittet. Det er lite buffer. Selv et lite fall i
            leveransene eller et lite løft i etterspørselen presser prisen raskt
            oppover.
          </p>

          <p>
            Tilsvarende tegn sees i Europa. Ved det viktigste lagerhubben,
            Amsterdam-Rotterdam-Antwerp (ARA), falt uavhengige gasoillagre til
            16,12 millioner fat i løpet av mars. Kombinert med at Hormuz-ruten
            er forstyrret, gir det lite spillerom hvis leveransene svikter
            ytterligere.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              To begreper – forklart enkelt
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              <li>
                <strong>Crack spread</strong> – fortjenesten et raffineri får
                ved å forvandle en fat råolje til ferdig diesel. Når diesel
                stiger mer enn råolje, betyr det at crack spreaden øker: ferdig
                drivstoff er mer verdt, relativt sett, enn råvaren.
              </li>
              <li>
                <strong>Distillatelagre</strong> – beholdningen av ferdig diesel
                og fyringsolje som lagres i tanker globalt. Når lagrene er lave,
                er det lite å ta av, og prisen er mer sårbar for forstyrrelser.
              </li>
              <li>
                <strong>Backwardation</strong> – når prisen for levering nå er
                høyere enn for levering om ett eller to år. Et tegn på at
                markedet ser knappheten som midlertidig, men at den er reell
                akkurat nå.
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">
            Våpenhvilen lettet på frykten – ikke problemet
          </h2>

          <p>
            Onsdagens nyhet dempet risikopremien i råoljeprisen. Markedet priset
            inn litt mer trygghet rundt oljetilbudet fra Persiagulfen. Derav
            fallet i råolje.
          </p>

          <p>
            Men geopolitisk lettelse løser ikke tett raffinerikapasitet.
            Raffinerier starter ikke opp over natten. Logistikken for å frakte
            ferdig diesel fra produksjonssted til Nord-Europa har sine egne
            forsinkelser – og Europa er spesielt utsatt. Ifølge analyseselskapet
            Vortexa kom over en fjerdedel av Europas dieselimport utenfra Europa
            gjennom Hormuzstredet de siste to årene. Forstyrrelser der slår
            raskere og hardere inn i europeiske pumpepriser enn i råoljeprisen
            alene.
          </p>

          <p>
            I tillegg er dieseletterspørselen lite elastisk på kort sikt.
            Lastebiler kjører, fiskebåter går til havs, og anleggsmaskiner
            fyller tanken uansett – uavhengig av om prisen stiger noen prosent.
            Det gir leverandørene lite press til å senke prisen raskt.
          </p>

          <h2 className="text-xl font-bold">
            Hva betyr dette for pumpeprisene?
          </h2>

          <p>
            Norske pumpepriser følger gasoil-futures med noen dagers til ukers
            forsinkelse, avhengig av når importørene sist fylte sine lagertanker
            og til hvilken pris. En dag med stigning i gasoil-markedet slår ikke
            nødvendigvis ut dagen etter, men legger press oppover på sikt.
          </p>

          <p>
            Gasoil-markedet er også i sterk backwardation: prompt-prisen er
            dramatisk høyere enn prisen for levering om ett eller to år. Det
            betyr at markedet venter normalisering – men ikke med det første. Og
            frem til det skjer, er det den høye prompt-prisen som bestemmer hva
            du betaler ved pumpa.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Oppsummert
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              <li>Brent-olje: opp ~2 % torsdag, rundt 96–97 dollar fatet</li>
              <li>
                ICE gasoil-futures: opp 12,45 % torsdag 9. april – toppet på 1
                412 dollar per tonn
              </li>
              <li>
                Årsak: raffinerier i Midtøsten var forstyrret – ferdig diesel er
                knapp selv om råoljefrykten dempes
              </li>
              <li>
                EIA: amerikanske destillatlagre falt 3,1 millioner fat uken som
                endte 3. april – nå 5 % under femårsgjennomsnittet
              </li>
              <li>
                ARA-lagre i Europa falt til 16,12 millioner fat i slutten av
                mars
              </li>
              <li>
                Over en fjerdedel av Europas dieselimport utenfra Europa gikk
                gjennom Hormuzstredet (Vortexa)
              </li>
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
                  href="/nyheter/vapenhvile-iran-oljeprisen-stuper-men-dieselen-forblir-dyr"
                >
                  Våpenhvile mellom USA og Iran – oljeprisen stuper, men
                  dieselen forblir dyr
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/slik-settes-dieselprisen-fra-oljefat-til-pumpe"
                >
                  Slik settes dieselprisen: fra oljefat til pumpe
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

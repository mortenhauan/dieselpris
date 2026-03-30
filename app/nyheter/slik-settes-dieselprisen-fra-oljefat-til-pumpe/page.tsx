import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Slik settes dieselprisen: fra oljefat til pumpe";
const DESCRIPTION =
  "Råolje, raffineringsmargin, distribusjon og avgifter – slik blir prisen du betaler ved pumpa. Vi bryter ned hvert ledd i kjeden.";
const SLUG = "slik-settes-dieselprisen-fra-oljefat-til-pumpe";
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
    href: "https://drivkraftnorge.no/prisen-paa-drivstoff/",
    label: "Drivkraft Norge: Prisen på drivstoff",
  },
  {
    href: "https://www.theice.com/products/34361119/Low-Sulphur-Gasoil-Futures",
    label: "ICE: Low Sulphur Gasoil Futures",
  },
  {
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/avgiftssatser-2025/id3055842/",
    label: "Regjeringen: Avgiftssatser 2025",
  },
  {
    href: "https://www.ssb.no/transport-og-reiseliv/landtransport/statistikk/drivstoffpriser",
    label: "SSB: Drivstoffpriser",
  },
];

const TH = "border-b border-border px-4 py-3 font-semibold text-foreground";
const TD = "border-b border-border/50 px-4 py-2.5";

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          canonicalUrl={CANONICAL}
          category="Forklart"
          publishedAtIso="2025-02-15T10:00:00+01:00"
          description={DESCRIPTION}
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Når du fyller diesel til rundt 17 kroner literen, er prisen summen
            av fire ledd: råolje, raffinering, distribusjon og avgifter. Her er
            hva hvert ledd koster – og hvorfor prisen svinger.
          </p>

          <h2 className="text-xl font-bold">1. Råolje – utgangspunktet</h2>

          <p>
            Alt begynner med et fat råolje. I Europa er det Brent-oljen fra
            Nordsjøen som setter standarden. I februar 2025 ligger prisen rundt
            75 dollar fatet. Men råolje er ikke diesel – den må gjennom
            raffinering, transport og avgiftsberegning før den når tanken din.
            Og olje handles i amerikanske dollar, så kronekursen spiller direkte
            inn.
          </p>

          <h2 className="text-xl font-bold">
            2. Raffinering – fra råolje til diesel
          </h2>

          <p>
            Et oljeraffineri varmer opp råoljen og splitter den i ulike
            produkter: bensin, diesel, fyringsolje, jetdrivstoff. Hva det koster
            å gjøre denne jobben kalles raffineringsmarginen.
          </p>

          <p>
            I bransjen brukes begrepet «crack spread» – forskjellen mellom
            prisen på råolje inn og ferdig diesel ut. Tenk på det som møllerens
            fortjeneste: hva koster det å male kornet til mel?
          </p>

          <p>
            Marginen varierer mye. I normale tider ligger den på 10–20 dollar
            per fat. Men under forstyrrelser – som da europeiske raffinerier
            slet med kapasitet i 2022 – kan den sprette over 40 dollar. Da
            merker du det på pumpa selv om oljeprisen holder seg stabil.
          </p>

          <p>
            Norske importører følger ikke råoljeprisen direkte. De følger ICE
            Low Sulphur Gasoil – en futureskontrakt som handles i
            Rotterdam-området. Det er denne prisen, oppgitt i dollar per tonn,
            som styrer hva dieselen koster før den når Norge.
          </p>

          <h2 className="text-xl font-bold">
            3. Distribusjon og selskapenes marginer
          </h2>

          <p>
            Dieselen må fraktes fra raffineriet til lagertanker i Norge, og
            videre ut til hver enkelt stasjon. Transporten, lagringen, driften
            av stasjonen og selskapets fortjeneste utgjør til sammen rundt
            1,50–2 kroner per liter. Denne delen er relativt stabil og svinger
            ikke fra dag til dag slik råolje- og raffineringsprisen gjør.
          </p>

          <h2 className="text-xl font-bold">
            4. Avgifter – den største enkeltposten
          </h2>

          <p>
            Staten tar den største delen av det du betaler. I 2025 ser avgiftene
            for autodiesel slik ut:
          </p>

          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>CO₂-avgift:</strong> 3,79 kr/l (opp fra 3,16 kr/l i 2024 –
              en økning på 20 prosent)
            </li>
            <li>
              <strong>Veibruksavgift:</strong> 2,69 kr/l
            </li>
            <li>
              <strong>Merverdiavgift (mva):</strong> 25 prosent av totalprisen,
              inkludert de andre avgiftene
            </li>
          </ul>

          <p>
            CO₂-avgiften og veibruksavgiften er faste kronebeløp per liter. De
            endrer seg ikke med oljeprisen. Mva derimot beregnes på toppen av
            alt – også på de faste avgiftene. Du betaler altså avgift på
            avgiften. Til sammen utgjør avgiftene omtrent 45 prosent av
            pumpeprisen.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Slik fordeles en literpris på rundt 17 kr (tidlig 2025)
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className={`${TH} text-left`}>Del av prisen</th>
                    <th className={`${TH} text-right`}>Ca. kr/l</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={TD}>Råolje + raffinering</td>
                    <td className={`${TD} text-right`}>6,50–7,50</td>
                  </tr>
                  <tr>
                    <td className={TD}>Distribusjon og margin</td>
                    <td className={`${TD} text-right`}>1,50–2,00</td>
                  </tr>
                  <tr>
                    <td className={TD}>CO₂-avgift</td>
                    <td className={`${TD} text-right`}>3,79</td>
                  </tr>
                  <tr>
                    <td className={TD}>Veibruksavgift</td>
                    <td className={`${TD} text-right`}>2,69</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-semibold">
                      Mva (25 % av alt)
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold">
                      ~3,50
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-xl font-bold">
            Dollarkursen – den skjulte prisdriveren
          </h2>

          <p>
            Olje og diesel handles i dollar, men du betaler i kroner. Dermed
            påvirker valutakursen pumpeprisen direkte. Et eksempel: Brent ligger
            på 75 dollar fatet. Er dollarkursen 10 kroner, koster fatet 750
            kroner. Stiger dollaren til 11 kroner, koster det samme fatet
            plutselig 825 kroner – ti prosent dyrere, uten at oljeprisen har
            rørt seg. Norsk krone har vært relativt svak de siste årene, og det
            forsterker prisøkningene.
          </p>

          <h2 className="text-xl font-bold">
            Hva betyr en endring i oljeprisen for deg?
          </h2>

          <p>
            Si at Brent stiger med 10 dollar per fat – fra 75 til 85 dollar. Hva
            skjer med det du betaler på pumpa?
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Regneeksempel: +10 dollar per fat Brent
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                Et fat er 159 liter råolje, men gir rundt 120–130 liter
                drivstoffprodukter etter raffinering.
              </li>
              <li>
                10 dollar ekstra per fat ≈ 0,55–0,65 kr mer per liter diesel
                (ved en kurs på 10,80 kr per dollar).
              </li>
              <li>
                Pluss 25 % mva: ca. 0,70–0,80 kr ekstra per liter på pumpa.
              </li>
              <li>
                For et vogntog (3 500 l/mnd): 2 500–2 800 kr mer per måned.
              </li>
              <li>
                For en personbil med snittforbruk: rundt 60–70 kr mer per måned.
              </li>
            </ul>
          </div>

          <p>
            Men diesel følger ikke alltid råoljen krone for krone.
            Raffineringsmarginen kan dempe eller forsterke bevegelsen. Og
            dollarkursen kan gjøre at du merker enda mer – eller mindre – enn
            det rene oljeprisbevegelsen tilsier.
          </p>

          <h2 className="text-xl font-bold">
            Hvorfor endres ikke pumpeprisen med en gang?
          </h2>

          <p>
            Oljeprisen svinger minutt for minutt. Pumpeprisen gjør det ikke. Det
            tar gjerne noen dager til en uke før en endring i oljepris eller
            gasoilpris slår inn på stasjonen. Selskapene kjøper diesel på
            kontrakt og justerer prisene med et visst etterslep. Prisen du ser
            på pumpa i dag gjenspeiler markedet for noen dager siden – ikke det
            du leser i avisoverskriftene akkurat nå.
          </p>

          <h2 className="text-xl font-bold">Kort oppsummert</h2>

          <p>
            Dieselprisen er en kjede med fire ledd. Råolje og raffinering
            bestemmer utgangspunktet og svinger med verdensmarkedet.
            Distribusjon legger på en relativt fast kostnad. Avgiftene – nesten
            halvparten av prisen – bestemmes av Stortinget. Og dollarkursen
            binder det hele sammen.
          </p>

          <p>
            Neste gang prisen endrer seg: sjekk oljeprisen, sjekk dollarkursen,
            og husk at avgiftene ligger fast uansett.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Les også
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/kronekursen-og-dieselprisen-en-sammenheng-fa-tenker-pa"
                >
                  Kronekursen og dieselprisen – en sammenheng få tenker på
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/hva-er-opec-og-hva-har-de-med-dieselprisen-a-gjore"
                >
                  Hva er OPEC+ og hva har de med dieselprisen å gjøre?
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/dieselavgiftene-for-2025-nok-et-ar-med-okt-co2-avgift"
                >
                  Dieselavgiftene for 2025: nok et år med økt CO₂-avgift
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

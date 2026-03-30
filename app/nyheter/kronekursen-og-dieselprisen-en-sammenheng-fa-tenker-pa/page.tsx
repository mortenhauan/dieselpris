import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Kronekursen og dieselprisen – en sammenheng få tenker på";
const DESCRIPTION =
  "Olje handles i dollar. Når kronen er svak, betaler du mer for diesel – selv om oljeprisen er stabil. Slik fungerer det.";
const SLUG = "kronekursen-og-dieselprisen-en-sammenheng-fa-tenker-pa";
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
    href: "https://www.norges-bank.no/tema/Statistikk/valutakurser/",
    label: "Norges Bank: Valutakurser",
  },
  {
    href: "https://lastebil.no/Aktuelt/Nyhetsarkiv/2025/Stigende-dieselpriser-avsluttet-2024-ny-kraftig-oekning-i-2025",
    label:
      "NLF: Stigende dieselpriser avsluttet 2024 – ny kraftig økning i 2025",
  },
  {
    href: "https://drivkraftnorge.no/prisen-paa-drivstoff/",
    label: "Drivkraft Norge: Prisen på drivstoff",
  },
  {
    href: "https://www.ssb.no/transport-og-reiseliv/landtransport/statistikk/drivstoffpriser",
    label: "SSB: Drivstoffpriser",
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
          publishedAtIso="2025-06-15T10:00:00+02:00"
          description={DESCRIPTION}
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Du følger med på oljeprisen. Du kjenner til avgiftene. Men det er én
            ting som kan dytte dieselprisen opp eller ned med over en krone
            literen – uten at de fleste legger merke til det: valutakursen.
          </p>

          <h2 className="text-xl font-bold">Olje handles i dollar</h2>

          <p>
            All råolje i verden – inkludert Nordsjø-oljen – prises i amerikanske
            dollar. Når norske drivstoffselskaper kjøper råolje eller ferdig
            raffinert diesel, betaler de i dollar. Det betyr at kursen mellom
            norske kroner og dollar avgjør hvor mye de faktisk betaler.
          </p>

          <p>
            Når dollaren er dyr, koster den samme oljen mer i kroner. Når
            dollaren er billig, blir oljen billigere – selv om prisen i dollar
            er helt uendret.
          </p>

          <h2 className="text-xl font-bold">Slik slår det ut i praksis</h2>

          <p>
            Tenk deg at oljeprisen er 70 dollar fatet. Hvor mye det koster i
            norske kroner, avhenger helt av valutakursen:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                    USD/NOK-kurs
                  </th>
                  <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                    Pris per fat i kroner
                  </th>
                  <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                    Forskjell
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-border/50 px-4 py-2.5">
                    10,00 kr
                  </td>
                  <td className="border-b border-border/50 px-4 py-2.5">
                    700 kr
                  </td>
                  <td className="border-b border-border/50 px-4 py-2.5">–</td>
                </tr>
                <tr>
                  <td className="border-b border-border/50 px-4 py-2.5">
                    10,50 kr
                  </td>
                  <td className="border-b border-border/50 px-4 py-2.5">
                    735 kr
                  </td>
                  <td className="border-b border-border/50 px-4 py-2.5">
                    +35 kr (+5 %)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">11,00 kr</td>
                  <td className="px-4 py-2.5">770 kr</td>
                  <td className="px-4 py-2.5">+70 kr (+10 %)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Samme olje, samme kvalitet, samme marked – men 70 kroner dyrere per
            fat bare fordi kronen er svakere. Det er ti prosent mer, uten at
            OPEC har gjort noe som helst.
          </p>

          <h2 className="text-xl font-bold">Hva betyr det på pumpa?</h2>

          <p>
            Et fat råolje er omtrent 159 liter. Etter raffinering gir det rundt
            100 liter diesel. Når dollaren går fra 10,00 til 11,00, koster
            råvaren alene 0,70 kr mer per liter. Men raffineringsmarginen og
            distribusjonskostnadene er også i stor grad dollarbaserte. Legg til
            moms, og effekten på pumpeprisen blir merkbar.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Tommelfingerregel
            </p>
            <p className="text-sm">
              Når dollarkursen stiger med 1 krone (f.eks. fra 10,00 til 11,00),
              øker pumpeprisen på diesel med omtrent 1,00–1,30 kr per liter –
              alt inkludert. Det høres kanskje lite ut. Men for en personbil med
              60-literstank betyr det 60–78 kroner mer per fylling. For et
              vogntog med 400-literstank: 400–520 kroner mer.
            </p>
          </div>

          <h2 className="text-xl font-bold">2025: Svak krone, dyrere diesel</h2>

          <p>
            Gjennom store deler av 2024 og inn i 2025 har den norske kronen vært
            svak mot dollar. I januar rapporterte NLF en dollarkurs på 11,52 –
            det høyeste på lenge. Gjennom våren 2025 har kursen ligget rundt
            10,50–11,00.
          </p>

          <p>
            Det betyr at selv når oljeprisen har vært moderat – rundt 70–75
            dollar fatet – har norske sjåfører betalt mer enn det oljeprisen
            alene skulle tilsi. Den svake kronen har vært en skjult prisdriver
            gjennom hele perioden.
          </p>

          <h2 className="text-xl font-bold">Hvorfor beveger kronen seg?</h2>

          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>Norges Banks styringsrente:</strong> Høyere rente i Norge
              kan styrke kronen fordi utenlandske investorer vil plassere penger
              her. Lavere rente kan svekke den.
            </li>
            <li>
              <strong>Global uro:</strong> Når det er usikkerhet i verden,
              flykter investorer til «trygge» valutaer – og dollaren regnes som
              den tryggeste. Det svekker kronen.
            </li>
            <li>
              <strong>Oljeprisparadokset:</strong> Norge er oljeeksportør. Når
              oljeprisen stiger, styrkes ofte kronen – noe som delvis demper
              priseffekten på diesel. Men det er bare en delvis motvirkning.
            </li>
          </ul>

          <h2 className="text-xl font-bold">Et regnestykke for flåteeiere</h2>

          <p>
            Si at du har fem lastebiler som bruker 50 000 liter diesel i året
            til sammen. Hvis dollarkursen ligger på 11,00 i stedet for 10,00 –
            og alt annet er likt – betaler du omtrent 50 000–65 000 kroner mer i
            året. Bare på valutakursen.
          </p>

          <p>
            Det er penger som ikke synes i noen avgiftsvedtak eller
            oljepriskurve. De forsvinner stille i vekslingskursen mellom kroner
            og dollar.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Hva kan du gjøre?
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              <li>
                Følg USD/NOK-kursen hos Norges Bank – den oppdateres daglig.
              </li>
              <li>
                Når du ser nyheter om «svak krone» eller «sterk dollar», vet du
                at dieselregningen trolig øker.
              </li>
              <li>
                For større flåter: vurder om drivstoffavtaler med fastpris eller
                pristak kan dempe svingningene.
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">Oppsummert</h2>

          <p>
            Dieselprisen er ikke bare olje pluss avgifter. Valutakursen er en
            tredje faktor som kan bety like mye som de to andre – og den er den
            faktoren færrest følger med på. Neste gang du ser at pumpeprisen har
            gått opp uten at oljeprisen har rørt seg: sjekk dollarkursen. Svaret
            ligger trolig der.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Les også
            </p>
            <ul className="space-y-2 text-sm">
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
                  href="/nyheter/hva-er-opec-og-hva-har-de-med-dieselprisen-a-gjore"
                >
                  Hva er OPEC+ og hva har de med dieselprisen å gjøre?
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

import type { Metadata } from "next";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE =
  "Regjeringen vil skjerme autodiesel i 2027 – anleggsdiesel får ikke samme kutt";
const DESCRIPTION =
  "Regjeringen foreslår lavere veibruksavgift og høyere CO₂-avgift i 2027. Merket anleggsdiesel får ingen lettelse i veibruksavgiften.";
const SLUG = "dieselavgifter-2027-autodiesel-anleggsdiesel";
const PUBLISHED_AT = "2026-11-15T19:29:45Z";
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
    publishedTime: PUBLISHED_AT,
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
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/avgiftssatser-2027/id3173439/",
    label:
      "Finansdepartementet: Avgiftssatser 2027 – vedtatte 2026-satser, foreslåtte 2027-satser og prisjustering",
  },
  {
    href: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/avgiftssatser-2026/id3121982/",
    label:
      "Finansdepartementet: Avgiftssatser 2026 – midlertidige lettelser og satser fra 1. september",
  },
  {
    href: "https://www.regjeringen.no/no/dokumenter/prop.-1-ls-20262027/id3176120/?ch=2",
    label:
      "Prop. 1 LS (2026–2027): punkt 10.8.1–10.8.2 om veibruksavgift, merket olje og biodiesel; punkt 10.12 om CO₂-avgift",
  },
  {
    href: "https://www.regjeringen.no/no/dokumenter/prop.-1-ls-20262027/id3176120/?ch=26",
    label:
      "Prop. 1 LS (2026–2027): forslag til vedtak om veibruksavgift, §§ 1–2, fra 1. januar 2027",
  },
  {
    href: "https://stortinget.no/no/Saker-og-publikasjoner/Statsbudsjettet/statsbudsjettet-2027/",
    label:
      "Stortinget: Statsbudsjettet 2027 – fremleggelsen 7. oktober og budsjettbehandlingen",
  },
];

const Page = () => (
  <div className="min-h-screen bg-background">
    <Header activeNav="news" variant="content" />
    <main>
      <NewsArticleLayout
        canonicalUrl={CANONICAL}
        category="Nyhet"
        publishedAtIso={PUBLISHED_AT}
        description={DESCRIPTION}
        sources={SOURCES}
        title={TITLE}
      >
        <p className="text-lg font-medium">
          Regjeringen vil kutte veibruksavgiften på autodiesel for å dempe
          virkningen av høyere CO₂-avgift fra nyttår. Merket anleggsdiesel har
          ingen veibruksavgift å kutte. For 1 000 liter helt fossil
          anleggsdiesel betyr forslaget 710 kroner mer i CO₂-avgift før mva.
        </p>
        <p>
          Statsbudsjettet for 2027 ble lagt frem 7. oktober. Per 15. november er
          dette regjeringens forslag, ikke endelig vedtatte satser. Stortingets
          behandling kan endre opplegget.
        </p>
        <h2 className="text-xl font-bold">Satsene regjeringen foreslår</h2>
        <p>
          Sammenligningen gjelder de ordinære 2026-satsene som gjelder etter 1.
          september, etter at sommerens midlertidige lettelser tok slutt. Alle
          beløp i tabellen er kroner per liter uten mva.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border-b border-border px-4 py-3 text-left font-semibold"
                >
                  Avgift og drivstoff
                </th>
                <th
                  scope="col"
                  className="border-b border-border px-4 py-3 text-left font-semibold"
                >
                  Ordinær sats i 2026
                </th>
                <th
                  scope="col"
                  className="border-b border-border px-4 py-3 text-left font-semibold"
                >
                  Forslag fra 1. januar 2027
                </th>
                <th
                  scope="col"
                  className="border-b border-border px-4 py-3 text-left font-semibold"
                >
                  Endring
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-border px-4 py-3">
                  Veibruksavgift på mineralolje til veibruk
                </td>
                <td className="border-b border-border px-4 py-3">2,28</td>
                <td className="border-b border-border px-4 py-3">1,84</td>
                <td className="border-b border-border px-4 py-3">−0,44</td>
              </tr>
              <tr>
                <td className="border-b border-border px-4 py-3">
                  Veibruksavgift på biodiesel til veibruk
                </td>
                <td className="border-b border-border px-4 py-3">2,28</td>
                <td className="border-b border-border px-4 py-3">1,84</td>
                <td className="border-b border-border px-4 py-3">−0,44</td>
              </tr>
              <tr>
                <td className="border-b border-border px-4 py-3">
                  CO₂-avgift på mineralolje, generell sats
                </td>
                <td className="border-b border-border px-4 py-3">4,42</td>
                <td className="border-b border-border px-4 py-3">5,13</td>
                <td className="border-b border-border px-4 py-3">+0,71</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Mineralolje er her den fossile dieselen. CO₂-avgiften gjelder den
          fossile delen av en blanding, mens veibruksavgiften gjelder både
          fossil diesel og biodiesel til veibruk. Derfor kan ikke de to satsene
          bare legges sammen og omtales som avgiften på en vanlig liter
          autodiesel.
        </p>
        <h2 className="text-xl font-bold">
          Hvorfor omtales kuttet som 50 øre?
        </h2>
        <p>
          Forskjellen mellom 2,28 og 1,84 kroner er 44 øre. Regjeringens kutt på
          50 øre sammenligner i stedet med en sats som først er justert opp for
          forventet prisvekst på 2,7 prosent:
        </p>
        <p>
          <strong>2,28 × 1,027 − 0,50 = 1,84156 kroner</strong>, avrundet til{" "}
          <strong>1,84 kroner per liter</strong>.
        </p>
        <p>
          Det er altså to ulike sammenligninger. Den faktiske satsen faller med
          44 øre fra 2026. Kuttet er 50 øre sammenlignet med det prisjusterte
          utgangspunktet for 2027.
        </p>
        <h2 className="text-xl font-bold">
          Ingen lettelse i veibruksavgiften på merket anleggsdiesel
        </h2>
        <p>
          Merket anleggsdiesel er fritatt for veibruksavgift. Dermed får den
          heller ingen motvekt fra dette avgiftskuttet når CO₂-satsen stiger.
        </p>
        <p>
          Et regneeksempel viser utslaget for{" "}
          <strong>
            1 000 liter anleggsdiesel som er helt fossil og omfattes av den
            generelle CO₂-satsen
          </strong>
          , med samme sammensetning begge år:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Økt CO₂-avgift: 5,13 − 4,42 = <strong>0,71 kroner per liter</strong>
            .
          </li>
          <li>
            For 1 000 liter: 0,71 × 1 000 ={" "}
            <strong>710 kroner uten mva.</strong>
          </li>
          <li>
            Med 25 prosent mva.: 710 × 1,25 = <strong>887,50 kroner</strong>.
          </li>
        </ul>
        <p>
          Dette er en beregnet avgiftsendring for det beskrevne drivstoffet. Den
          er ikke en pris fra en leverandør eller et anslag for enhver
          anleggsdieselblanding. Med en lavere fossilandel blir økningen i
          CO₂-avgiften mindre.
        </p>
        <h2 className="text-xl font-bold">
          Skjerming av autodiesel er ingen garanti for pumpeprisen
        </h2>
        <p>
          Finansdepartementet vurderer endringene samlet som omtrent uendret
          avgift på autodiesel etter prisjustering. Det betyr ikke at
          kronebeløpet er uendret for alle blandinger. Andelen biodrivstoff
          påvirker avgiften per liter.
        </p>
        <p>
          For sjåfører og flåteeiere gir forslaget derfor ingen garanti om
          uendret pumpepris. Avgiftsberegningen alene fastsetter ikke hva en
          stasjon vil ta betalt ved nyttår.
        </p>
      </NewsArticleLayout>
    </main>
  </div>
);
export default Page;

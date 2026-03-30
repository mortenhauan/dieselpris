import type { Metadata } from "next";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Krig i Midtøsten sender dieselprisen over 30 kroner";
const DESCRIPTION =
  "Angrepet på Iran og stenging av Hormuz-stredet har sendt oljeprisen til 119 dollar fatet. Dieselen har passert 30 kroner literen på norske pumper.";
const SLUG = "krig-i-midtosten-sender-dieselprisen-over-30-kroner";
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
    href: "https://today.reuters.com/markets/commodities/energy/how-strait-hormuz-closure-impacts-global-oil-supply-2026-03-11/",
    label:
      "Reuters: How the Strait of Hormuz closure affects global oil supply",
  },
  {
    href: "https://lastebil.no/aktuelt/nyheter/2026/dieselprisene-stiger-kraftig-nlf-ber-medlemsbedriftene-foelge-noeye-med",
    label: "NLF: Dieselprisene stiger kraftig",
  },
  {
    href: "https://www.iea.org/reports/oil-market-report-march-2026",
    label: "IEA: Oil Market Report March 2026",
  },
  {
    href: "https://www.argusmedia.com/en/news-and-insights/latest-market-news/2803177-physical-nwe-diesel-cracks-nearing-record-highs",
    label: "Argus Media: Physical NWE diesel cracks nearing record highs",
  },
];

const Page = function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeNav="news" variant="content" />
      <main>
        <NewsArticleLayout
          category="Nyhet"
          publishedAtIso="2026-03-20T14:00:00+01:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            Diesel koster nå over 25 kroner literen på de fleste norske pumper.
            På de dyreste stasjonene har prisen passert 30 kroner. Siden
            angrepet på Iran 28. februar har dieselprisen steget 26 prosent – og
            den fortsetter oppover.
          </p>

          <p>
            Bak de høye tallene på pumpedisplayet står en krig som rammer
            verdens oljemarked hardt. USA og Israel angrep Iran i en koordinert
            operasjon den siste februardagen. Iran svarte med ballistiske
            missiler og droner mot israelske byer, amerikanske baser og
            Gulfstatene. Tre uker senere er konflikten langt fra over.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Hva betyr det for deg?
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Personbil (60 L):</strong> En fylling koster ca. 420 kr
                mer enn for tre uker siden (fra ~18 til ~25 kr/l). På de dyreste
                stasjonene: 720 kr mer.
              </li>
              <li>
                <strong>Lastebil (400 L tank):</strong> Ca. 2 800 kr mer per
                fylling. For vogntog som fyller daglig, kan det bety over 50 000
                kr ekstra i måneden.
              </li>
              <li>
                <strong>Fiskebåt, anlegg:</strong> Dieselen brukt i sjøfart og
                anlegg følger samme råvarepris. Hele bransjer merker det.
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">Hormuz-stredet er stengt</h2>

          <p>
            Den 2. mars erklærte Irans revolusjonsgarde Hormuz-stredet stengt
            for skipstrafikk. Ni dager senere begynte Iran å legge sjøminer i
            det trange farvannet mellom Iran og Oman.
          </p>

          <p>
            Gjennom dette stredet fraktes normalt rundt 20 prosent av verdens
            daglige oljeforsyning. Når det stenger, forsvinner millioner av fat
            olje fra markedet – og prisen reagerer umiddelbart.
          </p>

          <p>
            Brent-oljen har steget fra rundt 68 dollar fatet til mellom 119 og
            126 dollar i går, 19. mars. Det er en økning på 72 prosent på tre
            uker.
          </p>

          <h2 className="text-xl font-bold">
            Diesel rammes hardere enn råoljen
          </h2>

          <p>
            Dieselprisen har steget enda mer enn oljeprisen. Det er flere
            grunner til det.
          </p>

          <p>
            Europeiske raffinerier er midt i planlagt vårvedlikehold.
            Kapasiteten er redusert fra 11,3 til 11 millioner fat per dag. Det
            betyr at det lages mindre diesel av den oljen som faktisk kommer
            fram.
          </p>

          <p>
            I tillegg er Yanbu-raffineriet i Saudi-Arabia, som leverer rundt 15
            prosent av all diesel til EU og Storbritannia, truet av droneangrep.
            ICE gasoil-futures har hoppet over 11 prosent til omtrent 1 337
            dollar per tonn.
          </p>

          <p>
            Raffineringsmarginen – forskjellen mellom hva råolje koster og hva
            ferdig diesel selges for – nådde 69 dollar fatet 18. mars. Det er
            den høyeste marginen siden energikrisen i 2022.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Nøkkeltall (per 19. mars)
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Brent råolje:</strong> 119–126 $/fat (opp 72 % fra 68 $)
              </li>
              <li>
                <strong>ICE gasoil:</strong> ~1 337 $/tonn (opp 11 %+)
              </li>
              <li>
                <strong>Dieselmargin (crack spread):</strong> 69 $/fat – høyeste
                siden 2022
              </li>
              <li>
                <strong>Norsk dieselpris:</strong> Median over 25 kr/l, enkelte
                over 30 kr/l
              </li>
              <li>
                <strong>Circle K:</strong> +1,96 kr/l på to dager (2.–4. mars),
                opp 11,8 %
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">NLF: Kan ikke fortsette slik</h2>

          <p>
            Norges Lastebileier-Forbund (NLF) advarer om alvorlige konsekvenser
            for transportnæringen. Drivstoff utgjør rundt 30 prosent av
            driftskostnadene for et vogntog. Når dieselen stiger 26 prosent på
            ti dager, treffer det rett i bunnlinjen.
          </p>

          <p>
            NLF ber myndighetene handle raskt. De krever midlertidige
            avgiftslettelser for å dempe prissjokket. Uten tiltak frykter
            forbundet at mange transportbedrifter vil slite med å holde hjulene
            i gang.
          </p>

          <h2 className="text-xl font-bold">
            IEA slipper nødlagre – men det er ikke nok
          </h2>

          <p>
            Det internasjonale energibyrået (IEA) har frigjort 400 millioner fat
            fra strategiske lagre. Det er den største nødfrigivelsen i
            historien. Tiltaket skal dempe prisoppgangen, men så lenge
            Hormuz-stredet er stengt, er det som å tømme et badekar med hullet
            åpent.
          </p>

          <h2 className="text-xl font-bold">Hva skjer nå?</h2>

          <p>
            USA har satt i gang luftoperasjoner for å gjenåpne stredet. Over 140
            iranske marinefartøy er ødelagt. Men Iran holder foreløpig stand og
            slipper bare gjennom skip fra land som ikke er alliert med Vesten.
            Fredsforslag fra USA er avvist.
          </p>

          <p>
            Frontmånedskontrakten for gasoil handles med et premium på 157
            dollar per tonn over neste måned – et tegn på at markedet venter at
            knappheten fortsetter.
          </p>

          <p>
            For norske sjåfører, lastebileiere og fiskere betyr det at det ikke
            er noen rask løsning i sikte. Prisene kan holde seg høye – eller
            stige videre – så lenge konflikten pågår.
          </p>

          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              Situasjonen akkurat nå (20. mars)
            </p>
            <ul className="space-y-2 text-sm">
              <li>Hormuz-stredet er fortsatt stengt for vestlige skip</li>
              <li>Oljeprisen holder seg over 119 dollar fatet</li>
              <li>Norsk diesel ligger mellom 25 og 30+ kr/l</li>
              <li>IEA har sluppet nødlagre, men effekten er begrenset</li>
              <li>NLF krever midlertidige avgiftskutt fra regjeringen</li>
            </ul>
          </div>
        </NewsArticleLayout>
      </main>
    </div>
  );
};

export default Page;

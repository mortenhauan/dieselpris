import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE =
  "Våpenhvile mellom USA og Iran – oljeprisen stuper, men dieselen forblir dyr";
const DESCRIPTION =
  "USA og Iran har inngått to ukers våpenhvile. Oljeprisen falt 14 prosent på én natt – men norske dieselpriser forblir høye i måneder fremover.";
const SLUG = "vapenhvile-iran-oljeprisen-stuper-men-dieselen-forblir-dyr";
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
    href: "https://www.reuters.com/world/asia-pacific/trump-agrees-two-week-ceasefire-iran-says-safe-passage-through-hormuz-possible-2026-04-08/",
    label:
      "Reuters: US and Iran agree to two-week ceasefire brokered by Pakistan",
  },
  {
    href: "https://www.bbc.com/news/articles/c8r40y3rv75o",
    label: "BBC: Oil prices plunge on US-Iran ceasefire deal",
  },
  {
    href: "https://www.reuters.com/business/energy/fuel-prices-could-keep-rising-months-after-hormuz-reopens-us-eia-says-2026-04-07/",
    label:
      "Reuters: Fuel prices could keep rising for months even if Hormuz reopens, EIA says",
  },
  {
    href: "https://english.elpais.com/economy-and-business/2026-03-25/it-will-take-the-oil-market-three-to-five-months-to-return-to-normal-even-after-a-potential-ceasefire.html",
    label:
      "El País: It will take the oil market 3–5 months to return to normal",
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
          publishedAtIso="2026-04-08T10:00:00+02:00"
          sources={SOURCES}
          title={TITLE}
        >
          <p className="text-lg font-medium">
            I natt falt oljeprisen 14 prosent etter at USA og Iran ble enige om
            en to ukers våpenhvile. Hormuz-stredet kan gjenåpnes for
            skipstrafikk. Men eksperter advarer: det vil ta måneder før
            dieselprisen på norske pumper vender tilbake til normalen.
          </p>

          <h2 className="text-xl font-bold">Hva skjedde?</h2>

          <p>
            Sent tirsdag kveld amerikansk tid kunngjorde president Trump en
            våpenhvile med Iran. Avtalen ble meglet frem av Pakistan, og
            Pakistans statsminister Shehbaz Sharif inviterte begge parter til
            Islamabad for videre forhandlinger fra fredag.
          </p>

          <p>
            Iran har gått med på å tillate fri gjennomfart i Hormuz-stredet i to
            uker, koordinert av Irans væpnede styrker. Iran og Oman vil kreve
            avgifter av skip som passerer. Iran la også frem en tipunktsplan som
            Trump kalte «et brukbart grunnlag for videre forhandlinger».
          </p>

          <p>
            Trump kalte avtalen en «total og fullstendig seier». Iran kalte den
            «et ubestridelig, historisk nederlag for fienden». Israels Netanyahu
            støtter den to uker lange pausen, men understreker at den ikke
            inkluderer krigen mot Hizbollah i Libanon.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Hva skjedde i natt?
            </p>
            <ul className="space-y-2 text-sm">
              <li>USA og Iran enige om to ukers våpenhvile</li>
              <li>
                Pakistan meglet frem avtalen – forhandlinger starter fredag i
                Islamabad
              </li>
              <li>Iran åpner Hormuz-stredet for skipstrafikk i to uker</li>
              <li>
                Iran la frem en tipunktsplan med bl.a. krav om
                sanksjonslettelser, tilbaketrekking av amerikanske styrker og
                aksept av Irans kjernefysiske program
              </li>
              <li>Begge sider hevder seier – kjernekravene er uløste</li>
              <li>Brent-oljen falt ~14 % til ca. 94 dollar fatet</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">
            Oljeprisen: største fall siden 1991
          </h2>

          <p>
            Brent-oljen falt fra rundt 109 til ca. 94 dollar fatet over natten –
            et fall på omtrent 14 prosent. WTI falt til ca. 96 dollar, ned 14–15
            prosent. Det er det største fallet i oljepris på én dag siden
            Golfkrigen i 1991.
          </p>

          <p>
            Asiatiske børser steg 3–6 prosent i morges, og amerikanske futures
            peker opp ca. 2,3 prosent.
          </p>

          <p>
            Men oljeprisen er fortsatt rundt 35 prosent høyere enn før krigen.
            Før angrepet 28. februar lå Brent på 68–73 dollar fatet. Selv etter
            nattens fall er prisen langt over det nivået.
          </p>

          <p>
            ICE gasoil – råvareprisen som bestemmer hva norsk diesel koster –
            falt enda brattere: fra rundt 1 450 dollar per tonn til ca. 1 175 i
            natt, et fall på 19 prosent. Men allerede midt på dagen har prisen
            hentet seg inn til ca. 1 241 dollar. Markedet er tydelig usikkert på
            om våpenhvilen holder.
          </p>

          <h2 className="text-xl font-bold">Hva betyr det for norsk diesel?</h2>

          <p>
            Dieselprisen på norske pumper har falt fra toppen på over 30 kroner
            literen i slutten av mars, blant annet takket være at
            veibruksavgiften ble fjernet midlertidig fra 1. april – en
            besparelse på 2,85 kr/l for diesel og 4,41 kr/l for bensin.
          </p>

          <p>
            Men avgiftskuttene slo bare delvis gjennom med én gang. Dagen etter
            1. april falt dieselprisen bare 35 øre – ikke de fulle 2,85 kronene.
            Prisen har siden beveget seg ned, og i påsken lå de billigste
            stasjonene i Oslo på rundt 21,54 kr/l.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Dieselregning: før, under og nå
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Personbil (60 L) før krigen:</strong> ca. 1 189 kr
                (snitt 19,82 kr/l i februar, SSB)
              </li>
              <li>
                <strong>Personbil (60 L) på toppen:</strong> ca. 1 800 kr (30
                kr/l i slutten av mars) – 611 kr mer
              </li>
              <li>
                <strong>Personbil (60 L) nå med avgiftskutt:</strong> ca. 1 380
                kr (~23 kr/l)
              </li>
              <li>
                <strong>Langdistanse lastebil (400 L tank):</strong> hver krone
                per liter = 400 kr per fylling
              </li>
              <li>
                <strong>Fisker (2 000 L/uke):</strong> hver krone per liter = 2
                000 kr/uke
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Tallene er illustrerende estimater basert på historiske marginer
              og avgiftsnivå per april 2026. Faktisk pris avhenger av kronekurs,
              råvarepris og stasjonens marginer.
            </p>
          </div>

          <h2 className="text-xl font-bold">Derfor vil det ta måneder</h2>

          <p>
            Det amerikanske energibyrået EIA anslår at full gjenoppretting av
            oljestrømmen gjennom Hormuz vil ta måneder, selv om stredet
            gjenåpnes i dag. EIA har hevet sin prognose for gjennomsnittlig
            Brent-pris i 2026 med 22 prosent, til 96 dollar fatet.
          </p>

          <p>
            Ifølge Reuters og El País rapporter står over 2 000 skip i kø i
            Persiagulfen. Bare å rydde køen vil ta uker. Analytikere anslår at
            Kuwait alene kan trenge opptil fire måneder for å gjenopprette
            produksjonen. Skadet infrastruktur i regionen, blant annet ved
            Qatars Ras Laffan-anlegg, beskrives som kostbar og tidkrevende å
            reparere.
          </p>

          <p>
            Konflikten har holdt anslagsvis 7,5 millioner fat råolje per dag
            utenfor markedet. Diesel og flybensin er ekstra utsatt fordi
            Midtøsten er en nøkkelleverandør både av ferdig drivstoff og av de
            tunge råoljesortene som trengs for å raffinere diesel.
            Luftfartsorganisasjonen IATA sier det vil ta måneder før
            flybensinmarkedet normaliseres fordi raffineriene må startes opp på
            nytt.
          </p>

          <p>
            Risikopremien i oljeprisen vil trolig holde seg så lenge de
            underliggende kravene er uløste. To uker er kort tid.
          </p>

          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              Usikkerhetene er store
            </p>
            <ul className="space-y-2 text-sm">
              <li>Våpenhvilen varer bare to uker – den kan bryte sammen</li>
              <li>
                Irans kjerneforlangender er uløste: sanksjonslettelser,
                tilbaketrekking av amerikanske styrker, aksept av
                atomprogrammet, krigserstatning og frigivelse av frosne midler
              </li>
              <li>
                Iran beholder kontrollen over Hormuz-stredet og kan stenge det
                igjen
              </li>
              <li>
                Selv med gjenåpning tar det måneder å normalisere
                oljeforsyningen
              </li>
              <li>
                Norge er Europas største olje- og gassprodusent etter Russland –
                høye oljepriser gavner staten og oljeselskapene, men rammer
                forbrukere, transportører og fiskere
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
                  href="/nyheter/krig-i-midtosten-sender-dieselprisen-over-30-kroner"
                >
                  Krig i Midtøsten sender dieselprisen over 30 kroner
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium underline underline-offset-4"
                  href="/nyheter/drivstoffavgiftene-kuttes-fra-1-april"
                >
                  Drivstoffavgiftene kuttes fra 1. april
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
            </ul>
          </div>
        </NewsArticleLayout>
      </main>
    </div>
  );
};

export default Page;

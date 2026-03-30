import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { NewsArticleLayout } from "@/components/news-article-layout";
import type { NewsSource } from "@/lib/news-articles";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Kan EU kreve ny avgift på diesel i Norge?";
const DESCRIPTION =
  "Stortinget debatterte om Norge skulle stoppe ETS2 – et nytt EU-system som kan legge en ekstra kvotepris oppå dieselavgiftene du allerede betaler.";
const SLUG = "kan-eu-kreve-ny-avgift-pa-diesel-i-norge";
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
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Saker/Sak/?p=104877",
    label: "Stortinget: saksgang ETS2-forslaget",
  },
  {
    href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Publikasjoner/Representantforslag/2025-2026/dok8-202526-008s/",
    label: "Representantforslaget fra Senterpartiet",
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
          publishedAtIso="2026-01-29T14:00:00+01:00"
          description={DESCRIPTION}
          sources={SOURCES}
          title={TITLE}
        >
          <div className="rounded-2xl border border-accent bg-accent/10 p-5">
            <p className="text-sm font-semibold">
              Oppdatering 3. februar 2026:
            </p>
            <p className="mt-1 text-sm">
              Stortinget har stemt. Forslaget om å stoppe ETS2 ble nedstemt med
              bredt flertall.{" "}
              <Link
                className="font-medium underline underline-offset-4"
                href="/nyheter/stortinget-sa-ja-til-ets2"
              >
                Les om vedtaket og hva det betyr for dieselprisen.
              </Link>
            </p>
          </div>

          <p className="text-lg font-medium">
            En ny EU-avgift kan komme oppå det du allerede betaler for diesel.
            Stortinget debatterte 29. januar om Norge skulle si nei – eller la
            det skje.
          </p>

          <h2 className="text-xl font-bold">Hva handler dette om?</h2>

          <p>
            EU har vedtatt noe som heter ETS2. Det er et nytt kvotehandelssystem
            for klimagassutslipp – men denne gangen gjelder det ikke bare
            industri og kraftverk. ETS2 dekker veitransport, oppvarming av bygg
            og flere andre sektorer. Det betyr at drivstoff du tanker på pumpa
            kan bli omfattet.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              ETS2 i korte trekk
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                ETS2 er en del av EUs «Fit for 55»-pakke – målet er å kutte
                utslipp med 55 prosent innen 2030.
              </li>
              <li>
                Drivstoffdistributører må kjøpe utslippskvoter for diesel og
                bensin de selger.
              </li>
              <li>
                Kostnaden for kvotene veltes videre til pumpeprisen – altså til
                deg som tanker.
              </li>
              <li>Systemet er utsatt til tidligst 2028.</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold">Hva skjedde i Stortinget?</h2>

          <p>
            I oktober 2025 leverte Senterpartiets Maren Grøthe og Trygve
            Slagsvold Vedum et representantforslag (Dokument 8:8 S) om at Norge
            skal reservere seg mot ETS2 gjennom EØS-avtalen. Forslaget ble sendt
            til Energi- og miljøkomiteen, som leverte sin innstilling (Innst. 58
            S) den 9. desember. Stortinget debatterte saken 29. januar og stemte
            3. februar.
          </p>

          <p>
            Senterpartiet mente Norge allerede betaler nok for utslipp gjennom
            CO₂-avgiften, og at ETS2 ville legge en ekstra byrde på folk som er
            avhengige av bil og diesel i hverdagen – lastebilsjåfører,
            anleggsfolk, bønder, fiskere.
          </p>

          <h2 className="text-xl font-bold">
            Hva kan dette bety for literprisen?
          </h2>

          <p>
            Ingen vet eksakt hva kvoteprisen i ETS2 vil bli. Det avhenger av
            tilbud og etterspørsel i kvotemarkedet. Men mekanismen er enkel: jo
            høyere kvotepris, desto mer koster det distributøren – og det ender
            opp på regningen din.
          </p>

          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Slik fungerer det i praksis
            </p>
            <p className="text-sm">
              Tenk deg at ETS2-kvoteprisen lander på 50 euro per tonn CO₂.
              Diesel slipper ut omtrent 2,64 kg CO₂ per liter. Da gir det et
              påslag på rundt 1,20–1,50 kroner per liter (avhengig av
              valutakurs) – oppå veibruksavgift og CO₂-avgift du allerede
              betaler. Lander kvoteprisen høyere, blir påslaget høyere.
            </p>
          </div>

          <p>
            Norge har allerede blant Europas høyeste avgifter på diesel. I dag
            betaler du veibruksavgift, CO₂-avgift og moms. ETS2 ville legge seg
            som et nytt lag oppå disse.
          </p>

          <h2 className="text-xl font-bold">Hvem vil hva?</h2>

          <p>
            Senterpartiet ville at Norge skulle bruke reservasjonsretten i
            EØS-avtalen for å holde ETS2 ute. De pekte på at norske sjåfører og
            næringsdrivende allerede bærer en høy klimaregning, og at et nytt
            kvotesystem rammer distriktene hardest.
          </p>

          <p>
            Et flertall i Energi- og miljøkomiteen – Arbeiderpartiet, Høyre, SV,
            MDG og Venstre – mente at Norge bør følge EU på dette feltet, som
            del av klimapolitikken. De argumenterte for at felles regler gir
            like konkurransevilkår og at ETS2 er nødvendig for å nå klimamålene.
          </p>

          <h2 className="text-xl font-bold">Hva skjedde videre?</h2>

          <p>
            Stortinget stemte over forslaget 3. februar 2026. Senterpartiets
            forslag ble nedstemt med bredt flertall.{" "}
            <Link
              className="font-medium underline underline-offset-4"
              href="/nyheter/stortinget-sa-ja-til-ets2"
            >
              Les om vedtaket og hva det betyr for dieselprisen.
            </Link>
          </p>
        </NewsArticleLayout>
      </main>
    </div>
  );
};

export default Page;

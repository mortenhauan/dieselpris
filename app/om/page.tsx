import type { Metadata } from "next";

import { Header } from "@/components/header";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/om` },
  description:
    "Om dieselpris.no, markedskildene, prisestimatene og hvordan nyhetssakene kontrolleres.",
  title: "Om siden og kildene | Dieselpris.no",
};

const Page = () => (
  <>
    <Header variant="content" />
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-16 md:py-24">
      <h1 className="text-4xl font-bold tracking-tight">Om siden og kildene</h1>
      <p>
        Dieselpris.no er en uavhengig, annonsefri side for sjåfører og
        flåteeiere som vil forstå hva som påvirker dieselprisen. Siden er ikke
        tilknyttet drivstoffkjeder.
      </p>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Markedspris og prisestimat</h2>
        <p>
          Råvareprisen er ICE Low Sulphur Gasoil, hentet gjennom TradingView.
          Dette er en futuresreferanse for dieselråvare, ikke prisen på din
          lokale stasjon. Børsdatoen viser hvilken dagsnotering tallet gjelder.
        </p>
        <p>
          Omregning til kroner bruker Norges Banks siste publiserte USD/NOK-kurs
          på eller før børsdagen og en fast antakelse om 1176 liter per tonn.
          Mangler valutakursen, vises ikke NOK-beregningen.
        </p>
        <p>
          Pumpeprisestimatet legger til offentlige avgiftssatser, MVA og et
          modellert regionalt påslag. Faktisk biodrivstoffinnblanding,
          innkjøpsvilkår og lokale stasjonsmarginer kan gi andre priser.
          Historikken bruker avgiftssatsene for hver kalenderdag. Forslag til
          nye satser er merket og brukes bare i fremtidsanslag.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Nyheter og ansvar</h2>
        <p>
          Utgiver har det redaksjonelle ansvaret. KI brukes som hjelp til
          research, utkast og kildekontroll. Nye saker og vesentlige
          oppdateringer skal gjennom to separate kontroller av fakta,
          beregninger og kildebruk før utgiver godkjenner publisering.
        </p>
        <p>
          Artiklene beskriver situasjonen på publiseringsdatoen. Ved vesentlige
          oppdateringer beholdes den opprinnelige datoen, og endringen forklares
          med en egen oppdateringsdato. Eldre artikler er ikke en oversikt over
          dagens priser og regler.
        </p>
        <p>
          Vær Varsom-plakatens prinsipper om saklighet, kildekritikk og tydelig
          skille mellom fakta og vurderinger ligger til grunn for arbeidet.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Kilder og begrensninger</h2>
        <p>
          Markedsdata kan være forsinket eller midlertidig utilgjengelige.
          Offentlige satser kontrolleres mot Skatteetaten, regjeringen og
          regelverket. Kildene står ved forklaringene og nederst i nyhetssakene.
          Tallene er veiledende og gir ingen prisgaranti eller finansrådgivning.
        </p>
      </section>
    </main>
  </>
);

export default Page;

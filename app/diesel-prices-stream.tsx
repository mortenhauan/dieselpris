import type { ReactNode } from "react";

import { DieselBrentLogChart } from "@/components/diesel-brent-log-chart";
import { FuturesForecast } from "@/components/futures-forecast";
import { HomeNewsHighlight } from "@/components/home-news-highlight";
import { PriceChart } from "@/components/price-chart";
import { PriceHero, PriceHeroUnavailable } from "@/components/price-hero";
import { RegionalMargins } from "@/components/regional-margins";
import { TaxBreakdown } from "@/components/tax-breakdown";
import { TaxExplainer } from "@/components/tax-explainer";
import { DIESEL_LITERS_PER_METRIC_TON } from "@/lib/diesel-prices-payload";
import { getDieselPricesData } from "@/lib/get-diesel-prices";
import { rawPlusPublicDutiesNokPerLiter } from "@/lib/pump-price-model";
import { getRegionPriceProfile } from "@/lib/regional-price-model";
import type { RegionId } from "@/lib/regional-price-model";

export const DieselPricesStream = async function DieselPricesStream({
  regionId,
}: {
  regionId: RegionId;
}) {
  const data = await getDieselPricesData();
  const region = getRegionPriceProfile(regionId);
  const currentPrice = data.current;
  const { contracts } = data;
  const { brent_historical, historical } = data;
  const exchangeRate = data.exchange_rate.usd_nok;
  const hasLive = currentPrice !== null;
  const dutyReferenceDate =
    data.historical.at(-1)?.date ?? data.updated_at.slice(0, 10);
  const priceNokLiterPlusDuties =
    hasLive && currentPrice
      ? rawPlusPublicDutiesNokPerLiter(
          currentPrice.price_nok_liter,
          dutyReferenceDate
        )
      : 0;

  let forecastBlock: ReactNode;
  if (hasLive) {
    forecastBlock =
      contracts.length > 0 ? (
        <FuturesForecast
          contracts={contracts}
          exchangeRate={exchangeRate}
          regionId={regionId}
        />
      ) : (
        <p className="text-sm text-muted-foreground max-w-2xl">
          Måned-for-måned-oversikten mangler akkurat nå. Grafen med siste
          måneder og dagens råvarepris over fungerer som vanlig.
        </p>
      );
  } else {
    forecastBlock = (
      <p className="text-sm text-muted-foreground max-w-2xl">
        Prognosen kan ikke vises akkurat nå. Sjekk igjen senere i dag.
      </p>
    );
  }

  return (
    <main>
      {hasLive ? (
        <PriceHero
          priceUsdMt={currentPrice.price_usd_mt}
          priceNokLiter={currentPrice.price_nok_liter}
          priceNokLiterPlusDuties={priceNokLiterPlusDuties}
          changePercent={currentPrice.change_percent}
          updatedAt={data.updated_at}
          exchangeSource={data.exchange_rate.source}
        />
      ) : (
        <PriceHeroUnavailable updatedAt={data.updated_at} />
      )}

      <HomeNewsHighlight />

      <section id="priser" className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
              Prissammensetting
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Se hvordan råvarepris, avgifter og modellert regional distribusjon
              bygger opp prisestimatet. Dette er pedagogikk og indikasjon — ikke
              en fasit eller garanti for hva du betaler på stasjonen.
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              Valgt region:{" "}
              <span className="font-medium text-foreground">
                {region.label}
              </span>
              . Dette påvirker bare estimatene under, ikke den nasjonale
              råvareprisen øverst.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 items-stretch">
            <div className="lg:col-span-3 h-full">
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Estimert pumpepris (90 dager)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Estimert pumpepris for {region.label.toLowerCase()}.
                    Historiske punkter bruker avgiftssatsene som gjaldt på
                    datoen.
                  </p>
                </div>
                {historical.length > 0 ? (
                  <PriceChart data={historical} regionId={regionId} />
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Ingen data tilgjengelig
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 h-full">
              {hasLive ? (
                <TaxBreakdown
                  dutyReferenceDate={dutyReferenceDate}
                  rawPrice={currentPrice.price_nok_liter}
                  regionId={regionId}
                />
              ) : (
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8 h-full flex items-center justify-center text-center text-sm text-muted-foreground">
                  Straks dagens råvarepris er på plass, ser du her hvordan den
                  fordeles på avgifter og margin.
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Gasoil og Brent (90 dager, log)
                </h3>
                <p className="text-sm text-muted-foreground max-w-3xl">
                  Samme tidsrom som grafen over:{" "}
                  <strong className="font-medium text-foreground">
                    gasoil
                  </strong>{" "}
                  (dieselråvare, USD per tonn) mot{" "}
                  <strong className="font-medium text-foreground">Brent</strong>{" "}
                  (råolje, USD per fat). Hver serie har egen akse og{" "}
                  <strong className="font-medium text-foreground">
                    logaritmisk skala
                  </strong>
                  , så lik avstand på aksen betyr omtrent lik prosentvis endring
                  — nyttig for å se om begge beveger seg i samme retning.
                  Enhetene er fortsatt ulike; dette er ikke et prisforhold i
                  kroner per liter. Er kalenderdagen nyere enn siste felles
                  handelsdag, strekkes linjen til visningsdato med samme nivåer
                  som i råvarekortet øverst.
                </p>
              </div>
              {historical.length > 1 && brent_historical.length > 1 ? (
                <DieselBrentLogChart
                  brent={brent_historical}
                  historical={historical}
                  {...(hasLive && currentPrice
                    ? {
                        spotAsOfDate: data.updated_at.slice(0, 10),
                        spotBrentUsdBbl:
                          brent_historical.at(-1)?.usd_per_barrel,
                        spotGasoilUsdMt: currentPrice.price_usd_mt,
                      }
                    : {})}
                />
              ) : (
                <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
                  Sammenligningen krever både gasoil- og Brentdata akkurat nå.
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-4">
                Kilde: ICE (sammenhengende serier), samme kanal som øvrige
                råvarekurser — indikativ og forsinket.
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-2xl rounded-xl border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-2">
              Avvik fra stasjonspris?
            </p>
            <p className="mb-3 leading-relaxed">
              Estimatet bygger på børsens referansekurs (ICE), nasjonale
              avgifter og ett modellert påslag per region. Pumpeprisen du ser
              kan ligge annerledes fordi blant annet:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 leading-relaxed">
              <li>
                stasjonen kjøper inn og setter pris ved et annet tidspunkt enn
                siste børskurs vi viser
              </li>
              <li>
                kjede, kampanjer og lokal konkurranse trekker prisen opp eller
                ned
              </li>
              <li>
                faktisk frakt, margin og stasjonstype varierer mer enn ett tall
                per region
              </li>
              <li>
                produktvalg (f.eks. innmiks) og lokale forhold ikke er med i
                modellen
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
              Prisprognose
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Et grovt bilde av om pumpeprisen kan ligge høyere eller lavere
              måned for måned fremover — ut fra hva diesel handles til på børsen
              for hver måned.
            </p>
          </div>
          {forecastBlock}
        </div>
      </section>

      <section id="distribusjon">
        <RegionalMargins selectedRegionId={regionId} />
      </section>

      <section id="avgifter">
        <TaxExplainer
          dutyReferenceDate={dutyReferenceDate}
          rawPrice={hasLive ? currentPrice.price_nok_liter : null}
        />
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
            Hvordan fungerer dieselmarkedet?
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Dieselprisen i Norge bestemmes av flere faktorer. Den viktigste er
              råvarepris på diesel, som handles på internasjonale børser som{" "}
              <strong className="text-foreground">
                ICE (Intercontinental Exchange)
              </strong>
              . Her handles såkalt &quot;Gasoil&quot;, som er den europeiske
              standarden for diesel og fyringsolje. Råolje (f.eks. Brent) er et
              annet ledd i verdikjeden og påvirker ofte det øvrige oljemarkedet,
              men literprisen på stasjon følger i hovedsak raffinerte produkter
              og avgifter.
            </p>
            <p>
              Prisen på ICE oppgis i{" "}
              <strong className="text-foreground">
                USD per metrisk tonn (MT)
              </strong>
              . For å få literpris i Norge regnes det om fra tonn til liter (1
              MT = ca. {DIESEL_LITERS_PER_METRIC_TON} liter diesel som fast
              antagelse — faktisk tetthet kan variere litt) og fra USD til NOK
              ut fra dagens valutakurs.
            </p>
            {hasLive ? (
              <p>
                Frontkontrakten (ICE gasoil, sammenhengende serie) ligger typisk
                rundt{" "}
                <strong className="text-foreground">
                  ${" "}
                  {currentPrice.price_usd_mt.toLocaleString("nb-NO", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  per tonn
                </strong>
                , tilsvarende ca.{" "}
                <strong className="text-foreground">
                  {currentPrice.price_nok_liter.toLocaleString("nb-NO", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}{" "}
                  kr per liter
                </strong>{" "}
                i ren råvarepris (avhengig av valutakurs). Med distribusjon,
                margin og avgifter blir det et prisestimat du kan justere etter
                region lenger opp på siden.
              </p>
            ) : (
              <p>
                Når kursene er tilbake, ligger et konkret eksempel her:
                frontkontrakten i USD per tonn og tilsvarende råvarepris i
                kroner per liter.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

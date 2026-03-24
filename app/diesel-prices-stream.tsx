import { PriceHero, PriceHeroUnavailable } from "@/components/price-hero"
import { PriceChart } from "@/components/price-chart"
import { TaxBreakdown } from "@/components/tax-breakdown"
import { TaxExplainer } from "@/components/tax-explainer"
import { FuturesForecast } from "@/components/futures-forecast"
import { RegionalMargins } from "@/components/regional-margins"
import { getDieselPricesData } from "@/lib/get-diesel-prices"
import {
  getRegionPriceProfile,
  type RegionId,
} from "@/lib/regional-price-model"

export async function DieselPricesStream({ regionId }: { regionId: RegionId }) {
  const data = await getDieselPricesData()
  const region = getRegionPriceProfile(regionId)
  const currentPrice = data.current
  const contracts = data.contracts
  const historical = data.historical
  const exchangeRate = data.exchange_rate.usd_nok
  const hasLive = currentPrice !== null

  return (
    <main>
      {hasLive ? (
        <PriceHero
          priceUsdMt={currentPrice.price_usd_mt}
          priceNokLiter={currentPrice.price_nok_liter}
          changePercent={currentPrice.change_percent}
          updatedAt={data.updated_at}
          exchangeSource={data.exchange_rate.source}
        />
      ) : (
        <PriceHeroUnavailable updatedAt={data.updated_at} />
      )}

      <section id="priser" className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
              Prissammensetting
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Se hvordan råvarepris, avgifter og modellert regional distribusjon
              bygger opp prisestimatet.
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              Valgt region:{" "}
              <span className="font-medium text-foreground">{region.label}</span>
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
                    Historiske punkter bruker avgiftssatsene som gjaldt på datoen.
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
                <TaxBreakdown rawPrice={currentPrice.price_nok_liter} regionId={regionId} />
              ) : (
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8 h-full flex items-center justify-center text-center text-sm text-muted-foreground">
                  Straks dagens råvarepris er på plass, ser du her hvordan den fordeles på avgifter og margin.
                </div>
              )}
            </div>
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
              Et grovt bilde av om pumpeprisen kan ligge høyere eller lavere måned for måned fremover — ut fra hva
              diesel handles til på børsen for hver måned.
            </p>
          </div>
          {!hasLive ? (
            <p className="text-sm text-muted-foreground max-w-2xl">
              Prognosen kan ikke vises akkurat nå. Sjekk igjen senere i dag.
            </p>
          ) : contracts.length > 0 ? (
            <FuturesForecast contracts={contracts} exchangeRate={exchangeRate} regionId={regionId} />
          ) : (
            <p className="text-sm text-muted-foreground max-w-2xl">
              Måned-for-måned-oversikten mangler akkurat nå. Grafen med siste måneder og dagens råvarepris over fungerer
              som vanlig.
            </p>
          )}
        </div>
      </section>

      <section id="distribusjon">
        <RegionalMargins selectedRegionId={regionId} />
      </section>

      <section id="avgifter">
        <TaxExplainer rawPrice={hasLive ? currentPrice.price_nok_liter : null} />
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
              standarden for diesel og fyringsolje.
            </p>
            <p>
              Prisen på ICE oppgis i{" "}
              <strong className="text-foreground">
                USD per metrisk tonn (MT)
              </strong>
              . For å beregne prisen per liter i Norge, må vi regne om fra tonn
              til liter (1 MT = ca. 1176 liter diesel) og fra USD til NOK basert
              på dagens valutakurs.
            </p>
            {hasLive ? (
              <p>
                Frontkontrakten (ICE gasoil, sammenhengende serie) ligger typisk rundt{" "}
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
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  kr per liter
                </strong>{" "}
                i ren råvarepris (avhengig av valutakurs). Når vi legger til distribusjon, margin og avgifter, får du
                et prisestimat som kan justeres etter region lenger opp på siden.
              </p>
            ) : (
              <p>
                Når live kurser er tilbake, viser vi et konkret eksempel på frontkontrakten i USD per tonn og
                tilsvarende råvarepris i kroner per liter her.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

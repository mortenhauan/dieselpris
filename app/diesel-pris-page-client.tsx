"use client"

import { useMemo } from "react"
import { Header } from "@/components/header"
import { PriceHero } from "@/components/price-hero"
import { PriceChart } from "@/components/price-chart"
import { TaxBreakdown } from "@/components/tax-breakdown"
import { TaxExplainer } from "@/components/tax-explainer"
import { FuturesForecast } from "@/components/futures-forecast"
import { RegionalMargins } from "@/components/regional-margins"
import type { DieselPricesPayload } from "@/lib/get-diesel-prices"
import { getRegionPriceProfile, type RegionId } from "@/lib/regional-price-model"

type Props = {
  data: DieselPricesPayload
  regionId: RegionId
}

export function DieselPrisPageClient({ data, regionId: selectedRegionId }: Props) {
  const currentPrice = data.current
  const updatedAt = data.updated_at
  const contracts = data.contracts
  const historical = data.historical
  const exchangeRate = data.exchange_rate.usd_nok
  const selectedRegion = useMemo(
    () => getRegionPriceProfile(selectedRegionId),
    [selectedRegionId],
  )

  return (
    <div className="min-h-screen bg-background">
      <Header selectedRegionId={selectedRegionId} />

      <main>
        <PriceHero
          priceUsdMt={currentPrice.price_usd_mt}
          priceNokLiter={currentPrice.price_nok_liter}
          changePercent={currentPrice.change_percent}
          updatedAt={updatedAt}
          exchangeSource={data.exchange_rate.source}
        />

        <section id="priser" className="py-16 md:py-24 border-t border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
                Prissammensetting
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Se hvordan råvarepris, avgifter og modellert regional distribusjon bygger opp prisestimatet.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                Valgt region: <span className="font-medium text-foreground">{selectedRegion.label}</span>. Dette
                påvirker bare estimatene under, ikke den nasjonale råvareprisen øverst.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6 items-stretch">
              <div className="lg:col-span-3 h-full">
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-1">Estimert pumpepris (90 dager)</h3>
                    <p className="text-sm text-muted-foreground">
                      Estimert pumpepris for {selectedRegion.label.toLowerCase()}. Historiske punkter bruker
                      avgiftssatsene som gjaldt på datoen.
                    </p>
                  </div>
                  {historical.length > 0 ? (
                    <PriceChart data={historical} regionId={selectedRegionId} />
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      Ingen data tilgjengelig
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2 h-full">
                <TaxBreakdown rawPrice={currentPrice.price_nok_liter} regionId={selectedRegionId} />
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
                Estimert pumpepris for {selectedRegion.label.toLowerCase()}, basert på terminkontrakter fra ICE-børsen
                og dagens avgifter.
              </p>
            </div>
            {contracts.length > 0 ? (
              <FuturesForecast contracts={contracts} exchangeRate={exchangeRate} regionId={selectedRegionId} />
            ) : (
              <p className="text-sm text-muted-foreground max-w-2xl">
                Terminkurve med flere måneder vises når vi har kontraktsrekke fra børsen. Akkurat nå viser vi én
                sammenhengende gasoil-serie for dagspris og historikk.
              </p>
            )}
          </div>
        </section>

        <section id="distribusjon">
          <RegionalMargins selectedRegionId={selectedRegionId} />
        </section>

        <section id="avgifter">
          <TaxExplainer rawPrice={currentPrice.price_nok_liter} />
        </section>

        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
              Hvordan fungerer dieselmarkedet?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Dieselprisen i Norge bestemmes av flere faktorer. Den viktigste er råvarepris på diesel, som
                handles på internasjonale børser som{" "}
                <strong className="text-foreground">ICE (Intercontinental Exchange)</strong>. Her handles
                såkalt &quot;Gasoil&quot;, som er den europeiske standarden for diesel og fyringsolje.
              </p>
              <p>
                Prisen på ICE oppgis i <strong className="text-foreground">USD per metrisk tonn (MT)</strong>.
                For å beregne prisen per liter i Norge, må vi regne om fra tonn til liter (1 MT = ca. 1176 liter
                diesel) og fra USD til NOK basert på dagens valutakurs.
              </p>
              <p>
                Frontkontrakten (ICE gasoil, sammenhengende serie) ligger typisk rundt{" "}
                <strong className="text-foreground">
                  ${" "}
                  {currentPrice.price_usd_mt.toLocaleString("nb-NO", { maximumFractionDigits: 0 })} per tonn
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
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

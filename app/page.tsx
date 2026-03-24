"use client"

import useSWR from 'swr'
import { Header } from '@/components/header'
import { PriceHero } from '@/components/price-hero'
import { PriceChart } from '@/components/price-chart'
import { TaxBreakdown } from '@/components/tax-breakdown'
import { TaxExplainer } from '@/components/tax-explainer'
import { FuturesForecast } from '@/components/futures-forecast'
import { RegionalMargins } from '@/components/regional-margins'

interface DieselData {
  updated_at: string
  current: {
    price_usd_mt: number
    price_nok_liter: number
    change: number
    change_percent: number
  }
  contracts: {
    contract_code: string
    contract_month: string
    last_price: number
    change: number
    change_percent: number
    open: number
    high: number
    low: number
    previous: number
    volume: number
  }[]
  historical: {
    date: string
    price: number
    price_nok_liter: number
  }[]
  exchange_rate: {
    usd_nok: number
    source: string
  }
  data_source: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function DieselPrisPage() {
  const { data, error, isLoading } = useSWR<DieselData>(
    '/api/diesel-prices',
    fetcher,
    { refreshInterval: 60000 }
  )

  const currentPrice = data?.current ?? {
    price_usd_mt: 1282.00,
    price_nok_liter: 11.98,
    change: -5.75,
    change_percent: -0.45
  }

  const updatedAt = data?.updated_at ?? ""
  const contracts = data?.contracts ?? []
  const historical = data?.historical ?? []
  const exchangeRate = data?.exchange_rate?.usd_nok ?? 11

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <PriceHero 
          priceUsdMt={currentPrice.price_usd_mt}
          priceNokLiter={currentPrice.price_nok_liter}
          changePercent={currentPrice.change_percent}
          updatedAt={updatedAt}
          isLoading={isLoading}
        />

        {/* Price Chart & Breakdown */}
        <section id="priser" className="py-16 md:py-24 border-t border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
                Prissammensetting
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Se hvordan pumpeprisen er bygget opp, fra råvarepris til endelig pris.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-1">Prisutvikling (90 dager)</h3>
                    <p className="text-sm text-muted-foreground">Råvarepris i NOK per liter</p>
                  </div>
                  {historical.length > 0 ? (
                    <PriceChart data={historical} />
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      {isLoading ? 'Laster prisdata...' : 'Ingen data tilgjengelig'}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <TaxBreakdown rawPrice={currentPrice.price_nok_liter} />
              </div>
            </div>
          </div>
        </section>

        {/* Futures Forecast */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
                Prisprognose
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Estimert pumpepris basert på terminkontrakter fra ICE-børsen med alle avgifter inkludert.
              </p>
            </div>
            {contracts.length > 0 ? (
              <FuturesForecast contracts={contracts} exchangeRate={exchangeRate} />
            ) : (
              <p className="text-sm text-muted-foreground max-w-2xl">
                Terminkurve med flere måneder vises når API-et leverer kontraktsrekken. Akkurat nå bruker vi én sammenhengende gasoil-serie til dagspris og historikk
                {data?.data_source?.includes("TradingView") ? " (TradingView)." : "."}
              </p>
            )}
          </div>
        </section>

        {/* Regional Margins */}
        <section id="distribusjon">
          <RegionalMargins />
        </section>

        {/* Tax Explainer */}
        <section id="avgifter">
          <TaxExplainer />
        </section>

        {/* Info Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
              Hvordan fungerer dieselmarkedet?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Dieselprisen i Norge bestemmes av flere faktorer. Den viktigste er råvarepris
                på diesel, som handles på internasjonale børser som <strong className="text-foreground">ICE (Intercontinental Exchange)</strong>.
                Her handles såkalt &quot;Gasoil&quot;, som er den europeiske standarden for diesel og fyringsolje.
              </p>
              <p>
                Prisen på ICE oppgis i <strong className="text-foreground">USD per metrisk tonn (MT)</strong>. For å beregne prisen per liter
                i Norge, må vi regne om fra tonn til liter (1 MT = ca. 1176 liter diesel) og fra
                USD til NOK basert på dagens valutakurs.
              </p>
              <p>
                Frontkontrakten (ICE gasoil, sammenhengende serie) ligger typisk rundt{" "}
                <strong className="text-foreground">
                  ${" "}
                  {currentPrice.price_usd_mt.toLocaleString("nb-NO", { maximumFractionDigits: 0 })} per tonn
                </strong>
                , tilsvarende ca.{" "}
                <strong className="text-foreground">
                  {currentPrice.price_nok_liter.toLocaleString("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr per liter
                </strong>{" "}
                i ren råvarepris (avhengig av valutakurs). Legg til distribusjon, margin og avgifter, og du ender på en pumpepris
                rundt 21–23 kr per liter.
              </p>
            </div>
          </div>
        </section>
      </main>

      {error && (
        <div className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground px-4 py-3 rounded-xl shadow-lg text-sm font-medium">
          Kunne ikke laste prisdata. Prøv igjen senere.
        </div>
      )}
    </div>
  )
}

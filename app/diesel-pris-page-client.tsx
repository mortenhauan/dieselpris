"use client"

import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import { Header } from "@/components/header"
import { PriceHero } from "@/components/price-hero"
import { PriceChart } from "@/components/price-chart"
import { TaxBreakdown } from "@/components/tax-breakdown"
import { TaxExplainer } from "@/components/tax-explainer"
import { FuturesForecast } from "@/components/futures-forecast"
import { RegionalMargins } from "@/components/regional-margins"
import type { DieselPricesPayload } from "@/lib/get-diesel-prices"
import { DEFAULT_REGION_ID, getRegionPriceProfile, type RegionId } from "@/lib/regional-price-model"

const FIFTEEN_MIN_MS = 15 * 60 * 1000

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function postDebugLog(
  runId: string,
  hypothesisId: string,
  message: string,
  data: Record<string, unknown>,
) {
  fetch("http://127.0.0.1:7354/ingest/f14bf51d-541e-48b1-8383-e26762d3f3f7", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "b93b04",
    },
    body: JSON.stringify({
      sessionId: "b93b04",
      runId,
      hypothesisId,
      location: "app/diesel-pris-page-client.tsx:overflow-scan",
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {})
}

function round(value: number) {
  return Math.round(value * 10) / 10
}

function describeElement(element: HTMLElement) {
  const className =
    typeof element.className === "string"
      ? element.className
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 3)
          .join(".")
      : ""

  const id = element.id ? `#${element.id}` : ""
  const classes = className ? `.${className}` : ""

  return `${element.tagName.toLowerCase()}${id}${classes}`
}

function textSnippet(element: HTMLElement) {
  return (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80)
}

function collectOverflowCandidates(viewportWidth: number) {
  return Array.from(document.querySelectorAll<HTMLElement>("body *"))
    .map((element) => {
      const rect = element.getBoundingClientRect()
      const styles = window.getComputedStyle(element)
      const rightOverflow = Math.max(0, rect.right - viewportWidth)
      const leftOverflow = Math.max(0, 0 - rect.left)
      const scrollOverflow = Math.max(0, element.scrollWidth - element.clientWidth)
      const overflow = Math.max(rightOverflow, leftOverflow, scrollOverflow)

      return {
        element: describeElement(element),
        snippet: textSnippet(element),
        overflow: round(overflow),
        rectLeft: round(rect.left),
        rectRight: round(rect.right),
        rectWidth: round(rect.width),
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        position: styles.position,
        overflowX: styles.overflowX,
        whiteSpace: styles.whiteSpace,
      }
    })
    .filter((candidate) => candidate.overflow > 1)
    .sort((a, b) => b.overflow - a.overflow)
    .slice(0, 8)
}

function collectFixedCandidates(viewportWidth: number) {
  return Array.from(
    document.querySelectorAll<HTMLElement>("body *, [data-radix-popper-content-wrapper]"),
  )
    .map((element) => {
      const rect = element.getBoundingClientRect()
      const styles = window.getComputedStyle(element)
      const overflow = Math.max(0, rect.right - viewportWidth, 0 - rect.left)

      return {
        element: describeElement(element),
        snippet: textSnippet(element),
        overflow: round(overflow),
        rectLeft: round(rect.left),
        rectRight: round(rect.right),
        rectWidth: round(rect.width),
        position: styles.position,
      }
    })
    .filter((candidate) => candidate.position === "fixed" || candidate.overflow > 1)
    .sort((a, b) => b.overflow - a.overflow)
    .slice(0, 8)
}

type Props = {
  initialData: DieselPricesPayload
}

export function DieselPrisPageClient({ initialData }: Props) {
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>(DEFAULT_REGION_ID)
  const { data, error, isLoading } = useSWR<DieselPricesPayload>("/api/diesel-prices", fetcher, {
    fallbackData: initialData,
    refreshInterval: FIFTEEN_MIN_MS,
    revalidateOnMount: false,
    revalidateOnFocus: false,
  })

  const currentPrice = data?.current ?? {
    price_usd_mt: 1282.0,
    price_nok_liter: 11.98,
    change: -5.75,
    change_percent: -0.45,
  }

  const updatedAt = data?.updated_at ?? ""
  const contracts = data?.contracts ?? []
  const historical = data?.historical ?? []
  const exchangeRate = data?.exchange_rate?.usd_nok ?? 11
  const showChartLoading = isLoading && historical.length === 0
  const selectedRegion = useMemo(() => getRegionPriceProfile(selectedRegionId), [selectedRegionId])

  useEffect(() => {
    const runId = `overflow-scan-${historical.length}-${contracts.length}-${selectedRegionId}`

    const frame = window.requestAnimationFrame(() => {
      const docEl = document.documentElement
      const body = document.body
      const viewportWidth = window.innerWidth
      const topOverflowCandidates = collectOverflowCandidates(viewportWidth)
      const fixedCandidates = collectFixedCandidates(viewportWidth)
      const sectionWidths = Array.from(
        document.querySelectorAll<HTMLElement>("header, main, main section, footer"),
      )
        .map((element) => {
          const rect = element.getBoundingClientRect()
          return {
            element: describeElement(element),
            rectLeft: round(rect.left),
            rectRight: round(rect.right),
            rectWidth: round(rect.width),
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth,
          }
        })
        .filter((candidate) => candidate.rectRight > viewportWidth + 1 || candidate.scrollWidth > candidate.clientWidth)
        .slice(0, 8)

      // #region agent log
      postDebugLog(runId, "H4", "Document width snapshot", {
        viewportWidth,
        docClientWidth: docEl.clientWidth,
        docScrollWidth: docEl.scrollWidth,
        bodyClientWidth: body.clientWidth,
        bodyScrollWidth: body.scrollWidth,
        docOverflowDelta: docEl.scrollWidth - docEl.clientWidth,
        bodyOverflowDelta: body.scrollWidth - body.clientWidth,
        historicalCount: historical.length,
        contractsCount: contracts.length,
        selectedRegionId,
        hasError: Boolean(error),
      })
      // #endregion

      // #region agent log
      postDebugLog(runId, "H1", "Top overflowing elements in normal flow", {
        candidates: topOverflowCandidates,
      })
      // #endregion

      // #region agent log
      postDebugLog(runId, "H2", "Section-level width candidates", {
        sections: sectionWidths,
      })
      // #endregion

      // #region agent log
      postDebugLog(runId, "H3", "Fixed or portaled overflow candidates", {
        candidates: fixedCandidates,
      })
      // #endregion
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [contracts.length, error, historical.length, selectedRegionId])

  return (
    <div className="min-h-screen bg-background">
      <Header selectedRegionId={selectedRegionId} onRegionChange={setSelectedRegionId} />

      <main>
        <PriceHero
          priceUsdMt={currentPrice.price_usd_mt}
          priceNokLiter={currentPrice.price_nok_liter}
          changePercent={currentPrice.change_percent}
          updatedAt={updatedAt}
          isLoading={showChartLoading}
          exchangeSource={data?.exchange_rate?.source}
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
                      {showChartLoading ? "Laster prisdata..." : "Ingen data tilgjengelig"}
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

      {error && (
        <div className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground px-4 py-3 rounded-xl shadow-lg text-sm font-medium">
          Kunne ikke laste prisdata. Prøv igjen senere.
        </div>
      )}
    </div>
  )
}

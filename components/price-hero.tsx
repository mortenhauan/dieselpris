"use client"

import { RefreshCw, Clock, Info, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { DIESEL_LITERS_PER_METRIC_TON } from "@/lib/diesel-prices-payload"
import { cn } from "@/lib/utils"

function formatUpdatedAt(iso: string) {
  if (!iso) return "—"
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return "—"
  return d.toLocaleString("no-NO", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Oslo",
  })
}

const tooltipContentClass =
  "max-w-[min(22rem,calc(100vw-2rem))] text-xs leading-relaxed px-3 py-2.5 font-normal normal-case tracking-normal"

const CHANGE_TOOLTIP =
  "Dette er hvor mye råvareprisen har endret seg siden forrige børsdag, i prosent. Når råvareprisen faller, er det normalt positivt for deg fordi det kan dempe presset på pumpeprisen. Når råvareprisen stiger, kan det trekke pumpeprisen opp over tid."

const INSTRUMENT_SUMMARY = "Europeisk referansepris for dieselråvare"

const INSTRUMENT_TOOLTIP_DETAIL =
  "Dette er den europeiske markedsprisen for dieselråvaren som brukes som referanse i markedet. Prisen vises i USD per tonn og sier noe om råvarekostnaden, ikke hva du betaler på stasjonen."

const RAW_NOK_TOOLTIP_SUMMARY = "Omregnet råvarepris i kroner per liter"

const RAW_NOK_TOOLTIP_WEIGHT = `Omregning tonn → liter bruker ${DIESEL_LITERS_PER_METRIC_TON} liter per metrisk tonn som fast vekt/tetthet. I praksis varierer liter per tonn litt med temperatur og produkt — tallet her er en forenklet modell.`

const RAW_NOK_TOOLTIP_FORMULA =
  "Tallet er markedsprisen omregnet fra USD per tonn til kroner per liter. Det er bare råvarekostnad — ikke avgifter, distribusjon, margin eller MVA."

function rawNokTooltipSourceLine(exchangeSource?: string): string {
  if (exchangeSource?.includes("Norges Bank")) {
    return "Valutakursen er fra Norges Bank: siste publiserte USD/NOK på eller før kursdagen."
  }
  if (exchangeSource?.trim()) {
    return `Valutakilde: ${exchangeSource.trim()}.`
  }
  return "Uten fersk kurs fra Norges Bank brukes en fast reservekurs for USD/NOK."
}

interface PriceHeroProps {
  priceUsdMt: number
  priceNokLiter: number
  changePercent: number
  updatedAt: string
  isLoading?: boolean
  exchangeSource?: string
}

function InstrumentHint() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 rounded-full p-0.5 text-background/45 outline-none transition-colors hover:text-background/70 focus-visible:ring-2 focus-visible:ring-background/35",
          )}
          aria-label={`Forklaring: ${INSTRUMENT_SUMMARY}`}
        >
          <Info className="h-3.5 w-3.5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start" sideOffset={6} className={tooltipContentClass}>
        <p className="mb-2 border-b border-background/15 pb-2 font-medium leading-snug text-background">
          {INSTRUMENT_SUMMARY}
        </p>
        <p>{INSTRUMENT_TOOLTIP_DETAIL}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function RawNokHint({ exchangeSource }: { exchangeSource?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 rounded-full p-0.5 text-muted-foreground/55 outline-none transition-colors hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
          )}
          aria-label={`Forklaring: ${RAW_NOK_TOOLTIP_SUMMARY}`}
        >
          <Info className="h-3.5 w-3.5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start" sideOffset={6} className={tooltipContentClass}>
        <p className="mb-2 border-b border-background/15 pb-2 font-medium leading-snug text-background">
          {RAW_NOK_TOOLTIP_SUMMARY}
        </p>
        <p className="mb-2">{RAW_NOK_TOOLTIP_FORMULA}</p>
        <p className="mb-2">{RAW_NOK_TOOLTIP_WEIGHT}</p>
        <p>{rawNokTooltipSourceLine(exchangeSource)}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function ChangeHint({ changePercent, className }: { changePercent: number; className?: string }) {
  const isPriceUp = changePercent >= 0

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold tabular-nums outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:ring-background/45",
            isPriceUp ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400",
            className,
          )}
          aria-label={`Endring fra forrige børsdag: ${isPriceUp ? "+" : ""}${changePercent.toFixed(2)} prosent. Trykk for forklaring.`}
        >
          <HelpCircle className="h-3.5 w-3.5 shrink-0 opacity-85" aria-hidden />
          <span>
            {isPriceUp ? "+" : ""}
            {changePercent.toFixed(2)}%
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="end" sideOffset={6} className={tooltipContentClass}>
        {CHANGE_TOOLTIP}
      </TooltipContent>
    </Tooltip>
  )
}

export function PriceHeroUnavailable({ updatedAt }: { updatedAt: string }) {
  const formattedTime = formatUpdatedAt(updatedAt)
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Råvarepris fra europeisk energibørs
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 tracking-tight text-balance">
            Ingen live pris akkurat nå
          </h1>
          <p className="text-muted-foreground mb-10 max-w-xl text-pretty leading-relaxed">
            Ingen oppdatert råvarepris akkurat nå. Kom tilbake om litt — da skal tallene ligge her som vanlig.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-8 py-6 text-sm text-muted-foreground">
          Sist forsøkt oppdatert: {formattedTime}
        </div>
      </div>
    </section>
  )
}

export function PriceHero({
  priceUsdMt,
  priceNokLiter,
  changePercent,
  updatedAt,
  isLoading,
  exchangeSource,
}: PriceHeroProps) {
  const formattedTime = formatUpdatedAt(updatedAt)
  const metaRowClass = "mb-8 min-h-12 md:min-h-14"

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Råvarepris fra europeisk energibørs
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 tracking-tight text-balance">
            Dagens råvarepris
          </h1>
          <p className="text-muted-foreground mb-10 max-w-xl text-pretty leading-relaxed">
            Her ser du dagens råvarepris på diesel, både i USD per tonn og omregnet til kroner per liter før
            avgifter, distribusjon og margin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-foreground text-background rounded-2xl p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className={cn(metaRowClass, "flex items-start justify-between gap-4")}>
              <div className="flex min-w-0 items-center gap-1.5">
                <span className="text-sm font-medium text-background/75">Lavsvovel gasoil-future</span>
                <InstrumentHint />
              </div>
              <ChangeHint changePercent={changePercent} className="shrink-0" />
              </div>

              <div className="flex items-baseline gap-2">
                <span className={cn("text-5xl md:text-6xl font-bold tracking-tight", isLoading && "animate-pulse")}>
                  ${priceUsdMt.toFixed(0)}
                </span>
                <span className="text-background/55 text-lg font-medium">/MT</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-background/45">
              <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>Oppdatert {formattedTime}</span>
              {isLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin shrink-0" aria-hidden /> : null}
            </div>
          </div>

          <div className="bg-secondary rounded-2xl p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className={cn(metaRowClass, "flex items-center gap-1.5 text-muted-foreground text-sm")}>
                <span>Råvarepris i NOK</span>
                <RawNokHint exchangeSource={exchangeSource} />
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-5xl md:text-6xl font-bold tracking-tight text-foreground",
                    isLoading && "animate-pulse",
                  )}
                >
                  {priceNokLiter.toFixed(2)}
                </span>
                <span className="text-muted-foreground text-lg font-medium">kr/L</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-8 leading-snug">
              Før avgifter og margin.
              {exchangeSource?.includes("Norges Bank")
                ? " USD → NOK fra Norges Bank."
                : exchangeSource
                  ? ` ${exchangeSource}.`
                  : " USD → NOK."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

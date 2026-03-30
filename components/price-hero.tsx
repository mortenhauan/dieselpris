"use client";

import { RefreshCw, Clock, Info, HelpCircle } from "lucide-react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DIESEL_LITERS_PER_METRIC_TON } from "@/lib/diesel-prices-payload";
import { cn } from "@/lib/utils";

const formatUpdatedAt = function formatUpdatedAt(iso: string) {
  if (!iso) {
    return "—";
  }
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return "—";
  }
  return d.toLocaleString("no-NO", {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    timeZone: "Europe/Oslo",
  });
};

const tooltipContentClass =
  "max-w-[min(22rem,calc(100vw-2rem))] text-xs leading-relaxed px-3 py-2.5 font-normal normal-case tracking-normal";

const CHANGE_TOOLTIP =
  "Dette er hvor mye råvareprisen har endret seg siden forrige børsdag, i prosent. Når råvareprisen faller, er det normalt positivt for deg fordi det kan dempe presset på pumpeprisen. Når råvareprisen stiger, kan det trekke pumpeprisen opp over tid.";

const INSTRUMENT_SUMMARY = "Europeisk referansepris for dieselråvare";

const INSTRUMENT_TOOLTIP_DETAIL =
  "Dette er den europeiske markedsprisen for dieselråvaren som brukes som referanse i markedet. Prisen vises i USD per tonn og sier noe om råvarekostnaden, ikke hva du betaler på stasjonen.";

const RAW_NOK_TOOLTIP_SUMMARY = "Estimert råvarepris i kroner per liter";

const RAW_NOK_TOOLTIP_WEIGHT = `Omregning tonn → liter bruker ${DIESEL_LITERS_PER_METRIC_TON} liter per metrisk tonn som fast vekt/tetthet. I praksis varierer liter per tonn litt med temperatur og produkt — tallet her er en forenklet modell.`;

const RAW_NOK_TOOLTIP_FORMULA =
  "Tallet er markedsprisen omregnet fra USD per tonn til kroner per liter. Det er bare råvarekostnad — ikke avgifter, distribusjon, margin eller MVA.";

const PLUS_DUTIES_TOOLTIP_SUMMARY =
  "Estimert råvarepris med veibruks- og CO₂-avgift og MVA";

const PLUS_DUTIES_TOOLTIP_DETAIL =
  "Vi legger på de nasjonale satsene som i prissammensettingen under, og beregner MVA på summen — men uten modellert distribusjon eller stasjonsmargin.";

const rawNokTooltipSourceLine = function rawNokTooltipSourceLine(
  exchangeSource?: string
): string {
  if (exchangeSource?.includes("Norges Bank")) {
    return "Valutakursen er fra Norges Bank: siste publiserte USD/NOK på eller før kursdagen.";
  }
  if (exchangeSource?.trim()) {
    return `Valutakilde: ${exchangeSource.trim()}.`;
  }
  return "Uten fersk kurs fra Norges Bank brukes en fast reservekurs for USD/NOK.";
};

const exchangeRateFooterBlurb = function exchangeRateFooterBlurb(
  exchangeSource?: string
): string {
  if (exchangeSource?.includes("Norges Bank")) {
    return " USD → NOK fra Norges Bank.";
  }
  if (exchangeSource) {
    return ` ${exchangeSource}.`;
  }
  return " USD → NOK.";
};

interface PriceHeroProps {
  priceUsdMt: number;
  priceNokLiter: number;
  priceNokLiterPlusDuties: number;
  changePercent: number;
  updatedAt: string;
  isLoading?: boolean;
  exchangeSource?: string;
}

const InstrumentHint = function InstrumentHint() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 rounded-full p-0.5 text-background/45 outline-none transition-colors hover:text-background/70 focus-visible:ring-2 focus-visible:ring-background/35"
          )}
          aria-label={`Forklaring: ${INSTRUMENT_SUMMARY}`}
        >
          <Info className="h-3.5 w-3.5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        align="start"
        sideOffset={6}
        className={tooltipContentClass}
      >
        <p className="mb-2 border-b border-background/15 pb-2 font-medium leading-snug text-background">
          {INSTRUMENT_SUMMARY}
        </p>
        <p>{INSTRUMENT_TOOLTIP_DETAIL}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const PlusDutiesHint = function PlusDutiesHint() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 rounded-full p-0.5 text-muted-foreground/55 outline-none transition-colors hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
          )}
          aria-label={`Forklaring: ${PLUS_DUTIES_TOOLTIP_SUMMARY}`}
        >
          <Info className="h-3.5 w-3.5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        align="start"
        sideOffset={6}
        className={tooltipContentClass}
      >
        <p className="mb-2 border-b border-background/15 pb-2 font-medium leading-snug text-background">
          {PLUS_DUTIES_TOOLTIP_SUMMARY}
        </p>
        <p>{PLUS_DUTIES_TOOLTIP_DETAIL}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const RawNokHint = function RawNokHint({
  exchangeSource,
}: {
  exchangeSource?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 rounded-full p-0.5 text-muted-foreground/55 outline-none transition-colors hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
          )}
          aria-label={`Forklaring: ${RAW_NOK_TOOLTIP_SUMMARY}`}
        >
          <Info className="h-3.5 w-3.5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        align="start"
        sideOffset={6}
        className={tooltipContentClass}
      >
        <p className="mb-2 border-b border-background/15 pb-2 font-medium leading-snug text-background">
          {RAW_NOK_TOOLTIP_SUMMARY}
        </p>
        <p className="mb-2">{RAW_NOK_TOOLTIP_FORMULA}</p>
        <p className="mb-2">{RAW_NOK_TOOLTIP_WEIGHT}</p>
        <p>{rawNokTooltipSourceLine(exchangeSource)}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const ChangeHint = function ChangeHint({
  changePercent,
  className,
}: {
  changePercent: number;
  className?: string;
}) {
  const isPriceUp = changePercent >= 0;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold tabular-nums outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:ring-background/45",
            isPriceUp
              ? "bg-red-500/20 text-red-400"
              : "bg-emerald-500/20 text-emerald-400",
            className
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
      <TooltipContent
        side="bottom"
        align="end"
        sideOffset={6}
        className={tooltipContentClass}
      >
        {CHANGE_TOOLTIP}
      </TooltipContent>
    </Tooltip>
  );
};

export const PriceHeroUnavailable = function PriceHeroUnavailable({
  updatedAt,
}: {
  updatedAt: string;
}) {
  const formattedTime = formatUpdatedAt(updatedAt);
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
            Ingen oppdatert råvarepris akkurat nå. Kom tilbake om litt — da skal
            tallene ligge her som vanlig.
          </p>
          <Link
            href="/nyheter"
            className="mb-10 inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/35 hover:bg-accent/15"
          >
            Les nyheter og enkle forklaringer om avgifter og vedtak
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-card px-8 py-6 text-sm text-muted-foreground">
          Sist forsøkt oppdatert: {formattedTime}
        </div>
      </div>
    </section>
  );
};

export const PriceHero = function PriceHero({
  priceUsdMt,
  priceNokLiter,
  priceNokLiterPlusDuties,
  changePercent,
  updatedAt,
  isLoading,
  exchangeSource,
}: PriceHeroProps) {
  const formattedTime = formatUpdatedAt(updatedAt);
  const metaRowClass = "mb-8 min-h-12 md:min-h-14";

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
          <p className="text-muted-foreground mb-10 max-w-2xl text-pretty leading-relaxed">
            Her ser du børsnotert råvare i dollar per tonn, samme råvare i
            kroner per liter uten avgifter — og råvare pluss veibruks- og
            CO₂-avgift og MVA. Modellert distribusjon og stasjonens påslag er
            ikke med i det siste tallet.
          </p>
          <Link
            href="/nyheter"
            className="mb-10 inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/35 hover:bg-accent/15"
          >
            Nytt nå: les nyheter og enkle forklaringer om avgifter og vedtak
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-foreground text-background rounded-2xl p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div
                className={cn(
                  metaRowClass,
                  "flex items-start justify-between gap-4"
                )}
              >
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className="text-sm font-medium text-background/75">
                    Lavsvovel gasoil-future
                  </span>
                  <InstrumentHint />
                </div>
                <ChangeHint
                  changePercent={changePercent}
                  className="shrink-0"
                />
              </div>

              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-5xl md:text-6xl font-bold tracking-tight",
                    isLoading && "animate-pulse"
                  )}
                >
                  ${priceUsdMt.toFixed(0)}
                </span>
                <span className="text-background/55 text-lg font-medium">
                  /MT
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-background/45">
              <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>Oppdatert {formattedTime}</span>
              {isLoading ? (
                <RefreshCw
                  className="h-3.5 w-3.5 animate-spin shrink-0"
                  aria-hidden
                />
              ) : null}
            </div>
          </div>

          <div className="bg-secondary rounded-2xl p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div
                className={cn(
                  metaRowClass,
                  "flex items-center gap-1.5 text-muted-foreground text-sm"
                )}
              >
                <span>Estimert råvarepris i NOK</span>
                <RawNokHint exchangeSource={exchangeSource} />
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-5xl md:text-6xl font-bold tracking-tight text-foreground",
                    isLoading && "animate-pulse"
                  )}
                >
                  {priceNokLiter.toFixed(2)}
                </span>
                <span className="text-muted-foreground text-lg font-medium">
                  kr/L
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-8 leading-snug">
              Før avgifter og margin.
              {exchangeRateFooterBlurb(exchangeSource)}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 md:p-10 flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <div
                className={cn(
                  metaRowClass,
                  "flex items-center gap-1.5 text-muted-foreground text-sm"
                )}
              >
                <span>Estimert råvarepris med avgifter</span>
                <PlusDutiesHint />
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-5xl md:text-6xl font-bold tracking-tight text-foreground",
                    isLoading && "animate-pulse"
                  )}
                >
                  {priceNokLiterPlusDuties.toFixed(2)}
                </span>
                <span className="text-muted-foreground text-lg font-medium">
                  kr/L
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-8 leading-snug">
              Dette tallet er før{" "}
              <Link
                href="#distribusjon"
                className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
              >
                distribusjon og påslag
              </Link>{" "}
              på stasjonen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

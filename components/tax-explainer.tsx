"use client";

import { Truck, Leaf, Receipt, ArrowRight } from "lucide-react";

import { getPumpPriceRates, pumpPriceComponents } from "@/lib/pump-price-model";

const fmtKr = (n: number): string =>
  n.toLocaleString("nb-NO", {
    maximumFractionDigits: 2,
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
  });

interface TaxExplainerProps {
  dutyReferenceDate: string;
  rawPrice: number | null;
}

export const TaxExplainer = function TaxExplainer({
  dutyReferenceDate,
  rawPrice,
}: TaxExplainerProps) {
  const rates = getPumpPriceRates(dutyReferenceDate);
  const components =
    rawPrice === null
      ? null
      : pumpPriceComponents(rawPrice, undefined, dutyReferenceDate);
  const taxPercent =
    components && components.total > 0
      ? ((components.veibruks + components.co2 + components.mva) /
          components.total) *
        100
      : null;

  const inTemporaryCut2026 =
    dutyReferenceDate >= "2026-05-01" && dutyReferenceDate < "2026-09-01";
  const current2025 =
    dutyReferenceDate >= "2025-01-01" && dutyReferenceDate < "2026-01-01";
  const current2026Ordinary =
    (dutyReferenceDate >= "2026-01-01" && dutyReferenceDate < "2026-05-01") ||
    dutyReferenceDate >= "2026-09-01";

  const veibruksTrend = (() => {
    if (rates.veibruks === 0) {
      return "Midlertidig bortfall 1. mai–31. aug. 2026 (Stortinget)";
    }
    if (rates.veibruks <= 2.69) {
      return "Ned fra 2,71 kr (2024)";
    }
    return "";
  })();

  const co2Trend = (() => {
    if (rates.co2 === 3.09) {
      return "Midlertidig sats i samme periode som veibrukskuttet";
    }
    if (rates.co2 >= 4.4) {
      return "Opp fra 3,17 kr (2024)";
    }
    return "Justeres i budsjettrunder";
  })();

  const taxItems = [
    {
      description:
        "Dekker samfunnets kostnader ved bilbruk – veislitasje, ulykker og kødannelse.",
      icon: Truck,
      rate: fmtKr(rates.veibruks),
      title: "Veibruksavgift",
      trend: veibruksTrend,
      unit: "kr/L",
    },
    {
      description:
        "Miljøavgift som skal gjøre det dyrere å slippe ut klimagasser. Justeres i budsjettrunder.",
      icon: Leaf,
      rate: fmtKr(rates.co2),
      title: "CO₂-avgift",
      trend: co2Trend,
      unit: "kr/L",
    },
    {
      description: "Beregnes av totalprisen inkludert alle andre avgifter.",
      icon: Receipt,
      rate: "25",
      title: "Merverdiavgift",
      trend: "Uendret",
      unit: "%",
    },
  ];

  const historicalRows = [
    {
      co2: "3,17",
      current: false,
      total: "5,88",
      vei: "2,71",
      year: "2024",
    },
    {
      co2: "3,79",
      current: current2025,
      total: "6,48",
      vei: "2,69",
      year: "2025",
    },
    {
      co2: "3,09",
      current: inTemporaryCut2026,
      total: "3,09",
      vei: "0",
      year: "2026 (1. mai–31. aug.)",
    },
    {
      co2: "4,42",
      current: current2026Ordinary,
      total: "6,70",
      vei: "2,28",
      year: "2026 (øvrige datoer)",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            Norske dieselavgifter
          </h2>
          <p className="text-muted-foreground max-w-xl">
            {taxPercent === null ? (
              <>
                Andelen som går til staten avhenger av råvareprisen. Med en
                fersk råvarepris vises tallet her.
              </>
            ) : (
              <>
                Med dagens prisestimat går ca. {taxPercent.toFixed(0)} % av
                pumpeprisen til staten i form av veibruksavgift, CO₂-avgift og
                MVA.
              </>
            )}
          </p>
          <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
            Satser for veibruks og CO₂ følger referansedatoen for siste
            kurspunkt ({dutyReferenceDate}). Sommerperioden 2026 er modellert
            med veibruks 0 kr/l og CO₂ 3,09 kr/l etter Stortingets vedtak — se{" "}
            <a
              className="text-foreground underline underline-offset-2 hover:no-underline"
              href="https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811"
              rel="noopener noreferrer"
              target="_blank"
            >
              sak 107811
            </a>
            . Når kuttet trer i kraft, bestemmer regjeringen; vedtaket åpner for
            tidligst 1. april og senest 1. mai som start.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {taxItems.map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center mb-5">
                <item.icon className="h-6 w-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-bold text-foreground">
                  {item.rate}
                </span>
                <span className="text-muted-foreground">{item.unit}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {item.description}
              </p>
              {item.trend ? (
                <div className="flex items-center gap-2 text-sm">
                  <ArrowRight className="h-4 w-4 text-accent" />
                  <span className="text-accent font-medium">{item.trend}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 md:p-8 border-b border-border">
            <h3 className="font-semibold text-foreground">
              Utvikling over tid
            </h3>
            <p className="text-sm text-muted-foreground">
              Faste avgifter per liter (ekskl. MVA)
            </p>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
              Startdato for sommerkuttet i 2026 er ikke endelig: vi bruker{" "}
              <strong className="font-medium text-foreground">1. mai</strong> i
              modellen og grafene inntil regjeringen fastsetter ikrafttredelse
              (vedtaket tillater fra 1. april eller et annet tidspunkt, men ikke
              senere enn 1. mai).
            </p>
          </div>
          <div className="overflow-x-visible md:overflow-x-auto">
            <table className="w-full">
              <thead className="hidden md:table-header-group">
                <tr className="bg-secondary/50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                    År
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                    Veibruksavgift
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                    CO₂-avgift
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                    Sum avgifter
                  </th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {historicalRows.map((row) => (
                  <tr
                    key={row.year}
                    className={`block border-t border-border p-4 first:border-t-0 md:table-row md:p-0 ${row.current ? "bg-foreground text-background" : ""}`}
                  >
                    <td
                      className={`block pb-3 font-semibold md:table-cell md:px-6 md:py-4 ${row.current ? "" : "text-foreground"}`}
                    >
                      <span
                        className={`block text-xs uppercase tracking-wide md:hidden ${row.current ? "text-background/70" : "text-muted-foreground"}`}
                      >
                        År
                      </span>
                      {row.year}
                    </td>
                    <td
                      className={`flex items-center justify-between gap-4 py-2 tabular-nums md:table-cell md:px-6 md:py-4 md:text-right ${row.current ? "" : "text-muted-foreground"}`}
                    >
                      <span
                        className={`text-xs uppercase tracking-wide md:hidden ${row.current ? "text-background/70" : "text-muted-foreground"}`}
                      >
                        Veibruksavgift
                      </span>
                      <span>{row.vei} kr</span>
                    </td>
                    <td
                      className={`flex items-center justify-between gap-4 py-2 tabular-nums md:table-cell md:px-6 md:py-4 md:text-right ${row.current ? "" : "text-muted-foreground"}`}
                    >
                      <span
                        className={`text-xs uppercase tracking-wide md:hidden ${row.current ? "text-background/70" : "text-muted-foreground"}`}
                      >
                        CO₂-avgift
                      </span>
                      <span>{row.co2} kr</span>
                    </td>
                    <td className="flex items-center justify-between gap-4 py-2 font-bold tabular-nums md:table-cell md:px-6 md:py-4 md:text-right">
                      <span
                        className={`text-xs uppercase tracking-wide md:hidden ${row.current ? "text-background/70" : "text-muted-foreground"}`}
                      >
                        Sum avgifter
                      </span>
                      <span>{row.total} kr</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 p-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              I 2026 er det en ordinær økning i CO₂ sammenlignet med 2025, men
              Stortinget har vedtatt lavere satser for en periode om sommeren —
              se tabellen over. «1. mai–31. aug.» er en foreløpig merkelapp: vi
              bruker 1. mai som start inntil regjeringen setter endelig
              ikrafttredelse.
            </p>
            <p className="text-xs text-muted-foreground">
              Modellen inkluderer ikke alle mulige små satser og særregler.
              Svovelavgift utløses for mineralolje med svovelinnhold over 0,05
              vektprosent; vanlig veidiesel (lavsvovel) ligger under denne
              grensen og får normalt ikke denne avgiften. Andre
              mineraloljeprodukter eller avvikende svovelinnhold kan være
              annerledes. Se satser og regelverk hos{" "}
              <a
                href="https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/avgiftssatser-2026/id3121982/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2 hover:no-underline"
              >
                Regjeringen (avgiftssatser)
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

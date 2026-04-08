import Link from "next/link";

import {
  estimateComparisonPriceNokPerLiter,
  getAnleggsdieselRates,
  getFiskeFjerneFarvannRates,
  getFiskeKunNaereFarvannRates,
  getFiskeNaereOgFjerneFarvannRates,
  getPumpPriceRates,
  pumpPriceComponents,
} from "@/lib/pump-price-model";
import type { ComparisonDieselRates } from "@/lib/pump-price-model";
import { getRegionPriceProfile } from "@/lib/regional-price-model";
import type { RegionId } from "@/lib/regional-price-model";

const fmtKr = (n: number): string =>
  n.toLocaleString("nb-NO", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

const TH =
  "text-left py-3 px-3 md:px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground border-b border-border";
const TD = "py-3 px-3 md:px-4 border-b border-border text-sm";

interface UseCaseRow {
  label: string;
  rates: ComparisonDieselRates;
  total: number;
}

export const DieselUseCaseComparison = function DieselUseCaseComparison({
  dutyReferenceDate,
  rawPriceNokPerLiter,
  regionId,
}: {
  dutyReferenceDate: string;
  rawPriceNokPerLiter: number;
  regionId: RegionId;
}) {
  const region = getRegionPriceProfile(regionId);
  const auto = getPumpPriceRates(dutyReferenceDate);
  const autoTotal = pumpPriceComponents(
    rawPriceNokPerLiter,
    regionId,
    dutyReferenceDate
  ).total;

  const est = (r: ComparisonDieselRates) =>
    estimateComparisonPriceNokPerLiter(
      rawPriceNokPerLiter,
      r,
      regionId,
      dutyReferenceDate
    );

  const anlegg = getAnleggsdieselRates(dutyReferenceDate);
  const fjerne = getFiskeFjerneFarvannRates(dutyReferenceDate);
  const naereOgFjerne = getFiskeNaereOgFjerneFarvannRates(dutyReferenceDate);
  const kunNaere = getFiskeKunNaereFarvannRates(dutyReferenceDate);

  const rows: UseCaseRow[] = [
    { label: "Autodiesel (vei)", rates: auto, total: autoTotal },
    { label: "Anleggsdiesel", rates: anlegg, total: est(anlegg) },
    { label: "Fiske, fjerne farvann", rates: fjerne, total: est(fjerne) },
    {
      label: "Fiske, nære og fjerne farvann",
      rates: naereOgFjerne,
      total: est(naereOgFjerne),
    },
    {
      label: "Fiske, kun nære farvann",
      rates: kunNaere,
      total: est(kunNaere),
    },
  ];

  const autodieselCo2IsVedtattKutt =
    auto.co2 === 3.09 &&
    dutyReferenceDate >= "2026-05-01" &&
    dutyReferenceDate < "2026-09-01";

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
      <h3 className="text-lg font-semibold text-foreground mb-1">
        Samme råvare, ulike avgifter
      </h3>
      <p className="text-sm text-muted-foreground max-w-3xl mb-6">
        Tabellen bruker dagens råvarepris og{" "}
        <strong className="font-medium text-foreground">
          samme modellerte distribusjon
        </strong>{" "}
        som estimatet for {region.label.toLowerCase()}. Forskjellen er hvilke
        offentlige satser som gjelder per bruksområde.{" "}
        <Link
          className="text-foreground underline underline-offset-4 hover:text-accent"
          href="/nyheter/slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart"
        >
          Les mer om hva som er vedtatt og iverksatt
        </Link>
        .
      </p>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[28rem] text-foreground">
          <thead>
            <tr>
              <th className={TH}>Bruksområde</th>
              <th className={`${TH} text-right tabular-nums`}>Veibruks</th>
              <th className={`${TH} text-right tabular-nums`}>CO₂</th>
              <th className={`${TH} text-right tabular-nums`}>Estimat</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className={`${TD} font-medium`}>{row.label}</td>
                <td
                  className={`${TD} text-right tabular-nums text-muted-foreground`}
                >
                  {fmtKr(row.rates.veibruks)} kr/l
                </td>
                <td
                  className={`${TD} text-right tabular-nums text-muted-foreground`}
                >
                  {fmtKr(row.rates.co2)} kr/l
                </td>
                <td className={`${TD} text-right font-semibold tabular-nums`}>
                  {fmtKr(row.total)} kr/l
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-4 space-y-2 text-xs text-muted-foreground leading-relaxed">
        <li>
          Alle radene inkluderer{" "}
          <strong className="text-foreground">MVA 25 %</strong> på råvare,
          distribusjon og avgifter. Faktisk MVA og kjøpsvilkår kan avvike for
          enkelte næringskjøp.
        </li>
        {autodieselCo2IsVedtattKutt ? (
          <li>
            For autodiesel er CO₂{" "}
            <strong className="text-foreground">3,09 kr/l</strong> lagt inn
            etter Stortingets vedtak 595. Regjeringen har sagt at denne
            endringen fortsatt må avklares før den er endelig gjeldende.
          </li>
        ) : null}
        <li>
          CO₂ for fiske i <strong className="text-foreground">fjerne</strong> og
          i <strong className="text-foreground">nære og fjerne</strong> farvann
          ble satt til 0 kr/l fra 1. april (vedtak 591 og 592, iverksatt). For
          fartøy som <strong className="text-foreground">bare</strong> fisker i
          nære farvann finnes det ingen redusert sats i gjeldende lov — de
          betaler ordinær CO₂ ({fmtKr(kunNaere.co2)} kr/l). Stortinget har
          vedtatt 0 kr/l også for denne gruppen (vedtak 594), men det er ikke
          iverksatt ennå grunnet statsstøtterettslige spørsmål.
        </li>
      </ul>
    </div>
  );
};

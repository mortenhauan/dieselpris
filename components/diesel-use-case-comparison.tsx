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

export const DieselUseCaseComparison = ({
  dutyReferenceDate,
  rawPriceNokPerLiter,
  regionId,
}: {
  dutyReferenceDate: string;
  rawPriceNokPerLiter: number;
  regionId: RegionId;
}) => {
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
        offentlige satser som gjelder per bruksområde. Modellen regner med
        fossil mineralolje; innblanding av biodrivstoff kan gi andre avgifter.{" "}
        <Link
          className="text-foreground underline underline-offset-4 hover:text-accent"
          href="/nyheter/slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart"
        >
          Bakgrunn om avgiftskuttene våren 2026
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
        <li>
          Satsene gjelder {dutyReferenceDate}. De midlertidige CO₂-kuttene for
          fiske gjaldt til 1. september 2026. For fiske bare i nære farvann
          gjaldt nullsatsen fra 1. mai til 31. august. Ordinære og reduserte
          satser er tilbake fra 1. september.{" "}
          <a
            className="text-foreground underline underline-offset-2"
            href="https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/saravgifter/om/mineralske-produkter/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Se satser hos Skatteetaten
          </a>
          .
        </li>
      </ul>
    </div>
  );
};

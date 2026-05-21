import { getRegionPriceProfile } from "@/lib/regional-price-model";
import type { RegionId } from "@/lib/regional-price-model";

export const NATIONAL_SITE_SUMMARY_DESCRIPTION =
  "Se dagens dieselråvarepris, avgifter og estimert pumpepris etter region. Forklaringer og nyheter for sjåfører og flåteeiere — indikativt, ikke fasit på stasjonen.";

export const siteSummaryDescriptionForRegion =
  function siteSummaryDescriptionForRegion(regionId: RegionId): string {
    if (regionId === "national") {
      return NATIONAL_SITE_SUMMARY_DESCRIPTION;
    }
    const { label } = getRegionPriceProfile(regionId);
    return `Se dagens dieselråvarepris, avgifter og estimert pumpepris for ${label}. Forklaringer og nyheter for sjåfører og flåteeiere — indikativt, ikke fasit på stasjonen.`;
  };

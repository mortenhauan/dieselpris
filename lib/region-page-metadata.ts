import type { Metadata } from "next"
import { getRegionPriceProfile, type RegionId } from "@/lib/regional-price-model"

const DESCRIPTION =
  "Følg dieselpriser fra ICE børsen i sanntid. Se hvordan norske avgifter påvirker pumpeprisen, inkludert veibruksavgift, CO2-avgift og mva."

export function regionPageMetadata(regionId: RegionId): Metadata {
  const profile = getRegionPriceProfile(regionId)
  return {
    title: `Dieselpris – ${profile.shortLabel} | Dieselpris.no`,
    description: DESCRIPTION,
  }
}

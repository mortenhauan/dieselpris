import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getDieselPricesData } from "@/lib/get-diesel-prices"
import { getRegionPriceProfile, REGION_PRICE_PROFILES } from "@/lib/regional-price-model"
import { parseRegionRouteParam } from "@/lib/region-route"
import { DieselPrisPageClient } from "../diesel-pris-page-client"

type Props = {
  params: Promise<{ region: string }>
}

export function generateStaticParams() {
  return REGION_PRICE_PROFILES.map((p) => ({ region: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region: segment } = await params
  const regionId = parseRegionRouteParam(segment)
  if (!regionId) return {}
  const profile = getRegionPriceProfile(regionId)
  return {
    title: `Dieselpris – ${profile.shortLabel} | Dieselpris.no`,
    description:
      "Følg dieselpriser fra ICE børsen i sanntid. Se hvordan norske avgifter påvirker pumpeprisen, inkludert veibruksavgift, CO2-avgift og mva.",
  }
}

export default async function RegionPage({ params }: Props) {
  const { region: segment } = await params
  const regionId = parseRegionRouteParam(segment)
  if (!regionId) notFound()

  const dieselPrices = await getDieselPricesData()
  return <DieselPrisPageClient data={dieselPrices} regionId={regionId} />
}

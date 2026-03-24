import { DieselPrisPageClient } from "./diesel-pris-page-client"
import { getDieselPricesData } from "@/lib/get-diesel-prices"
import type { RegionId } from "@/lib/regional-price-model"

export async function RegionDieselShell({ regionId }: { regionId: RegionId }) {
  const dieselPrices = await getDieselPricesData()
  return <DieselPrisPageClient data={dieselPrices} regionId={regionId} />
}

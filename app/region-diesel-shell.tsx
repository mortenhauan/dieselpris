import { Suspense } from "react"
import { Header } from "@/components/header"
import type { RegionId } from "@/lib/regional-price-model"
import { DieselPageSkeleton } from "./diesel-page-skeleton"
import { DieselPricesStream } from "./diesel-prices-stream"

export function RegionDieselShell({ regionId }: { regionId: RegionId }) {
  return (
    <div className="min-h-screen bg-background">
      <Header selectedRegionId={regionId} />
      <Suspense fallback={<DieselPageSkeleton />}>
        <DieselPricesStream regionId={regionId} />
      </Suspense>
    </div>
  )
}

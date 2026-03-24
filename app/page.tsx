import { redirect } from "next/navigation"
import { DEFAULT_REGION_ID } from "@/lib/regional-price-model"
import { regionPath } from "@/lib/region-route"

export default function HomePage() {
  redirect(regionPath(DEFAULT_REGION_ID))
}

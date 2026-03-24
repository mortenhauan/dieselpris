import { getDieselPricesData } from "@/lib/get-diesel-prices"
import { DieselPrisPageClient } from "./diesel-pris-page-client"

export default async function Page() {
  const initialData = await getDieselPricesData()
  return <DieselPrisPageClient initialData={initialData} />
}

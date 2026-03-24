import { NextResponse } from "next/server"
import { getDieselPricesData } from "@/lib/get-diesel-prices"

export const maxDuration = 30

export async function GET() {
  const data = await getDieselPricesData()
  return NextResponse.json(data)
}

import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

import { getDieselPricesData } from "@/lib/get-diesel-prices";

export const maxDuration = 120;

export const GET = async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  revalidateTag("diesel-prices", { expire: 0 });
  await getDieselPricesData();

  return Response.json({ ok: true });
};

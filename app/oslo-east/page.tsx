import type { Metadata } from "next";
import { regionPageMetadata } from "@/lib/region-page-metadata";
import { RegionDieselShell } from "../region-diesel-shell";

export const metadata: Metadata = regionPageMetadata("oslo-east");

export default async function Page() {
  return <RegionDieselShell regionId="oslo-east" />;
}

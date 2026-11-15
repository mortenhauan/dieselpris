import type { Metadata } from "next";

import { regionPageMetadata } from "@/lib/region-page-metadata";

import { RegionDieselShell } from "../region-diesel-shell";

export const metadata: Metadata = regionPageMetadata("nord");

const Page = () => <RegionDieselShell regionId="nord" />;
export default Page;

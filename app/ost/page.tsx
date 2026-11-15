import type { Metadata } from "next";

import { regionPageMetadata } from "@/lib/region-page-metadata";

import { RegionDieselShell } from "../region-diesel-shell";

export const metadata: Metadata = regionPageMetadata("ost");

const Page = () => <RegionDieselShell regionId="ost" />;
export default Page;

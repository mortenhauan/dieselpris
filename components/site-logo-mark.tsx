import Image from "next/image";

import { cn } from "@/lib/utils";

const ALT = "Dieselpris.no";

export const SiteLogoMark = ({ className }: { className?: string }) => (
  <Image
    alt={ALT}
    className={cn("object-contain", className)}
    height={32}
    src="/logo.svg"
    width={32}
  />
);

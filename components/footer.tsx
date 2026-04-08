import Link from "next/link";

import { SiteLogoMark } from "@/components/site-logo-mark";
import { SocialPlatformIcon } from "@/components/social-platform-icon";
import {
  SOCIAL_FACEBOOK,
  SOCIAL_PROFILES,
  SOCIAL_X,
} from "@/lib/social-profiles";
import { cn } from "@/lib/utils";

const copyrightYear = 2026;

export const Footer = function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <SiteLogoMark className="h-8 w-8 shrink-0" />
              <span className="text-base font-semibold tracking-tight text-foreground">
                dieselpris
              </span>
            </div>
            <div className="max-w-md space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Ikke tilknyttet drivstoffkjeder. Viser markedsdata og offentlige
                satser slik de er oppgitt i kildene.
              </p>
              <p>
                Les også{" "}
                <Link
                  href="/nyheter"
                  className="font-medium text-foreground underline underline-offset-2 hover:no-underline"
                >
                  nyheter og forklaringer
                </Link>{" "}
                om vedtak og avgifter som kan påvirke prisen på pumpa.
              </p>
              <p>
                Korte oppdateringer også på{" "}
                <a
                  aria-label={SOCIAL_X.ariaLabel}
                  className="font-medium text-foreground underline underline-offset-2 hover:no-underline"
                  href={SOCIAL_X.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {SOCIAL_X.label}
                </a>{" "}
                og{" "}
                <a
                  aria-label={SOCIAL_FACEBOOK.ariaLabel}
                  className="font-medium text-foreground underline underline-offset-2 hover:no-underline"
                  href={SOCIAL_FACEBOOK.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Facebook
                </a>
                .
              </p>
              <p className="text-xs leading-relaxed">
                Tall og forklaringer er veiledende og kan inneholde feil eller
                forenklinger. Ikke finansrådgivning eller prisgaranti —
                verifiser mot kildene ved viktige beslutninger.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">
              Kilder
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.ice.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  ICE Futures Europe
                </a>
              </li>
              <li>
                <a
                  href="https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/avgiftssatser-2026/id3121982/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Regjeringen (avgiftssatser)
                </a>
              </li>
              <li>
                <a
                  href="https://lovdata.no"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Lovdata
                </a>
              </li>
              <li>
                <a
                  href="https://www.norges-bank.no"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Norges Bank
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">
              Om prisene
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Prisene er basert på ICE lavsvovel gasoil (futures) og gir en
              indikasjon på råvarepris. Faktiske pumpepriser varierer.
            </p>
          </div>
        </div>

        <div className="border-border mt-12 flex flex-col gap-6 border-t pt-8 text-muted-foreground text-sm sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
          <p>&copy; {copyrightYear} dieselpris.no</p>
          <div className="w-full max-w-md rounded-xl border border-border bg-muted/30 p-4 sm:w-auto sm:max-w-none">
            <span className="font-semibold text-foreground">Følg oss</span>
            <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {SOCIAL_PROFILES.map((profile) => (
                <li key={profile.href}>
                  <a
                    aria-label={profile.ariaLabel}
                    className={cn(
                      "inline-flex w-full items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2.5 font-medium text-foreground transition-colors",
                      "hover:border-accent/50 hover:bg-accent/5 sm:w-auto"
                    )}
                    href={profile.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <SocialPlatformIcon
                      className="size-4 shrink-0"
                      platform={profile.platform}
                    />
                    <span className="text-left text-sm leading-snug">
                      {profile.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

# npm/pnpm supply chain (2025–2026)

## Why this page exists

[Kompromitterte npm-registreringspakker](https://socket.dev/blog) har økt kraftig — blant annet «Mini Shai-Hulud»-kampanjen (store treff i **@antv**- og **TanStack**-økosystemene, vår/våren 2026) og angrep som stjeler **CI/npm-tokens** på `postinstall`. Socket publiserer analysedetaljer og IOC-lister; følg [@SocketSecurity](https://x.com/SocketSecurity) / [socket.dev/blog](https://socket.dev/blog) ved nye hendelser.

Denne kodebasen bruker verken **TanStack Router/Query** eller **@antv** som direkte avhengigheter (sjekket i `pnpm-lock.yaml` etter siste avhengighetsløft), men **alle** prosjekter bør behandle `pnpm install` og nye versjoner skeptisk.

## Praktisk «trygg oppdatering»-flyt

1. **Les** siste Socket-/GitHub-advisory for scope du rører (`@tanstack/*`, `echarts-for-react`, `@antv/*`, `node-ipc`, osv.).
2. **`pnpm outdated`** — se hva som faktisk kan løftes.
3. **Løft** med `pnpm dlx npm-check-updates …` eller manuelle versjoner **i en egen sak/PR** med lesbar `pnpm-lock.yaml`-diff.
4. **`pnpm audit`** etter install (og revider transittive veier med `pnpm why <pkg>`).
5. **Test:** `pnpm lint`, `pnpm typecheck`, `pnpm build`.
6. **Valgfritt:** [Socket CLI «safe npm»](https://docs.socket.dev/docs/socket-npm-socket-npx) (`pnpm dlx socket …` / wrapper) for ekstra blokkering før install.

## Bevisste valg i dette repo

| Valg                                      | Årsak                                                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **`pnpm.overrides` for `next>postcss`**   | Next 16 trakk tidligere inn `postcss@8.4.x` (kjent moderate XSS-advisory). Vi tvinger patched `8.5.15` i tråd med GHSA.                    |
| **`brace-expansion`**                     | Transittivt via `ultracite` → `glob` → `minimatch`; overstyr til patched `5.0.6`.                                                          |
| **`react-day-picker` forblir 9.14.0**     | Siste v9; v10 er major med API-endringer/shadcn-justeringer — egen migrasjon ([daypicker.dev/upgrading](https://daypicker.dev/upgrading)). |
| **`pnpm` 10.x i `packageManager`**        | Oppgrader til pnpm 11 når teamet er klart (`corepack use pnpm@…`); ikke sprunget her.                                                      |
| **Mange `@radix-ui/*` med eksakt semver** | Matcher shadcn/leverte UI-filer; oppgrader samlet når du oppfrisker komponenter.                                                           |

## Regenerere låsefil

```bash
pnpm install
pnpm audit
pnpm lint && pnpm typecheck && pnpm build
```

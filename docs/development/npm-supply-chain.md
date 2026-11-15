# Dependency maintenance

The runtime is pinned in `.nvmrc` to Node **26.13.1 LTS**, the 11 November
2026 security release. `engines.node` stays on the Node 26 line. Load it with
`source scripts/use-nvm.sh` before running project commands.

`packageManager` pins **pnpm 12.21.0**. pnpm 12 is the stable Rust implementation;
Corepack selects the pinned version. Install settings, build permissions, and
transitive dependency overrides live in `pnpm-workspace.yaml` because pnpm 12
no longer reads the `pnpm` field in `package.json`.

## Compiler and checks

**TypeScript 7.0.2 is the stable Go compiler.** Its public command is `tsc`, which
launches the native platform binary from `@typescript/typescript-darwin-arm64`
(or the corresponding package on other platforms). The old preview command
`tsgo` and `@typescript/native-preview` are unnecessary.

Use the locally installed tools:

```bash
source scripts/use-nvm.sh
pnpm install --frozen-lockfile
pnpm check
pnpm typecheck
pnpm test
pnpm build
```

`test` and `prices` use the pinned `tsx` loader through `node --import tsx`.
`pnpm prices` fetches current market context without downloading an unpinned
runner.

## November 2026 migration

- Next.js **16.4.6**, React/React DOM **19.3.1**, Tailwind CSS **4.3.5**.
  Partial Prefetching is enabled alongside Cache Components. The news layout
  requires complete static output through `ensureStatic = "navigation"`.
- TradingView **4.1.2** uses typed ESM imports, `TradingViewClient`, chart events,
  `count`, and `backAdjustment`. The adapter maps the new `high`/`low` candle
  fields to the existing application bar shape. Connection and chart errors
  reject the request, and all completion timers are cleared during cleanup.
- DayPicker **10.0.2** uses the preferred `@daypicker/react` package and
  `month_grid` class-name key. Calendar component overrides have stable
  module-level identities.
- Ultracite **8.2.1**, Oxlint **1.93.0**, Oxfmt **0.78.0** retain the Oxlint
  backend. The formatter uses the stable `sortImports` and `sortPackageJson`
  settings. Imported agent skills are excluded from formatting; application code
  remains checked.
- The obsolete TradingView `axios`/`ws` v3 overrides are removed. Compatible overrides keep Next.js's PostCSS on **8.5.33**,
  Vercel routing's `path-to-regexp` on **6.3.0**, and `source-map-js` on
  **1.2.2** to address published advisories.

Check the registry for stable releases before a future upgrade, review major
release guides, install and inspect the lockfile diff, then run the checks
above and `pnpm audit`. Commit the manifest and lockfile together.

## Primary references

- [Node 26.13.1 release](https://nodejs.org/en/blog/release/v26.13.1)
- [TypeScript 7 native compiler](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
- [pnpm 12 release](https://pnpm.io/blog/releases/12.0)
- [pnpm 12.21.0 release](https://pnpm.io/blog/releases/12.21.0)
- [Next.js 16.4](https://nextjs.org/blog/next-16-4)
- [TradingView v4 migration](https://github.com/Mathieu2301/TradingView-API/blob/main/docs/migration-v4.md)
- [DayPicker v10 migration](https://daypicker.dev/upgrading)
- [Ultracite v8 migration notes](https://www.ultracite.ai/changelog/ultracite-8-0-0)

Next.js reference pages matching the installed version are bundled under
`node_modules/next/dist/docs/`.

## Remaining development-tool advisories

The current stable `@vercel/config` still depends on Zod 3.25.76. Its
[oversized-collection advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)
has no Zod 3 patch. Forcing Zod 4 across this major-version boundary would alter
the upstream tool's schema API. The application itself uses patched Zod 4.6.7;
`@vercel/config` is a development dependency used for trusted project
configuration.

Ultracite depends on deepmerge 4.3.1, whose
[prototype-poisoning advisory](https://github.com/advisories/GHSA-gcqx-w48m-w2h4)
has no published patch. It is a development dependency processing trusted
linter configuration. Keep both findings visible in `pnpm audit` until upstream
releases compatible fixes.

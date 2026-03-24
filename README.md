# dieselpris

Web app that helps **Norwegian users** make sense of **diesel prices**: what drives the pump price, how taxes and margins fit in, and how wholesale or futures-related benchmarks move over time.

The home page is a **server component** that loads prices with **`getDieselPricesData()`**, which uses Next.js **Cache Components** (`"use cache"`, `cacheLife`, `cacheTag`): policy lives in **`next.config.mjs`** as the custom profile **`dieselPrices`** (**5 min** client `stale`, **~30 min** server `revalidate`, **96 h** idle `expire` so weekend gaps rarely trigger a user-paid cold refetch on daily benchmark data), plus a **Vercel cron** (weekdays **07:00 UTC**) that calls `/api/revalidate-diesel` with **`CRON_SECRET`** to invalidate and **warm** the cache. The client UI only handles interactivity (e.g. region); it does not refetch price payloads. USD→NOK for NOK/litre uses **Norges Bank** open data (`data.norges-bank.no`) when available, with a fixed fallback if the request fails. The goal is a clear explanation—not a trading or price-guarantee tool.

## Features

- Current price context and change (USD/MT and NOK/litre where applicable)
- Historical chart and futures curve-style views with date-aware public avgifter
- Tax breakdown and plain-language explainers
- Regional estimate selector and margin explainer

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router, `cacheComponents`)
- React 19, TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4
- [pnpm](https://pnpm.io/) as package manager

## Requirements

- Node.js **^24.14.0** (see `package.json` → `engines`)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

No backend env vars are required for local development. For **production cron** warming, set **`CRON_SECRET`** in Vercel (see [securing cron jobs](https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs)); optional locally in `.env.local` if you hit `/api/revalidate-diesel` with `Authorization: Bearer <secret>`.

### Vercel

The repo includes [`vercel.ts`](./vercel.ts) ([programmatic Vercel config](https://vercel.com/docs/project-configuration/vercel-ts)) with a **cron** for diesel cache refresh. The default Next.js build runs on deploy.

## Scripts

| Command          | Description            |
| ---------------- | ---------------------- |
| `pnpm dev`       | Development server     |
| `pnpm build`     | Production build       |
| `pnpm start`     | Run production server  |
| `pnpm lint`      | ESLint                 |
| `pnpm typecheck` | TypeScript (no emit)   |

## Project layout

- `app/` — routes and layout
- `components/` — UI and feature blocks (charts, tax explainers, etc.)
- `lib/` — shared utilities ([readme](./lib/README.md))

## Data and responsibility

Imported or aggregated figures should always be treated as **indicative**. Pump prices, taxes, and exchange rates change; use official stations, regulators, and your own judgement for real decisions. This project is **not financial advice**.

## License

See [LICENSE](./LICENSE) (MIT).

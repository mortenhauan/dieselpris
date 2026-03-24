# dieselpris

Web app that helps **Norwegian users** make sense of **diesel prices**: what drives the pump price, how taxes and margins fit in, and how wholesale or futures-related benchmarks move over time.

Data is served from the app’s own API (`/api/diesel-prices`) so the UI can stay simple and fast. The goal is a clear explanation—not a trading or price-guarantee tool.

## Features

- Current price context and change (USD/MT and NOK/litre where applicable)
- Historical chart and futures curve–style views
- Tax breakdown and plain-language explainers
- Regional margin perspectives

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- React 19, TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4
- [SWR](https://swr.vercel.app/) for client fetching
- [Convex](https://www.convex.dev/) for database and server functions ([`convex/`](./convex/README.md))
- [pnpm](https://pnpm.io/) as package manager

## Requirements

- Node.js **^24.14.0** (see `package.json` → `engines`)

## Getting started

```bash
pnpm install
pnpm convex:dev   # terminal 1: sync functions to your Convex dev deployment
pnpm dev          # terminal 2: Next.js
```

Open [http://localhost:3000](http://localhost:3000).

`.env.local` should set `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`, and `NEXT_PUBLIC_CONVEX_SITE_URL` (from the deployment **Summary** in the Convex dashboard, or auto-written when `pnpm convex:dev` configures the project). See [`.env.example`](./.env.example). Use the same public URL variables in production hosting (e.g. Vercel).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Development server       |
| `pnpm build`   | Production build         |
| `pnpm start`   | Run production server    |
| `pnpm lint`    | ESLint                   |
| `pnpm typecheck` | TypeScript (no emit)   |
| `pnpm convex:dev` | Convex dev server (DB + function deploy) |

## Project layout

- `app/` — routes, layout, and API routes (e.g. `app/api/diesel-prices/`)
- `components/` — UI and feature blocks (charts, tax explainers, etc.)
- `convex/` — Convex schema, queries, mutations, actions ([readme](convex/README.md))
- `lib/` — shared utilities

## Data and responsibility

Imported or aggregated figures should always be treated as **indicative**. Pump prices, taxes, and exchange rates change; use official stations, regulators, and your own judgement for real decisions. This project is **not financial advice**.

## License

See [LICENSE](./LICENSE) (MIT).

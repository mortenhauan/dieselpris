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
- [pnpm](https://pnpm.io/) as package manager

## Requirements

- Node.js **^24.14.0** (see `package.json` → `engines`)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Development server       |
| `pnpm build`   | Production build         |
| `pnpm start`   | Run production server    |
| `pnpm lint`    | ESLint                   |
| `pnpm typecheck` | TypeScript (no emit)   |

## Project layout

- `app/` — routes, layout, and API routes (e.g. `app/api/diesel-prices/`)
- `components/` — UI and feature blocks (charts, tax explainers, etc.)
- `lib/` — shared utilities

## Data and responsibility

Imported or aggregated figures should always be treated as **indicative**. Pump prices, taxes, and exchange rates change; use official stations, regulators, and your own judgement for real decisions. This project is **not financial advice**.

## License

See [LICENSE](./LICENSE) (MIT).

# Convex backend

Real-time database and server functions for dieselpris. Schema lives in [`schema.ts`](./schema.ts); public API is file-based (`health.ts`, etc.).

## Docs

- [`health.md`](./health.md) — smoke-test query

## Develop

Run `pnpm convex:dev` from the repo root (keep it running while you change `convex/`). It syncs functions to the **dev deployment** named in `CONVEX_DEPLOYMENT` and refreshes `convex/_generated/`. Root `.env.local` must match the dashboard (cloud URL + site URL for HTTP actions).

Production: `pnpm exec convex deploy` when you are ready to ship (separate from daily dev).

## Links

- [Convex docs](https://docs.convex.dev)

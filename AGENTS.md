## Learned User Preferences

- When Norwegian UI copy is wrong, fix å, ø, and æ (and related wording) across all user-facing text, not just a single screen; review all visible copy when fixing orthography.
- Attach repo skills (e.g. Next cache components) when you want a specific workflow or stack doc followed end-to-end.
- For git actions you care about (e.g. push), ask the agent to run them rather than only listing commands.
- Prefer Tailwind and CSS for responsive layout and simple visual fixes; avoid React hooks or JS layout measurement when the same result is achievable cleanly with styling alone.
- Remove temporary debug or ingest instrumentation after the underlying bug or investigation is resolved.

## Learned Workspace Facts

- Package manager is pnpm with `packageManager` pinned in `package.json`; Node is pinned via `.nvmrc` and `engines`; use `scripts/use-nvm.sh` when the shell does not load nvm.
- Next.js 16 uses Cache Components (`cacheComponents`); avoid non-deterministic prerender (e.g. `new Date()` in places that run during static shell prerender); keep purely presentational server UI in the root layout when it should not be pulled under a client page.
- ESLint uses flat `eslint-config-next`; do not use FlatCompat with this Next major.
- `*.zip` in the repo is gitignored (e.g. v0 exports); integrate zips by extracting and merging, not committing the archive.
- Vercel project config for this app is `vercel.ts` (not `vercel.json`).
- Primary audience is drivers and fleet owners learning what moves diesel prices; keep explanations short, plain Norwegian, and fact-checked when stating duties, shares, or regulatory claims; treat numbers as indicative and not financial advice (project README stance).

## Learned User Preferences

- User-facing Norwegian copy should read for drivers and fleet owners: short, plain language, correct orthography (å, ø, æ); when fixing wording or spelling, review **all** visible copy across pages and avoid developer-meta phrasing (e.g. "when we have data" instead of what the user needs to know).
- For market and price UI, metadata, and share copy, labels and timestamps should reflect the **quoted market/exchange reference** rather than ingest time; keep the last visible tick's date consistent with the latest daily observation; explain futures and "change" in plain language; keep indicative, futures/model-based framing and avoid implying a lookup of the user's local pump price.
- For stacked pump-price charts, list hover/tooltip rows **top-of-stack first** so reading the card matches the picture; keep **andel avgifter** / tax-share hints and labels (e.g. whether MVA is included) aligned with side or detail breakdown views.
- Do not show fabricated, placeholder, or demo values as if they were live market data; use clear unavailable or empty states instead.
- In Norwegian copy, use "flåteeiere" (not "vognparkeiere") for fleet operators; verify domain-specific Norwegian vocabulary when writing for drivers and fleet owners.
- For git actions you care about (e.g. push), ask the agent to run them rather than only listing commands; split commits into logical groups (e.g. feature vs unrelated dep bumps) when they appear together.
- Prefer Tailwind and CSS for responsive layout and simple visual fixes; avoid React hooks or JS layout measurement when the same result is achievable cleanly with styling alone; before adding `useEffect` or other client effects, check whether server data, derived state, or CSS already solves it (see react-useeffect skill when relevant).
- Remove temporary debug or ingest instrumentation after the underlying bug or investigation is resolved.
- For Ultracite/Oxlint issues, prefer fixing code (structure, patterns, refactors) over turning off or relaxing lint rules when still practical.
- For public contact or press pages, prefer **domain aliases** (e.g. `kontakt@` / `presse@` on the site domain) or server-side forms with the recipient only in env vars over publishing a personal email address.
- For `/nyheter` articles, do not cap length — accuracy, sources, and depth take priority over brevity; always run the full 4-way parallel fact-check (Claude, GPT, Grok, Gemini) before publishing or revising, and address any **blocking** finding from any checker before it ships.
- Run multi-step subagents (e.g. `news-researcher`, fact-checkers, writers) in the background with explicit models so they do **not** inherit the parent chat's model.

## Learned Workspace Facts

- Package manager is pnpm with `packageManager` pinned in `package.json`; Node is pinned via `.nvmrc` and `engines` (use `scripts/use-nvm.sh` when the shell does not load nvm); lint/format uses **Ultracite** (Oxlint + Oxfmt; see `.oxlintrc.json`, `.oxfmtrc.jsonc`).
- Next.js 16 uses Cache Components (`cacheComponents`); avoid non-deterministic prerender (e.g. `new Date()` in places that run during static shell prerender); keep purely presentational server UI in the root layout when it should not be pulled under a client page.
- Social publishing (X and Facebook) is documented under `social-media/`; published post logs live in `social-media/logg/` — always log posts there after publishing. The public site does not link to those profiles.
- Site logo lives at `public/logo.svg` (CSS classes `.dp-logo-*`); use `components/site-logo-mark.tsx` for in-page rendering; primary color token is deep Norwegian blue `oklch(0.28 0.09 260)`, accent is orange `oklch(0.72 0.24 32)` in `app/globals.css`.
- Vercel project config for this app is `vercel.ts` (not `vercel.json`).
- Region routes live under ASCII segments (`/sor`, `/ost`, `/vest`, `/nord`, `/midt`); avoid unicode folder names in `app/` for regions; the national view is `/`, not a separate `/nasjonal` route.
- Primary audience is drivers and fleet owners learning what moves diesel prices; keep explanations short, plain Norwegian, and fact-checked when stating duties, shares, or regulatory claims; treat numbers as indicative and not financial advice (project README stance).
- Forward or multi-month charts use **time-based** X positions (e.g. delivery-month timestamps) rather than categorical contract slots so month labels align with the calendar; commodity overlays on a second axis often scale from 0 to a padded max.
- Pump-price stack draws via **`PUMP_PRICE_STACK_LAYERS`** and hover rows via **`PUMP_PRICE_STACK_LAYERS_TOOLTIP`** (top-first); the stacked **history** series forward-fills råvare on non-trading calendar days but runs **`pumpPriceComponents` per calendar date** (see `lib/expand-historical-to-calendar-days.ts`) so duty changes land on the correct day.
- TradingView is the price source: in-app code uses **`ICEEUR:ULS1!`** (gasoil / råvare) and **`ICEEUR:BRN1!`** (Brent) via `lib/tradingview-ice-gasoil.ts`; the news pipeline (`news-researcher` agent + `news-article-writer` skill under `.agents/skills/` with 4 parallel fact-check subagents: Claude, GPT, Grok, Gemini) fetches live / 48h / 7-day price context with a standalone TS script using the same TradingView package (run from terminal, `source scripts/use-nvm.sh` first).
- `/nyheter` articles follow **Vær Varsom-plakaten** applied as a personal transparency site (user is the ansvarlig redaktør/utgiver); when revising from fact-check feedback, update copy and figures but **do not change URL slugs**.
- Google AdSense publisher ID is **`ca-pub-9912628280603975`**; all pages include the `<meta name="google-adsense-account">` tag, `public/ads.txt` carries the `google.com, pub-9912628280603975, DIRECT, f08c47fec0942fa0` record, and the AdSense loader is gated behind a **Vercel Flags SDK** feature flag (default **off**) rather than being hard-coded.

# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `pnpm dlx ultracite fix`
- **Check for issues**: `pnpm dlx ultracite check`
- **Diagnose setup**: `pnpm dlx ultracite doctor`

Oxlint + Oxfmt (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**

- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**

- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**

- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Oxlint + Oxfmt Can't Help

Oxlint + Oxfmt's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Oxlint + Oxfmt can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Oxlint + Oxfmt. Run `pnpm dlx ultracite fix` before committing to ensure compliance.

## Learned User Preferences

- When Norwegian UI copy is wrong, fix å, ø, and æ (and related wording) across all user-facing text, not just a single screen; review all visible copy when fixing orthography.
- User-facing Norwegian copy should read for drivers and fleet owners: short, plain language, minimal repetition, no developer-meta phrasing (avoid wording that talks about “when we have data” or similar instead of what the user needs to know).
- For market and price UI, prefer labels and timestamps that reflect the **exchange or quoted market reference** (what the price refers to) rather than only when data was ingested; explain futures and “change” in plain language, not trader jargon.
- Do not show fabricated, placeholder, or demo values as if they were live market data; use clear unavailable or empty states instead.
- In global metadata and share copy, avoid implying a lookup of the user’s local station price or overstating freshness; keep futures- and model-based, indicative framing consistent with the README.
- Attach repo skills (e.g. Next cache components) when you want a specific workflow or stack doc followed end-to-end.
- For git actions you care about (e.g. push), ask the agent to run them rather than only listing commands.
- Prefer Tailwind and CSS for responsive layout and simple visual fixes; avoid React hooks or JS layout measurement when the same result is achievable cleanly with styling alone; before adding `useEffect` or other client effects, check whether server data, derived state, or CSS already solves it (see react-useeffect skill when relevant).
- Remove temporary debug or ingest instrumentation after the underlying bug or investigation is resolved.
- For Ultracite/Oxlint issues, prefer fixing code (structure, patterns, refactors) over turning off or relaxing lint rules when still practical.

## Learned Workspace Facts

- Package manager is pnpm with `packageManager` pinned in `package.json`; Node is pinned via `.nvmrc` and `engines`; use `scripts/use-nvm.sh` when the shell does not load nvm.
- Next.js 16 uses Cache Components (`cacheComponents`); avoid non-deterministic prerender (e.g. `new Date()` in places that run during static shell prerender); keep purely presentational server UI in the root layout when it should not be pulled under a client page.
- Linting and formatting use **Ultracite** with **Oxlint** + **Oxfmt** (see `.oxlintrc.json`, `.oxfmtrc.jsonc`).
- `*.zip` in the repo is gitignored (e.g. v0 exports); integrate zips by extracting and merging, not committing the archive.
- Vercel project config for this app is `vercel.ts` (not `vercel.json`).
- Region routes live under ASCII segments (`/sor`, `/ost`, `/vest`, `/nord`, `/midt`); avoid unicode folder names in `app/` for regions; the national view is `/`, not a separate `/nasjonal` route.
- Primary audience is drivers and fleet owners learning what moves diesel prices; keep explanations short, plain Norwegian, and fact-checked when stating duties, shares, or regulatory claims; treat numbers as indicative and not financial advice (project README stance).

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

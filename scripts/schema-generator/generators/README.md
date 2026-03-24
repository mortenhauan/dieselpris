# Code Generators

This folder contains the code generation functions for each output file type.

## Modules

| File | Output | Description |
|------|--------|-------------|
| `validator.ts` | `{table}Validators.ts` | Generates Convex validators with all schema fields plus system fields |
| `functions.ts` | `{table}Functions.ts` | Generates pure database helper functions without Convex wrappers |
| `mutations.ts` | `{table}InternalMutation.ts` | Generates internal mutations (create, update, remove, upsert) |
| `queries.ts` | `{table}InternalQueries.ts` | Generates internal queries (getById, list, index-based queries) |

## Adding a New Generator

1. Create a new file following the pattern of existing generators
2. Export a main `generate{Type}(table: TableDefinition): string` function
3. Import and use in `../index.ts`
4. Update `../README.md` with the new output file

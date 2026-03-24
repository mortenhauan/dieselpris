# Backend Scripts

This folder contains build and code generation scripts for the backend package.

## Schema Code Generator

Automatically generates Convex helper files from your `schema.ts` definitions. The generator **recursively searches** for all `schema.ts` files in the `convex/` directory and generates code in `./generated` folders relative to each schema file.

### Usage

```bash
# Generate once
pnpm run generate:schema

# Watch mode - regenerates on schema changes
pnpm run generate:schema:watch
```

### What it generates

For each table in your schema, the generator creates four files in a `generated/` folder relative to the schema file:

| File | Purpose |
|------|---------|
| `{table}Validators.ts` | Convex validators matching the schema definition |
| `{table}Functions.ts` | Pure helper functions (getById, updateById, updateByIdWithUndefined, deleteById, etc.) |
| `{table}InternalMutation.ts` | Internal mutations (create, update, updateWithUndefined, remove, upsert) |
| `{table}InternalQueries.ts` | Internal queries (getById, list, getByIndex, listByIndex) with bounded list limits |

#### Example Directory Structure

```
convex/
├── schema.ts                          # Main schema
├── generated/                         # Generated files for main schema
│   ├── usersValidators.ts
│   ├── usersFunctions.ts
│   ├── usersInternalMutation.ts
│   └── usersInternalQueries.ts
├── hydrobase/
│   ├── schema.ts                      # Hydrobase schema
│   └── generated/                     # Generated files for hydrobase schema
│       ├── providersValidators.ts
│       ├── providersFunctions.ts
│       ├── providersInternalMutation.ts
│       └── providersInternalQueries.ts
```

### Module Structure

The generator is organized into focused modules under `schema-generator/`:

```
schema-generator/
├── types.ts              # Type definitions (TableField, Index, TableDefinition)
├── utils.ts              # String utilities and code generation helpers
├── parser.ts             # Schema parsing with ts-morph
├── generators/
│   ├── validator.ts      # Validator file generation
│   ├── functions.ts      # Helper functions generation
│   ├── mutations.ts      # Internal mutations generation
│   └── queries.ts        # Internal queries generation
└── index.ts              # Main orchestration and CLI
```

### How it works

1. **Discovery**: Recursively searches `convex/` directory for all `schema.ts` files (skipping `node_modules`, `generated`, `_generated`, and hidden directories)
2. **Parsing**: Uses `ts-morph` to parse each schema file and extract table definitions, fields, and indexes
3. **Generation**: Creates TypeScript code strings for each file type
4. **Writing**: Outputs generated files to `./generated/` folders relative to each schema file
5. **Watching**: In watch mode, uses `chokidar` to detect schema changes (new, modified, or deleted) and regenerate

### Safety defaults

- Generated `list` and `listBy...` queries include an optional `limit` arg and enforce a safe upper bound.
- `update` mutations no longer double-wrap optional validators (`v.optional(v.optional(...))`).
- When validator-to-TypeScript inference cannot determine a precise type, generated code uses `unknown` rather than `any`.

### Supported schema shape

- Current parser support is `defineTable({ ...fields })`.
- `defineTable(...)` with non-object validator expressions is treated as unsupported and fails fast with a clear error.

### Extending

To add new generated files or modify existing generators:

1. Add new generator functions in `schema-generator/generators/`
2. Import and call them from `schema-generator/index.ts`
3. Update this README with the new output files

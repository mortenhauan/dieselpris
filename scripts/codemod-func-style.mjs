import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const skipDirs = new Set(["node_modules", ".next", "dist", ".git"]);

/** @param {string} dir */
function* walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (skipDirs.has(ent.name)) {
        continue;
      }
      yield* walk(p);
    } else if (/\.(tsx?)$/.test(ent.name) && !ent.name.endsWith(".d.ts")) {
      yield p;
    }
  }
}

/** @param {ts.FunctionDeclaration} node */
function shouldSkip(node) {
  if (!node.name || !node.body) {
    return true;
  }
  const mods = node.modifiers ?? [];
  if (mods.some((m) => m.kind === ts.SyntaxKind.DeclareKeyword)) {
    return true;
  }
  return false;
}

/** @param {ts.FunctionDeclaration} node */
function collectModifiers(node) {
  const mods = node.modifiers ?? [];
  return {
    asyncKw: mods.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword),
    defaultKw: mods.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword),
    exportKw: mods.some((m) => m.kind === ts.SyntaxKind.ExportKeyword),
  };
}

/**
 * @param {string} filePath
 * @param {string} code
 * @returns {string}
 */
function transformInnermostPass(filePath, code) {
  const kind = filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(
    filePath,
    code,
    ts.ScriptTarget.Latest,
    true,
    kind
  );

  /** @type {ts.FunctionDeclaration[]} */
  const all = [];
  const visitCollect = (node) => {
    if (ts.isFunctionDeclaration(node) && !shouldSkip(node)) {
      all.push(node);
    }
    ts.forEachChild(node, visitCollect);
  };
  visitCollect(sf);

  /** @param {ts.FunctionDeclaration} d */
  const isInnermost = (d) => {
    const { body } = d;
    if (!body) {
      return false;
    }
    const bStart = body.pos;
    const bEnd = body.end;
    for (const e of all) {
      if (e === d) {
        continue;
      }
      if (e.pos >= bStart && e.end <= bEnd) {
        return false;
      }
    }
    return true;
  };

  const targets = all.filter(isInnermost);
  /** @type {{ start: number; end: number; text: string }[]} */
  const edits = [];

  for (const node of targets) {
    const { exportKw, defaultKw, asyncKw } = collectModifiers(node);
    const fullStart = node.getFullStart();
    const end = node.getEnd();
    const trivia = code.slice(fullStart, node.getStart(sf));
    const name = node.name.text;
    const asyncPart = asyncKw ? "async " : "";
    const mid = code.slice(node.name.end, end);

    let text;
    if (exportKw && defaultKw) {
      text = `${trivia}const ${name} = ${asyncPart}function ${name}${mid}; export default ${name}`;
    } else if (exportKw) {
      text = `${trivia}export const ${name} = ${asyncPart}function ${name}${mid}`;
    } else {
      text = `${trivia}const ${name} = ${asyncPart}function ${name}${mid}`;
    }
    edits.push({ end, start: fullStart, text });
  }

  edits.sort((a, b) => b.start - a.start);
  let out = code;
  for (const e of edits) {
    out = out.slice(0, e.start) + e.text + out.slice(e.end);
  }
  return out;
}

/**
 * @param {string} filePath
 * @param {string} code
 */
function transformFile(filePath, code) {
  let prev = code;
  for (let i = 0; i < 200; i += 1) {
    const next = transformInnermostPass(filePath, prev);
    if (next === prev) {
      break;
    }
    prev = next;
  }
  return prev;
}

let changed = 0;
for (const filePath of walk(root)) {
  const rel = path.relative(root, filePath);
  if (
    rel.startsWith(`scripts${path.sep}`) &&
    rel.includes("codemod-func-style")
  ) {
    continue;
  }

  const before = fs.readFileSync(filePath, "utf8");
  const after = transformFile(filePath, before);
  if (after !== before) {
    fs.writeFileSync(filePath, after);
    changed += 1;
    console.log(rel);
  }
}
console.log(`Updated ${changed} files.`);

/**
 * Minimal loader so generate-seed.mjs can import the .ts defaults directly.
 * content-defaults.ts is plain data with type annotations, so stripping the
 * types is enough — no full TypeScript compile needed.
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import ts from "typescript";

export async function resolve(specifier, context, next) {
  if (specifier.endsWith(".ts")) {
    return { url: new URL(specifier, context.parentURL).href, shortCircuit: true };
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.endsWith(".ts")) {
    const source = await readFile(fileURLToPath(url), "utf8");
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    });
    return { format: "module", source: outputText, shortCircuit: true };
  }
  return next(url, context);
}

// main.ts — Fix Human Sleep: Funniest Patch Note (make.fun)
// Writes one line of patch notes announcing that human sleep has been
// fixed. Node 22.18+ runs this TypeScript directly (type stripping).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line, written fresh in this session. A changelog voice
// announcing the fix, with the punchline that the old sleep was never
// rest at all — just eight hours of lying in the dark worrying about
// emails. Plausible patch-note format, funny because it is true.
const ENTRY =
  "Fixed: sleep now restores humans. Previously, eight hours of sleep only produced eight hours of lying in the dark worrying about emails.";

// The competition gate, mirrored here so a bad edit fails loudly at
// build time instead of silently shipping a rejected entry: exactly one
// line, 1-160 characters, never only whitespace.
// The gate cap for this competition, kept as one named constant so the
// validator and the error message can never drift apart.
const MAX_LENGTH = 160;

function validateEntry(line: string): void {
  if (line.length < 1 || line.length > MAX_LENGTH) {
    throw new Error(`entry length ${line.length} is outside the 1-${MAX_LENGTH} gate`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}
validateEntry(ENTRY);

// The competition reads exactly one file, entry.txt, from the output
// directory — the name is fixed, so it lives in one place.
const ENTRY_FILE = "entry.txt";

function writeEntry(outDir: string, line: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, ENTRY_FILE), line, "utf8");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
writeEntry(outDir, ENTRY);
console.log(`Wrote ${ENTRY.length} characters to ${outDir}/${ENTRY_FILE}`);

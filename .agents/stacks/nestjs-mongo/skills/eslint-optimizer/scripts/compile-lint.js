#!/usr/bin/env node
/**
 * Compiles raw `eslint --format json` output into a token-efficient,
 * rule-grouped, deduplicated report under .cache/eslint/.
 *
 * Usage:
 *   node scripts/compile-lint.js [--include-warnings] [--changed-only] [--verify-clean] [--target <glob>]
 *
 * Output:
 *   .cache/eslint/raw.json      - untouched eslint json output (for debugging)
 *   .cache/eslint/report.json   - grouped + deduped, with code slices
 *   .cache/eslint/summary.json  - counts per rule only (triage view)
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const CACHE_DIR = path.join(process.cwd(), ".cache", "eslint");
const args = process.argv.slice(2);
const includeWarnings = args.includes("--include-warnings");
const changedOnly = args.includes("--changed-only");
const verifyClean = args.includes("--verify-clean");
const targetIdx = args.indexOf("--target");
const target = targetIdx !== -1 ? args[targetIdx + 1] : ".";

function getTargetFiles() {
  if (!changedOnly) return [target];
  try {
    const out = execSync(
      "git diff --name-only --diff-filter=ACM HEAD~1 -- '*.ts' '*.tsx'",
      { encoding: "utf-8" }
    ).trim();
    const files = out.split("\n").filter(Boolean);
    return files.length ? files : [target];
  } catch {
    return [target];
  }
}

function runEslint(files) {
  const cmd = `npx eslint ${files.map((f) => `"${f}"`).join(" ")} --format json`;
  try {
    const out = execSync(cmd, { encoding: "utf-8", maxBuffer: 1024 * 1024 * 64 });
    return JSON.parse(out);
  } catch (err) {
    // eslint exits non-zero when there are lint errors; stdout still has the json
    if (err.stdout) {
      try {
        return JSON.parse(err.stdout);
      } catch {
        console.error("Failed to parse eslint output:", err.message);
        process.exit(1);
      }
    }
    console.error("eslint invocation failed:", err.message);
    process.exit(1);
  }
}

/** Pull a minimal code slice around a violation: a few lines of context.
 * For a real enclosing-function slice, wire this up to ts-morph (see
 * scripts/codemods/lib/extract-slice.js) — kept lightweight here to avoid
 * a hard dependency for projects that only want the grouping step. */
function extractSlice(filePath, line, contextLines = 3) {
  try {
    const src = fs.readFileSync(filePath, "utf-8").split("\n");
    const start = Math.max(0, line - 1 - contextLines);
    const end = Math.min(src.length, line + contextLines);
    return src.slice(start, end).join("\n");
  } catch {
    return null;
  }
}

/** Cheap structural dedupe key: rule + normalized message shape, ignoring
 * identifier names/literals so near-identical violations cluster together. */
function shapeKey(ruleId, message) {
  const normalized = message
    .replace(/'[^']*'/g, "'X'")
    .replace(/"[^"]*"/g, '"X"')
    .replace(/\d+/g, "N");
  return `${ruleId}::${normalized}`;
}

function compile(rawResults) {
  const errors = {};
  const warnings = {};

  for (const fileResult of rawResults) {
    const filePath = fileResult.filePath;
    for (const msg of fileResult.messages || []) {
      if (!msg.ruleId) continue; // skip parse errors / unlabeled
      const bucket = msg.severity === 2 ? errors : warnings;
      if (msg.severity === 1 && !includeWarnings) continue;

      if (!bucket[msg.ruleId]) {
        bucket[msg.ruleId] = { count: 0, shapes: {} };
      }
      const rule = bucket[msg.ruleId];
      rule.count += 1;

      const key = shapeKey(msg.ruleId, msg.message);
      if (!rule.shapes[key]) {
        rule.shapes[key] = {
          exampleMessage: msg.message,
          count: 0,
          locations: [],
          slice: extractSlice(filePath, msg.line),
        };
      }
      rule.shapes[key].count += 1;
      rule.shapes[key].locations.push(`${path.relative(process.cwd(), filePath)}:${msg.line}`);
    }
  }

  return { errors, warnings };
}

function buildSummary(report) {
  const summarize = (bucket) =>
    Object.fromEntries(
      Object.entries(bucket)
        .sort((a, b) => b[1].count - a[1].count)
        .map(([ruleId, data]) => [ruleId, data.count])
    );
  return {
    errors: summarize(report.errors),
    warnings: includeWarnings ? summarize(report.warnings) : undefined,
    totalErrorRules: Object.keys(report.errors).length,
    totalErrors: Object.values(report.errors).reduce((s, r) => s + r.count, 0),
  };
}

function main() {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const files = getTargetFiles();
  const raw = runEslint(files);
  const report = compile(raw);
  const summary = buildSummary(report);

  fs.writeFileSync(path.join(CACHE_DIR, "raw.json"), JSON.stringify(raw));
  fs.writeFileSync(path.join(CACHE_DIR, "report.json"), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(CACHE_DIR, "summary.json"), JSON.stringify(summary, null, 2));

  console.log(`Wrote .cache/eslint/{raw,report,summary}.json`);
  console.log(`Errors: ${summary.totalErrors} across ${summary.totalErrorRules} rule(s)`);
  if (includeWarnings) {
    const warnTotal = Object.values(report.warnings).reduce((s, r) => s + r.count, 0);
    console.log(`Warnings: ${warnTotal} across ${Object.keys(report.warnings).length} rule(s)`);
  }

  if (verifyClean) {
    const dirty = summary.totalErrors > 0 || (includeWarnings && Object.values(report.warnings).some((r) => r.count > 0));
    if (dirty) {
      console.error("verify-clean: violations still remain. Not safe to delete .cache/eslint/");
      process.exit(1);
    } else {
      console.log("verify-clean: no in-scope violations remain.");
    }
  }
}

main();

#!/usr/bin/env node
/**
 * Dispatches to a registered ts-morph codemod for a given ESLint rule id.
 *
 * Usage:
 *   node scripts/codemods/run.js <rule-id> [--dry-run]
 *   node scripts/codemods/run.js --all          (run every registered codemod)
 *
 * Registry convention: scripts/codemods/registry/<rule-id-with-dashes>.js
 * exporting `module.exports = function run(project, { dryRun }) { ... }`
 * where `project` is a ts-morph Project already loaded with the tsconfig.
 */
const fs = require("fs");
const path = require("path");

const REGISTRY_DIR = path.join(__dirname, "registry");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const runAll = args.includes("--all");
const ruleArg = args.find((a) => !a.startsWith("--"));

function ruleToFile(ruleId) {
  return ruleId.replace(/[@/]/g, "_").replace(/:/g, "-") + ".js";
}

function loadProject() {
  // Lazy require so this script doesn't hard-fail for users who only want
  // the compile-lint.js grouping step and haven't installed ts-morph.
  let Project;
  try {
    ({ Project } = require("ts-morph"));
  } catch {
    console.error("ts-morph is not installed. Run: npm install -D ts-morph");
    process.exit(1);
  }
  const tsConfigPath = path.join(process.cwd(), "tsconfig.json");
  if (!fs.existsSync(tsConfigPath)) {
    console.error("No tsconfig.json found in cwd.");
    process.exit(1);
  }
  return new Project({ tsConfigFilePath: tsConfigPath });
}

function runOne(ruleId, project) {
  const file = path.join(REGISTRY_DIR, ruleToFile(ruleId));
  if (!fs.existsSync(file)) {
    console.log(`No codemod registered for "${ruleId}". Skipping (route to agent).`);
    return false;
  }
  console.log(`Running codemod for ${ruleId}${dryRun ? " (dry-run)" : ""}...`);
  const codemod = require(file);
  codemod(project, { dryRun });
  if (!dryRun) project.saveSync();
  return true;
}

function main() {
  if (!ruleArg && !runAll) {
    console.error("Usage: node scripts/codemods/run.js <rule-id> [--dry-run] | --all");
    process.exit(1);
  }
  const project = loadProject();

  if (runAll) {
    const files = fs.existsSync(REGISTRY_DIR) ? fs.readdirSync(REGISTRY_DIR) : [];
    for (const f of files) {
      if (f === "TEMPLATE.js" || !f.endsWith(".js")) continue;
      const codemod = require(path.join(REGISTRY_DIR, f));
      console.log(`Running ${f}${dryRun ? " (dry-run)" : ""}...`);
      codemod(project, { dryRun });
    }
    if (!dryRun) project.saveSync();
  } else {
    runOne(ruleArg, project);
  }
}

main();

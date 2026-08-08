/**
 * Codemod template. Copy this to registry/<rule-id-with-dashes>.js,
 * e.g. a fix for "@typescript-eslint/no-explicit-any" goes to
 * registry/_typescript-eslint_no-explicit-any.js
 *
 * `project` is a ts-morph Project (already loaded from tsconfig.json).
 * Do NOT call project.save() yourself — run.js handles that unless --dry-run.
 */
module.exports = function run(project, { dryRun }) {
  const sourceFiles = project.getSourceFiles();

  for (const sf of sourceFiles) {
    let changed = false;

    // Example shape — walk nodes, find the pattern this rule flags,
    // apply a mechanical fix, set changed = true if you touched the file.
    //
    // sf.forEachDescendant((node) => {
    //   if (matchesPattern(node)) {
    //     applyFix(node);
    //     changed = true;
    //   }
    // });

    if (changed && dryRun) {
      console.log(`[dry-run] would modify ${sf.getFilePath()}`);
    }
  }
};

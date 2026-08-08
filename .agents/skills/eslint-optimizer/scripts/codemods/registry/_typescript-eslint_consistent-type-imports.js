/**
 * Fixes @typescript-eslint/consistent-type-imports.
 * For each import declaration, if every named import is only ever used in a
 * type position, convert it to `import type { ... }`.
 */
const { Node } = require("ts-morph");

module.exports = function run(project, { dryRun }) {
  for (const sf of project.getSourceFiles()) {
    let changed = false;

    for (const imp of sf.getImportDeclarations()) {
      if (imp.isTypeOnly()) continue;
      const namedImports = imp.getNamedImports();
      if (namedImports.length === 0) continue;

      const allTypeOnly = namedImports.every((ni) => {
        const symbol = ni.getNameNode().getSymbol();
        if (!symbol) return false;
        const refs = ni.getNameNode().findReferencesAsNodes();
        return refs.every((ref) => {
          const parent = ref.getParent();
          return (
            Node.isTypeReference(parent) ||
            Node.isTypeQuery(parent) ||
            Node.isImportSpecifier(ref) ||
            Node.isQualifiedName(parent)
          );
        });
      });

      if (allTypeOnly) {
        if (!dryRun) imp.setIsTypeOnly(true);
        changed = true;
      }
    }

    if (changed && dryRun) {
      console.log(`[dry-run] would modify ${sf.getFilePath()}`);
    }
  }
};

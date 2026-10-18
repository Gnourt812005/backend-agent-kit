/**
 * Fixes @typescript-eslint/explicit-function-return-type for the safe,
 * unambiguous case: functions/methods with no existing return type where
 * the checker can infer a concrete (non-any, non-error) return type.
 * Anything the checker infers as `any` is left alone — route those to the
 * agent, since they need real judgement, not a mechanical insert.
 */
const { Node, SyntaxKind } = require("ts-morph");

function isCandidate(node) {
  return (
    Node.isFunctionDeclaration(node) ||
    Node.isMethodDeclaration(node) ||
    Node.isFunctionExpression(node) ||
    Node.isArrowFunction(node)
  );
}

module.exports = function run(project, { dryRun }) {
  const checker = project.getTypeChecker();

  for (const sf of project.getSourceFiles()) {
    let changed = false;

    sf.forEachDescendant((node) => {
      if (!isCandidate(node)) return;
      if (node.getReturnTypeNode()) return; // already annotated

      const sig = node.getSignature?.() ?? checker.getSignatureFromNode(node);
      if (!sig) return;

      const returnType = checker.getReturnTypeOfSignature(sig);
      const typeText = returnType.getText(node);

      if (!typeText || typeText === "any" || typeText.includes("error")) return;

      if (!dryRun) {
        node.setReturnType(typeText);
      }
      changed = true;
    });

    if (changed && dryRun) {
      console.log(`[dry-run] would modify ${sf.getFilePath()}`);
    }
  }
};

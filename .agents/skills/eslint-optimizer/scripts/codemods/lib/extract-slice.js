/**
 * Optional upgrade for compile-lint.js's extractSlice(): instead of raw
 * line-window context, return the full enclosing function/class-member text
 * via ts-morph. More accurate slices for the agent, at the cost of needing
 * ts-morph + a loaded Project (slower than plain fs.readFileSync).
 *
 * Usage from compile-lint.js:
 *   const { extractEnclosingSlice } = require("./codemods/lib/extract-slice");
 *   const project = new Project({ tsConfigFilePath: "tsconfig.json" });
 *   const slice = extractEnclosingSlice(project, filePath, line);
 */
const { Node } = require("ts-morph");

const ENCLOSING_KINDS_CHECK = (node) =>
  Node.isFunctionDeclaration(node) ||
  Node.isMethodDeclaration(node) ||
  Node.isArrowFunction(node) ||
  Node.isFunctionExpression(node) ||
  Node.isClassDeclaration(node);

function extractEnclosingSlice(project, filePath, line) {
  const sf = project.getSourceFile(filePath);
  if (!sf) return null;

  const pos = sf.compilerNode.getPositionOfLineAndCharacter(line - 1, 0);
  const node = sf.getDescendantAtPos(pos);
  if (!node) return null;

  let enclosing = node;
  while (enclosing && !ENCLOSING_KINDS_CHECK(enclosing)) {
    enclosing = enclosing.getParent();
  }

  return enclosing ? enclosing.getText() : node.getText();
}

module.exports = { extractEnclosingSlice };

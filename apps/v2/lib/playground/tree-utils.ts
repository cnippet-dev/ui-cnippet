import type { PlaygroundNode } from "./types";

/** Find a node anywhere in the tree by id */
export function findNodeById(
  tree: PlaygroundNode[],
  id: string,
): PlaygroundNode | null {
  for (const node of tree) {
    if (node.id === id) return node;
    const found = findNodeById(node.children, id);
    if (found) return found;
  }
  return null;
}

/** Find the direct parent of a node, or null if it's a root node */
export function findParentOf(
  tree: PlaygroundNode[],
  id: string,
): PlaygroundNode | null {
  for (const node of tree) {
    if (node.children.some((c) => c.id === id)) return node;
    const found = findParentOf(node.children, id);
    if (found) return found;
  }
  return null;
}

/** Return the nesting depth of a node (root nodes have depth 0) */
export function getDepth(tree: PlaygroundNode[], id: string): number {
  function search(nodes: PlaygroundNode[], depth: number): number {
    for (const node of nodes) {
      if (node.id === id) return depth;
      const found = search(node.children, depth + 1);
      if (found !== -1) return found;
    }
    return -1;
  }
  return search(tree, 0);
}

/** Return a new tree with the node removed */
export function removeFromTree(
  tree: PlaygroundNode[],
  id: string,
): PlaygroundNode[] {
  return tree
    .filter((n) => n.id !== id)
    .map((n) => ({ ...n, children: removeFromTree(n.children, id) }));
}

/** Return a new tree with the node inserted at parentId → index.
 *  parentId null = root level. */
export function insertIntoTree(
  tree: PlaygroundNode[],
  parentId: string | null,
  index: number,
  node: PlaygroundNode,
): PlaygroundNode[] {
  if (parentId === null) {
    const next = [...tree];
    next.splice(index, 0, node);
    return next;
  }
  return tree.map((n) => {
    if (n.id === parentId) {
      const next = [...n.children];
      next.splice(index, 0, node);
      return { ...n, children: next };
    }
    return {
      ...n,
      children: insertIntoTree(n.children, parentId, index, node),
    };
  });
}

/** Move a node to a new parent at a given index */
export function moveInTree(
  tree: PlaygroundNode[],
  id: string,
  newParentId: string | null,
  index: number,
): PlaygroundNode[] {
  const node = findNodeById(tree, id);
  if (!node) return tree;
  const without = removeFromTree(tree, id);
  return insertIntoTree(without, newParentId, index, node);
}

/** Flatten tree into a single array (depth-first) */
export function flattenTree(tree: PlaygroundNode[]): PlaygroundNode[] {
  return tree.flatMap((n) => [n, ...flattenTree(n.children)]);
}

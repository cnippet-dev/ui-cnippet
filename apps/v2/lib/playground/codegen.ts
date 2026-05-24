import { buildLayoutClasses } from "./layout-blocks";
import { getCatalogEntry } from "./registry-catalog";
import type { PlaygroundNode } from "./types";

/**
 * Generates a ready-to-paste TSX file from the node tree.
 *
 * Layout nodes  → <div className="flex flex-row gap-4">…</div>
 * Component nodes with catalog entry → inline JSX with configured props
 * Component nodes without catalog entry → variant file import + <VariantName />
 */
export function generateCode(tree: PlaygroundNode[]): string {
  if (tree.length === 0) return "";

  // ── Collect all imports by walking the full tree ───────────────────────
  const namedImports = new Map<string, Set<string>>();
  const defaultImports: Array<{ name: string; path: string }> = [];

  function collectImports(nodes: PlaygroundNode[]) {
    for (const node of nodes) {
      if (node.type === "component") {
        const entry = getCatalogEntry(node.registryId);
        if (entry) {
          const set = namedImports.get(entry.importPath) ?? new Set<string>();
          for (const ex of entry.namedExports) set.add(ex);
          namedImports.set(entry.importPath, set);
        } else {
          const name = toImportName(node.registryId);
          if (!defaultImports.some((d) => d.name === name)) {
            defaultImports.push({
              name,
              path: `@/registry/default/variants/${node.registryId}`,
            });
          }
        }
      }
      collectImports(node.children);
    }
  }
  collectImports(tree);

  const importLines: string[] = [];
  for (const [path, names] of namedImports) {
    importLines.push(`import { ${[...names].join(", ")} } from "${path}";`);
  }
  for (const { name, path } of defaultImports) {
    importLines.push(`import ${name} from "${path}";`);
  }

  // ── Build JSX body recursively ─────────────────────────────────────────
  function nodeToJSX(node: PlaygroundNode, depth: number): string {
    const pad = "  ".repeat(depth);

    if (node.type === "layout") {
      const classes = buildLayoutClasses(node.registryId, node.props);
      const tag = node.registryId === "container" ? "section" : "div";

      if (node.children.length === 0) {
        return `${pad}<${tag} className="${classes}" />`;
      }

      const childLines = node.children
        .map((c) => nodeToJSX(c, depth + 1))
        .join("\n");
      return [
        `${pad}<${tag} className="${classes}">`,
        childLines,
        `${pad}</${tag}>`,
      ].join("\n");
    }

    // component node
    const entry = getCatalogEntry(node.registryId);
    if (entry) {
      const jsx = entry.generateJSX(node.props);
      return jsx
        .split("\n")
        .map((line) => `${pad}${line}`)
        .join("\n");
    }

    return `${pad}<${toImportName(node.registryId)} />`;
  }

  const bodyLines = tree.map((n) => nodeToJSX(n, 3)).join("\n");

  return [
    ...importLines,
    "",
    "export default function CustomBlock() {",
    "  return (",
    '    <div className="flex flex-col gap-8">',
    bodyLines,
    "    </div>",
    "  );",
    "}",
  ].join("\n");
}

/** "v-button-1" → "VButton1" */
function toImportName(registryId: string): string {
  return registryId
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

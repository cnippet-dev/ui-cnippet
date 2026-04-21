import { readFileSync } from "node:fs";
import { join } from "node:path";

const PLACEHOLDER =
  "export default function Component() {\n  return <div>Component</div>;\n}";

export function isPlaceholderVariant(name: string): boolean {
  try {
    const filePath = join(
      process.cwd(),
      "registry/default/variants",
      `${name}.tsx`,
    );
    const source = readFileSync(filePath, "utf-8");
    return source.includes(PLACEHOLDER);
  } catch {
    return true; // file missing — treat as placeholder
  }
}

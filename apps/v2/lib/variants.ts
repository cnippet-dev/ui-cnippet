import { readFileSync } from "node:fs";
import { join } from "node:path";

// A stub renders nothing but a word, e.g. `return <div>Combobox</div>;`
const PLACEHOLDER =
  /^(?:\/\/ title: .*\n)?export default function \w+\(\) \{\s*return <div>[^<{]*<\/div>;?\s*\}\s*$/;

function isPlaceholderFile(dir: string, name: string): boolean {
  try {
    const filePath = join(process.cwd(), dir, `${name}.tsx`);
    const source = readFileSync(filePath, "utf-8").replace(/\r\n/g, "\n");
    return PLACEHOLDER.test(source.trim());
  } catch {
    return true;
  }
}

export function isPlaceholderVariant(name: string): boolean {
  return isPlaceholderFile("registry/default/variants", name);
}

export function isPlaceholderMotionVariant(name: string): boolean {
  return isPlaceholderFile("registry/default/motion-variants", name);
}

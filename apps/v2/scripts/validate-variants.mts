import { promises as fs } from "node:fs";
import path from "node:path";
import { variants } from "../registry/registry-variants.ts";

// Checks that every core variant file has exactly one registry entry with a
// real, unique title. Titles come from each file's `// title: …` first line
// (importing registry-variants.ts already throws on a missing one or a gap).

const variantsDir = path.join(process.cwd(), "registry/default/variants");

// Matches stub files that render nothing but a word, e.g. `<div>Combobox</div>`
const STUB_PATTERN =
  /^(?:\/\/ title: .*\n)?export default function \w+\(\) \{\s*return <div>[^<{]*<\/div>;?\s*\}\s*$/;

async function main() {
  const errors: string[] = [];

  const files = (await fs.readdir(variantsDir))
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.replace(/\.tsx$/, ""));
  const fileSet = new Set(files);
  const names = new Set<string>();
  const titlesByCategory = new Map<string, Map<string, string[]>>();

  for (const variant of variants) {
    const category = variant.categories?.[0] ?? "?";

    if (names.has(variant.name)) {
      errors.push(`[${category}] duplicate name ${variant.name}`);
    }
    names.add(variant.name);

    if (!fileSet.has(variant.name)) {
      errors.push(`[${category}] ${variant.name} has no file`);
    }

    const title = variant.description ?? "";
    if (!title || title === "TODO" || title === `Basic ${category}`) {
      errors.push(`[${category}] ${variant.name} has no title`);
      continue;
    }

    const seen = titlesByCategory.get(category) ?? new Map<string, string[]>();
    seen.set(title, [...(seen.get(title) ?? []), variant.name]);
    titlesByCategory.set(category, seen);
  }

  for (const [category, seen] of titlesByCategory) {
    for (const [title, owners] of seen) {
      if (owners.length > 1) {
        errors.push(`[${category}] "${title}" used by ${owners.join(", ")}`);
      }
    }
  }

  for (const file of files) {
    if (!names.has(file)) {
      errors.push(`${file}.tsx is not in the registry`);
      continue;
    }
    const content = (
      await fs.readFile(path.join(variantsDir, `${file}.tsx`), "utf-8")
    ).replace(/\r\n/g, "\n");
    if (STUB_PATTERN.test(content.trim())) {
      errors.push(`${file}.tsx is a placeholder stub`);
    }
  }

  if (errors.length > 0) {
    console.error(`✗ ${errors.length} variant problem(s):\n`);
    for (const error of errors) console.error(`  ${error}`);
    process.exit(1);
  }

  console.log(`✓ ${variants.length} variants: files, names and titles match`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

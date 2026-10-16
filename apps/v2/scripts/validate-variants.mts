import { promises as fs } from "node:fs";
import path from "node:path";
import { variants } from "../registry/registry-variants.ts";

// Checks that every core variant file has exactly one registry entry with a
// real, unique title. Titles live in a parallel `description: [...][i]` array
// per category, so a missing or extra entry silently shifts every title after
// it — this script catches that before it reaches Explore.

const variantsDir = path.join(process.cwd(), "registry/default/variants");
const registryFile = path.join(process.cwd(), "registry/registry-variants.ts");

// Matches stub files that render nothing but a word, e.g. `<div>Combobox</div>`
const STUB_PATTERN =
  /^export default function \w+\(\) \{\s*return <div>[^<{]*<\/div>;?\s*\}\s*$/;

type Block = { category: string; length: number; titles: number | null };

// Pull `Array.from({ length: N }, …)` blocks out of the registry source and
// count the entries (strings or `undefined`) in each `description: [ … ]` list.
function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  const starts = [
    ...source.matchAll(/Array\.from\(\{\s*length:\s*(\d+)\s*\}/g),
  ];

  for (const [index, match] of starts.entries()) {
    const end = starts[index + 1]?.index ?? source.length;
    const body = source.slice(match.index, end);
    const category = body.match(/category:\s*"([^"]+)"/)?.[1] ?? "?";
    const list = body.match(/description:\s*\[([\s\S]*?)\]\s*\[i\]/);
    const titles = list
      ? (
          list[1].match(
            /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`|\bundefined\b/g,
          ) ?? []
        ).length
      : null;
    blocks.push({ category, length: Number(match[1]), titles });
  }

  return blocks;
}

async function main() {
  const errors: string[] = [];
  const source = await fs.readFile(registryFile, "utf-8");

  for (const block of parseBlocks(source)) {
    if (block.titles === null) {
      errors.push(`[${block.category}] has no description list`);
    } else if (block.titles !== block.length) {
      errors.push(
        `[${block.category}] ${block.length} variants but ${block.titles} titles`,
      );
    }
  }

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
    if (!title || title === `Basic ${category}`) {
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

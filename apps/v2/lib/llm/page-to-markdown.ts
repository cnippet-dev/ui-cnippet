import { promises as fs } from "node:fs";
import path from "node:path";
import { fixImport } from "@/lib/fix-import";
import { SITE_URL } from "@/lib/llm/site";
import { registry } from "@/registry/index";

export { SITE_URL };

export type LlmPage = {
  url: string;
  data: {
    title?: string;
    description?: string;
    links?: { api?: string; doc?: string };
    getText: (type: "raw") => Promise<string>;
  };
};

export type PageToMarkdownOptions = {
  /** Which `<ComponentPreview>` examples to inline as code. */
  examples?: "all" | "first" | "none";
  /** Inline the full component source for `<ComponentSource>`. */
  source?: boolean;
};

const ATTRS = String.raw`((?:\s+[a-zA-Z]+=(?:"[^"]*"|\{[^}]*\}))*)\s*`;
const PREVIEW_RE = new RegExp(String.raw`<ComponentPreview${ATTRS}\/>`, "g");
const SOURCE_RE = new RegExp(String.raw`<ComponentSource${ATTRS}\/>`, "g");
const FENCE_RE = /^\s*(`{3,}|~{3,})/;

const registryFiles = new Map<string, string>(
  registry.items.flatMap((item) => {
    const file = item.files?.[0];
    const filePath = typeof file === "string" ? file : file?.path;
    return filePath
      ? [[item.name, path.join("registry/default", filePath)] as const]
      : [];
  }),
);

export function hasRegistryItem(name: string): boolean {
  return registryFiles.has(name);
}

const sourceCache = new Map<string, Promise<string | null>>();

/** Reads a registry item's first file with imports rewritten to `@/components/...`. */
export function getRegistrySource(name: string): Promise<string | null> {
  let cached = sourceCache.get(name);
  if (!cached) {
    const file = registryFiles.get(name);
    cached = file
      ? fs
          // Routes using this are static; skip tracing the whole project.
          .readFile(
            path.join(/* turbopackIgnore: true */ process.cwd(), file),
            "utf-8",
          )
          .then((code) => fixImport(code).trim())
          .catch(() => null)
      : Promise.resolve(null);
    sourceCache.set(name, cached);
  }
  return cached;
}

function attr(attrs: string, name: string): string | undefined {
  return attrs.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
}

function codeBlock(code: string, lang = "tsx"): string {
  const longest = Math.max(
    2,
    ...(code.match(/`+/g) ?? []).map((run) => run.length),
  );
  const fence = "`".repeat(longest + 1);
  return `${fence}${lang}\n${code}\n${fence}`;
}

function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

/** Removes top-level MDX comments (hidden on the site); JSX comments inside code are indented or inline and kept. */
function stripMdxComments(text: string): string {
  return text.replace(/^\{\/\*[\s\S]*?\*\/\}[ \t]*$/gm, "");
}

/** Splits MDX into alternating prose / fenced-code chunks so tags inside code are left alone. */
function splitFences(text: string): { code: boolean; text: string }[] {
  const chunks: { code: boolean; text: string }[] = [];
  let buffer: string[] = [];
  let fence: string | null = null;

  for (const line of text.split(/\r?\n/)) {
    const match = line.match(FENCE_RE);
    if (!fence && match) {
      chunks.push({ code: false, text: buffer.join("\n") });
      buffer = [line];
      fence = match[1] ?? null;
    } else if (fence && match && line.trim() === fence) {
      buffer.push(line);
      chunks.push({ code: true, text: buffer.join("\n") });
      buffer = [];
      fence = null;
    } else {
      buffer.push(line);
    }
  }
  chunks.push({ code: fence !== null, text: buffer.join("\n") });
  return chunks;
}

/**
 * Converts a docs page into clean, self-contained markdown for LLMs:
 * previews and sources become real code, layout-only MDX wrappers are removed.
 */
export async function pageToMarkdown(
  page: LlmPage,
  { examples = "all", source = true }: PageToMarkdownOptions = {},
): Promise<string> {
  const body = stripMdxComments(
    stripFrontmatter(await page.data.getText("raw")),
  );
  const chunks = splitFences(body);

  // Preload every registry file the page references.
  const names = new Set<string>();
  for (const chunk of chunks) {
    if (chunk.code) continue;
    for (const m of chunk.text.matchAll(PREVIEW_RE)) {
      const name = attr(m[1] ?? "", "name");
      if (name) names.add(name);
    }
    for (const m of chunk.text.matchAll(SOURCE_RE)) {
      const name = attr(m[1] ?? "", "name");
      if (name) names.add(name);
    }
  }
  const sources = new Map(
    await Promise.all(
      [...names].map(async (n) => [n, await getRegistrySource(n)] as const),
    ),
  );

  let previewIndex = 0;
  let stepIndex = 0;
  let tabLabels = new Map<string, string>();

  const converted = chunks.map((chunk) => {
    if (chunk.code) return chunk.text;

    let text = chunk.text;

    text = text.replace(PREVIEW_RE, (_, attrs: string) => {
      const name = attr(attrs, "name");
      const index = previewIndex++;
      const keep = examples === "all" || (examples === "first" && index === 0);
      const code = name ? sources.get(name) : null;
      return keep && code ? codeBlock(code) : "";
    });

    text = text.replace(SOURCE_RE, (_, attrs: string) => {
      const name = attr(attrs, "name");
      const title = attr(attrs, "title");
      const code = name ? sources.get(name) : null;
      if (!code) return "";
      if (!source) {
        return `Copy the component source${title ? ` into \`${title}\`` : ""}. Full code: ${SITE_URL}${page.url}.md`;
      }
      return `${title ? `\`${title}\`\n\n` : ""}${codeBlock(code)}`;
    });

    // Tabs: remember tab labels, turn each panel into a bold label.
    for (const m of text.matchAll(
      /<TabsTab\s+value="([^"]+)"[^>]*>([\s\S]*?)<\/TabsTab>/g,
    )) {
      tabLabels.set(m[1] ?? "", (m[2] ?? "").trim());
    }
    text = text
      .replace(/^[ \t]*<\/?CodeTabs>[ \t]*$/gm, "")
      .replace(/^[ \t]*<TabsList[^>]*>[\s\S]*?<\/TabsList>[ \t]*$/gm, "")
      .replace(/^[ \t]*<TabsPanel\s+value="([^"]+)"[^>]*>[ \t]*$/gm, (_, v) => {
        const label = tabLabels.get(v) ?? v;
        return `**${label}**`;
      })
      .replace(/^[ \t]*<\/TabsPanel>[ \t]*$/gm, "");
    if (/<\/CodeTabs>/.test(chunk.text)) tabLabels = new Map();

    // Steps: numbered, plain text.
    text = text
      .replace(/^[ \t]*<Steps>[ \t]*$/gm, () => {
        stepIndex = 0;
        return "";
      })
      .replace(/^[ \t]*<\/Steps>[ \t]*$/gm, "")
      .replace(
        /<Step>([\s\S]*?)<\/Step>/g,
        (_, content: string) => `${++stepIndex}. ${content.trim()}`,
      );

    return text;
  });

  const { title, description, links } = page.data;
  const header = [
    `# ${title ?? ""}`,
    description ? `> ${description}` : "",
    [
      `Docs: ${SITE_URL}${page.url}`,
      links?.doc ? `Base UI API reference: ${links.doc}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  ]
    .filter(Boolean)
    .join("\n\n");

  return `${header}\n\n${converted.join("\n")}`
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .concat("\n");
}

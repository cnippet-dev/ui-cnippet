import type { Node, Root } from "fumadocs-core/page-tree";
import { docSource, motionSource, source } from "@/lib/source";
import { type LlmPage, pageToMarkdown, SITE_URL } from "./page-to-markdown";

type LlmSource = {
  title: string;
  pageTree: Root;
  getPages: () => LlmPage[];
};

const llmSources: LlmSource[] = [
  {
    getPages: () => docSource.getPages(),
    pageTree: docSource.pageTree,
    title: "Docs",
  },
  {
    getPages: () => source.getPages(),
    pageTree: source.pageTree,
    title: "Components",
  },
  {
    getPages: () => motionSource.getPages(),
    pageTree: motionSource.pageTree,
    title: "Motion",
  },
];

export type LlmSection = { title: string; pages: LlmPage[] };

const INTRO = `# cnippet ui

> Copy-paste React components built on Base UI and Tailwind CSS v4, installed with the shadcn CLI. The code lives in your project, so you own it.

Notes for AI assistants:

- Built on Base UI (\`@base-ui/react\`), not Radix. Compose with the \`render\` prop, e.g. \`<Button render={<a href="/docs" />} />\`. There is no \`asChild\`.
- Install with \`npx shadcn@latest add @cnippet/<name>\`. UI components are written to \`components/ui/<name>.tsx\` and imported from \`@/components/ui/<name>\`. Motion components go to \`components/motion/<name>.tsx\`.
- Always use the \`@cnippet/\` prefix. A bare name such as \`dialog\` installs the Radix-based shadcn/ui component instead.
- Styling uses Tailwind CSS v4 and shadcn/ui-compatible CSS variables. Every part has a \`data-slot\` attribute for targeting styles.
- Every docs page is available as markdown by adding \`.md\` to its URL.
- Each component page has an "Anatomy" section (the parts and how they nest) and a "Good to know" section (correct prop names, defaults and common mistakes). Follow them over patterns from other libraries.`;

/** Strips boilerplate that repeats on every component description. */
export function cleanDescription(description = ""): string {
  return description
    .replace(/\s*Built (?:with|using) [^.]*\./g, "")
    .replace(/\s*Copy(?:-paste ready| and paste into your apps)\./g, "")
    .trim();
}

function toMarkdownUrl(url: string): string {
  return `${SITE_URL}${url}.md`;
}

/** Groups every page by sidebar folder, in sidebar order. */
export function getLlmSections(): LlmSection[] {
  const sections: LlmSection[] = [];

  for (const { title, pageTree, getPages } of llmSources) {
    const byUrl = new Map(getPages().map((page) => [page.url, page]));
    const rootPages: LlmPage[] = [];

    const walk = (nodes: Node[], section: LlmPage[], prefix: string) => {
      for (const node of nodes) {
        if (node.type === "page") {
          const page = byUrl.get(node.url);
          if (page) section.push(page);
        } else if (node.type === "folder") {
          const name = `${prefix}: ${String(node.name)}`;
          const pages: LlmPage[] = [];
          if (node.index) {
            const page = byUrl.get(node.index.url);
            if (page) pages.push(page);
          }
          sections.push({ pages, title: name });
          walk(node.children, pages, name);
        }
      }
    };

    const start = sections.length;
    walk(pageTree.children, rootPages, title);
    if (rootPages.length) {
      sections.splice(start, 0, { pages: rootPages, title });
    }
  }

  return sections.filter((section) => section.pages.length > 0);
}

export function getAllLlmPages(): LlmPage[] {
  return llmSources.flatMap((s) => s.getPages());
}

export function getLlmPage(slug: string[]): LlmPage | undefined {
  const url = `/${slug.join("/")}`;
  return getAllLlmPages().find((page) => page.url === url);
}

export function buildLlmsTxt(): string {
  const sections = getLlmSections().map(({ title, pages }) => {
    const lines = pages.map((page) => {
      const description = cleanDescription(page.data.description);
      return `- [${page.data.title}](${toMarkdownUrl(page.url)})${description ? `: ${description}` : ""}`;
    });
    return `## ${title}\n\n${lines.join("\n")}`;
  });

  return [
    INTRO,
    ...sections,
    `## Optional\n\n- [Full documentation](${SITE_URL}/llms-full.txt): Every page above in one file, with the first example for each component.`,
  ].join("\n\n");
}

export async function buildLlmsFullTxt(): Promise<string> {
  const pages = getLlmSections().flatMap((section) => section.pages);
  const bodies = await Promise.all(
    pages.map((page) =>
      pageToMarkdown(page, { examples: "first", source: false }),
    ),
  );

  return [INTRO, ...bodies].join("\n\n---\n\n");
}

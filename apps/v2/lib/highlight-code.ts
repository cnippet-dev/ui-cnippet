import { createHash } from "node:crypto";
import { codeToHtml } from "shiki";

const cache = new Map<string, string>();

export async function highlightCode(code: string, language = "tsx") {
  const key = createHash("sha256").update(`${language}:${code}`).digest("hex");

  const cached = cache.get(key);
  if (cached) return cached;

  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = "";
        },
        line(node) {
          node.properties["data-line"] = "";
        },
        pre(node) {
          node.properties.class =
            "text-[.8125rem] min-w-0 w-max px-4 py-3.5 outline-none has-data-[highlighted-line]:px-0 has-data-[line-numbers]:ps-0 !bg-transparent";
        },
      },
    ],
  });

  cache.set(key, html);
  return html;
}

import {
  codeSnippets,
  snippetLanguages,
} from "@/components/home/code-snippets";
import { ImplementationSection } from "@/components/home/implementation-section";
import { highlightCode } from "@/lib/highlight-code";

export default async function HighlightCode() {
  const highlightedSnippets: Record<string, string> = {};
  for (const [key, code] of Object.entries(codeSnippets)) {
    highlightedSnippets[key] = await highlightCode(
      code,
      snippetLanguages[key] ?? "tsx",
      { showLineNumbers: false },
    );
  }
  return <ImplementationSection highlightedSnippets={highlightedSnippets} />;
}

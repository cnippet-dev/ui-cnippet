// biome-ignore-all lint/suspicious/noTemplateCurlyInString:<>

"use client";

import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

const languages = [
  { ext: ".ts", id: "typescript", label: "TypeScript" },
  { ext: ".js", id: "javascript", label: "JavaScript" },
  { ext: ".py", id: "python", label: "Python" },
  { ext: ".rs", id: "rust", label: "Rust" },
];

const snippets: Record<string, string> = {
  javascript: "function greet(name) {\n  return `Hello, ${name}!`;\n}",
  python: `def greet(name: str) -> str:\n    return f"Hello, {name}!"`,
  rust: `fn greet(name: &str) -> String {\n    format!("Hello, {}!", name)\n}`,
  typescript:
    "function greet(name: string): string {\n  return `Hello, ${name}!`;\n}",
};

export function Pattern() {
  const [lang, setLang] = useState("typescript");

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <ToggleGroup
        onValueChange={(v) => {
          const next = v[v.length - 1];
          if (next) setLang(next);
        }}
        value={[lang]}
        variant="outline"
      >
        {languages.map((l) => (
          <ToggleGroupItem
            aria-label={`Select ${l.label}`}
            className="text-xs"
            key={l.id}
            value={l.id}
          >
            {l.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <pre className="overflow-x-auto rounded-lg border border-input bg-muted/20 p-3 font-mono text-foreground/80 text-xs leading-relaxed">
        {snippets[lang]}
      </pre>
    </div>
  );
}

//biome-ignore-all lint/suspicious/noExplicitAny: <>
"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Spinner } from "@/registry/default/ui/spinner";
import { Textarea } from "@/registry/default/ui/textarea";
import type { FC } from "react";
import type { PropSchema } from "./props-schemas";
import {
  alertSchema,
  badgeSchema,
  buttonSchema,
  inputSchema,
  kbdSchema,
  spinnerSchema,
  switchSchema,
  textareaSchema,
} from "./props-schemas";

type LiveRendererProps = { props: Record<string, unknown> };

export interface CatalogEntry {
  category: string;
  namedExports: string[];
  importPath: string;
  propsSchema: PropSchema[];
  generateJSX: (props: Record<string, unknown>) => string;
  LiveRenderer: FC<LiveRendererProps>;
}

// ── JSX serialisation helper ───────────────────────────────────────────────

function attr(props: Record<string, unknown>, exclude: string[] = []): string {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(props)) {
    if (exclude.includes(k)) continue;
    if (v === false || v === undefined || v === null) continue;
    if (v === true) parts.push(k);
    else if (typeof v === "string" && v) parts.push(`${k}="${v}"`);
    else if (typeof v === "number") parts.push(`${k}={${v}}`);
  }
  return parts.length ? ` ${parts.join(" ")}` : "";
}

// ── Catalog ────────────────────────────────────────────────────────────────

const catalog: CatalogEntry[] = [
  {
    category: "button",
    generateJSX(p) {
      const label = (p.label as string) ?? "Button";
      return `<Button${attr(p, ["label"])}>${label}</Button>`;
    },
    importPath: "@/registry/default/ui/button",
    LiveRenderer({ props: p }) {
      return (
        <Button
          disabled={(p.disabled as boolean) ?? false}
          size={(p.size as any) ?? "default"}
          variant={(p.variant as any) ?? "default"}
        >
          {(p.label as string) || "Button"}
        </Button>
      );
    },
    namedExports: ["Button"],
    propsSchema: buttonSchema,
  },

  {
    category: "badge",
    generateJSX(p) {
      const label = (p.label as string) ?? "Badge";
      return `<Badge${attr(p, ["label"])}>${label}</Badge>`;
    },
    importPath: "@/registry/default/ui/badge",
    LiveRenderer({ props: p }) {
      return (
        <Badge variant={(p.variant as any) ?? "default"}>
          {(p.label as string) || "Badge"}
        </Badge>
      );
    },
    namedExports: ["Badge"],
    propsSchema: badgeSchema,
  },

  {
    category: "input",
    generateJSX(p) {
      return `<Input${attr(p)} />`;
    },
    importPath: "@/registry/default/ui/input",
    LiveRenderer({ props: p }) {
      return (
        <Input
          aria-label="Input"
          className="w-64"
          disabled={(p.disabled as boolean) ?? false}
          placeholder={(p.placeholder as string) ?? "Enter text…"}
          type={(p.type as any) ?? "text"}
        />
      );
    },
    namedExports: ["Input"],
    propsSchema: inputSchema,
  },

  {
    category: "textarea",
    generateJSX(p) {
      return `<Textarea${attr(p, ["rows"])} rows={${(p.rows as number) ?? 3}} />`;
    },
    importPath: "@/registry/default/ui/textarea",
    LiveRenderer({ props: p }) {
      return (
        <Textarea
          aria-label="Textarea"
          className="w-64"
          disabled={(p.disabled as boolean) ?? false}
          placeholder={(p.placeholder as string) ?? "Enter text…"}
          rows={(p.rows as number) ?? 3}
        />
      );
    },
    namedExports: ["Textarea"],
    propsSchema: textareaSchema,
  },

  {
    category: "alert",
    generateJSX(p) {
      const title = (p.title as string) ?? "Heads up!";
      const desc = (p.description as string) ?? "Something you should know.";
      return [
        "<Alert>",
        `  <AlertTitle>${title}</AlertTitle>`,
        `  <AlertDescription>${desc}</AlertDescription>`,
        "</Alert>",
      ].join("\n");
    },
    importPath: "@/registry/default/ui/alert",
    LiveRenderer({ props: p }) {
      return (
        <Alert className="w-80">
          <AlertTitle>{(p.title as string) || "Heads up!"}</AlertTitle>
          <AlertDescription>
            {(p.description as string) || "Something you should know."}
          </AlertDescription>
        </Alert>
      );
    },
    namedExports: ["Alert", "AlertTitle", "AlertDescription"],
    propsSchema: alertSchema,
  },

  {
    category: "spinner",
    generateJSX(_p) {
      return "<Spinner />";
    },
    importPath: "@/components/ui/spinner",
    LiveRenderer(_p) {
      return <Spinner />;
    },
    namedExports: ["Spinner"],
    propsSchema: spinnerSchema,
  },

  {
    category: "switch",
    generateJSX(p) {
      const label = (p.label as string) ?? "Toggle";
      const extras = attr(p, ["label"]);
      return [
        `<div className="flex items-center gap-2">`,
        `  <Switch${extras} id="sw" />`,
        `  <label htmlFor="sw">${label}</label>`,
        "</div>",
      ].join("\n");
    },
    importPath: "@/registry/default/ui/switch",
    LiveRenderer({ props: p }) {
      return (
        <div className="flex items-center gap-2">
          <div className="relative inline-flex h-5 w-9 items-center rounded-full border border-gray-950/15 bg-gray-950/10 dark:border-white/15 dark:bg-white/10">
            <span
              className={`inline-block size-4 translate-x-0.5 rounded-full bg-gray-600 transition-transform dark:bg-gray-400 ${
                (p.defaultChecked as boolean)
                  ? "translate-x-4 bg-gray-950 dark:bg-white"
                  : ""
              }`}
            />
          </div>
          <span className="font-mono text-gray-950/70 text-sm dark:text-white/60">
            {(p.label as string) || "Toggle"}
          </span>
        </div>
      );
    },
    namedExports: ["Switch"],
    propsSchema: switchSchema,
  },

  {
    category: "kbd",
    generateJSX(p) {
      const label = (p.label as string) ?? "⌘K";
      return `<Kbd>${label}</Kbd>`;
    },
    importPath: "@/registry/default/ui/kbd",
    LiveRenderer({ props: p }) {
      return (
        <kbd className="inline-flex items-center rounded border border-gray-950/15 bg-gray-950/5 px-1.5 py-0.5 font-mono text-gray-950/70 text-xs dark:border-white/15 dark:bg-white/8 dark:text-white/60">
          {(p.label as string) || "⌘K"}
        </kbd>
      );
    },
    namedExports: ["Kbd"],
    propsSchema: kbdSchema,
  },
];

// ── Lookup helpers ─────────────────────────────────────────────────────────

/** "v-button-3" → "button", "v-input-group-2" → "input-group" */
export function getCategoryFromRegistryId(registryId: string): string {
  return registryId.replace(/^v-/, "").replace(/-\d+$/, "");
}

export function getCatalogEntry(registryId: string): CatalogEntry | undefined {
  const category = getCategoryFromRegistryId(registryId);
  return catalog.find((e) => e.category === category);
}

/** Returns the full import + JSX snippet for the code panel. */
export function generateSnippet(
  entry: CatalogEntry,
  props: Record<string, unknown>,
): string {
  const jsx = entry.generateJSX(props);
  if (!entry.importPath) return jsx;
  return `import { ${entry.namedExports.join(", ")} } from "${entry.importPath}";\n\n${jsx}`;
}

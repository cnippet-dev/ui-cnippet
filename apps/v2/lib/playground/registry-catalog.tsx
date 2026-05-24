//biome-ignore-all lint/suspicious/noExplicitAny: <>
"use client";

/**
 * Maps component categories to their live renderers, prop schemas, and code
 * generation logic.
 *
 * Category is derived from registryId by stripping the "v-" prefix and the
 * trailing "-{number}", e.g. "v-button-3" → "button".
 */

import type React from "react";
import type { FC } from "react";
import { cn } from "@/lib/utils";
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
import type { PropSchema } from "./props-schemas";
import {
  alertSchema,
  badgeSchema,
  buttonSchema,
  headingSchema,
  inputSchema,
  kbdSchema,
  spinnerSchema,
  switchSchema,
  textareaSchema,
  textSchema,
} from "./props-schemas";

type LiveRendererProps = { props: Record<string, unknown> };

export interface CatalogEntry {
  category: string;
  /** Named exports required for the import statement in generated code */
  namedExports: string[];
  importPath: string;
  propsSchema: PropSchema[];
  /** Generates the JSX snippet for the code panel */
  generateJSX: (props: Record<string, unknown>) => string;
  /** React component that renders the live preview with current props */
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

// ── Catalog entries ────────────────────────────────────────────────────────

const catalog: CatalogEntry[] = [
  // ── Button ────────────────────────────────────────────────────────────────
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          size={(p.size as any) ?? "default"}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          variant={(p.variant as any) ?? "default"}
        >
          {(p.label as string) || "Button"}
        </Button>
      );
    },
    namedExports: ["Button"],
    propsSchema: buttonSchema,
  },

  // ── Badge ─────────────────────────────────────────────────────────────────
  {
    category: "badge",
    generateJSX(p) {
      const label = (p.label as string) ?? "Badge";
      return `<Badge${attr(p, ["label"])}>${label}</Badge>`;
    },
    importPath: "@/registry/default/ui/badge",
    LiveRenderer({ props: p }) {
      return (
        <Badge
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          variant={(p.variant as any) ?? "default"}
        >
          {(p.label as string) || "Badge"}
        </Badge>
      );
    },
    namedExports: ["Badge"],
    propsSchema: badgeSchema,
  },

  // ── Input ─────────────────────────────────────────────────────────────────
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type={(p.type as any) ?? "text"}
        />
      );
    },
    namedExports: ["Input"],
    propsSchema: inputSchema,
  },

  // ── Textarea ──────────────────────────────────────────────────────────────
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

  // ── Alert ─────────────────────────────────────────────────────────────────
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

  // ── Spinner ───────────────────────────────────────────────────────────────
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

  // ── Switch ────────────────────────────────────────────────────────────────
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
      // Render a fallback visual for Switch (avoid importing the full Switch component)
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
    namedExports: ["Switch", "SwitchThumb"],
    propsSchema: switchSchema,
  },

  // ── Kbd ───────────────────────────────────────────────────────────────────
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

  // ── Heading ───────────────────────────────────────────────────────────────
  {
    category: "heading",
    generateJSX(p) {
      const tag = (p.as as string) || "h2";
      const classes = [
        (p.size as string) || "text-3xl",
        (p.weight as string) || "font-bold",
        (p.tracking as string) || "tracking-tight",
        (p.leading as string) || "leading-tight",
        p.align && p.align !== "text-left" ? (p.align as string) : "",
        p.color as string,
      ]
        .filter(Boolean)
        .join(" ");
      return `<${tag} className="${classes}">${(p.text as string) || "Heading"}</${tag}>`;
    },
    importPath: "",
    LiveRenderer({ props: p }) {
      const Tag = ((p.as as string) || "h2") as React.ElementType;
      const classes = cn(
        (p.size as string) || "text-3xl",
        (p.weight as string) || "font-bold",
        (p.tracking as string) || "tracking-tight",
        (p.leading as string) || "leading-tight",
        p.align as string,
        p.color as string,
      );
      return <Tag className={classes}>{(p.text as string) || "Heading"}</Tag>;
    },
    namedExports: [],
    propsSchema: headingSchema,
  },

  // ── Text ─────────────────────────────────────────────────────────────────
  {
    category: "text",
    generateJSX(p) {
      const classes = [
        (p.size as string) || "text-base",
        (p.weight as string) || "font-normal",
        (p.tracking as string) || "tracking-normal",
        (p.leading as string) || "leading-relaxed",
        p.align && p.align !== "text-left" ? (p.align as string) : "",
        (p.color as string) || "text-muted-foreground",
      ]
        .filter(Boolean)
        .join(" ");
      return `<p className="${classes}">${(p.text as string) || "Body paragraph text."}</p>`;
    },
    importPath: "",
    LiveRenderer({ props: p }) {
      const classes = cn(
        (p.size as string) || "text-base",
        (p.weight as string) || "font-normal",
        (p.tracking as string) || "tracking-normal",
        (p.leading as string) || "leading-relaxed",
        p.align as string,
        (p.color as string) || "text-muted-foreground",
      );
      return (
        <p className={classes}>
          {(p.text as string) || "Body paragraph text."}
        </p>
      );
    },
    namedExports: [],
    propsSchema: textSchema,
  },
];

// ── Lookup helpers ─────────────────────────────────────────────────────────

/** "v-button-3" → "button", "v-input-group-2" → "input-group" */
export function getCategoryFromRegistryId(registryId: string): string {
  // Strip "v-" prefix, then strip trailing "-{digits}"
  return registryId.replace(/^v-/, "").replace(/-\d+$/, "");
}

export function getCatalogEntry(registryId: string): CatalogEntry | undefined {
  const category = getCategoryFromRegistryId(registryId);
  return catalog.find((e) => e.category === category);
}

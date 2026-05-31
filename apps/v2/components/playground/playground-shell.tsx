"use client";

import { RiCheckLine, RiClipboardLine, RiTerminalLine } from "@remixicon/react";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { getVariantSource } from "@/app/playground/actions";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { InspectCanvas } from "./canvas";
import { CodePanel } from "./code-panel";
import { ComponentBrowser } from "./component-browser";
import { PropsPanel } from "./props-panel";
import {
  PREVIEW_WIDTHS,
  type PreviewWidth,
  ResponsivePreview,
} from "./responsive-preview";

export function PlaygroundShell() {
  const [component, setComponent] = useQueryState(
    "component",
    parseAsString.withDefault(""),
  );
  const [variant, setVariant] = useQueryState(
    "variant",
    parseAsString.withDefault(""),
  );

  const [previewWidth, setPreviewWidth] = useState<PreviewWidth>("desktop");
  const [mode, setMode] = useState<"preview" | "customize">("preview");
  const [inspectSource, setInspectSource] = useState("");
  const { isCopied: isCodeCopied, copyToClipboard: copyCode } =
    useCopyToClipboard();
  const { isCopied: isCliCopied, copyToClipboard: copyCli } =
    useCopyToClipboard();

  useEffect(() => {
    if (!variant) {
      setInspectSource("");
      return;
    }
    getVariantSource(variant).then(setInspectSource);
  }, [variant]);

  useEffect(() => {
    if (!component && !variant) {
      setComponent("button");
      setVariant("v-button-1");
    }
  }, [component, variant, setComponent, setVariant]);

  const isPlaceholder =
    !!inspectSource && inspectSource.includes("return <div>Component</div>");
  const codePanelLabel = variant ? `${variant}.tsx` : "";
  const cliCommand = variant ? `npx cnippet add ${variant}` : "";

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="flex h-11 shrink-0 items-center justify-between border-gray-950/8 border-b px-4 dark:border-white/10">
        <div className="flex items-center gap-3">
          <Link
            className="font-mono text-gray-950/50 text-xs transition-colors hover:text-gray-950 dark:text-white/40 dark:hover:text-white"
            href="/"
          >
            cnippet
          </Link>
          <span className="text-gray-950/20 dark:text-white/15">/</span>
          <span className="font-mono text-gray-950/50 text-xs dark:text-white/40">
            playground
          </span>
          <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 font-mono text-[10px] text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
            beta
          </span>
          {variant && (
            <>
              <span className="text-gray-950/20 dark:text-white/15">/</span>
              <span className="font-mono text-gray-950/50 text-xs dark:text-white/40">
                {variant}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center overflow-hidden rounded-md border border-gray-950/10 dark:border-white/10">
            <button
              className={
                mode === "preview"
                  ? "bg-gray-950/8 px-2.5 py-1 font-mono text-[11px] text-gray-950/80 dark:bg-white/10 dark:text-white/70"
                  : "px-2.5 py-1 font-mono text-[11px] text-gray-950/40 transition-colors hover:text-gray-950/70 dark:text-white/30 dark:hover:text-white/60"
              }
              onClick={() => setMode("preview")}
              type="button"
            >
              Preview
            </button>
            <span className="h-4 w-px bg-gray-950/10 dark:bg-white/10" />
            <button
              className={
                mode === "customize"
                  ? "bg-gray-950/8 px-2.5 py-1 font-mono text-[11px] text-gray-950/80 dark:bg-white/10 dark:text-white/70"
                  : "px-2.5 py-1 font-mono text-[11px] text-gray-950/40 transition-colors hover:text-gray-950/70 dark:text-white/30 dark:hover:text-white/60"
              }
              onClick={() => setMode("customize")}
              type="button"
            >
              Customize
            </button>
          </div>
          <span className="mx-1 h-4 w-px bg-gray-950/10 dark:bg-white/10" />
          <ResponsivePreview onChange={setPreviewWidth} value={previewWidth} />
          <span className="mx-1 h-4 w-px bg-gray-950/10 dark:bg-white/10" />

          {cliCommand && !isPlaceholder && (
            <button
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] text-gray-950/50 transition-colors hover:bg-gray-950/5 hover:text-gray-950/80 dark:text-white/40 dark:hover:bg-white/8 dark:hover:text-white/70"
              onClick={() => copyCli(cliCommand)}
              title={cliCommand}
              type="button"
            >
              {isCliCopied ? (
                <RiCheckLine className="size-3.5" />
              ) : (
                <RiTerminalLine className="size-3.5" />
              )}
              {isCliCopied ? "Copied!" : "Copy CLI"}
            </button>
          )}

          {inspectSource && (
            <button
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] text-gray-950/50 transition-colors hover:bg-gray-950/5 hover:text-gray-950/80 dark:text-white/40 dark:hover:bg-white/8 dark:hover:text-white/70"
              onClick={() => copyCode(inspectSource)}
              type="button"
            >
              {isCodeCopied ? (
                <RiCheckLine className="size-3.5" />
              ) : (
                <RiClipboardLine className="size-3.5" />
              )}
              {isCodeCopied ? "Copied!" : "Copy code"}
            </button>
          )}
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1">
        <aside className="w-60 shrink-0 overflow-hidden">
          <ComponentBrowser
            selectedComponent={component}
            selectedVariant={variant}
          />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <InspectCanvas
            isPlaceholder={isPlaceholder}
            mode={mode}
            previewWidth={PREVIEW_WIDTHS[previewWidth]}
            variantKey={variant}
          />
          <CodePanel
            label={codePanelLabel}
            source={isPlaceholder ? "" : inspectSource}
          />
        </div>

        <aside className="w-64 shrink-0 overflow-hidden">
          <PropsPanel variantKey={variant ?? ""} />
        </aside>
      </div>
    </div>
  );
}

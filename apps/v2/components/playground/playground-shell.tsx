"use client";

import { RiCheckLine, RiClipboardLine, RiTerminalLine } from "@remixicon/react";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { getVariantSource } from "@/app/playground/actions";
import { Logo } from "@/components/ui/logo";
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
      <header className="flex h-12 shrink-0 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link
            className="flex items-center gap-2 font-semibold text-[14px] text-foreground tracking-[-0.03em]"
            href="/"
          >
            <Logo className="size-4.5" />
            cnippet
          </Link>
          <span className="text-faint">/</span>
          <span className="font-mono text-muted-foreground text-xs">
            playground
          </span>
          <span className="rounded-full bg-signal-soft px-1.5 py-0.5 font-mono text-[10px] text-signal">
            beta
          </span>
          {variant && (
            <>
              <span className="text-faint">/</span>
              <span className="font-mono text-muted-foreground text-xs">
                {variant}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center overflow-hidden rounded-md border border-border">
            <button
              className={
                mode === "preview"
                  ? "bg-muted px-2.5 py-1 font-mono text-[11px] text-foreground/80"
                  : "px-2.5 py-1 font-mono text-[11px] text-faint transition-colors hover:text-foreground"
              }
              onClick={() => setMode("preview")}
              type="button"
            >
              Preview
            </button>
            <span className="h-4 w-px bg-border" />
            <button
              className={
                mode === "customize"
                  ? "bg-muted px-2.5 py-1 font-mono text-[11px] text-foreground/80"
                  : "px-2.5 py-1 font-mono text-[11px] text-faint transition-colors hover:text-foreground"
              }
              onClick={() => setMode("customize")}
              type="button"
            >
              Customize
            </button>
          </div>
          <span className="mx-1 h-4 w-px bg-border" />
          <ResponsivePreview onChange={setPreviewWidth} value={previewWidth} />
          <span className="mx-1 h-4 w-px bg-border" />

          {cliCommand && !isPlaceholder && (
            <button
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
      <div className="flex min-h-0 flex-1 gap-2 px-2 pb-2">
        <aside className="w-60 shrink-0 overflow-hidden">
          <ComponentBrowser
            selectedComponent={component}
            selectedVariant={variant}
          />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-canvas bg-background shadow-canvas">
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

"use client";

import {
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiCheckLine,
  RiClipboardLine,
  RiTerminalLine,
} from "@remixicon/react";
import Link from "next/link";
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { getVariantSource } from "@/app/playground/actions";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { usePlaygroundStore } from "@/lib/playground/store";
import { flattenTree } from "@/lib/playground/tree-utils";
import type { PlaygroundMode } from "@/lib/playground/types";
import { compressTree, decompressTree } from "@/lib/playground/url-state";
import { BuildDndContext } from "./build-dnd-context";
import { BuildCanvas, InspectCanvas } from "./canvas";
import { CodePanel } from "./code-panel";
import { ComponentBrowser } from "./component-browser";
import { ExportMenu } from "./export-menu";
import { ModeToggle } from "./mode-toggle";
import { PropsPanel } from "./props-panel";
import {
  PREVIEW_WIDTHS,
  type PreviewWidth,
  ResponsivePreview,
} from "./responsive-preview";

const MODES = ["inspect", "build"] as const;

export function PlaygroundShell() {
  // ── URL state ─────────────────────────────────────────────────────────────
  const [mode, setMode] = useQueryState(
    "mode",
    parseAsStringLiteral(MODES).withDefault("inspect"),
  );
  const [component, setComponent] = useQueryState(
    "component",
    parseAsString.withDefault(""),
  );
  const [variant, setVariant] = useQueryState(
    "variant",
    parseAsString.withDefault(""),
  );
  const [stateParam, setStateParam] = useQueryState(
    "state",
    parseAsString.withDefault(""),
  );

  // ── Store ─────────────────────────────────────────────────────────────────
  const storeMode = usePlaygroundStore((s) => s.mode);
  const tree = usePlaygroundStore((s) => s.tree);
  const codeOutput = usePlaygroundStore((s) => s.codeOutput);
  const undoStack = usePlaygroundStore((s) => s.undoStack);
  const redoStack = usePlaygroundStore((s) => s.redoStack);
  const selectedId = usePlaygroundStore((s) => s.selectedId);
  const setStoreMode = usePlaygroundStore((s) => s.setMode);
  const setTree = usePlaygroundStore((s) => s.setTree);
  const undo = usePlaygroundStore((s) => s.undo);
  const redo = usePlaygroundStore((s) => s.redo);
  const removeNode = usePlaygroundStore((s) => s.removeNode);
  const duplicateNode = usePlaygroundStore((s) => s.duplicateNode);
  const selectNode = usePlaygroundStore((s) => s.selectNode);

  // ── Responsive preview state ──────────────────────────────────────────────
  const [previewWidth, setPreviewWidth] = useState<PreviewWidth>("desktop");

  // ── Inspect source ────────────────────────────────────────────────────────
  const [inspectSource, setInspectSource] = useState("");
  const { isCopied: isCodeCopied, copyToClipboard: copyCode } =
    useCopyToClipboard();
  const { isCopied: isCliCopied, copyToClipboard: copyCli } =
    useCopyToClipboard();

  // ── Hydration: URL → store (once on mount) ────────────────────────────────
  const hydrated = useRef(false);
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    // Sync mode from URL to store
    setStoreMode(mode as PlaygroundMode);

    // Hydrate build tree from URL
    if (mode === "build" && stateParam) {
      const parsed = decompressTree(stateParam);
      if (parsed) setTree(parsed);
    }
  }, [
    stateParam,
    setTree, // Sync mode from URL to store
    setStoreMode,
    mode,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Store → URL sync (debounced, Build mode only) ─────────────────────────
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (storeMode !== "build") return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      const compressed = tree.length > 0 ? compressTree(tree) : "";
      setStateParam(compressed || null);
    }, 500);
    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, [tree, storeMode, setStateParam]);

  // ── Mode change ───────────────────────────────────────────────────────────
  function handleModeChange(m: PlaygroundMode) {
    setMode(m);
    setStoreMode(m);
  }

  // ── Inspect variant source ────────────────────────────────────────────────
  useEffect(() => {
    if (mode !== "inspect" || !variant) {
      setInspectSource("");
      return;
    }
    getVariantSource(variant).then(setInspectSource);
  }, [variant, mode]);

  // ── Default selection (Inspect mode, nothing in URL) ──────────────────────
  useEffect(() => {
    if (mode === "inspect" && !component && !variant) {
      setComponent("button");
      setVariant("v-button-1");
    }
  }, [mode, component, variant, setComponent, setVariant]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const ctrl = e.ctrlKey || e.metaKey;
      const tag = (e.target as HTMLElement).tagName;
      const isInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if (ctrl) {
        if (e.key === "z" && !e.shiftKey) {
          e.preventDefault();
          undo();
        } else if ((e.key === "z" && e.shiftKey) || e.key === "y") {
          e.preventDefault();
          redo();
        } else if (e.key === "d" && selectedId) {
          e.preventDefault();
          duplicateNode(selectedId);
        }
      } else if (!isInput) {
        if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
          e.preventDefault();
          removeNode(selectedId);
        } else if (e.key === "Escape" && selectedId) {
          e.preventDefault();
          selectNode(null);
        }
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [undo, redo, selectedId, removeNode, duplicateNode, selectNode]);

  // ── Derived ───────────────────────────────────────────────────────────────
  const isBuild = mode === "build";
  const cliCommand = !isBuild && variant ? `npx cnippet add ${variant}` : "";
  const codePanelSource = isBuild ? codeOutput : inspectSource;
  const codePanelLabel = isBuild
    ? "CustomBlock.tsx"
    : variant
      ? `${variant}.tsx`
      : "";
  const variantIds = isBuild
    ? flattenTree(tree)
        .filter((n) => n.type === "component")
        .map((n) => n.registryId)
    : [];

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="flex h-11 shrink-0 items-center justify-between border-gray-950/8 border-b px-4 dark:border-white/10">
        {/* Left — breadcrumb + mode toggle */}
        <div className="flex items-center gap-3">
          <Link
            className="font-mono text-gray-950/50 text-xs transition-colors hover:text-gray-950 dark:text-white/40 dark:hover:text-white"
            href="/"
          >
            cnippet
          </Link>
          <span className="text-gray-950/20 dark:text-white/15">/</span>
          <ModeToggle
            mode={mode as PlaygroundMode}
            onChange={handleModeChange}
          />
          {!isBuild && variant && (
            <>
              <span className="text-gray-950/20 dark:text-white/15">/</span>
              <span className="font-mono text-gray-950/50 text-xs dark:text-white/40">
                {variant}
              </span>
            </>
          )}
          {isBuild && tree.length > 0 && (
            <>
              <span className="text-gray-950/20 dark:text-white/15">/</span>
              <span className="font-mono text-gray-950/50 text-xs dark:text-white/40">
                {tree.length} {tree.length === 1 ? "component" : "components"}
              </span>
            </>
          )}
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-1">
          {/* Undo / Redo (Build mode only) */}
          {isBuild && (
            <>
              <button
                className="flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[11px] text-gray-950/40 transition-colors hover:bg-gray-950/5 hover:text-gray-950/70 disabled:opacity-30 dark:text-white/30 dark:hover:bg-white/8 dark:hover:text-white/60"
                disabled={undoStack.length === 0}
                onClick={undo}
                title="Undo (Cmd+Z)"
                type="button"
              >
                <RiArrowGoBackLine className="size-3.5" />
              </button>
              <button
                className="flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[11px] text-gray-950/40 transition-colors hover:bg-gray-950/5 hover:text-gray-950/70 disabled:opacity-30 dark:text-white/30 dark:hover:bg-white/8 dark:hover:text-white/60"
                disabled={redoStack.length === 0}
                onClick={redo}
                title="Redo (Cmd+Shift+Z)"
                type="button"
              >
                <RiArrowGoForwardLine className="size-3.5" />
              </button>
              <span className="mx-1 h-4 w-px bg-gray-950/10 dark:bg-white/10" />
            </>
          )}

          {/* Responsive preview toggle */}
          <ResponsivePreview onChange={setPreviewWidth} value={previewWidth} />
          <span className="mx-1 h-4 w-px bg-gray-950/10 dark:bg-white/10" />

          {/* Copy CLI (Inspect mode) */}
          {cliCommand && (
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

          {/* Copy code (Inspect mode) */}
          {!isBuild && codePanelSource && (
            <button
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] text-gray-950/50 transition-colors hover:bg-gray-950/5 hover:text-gray-950/80 dark:text-white/40 dark:hover:bg-white/8 dark:hover:text-white/70"
              onClick={() => copyCode(codePanelSource)}
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

          {/* Export menu (Build mode) */}
          {isBuild && (
            <ExportMenu codeOutput={codeOutput} variantIds={variantIds} />
          )}
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      {isBuild ? (
        // Build mode — wrap everything in the DnD context so sidebar items
        // can be dragged onto the canvas
        <BuildDndContext>
          <div className="flex min-h-0 flex-1">
            <aside className="w-60 shrink-0 overflow-hidden">
              <ComponentBrowser
                mode="build"
                selectedComponent={component}
                selectedVariant={variant}
              />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
              <BuildCanvas previewWidth={PREVIEW_WIDTHS[previewWidth]} />
              <CodePanel label={codePanelLabel} source={codePanelSource} />
            </div>

            <aside className="w-64 shrink-0 overflow-hidden">
              <PropsPanel />
            </aside>
          </div>
        </BuildDndContext>
      ) : (
        // Inspect mode — no DnD needed
        <div className="flex min-h-0 flex-1">
          <aside className="w-60 shrink-0 overflow-hidden">
            <ComponentBrowser
              mode="inspect"
              selectedComponent={component}
              selectedVariant={variant}
            />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <InspectCanvas
              previewWidth={PREVIEW_WIDTHS[previewWidth]}
              variantKey={variant}
            />
            <CodePanel label={codePanelLabel} source={codePanelSource} />
          </div>
        </div>
      )}
    </div>
  );
}

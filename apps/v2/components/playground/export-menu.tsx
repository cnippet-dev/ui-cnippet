"use client";

import {
  RiCheckLine,
  RiCodeSSlashLine,
  RiDownloadLine,
  RiTerminalLine,
} from "@remixicon/react";
import { useState } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface ExportMenuProps {
  codeOutput: string;
  /** All variant registry IDs in the current tree, for install commands */
  variantIds: string[];
}

export function ExportMenu({ codeOutput, variantIds }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const { isCopied: isJsxCopied, copyToClipboard: copyJsx } =
    useCopyToClipboard();
  const { isCopied: isCliCopied, copyToClipboard: copyCli } =
    useCopyToClipboard();

  const installCommand =
    variantIds.length > 0
      ? `npx cnippet add ${[...new Set(variantIds)].join(" ")}`
      : "";

  function downloadFile() {
    const blob = new Blob([codeOutput], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CustomBlock.tsx";
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  }

  if (!codeOutput) return null;

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] text-gray-950/50 transition-colors hover:bg-gray-950/5 hover:text-gray-950/80 dark:text-white/40 dark:hover:bg-white/8 dark:hover:text-white/70"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <RiCodeSSlashLine className="size-3.5" />
        Export
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          {/* Dropdown */}
          <div className="absolute top-full right-0 z-20 mt-1 w-52 rounded-xl border border-gray-950/8 bg-white py-1 shadow-md dark:border-white/10 dark:bg-neutral-900">
            <button
              className="flex w-full items-center gap-2.5 px-3 py-2 font-mono text-[11px] text-gray-950/70 transition-colors hover:bg-gray-950/5 dark:text-white/60 dark:hover:bg-white/5"
              onClick={() => {
                copyJsx(codeOutput);
                setOpen(false);
              }}
              type="button"
            >
              {isJsxCopied ? (
                <RiCheckLine className="size-3.5 text-green-500" />
              ) : (
                <RiCodeSSlashLine className="size-3.5" />
              )}
              {isJsxCopied ? "Copied!" : "Copy JSX"}
            </button>

            <button
              className="flex w-full items-center gap-2.5 px-3 py-2 font-mono text-[11px] text-gray-950/70 transition-colors hover:bg-gray-950/5 dark:text-white/60 dark:hover:bg-white/5"
              onClick={downloadFile}
              type="button"
            >
              <RiDownloadLine className="size-3.5" />
              Download .tsx
            </button>

            {installCommand && (
              <>
                <div className="my-1 h-px bg-gray-950/6 dark:bg-white/8" />
                <button
                  className="flex w-full items-center gap-2.5 px-3 py-2 font-mono text-[11px] text-gray-950/70 transition-colors hover:bg-gray-950/5 dark:text-white/60 dark:hover:bg-white/5"
                  onClick={() => {
                    copyCli(installCommand);
                    setOpen(false);
                  }}
                  type="button"
                >
                  {isCliCopied ? (
                    <RiCheckLine className="size-3.5 text-green-500" />
                  ) : (
                    <RiTerminalLine className="size-3.5" />
                  )}
                  {isCliCopied ? "Copied!" : "Copy install cmd"}
                </button>
                <p className="px-3 pb-2 font-mono text-[10px] text-gray-950/25 dark:text-white/20">
                  {installCommand.length > 42
                    ? `${installCommand.slice(0, 42)}…`
                    : installCommand}
                </p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

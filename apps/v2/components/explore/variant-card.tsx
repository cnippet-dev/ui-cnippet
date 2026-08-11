"use client";

import { useCopyToClipboard } from "@cnippet/ui/hooks/use-copy-to-clipboard";
import { CheckIcon, CopyIcon, RotateCcwIcon } from "lucide-react";
import * as React from "react";
import { getVariantSource } from "@/lib/get-variant-source";
import { cn } from "@/lib/utils";
import { Index } from "@/registry/__index__";
import { Button } from "@/registry/default/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetPanel,
  SheetTitle,
} from "@/registry/default/ui/sheet";

interface VariantCardProps {
  name: string;
  description: string;
  category: string;
  reloadable?: boolean;
}

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

function installCommand(pm: PackageManager, name: string): string {
  const pkg = `@cnippet/${name}`;
  if (pm === "pnpm") return `pnpm dlx shadcn@latest add ${pkg}`;
  if (pm === "yarn") return `yarn dlx shadcn@latest add ${pkg}`;
  if (pm === "bun") return `bunx --bun shadcn@latest add ${pkg}`;
  return `npx shadcn@latest add ${pkg}`;
}

function CopyRawButton({ raw }: { raw: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <Button
      aria-label="Copy code"
      className={cn(
        "absolute top-2 right-2 z-10 size-7 opacity-0 transition-opacity group-hover:opacity-100",
        isCopied && "text-green-600 opacity-100 dark:text-green-400",
      )}
      onClick={() => copyToClipboard(raw)}
      size="icon-sm"
      variant="ghost"
    >
      {isCopied ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
    </Button>
  );
}

function CodeBlock({
  html,
  raw,
  className,
}: {
  html: string;
  raw: string;
  className?: string;
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-(--color-code) dark:border-none",
        className,
      )}
    >
      <Button
        aria-label="Copy code"
        className={cn(
          "absolute top-2 right-2 z-10 size-7 opacity-0 transition-opacity group-hover:opacity-100",
          isCopied && "text-green-400 opacity-100",
        )}
        onClick={() => copyToClipboard(raw)}
        size="icon-sm"
        variant="ghost"
      >
        {isCopied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </Button>
      <div
        className="overflow-auto text-[.8125rem] [&_pre]:bg-transparent! [&_pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function InlineCommand({ command }: { command: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <div className="group flex items-center justify-between gap-3 rounded-[2px] border border-dashed bg-muted/40 px-4 py-3">
      <code className="select-all font-mono text-[.8125rem] text-foreground/80">
        {command}
      </code>
      <Button
        aria-label="Copy command"
        className={cn(
          "size-7 shrink-0 text-muted-foreground transition-colors hover:text-foreground",
          isCopied && "text-cnippet-green",
        )}
        onClick={() => copyToClipboard(command)}
        size="icon-sm"
        variant="ghost"
      >
        {isCopied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </Button>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      <div className="h-3 w-24 animate-pulse rounded bg-muted" />
      <div className="h-10 animate-pulse rounded-lg bg-muted" />
      <div className="mt-6 h-3 w-16 animate-pulse rounded bg-muted" />
      <div className="h-64 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}

export function VariantCard({
  name,
  description,
  reloadable,
}: VariantCardProps) {
  const [visible, setVisible] = React.useState(false);
  const [reloadKey, setReloadKey] = React.useState(0);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [code, setCode] = React.useState<string | null>(null);
  const [highlightedHtml, setHighlightedHtml] = React.useState<string | null>(
    null,
  );
  const [loadingCode, setLoadingCode] = React.useState(false);
  const [pm, setPm] = React.useState<PackageManager>("npm");
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = visible ? (Index[name]?.component ?? null) : null;

  async function loadCode() {
    if (code !== null) return;
    setLoadingCode(true);
    try {
      const data = await getVariantSource(name);
      setCode(data.code ?? "");
      setHighlightedHtml(data.html ?? null);
    } catch {
      setCode("");
    } finally {
      setLoadingCode(false);
    }
  }

  function handleViewCode() {
    setSheetOpen(true);
    loadCode();
  }

  async function handleCopy() {
    if (code !== null) {
      copyToClipboard(code);
      return;
    }
    setLoadingCode(true);
    try {
      const data = await getVariantSource(name);
      const src = data.code ?? "";
      setCode(src);
      setHighlightedHtml(data.html ?? null);
      copyToClipboard(src);
    } finally {
      setLoadingCode(false);
    }
  }

  const PMS: PackageManager[] = ["npm", "bun", "pnpm", "yarn"];

  return (
    <>
      <div
        className="flex flex-col overflow-hidden rounded-[2px] border border-dashed bg-background transition-colors hover:border-cnippet-blue/40"
        ref={cardRef}
      >
        {/* Preview area */}
        <div className="relative flex min-h-80 flex-1 items-center justify-center overflow-hidden p-6">
          {!visible ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
          ) : Component ? (
            <React.Suspense
              fallback={
                <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
              }
              key={reloadKey}
            >
              <Component />
            </React.Suspense>
          ) : (
            <p className="font-mono text-muted-foreground text-xs">
              No preview
            </p>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-2 border-t border-dashed px-4 py-2.5">
          <span className="font-mono text-[11px] text-muted-foreground capitalize tracking-tight">
            {description || name.replace("v-", "")}
          </span>
          <div className="flex items-center gap-1">
            {reloadable && (
              <Button
                aria-label="Reload preview"
                className="size-7 text-muted-foreground hover:text-foreground"
                onClick={() => setReloadKey((k) => k + 1)}
                size="icon-sm"
                variant="ghost"
              >
                <RotateCcwIcon className="size-3.5" />
              </Button>
            )}
            <Button
              aria-label="Copy source code"
              className={cn(
                "size-7 text-muted-foreground hover:text-foreground",
                isCopied && "text-cnippet-green",
              )}
              onClick={handleCopy}
              size="icon-sm"
              variant="ghost"
            >
              <CopyIcon className="size-3.5" />
            </Button>
            <Button
              className="h-7 rounded-[2px] px-3 py-4 font-mono text-xs"
              onClick={handleViewCode}
              size="xs"
              variant="outline"
            >
              View code
            </Button>
          </div>
        </div>
      </div>

      <Sheet onOpenChange={setSheetOpen} open={sheetOpen}>
        <SheetContent className="w-full max-w-2xl" side="right">
          <SheetHeader>
            <SheetTitle className="font-mono text-base">{name}</SheetTitle>
          </SheetHeader>
          <SheetPanel>
            {loadingCode && code === null ? (
              <Skeleton />
            ) : (
              <div className="space-y-6">
                {/* Installation */}
                <div className="space-y-2">
                  <p className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
                    Installation
                  </p>
                  {/* Package manager tabs */}
                  <div className="flex gap-1 border-b border-dashed pb-2">
                    {PMS.map((p) => (
                      <button
                        className={cn(
                          "rounded-[2px] px-3 py-1 font-mono text-xs transition-colors",
                          pm === p
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        key={p}
                        onClick={() => setPm(p)}
                        type="button"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <InlineCommand command={installCommand(pm, name)} />
                </div>

                {/* Code */}
                <div className="space-y-2">
                  <p className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
                    Code
                  </p>
                  {highlightedHtml && code ? (
                    <CodeBlock html={highlightedHtml} raw={code} />
                  ) : code ? (
                    <div className="group relative overflow-hidden rounded-lg bg-(--color-code)">
                      <CopyRawButton raw={code} />
                      <pre className="overflow-auto p-4 text-[.8125rem] text-white/80">
                        <code>{code}</code>
                      </pre>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No source available.
                    </p>
                  )}
                </div>
              </div>
            )}
          </SheetPanel>
        </SheetContent>
      </Sheet>
    </>
  );
}

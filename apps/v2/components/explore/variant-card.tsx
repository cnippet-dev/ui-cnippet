"use client";

import { useCopyToClipboard } from "@cnippet/ui/hooks/use-copy-to-clipboard";
import { CopyIcon } from "lucide-react";
import * as React from "react";
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
}

export function VariantCard({ name, description }: VariantCardProps) {
  const [visible, setVisible] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [code, setCode] = React.useState<string | null>(null);
  const [highlightedHtml, setHighlightedHtml] = React.useState<string | null>(
    null,
  );
  const [loadingCode, setLoadingCode] = React.useState(false);
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Only load the preview component once the card enters the viewport
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

  async function fetchCode() {
    if (code !== null) return code;
    setLoadingCode(true);
    try {
      const res = await fetch(`/api/source/${name}`);
      const data = await res.json();
      setCode(data.code ?? "");
      setHighlightedHtml(data.html ?? null);
      return data.code ?? "";
    } finally {
      setLoadingCode(false);
    }
  }

  async function handleCopy() {
    const src = await fetchCode();
    copyToClipboard(src);
  }

  async function handleViewCode() {
    await fetchCode();
    setSheetOpen(true);
  }

  return (
    <>
      <div
        className="flex flex-col overflow-hidden rounded-xl border border-gray-950/8 bg-white dark:border-white/10 dark:bg-neutral-900"
        ref={cardRef}
      >
        {/* Preview area */}
        <div className="relative flex min-h-80 flex-1 items-center justify-center overflow-hidden p-6 dark:bg-neutral-950">
          {!visible ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-white/8" />
          ) : Component ? (
            <React.Suspense
              fallback={
                <div className="h-8 w-24 animate-pulse rounded-md bg-white/8" />
              }
            >
              <Component />
            </React.Suspense>
          ) : (
            <p className="font-mono text-white/30 text-xs">No preview</p>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-2 border-gray-950/8 border-t px-4 py-2.5 dark:border-white/10">
          <span className="font-mono text-black/50 text-xs capitalize tracking-tight dark:text-white/50">
            {description || name.replace("v-", "")}
          </span>
          <div className="flex items-center gap-1">
            <Button
              aria-label="Copy source code"
              className={cn(
                "size-7 text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white",
                isCopied && "text-green-500 dark:text-green-400",
              )}
              onClick={handleCopy}
              size="icon-sm"
              variant="ghost"
            >
              <CopyIcon className="size-3.5" />
            </Button>
            <Button
              className="h-7 rounded-lg px-3 py-4 font-medium"
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
            <SheetTitle>{name}</SheetTitle>
          </SheetHeader>
          <SheetPanel>
            {loadingCode ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-6 w-32 animate-pulse rounded bg-muted" />
              </div>
            ) : highlightedHtml ? (
              <div
                className="overflow-auto rounded-lg bg-(--color-code) text-[.8125rem] [&_pre]:p-0"
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              />
            ) : (
              <p className="text-muted-foreground text-sm">
                No source available.
              </p>
            )}
          </SheetPanel>
        </SheetContent>
      </Sheet>
    </>
  );
}

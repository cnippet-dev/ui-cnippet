"use client";

import { CopyIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/registry/default/ui/button";
import { anchoredToastManager } from "@/registry/default/ui/toast";

const SNIPPET = "npx shadcn@latest add @cnippet/ui";

export function Pattern() {
  const btnRef = useRef<HTMLButtonElement>(null);

  const copy = () => {
    void navigator.clipboard.writeText(SNIPPET);
    anchoredToastManager.add({
      data: { tooltipStyle: true },
      positionerProps: { anchor: btnRef.current },
      title: "Copied!",
    });
  };

  return (
    <div className="flex items-center gap-0 overflow-hidden rounded-lg border border-input bg-muted/40 py-1 pr-1 pl-3">
      <code className="flex-1 font-mono text-foreground/80 text-sm">
        {SNIPPET}
      </code>
      <Button
        className="ml-2 shrink-0"
        onClick={copy}
        ref={btnRef}
        size="sm"
        variant="ghost"
      >
        <CopyIcon className="size-3.5" />
        Copy
      </Button>
    </div>
  );
}

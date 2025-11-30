"use client";

import { useCopyToClipboard } from "@cnippet/hooks/use-copy-to-clipboard";
import { cn } from "@cnippet/lib/utils";
import { Button } from "@cnippet/ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@cnippet/ui/tooltip";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  src?: string;
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className={cn(
              "absolute top-1.5 right-1.5 z-3 size-9 bg-code opacity-70 hover:opacity-100 focus-visible:opacity-100 sm:size-8",
              className,
            )}
            data-slot="copy-button"
            onClick={() => copyToClipboard(value)}
            size="icon"
            variant={variant}
            {...props}
          >
            <span className="sr-only">Copy</span>
            {isCopied ? (
              <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
            ) : (
              <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
            )}
          </Button>
        }
      />
      <TooltipPopup>{isCopied ? "Copied" : "Copy to Clipboard"}</TooltipPopup>
    </Tooltip>
  );
}

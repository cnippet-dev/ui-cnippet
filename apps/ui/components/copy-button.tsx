"use client";

import { RiFileCopy2Fill, RiTicket2Line } from "@remixicon/react";
import type * as React from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

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
            {isCopied ? <RiFileCopy2Fill /> : <RiTicket2Line />}
          </Button>
        }
      />
      <TooltipPopup>{isCopied ? "Copied" : "Copy to Clipboard"}</TooltipPopup>
    </Tooltip>
  );
}

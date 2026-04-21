"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui//button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/default/ui//tooltip";

export function Pattern() {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 1500 });

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={isCopied ? "Copied" : "Copy"}
            onClick={() => copyToClipboard("https://ui.cnippet.dev")}
            size="icon"
            variant="outline"
          >
            {isCopied ? (
              <CheckIcon aria-hidden="true" />
            ) : (
              <CopyIcon aria-hidden="true" />
            )}
          </Button>
        }
      />
      <TooltipContent>{isCopied ? "Copied" : "Copy link"}</TooltipContent>
    </Tooltip>
  );
}

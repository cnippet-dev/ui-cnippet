"use client";

import { RiCheckLine } from "@remixicon/react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";
import { Icons } from "./icons";

export function DocsCopyPage({ page }: { page: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <Button onClick={() => copyToClipboard(page)} size="xs" variant="outline">
      {isCopied ? <RiCheckLine className="size-4" /> : <Icons.copy />}
      Copy Markdown
    </Button>
  );
}

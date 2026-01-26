"use client";

import { RiFileCopy2Fill, RiTicket2Line } from "@remixicon/react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";

export function DocsCopyPage({ page }: { page: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <Button onClick={() => copyToClipboard(page)} size="xs" variant="outline">
      {isCopied ? <RiFileCopy2Fill /> : <RiTicket2Line />}
      Copy Markdown
    </Button>
  );
}

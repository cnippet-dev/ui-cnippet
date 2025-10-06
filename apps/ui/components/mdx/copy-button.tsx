"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";

export function CopyButton({ value }: { value: string }) {
    const [hasCopied, setHasCopied] = useState(false);

    const copyCommand = async () => {
        await navigator.clipboard.writeText(value);
        setHasCopied(true);

        setTimeout(() => {
            setHasCopied(false);
        }, 5000);
    };

    return (
        <Button
            size="icon"
            variant="ghost"
            className="absolute right-2.5 top-2 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-4 [&_svg]:w-4"
            onClick={copyCommand}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? <RiCheckLine /> : <RiFileCopyLine />}
        </Button>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function copyToClipboardWithMeta(value: string, event?: Event) {
    navigator.clipboard.writeText(value);
}

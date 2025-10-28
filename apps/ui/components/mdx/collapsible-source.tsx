"use client";

import * as React from "react";

import { useConfig } from "@/lib/use-config";
import { styles } from "@/registry/registry-styles";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CopyButton } from "./copy-button";
import { FileIcon } from "../icons";
interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    path: string;
    expandButtonTitle?: string;
}

export function CollapsibleSource({
    name,
    path,
    children,
    expandButtonTitle = "View Code",
    className,
    ...props
}: ComponentPreviewProps) {
    const [config] = useConfig();
    const index = styles.findIndex((style) => style.name === config.style);

    console.log(name);

    const [isOpened, setIsOpened] = React.useState(false);

    const Codes = React.Children.toArray(children) as React.ReactElement[];
    const Code = Codes[index];

    return (
        <>
            <Collapsible open={isOpened} onOpenChange={setIsOpened}>
                <div
                    className={cn("relative mt-3 overflow-hidden", className)}
                    {...props}
                >
                    <CollapsibleContent
                        forceMount
                        className={cn(
                            "relative overflow-hidden rounded-lg bg-zinc-900",
                            !isOpened && "max-h-72",
                        )}
                    >
                        <div className="font-geist-mono flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5 text-[13px] font-light text-white">
                            <FileIcon className="size-4 text-white" />
                            {path}
                        </div>
                        <div
                            className={cn(
                                "[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[80px]",
                                !isOpened
                                    ? "[&_pre]:overflow-hidden"
                                    : "[&_pre]:overflow-auto",
                            )}
                        >
                            {Code}
                        </div>
                    </CollapsibleContent>
                    <div
                        className={cn(
                            "absolute mx-auto flex w-full items-center justify-center rounded-md bg-linear-to-t p-2",
                            isOpened ? "bottom-0" : "from-background bottom-0",
                        )}
                    >
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="secondary"
                                className="mb-8 h-8 bg-white text-xs text-black hover:text-white"
                            >
                                {isOpened ? "Collapse" : expandButtonTitle}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                </div>
            </Collapsible>
        </>
    );
}

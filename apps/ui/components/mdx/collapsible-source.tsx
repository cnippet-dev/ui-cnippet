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
interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    expandButtonTitle?: string;
}

export function CollapsibleSource({
    name,
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
                            "overflow-hidden rounded-lg",
                            !isOpened && "max-h-72",
                        )}
                    >
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
                            "absolute mx-auto flex w-full items-center justify-center rounded-lg bg-gradient-to-t p-2",
                            isOpened ? "bottom-0" : "bottom-0 from-black",
                        )}
                    >
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="secondary"
                                className="mb-8 h-8 bg-white text-xs text-black"
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

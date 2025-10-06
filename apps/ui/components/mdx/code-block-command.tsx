"use client";

import * as React from "react";

import { NpmCommands } from "@/types/unist";
import { useConfig } from "@/lib/use-config";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { copyToClipboardWithMeta } from "./copy-button";
import { Button } from "../ui/button";
import { CheckIcon, ClipboardIcon } from "lucide-react";

export function CodeBlockCommand({
    __npmCommand__,
    __yarnCommand__,
    __pnpmCommand__,
    __bunCommand__,
}: React.ComponentProps<"pre"> & NpmCommands) {
    const [config, setConfig] = useConfig();
    const [hasCopied, setHasCopied] = useState(false);
    const packageManager = config.packageManager || "pnpm";
    const tabs = React.useMemo(() => {
        return {
            pnpm: __pnpmCommand__,
            npm: __npmCommand__,
            yarn: __yarnCommand__,
            bun: __bunCommand__,
        };
    }, [__npmCommand__, __pnpmCommand__, __yarnCommand__, __bunCommand__]);

    const copyCommand = React.useCallback(() => {
        const command = tabs[packageManager];

        if (!command) {
            return;
        }

        copyToClipboardWithMeta(command);
        setHasCopied(true);
    }, [packageManager, tabs]);

    return (
        <div className="relative mt-6 max-h-[650px] overflow-x-auto rounded-xl bg-zinc-950 dark:bg-zinc-900">
            <Tabs
                defaultValue={packageManager}
                onValueChange={(value) => {
                    setConfig({
                        ...config,
                        packageManager: value as
                            | "pnpm"
                            | "npm"
                            | "yarn"
                            | "bun",
                    });
                }}
            >
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 pt-2.5">
                    <TabsList className="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1">
                        {Object.entries(tabs).map(([key]) => {
                            return (
                                <TabsTrigger
                                    key={key}
                                    value={key}
                                    className="font-mono rounded-none border-b border-transparent bg-transparent p-0 pb-1.5 text-sm text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50 md:text-base"
                                >
                                    {key}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                </div>
                {Object.entries(tabs).map(([key, value]) => {
                    return (
                        <TabsContent key={key} value={key} className="mt-0">
                            <pre className="px-4 py-5">
                                <code
                                    className="font-mono relative text-xs leading-none text-white md:text-sm"
                                    data-language="bash"
                                >
                                    {value}
                                </code>
                            </pre>
                        </TabsContent>
                    );
                })}
            </Tabs>
            <Button
                size="icon"
                variant="ghost"
                className="absolute right-2.5 top-2 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3"
                onClick={copyCommand}
            >
                <span className="sr-only">Copy</span>
                {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
            </Button>
        </div>
    );
}

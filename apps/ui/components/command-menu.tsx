"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
// import { type DialogProps } from "@radix-ui/react-dialog";
import { Circle, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { searchDocs } from "@/config/docs";
import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

type DialogProps = {
    mobileView?: boolean;
};
// export function CommandMenu({ ...props }: DialogProps) {
export function CommandMenu({ mobileView }: DialogProps) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const { setTheme } = useTheme();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
                if (
                    (e.target instanceof HTMLElement &&
                        e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return;
                }

                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                className={`bg-muted/50 text-muted-foreground relative w-full items-center justify-between rounded-2xl border-none text-sm font-normal shadow-none ${mobileView ? "mb-5 flex h-9" : "hidden h-full md:flex"}`}
                onClick={() => setOpen(true)}
                // {...props}
            >
                <span className="hidden lg:inline-flex">Search cnippet...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="bg-muted/10 pointer-events-none hidden h-8 items-center gap-1 rounded-none border-none px-1.5 font-mono text-[10px] font-medium shadow-none select-none sm:flex dark:border-neutral-800">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <ScrollArea className="h-[300px]">
                        <CommandEmpty>No results found.</CommandEmpty>
                        {searchDocs.map((group, i) => (
                            <CommandGroup
                                key={`${group.name}-${i}`}
                                heading={group.name}
                            >
                                {group.items.map((navItem) => (
                                    <CommandItem
                                        key={`${navItem.href}-${navItem.name}`}
                                        value={navItem.name}
                                        onSelect={() => {
                                            runCommand(() =>
                                                router.push(navItem.href),
                                            );
                                        }}
                                    >
                                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                                            <Circle className="h-3 w-3" />
                                        </div>
                                        {navItem.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                        <CommandSeparator />
                        <CommandGroup heading="Theme">
                            <CommandItem
                                onSelect={() =>
                                    runCommand(() => setTheme("light"))
                                }
                            >
                                <Sun />
                                Light
                            </CommandItem>
                            <CommandItem
                                onSelect={() =>
                                    runCommand(() => setTheme("dark"))
                                }
                            >
                                <Moon />
                                Dark
                            </CommandItem>
                            <CommandItem
                                onSelect={() =>
                                    runCommand(() => setTheme("system"))
                                }
                            >
                                <Laptop />
                                System
                            </CommandItem>
                        </CommandGroup>
                    </ScrollArea>
                </CommandList>
            </CommandDialog>
        </>
    );
}

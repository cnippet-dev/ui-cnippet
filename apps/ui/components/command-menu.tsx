"use client";

import {
  ArrowTurnBackwardIcon,
  Atom01Icon,
  BookOpen02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useConfig } from "@/hooks/use-config";
import { useIsMac } from "@/hooks/use-is-mac";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import type { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import { Separator } from "@/registry/default/ui/separator";

export function CommandMenu({
  tree,
  navItems,
  ...props
}: ComponentProps<typeof Dialog> & {
  tree: typeof source.pageTree;
  navItems?: { href: string; label: string }[];
}) {
  const router = useRouter();
  const isMac = useIsMac();
  const [config] = useConfig();
  const { copyToClipboard } = useCopyToClipboard();
  const [open, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<
    "page" | "component" | null
  >(null);
  const [copyPayload, setCopyPayload] = React.useState("");
  const packageManager = config.packageManager || "pnpm";

  const handlePageHighlight = React.useCallback(
    (isComponent: boolean, item: { url: string; name?: React.ReactNode }) => {
      if (isComponent) {
        const componentName = item.url.split("/").pop();
        setSelectedType("component");
        const registryItem = `@coss/${componentName}`;
        let cmd: string;
        switch (packageManager) {
          case "pnpm":
            cmd = `pnpm dlx shadcn@latest add ${registryItem}`;
            break;
          case "bun":
            cmd = `bunx --bun shadcn@latest add ${registryItem}`;
            break;
          case "yarn":
            cmd = `yarn dlx shadcn@latest add ${registryItem}`;
            break;
          default:
            cmd = `npx shadcn@latest add ${registryItem}`;
        }

        setCopyPayload(cmd);
      } else {
        setSelectedType("page");
        setCopyPayload("");
      }
    },
    [packageManager],
  );

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        runCommand(() => {
          if (selectedType === "page" || selectedType === "component") {
            copyToClipboard(copyPayload);
          }
        });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [copyPayload, runCommand, selectedType, copyToClipboard]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={
          <Button onClick={() => setOpen(true)} variant="outline" {...props}>
            <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
            <div className="gap-1 sm:flex">
              <CommandMenuKbd>{isMac ? "⌘" : "Ctrl"}</CommandMenuKbd>
              <CommandMenuKbd className="aspect-square">K</CommandMenuKbd>
            </div>
          </Button>
        }
      />
      <DialogPopup className="p-3 pb-13 sm:max-w-xl" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <Command
          filter={(value, search, keywords) => {
            const extendValue = `${value} ${keywords?.join(" ") || ""}`;
            if (extendValue.toLowerCase().includes(search.toLowerCase())) {
              return 1;
            }
            return 0;
          }}
        >
          <CommandInput placeholder="Search documentation…" />
          <CommandList className="no-scrollbar min-h-76 scroll-pt-2 scroll-pb-1.5 pt-1">
            <CommandEmpty className="py-12 text-center text-muted-foreground text-sm">
              No results found.
            </CommandEmpty>
            {navItems && navItems.length > 0 && (
              <CommandGroup
                className="!p-0 [&_[cmdk-group-heading]]:!px-2 [&_[cmdk-group-heading]]:!pt-4 [&_[cmdk-group-heading]]:!pb-1.5 [&_[cmdk-group-heading]]:scroll-mt-16"
                heading="Pages"
              >
                {navItems.map((item) => (
                  <CommandMenuItem
                    key={item.href}
                    keywords={["nav", "navigation", item.label.toLowerCase()]}
                    onHighlight={() => {
                      setSelectedType("page");
                      setCopyPayload("");
                    }}
                    onSelect={() => {
                      runCommand(() => router.push(item.href));
                    }}
                    value={`Navigation ${item.label}`}
                  >
                    <HugeiconsIcon
                      className="opacity-72"
                      icon={BookOpen02Icon}
                      strokeWidth={2}
                    />
                    {item.label}
                  </CommandMenuItem>
                ))}
              </CommandGroup>
            )}
            {tree.children.map((group) => (
              <CommandGroup
                className="!p-0 [&_[cmdk-group-heading]]:!px-2 [&_[cmdk-group-heading]]:!pt-4 [&_[cmdk-group-heading]]:!pb-1.5 [&_[cmdk-group-heading]]:scroll-mt-16"
                heading={group.name}
                key={group.$id}
              >
                {group.type === "folder" &&
                  group.children.map((item) => {
                    if (item.type === "page") {
                      const isComponent = item.url.includes("/components/");

                      return (
                        <CommandMenuItem
                          key={item.url}
                          keywords={isComponent ? ["component"] : undefined}
                          onHighlight={() =>
                            handlePageHighlight(isComponent, item)
                          }
                          onSelect={() => {
                            runCommand(() => router.push(item.url));
                          }}
                          value={
                            item.name?.toString()
                              ? `${group.name} ${item.name}`
                              : ""
                          }
                        >
                          {isComponent ? (
                            <HugeiconsIcon
                              className="opacity-72"
                              icon={Atom01Icon}
                              strokeWidth={2}
                            />
                          ) : (
                            <HugeiconsIcon
                              className="opacity-72"
                              icon={BookOpen02Icon}
                              strokeWidth={2}
                            />
                          )}
                          {item.name}
                        </CommandMenuItem>
                      );
                    }
                    return null;
                  })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-2 rounded-b-xl border-t bg-muted px-4 py-3 text-muted-foreground text-xs">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <CommandMenuKbd>
              <HugeiconsIcon icon={ArrowTurnBackwardIcon} strokeWidth={2} />
            </CommandMenuKbd>{" "}
            {selectedType === "page" || selectedType === "component"
              ? "Go to Page"
              : null}
          </div>
          {copyPayload && (
            <>
              <Separator className="!h-4" orientation="vertical" />
              <div className="flex min-w-0 items-center gap-1">
                <CommandMenuKbd>{isMac ? "⌘" : "Ctrl"}</CommandMenuKbd>
                <CommandMenuKbd>C</CommandMenuKbd>
                <span className="truncate">{copyPayload}</span>
              </div>
            </>
          )}
        </div>
      </DialogPopup>
    </Dialog>
  );
}

function CommandMenuItem({
  children,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void;
  "data-selected"?: string;
  "aria-selected"?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onHighlight?.();
      }
    });
  });

  return (
    <CommandItem ref={ref} {...props}>
      {children}
    </CommandItem>
  );
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none flex h-5 select-none items-center justify-center gap-1 rounded border bg-background px-1 font-medium font-sans text-[0.7rem] text-muted-foreground [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  );
}

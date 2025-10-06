"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

// import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { useMetaColor } from "@/hooks/use-meta-color";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { charts, components, motions } from "@/config/docs";
import { CommandMenu } from "@/components/command-menu";

export function MobileNav() {
    const [open, setOpen] = React.useState(false);
    const { setMetaColor, metaColor } = useMetaColor();

    const onOpenChange = React.useCallback(
        (open: boolean) => {
            setOpen(open);
            setMetaColor(open ? "#09090b" : metaColor);
        },
        [setMetaColor, metaColor],
    );
    const pathname = usePathname();

    const getNavigation = () => {
        if (pathname?.startsWith("/component")) {
            return components;
        }
        if (pathname?.startsWith("/motion")) {
            return motions;
        }
        if (pathname?.startsWith("/chart")) {
            return charts;
        }
        return [];
    };

    const currentNavigation = getNavigation();

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-8 w-full gap-4 pl-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="!size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 9h16.5m-16.5 6.75h16.5"
                        />
                    </svg>
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80svh] p-0">
                <DrawerTitle className="sr-only">Mobile Navigation</DrawerTitle>
                <div className="overflow-auto p-6">
                    <CommandMenu mobileView={true} />

                    <hr />

                    <ul
                        role="list"
                        className="h-full pb-9 [&>li:not(:first-child)>div]:pt-6"
                    >
                        {currentNavigation.map((nav, index) => {
                            return (
                                <li key={`${nav.name}-${index}`}>
                                    <div className="relative z-10 w-11/12 bg-white pb-4 text-sm/6 font-medium text-zinc-950 dark:bg-zinc-950 dark:text-white">
                                        {nav.name}
                                    </div>
                                    <ul
                                        role="list"
                                        className="space-y-3.5 border-zinc-200 dark:border-zinc-800"
                                    >
                                        {nav.items.map((item, j) => {
                                            const isActive =
                                                pathname === item.href;

                                            return (
                                                <li key={`${item.name}-${j}`}>
                                                    <MobileLink
                                                        className={cn(
                                                            "relative inline-flex w-full items-center pl-1 text-sm font-normal text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white",
                                                            isActive &&
                                                                "w-full rounded-l-lg bg-gray-100 py-1.5 pl-3 text-zinc-950 dark:bg-neutral-900 dark:text-neutral-200",
                                                            item.href === "#" &&
                                                                "cursor-default text-gray-400 hover:text-gray-400",
                                                        )}
                                                        href={item.href}
                                                        onOpenChange={setOpen}
                                                    >
                                                        <span>{item.name}</span>
                                                        {item.href === "#" && (
                                                            <span className="mr-4 ml-auto rounded-lg bg-emerald-100 px-2 text-[10px] font-semibold whitespace-nowrap text-emerald-800 dark:bg-emerald-950 dark:text-emerald-50">
                                                                Coming soon
                                                            </span>
                                                        )}
                                                        {item?.isNew && (
                                                            <span className="ml-2 rounded-lg bg-blue-100 px-2 text-[10px] font-semibold whitespace-nowrap text-blue-800 dark:bg-blue-950 dark:text-emerald-50">
                                                                New
                                                            </span>
                                                        )}
                                                        {item?.isUpdated && (
                                                            <span className="ml-2 rounded-lg bg-amber-100 px-2 text-[10px] font-semibold whitespace-nowrap text-amber-800 dark:bg-amber-950 dark:text-amber-50">
                                                                Updated
                                                            </span>
                                                        )}
                                                    </MobileLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>

                    <ul className="mt-5 space-y-2">
                        <li>
                            <MobileLink
                                href="/components/button"
                                onOpenChange={setOpen}
                                className="relative z-10 w-11/12 bg-white pb-4 text-sm/6 font-medium text-zinc-950 dark:bg-zinc-950 dark:text-white"
                            >
                                Components
                            </MobileLink>
                        </li>
                        <li>
                            <MobileLink
                                href="/motions/accordion"
                                onOpenChange={setOpen}
                                className="relative z-10 w-11/12 bg-white pb-4 text-sm/6 font-medium text-zinc-950 dark:bg-zinc-950 dark:text-white"
                            >
                                Motion
                            </MobileLink>
                        </li>
                        <li>
                            <MobileLink
                                href="/charts/line-chart"
                                onOpenChange={setOpen}
                                className="relative z-10 w-11/12 bg-white pb-4 text-sm/6 font-medium text-zinc-950 dark:bg-zinc-950 dark:text-white"
                            >
                                Chart
                            </MobileLink>
                        </li>
                    </ul>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

function MobileLink({
    href,
    onOpenChange,
    className,
    children,
    ...props
}: MobileLinkProps) {
    const router = useRouter();
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString());
                onOpenChange?.(false);
            }}
            className={cn("text-[1.15rem]", className)}
            {...props}
        >
            {children}
        </Link>
    );
}

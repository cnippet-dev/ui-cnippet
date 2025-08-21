"use client";
import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { charts, components, motions } from "@/config/docs";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/shared/navbar"), {
    ssr: true,
    loading: () => <div className="h-20 bg-white dark:bg-black" />,
});

function NavigationDesktop({ navigation }: { navigation: typeof components }) {
    const pathname = usePathname();
    const activeRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        if (activeRef.current) {
            activeRef.current.scrollIntoView({
                behavior: "auto",
                block: "center",
            });
        }
    }, [pathname]);

    return (
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r border-dashed pl-5 md:sticky md:block dark:border-neutral-800">
            <ScrollArea className="h-full w-full">
                <nav className="pt-8">
                    <ul
                        role="list"
                        className="h-full pb-9 [&>li:not(:first-child)>div]:pt-6"
                    >
                        {navigation.map((nav, index) => {
                            return (
                                <li key={`${nav.name}-${index}`}>
                                    <div className="relative z-10 w-11/12 pb-4 text-sm/6 font-medium text-zinc-950 dark:text-white">
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
                                                <li
                                                    key={`${item.name}-${j}`}
                                                    ref={
                                                        isActive
                                                            ? activeRef
                                                            : null
                                                    }
                                                >
                                                    <Link
                                                        className={cn(
                                                            "relative inline-flex w-full items-center pl-1 text-sm font-normal text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white",
                                                            isActive &&
                                                                "w-full rounded-l-lg bg-gray-100 py-1.5 pl-3 text-zinc-950 dark:bg-neutral-900 dark:text-neutral-200",
                                                            item.href === "#" &&
                                                                "cursor-default text-gray-400 hover:text-gray-400",
                                                        )}
                                                        href={item.href}
                                                    >
                                                        <span>{item.name}</span>
                                                        {item.href === "#" && (
                                                            <span className="mr-4 ml-auto rounded-lg bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-emerald-800">
                                                                Coming soon
                                                            </span>
                                                        )}
                                                        {item?.isNew && (
                                                            <span className="ml-2 rounded-lg bg-blue-100 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-blue-800">
                                                                New
                                                            </span>
                                                        )}
                                                        {item?.isUpdated && (
                                                            <span className="ml-2 rounded-lg bg-amber-100 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-amber-800">
                                                                Updated
                                                            </span>
                                                        )}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </ScrollArea>
        </aside>
    );
}

export default function ComponentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
        <>
            <div className="bg-background relative flex min-h-svh flex-col">
                <div className="flex flex-1 flex-col">
                    <Navbar />
                    <main className="mx-auto flex max-w-7xl flex-1 flex-col">
                        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-0 flex w-full overflow-visible">
                            <div
                                className="absolute top-0 left-1/2 z-0 h-full w-full max-w-7xl flex-auto -translate-x-1/2 overflow-visible"
                                data-framer-name="Vertical lines"
                            >
                                <div
                                    className="absolute top-0 right-0 bottom-0 z-0 h-full w-[1px] border-r border-dashed border-gray-200 dark:border-neutral-700"
                                    data-border="true"
                                    data-framer-name="Right line"
                                ></div>
                                <div
                                    className="absolute bottom-0 left-0 z-0 h-full w-[1px] border-r border-dashed border-gray-200 dark:border-neutral-700"
                                    data-border="true"
                                    data-framer-name="Left line"
                                ></div>
                            </div>
                        </div>

                        <div className="">
                            <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-6">
                                <NavigationDesktop
                                    navigation={currentNavigation}
                                />
                                <div className="w-full pt-8">{children}</div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

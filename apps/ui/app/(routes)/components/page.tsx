import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

import { components } from "@/config/docs";
import { cn } from "@/lib/utils";
import { BASE_URL } from "@/config/docs";
import { DashedBorderWithTopDots } from "@/components/dashed-layout";

const page = () => {
    return (
        <section className="relative">
            <DashedBorderWithTopDots />

            <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
                <div className="relative grid h-full w-full grid-cols-12 py-0">
                    <div className="col-span-12 text-center">
                        <div className="relative">
                            <h2 className="mb-2 pt-16 text-2xl leading-tight font-semibold tracking-tight md:text-5xl">
                                Components
                            </h2>
                            <p className="mb-8 px-5 text-sm text-gray-500 md:mb-16 md:text-base">
                                Components are the building blocks of your
                                application. They are used to create reusable UI
                                elements.
                            </p>
                        </div>

                        <div className="border-t border-dashed pb-20 dark:border-neutral-700">
                            <ul
                                role="list"
                                className="grid grid-cols-1 md:grid-cols-4"
                            >
                                {components.map((nav, index) => {
                                    return (
                                        <li
                                            key={`${nav.name}-${index}`}
                                            className={`border-b border-dashed px-6 py-4 dark:border-neutral-700 ${
                                                index === 3 ||
                                                index === 7 ||
                                                index === 11
                                                    ? "md:border-r-0"
                                                    : "md:border-r"
                                            } ${index === components.length - 2 ? "border-b" : ""} ${
                                                index === components.length - 1
                                                    ? "border-r border-b"
                                                    : ""
                                            }`}
                                        >
                                            <div className="relative z-10 pb-4 text-left text-base/6 font-medium text-zinc-950 dark:text-white">
                                                {nav.name}
                                            </div>
                                            <ul
                                                role="list"
                                                className="space-y-3.5 border-zinc-200 dark:border-zinc-800"
                                            >
                                                {nav.items.map((item, j) => {
                                                    return (
                                                        <li
                                                            key={`${item.name}-${j}`}
                                                        >
                                                            <Link
                                                                className={cn(
                                                                    "relative inline-flex w-full items-center pl-1 text-sm font-normal text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white",
                                                                    // isActive &&
                                                                    //     "w-full rounded-l-lg bg-gray-100 py-1.5 pl-3 text-zinc-950 dark:bg-neutral-900 dark:text-neutral-200",
                                                                    item.href ===
                                                                        "#" &&
                                                                        "cursor-default text-gray-400 hover:text-gray-400",
                                                                )}
                                                                href={item.href}
                                                            >
                                                                <span>
                                                                    {item.name}
                                                                </span>
                                                                {item.href ===
                                                                    "#" && (
                                                                    <span className="mr-4 ml-auto rounded-lg bg-emerald-100 px-2 py-0.5 text-[8px] font-semibold whitespace-nowrap text-emerald-800 md:text-[10px]">
                                                                        Coming
                                                                        soon
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default page;

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),

    title: "Components",
    description:
        "An extensive collection of copy-and-paste components for quickly building app UIs. Free, open-source, and ready to drop into your projects.",

    openGraph: {
        type: "article",
        title: "Components",
        description:
            "An extensive collection of copy-and-paste components for quickly building app UIs. Free, open-source, and ready to drop into your projects.",
        url: `${BASE_URL}/components`,
        images: [
            {
                url: `${BASE_URL}/images/site.png`,
                width: 1200,
                height: 630,
                alt: "Cnippet UI Component Library",
            },
        ],
        siteName: "Cnippet UI",
    },

    twitter: {
        card: "summary_large_image",
        title: "Components",
        description:
            "An extensive collection of copy-and-paste components for quickly building app UIs. Free, open-source, and ready to drop into your projects.",
        images: [`${BASE_URL}/images/site.png`],
        site: "@cnippet_ui",
        creator: "@cnippet_ui",
    },
};

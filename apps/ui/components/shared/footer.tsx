"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
    RiArrowRightUpLine,
    RiBehanceLine,
    RiDribbbleLine,
    RiMoonFill,
    RiSunFill,
    RiTwitterLine,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Ripple } from "../motion/ripple";
import { DashedBorderWithTopDots2 } from "../dashed-layout";

import { forwardRef } from "react";

const Footer = forwardRef<
    HTMLButtonElement,
    React.HTMLAttributes<HTMLButtonElement>
>((props, ref) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative">
            <DashedBorderWithTopDots2 />

            <section className="p-4">
                <div className="rounded-3xl bg-gray-50 p-2 py-16 md:py-28 dark:bg-black">
                    <div className="dark:bg-background mx-auto max-w-6xl overflow-hidden rounded-4xl bg-white py-0 shadow-lg md:pl-10">
                        <div className="grid items-center md:gap-12 lg:grid-cols-2">
                            {/* Left Content */}
                            <div className="space-y-4 px-4 py-5 md:px-0">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Become a Contributor
                                    </p>
                                    <h1 className="text-4xl leading-tight font-semibold text-gray-900 md:text-5xl lg:text-2xl dark:text-gray-100">
                                        Join our Contribution Program
                                    </h1>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                        Contribute components, improvements, or
                                        documentation to help make Cnippet UI
                                        better. Open issues, submit pull
                                        requests, and help the community grow.
                                    </p>
                                </div>

                                <Button
                                    ref={ref}
                                    asChild
                                    size="lg"
                                    className="mt-3 cursor-pointer rounded-full bg-black px-8 py-5.5 text-sm text-white shadow-none hover:bg-gray-800 dark:bg-white dark:text-black"
                                >
                                    <Link
                                        href="https://github.com/cnippet-dev/ui-cnippet-turbo"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Become a contributor
                                        <RiArrowRightUpLine />
                                    </Link>
                                </Button>
                            </div>

                            <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden">
                                <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
                                    <p className="z-10 text-center text-5xl font-medium tracking-tighter whitespace-pre-wrap text-white">
                                        Cnippet Ui
                                    </p>
                                    <Ripple />
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="">
                        <div className="mx-auto max-w-6xl px-4 pt-16">
                            <div className="grid gap-10 md:grid-cols-2 md:gap-20 lg:grid-cols-6">
                                <div className="col-span-2 space-y-2">
                                    <div className="flex items-center">
                                        <Image
                                            src={
                                                theme === "dark"
                                                    ? "/logo-dark.png"
                                                    : "/logo-light.png"
                                            }
                                            alt=""
                                            className="size-10"
                                            width={1080}
                                            height={1080}
                                        />
                                        <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                                            Cnippet{" "}
                                            <span className="text-gray-400">
                                                Ui
                                            </span>
                                        </span>
                                    </div>
                                    <p className="w-[70%] text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                                        The most Powerful Figma Ui Kit & Design
                                        System for designers.
                                    </p>
                                </div>

                                <div className="col-span-2 flex space-x-10">
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            Ui Components
                                        </h3>
                                        <div className="hover flex flex-col space-y-3 [&_a]:text-sm [&_a]:text-gray-600 [&_a]:transition-colors [&_a]:hover:text-gray-900 [&_a]:dark:text-gray-400 [&_a]:dark:hover:text-white">
                                            <Link href="/components/file-trigger">
                                                File Trigger
                                            </Link>
                                            <Link href="/components/table">
                                                Table
                                            </Link>
                                            <Link href="/components/data-table">
                                                Data Table
                                            </Link>
                                            <Link href="/components/command-menu">
                                                Command Menu
                                            </Link>
                                            <Link href="/components/context-menu">
                                                Context Menu
                                            </Link>
                                            <Link href="/components/dialog">
                                                Dialog
                                            </Link>
                                            <Link href="/components/sheet">
                                                Sheet
                                            </Link>
                                            <Link href="/components/sonner">
                                                Sonner
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            Motion Components
                                        </h3>
                                        <div className="hover flex flex-col space-y-3 [&_a]:text-sm [&_a]:text-gray-600 [&_a]:transition-colors [&_a]:hover:text-gray-900 [&_a]:dark:text-gray-400 [&_a]:dark:hover:text-white">
                                            <Link href="/motions/image-mousetrail">
                                                Image mousetrail
                                            </Link>
                                            <Link href="/motions/morphing-dialog">
                                                Morphing Dialog
                                            </Link>
                                            <Link href="/motions/text-roll">
                                                Text Roll
                                            </Link>
                                            <Link href="/motions/horizontal-scroll">
                                                Horizontal Scroll
                                            </Link>
                                            <Link href="/motions/image-comparison">
                                                Image Comparison
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Footer */}
                            <div className="mt-16 flex flex-col space-y-4 border-t border-gray-200 pt-8 md:flex-row md:items-center md:justify-between md:space-y-0 dark:border-neutral-700">
                                <div className="flex flex-wrap items-center space-x-4 text-xs font-medium tracking-tight text-gray-600 dark:text-gray-300">
                                    <span>© 2025 Cnippet</span>
                                    <span>•</span>
                                    <span>All rights reserved</span>
                                </div>
                                <div className="mr-5 flex items-end md:ml-auto">
                                    {mounted && (
                                        <div className="flex w-fit gap-1 rounded-full border p-0.5 dark:border-neutral-800">
                                            <button
                                                onClick={() =>
                                                    setTheme("light")
                                                }
                                                className={`rounded-full p-1.5 ${theme === "light" ? "bg-slate-200 dark:bg-[#1a1a1a]" : ""}`}
                                                aria-label="Light mode"
                                            >
                                                <RiSunFill className="size-4" />
                                            </button>
                                            <button
                                                onClick={() => setTheme("dark")}
                                                className={`rounded-full p-1.5 ${theme === "dark" ? "bg-neutral-600" : ""}`}
                                                aria-label="Dark mode"
                                            >
                                                <RiMoonFill className="size-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2 [&_svg]:size-5 [&_svg]:text-gray-700 [&_svg]:dark:text-gray-300">
                                        <RiBehanceLine />
                                        <RiDribbbleLine />
                                        <RiTwitterLine />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </section>
        </div>
    );
});

Footer.displayName = "footer";

export default Footer;

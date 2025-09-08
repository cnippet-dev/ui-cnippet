"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
    RiArrowRightLine,
    RiArrowRightUpLine,
    RiBehanceLine,
    RiDribbbleLine,
    RiMoonFill,
    RiSunFill,
    RiTwitterLine,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ripple } from "../motion/ripple";

export default function Component() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative">
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-0 flex w-full overflow-visible">
                <div
                    className="absolute top-20 left-0 z-0 h-[1px] w-full flex-auto overflow-hidden border-t border-dashed border-gray-200 dark:border-neutral-700"
                    data-border="true"
                    data-framer-name="Top divider"
                ></div>

                <div
                    className="absolute top-0 left-1/2 z-0 h-full w-full max-w-7xl flex-auto -translate-x-1/2 overflow-visible"
                    data-framer-name="Vertical lines"
                >
                    <div
                        className="absolute right-2 bottom-0 z-0 h-full w-[1px] border-r border-dashed border-gray-200 md:right-0 dark:border-neutral-700"
                        data-border="true"
                        data-framer-name="Right line"
                    >
                        <div
                            className="dot-top2"
                            data-border="true"
                            data-framer-name="Ellipsis"
                        ></div>
                    </div>
                    <div
                        className="absolute bottom-0 left-2 z-0 h-full w-[1px] border-r border-dashed border-gray-200 md:left-0 dark:border-neutral-700"
                        data-border="true"
                        data-framer-name="Left line"
                    >
                        <div
                            className="dot-top2"
                            data-border="true"
                            data-framer-name="Ellipsis"
                        ></div>
                    </div>
                </div>
            </div>

            <section className="p-4">
                <div className="rounded-3xl bg-gray-50 p-2 py-16 md:py-28 dark:bg-black">
                    <div className="dark:bg-background mx-auto max-w-6xl overflow-hidden rounded-4xl bg-white py-0 shadow-lg md:pl-10">
                        <div className="grid items-center md:gap-12 lg:grid-cols-2">
                            {/* Left Content */}
                            <div className="space-y-4 px-4 py-5 md:px-0">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Become an Affiliate
                                    </p>
                                    <h1 className="text-4xl leading-tight font-semibold text-gray-900 md:text-5xl lg:text-2xl dark:text-gray-100">
                                        Join our Affiliate Program
                                    </h1>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                        Earn up to{" "}
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            $200
                                        </span>{" "}
                                        with our generous{" "}
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            40%
                                        </span>{" "}
                                        commission for every sale you drive with
                                        your referral link.
                                    </p>
                                </div>

                                <Button
                                    size="lg"
                                    className="mt-3 cursor-pointer rounded-full bg-black px-8 py-5.5 text-sm text-white shadow-none hover:bg-gray-800 dark:bg-white dark:text-black"
                                >
                                    Become an affiliate
                                    <RiArrowRightUpLine />
                                </Button>
                            </div>

                            <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden">
                                <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
                                    <p className="z-10 text-center text-5xl font-medium tracking-tighter whitespace-pre-wrap text-white">
                                        Cnippet
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
                                                UI
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
                                            Company
                                        </h3>
                                        <div className="hover flex flex-col space-y-3 [&_a]:text-sm [&_a]:text-gray-600 [&_a]:transition-colors [&_a]:hover:text-gray-900 [&_a]:dark:text-gray-400 [&_a]:dark:hover:text-white">
                                            <Link href="#">Pricing</Link>
                                            <Link href="/contact_us">
                                                Contact Us
                                            </Link>
                                            <Link
                                                href="#"
                                                className="flex items-center"
                                            >
                                                Become an Affiliate
                                                <RiArrowRightUpLine className="ml-1 h-3 w-3" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="flex items-center"
                                            >
                                                Projects
                                                <RiArrowRightUpLine className="ml-1 h-3 w-3" />
                                            </Link>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="cursor-pointer items-start justify-start border-none bg-gray-50 px-0 py-0 text-left text-sm font-normal text-gray-600 shadow-none hover:bg-gray-50 dark:bg-black dark:text-gray-400 dark:hover:bg-black"
                                                    >
                                                        Legal
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    className="top-0 w-56 rounded-2xl dark:border-neutral-800"
                                                    align="start"
                                                    sideOffset={-5}
                                                >
                                                    <DropdownMenuGroup className="[&_a]:w-full">
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/licence">
                                                                Licence
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/terms">
                                                                Terms of Service
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/privacy">
                                                                Privacy Policy
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/cancellation">
                                                                Cancellation
                                                                Policy
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/affiliate">
                                                                Affiliate Notice
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/accessibility">
                                                                Accessibility
                                                                Notice
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            Socials
                                        </h3>
                                        <div className="hover flex flex-col space-y-3 [&_a]:text-sm [&_a]:text-gray-600 [&_a]:transition-colors [&_a]:hover:text-gray-900 [&_a]:dark:text-gray-400 [&_a]:dark:hover:text-white">
                                            <a
                                                href="https://dribbble.com/cnippet-dev"
                                                target="_blank"
                                                className="flex items-center"
                                            >
                                                Behance
                                                <RiArrowRightUpLine className="ml-1 h-3 w-3" />
                                            </a>
                                            <a
                                                href="https://www.behance.net/cnippetdev"
                                                target="_blank"
                                                className="flex items-center"
                                            >
                                                Dribbble
                                                <RiArrowRightUpLine className="ml-1 h-3 w-3" />
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center"
                                            >
                                                Twitter/X
                                                <RiArrowRightUpLine className="ml-1 h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2 space-y-2">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        Newsletter
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-50">
                                        Receive product updates news, exclusive
                                        discounts and early access.
                                    </p>
                                    <div className="dark:bg-background flex overflow-hidden rounded-full bg-white p-1 shadow-sm">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email..."
                                            className="border-none py-5 shadow-none focus:z-10 focus-visible:ring-0"
                                        />
                                        <Button className="rounded-full bg-black px-6 py-5 text-white hover:bg-gray-800 dark:bg-white dark:text-black">
                                            <RiArrowRightLine className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Footer */}
                            <div className="mt-16 flex flex-col space-y-4 border-t border-gray-200 pt-8 md:flex-row md:items-center md:justify-between md:space-y-0 dark:border-neutral-700">
                                <div className="flex flex-wrap items-center space-x-4 text-xs font-medium tracking-tight text-gray-600 dark:text-gray-300">
                                    <span>© 2025 Cnippet</span>
                                    <span>•</span>
                                    <span>All rights reserved</span>
                                    <span>•</span>
                                    <span>Made with CnippetUi</span>
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
}

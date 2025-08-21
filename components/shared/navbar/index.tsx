"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import NavClientContent from "./nav-client-content";

const Navbar = () => {
    const theme = useTheme();

    return (
        <>
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-0 flex h-full w-full overflow-visible">
                <div
                    className="absolute top-20 left-0 z-0 h-[1px] w-full flex-auto overflow-hidden border-t border-dashed border-gray-200 dark:border-neutral-700"
                    data-border="true"
                    data-framer-name="Top divider"
                ></div>

                <div
                    className="absolute top-0 left-1/2 z-0 h-28 w-full max-w-7xl flex-auto -translate-x-1/2 overflow-visible"
                    data-framer-name="Vertical lines"
                >
                    <div
                        className="absolute right-0 bottom-0 z-0 h-full w-[1px] border-r border-dashed border-gray-200 dark:border-neutral-700"
                        data-border="true"
                        data-framer-name="Right line"
                    >
                        <div
                            className="dot-top"
                            data-border="true"
                            data-framer-name="Ellipsis"
                        ></div>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 z-0 h-full w-[1px] border-r border-dashed border-gray-200 dark:border-neutral-700"
                        data-border="true"
                        data-framer-name="Left line"
                    >
                        <div
                            className="dot-top"
                            data-border="true"
                            data-framer-name="Ellipsis"
                        ></div>
                    </div>
                </div>
            </div>

            <div className="sticky top-0 z-50">
                <div className="sticky top-4 z-50 pt-3 pb-6">
                    <nav className="mx-auto flex max-w-4xl items-center justify-between rounded-full bg-gray-200/60 px-2 py-2 backdrop-blur-md dark:bg-neutral-800/50">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={
                                    theme.theme === "dark"
                                        ? "/logo-dark.png"
                                        : "/logo-light.png"
                                }
                                alt=""
                                className="size-10"
                                width={1080}
                                height={1080}
                            />
                            <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                Cnippet{" "}
                                <span className="text-gray-400 dark:text-gray-500">
                                    Ui
                                </span>
                            </span>
                        </Link>

                        <NavClientContent />
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;

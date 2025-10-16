"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CommandMenu } from "@/components/command-menu";
import { MobileNav } from "./mobile-nav";
import { RiGithubFill } from "@remixicon/react";

export default function NavClientContent() {
    return (
        <>
            <div className="hidden items-center space-x-8 text-sm font-medium md:flex">
                {["Components", "Motions", "Charts", "Blocks", "Docs"].map(
                    (item, index) => (
                        <motion.div
                            key={item}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.1,
                            }}
                        >
                            <Link
                                href={`${
                                    item === "Blocks"
                                        ? "https://blocks.cnippet.dev//sections"
                                        : item === "Components"
                                          ? "/components/button"
                                          : item === "Motions"
                                            ? "/motions/accordion"
                                            : item === "Charts"
                                              ? "/charts/area-chart"
                                              : item === "/Docs"
                                                ? "/docs/introduction"
                                                : `/${item.toLowerCase()}`
                                }`}
                                target={`${item === "Blocks" ? "_blank" : ""}`}
                                className="text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white"
                            >
                                {item}
                            </Link>
                        </motion.div>
                    ),
                )}
            </div>

            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex items-center space-x-2"
            >
                <CommandMenu />
                <MobileNav />
                <Link
                    href="https://github.com/cnippet-dev/all-elements"
                    target="_blank"
                >
                    <RiGithubFill className="text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-400 dark:hover:text-white" />
                </Link>
            </motion.div>
        </>
    );
}

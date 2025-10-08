"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { fadeUp, fadeDown } from "cnippet-aos";

import NavClientContent from "./nav-client-content";
import { DashedBorder } from "@/components/dashed-layout";

const Navbar = () => {
    const theme = useTheme();
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className="relative h-20">
                <DashedBorder />
                <motion.div
                    {...fadeUp({ delay: 0, duration: 0.8, y: -10 })}
                    className="fixed top-4 z-50 w-full px-4 pt-0 md:px-0"
                >
                    <nav
                        className={`mx-auto flex items-center justify-between rounded-full p-1 backdrop-blur-md transition-all duration-300 md:p-2 dark:bg-neutral-800/50 ${scroll ? "max-w-4xl bg-gray-200/60" : "max-w-6xl"}`}
                    >
                        <motion.div
                            {...fadeUp({ delay: 0, duration: 0.8, y: -10 })}
                        >
                            <Link href="/" className="flex items-center">
                                <Image
                                    src={
                                        theme.theme === "dark"
                                            ? "/logo-dark.png"
                                            : "/logo-light.png"
                                    }
                                    alt="CNIPPET Logo"
                                    className="size-9 md:size-10"
                                    width={1080}
                                    height={1080}
                                />
                                <motion.span
                                    {...fadeDown({
                                        delay: 0.2,
                                        duration: 0.4,
                                        y: -10,
                                    })}
                                    className="font-funnel text-lg tracking-tight text-gray-900 md:text-2xl dark:text-white"
                                >
                                    Cnippet{" "}
                                    <span className="text-gray-400">Ui</span>
                                </motion.span>
                            </Link>
                        </motion.div>

                        <NavClientContent />
                    </nav>
                </motion.div>
            </div>
        </>
    );
};

export default Navbar;

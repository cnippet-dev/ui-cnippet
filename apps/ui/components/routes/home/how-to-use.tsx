// how-to-use.tsx - IMPROVED VERSION
"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import { RiArrowRightUpLine, RiGithubFill } from "@remixicon/react";

import { fadeUp, fadeUpBlur, zoomIn } from "cnippet-aos";

import { Button } from "@/components/ui/button";
import { DashedBorder } from "@/components/dashed-layout";
import { ClipboardIcon, DocumentIcon, LoginIcon } from "@/components/icons";
import Link from "next/link";

const className = "h-6 w-6 fill-black dark:fill-white";

const steps = [
    {
        number: "01",
        icon: <RiGithubFill className={`${className}`} />,
        title: "Get the code",
        description: "Clone or download from GitHub to start using components immediately.",
        action: "View GitHub",
        href: "https://github.com/cnippet-dev/all-elements",
    },
    {
        number: "02",
        icon: <DocumentIcon className={`${className}`} />,
        title: "Read documentation",
        description: "Follow our setup guide and explore component APIs and examples.",
        action: "View Docs",
        href: "/docs",
    },
    {
        number: "03",
        icon: (
            <ClipboardIcon className="size-5 stroke-black text-white dark:stroke-white" />
        ),
        title: "Copy components",
        description: "Browse the library and copy the components you need directly into your project.",
        action: "Browse Library",
        href: "/components",
    },
    {
        number: "04",
        icon: <LoginIcon className={`${className}`} />,
        title: "Customize & deploy",
        description: "Customize to match your design system and deploy to production.",
        action: "Get Started",
        href: "/components",
    },
];

const HowToUse = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
    return (
        <section className="relative h-full">
            <DashedBorder />

            <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
                <motion.div className="font-funnel mb-16 text-left">
                    <motion.h2
                        className="mb-1 text-3xl font-normal tracking-tight text-gray-500 md:text-4xl dark:text-white"
                        {...fadeUpBlur({
                            delay: 0.1,
                            duration: 0.8,
                            scroll: true,
                            once: true,
                        })}
                    >
                        Start building in minutes
                    </motion.h2>
                    <motion.h2
                        className="mb-6 text-3xl font-normal tracking-tight text-gray-900 md:text-4xl dark:text-gray-400"
                        {...fadeUpBlur({
                            delay: 0.3,
                            duration: 0.8,
                            scroll: true,
                            once: true,
                        })}
                    >
                        Simple integration
                    </motion.h2>
                    <motion.p
                        className="max-w-md text-sm text-gray-600 dark:text-gray-400"
                        {...fadeUp({
                            delay: 0.4,
                            duration: 0.8,
                            scroll: true,
                            once: true,
                        })}
                    >
                        Get started quickly with our straightforward setup process.
                    </motion.p>
                </motion.div>

                <div className="grid divide-x divide-dashed md:grid-cols-2 lg:grid-cols-4 dark:divide-neutral-700">
                    {steps.map((step, index) => {
                        return (
                            <motion.div
                                key={step.number}
                                {...fadeUp({
                                    delay: 0.4 + index * 0.1,
                                    duration: 0.6,
                                    y: 30,
                                    scroll: true,
                                    once: true,
                                })}
                                className="group relative h-full"
                            >
                                <div className="relative flex h-full flex-col p-4 transition-all duration-300 hover:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-2xl font-bold text-gray-300 dark:text-gray-600">
                                            {step.number}
                                        </span>
                                        <motion.div
                                            {...zoomIn({
                                                delay: 0.4 + index * 0.1,
                                                duration: 0.5,
                                            })}
                                            className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-200 dark:bg-black"
                                        >
                                            {step.icon}
                                        </motion.div>
                                    </div>

                                    <div className="mb-3 space-y-3">
                                        <h3 className="font-funnel text-xl font-normal tracking-tight text-gray-900 dark:text-gray-100">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                                            {step.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto" ref={ref}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="group/btn hover:bg-background w-full justify-between border-none border-gray-200 bg-transparent text-sm shadow-none transition-all duration-300"
                                            asChild
                                        >
                                            <Link
                                                href={step.href}
                                                target={
                                                    step.href.startsWith("http")
                                                        ? "_blank"
                                                        : "_self"
                                                }
                                            >
                                                {step.action}
                                                <RiArrowRightUpLine className="h-4 w-4 transition-all ease-in group-hover/btn:rotate-45" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});

HowToUse.displayName = "HowToUse";

export default HowToUse;
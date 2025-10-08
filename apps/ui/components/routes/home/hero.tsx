import { forwardRef } from "react";
import { RiArrowRightUpLine, RiSparkling2Fill } from "@remixicon/react";
import { motion } from "motion/react";
import { fadeUp, fadeUpBlur, zoomIn } from "cnippet-aos";

import { Button } from "@/components/ui/button";
import { DashedBorderWithTopDots } from "@/components/dashed-layout";
import { TextLoop } from "@/components/motion/text-loop";
import Link from "next/link";

const Hero = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    (props, ref) => {
        return (
            <section className="relative h-full">
                <DashedBorderWithTopDots />

                <div className="relative z-10">
                    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
                        <motion.h1
                            {...fadeUpBlur({ delay: 0.1, duration: 0.8 })}
                            className="font-funnel mb-6 max-w-7xl text-4xl leading-tight font-normal tracking-tight text-gray-900 md:text-6xl lg:text-6xl dark:text-gray-100"
                        >
                            Core, motion, and chart components for React/Next.js with{" "}
                            <motion.span
                                {...zoomIn({ delay: 0.1, duration: 0.5 })}
                                className="-pt-5 relative inline-flex items-center border border-dashed px-4"
                            >
                                <div
                                    className="dot-tl -top-1.5"
                                    data-border="true"
                                    data-framer-name="Ellipsis"
                                ></div>
                                <div
                                    className="dot-tr -top-1.5"
                                    data-border="true"
                                    data-framer-name="Ellipsis"
                                ></div>
                                <div
                                    className="dot-br -bottom-1.5"
                                    data-border="true"
                                    data-framer-name="Ellipsis"
                                ></div>
                                <div
                                    className="dot-bl -bottom-1.5"
                                    data-border="true"
                                    data-framer-name="Ellipsis"
                                ></div>
                                <RiSparkling2Fill className="size-10 text-indigo-600" />
                                Cnippet UI
                            </motion.span>{" "}
                        </motion.h1>

                        <motion.div
                            {...fadeUp({
                                delay: 0.3,
                                duration: 0.6,
                                y: 20,
                            })}
                            className="mb-8 max-w-2xl text-center text-lg leading-relaxed tracking-tight break-words text-gray-700 dark:text-gray-400"
                        >
                            Access premium UI components, pre‑built blocks, and comprehensive guides to
                            accelerate your workflow for{" "}
                            <motion.span
                                {...zoomIn({ delay: 0.3, duration: 0.5 })}
                                className="inline-block w-20 text-left font-semibold text-gray-900 dark:text-gray-100"
                            >
                                <TextLoop className="font-mono text-lg font-normal">
                                    <span>Startup</span>
                                    <span>Agencies</span>
                                    <span>Teams</span>
                                    <span>Designers</span>
                                </TextLoop>
                            </motion.span>
                        </motion.div>

                        <motion.div
                            ref={ref}
                            {...zoomIn({
                                delay: 0.6,
                                duration: 0.5,
                            })}
                            className="mb-4 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                        >
                            <Button
                                size="lg"
                                className="group cursor-pointer rounded-full bg-indigo-700/90 px-8 py-5.5 text-sm text-white shadow-none hover:bg-indigo-700"
                            >
                                <Link
                                    href="/components"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    Browse components
                                    <RiArrowRightUpLine className="group-hover:rotate-45 transition-all duration-500" />
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="flex items-center space-x-2 rounded-full px-8 py-5.5 text-sm shadow-none"
                            >
                                <Link
                                    href="/docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read the docs
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.p
                            {...fadeUp({ delay: 0.8, duration: 0.4 })}
                            className="text-xs text-gray-700 dark:text-gray-400"
                        >
                            Free and open-source forever.
                        </motion.p>
                    </div>
                </div>
            </section>
        );
    },
);

Hero.displayName = "Hero";

export default Hero;

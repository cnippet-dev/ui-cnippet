import React from "react";
import { RiArrowRightLine } from "@remixicon/react";
import { motion } from "motion/react";
import { fadeUp, fadeUpBlur, zoomIn } from "cnippet-aos";

const Cta = () => {
    return (
        <>
            <section className="mx-auto w-full max-w-[1536px] border-t-0 border-b bg-blue-700 pl-8 text-white md:pl-10 xl:pl-20 2xl:pl-30 dark:border-neutral-800">
                <div className="grid grid-cols-6 divide-x dark:divide-neutral-800">
                    <div className="col-span-5 py-28">
                        <motion.h2
                            className="text-2xl leading-tight font-medium tracking-tight md:text-5xl"
                            {...fadeUpBlur({ delay: 0.1, duration: 0.8 })}
                        >
                            Ready to Build Your Next Project?
                        </motion.h2>
                        <motion.p
                            className="mt-4 text-gray-100"
                            {...fadeUp({ delay: 0.25, duration: 0.6, y: 16 })}
                        >
                            Explore our complete ecosystem: UI components for
                            custom interfaces, website templates for quick
                            deployment, and comprehensive guides for advanced
                            implementation. Everything you need to succeed in
                            web development.
                        </motion.p>
                    </div>
                    <motion.div
                        className="col-span-1 flex items-center justify-center bg-white dark:bg-black"
                        {...zoomIn({ delay: 0.3, duration: 0.5 })}
                    >
                        <RiArrowRightLine className="text-blue-800" size={60} />
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Cta;

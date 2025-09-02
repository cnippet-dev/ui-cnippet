import React, { forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import {
    RiFacebookBoxFill,
    RiGithubFill,
    RiTiktokFill,
    RiTwitterFill,
    RiArrowRightLine,
} from "@remixicon/react";

import MorphingDialogBasicTwo from "@/registry/default/motions/morphing-dialog/morphing-dialog-demo";
import Chart1 from "@/registry/default/charts/bar-chart/bar-chart-demo";
import Chart2 from "@/registry/default/charts/line-chart/line-chart-demo";
import Chart3 from "@/registry/default/charts/pie-chart/pie-chart-demo";
import Cursor1 from "@/registry/default/motions/cursor/cursor-demo";
import { InfiniteSlider } from "@/components/motion/infinite-slider";
import { Grid, Block } from "@/components/motion/grid";
import AppleStyleDock from "@/registry/default/motions/dock/dock-demo";
import TiltCard1 from "@/registry/default/motions/tilt/tilt-demo";
import { fadeUp } from "@/lib/motion";
import { motion } from "motion/react";

const images = [
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h1.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h3.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h7.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h8.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h9.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h10.jpg",
];

const Components = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
    return (
        <>
            <section className="relative h-full">
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

                <div className="relative z-10">
                    <div className="mx-auto max-w-7xl text-left">
                        <div className="max-w-2xl px-4 py-16">
                            <motion.h2
                                className="text-4xl font-medium tracking-tight text-black md:text-4xl dark:text-white"
                                {...fadeUp({
                                    delay: 0.2,
                                    duration: 0.6,
                                    scroll: true,
                                })}
                            >
                                Production React Components Library
                            </motion.h2>
                            <motion.p
                                {...fadeUp({
                                    delay: 0.6,
                                    duration: 0.6,
                                    y: 20,
                                    scroll: true,
                                })}
                                className="mt-2 text-gray-500"
                            >
                                Discover our collection of tested React
                                components, featuring advanced animations, data
                                visualization, and interactive UI elements.
                            </motion.p>
                        </div>
                        <div 
                        ref={ref}
                        className="grid divide-y divide-dashed border-t border-dashed px-0.5 md:grid-cols-6 dark:divide-neutral-800 dark:border-neutral-800">
                            <Link
                                href="/motions/infinite-slider"
                                className="overflow-hidden border-r px-5 pb-10 md:col-span-4"
                            >
                                <h3 className="font-ins py-4 text-left leading-none font-semibold tracking-tight">
                                    Infinite Slider
                                </h3>
                                <InfiniteSlider gap={24}>
                                    {images.map((image, i) => (
                                        <CldImage
                                            key={i}
                                            src={image}
                                            alt="Apple Music logo"
                                            width={1920}
                                            height={1080}
                                            sizes="100vw"
                                            className="aspect-square w-24 object-cover md:w-36"
                                        />
                                    ))}
                                </InfiniteSlider>
                            </Link>
                            <div className="grid px-5 pb-5 md:col-span-2 md:py-0">
                                <h3 className="font-ins pt-4 text-left leading-none font-semibold tracking-tight">
                                    Morphing Dialog
                                </h3>
                                <div className="">
                                    <MorphingDialogBasicTwo />
                                </div>
                            </div>
                            <Link
                                href="/motions/cursor"
                                className="border-r p-0 md:col-span-3 md:px-5"
                            >
                                <h3 className="font-ins pt-4 text-left leading-none font-semibold tracking-tight">
                                    Custom Cursor
                                </h3>
                                <Cursor1 />
                            </Link>
                            <Link
                                href="/motions/grid"
                                className="flex flex-col md:col-span-3"
                            >
                                <h3 className="font-ins px-5 pt-4 text-left leading-none font-semibold tracking-tight">
                                    Interactive Grid
                                </h3>
                                <Grid>
                                    <Block className="col-span-12 row-span-2 md:col-span-6 dark:border-neutral-900 dark:bg-neutral-950">
                                        <Image
                                            src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/a1.jpg"
                                            alt="avatar"
                                            width={1920}
                                            height={1080}
                                            className="mb-4 size-14 rounded-full object-cover"
                                        />
                                        <h1 className="mb-6 text-2xl leading-tight font-medium md:mb-12 md:text-3xl">
                                            Hi there.{" "}
                                            <span className="text-zinc-400">
                                                Welcome to Cnippet UI
                                            </span>
                                        </h1>
                                    </Block>

                                    {[
                                        RiFacebookBoxFill,
                                        RiTiktokFill,
                                        RiTwitterFill,
                                        RiGithubFill,
                                    ].map((Icon, idx) => (
                                        <Block
                                            key={idx}
                                            className="col-span-6 bg-black md:col-span-3 dark:border-neutral-800"
                                            whileHover={{
                                                rotate:
                                                    idx % 2
                                                        ? "-2.5deg"
                                                        : "2.5deg",
                                                scale: 1.1,
                                            }}
                                        >
                                            <div className="grid h-full place-content-center text-3xl text-white">
                                                <Icon className="size-10" />
                                            </div>
                                        </Block>
                                    ))}
                                </Grid>
                            </Link>

                            <Link
                                href="/motions/dock"
                                className="relative flex flex-col items-center justify-start border-r px-5 pb-10 md:col-span-4"
                            >
                                <h3 className="font-ins py-4 text-left leading-none font-semibold tracking-tight">
                                    Dock
                                </h3>
                                <AppleStyleDock />
                            </Link>

                            <Link
                                href="/motions/tilt"
                                className="relative flex flex-col items-center justify-center px-5 pb-10 md:col-span-2"
                            >
                                <h3 className="font-ins py-4 text-left leading-none font-semibold tracking-tight">
                                    Tilt Card
                                </h3>
                                <TiltCard1 />
                            </Link>

                            <Link
                                href="/charts/bar-chart"
                                className="border-r px-5 py-5 md:col-span-2 md:pb-10"
                            >
                                {/* <h3 className="py-2 text-left font-mono text-xl leading-tight font-medium text-neutral-500 group-hover:text-black dark:group-hover:text-white">
                                    Bar Chart
                                </h3> */}
                                <Chart1 />
                            </Link>
                            <Link
                                href="/charts/line-chart"
                                className="border-r px-5 py-5 md:col-span-2 md:pb-10"
                            >
                                {/* <h3 className="py-2 text-left font-mono text-xl leading-tight font-medium text-neutral-500 group-hover:text-black dark:group-hover:text-white">
                                    Line Chart
                                </h3> */}
                                <Chart2 />
                            </Link>
                            <Link
                                href="/charts/pie-chart"
                                className="border-b px-5 py-5 md:col-span-2 md:pb-10 dark:border-neutral-900"
                            >
                                {/* <h3 className="py-2 text-left font-mono text-xl leading-tight font-medium text-neutral-500 group-hover:text-black dark:group-hover:text-white">
                                    Pie Chart
                                </h3> */}
                                <Chart3 />
                            </Link>
                        </div>

                        <div className="grid h-12 grid-cols-6 divide-x divide-dashed border-t-0 border-dashed dark:divide-neutral-800 dark:border-neutral-800">
                            <div className="col-span-1 hidden md:block"></div>
                            <div className="col-span-1 hidden md:block"></div>
                            <div className="col-span-1 hidden md:block"></div>

                            <div className="col-span-1 hidden md:block"></div>
                            <div className="col-span-3 h-full w-full md:col-span-2">
                                <Link
                                    href="https://ui.cnippet.site"
                                    className="group relative flex h-full w-full items-center justify-center overflow-hidden bg-blue-700"
                                >
                                    <div className="absolute inset-0 w-full -translate-x-[100%] bg-blue-800 transition-transform duration-300 group-hover:translate-x-[0%] dark:bg-blue-600" />
                                    <span className="relative z-10 flex w-full items-center justify-between gap-2 px-4 text-lg text-white duration-300 group-hover:text-white">
                                        Explore More
                                        <RiArrowRightLine
                                            className="text-white"
                                            size={20}
                                        />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="grid h-32 grid-cols-4 divide-x divide-dashed border-t border-b border-dashed md:h-52 md:grid-cols-6 dark:divide-neutral-800 dark:border-neutral-800">
                            <div className="col-span-1 hidden md:block"></div>
                            <div className="col-span-1 hidden md:block"></div>
                            <div className="col-span-1"></div>
                            <div className="col-span-1"></div>
                            <div className="col-span-1"></div>
                            <div className="col-span-1"></div>
                        </div>
                    </div>
                </div>
                <div className="border border-t-0 border-b-0 dark:border-neutral-800"></div>
            </section>
        </>
    );
});

Components.displayName = "Components";

export default Components;

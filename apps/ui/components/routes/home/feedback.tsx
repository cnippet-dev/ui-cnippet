import React from "react";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

const Feedback = () => {
    return (
        <>
            <section className="mx-auto w-full max-w-full border-t-0 border-b px-4 md:px-10 xl:px-20 2xl:px-30 dark:border-neutral-800 dark:bg-black">
                <div className="border border-t-0 border-b-0 dark:border-neutral-800">
                    <div className="grid grid-cols-6 divide-x divide-y dark:divide-neutral-800 dark:border-neutral-800">
                        <div className="dark:bg-muted/50 col-span-6 border-r-0 bg-white px-10 py-8 text-center md:py-16">
                            <p className="text-3xl font-medium">
                                &quot;Cnippet&apos;s production components
                                reduced our development time by 40% and improved
                                our application performance by 35%. The best
                                React component library for modern web
                                applications.&quot;
                            </p>
                            <div className="mt-5 flex items-center justify-center gap-2">
                                <p className="text-gray-500">
                                    Sarah Lin, Frontend Engineering Lead at
                                    TechFlow Analytics
                                </p>
                                <Link
                                    href="/"
                                    className="group relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-neutral-900"
                                >
                                    <div className="absolute inset-0 w-full -translate-x-[100%] bg-black transition-transform duration-300 group-hover:translate-x-[0%] dark:bg-white" />
                                    <RiArrowRightLine className="relative z-10 text-lg text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-6 border-b bg-white px-10 py-8 text-left md:col-span-3 md:border-b-0 md:py-16 dark:bg-black">
                            <p className="text-2xl font-medium">
                                &quot;Implementing Cnippet&apos;s accessible
                                components helped us achieve WCAG 2.1 Level AA
                                compliance in just 2 weeks, significantly
                                improving our user experience for all
                                customers.&quot;
                            </p>
                            <div className="mt-5 flex items-center justify-start gap-2">
                                <p className="text-gray-500">
                                    Michael Chen, Senior Developer at HealthTech
                                    Solutions
                                </p>
                                <Link
                                    href="/"
                                    className="group relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-neutral-900"
                                >
                                    <div className="absolute inset-0 w-full -translate-x-[100%] bg-black transition-transform duration-300 group-hover:translate-x-[0%] dark:bg-white" />
                                    <RiArrowRightLine className="relative z-10 text-lg text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black" />
                                </Link>
                            </div>
                        </div>
                        <div className="dark:bg-muted/50 col-span-6 border-b-0 bg-white px-10 py-8 text-left md:col-span-3 md:py-16">
                            <p className="text-xl font-medium">
                                &quot;From our startup MVP to our current
                                platform serving 1M+ users, Cnippet&apos;s
                                scalable components have been crucial to our
                                growth. The performance optimization is
                                outstanding.&quot;
                            </p>
                            <div className="mt-5 flex items-center justify-start gap-2">
                                <p className="text-gray-500">
                                    Emma Johnson, CTO at CloudForge Technologies
                                </p>
                                <Link
                                    href="/"
                                    className="group relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-neutral-900"
                                >
                                    <div className="absolute inset-0 w-full -translate-x-[100%] bg-black transition-transform duration-300 group-hover:translate-x-[0%] dark:bg-white" />
                                    <RiArrowRightLine className="relative z-10 text-lg text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Feedback;

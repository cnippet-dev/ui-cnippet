import React from "react";

const Features = () => {
    return (
        <>
            <section className="mx-auto w-full max-w-full border-t-0 border-b px-4 md:px-10 xl:px-20 2xl:px-30 dark:border-neutral-800 dark:bg-black">
                <div className="border border-t-0 border-b-0 dark:border-neutral-800">
                    <div className="grid grid-cols-6 divide-x-0 divide-y md:divide-x md:divide-y-0 dark:divide-neutral-800 dark:border-neutral-800">
                        <div className="col-span-6 px-4 pt-10 md:col-span-2">
                            <h2 className="text-2xl leading-tight font-medium tracking-tight md:text-4xl">
                                Production React Components Library
                            </h2>
                            <p className="mt-2 text-gray-500">
                                Discover our collection of tested React
                                components, featuring advanced animations, data
                                visualization, and interactive UI elements.
                            </p>
                        </div>
                        <div className="col-span-6 px-4 py-10 md:col-span-3">
                            <div className="flex flex-col items-start justify-start gap-2">
                                <h3 className="text-2xl font-semibold tracking-tight">
                                    Accelerate Development with Ready-to-Use
                                    Components
                                </h3>
                                <p className="text-gray-500">
                                    Reduce development time by 60% with our
                                    comprehensive library of pre-built,
                                    customizable components. Each component is
                                    optimized for performance and follows
                                    industry best practices.
                                </p>
                            </div>
                            <div className="mt-20 flex flex-col items-start justify-start gap-2">
                                <h3 className="text-2xl font-semibold tracking-tight">
                                    TypeScript-First Development Experience
                                </h3>
                                <p className="text-gray-500">
                                    Enjoy full type safety and enhanced
                                    developer experience with our
                                    TypeScript-first approach. Comprehensive
                                    type definitions and documentation ensure
                                    reliable development.
                                </p>
                            </div>
                            <div className="mt-24 flex flex-col items-start justify-start gap-2">
                                <h3 className="text-2xl font-semibold tracking-tight">
                                    Scale Your Applications with Confidence
                                </h3>
                                <p className="text-gray-500">
                                    Build scalable applications with components
                                    that handle complex data flows, state
                                    management, and real-time updates. Perfect
                                    for modern web applications and high-traffic
                                    websites.
                                </p>
                            </div>
                        </div>
                        <div className="col-span-1"></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;

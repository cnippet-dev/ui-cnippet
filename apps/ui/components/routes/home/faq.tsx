import React from "react";

import { AtSignIcon, CommandIcon, EclipseIcon } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/motion/cn-accordion";

const items = [
    {
        id: "1",
        title: "What is the difference between ui.cnippet.site and block.cnippet.site?",
        icon: AtSignIcon,
        content:
            "ui.cnippet.site provides individual UI components like buttons, dialogs, accordions, motion effects, and charts that you can use to build custom interfaces. block.cnippet.site offers complete sections, pages, and full website templates that you can use as starting points for entire websites. 🚀",
    },
    {
        id: "2",
        title: "How quickly can I integrate components from ui.cnippet.site?",
        icon: CommandIcon,
        content:
            "Extremely fast! Our UI components are copy-paste ready with built-in Tailwind styling. No complex setup or configuration needed - just copy, paste, and launch in seconds. Perfect for rapid prototyping and production builds. ⚡",
    },
    {
        id: "3",
        icon: EclipseIcon,
        title: "What kind of templates are available on block.cnippet.site?",
        content:
            "We offer 100+ templates including landing pages, about pages, contact forms, pricing pages, blog layouts, e-commerce templates, and complete website solutions. All templates are responsive, customizable, and ready for immediate deployment. 💼",
    },
    {
        id: "4",
        icon: EclipseIcon,
        title: "What topics are covered in next.cnippet.site?",
        content:
            "next.cnippet.site provides 200+ guides covering authentication systems, payment gateway integration, SEO optimization, performance tuning, deployment strategies, and advanced web development techniques. Perfect for developers at all skill levels. ♿️",
    },
    {
        id: "5",
        icon: EclipseIcon,
        title: "Do you support both TypeScript and JavaScript?",
        content:
            "Yes! All our components and templates are designed for both TypeScript and JavaScript developers. Enjoy the same high-quality components regardless of your preference, with full type safety and documentation for TypeScript users. 🛠️",
    },
    {
        id: "6",
        icon: EclipseIcon,
        title: "What kind of support do you offer?",
        content:
            "We provide comprehensive support through our Discord community for real-time assistance. For critical issues, we offer 24-hour response times. Plus, our extensive documentation and examples make implementation smooth across all our platforms. 💬",
    },
];

const Faq = () => {
    return (
        <>
            <section className="relative mx-auto w-full max-w-[1536px] border-t-0 border-b px-4 md:px-10 xl:px-20 2xl:px-30 dark:border-neutral-800">
                <div className="relative">
                    {/* <div className="absolute -top-2.5 -left-2.5 z-50 mx-auto grid size-5 grid-cols-2 grid-rows-2 divide-y divide-neutral-500">
            <div className=" border-r" />
            <div className="border-r-0" />
            <div className="border-b-0 border-r" />
            <div className=" " />
          </div> */}
                    <div className="absolute -top-1.5 -left-1.5 size-3 bg-neutral-500"></div>
                </div>

                <div className="">
                    <div className="grid h-full w-full divide-x-0 divide-y border border-t-0 md:grid-cols-4 md:divide-x md:divide-y-0 dark:divide-neutral-900 dark:border-neutral-900">
                        <div className="col-span-1 w-full bg-white px-4 py-8 text-left md:px-10 md:py-16 dark:bg-black">
                            <div className="sticky top-20">
                                <h2 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl">
                                    Frequently asked questions.
                                </h2>
                            </div>
                        </div>
                        <div className="col-span-4 md:col-span-3">
                            <div className="grid size-32 w-full max-w-full grid-cols-2 divide-x border-b dark:divide-neutral-900 dark:border-neutral-900">
                                <div />
                                <div />
                            </div>
                            <div>
                                <Accordion
                                    iconVariant="plus-minus"
                                    className="flex w-full max-w-full flex-col divide-y divide-zinc-200 dark:divide-neutral-900"
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {items.map((item, i) => (
                                        <AccordionItem
                                            key={i}
                                            value={item.id}
                                            className="px-4 py-4 md:px-8"
                                        >
                                            <AccordionTrigger className="w-full cursor-pointer text-left text-zinc-950 dark:text-zinc-50">
                                                <div className="flex items-center justify-between gap-2">
                                                    <div>{item.title}</div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <p className="mt-1 font-normal text-neutral-600 dark:text-neutral-400">
                                                    {item.content}
                                                </p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                            <div className="grid size-32 w-full max-w-full grid-cols-2 divide-x border-t dark:divide-neutral-900 dark:border-neutral-900">
                                <div />
                                <div />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="dark:bg-black">
                <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
                    <div className="relative w-full"></div>
                </div>
            </section>
        </>
    );
};

export default Faq;

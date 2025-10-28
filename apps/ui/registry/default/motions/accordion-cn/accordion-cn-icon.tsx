import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/motion/cn-accordion";
import React from "react";
import { AtSignIcon, CommandIcon, EclipseIcon, ZapIcon } from "lucide-react";

const items = [
    {
        id: "1",
        title: "Is cnippet/ui accessible?",
        icon: AtSignIcon,
        content:
            "Yes. It adheres to the WAI-ARIA design pattern, making it accessible for users with disabilities. It also supports screen readers and other assistive technologies.",
    },
    {
        id: "2",
        title: "Does cnippet/ui have a dark mode?",
        icon: CommandIcon,
        content:
            "Yes. It has a dark mode that can be toggled in the settings. Dark mode is designed to reduce eye strain, especially in low-light environments.",
    },
    {
        id: "3",
        icon: EclipseIcon,
        title: "Is cnippet/ui responsive?",
        content:
            "Yes. It's fully responsive and works seamlessly across devices with different screen sizes, from mobile phones to large desktop monitors.",
    },
];

const AccordionIcon = () => {
    return (
        <Accordion
            iconVariant="plus-minus"
            className="flex w-full max-w-lg flex-col divide-y divide-zinc-200 dark:divide-zinc-700"
            transition={{ duration: 0.2, ease: "easeInOut" }}
        >
            {items.map((item, i) => (
                <AccordionItem key={i} value={item.id} className="py-2">
                    <AccordionTrigger className="w-full text-left text-zinc-950 dark:text-zinc-50">
                        <div className="flex items-center justify-between gap-2">
                            <span>
                                <item.icon className="size-4 text-neutral-400" />
                            </span>
                            <div>{item.title}</div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="pl-5 text-zinc-500 dark:text-zinc-400">
                            {item.content}
                        </p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default AccordionIcon;

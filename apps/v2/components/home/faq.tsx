"use client";

import { Plus } from "lucide-react";
import { FullWidthBorder } from "@/components/layout/full-width-border";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    answer:
      "Cnippet UI is a collection of accessible, composable React components built with Base UI and Tailwind CSS. Copy the code and own it completely — no npm package, no lock-in.",
    question: "What is Cnippet UI?",
  },
  {
    answer:
      "Run `npx cnippet@latest init` to wire up your config and install the CSS tokens. Then `npx cnippet add button` to drop your first component in. The whole thing takes under 2 minutes.",
    question: "How do I get started with Cnippet UI?",
  },
  {
    answer:
      "Cnippet UI works with Next.js, Vite, Remix, Astro, and plain React — anything that renders JSX and uses Tailwind CSS v4. TypeScript is required.",
    question: "What frameworks does Cnippet UI support?",
  },
  {
    answer:
      "Fully MIT licensed. Use it in personal projects, client work, and commercial products. No restrictions, no enterprise tier, no gated features — ever.",
    question: "Is Cnippet UI free for commercial use?",
  },
  {
    answer:
      "Every component ships with TypeScript types, dark mode support, and full Tailwind CSS customization. Colors, spacing, radii, and behavior are all adjustable — they live in your codebase, so you own them completely.",
    question: "How customizable are the components?",
  },
  {
    answer:
      "Every component targets WCAG 2.1 AA. Built on Base UI primitives which provide ARIA roles, keyboard navigation, and focus management out of the box — not as an afterthought.",
    question: "Are the components accessible?",
  },
  {
    answer:
      "Cnippet is also a design studio that builds websites, web applications, and design systems for clients. The open-source UI components are a byproduct of that client work — same quality, shared with developers worldwide.",
    question: "What's Cnippet the studio?",
  },
];

export function FAQ() {
  return (
    <section className="relative pt-12">
      <FullWidthBorder className="top-0" />
      <div className="grid grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-4">
          <p className="font-medium font-mono text-cnippet-orange text-sm">
            [faq]
          </p>
          <h2 className="mt-2 w-full font-f37-stout text-4xl sm:text-3xl md:text-4xl">
            Questions
            <br />
            people
            <br />
            actually ask.
          </h2>
          <p className="mt-4 max-w-xs text-balance text-muted-foreground text-sm leading-relaxed">
            Still have questions? Reach us at hello@cnippet.dev or open an issue
            on GitHub.
          </p>
        </div>

        <div className="md:col-span-8">
          <Accordion className="flex flex-col gap-0">
            {faqs.map((faq, index) => (
              <AccordionItem
                className="border-b border-dashed last:border-b-0"
                key={index}
                value={index}
              >
                <AccordionTrigger
                  className="py-5 font-medium text-sm"
                  icon={
                    <Plus className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 [[data-panel-open]>&]:rotate-45" />
                  }
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionPanel className="pt-0 pb-5 text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

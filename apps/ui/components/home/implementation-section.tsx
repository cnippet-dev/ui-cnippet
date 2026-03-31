"use client";

import { fadeUpBlur } from "cnippet-aos";
import { motion } from "motion/react";
import { useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { codeSnippets } from "@/components/home/code-snippets";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { BorderBottomWithDots, BorderTopWithDots } from "../grid-design";

const langTabs = [
  {
    icon: (
      <svg
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
      </svg>
    ),
    label: "CLI",
    value: "cli",
  },
  {
    icon: (
      <svg
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    label: "Manual",
    value: "manual",
  },
  {
    icon: (
      <svg
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: "Usage",
    value: "usage",
  },
];

export function ImplementationSection({
  highlightedSnippets,
}: {
  highlightedSnippets: Record<string, string>;
}) {
  const [_activeTab, setActiveTab] = useState("cli");

  return (
    <section className="relative">
      <div className="relative px-4 md:px-0">
        <BorderTopWithDots />

        <div className="mx-auto flex max-w-6xl items-center border-x px-4 pt-6 pb-4">
          <div className="relative flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
            <motion.h2
              className="font-normal text-2xl uppercase sm:text-3xl md:text-6xl"
              {...fadeUpBlur({
                delay: 0.1,
                duration: 0.5,
                scroll: true,
                y: 20,
              })}
            >
              Get Started
            </motion.h2>
            <motion.p
              className="text-neutral-400 text-xs md:w-72 md:text-right"
              {...fadeUpBlur({
                delay: 0.2,
                duration: 0.5,
                scroll: true,
                y: 20,
              })}
            >
              Use the CLI or copy-paste the source code. You own everything — no
              packages, no lock-in.
            </motion.p>
          </div>
        </div>

        <BorderBottomWithDots />
      </div>

      <div className="relative px-4 md:px-0">
        <div className="mx-auto max-w-6xl overflow-hidden border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl overflow-hidden rounded-none"
            {...fadeUpBlur({ delay: 0.3, duration: 0.5, scroll: true, y: 20 })}
          >
            <Tabs
              defaultValue="cli"
              onValueChange={(val) => {
                setActiveTab(val as string);
              }}
            >
              <TabsList variant="underline">
                {langTabs.map((tab) => (
                  <TabsTab key={tab.value} value={tab.value}>
                    {tab.icon}
                    <span className="text-sm">{tab.label}</span>
                  </TabsTab>
                ))}
              </TabsList>

              {Object.entries(highlightedSnippets).map(([lang, html]) => (
                <TabsPanel key={lang} value={lang}>
                  <figure
                    className="relative max-h-full overflow-auto"
                    data-rehype-pretty-code-figure=""
                  >
                    <CopyButton
                      className="top-2 right-2 opacity-70 hover:opacity-100"
                      value={codeSnippets[lang] ?? ""}
                    />
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </figure>
                </TabsPanel>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

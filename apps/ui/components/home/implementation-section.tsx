"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { codeSnippets } from "@/components/home/code-snippets";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";

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
    <section className="border-b px-4 md:px-0">
      <div className="relative mx-auto max-w-6xl overflow-hidden border-neutral-200 border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8 dark:border-neutral-800">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
          <Badge className="rounded-full border-blue-500/30 bg-blue-600 px-2 py-0.5 text-white text-xs hover:bg-blue-600">
            Get Started
          </Badge>
          <h1 className="mb-3 font-figtree font-medium text-2xl text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
            Add components in seconds
          </h1>
          <p className="max-w-xl text-muted-foreground text-sm sm:text-base md:text-lg">
            Use the CLI or copy-paste the source code. You own everything — no
            packages, no lock-in.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-none sm:mt-12">
          <Tabs
            defaultValue="cli"
            onValueChange={(val) => {
              setActiveTab(val as string);
            }}
          >
            <TabsList variant="underline">
              {langTabs.map((tab) => (
                <TabsTab
                  // className="flex items-center gap-2 rounded-none border-transparent px-4 py-3 text-neutral-500 hover:text-neutral-700 data-active:border-blue-500 data-active:border-b-2 data-active:bg-neutral-300/50 data-active:text-foreground dark:text-neutral-400 dark:hover:text-neutral-200 dark:data-active:bg-neutral-800/50 dark:data-active:text-white sm:px-5"
                  key={tab.value}
                  value={tab.value}
                >
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
        </div>
      </div>
    </section>
  );
}

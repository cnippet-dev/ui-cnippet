"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { codeSnippets } from "@/components/home/code-snippets";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { BorderBottomWithDots } from "../grid-design";

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

function Badge({
  badgeText,
  badgeLink,
  badgeLinkText,
  position,
}: {
  badgeText: string;
  badgeLink?: string;
  badgeLinkText?: string;
  position?: "center" | "left" | "right";
}) {
  return (
    <div
      className={`relative mr-auto w-fit bg-foreground/5 p-1 ${position === "center" ? "mx-auto" : position === "left" ? "mr-auto" : "ml-auto"} `}
    >
      <div
        aria-hidden="true"
        className="absolute top-1 left-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute top-1 right-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1 left-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute right-1 bottom-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div className="relative flex h-fit items-center gap-2 px-3">
        <span className="text-sm text-title">{badgeText}</span>
        {badgeLink && (
          <>
            <span className="block h-3 w-px bg-foreground/5" />
            <a className="text-primary text-sm" href={badgeLink}>
              {badgeLinkText}
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export function ImplementationSection({
  highlightedSnippets,
}: {
  highlightedSnippets: Record<string, string>;
}) {
  const [_activeTab, setActiveTab] = useState("cli");

  return (
    <section className="relative px-4 md:px-0">
      <div className="relative mx-auto max-w-6xl overflow-hidden border-neutral-200 border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8 dark:border-neutral-800">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
          <Badge badgeText="Get Started" position="center" />

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
      <BorderBottomWithDots />
    </section>
  );
}

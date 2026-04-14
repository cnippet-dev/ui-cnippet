"use client";

import { useState } from "react";
import { HomeCodeBlock } from "./home-code-block";
import HomeSnippetInstall from "./home-snippet-install";
import { CornerPlus } from "./ui/corner-plus";

const PACKAGES = [
  { id: "core", label: "@browser-ai/core" },
  { id: "transformers-js", label: "@browser-ai/transformers-js" },
  { id: "web-llm", label: "@browser-ai/web-llm" },
] as const;

export type PackageId = (typeof PACKAGES)[number]["id"];

export function HomeCodeSection() {
  const [activePackage, setActivePackage] = useState<PackageId>("core");

  return (
    <div className="relative mt-10 before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] before:bg-gray-950/5 after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 sm:mt-20 dark:after:bg-white/10 dark:before:bg-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,2fr)_minmax(0,3fr)]">
        {/* Install snippet section */}
        <div className="hidden items-center justify-center border-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed py-8 [--pattern-fg:var(--color-black)]/5 max-lg:border-b sm:flex lg:border-r lg:px-8 lg:py-12 dark:[--pattern-fg:var(--color-white)]/10">
          <HomeSnippetInstall
            onValueChange={setActivePackage}
            value={activePackage}
          />
        </div>

        {/* Code block section */}
        <div className="relative bg-gray-950/5 p-2 dark:bg-white/10">
          <CornerPlus />

          <HomeCodeBlock
            onValueChange={setActivePackage}
            value={activePackage}
          />
        </div>
      </div>
    </div>
  );
}

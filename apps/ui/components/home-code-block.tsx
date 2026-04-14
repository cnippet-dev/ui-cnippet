"use client";

import {
  type BundledLanguage,
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/kibo-ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PackageId } from "./home-code-section";

const packages: { id: PackageId; name: string; description: string }[] = [
  {
    description: "Chrome & Edge browser AI",
    id: "core",
    name: "@browser-ai/core",
  },
  {
    description: "Transformers.js models",
    id: "transformers-js",
    name: "@browser-ai/transformers-js",
  },
  {
    description: "WebLLM models",
    id: "web-llm",
    name: "@browser-ai/web-llm",
  },
];

const codeExamples: Record<
  PackageId,
  { language: string; filename: string; code: string }[]
> = {
  core: [
    {
      code: `import { streamText } from "ai";
import { browserAI } from "@browser-ai/core";

const result = streamText({
  model: browserAI(),
  prompt: 'Hello, how are you',
});

for await (const chunk of result.textStream) {
  console.log(chunk);
}`,
      filename: "example.ts",
      language: "typescript",
    },
  ],
  "transformers-js": [
    {
      code: `import { streamText } from "ai";
import { transformersJS } from "@browser-ai/transformers-js";

const result = streamText({
  model: transformersJS("HuggingFaceTB/SmolLM2-360M-Instruct"),
  prompt: 'Hello, how are you',
});

for await (const chunk of result.textStream) {
  console.log(chunk);
}`,
      filename: "example.ts",
      language: "typescript",
    },
  ],
  "web-llm": [
    {
      code: `import { streamText } from "ai";
import { webLLM } from "@browser-ai/web-llm";

const result = streamText({
  model: webLLM("Qwen3-0.6B-q0f16-MLC"),
  prompt: 'Hello, how are you',
});

for await (const chunk of result.textStream) {
  console.log(chunk);
}`,
      filename: "example.ts",
      language: "typescript",
    },
  ],
};

interface HomeCodeBlockProps {
  value: PackageId;
  onValueChange: (value: PackageId) => void;
}

export function HomeCodeBlock({ value, onValueChange }: HomeCodeBlockProps) {
  const _code = codeExamples[value];

  return (
    <Tabs
      className="w-full"
      onValueChange={(v) => onValueChange(v as PackageId)}
      value={value}
    >
      <TabsList className="scrollbar-none w-full justify-start overflow-x-auto p-0">
        {packages.map((pkg) => (
          <TabsTrigger
            className="shrink-0 whitespace-nowrap"
            key={pkg.id}
            value={pkg.id}
          >
            {pkg.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {packages.map((pkg) => {
        const pkgCode = codeExamples[pkg.id];
        return (
          <TabsContent className="mt-0" key={pkg.id} value={pkg.id}>
            <CodeBlock data={pkgCode} defaultValue={pkgCode[0].language}>
              <CodeBlockHeader>
                <div className="flex-1 px-2 text-muted-foreground text-xs">
                  {pkgCode[0].filename}
                </div>
                <CodeBlockCopyButton />
              </CodeBlockHeader>
              <CodeBlockBody>
                {(item) => (
                  <CodeBlockItem key={item.language} value={item.language}>
                    <CodeBlockContent
                      language={item.language as BundledLanguage}
                    >
                      {item.code}
                    </CodeBlockContent>
                  </CodeBlockItem>
                )}
              </CodeBlockBody>
            </CodeBlock>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

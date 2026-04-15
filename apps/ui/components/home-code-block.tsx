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
      code: `# Install all UI components with optimized colors
npx cnippet@latest add ui @cnippet/colors-zinc

# Or add individual components
npx cnippet@latest add button
npx cnippet@latest add dialog
npx cnippet@latest add tabs`,
      filename: "terminal",
      language: "bash",
    },
  ],
  "transformers-js": [
    {
      code: `// 1. Copy the component source into your project
//    e.g. components/ui/button.tsx

// 2. Install the peer dependency
npm install @base-ui-components/react

// 3. Import and use
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button variant="outline">Click me</Button>;
}`,
      filename: "setup.tsx",
      language: "typescript",
    },
  ],
  "web-llm": [
    {
      code: `import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmDialog() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button />}>
        Open Dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <DialogContent>
          <DialogTitle>Are you sure?</DialogTitle>
          <p>This action cannot be undone.</p>
        </DialogContent>
      </Dialog.Portal>
    </Dialog>
  );
}`,
      filename: "confirm-dialog.tsx",
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

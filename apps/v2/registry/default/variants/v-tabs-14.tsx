"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

const files: Record<string, string> = {
  "index.tsx": `import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Button size="lg">Get started</Button>
    </main>
  )
}`,
  "package.json": `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "next": "15.0.0",
    "react": "^19.0.0",
    "tailwindcss": "^4.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`,
  "styles.css": `@import "tailwindcss";

:root {
  --radius: 0.5rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
}`,
};

export function Pattern() {
  const [active, setActive] = useState("index.tsx");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard.writeText(files[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-xl border border-border">
      <Tabs onValueChange={setActive} value={active}>
        <div className="flex items-center justify-between border-border border-b bg-muted/30 pt-2 pr-2 pl-2">
          <TabsList variant="underline">
            {Object.keys(files).map((file) => (
              <TabsTab
                className="rounded-b-none px-3 text-xs"
                key={file}
                value={file}
              >
                {file}
              </TabsTab>
            ))}
          </TabsList>
          <Button
            className="mb-1.5 h-6 gap-1 px-2 text-xs"
            onClick={copy}
            size="sm"
            variant="ghost"
          >
            {copied ? (
              <CheckIcon className="size-3 text-emerald-500" />
            ) : (
              <CopyIcon className="size-3" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        {Object.entries(files).map(([file, content]) => (
          <TabsPanel key={file} value={file}>
            <pre className="overflow-x-auto bg-muted/10 p-4 text-foreground/80 text-xs leading-relaxed">
              <code>{content}</code>
            </pre>
          </TabsPanel>
        ))}
      </Tabs>
    </div>
  );
}

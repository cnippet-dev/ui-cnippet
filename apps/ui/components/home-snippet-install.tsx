"use client";

import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@/components/kibo-ui/snippet";
import type { PackageId } from "./home-code-section";

const commands: { id: PackageId; label: string; code: string }[] = [
  {
    code: "npx cnippet@latest add ui",
    id: "core",
    label: "Cnippet CLI",
  },
  {
    code: "npm install @base-ui/react",
    id: "transformers-js",
    label: "Manual Setup",
  },
  {
    code: `import { Button } from "@/components/ui/button";`,
    id: "web-llm",
    label: "Usage",
  },
];

interface HomeSnippetInstallProps {
  value: PackageId;
  onValueChange: (value: PackageId) => void;
}

const HomeSnippetInstall = ({
  value,
  onValueChange,
}: HomeSnippetInstallProps) => {
  const activeCommand = commands.find((command) => command.id === value);

  return (
    <Snippet onValueChange={(v) => onValueChange(v as PackageId)} value={value}>
      <SnippetHeader className="overflow-hidden">
        <SnippetTabsList className="scrollbar-none w-full justify-start overflow-x-auto p-0">
          {commands.map((command) => (
            <SnippetTabsTrigger key={command.id} value={command.id}>
              <span className="whitespace-nowrap">{command.label}</span>
            </SnippetTabsTrigger>
          ))}
        </SnippetTabsList>
      </SnippetHeader>
      {commands.map((command) => (
        <SnippetTabsContent
          className="flex items-center justify-between"
          key={command.id}
          value={command.id}
        >
          {command.code}
          {activeCommand && (
            <SnippetCopyButton
              onCopy={() =>
                console.log(`Copied "${activeCommand.code}" to clipboard`)
              }
              onError={() =>
                console.error(
                  `Failed to copy "${activeCommand.code}" to clipboard`,
                )
              }
              value={activeCommand.code}
            />
          )}
        </SnippetTabsContent>
      ))}
    </Snippet>
  );
};

export default HomeSnippetInstall;

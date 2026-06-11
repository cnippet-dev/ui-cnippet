"use client";

import {
  CircleDotIcon,
  FolderIcon,
  GitBranchIcon,
  GitPullRequestIcon,
} from "lucide-react";
import { Fragment, useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
} from "@/registry/default/ui/command";

type Result = {
  icon: React.ReactNode;
  label: string;
  meta?: string;
  repo: string;
  type: "issue" | "pr" | "branch" | "file";
  value: string;
};

type ResultGroup = { items: Result[]; label: string; value: string };

const results: ResultGroup[] = [
  {
    items: [
      {
        icon: <CircleDotIcon className="size-4 text-emerald-500" />,
        label: "Fix tooltip positioning",
        meta: "#421",
        repo: "ui-cnippet",
        type: "issue",
        value: "i421",
      },
      {
        icon: <CircleDotIcon className="size-4 text-emerald-500" />,
        label: "Add keyboard shortcut support",
        meta: "#418",
        repo: "ui-cnippet",
        type: "issue",
        value: "i418",
      },
    ],
    label: "Issues",
    value: "issues",
  },
  {
    items: [
      {
        icon: <GitPullRequestIcon className="size-4 text-violet-500" />,
        label: "feat: carousel thumbnails",
        meta: "#89",
        repo: "ui-cnippet",
        type: "pr",
        value: "pr89",
      },
      {
        icon: <GitPullRequestIcon className="size-4 text-violet-500" />,
        label: "chore: update dependencies",
        meta: "#87",
        repo: "ui-cnippet",
        type: "pr",
        value: "pr87",
      },
    ],
    label: "Pull Requests",
    value: "prs",
  },
  {
    items: [
      {
        icon: <GitBranchIcon className="size-4 text-muted-foreground" />,
        label: "feat/command-palette",
        repo: "ui-cnippet",
        type: "branch",
        value: "b1",
      },
      {
        icon: <FolderIcon className="size-4 text-muted-foreground" />,
        label: "registry/default/ui/command.tsx",
        repo: "ui-cnippet",
        type: "file",
        value: "f1",
      },
    ],
    label: "Branches & Files",
    value: "refs",
  },
];

export default function Particle() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Search repository...
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={results}>
          <CommandInput placeholder="Search issues, PRs, branches..." />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(group: ResultGroup, i: number) => (
                <Fragment key={group.value}>
                  {i > 0 && <CommandSeparator />}
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.label}</CommandGroupLabel>
                    <CommandCollection>
                      {(r: Result) => (
                        <CommandItem
                          className="gap-2"
                          key={r.value}
                          onSelect={() => setOpen(false)}
                          value={r.value}
                        >
                          {r.icon}
                          <span className="flex-1 text-sm">{r.label}</span>
                          {r.meta && (
                            <Badge size="sm" variant="secondary">
                              {r.meta}
                            </Badge>
                          )}
                        </CommandItem>
                      )}
                    </CommandCollection>
                  </CommandGroup>
                </Fragment>
              )}
            </CommandList>
          </CommandPanel>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}

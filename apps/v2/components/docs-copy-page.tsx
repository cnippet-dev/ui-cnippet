"use client";

import {
  AiChat02Icon,
  ArrowDown01Icon,
  ChatGptIcon,
  ClaudeIcon,
  Copy01Icon,
  File02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { SITE_URL } from "@/lib/llm/site";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/default/ui/menu";

const V0_LABEL = "Open in v0";

const markdownCache = new Map<string, Promise<string>>();

function loadMarkdown(path: string): Promise<string> {
  let cached = markdownCache.get(path);
  if (!cached) {
    cached = fetch(path).then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${path}`);
      return res.text();
    });
    cached.catch(() => markdownCache.delete(path));
    markdownCache.set(path, cached);
  }
  return cached;
}

async function copyMarkdown(path: string) {
  // Passing a promise to ClipboardItem keeps the user gesture alive in Safari
  // while the markdown is fetched.
  if (typeof ClipboardItem !== "undefined" && navigator.clipboard.write) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": loadMarkdown(path).then(
            (text) => new Blob([text], { type: "text/plain" }),
          ),
        }),
      ]);
      return;
    } catch {
      // Fall through to writeText.
    }
  }
  await navigator.clipboard.writeText(await loadMarkdown(path));
}

export function DocsCopyPage({
  pageUrl,
  registryName,
}: {
  /** Page path, e.g. `/ui/data/accordion`. */
  pageUrl: string;
  /** Registry item to open in v0, when the page documents one. */
  registryName?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const markdownPath = `${pageUrl}.md`;
  const markdownUrl = `${SITE_URL}${markdownPath}`;
  const prompt = encodeURIComponent(
    `Read ${markdownUrl} so I can ask questions about it.`,
  );

  useEffect(() => () => clearTimeout(timeout.current), []);

  const onCopy = async () => {
    clearTimeout(timeout.current);
    try {
      await copyMarkdown(markdownPath);
      setState("copied");
    } catch {
      setState("error");
    }
    timeout.current = setTimeout(() => setState("idle"), 2000);
  };

  const links = [
    { href: markdownPath, icon: File02Icon, label: "View as Markdown" },
    {
      href: `https://chatgpt.com/?hints=search&q=${prompt}`,
      icon: ChatGptIcon,
      label: "Open in ChatGPT",
    },
    {
      href: `https://claude.ai/new?q=${prompt}`,
      icon: ClaudeIcon,
      label: "Open in Claude",
    },
    ...(registryName
      ? [
          {
            href: `https://v0.dev/chat/api/open?url=${encodeURIComponent(`${SITE_URL}/r/${registryName}.json`)}`,
            icon: AiChat02Icon,
            label: V0_LABEL,
          },
        ]
      : []),
  ];

  return (
    <Group aria-label="Page actions">
      <Button onClick={onCopy} size="xs" variant="outline">
        <HugeiconsIcon
          icon={state === "copied" ? Tick02Icon : Copy01Icon}
          strokeWidth={2.5}
        />
        {{ copied: "Copied", error: "Copy failed", idle: "Copy page" }[state]}
      </Button>
      <GroupSeparator />
      <Menu>
        <MenuTrigger
          render={
            <Button
              aria-label="More page actions"
              size="icon-xs"
              variant="outline"
            />
          }
        >
          <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2.5} />
        </MenuTrigger>
        <MenuPopup align="end">
          {links.map(({ href, icon, label }) => (
            <Fragment key={label}>
              {label === V0_LABEL ? <MenuSeparator /> : null}
              <MenuItem
                render={
                  <a href={href} rel="noreferrer" target="_blank">
                    <HugeiconsIcon icon={icon} strokeWidth={2} />
                    {label}
                  </a>
                }
              />
            </Fragment>
          ))}
        </MenuPopup>
      </Menu>
    </Group>
  );
}

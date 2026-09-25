"use client";

import { usePathname } from "next/navigation";
import { PrefetchLink } from "@/components/prefetch-link";
import { cn } from "@/lib/utils";

type PageNode = {
  type: "page";
  name: React.ReactNode;
  url: string;
};

type FolderNode = {
  type: "folder";
  name?: React.ReactNode;
  children?: (PageNode | FolderNode | SeparatorNode)[];
};

type SeparatorNode = {
  type: "separator";
};

export type PageTree = {
  children: (PageNode | FolderNode | SeparatorNode)[];
};

function isFolder(
  node: PageNode | FolderNode | SeparatorNode,
): node is FolderNode {
  return node.type === "folder";
}

function isPage(node: PageNode | FolderNode | SeparatorNode): node is PageNode {
  return node.type === "page";
}

/**
 * The navigation list itself — rendered in the desktop sidebar and inside the
 * mobile sheet. Groups are labelled like comments; the active page is lifted
 * onto a canvas-coloured pill with a signal bar.
 */
export function DocsNav({
  onNavigate,
  tree,
}: {
  onNavigate?: () => void;
  tree: PageTree;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs" className="flex flex-col gap-6">
      {tree.children.map((node, i) => {
        if (!isFolder(node)) return null;
        return (
          <div key={i}>
            {node.name ? (
              <p className="mb-1.5 px-3 font-mono text-[11px] text-faint lowercase">
                {"// "}
                {node.name}
              </p>
            ) : null}
            <ul className="flex flex-col gap-px">
              {node.children?.map((child, j) => {
                if (!isPage(child)) return null;
                const active = pathname === child.url;
                return (
                  <li key={j}>
                    <PrefetchLink
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex h-8 items-center rounded-lg px-3 text-[13.5px] outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "bg-background font-medium text-foreground shadow-xs/5 ring-1 ring-border before:absolute before:inset-y-2 before:-left-px before:w-0.5 before:rounded-full before:bg-signal"
                          : "text-muted-foreground hover:bg-foreground/4 hover:text-foreground",
                      )}
                      href={child.url}
                      onClick={onNavigate}
                    >
                      {child.name}
                    </PrefetchLink>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

/** Desktop sidebar — sits on the chrome beside the canvas, no border. */
export function DocsSidebar({ tree }: { tree: PageTree }) {
  return (
    <aside className="no-scrollbar sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-(--sidebar-width) shrink-0 self-start overflow-y-auto overscroll-contain ps-1 pe-3 pt-4 pb-12 lg:block">
      <DocsNav tree={tree} />
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

type PageTree = {
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

export function DocsSidebar({ tree }: { tree: PageTree }) {
  const pathname = usePathname();

  return (
    <aside className="no-scrollbar sticky top-[calc(var(--header-height)+var(--docs-topbar-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-var(--docs-topbar-height)-var(--footer-height))] self-start overflow-y-auto border-r border-dashed bg-transparent pb-12 lg:block">
      <nav className="px-2">
        <div className="h-(--top-spacing) shrink-0" />
        {tree.children.map((node, i) => {
          if (!isFolder(node)) return null;
          return (
            <div className="mb-4" key={i}>
              {node.name && (
                <p className="mb-1 px-2 py-1 font-medium text-muted-foreground/60 text-xs uppercase tracking-wider">
                  {node.name}
                </p>
              )}
              <ul className="flex flex-col gap-0.5">
                {node.children?.map((child, j) => {
                  if (!isPage(child)) return null;
                  const active = pathname === child.url;
                  return (
                    <li key={j}>
                      <Link
                        className={cn(
                          "block rounded-[2px] px-2 py-[5px] font-medium text-[0.8rem] transition-colors",
                          active
                            ? "bg-background-300 text-foreground"
                            : "text-muted-foreground hover:bg-background-200 hover:text-foreground",
                        )}
                        href={child.url}
                      >
                        {child.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TocEntry = {
  title?: React.ReactNode;
  url: string;
  depth: number;
};

function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "0% 0% -80% 0%" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      }
    };
  }, [ids]);

  return activeId;
}

export function DocsToc({
  toc,
  className,
}: {
  toc: TocEntry[];
  className?: string;
}) {
  const ids = React.useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc],
  );
  const activeId = useActiveHeading(ids);

  if (!toc.length) return null;

  return (
    <div className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
      <p className="sticky top-0 h-6 bg-background font-medium text-primary/80 text-xs">
        On this page
      </p>
      {toc.map((item) => (
        <a
          className="relative text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6 data-[active=true]:text-foreground"
          data-active={item.url === `#${activeId}`}
          data-depth={item.depth}
          href={item.url}
          key={item.url}
        >
          {item.title}
        </a>
      ))}
    </div>
  );
}

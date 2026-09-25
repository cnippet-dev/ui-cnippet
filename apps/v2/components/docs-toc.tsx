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
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

/**
 * A hairline rail with the active heading marked by a signal segment sitting
 * on the rail itself.
 */
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
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="font-mono text-[11px] text-faint lowercase">
        {"// on this page"}
      </p>
      <ul className="relative flex flex-col border-s">
        {toc.map((item) => {
          const active = item.url === `#${activeId}`;
          return (
            <li key={item.url}>
              <a
                className={cn(
                  "relative -ms-px block border-transparent border-s py-1 ps-3 text-[13px] leading-snug transition-colors duration-150 data-[depth=3]:ps-6 data-[depth=4]:ps-9",
                  active
                    ? "border-signal text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                data-active={active}
                data-depth={item.depth}
                href={item.url}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import type * as React from "react";
import { cn } from "@/lib/utils";

/** `// 03 — components` — every section label is written like a comment. */
export function Kicker({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-mono text-[12px] text-faint lowercase tracking-[0.02em]",
        className,
      )}
    >
      <span aria-hidden="true">{"//"}</span>
      {index ? (
        <>
          <span className="text-signal tabular-nums">{index}</span>
          <span aria-hidden="true">—</span>
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}

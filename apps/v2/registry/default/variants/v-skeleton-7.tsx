//biome-ignore-all lint/suspicious/noArrayIndexKey: <>

import { Skeleton } from "@/registry/default/ui/skeleton";

const colWidths = ["w-32", "w-20", "w-24", "w-16", "w-14"];

export function Pattern() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border">
      <div className="flex items-center gap-4 border-b bg-muted/40 px-4 py-3">
        {colWidths.map((w, i) => (
          <Skeleton className={`h-3.5 ${w} shrink-0`} key={i} />
        ))}
      </div>

      {Array.from({ length: 6 }).map((_, row) => (
        <div
          className="flex items-center gap-4 border-b px-4 py-3.5 last:border-b-0"
          key={row}
        >
          <div className="flex w-32 shrink-0 items-center gap-2.5">
            <Skeleton className="size-7 rounded-full" />
            <Skeleton className="h-3.5 flex-1" />
          </div>
          <Skeleton className={"h-5 w-14 shrink-0 rounded-full"} />
          <Skeleton className="h-3.5 w-24 shrink-0" />
          <Skeleton className="h-3.5 w-16 shrink-0" />
          <Skeleton className="h-6 w-14 shrink-0 rounded-md" />
        </div>
      ))}

      <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-3">
        <Skeleton className="h-3.5 w-32" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-7 rounded-md" />
          <Skeleton className="h-7 w-7 rounded-md" />
          <Skeleton className="h-7 w-7 rounded-md" />
        </div>
      </div>
    </div>
  );
}

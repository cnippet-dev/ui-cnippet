//biome-ignore-all lint/suspicious/noArrayIndexKey: <>

import { Skeleton } from "@/registry/default/ui/skeleton";

export function Pattern() {
  return (
    <div className="flex h-80 w-full max-w-2xl overflow-hidden rounded-xl border">
      <div className="flex w-48 shrink-0 flex-col gap-1 border-r bg-muted/30 p-3">
        <div className="mb-2 flex items-center gap-2 px-1 py-1">
          <Skeleton className="size-6 rounded-md" />
          <Skeleton className="h-4 w-20" />
        </div>

        {[60, 44, 52, 36].map((w, i) => (
          <div
            className="flex items-center gap-2 rounded-md px-2 py-1.5"
            key={i}
          >
            <Skeleton className="size-4 rounded-sm" />
            <Skeleton
              className={`h-3.5 w-${w === 60 ? "full" : `[${w}%]`}`}
              style={{ width: `${w}%` }}
            />
          </div>
        ))}

        <div className="mt-3 border-t pt-3">
          {[48, 56].map((w, i) => (
            <div
              className="flex items-center gap-2 rounded-md px-2 py-1.5"
              key={i}
            >
              <Skeleton className="size-4 rounded-sm" />
              <Skeleton className="h-3.5" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 px-2 py-1.5">
          <Skeleton className="size-7 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2.5 w-16" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <Skeleton className="h-5 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-20 rounded-md" />
            <Skeleton className="h-7 w-7 rounded-md" />
          </div>
        </div>

        <div className="flex-1 space-y-4 p-5">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="space-y-2 rounded-lg border p-3" key={i}>
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                className="flex items-center gap-3 rounded-lg border px-3 py-2.5"
                key={i}
              >
                <Skeleton className="size-8 rounded-md" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Separator } from "@/registry/default/ui/separator";
import { Skeleton } from "@/registry/default/ui/skeleton";

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      {/* Skeleton pattern */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between pb-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        <Separator className="opacity-60" />
        {Array.from({ length: 3 }).map((_, i) => {
          const k = `skeleton-list-item-${i}`;
          return (
            <div
              className="flex items-center gap-3 border-border/60 border-b py-3 last:border-b-0"
              key={k}
            >
              <Skeleton className="size-9 shrink-0 rounded-full" />
              <div className="flex flex-1 flex-col gap-1.5">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-7 w-16 rounded-md" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

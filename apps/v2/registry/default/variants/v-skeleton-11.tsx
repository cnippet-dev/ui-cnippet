import { Skeleton } from "@/registry/default/ui/skeleton";

export default function Particle() {
  return (
    <div className="grid w-full max-w-lg grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          className="overflow-hidden rounded-xl border"
          key={String(i)}
        >
          <Skeleton className="aspect-square w-full rounded-none" />
          <div className="space-y-2 p-3">
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton className="size-3 rounded-sm" key={String(j)} />
              ))}
              <Skeleton className="ms-1 h-3 w-8" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-7 w-20 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

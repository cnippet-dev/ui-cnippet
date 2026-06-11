import { Skeleton } from "@/registry/default/ui/skeleton";

export default function Particle() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border">
      <Skeleton className="h-28 w-full rounded-none" />

      <div className="px-5 pb-5">
        <div className="-mt-8 mb-4 flex items-end justify-between gap-3">
          <Skeleton className="size-16 rounded-full ring-4 ring-background" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>

        <div className="space-y-1.5">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="mt-3 space-y-1.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>

        <div className="mt-4 flex items-center gap-4 border-y py-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="flex items-center gap-1.5" key={String(i)}>
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-3.5 w-16" />
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              className="aspect-square w-full rounded-lg"
              key={String(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { Skeleton } from "@/registry/default/ui/skeleton";

const columns = [
  { cards: 3, label: "To Do" },
  { cards: 2, label: "In Progress" },
  { cards: 4, label: "Done" },
];

export default function Particle() {
  return (
    <div className="flex w-full max-w-2xl gap-4 overflow-x-auto pb-2">
      {columns.map(({ cards, label }) => (
        <div
          className="w-60 shrink-0 space-y-3 rounded-xl border bg-muted/30 p-3"
          key={label}
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          {Array.from({ length: cards }).map((_, i) => (
            <div
              className="space-y-2.5 rounded-lg border bg-background p-3"
              key={String(i)}
            >
              <Skeleton className="h-3.5 w-4/5" />
              <Skeleton className="h-3 w-3/5" />
              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-1.5">
                  {Array.from({ length: 2 }).map((_, j) => (
                    <Skeleton
                      className="size-5 rounded-full ring-2 ring-background"
                      key={String(j)}
                    />
                  ))}
                </div>
                <Skeleton className="h-4 w-12 rounded-full" />
              </div>
            </div>
          ))}
          <Skeleton className="h-7 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}

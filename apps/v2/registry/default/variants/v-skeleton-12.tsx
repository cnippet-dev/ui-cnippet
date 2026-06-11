import { Skeleton } from "@/registry/default/ui/skeleton";

const fields = [
  { wide: true },
  { wide: true },
  { wide: false },
  { wide: false },
  { wide: true },
];

export default function Particle() {
  return (
    <div className="w-full max-w-sm space-y-5">
      <div className="space-y-1.5">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-52" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ wide }, i) => (
          <div
            className={`space-y-1.5 ${wide ? "col-span-2" : ""}`}
            key={String(i)}
          >
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-16" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <Skeleton className="h-9 w-20 rounded-lg" />
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>
    </div>
  );
}

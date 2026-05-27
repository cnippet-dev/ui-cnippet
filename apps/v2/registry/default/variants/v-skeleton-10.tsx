import { Skeleton } from "@/registry/default/ui/skeleton";

function SettingsSection({
  rows,
  titleWidth,
}: {
  rows: number;
  titleWidth: string;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Skeleton className={`h-4 ${titleWidth}`} />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            className="flex items-center justify-between gap-4 rounded-lg border px-4 py-3"
            key={i}
          >
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3 w-52" />
            </div>
            {i % 3 === 2 ? (
              <Skeleton className="h-8 w-20 shrink-0 rounded-md" />
            ) : (
              <Skeleton className="h-5 w-9 shrink-0 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-lg space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-3.5 w-48" />
        </div>
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>

      <div className="flex gap-1">
        {[60, 80, 56, 72].map((w, i) => (
          <Skeleton className="h-8 rounded-md" key={i} style={{ width: `${w}px` }} />
        ))}
      </div>

      <SettingsSection rows={3} titleWidth="w-36" />
      <SettingsSection rows={2} titleWidth="w-28" />
    </div>
  );
}

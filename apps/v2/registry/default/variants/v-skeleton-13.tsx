import { Skeleton } from "@/registry/default/ui/skeleton";

const rows = [
  { preview: 80, read: false, subject: 56 },
  { preview: 72, read: false, subject: 48 },
  { preview: 88, read: true, subject: 64 },
  { preview: 60, read: true, subject: 40 },
  { preview: 76, read: true, subject: 52 },
  { preview: 68, read: true, subject: 44 },
];

export default function Particle() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
        <Skeleton className="h-4 w-12" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-20 rounded-md" />
          <Skeleton className="h-7 w-7 rounded-md" />
        </div>
      </div>
      {rows.map(({ preview, read, subject }, i) => (
        <div
          className={`flex items-start gap-3 border-b px-4 py-3 last:border-b-0 ${!read ? "bg-accent/20" : ""}`}
          key={String(i)}
        >
          <Skeleton className="mt-0.5 size-8 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-12 shrink-0" />
            </div>
            <Skeleton className={"h-3.5"} style={{ width: `${subject}%` }} />
            <Skeleton className={"h-3"} style={{ width: `${preview}%` }} />
          </div>
          {!read && (
            <Skeleton className="mt-1.5 size-2 shrink-0 rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
}

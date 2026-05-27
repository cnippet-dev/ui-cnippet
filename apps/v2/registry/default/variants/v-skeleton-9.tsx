import { Skeleton } from "@/registry/default/ui/skeleton";

const messages = [
  { self: false, lines: [72, 56] },
  { self: true, lines: [88] },
  { self: false, lines: [64, 80, 48] },
  { self: true, lines: [76, 60] },
  { self: false, lines: [52] },
];

export function Pattern() {
  return (
    <div className="flex w-full max-w-sm flex-col overflow-hidden rounded-xl border">
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <Skeleton className="size-8 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-4 py-4">
        {messages.map((msg, i) => (
          <div
            className={`flex items-end gap-2 ${msg.self ? "flex-row-reverse" : ""}`}
            key={i}
          >
            {!msg.self && <Skeleton className="mb-0.5 size-7 shrink-0 rounded-full" />}
            <div
              className={`flex max-w-[75%] flex-col gap-1 ${msg.self ? "items-end" : "items-start"}`}
            >
              {msg.lines.map((w, j) => (
                <Skeleton
                  className={`h-8 rounded-2xl ${
                    msg.self
                      ? j === 0
                        ? "rounded-tr-sm"
                        : j === msg.lines.length - 1
                          ? "rounded-br-sm"
                          : ""
                      : j === 0
                        ? "rounded-tl-sm"
                        : j === msg.lines.length - 1
                          ? "rounded-bl-sm"
                          : ""
                  }`}
                  key={j}
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t px-3 py-2.5">
        <Skeleton className="h-9 flex-1 rounded-full" />
        <Skeleton className="size-9 shrink-0 rounded-full" />
      </div>
    </div>
  );
}

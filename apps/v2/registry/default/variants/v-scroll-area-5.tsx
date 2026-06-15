import { ScrollArea } from "@/registry/default/ui/scroll-area";

const COLS = 12;
const ROWS = 20;

export default function Particle() {
  return (
    <ScrollArea className="h-56 max-w-sm rounded-lg border">
      <div
        className="grid gap-2 p-3"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 3rem)`,
          width: "max-content",
        }}
      >
        {Array.from({ length: ROWS * COLS }).map((_, i) => (
          <div
            className="flex h-10 w-12 items-center justify-center rounded bg-muted text-muted-foreground text-xs tabular-nums"
            key={i}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

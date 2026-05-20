import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const palette = [
  { hex: "#0f172a", name: "Slate 950" },
  { hex: "#1e3a5f", name: "Navy" },
  { hex: "#2563eb", name: "Blue 600" },
  { hex: "#7c3aed", name: "Violet 600" },
  { hex: "#db2777", name: "Pink 600" },
  { hex: "#dc2626", name: "Red 600" },
  { hex: "#ea580c", name: "Orange 600" },
  { hex: "#ca8a04", name: "Yellow 600" },
  { hex: "#16a34a", name: "Green 600" },
  { hex: "#0891b2", name: "Cyan 600" },
  { hex: "#64748b", name: "Slate 500" },
  { hex: "#f8fafc", name: "Slate 50" },
] as const;

export function Pattern() {
  return (
    <div className="flex min-h-[100px] items-center justify-center">
      <TooltipProvider>
        <div className="space-y-2">
          <p className="text-center text-muted-foreground text-xs">
            Brand palette — hover to inspect
          </p>
          <div className="flex gap-1.5 rounded-xl border bg-muted/40 p-2.5">
            {palette.map(({ hex, name }) => (
              <Tooltip key={hex}>
                <TooltipTrigger className="focus-visible:outline-none">
                  <div
                    className="size-8 rounded-md shadow-sm ring-1 ring-black/10 transition-transform hover:scale-110 hover:ring-2 hover:ring-black/20 dark:ring-white/10 dark:hover:ring-white/25"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="sr-only">{name}</span>
                </TooltipTrigger>
                <TooltipContent className="px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-3 rounded-sm ring-1 ring-black/10 dark:ring-white/10"
                      style={{ backgroundColor: hex }}
                    />
                    <div>
                      <p className="font-medium leading-none">{name}</p>
                      <p className="mt-0.5 font-mono text-muted-foreground uppercase">
                        {hex}
                      </p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}

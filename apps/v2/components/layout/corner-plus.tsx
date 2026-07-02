import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type CornerPlusProps = {
  className?: string;
};

export function CornerPlus({ className }: CornerPlusProps) {
  return (
    <Plus
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 z-10 size-3 -translate-y-1/2 text-muted-foreground/30",
        className,
      )}
      strokeWidth={1.5}
    />
  );
}

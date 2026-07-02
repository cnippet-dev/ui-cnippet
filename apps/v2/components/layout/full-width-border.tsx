import { cn } from "@/lib/utils";

type FullWidthBorderProps = {
  className?: string;
};

export function FullWidthBorder({ className }: FullWidthBorderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-1/2 z-1 h-px w-screen -translate-x-1/2 border-t border-dashed",
        className,
      )}
    />
  );
}

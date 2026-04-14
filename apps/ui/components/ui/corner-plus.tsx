import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CornerPlusProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function CornerPlus({
  className,
  size = 7,
  strokeWidth = 1,
}: CornerPlusProps) {
  const sizeClass = `size-${size}`;
  const baseClass = cn(
    "absolute text-muted-foreground/50 pointer-events-none hidden sm:inline-block",
    sizeClass,
    className,
  );
  const _offset = `-${(size / 2) * 0.25}rem`;

  return (
    <>
      <Plus
        aria-hidden="true"
        className={cn(baseClass, "-top-3 -left-3")}
        strokeWidth={strokeWidth}
      />
      <Plus
        aria-hidden="true"
        className={cn(baseClass, "-top-3 -right-3")}
        strokeWidth={strokeWidth}
      />
      <Plus
        aria-hidden="true"
        className={cn(baseClass, "-bottom-3 -left-3")}
        strokeWidth={strokeWidth}
      />
      <Plus
        aria-hidden="true"
        className={cn(baseClass, "-right-3 -bottom-3")}
        strokeWidth={strokeWidth}
      />
    </>
  );
}

import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The raised content plane. Sits inset on the chrome; goes edge-to-edge on
 * small screens so phones don't lose 16px to decoration.
 */
export function Canvas({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-1 flex-col bg-background max-md:border-y md:rounded-canvas md:shadow-canvas",
        className,
      )}
      data-slot="canvas"
      {...props}
    />
  );
}

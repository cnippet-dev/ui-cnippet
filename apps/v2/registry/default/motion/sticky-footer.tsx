"use client";

import type { ComponentProps, CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type StickyFooterProps = {
  /** Footer height. Numbers are px. */
  height?: number | string;
  contentClassName?: string;
} & ComponentProps<"footer">;

// The content sticks to the bottom of the scrollport while the clipped
// wrapper scrolls into view, so the page appears to lift off the footer.
export function StickyFooter({
  children,
  height = 320,
  className,
  contentClassName,
  style,
  ...props
}: StickyFooterProps) {
  return (
    <footer
      className={cn("relative", className)}
      style={
        {
          "--footer-h": typeof height === "number" ? `${height}px` : height,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          height: "var(--footer-h)",
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className="absolute inset-x-0 bottom-0 flex h-[calc(var(--footer-h)+100vh)] flex-col justify-end">
        <div className={cn("sticky bottom-0 h-(--footer-h)", contentClassName)}>
          {children}
        </div>
      </div>
    </footer>
  );
}

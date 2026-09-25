import type { ReactNode } from "react";
import { Canvas } from "@/components/signal/canvas";
import { EdgeLines } from "@/components/signal/edge-lines";
import { cn } from "@/lib/utils";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Chrome → inset canvas → (header, page, footer). The header reads as the top
 * of the canvas, but it is rendered as a sibling *before* the canvas and
 * overlaps it: the canvas clips its overflow, and a header inside it could not
 * paint the chrome mask that keeps the rounded top clean while scrolling.
 * Docs pages use DocsShell instead, where the header stays on the chrome.
 */
export function SiteShell({
  children,
  className,
  footer = true,
}: {
  children: ReactNode;
  className?: string;
  footer?: boolean;
}) {
  return (
    <div className="flex min-h-svh flex-col md:p-3">
      {/* Chrome band over the top inset, so nothing scrolls visibly through
          the gap above the sticky header. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-60 hidden h-3 bg-chrome md:block"
      />
      <SiteHeader placement="canvas" />
      {/* Pull the canvas up under the transparent header (+1px for its
          border) so hero textures start at the canvas edge. */}
      <Canvas
        className={cn(
          "-mt-[calc(var(--header-height)+1px)] overflow-clip",
          className,
        )}
      >
        <EdgeLines />
        <main className="flex flex-1 flex-col">{children}</main>
        {footer ? <SiteFooter ruled /> : null}
      </Canvas>
    </div>
  );
}

import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";

/**
 * Header on the chrome, then a row: the page renders its sidebar (on the
 * chrome) and its canvas side by side.
 */
export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <div className="flex flex-1 md:px-3 md:pb-3 lg:ps-2">{children}</div>
    </div>
  );
}

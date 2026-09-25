import { CommandMenu } from "@/components/command-menu";
import { appConfig } from "@/lib/config";
import { source } from "@/lib/source";
import { SiteHeaderClient } from "./site-header-client";

export function SiteHeader({
  placement = "chrome",
}: {
  placement?: "chrome" | "canvas";
}) {
  return (
    <SiteHeaderClient
      placement={placement}
      search={
        <CommandMenu navItems={appConfig.navItems} tree={source.pageTree} />
      }
    />
  );
}

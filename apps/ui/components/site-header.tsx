import { SiteHeader as WorkspaceSiteHeader } from "@/components/shared/header/header";
import { Separator } from "@/registry/default/ui/separator";

import { CommandMenu } from "@/components/command-menu";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { appConfig } from "@/lib/config";
import { source } from "@/lib/source";

export function SiteHeader() {
  const pageTree = source.pageTree;

  return (
    <WorkspaceSiteHeader
      currentProduct="ui"
      mobileNav={
        <MobileNav
          className="flex lg:hidden"
          items={appConfig.navItems}
          tree={pageTree}
        />
      }
    >
      <MainNav className="hidden lg:flex" items={appConfig.navItems} />
      <div className="mx-2 hidden w-full flex-1 md:flex md:w-auto md:flex-none">
        <CommandMenu navItems={appConfig.navItems} tree={pageTree} />
      </div>
      <Separator className="h-5 max-md:hidden" orientation="vertical" />
    </WorkspaceSiteHeader>
  );
}

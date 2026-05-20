import {
  BookOpenIcon,
  BoxIcon,
  HelpCircleIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MenuIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Sheet,
  SheetClose,
  SheetPopup,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

const navGroups = [
  {
    items: [
      { icon: HomeIcon, label: "Home" },
      { badge: 3, icon: LayoutDashboardIcon, label: "Dashboard" },
      { icon: BoxIcon, label: "Projects" },
      { icon: UsersIcon, label: "Team" },
    ],
    label: "Main",
  },
  {
    items: [
      { icon: SettingsIcon, label: "Settings" },
      { icon: BookOpenIcon, label: "Documentation" },
      { icon: HelpCircleIcon, label: "Help & Support" },
    ],
    label: "General",
  },
] as const;

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Sheet>
        <SheetTrigger render={<Button size="icon" variant="outline" />}>
          <MenuIcon aria-hidden="true" />
        </SheetTrigger>
        <SheetPopup className="max-w-60" showCloseButton={false} side="left">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2.5 border-b px-5 py-4">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-xs">
                C
              </span>
              <span className="font-semibold">Cnippet UI</span>
            </div>

            <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-1.5 px-2 font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">
                    {group.label}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SheetClose
                          key={item.label}
                          render={
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                          }
                        >
                          <Icon
                            aria-hidden="true"
                            className="size-4 shrink-0 text-muted-foreground"
                          />
                          <span className="flex-1 text-left">{item.label}</span>
                          {"badge" in item && item.badge && (
                            <Badge className="h-4 px-1 text-[10px]">
                              {item.badge}
                            </Badge>
                          )}
                        </SheetClose>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className="border-t px-3 py-3">
              <div className="flex items-center gap-3 rounded-lg px-2 py-2">
                <Avatar className="size-8">
                  <AvatarImage
                    alt="Margaret Welsh"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&dpr=2&q=80"
                  />
                  <AvatarFallback>MW</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">Margaret Welsh</p>
                  <p className="truncate text-muted-foreground text-xs">
                    margaret@example.com
                  </p>
                </div>
                <Button className="size-7 shrink-0" size="icon" variant="ghost">
                  <SettingsIcon aria-hidden="true" className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </SheetPopup>
      </Sheet>
    </div>
  );
}

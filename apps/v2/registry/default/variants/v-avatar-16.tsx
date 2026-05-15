import {
  ChevronsUpDownIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/default/ui/menu";

export function Pattern() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className="h-8 gap-1.5 rounded-full pr-2.5 pl-1"
            size="sm"
            variant="outline"
          >
            <Avatar className="size-6 border border-background">
              <AvatarImage
                alt="Liam Thompson"
                src="https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80"
              />
              <AvatarFallback>LT</AvatarFallback>
            </Avatar>
            <span className="font-medium text-xs">Liam Thompson</span>
            <ChevronsUpDownIcon
              aria-hidden="true"
              className="size-3.5 opacity-60"
            />
          </Button>
        }
      />
      <DropdownMenuContent align="center" className="w-44" sideOffset={8}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Management</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon aria-hidden="true" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon aria-hidden="true" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon aria-hidden="true" />
            <span>Teams</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusIcon aria-hidden="true" />
            <span>Invite</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon aria-hidden="true" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// title: With Dropdown Menu
import {
  ExternalLinkIcon,
  MoreHorizontalIcon,
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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
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
    <Card className="w-full max-w-xs gap-2 pt-5">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Need help with your claim?</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button size="icon" variant="ghost" />}>
            <MoreHorizontalIcon aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Team Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon aria-hidden="true" />
                <span>Manage members</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon aria-hidden="true" />
                <span>Team preferences</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ExternalLinkIcon aria-hidden="true" />
              <span>Open dashboard</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="mb-2">
        <p>
          Follow our step-by-step guide to certify for your weekly benefits.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">
          <Avatar className="size-5">
            <AvatarImage
              alt="Maya Patel"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&dpr=2&q=80"
            />
            <AvatarFallback>MP</AvatarFallback>
          </Avatar>
          <span className="text-xs">Message your case worker</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

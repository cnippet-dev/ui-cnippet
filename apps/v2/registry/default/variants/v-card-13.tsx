import { CheckIcon, MoreVerticalIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/default/ui/menu";

export function Pattern() {
  return (
    <Card className="w-full max-w-sm p-0">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <Badge variant="secondary">
            <CheckIcon aria-hidden="true" />
            Live
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  aria-label="More options"
                  className="text-muted-foreground"
                  size="icon"
                  variant="ghost"
                />
              }
            >
              <MoreVerticalIcon aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuGroup>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-sm leading-tight">
              Integration name
            </h3>
            <Badge size="sm" variant="success">
              Installed
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Short description of the integration and what it does in one line.
          </p>
          <div className="flex -space-x-2">
            <Avatar className="size-6 ring-2 ring-background">
              <AvatarImage
                alt="User 1"
                src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar className="size-6 ring-2 ring-background">
              <AvatarImage
                alt="User 2"
                src="https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80"
              />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <Avatar className="size-6 ring-2 ring-background">
              <AvatarImage
                alt="User 3"
                src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80"
              />
              <AvatarFallback>EW</AvatarFallback>
            </Avatar>
            <div className="flex size-6 items-center justify-center rounded-full border bg-muted text-[10px] ring-2 ring-background">
              +3
            </div>
          </div>
        </div>
        <div className="border-t p-3">
          <Button className="w-full" variant="outline">
            Open
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

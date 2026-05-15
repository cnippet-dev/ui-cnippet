import {
  ArrowDownIcon,
  ArrowUpIcon,
  MoreHorizontalIcon,
  PinIcon,
  SettingsIcon,
  Share2Icon,
  TrashIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/default/ui/menu";
import { Separator } from "@/registry/default/ui/separator";

export function Pattern() {
  const title = "Revenue";
  const value = "$12.4k";
  const delta = 12.5;
  const positive = true;
  const lastMonth = "$11.0k";

  return (
    <Card className="w-full max-w-xs">
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-medium text-muted-foreground text-sm">{title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  aria-label="More options"
                  className="-me-1.5"
                  size="icon"
                  variant="ghost"
                />
              }
            >
              <MoreHorizontalIcon aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <SettingsIcon aria-hidden="true" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TriangleAlertIcon aria-hidden="true" />
                  Add Alert
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PinIcon aria-hidden="true" />
                  Pin to Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2Icon aria-hidden="true" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <TrashIcon aria-hidden="true" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5">
            <span className="font-medium text-2xl text-foreground tabular-nums tracking-tight">
              {value}
            </span>
            <Badge variant={positive ? "success" : "destructive"}>
              {positive ? (
                <ArrowUpIcon aria-hidden="true" />
              ) : (
                <ArrowDownIcon aria-hidden="true" />
              )}
              {delta}%
            </Badge>
          </div>
          <Separator />
          <div className="text-muted-foreground text-xs">
            Vs last month:{" "}
            <span className="font-medium text-foreground tabular-nums">
              {lastMonth}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

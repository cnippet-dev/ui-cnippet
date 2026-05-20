import { ArrowRightIcon, InfoIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button aria-label="Notifications" size="icon" variant="outline" />
          }
        >
          <div className="relative">
            <InfoIcon />
            <Badge
              className="absolute -top-3.5 -right-3.5"
              size="sm"
              variant="destructive"
            >
              3
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent className="p-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium">Notifications</span>
              <Badge size="sm" variant="destructive">
                3 new
              </Badge>
            </div>
            <div className="flex flex-col gap-1 opacity-80">
              <p>• Sarah commented on your PR</p>
              <p>• Build #421 completed</p>
              <p>• New team member joined</p>
            </div>
            <a
              className="flex items-center gap-1 font-medium underline underline-offset-2"
              href="#"
            >
              View all
              <ArrowRightIcon className="size-3.5" />
            </a>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

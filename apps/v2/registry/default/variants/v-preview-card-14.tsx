import { CircleDotIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export function Pattern() {
  return (
    <p className="text-sm">
      Related to issue{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-medium font-mono text-primary underline underline-offset-4">
          #1842
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-2">
              <CircleDotIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-green-500"
              />
              <div>
                <h4 className="font-semibold text-sm leading-snug">
                  PopoverContent loses focus when Slider is used inside
                </h4>
                <p className="mt-0.5 text-muted-foreground text-xs">
                  Opened by <strong>@deepak</strong> · 3 days ago
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge size="sm" variant="secondary">
                bug
              </Badge>
              <Badge size="sm" variant="secondary">
                accessibility
              </Badge>
              <Badge size="sm" variant="secondary">
                popover
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs">
              repo: ui-cnippet · labels: 3 · comments: 7
            </p>
          </div>
        </PreviewCardPopup>
      </PreviewCard>{" "}
      which is now resolved.
    </p>
  );
}

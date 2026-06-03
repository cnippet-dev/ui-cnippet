// biome-ignore-all lint/suspicious/noArrayIndexKey:<>

import { StarIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export function Pattern() {
  return (
    <p className="text-sm">
      We recommend the{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-medium underline decoration-dashed underline-offset-4">
          Pro Wireless Headphones
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div className="h-32 w-full rounded-md bg-muted" />
            <div>
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-sm">
                  Pro Wireless Headphones
                </h4>
                <Badge size="sm" variant="secondary">
                  New
                </Badge>
              </div>
              <div className="mt-1 flex items-center gap-0.5 text-muted-foreground text-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    aria-hidden="true"
                    className={`size-3 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                    key={i}
                  />
                ))}
                <span className="ml-1">(128 reviews)</span>
              </div>
            </div>
            <p className="font-semibold text-base">$149.00</p>
          </div>
        </PreviewCardPopup>
      </PreviewCard>{" "}
      for remote work setups.
    </p>
  );
}

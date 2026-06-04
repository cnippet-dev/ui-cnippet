import { ClockIcon } from "lucide-react";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export function Pattern() {
  return (
    <p className="text-sm">
      Read more in{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-medium text-primary underline underline-offset-4">
          Building accessible components with Base UI
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div className="h-28 w-full rounded-md bg-muted" />
            <div>
              <h4 className="font-semibold text-sm leading-snug">
                Building accessible components with Base UI
              </h4>
              <p className="mt-1 line-clamp-3 text-muted-foreground text-xs">
                Learn how to leverage Base UI primitives to build fully
                accessible components with keyboard navigation, focus
                management, and ARIA attributes without the heavy lifting.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <ClockIcon aria-hidden="true" className="size-3" />8 min read
            </div>
          </div>
        </PreviewCardPopup>
      </PreviewCard>
      .
    </p>
  );
}

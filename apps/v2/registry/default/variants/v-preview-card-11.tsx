import { UserIcon } from "lucide-react";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export function Pattern() {
  return (
    <p className="text-sm">
      Designed by{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-medium underline decoration-dashed underline-offset-4">
          @sarah_designs
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <UserIcon
                  aria-hidden="true"
                  className="size-5 text-muted-foreground"
                />
              </div>
              <div>
                <p className="font-semibold text-sm">Sarah Kim</p>
                <p className="text-muted-foreground text-xs">@sarah_designs</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Senior product designer. Open to work. Based in San Francisco.
            </p>
            <div className="flex gap-4 text-muted-foreground text-xs">
              <span>
                <strong className="text-foreground">2.4k</strong> followers
              </span>
              <span>
                <strong className="text-foreground">312</strong> following
              </span>
            </div>
          </div>
        </PreviewCardPopup>
      </PreviewCard>{" "}
      for the launch.
    </p>
  );
}

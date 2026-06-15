import { MapPinIcon } from "lucide-react";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export default function Particle() {
  return (
    <p className="text-sm">
      Join us at{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-medium text-primary underline underline-offset-4">
          The Grand Pavilion
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div className="h-24 w-full overflow-hidden rounded-md bg-muted" />
            <div>
              <h4 className="font-semibold text-sm">The Grand Pavilion</h4>
              <p className="mt-0.5 text-muted-foreground text-xs">
                Conference & Events Center
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <MapPinIcon aria-hidden="true" className="size-3 shrink-0" />
              <span>1200 Market St, San Francisco, CA 94102</span>
            </div>
          </div>
        </PreviewCardPopup>
      </PreviewCard>{" "}
      for the annual summit.
    </p>
  );
}

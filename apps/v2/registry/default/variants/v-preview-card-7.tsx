import { PlayIcon } from "lucide-react";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export default function Particle() {
  return (
    <p className="text-sm">
      Watch the full demo in{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-medium text-primary underline underline-offset-4">
          Building a design system from scratch
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-md bg-muted">
              <div className="flex size-10 items-center justify-center rounded-full bg-background/80 shadow">
                <PlayIcon className="size-4 fill-foreground text-foreground" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm leading-snug">
                Building a design system from scratch
              </h4>
              <p className="mt-0.5 text-muted-foreground text-xs">
                42:18 · Design Systems Conf 2025
              </p>
            </div>
          </div>
        </PreviewCardPopup>
      </PreviewCard>
      .
    </p>
  );
}

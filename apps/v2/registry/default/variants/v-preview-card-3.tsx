import { PackageIcon, StarIcon } from "lucide-react";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export default function Particle() {
  return (
    <p className="text-sm">
      Install{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-mono font-semibold text-primary underline underline-offset-4">
          @base-ui/react
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                <PackageIcon className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">@base-ui/react</p>
                <p className="text-muted-foreground text-xs">
                  Unstyled, accessible UI primitives
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs">
              A set of low-level UI primitives for building design systems with
              full accessibility and keyboard support.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <StarIcon className="size-3" /> 4.2k
              </span>
              <span>v1.0.0</span>
              <span>MIT</span>
            </div>
          </div>
        </PreviewCardPopup>
      </PreviewCard>{" "}
      to get started.
    </p>
  );
}

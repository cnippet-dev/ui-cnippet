import { DownloadIcon, PackageIcon } from "lucide-react";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export function Pattern() {
  return (
    <p className="text-sm">
      Install{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-mono font-medium underline underline-offset-4">
          @base-ui/react
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <PackageIcon
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                />
              </div>
              <div>
                <p className="font-semibold text-sm">@base-ui/react</p>
                <p className="text-xs text-muted-foreground">v1.0.0</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Unstyled, accessible UI components for React built with
              accessibility in mind.
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <DownloadIcon aria-hidden="true" className="size-3" />
                <span>124k / week</span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-blue-500"
                />
                <span>TypeScript</span>
              </div>
            </div>
          </div>
        </PreviewCardPopup>
      </PreviewCard>{" "}
      to get started with accessible primitives.
    </p>
  );
}

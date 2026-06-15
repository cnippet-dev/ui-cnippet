import { GitForkIcon, StarIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export default function Particle() {
  return (
    <div className="text-sm">
      Check out the source on{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-medium text-primary underline underline-offset-4">
          GitHub
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-semibold text-sm">cnippet / ui-cnippet</p>
              <p className="mt-1 text-muted-foreground text-xs">
                Open-source component library built with Base UI and Tailwind
                CSS. Copy-paste ready for your next project.
              </p>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-blue-500"
                />
                TypeScript
              </span>
              <span className="flex items-center gap-1">
                <StarIcon className="size-3" /> 2.1k
              </span>
              <span className="flex items-center gap-1">
                <GitForkIcon className="size-3" /> 184
              </span>
            </div>
            <Button className="w-full" size="sm" variant="outline">
              View repository
            </Button>
          </div>
        </PreviewCardPopup>
      </PreviewCard>
      .
    </div>
  );
}

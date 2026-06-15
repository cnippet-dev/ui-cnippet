import { CalendarIcon, UsersIcon } from "lucide-react";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export default function Particle() {
  return (
    <p className="text-sm">
      See the full agenda for{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-medium underline decoration-dashed underline-offset-4">
          Design Systems Summit 2026
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div>
              <h4 className="font-semibold text-sm">
                Design Systems Summit 2026
              </h4>
              <p className="mt-1 text-muted-foreground text-xs">
                Two days of talks, workshops, and deep-dives on component
                architecture, tokens, and cross-platform design systems.
              </p>
            </div>
            <div className="flex flex-col gap-1.5 text-muted-foreground text-xs">
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="size-3 shrink-0" />
                September 18–19, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <UsersIcon className="size-3 shrink-0" />
                1,200 attendees expected
              </span>
            </div>
          </div>
        </PreviewCardPopup>
      </PreviewCard>
      .
    </p>
  );
}

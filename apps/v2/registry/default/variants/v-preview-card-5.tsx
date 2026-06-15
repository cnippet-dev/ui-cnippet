import { BuildingIcon, UsersIcon } from "lucide-react";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export default function Particle() {
  return (
    <p className="text-sm">
      Funded by{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-semibold underline underline-offset-4">
          Acme Ventures
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted">
                <BuildingIcon className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">Acme Ventures</p>
                <p className="text-muted-foreground text-xs">
                  Series A · B2B SaaS
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs">
              Early-stage VC focused on developer tools and infrastructure.
              $280M AUM across 3 funds.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <UsersIcon className="size-3" /> 48 portfolio companies
              </span>
            </div>
          </div>
        </PreviewCardPopup>
      </PreviewCard>{" "}
      in the latest round.
    </p>
  );
}

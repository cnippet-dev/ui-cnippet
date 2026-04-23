import { ArrowLeftIcon, CircleDashedIcon } from "lucide-react";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <KbdGroup>
        <Kbd>
          <ArrowLeftIcon />
          Left
        </Kbd>
        <Kbd>
          <CircleDashedIcon />
          Voice Enabled
        </Kbd>
      </KbdGroup>
    </div>
  );
}

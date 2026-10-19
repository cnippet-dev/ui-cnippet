// title: Bandwidth quota card
import { CloudIcon } from "lucide-react";
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

export function Pattern() {
  return (
    <div className="w-full max-w-xs rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <CloudIcon
          aria-hidden="true"
          className="size-4 text-muted-foreground"
        />
        <span className="font-medium text-sm">Bandwidth this month</span>
      </div>
      <Meter value={63}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel className="text-muted-foreground text-xs">
            630 GB of 1 TB · resets Nov 1
          </MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
    </div>
  );
}

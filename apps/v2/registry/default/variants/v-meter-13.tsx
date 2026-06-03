import { DatabaseIcon, FileIcon, ImageIcon } from "lucide-react";
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

const breakdown = [
  { icon: ImageIcon, label: "Photos", used: 4.2, total: 10 },
  { icon: FileIcon, label: "Documents", used: 1.8, total: 10 },
  { icon: DatabaseIcon, label: "Backups", used: 7.5, total: 10 },
];

export function Pattern() {
  return (
    <div className="w-full max-w-sm space-y-4">
      {breakdown.map(({ icon: Icon, label, used, total }) => (
        <Meter key={label} max={total} value={used}>
          <div className="flex items-center justify-between gap-2">
            <MeterLabel className="flex items-center gap-1.5">
              <Icon aria-hidden="true" className="size-3.5 text-muted-foreground" />
              {label}
            </MeterLabel>
            <MeterValue>
              {() => `${used} / ${total} GB`}
            </MeterValue>
          </div>
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      ))}
    </div>
  );
}

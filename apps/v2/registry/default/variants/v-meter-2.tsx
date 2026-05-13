import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
} from "@/registry/default/ui/meter";

export default function Particle() {
  return (
    <Meter value={50}>
      <MeterLabel>Rating</MeterLabel>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  );
}

import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/registry/default/ui/frame";

const details = [
  { label: "Plan", value: "Pro" },
  { label: "Billing cycle", value: "Monthly" },
  { label: "Next renewal", value: "Jul 3, 2026" },
  { label: "Seats used", value: "7 of 20" },
];

export function Pattern() {
  return (
    <Frame className="w-full max-w-sm">
      <FrameHeader>
        <FrameTitle>Subscription details</FrameTitle>
        <FrameDescription>Your current plan information</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <dl className="flex flex-col gap-2">
          {details.map(({ label, value }) => (
            <div className="flex items-center justify-between" key={label}>
              <dt className="text-muted-foreground text-sm">{label}</dt>
              <dd className="font-medium text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </FramePanel>
    </Frame>
  );
}

// title: Showcase: separator, large and disabled
import { Label } from "@/registry/default/ui/label";
import {
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
} from "@/registry/default/ui/otp-field";

function slots(from: number, count: number, total: number) {
  return Array.from({ length: count }, (_, i) => (
    <OTPFieldInput
      aria-label={`Character ${from + i + 1} of ${total}`}
      key={from + i}
    />
  ));
}

export default function Particle() {
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex flex-col gap-2">
        <Label>Verification code</Label>
        <OTPField aria-label="Verification code" length={6}>
          {slots(0, 3, 6)}
          <OTPFieldSeparator />
          {slots(3, 3, 6)}
        </OTPField>
      </div>
      <div className="flex flex-col gap-2">
        <Label>PIN (large)</Label>
        <OTPField aria-label="PIN" length={4} size="lg">
          {slots(0, 4, 4)}
        </OTPField>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Disabled</Label>
        <OTPField aria-label="Disabled code" disabled length={6}>
          {slots(0, 6, 6)}
        </OTPField>
      </div>
    </div>
  );
}

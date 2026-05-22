import { TextScramble } from "@/registry/default/motion/text-scramble";

const features = [
  { label: "Components", value: "164+" },
  { label: "Bundle size", value: "~4kb" },
  { label: "TypeScript", value: "100%" },
];

export default function TextScrambleStats() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="grid grid-cols-3 divide-x divide-border">
        {features.map(({ label, value }, i) => (
          <div className="flex flex-col items-center gap-1 px-8 py-4" key={label}>
            <TextScramble
              as="span"
              className="text-3xl font-bold tabular-nums text-foreground"
              duration={0.6 + i * 0.2}
              speed={0.03}
            >
              {value}
            </TextScramble>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

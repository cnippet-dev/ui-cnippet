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
          <div
            className="flex flex-col items-center gap-1 px-8 py-4"
            key={label}
          >
            <TextScramble
              as="span"
              className="font-bold text-3xl text-foreground tabular-nums"
              duration={0.6 + i * 0.2}
              speed={0.03}
            >
              {value}
            </TextScramble>
            <span className="text-muted-foreground text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

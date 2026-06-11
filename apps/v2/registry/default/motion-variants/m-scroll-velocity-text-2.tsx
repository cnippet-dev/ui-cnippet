import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/registry/default/motion/scroll-velocity-text";

const row1 = ["Build", "Design", "Ship", "Scale", "Iterate", "Launch"];
const row2 = [
  "Accessible",
  "Animated",
  "Composable",
  "Fast",
  "Type-safe",
  "Open Source",
];

export default function ScrollVelocityOpposing() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 overflow-hidden py-6">
      <ScrollVelocityContainer className="space-y-4">
        <ScrollVelocityRow baseVelocity={4} direction={1}>
          {row1.map((word) => (
            <span
              className="mx-8 font-extrabold text-3xl text-foreground/10 uppercase tracking-tight"
              key={word}
            >
              {word}
            </span>
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={4} direction={-1}>
          {row2.map((word) => (
            <span
              className="mx-8 font-extrabold text-3xl text-foreground/10 uppercase tracking-tight"
              key={word}
            >
              {word}
            </span>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}

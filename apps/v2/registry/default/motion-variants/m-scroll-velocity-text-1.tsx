import {
  ScrollVelocityRow,
} from "@/registry/default/motion/scroll-velocity-text";

const words = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Motion",
  "Next.js",
  "shadcn/ui",
  "Vite",
  "Radix UI",
];

export default function ScrollVelocityBasic() {
  return (
    <div className="flex min-h-50 items-center justify-center overflow-hidden">
      <ScrollVelocityRow baseVelocity={3}>
        {words.map((word) => (
          <span
            className="mx-6 text-base font-medium text-muted-foreground"
            key={word}
          >
            {word}
            <span className="mx-6 text-muted-foreground/30">•</span>
          </span>
        ))}
      </ScrollVelocityRow>
    </div>
  );
}

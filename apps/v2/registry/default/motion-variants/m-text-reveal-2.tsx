import { TextReveal } from "@/registry/default/motion/text-reveal";

export default function TextRevealCharScale() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <TextReveal
        as="p"
        className="max-w-sm text-center font-semibold text-2xl text-foreground tracking-tight"
        delay={0.1}
        per="char"
        preset="scale"
        speedReveal={2}
        speedSegment={1.5}
      >
        Every pixel. Every frame. Crafted.
      </TextReveal>
    </div>
  );
}

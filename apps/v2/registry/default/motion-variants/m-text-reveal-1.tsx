import { TextReveal } from "@/registry/default/motion/text-reveal";

export default function TextRevealHero() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <TextReveal
        as="h1"
        className="max-w-2xl text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl"
        per="word"
        preset="fade-in-blur"
        speedReveal={1.2}
      >
        Build beautiful interfaces that move with purpose
      </TextReveal>
    </div>
  );
}

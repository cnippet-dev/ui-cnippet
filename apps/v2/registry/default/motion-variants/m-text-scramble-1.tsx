import { TextScramble } from "@/registry/default/motion/text-scramble";

export default function TextScrambleHero() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <TextScramble
        as="h1"
        className="max-w-2xl text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl"
        duration={1.2}
        speed={0.03}
      >
        The future of UI is in motion
      </TextScramble>
    </div>
  );
}

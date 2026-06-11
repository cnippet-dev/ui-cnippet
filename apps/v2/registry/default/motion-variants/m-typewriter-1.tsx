import { Typewriter } from "@/registry/default/motion/typewriter";

export default function TypewriterHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-2 px-6">
      <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
        Now available
      </p>
      <h1 className="text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
        <Typewriter
          cursorChar="_"
          cursorClassName="ml-0.5 text-primary"
          loop={false}
          speed={60}
          text="Build. Ship. Animate."
        />
      </h1>
    </div>
  );
}

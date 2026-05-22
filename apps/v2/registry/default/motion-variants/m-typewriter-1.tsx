import { Typewriter } from "@/registry/default/motion/typewriter";

export default function TypewriterHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-2 px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Now available
      </p>
      <h1 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
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

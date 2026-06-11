import { TextReveal } from "@/registry/default/motion/text-reveal";

export default function TextRevealStacked() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="flex max-w-xl flex-col gap-3 text-center">
        <TextReveal
          as="span"
          className="font-medium text-muted-foreground text-sm uppercase tracking-widest"
          delay={0}
          per="word"
          preset="slide"
          speedReveal={1.5}
        >
          Introducing Cnippet Motion
        </TextReveal>
        <TextReveal
          as="h2"
          className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl"
          delay={0.3}
          per="word"
          preset="fade-in-blur"
          speedReveal={1.2}
        >
          Animation primitives for modern React apps
        </TextReveal>
        <TextReveal
          as="p"
          className="text-base text-muted-foreground"
          delay={0.7}
          per="word"
          preset="fade"
          speedReveal={2}
        >
          Copy-paste components powered by Motion. No configuration required.
        </TextReveal>
      </div>
    </div>
  );
}

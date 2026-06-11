import { ScrollReveal } from "@/registry/default/motion/scroll-reveal";

export default function ScrollRevealFeatureSection() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="flex w-full max-w-2xl flex-col items-center gap-6 sm:flex-row sm:gap-10">
        <ScrollReveal
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={{
            hidden: { opacity: 0, x: -32 },
            visible: { opacity: 1, x: 0 },
          }}
          viewOptions={{ amount: 0.4 }}
        >
          <div className="flex h-36 w-full items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-violet-500/10 to-purple-500/5 sm:h-44 sm:w-56">
            <span className="text-5xl">✦</span>
          </div>
        </ScrollReveal>

        <ScrollReveal
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          variants={{
            hidden: { opacity: 0, x: 32 },
            visible: { opacity: 1, x: 0 },
          }}
          viewOptions={{ amount: 0.4 }}
        >
          <div className="flex-1">
            <p className="font-semibold text-primary text-xs uppercase tracking-widest">
              New
            </p>
            <h2 className="mt-1 font-bold text-2xl text-foreground">
              Motion-first design system
            </h2>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              164 animated components built on Motion and Tailwind — ready to
              drop into your next project and customise in seconds.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

import { FlipWords } from "@/registry/default/motion/flip-words";

const verbs = ["Ship", "Deploy", "Launch", "Scale"];

export default function FlipWordsCTA() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Ready to start?
      </p>
      <div className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xl font-semibold text-background shadow-lg">
        <FlipWords
          duration={2000}
          transition={{ damping: 10, stiffness: 120, type: "spring" }}
          words={verbs}
        />
        <span>faster</span>
      </div>
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        From prototype to production in minutes, not months.
      </p>
    </div>
  );
}

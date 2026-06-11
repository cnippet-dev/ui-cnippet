import { FlipWords } from "@/registry/default/motion/flip-words";

const verbs = ["Ship", "Deploy", "Launch", "Scale"];

export default function FlipWordsCTA() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
        Ready to start?
      </p>
      <div className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 font-semibold text-background text-xl shadow-lg">
        <FlipWords
          duration={2000}
          transition={{ damping: 10, stiffness: 120, type: "spring" }}
          words={verbs}
        />
        <span>faster</span>
      </div>
      <p className="max-w-sm text-center text-muted-foreground text-sm">
        From prototype to production in minutes, not months.
      </p>
    </div>
  );
}

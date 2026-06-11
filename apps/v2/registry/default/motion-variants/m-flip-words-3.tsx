import { FlipWords } from "@/registry/default/motion/flip-words";

const roles = ["engineers", "designers", "founders", "teams"];

export default function FlipWordsTestimonial() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <blockquote className="font-medium text-2xl text-foreground leading-snug sm:text-3xl">
          "Built for{" "}
          <FlipWords
            className="text-primary"
            duration={2200}
            transition={{ damping: 16, stiffness: 90, type: "spring" }}
            words={roles}
          />
          <br />
          who move fast."
        </blockquote>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
          <div className="text-left">
            <p className="font-semibold text-foreground text-sm">Alex Kim</p>
            <p className="text-muted-foreground text-xs">Lead Engineer, Acme</p>
          </div>
        </div>
      </div>
    </div>
  );
}

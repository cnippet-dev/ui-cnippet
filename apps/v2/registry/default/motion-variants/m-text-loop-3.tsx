import { TextLoop } from "@/registry/default/motion/text-loop";

export default function TextLoopSlide() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <div className="flex items-baseline gap-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        <span>Made for</span>
        <TextLoop
          className="overflow-hidden"
          interval={2}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          variants={{
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 40 },
            initial: { opacity: 0, x: -40 },
          }}
        >
          <span className="text-violet-500">founders</span>
          <span className="text-blue-500">designers</span>
          <span className="text-emerald-500">developers</span>
        </TextLoop>
      </div>
      <p className="max-w-sm text-center text-base text-muted-foreground">
        Production-ready animated components you can drop into any project.
      </p>
    </div>
  );
}

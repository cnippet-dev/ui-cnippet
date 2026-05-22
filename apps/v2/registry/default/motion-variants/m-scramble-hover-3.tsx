import { ScrambleHover } from "@/registry/default/motion/scramble-hover";

export default function ScrambleHoverCard() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <ScrambleHover
            className="text-base font-semibold text-foreground"
            maxIterations={10}
            revealDirection="start"
            scrambleSpeed={45}
          >
            cnippet/motion
          </ScrambleHover>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            public
          </span>
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          Copy-paste motion primitives for modern React apps. Powered by Motion.
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <ScrambleHover scrambleSpeed={50} maxIterations={8} useOriginalCharsOnly>
            ★ 2.4k
          </ScrambleHover>
          <ScrambleHover scrambleSpeed={50} maxIterations={8} useOriginalCharsOnly>
            TypeScript
          </ScrambleHover>
          <ScrambleHover scrambleSpeed={50} maxIterations={8} useOriginalCharsOnly>
            MIT License
          </ScrambleHover>
        </div>
      </div>
    </div>
  );
}

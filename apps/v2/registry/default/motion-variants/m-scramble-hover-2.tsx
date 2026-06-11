import { ScrambleHover } from "@/registry/default/motion/scramble-hover";

export default function ScrambleHoverHeading() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
        Hover to reveal
      </p>
      <ScrambleHover
        className="cursor-pointer text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl"
        maxIterations={14}
        revealDirection="center"
        scrambleSpeed={35}
      >
        Motion-driven design
      </ScrambleHover>
    </div>
  );
}

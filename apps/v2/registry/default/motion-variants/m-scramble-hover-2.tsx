import { ScrambleHover } from "@/registry/default/motion/scramble-hover";

export default function ScrambleHoverHeading() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Hover to reveal
      </p>
      <ScrambleHover
        as="h2"
        className="cursor-pointer text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        maxIterations={14}
        revealDirection="center"
        scrambleSpeed={35}
      >
        Motion-driven design
      </ScrambleHover>
    </div>
  );
}

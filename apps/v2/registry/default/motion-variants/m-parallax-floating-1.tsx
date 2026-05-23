import {
  FloatingElement,
  ParallaxFloating,
} from "@/registry/default/motion/parallax-floating";

export default function ParallaxFloatingShapes() {
  return (
    <div className="relative flex min-h-50 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5">
      <ParallaxFloating sensitivity={1}>
        <FloatingElement className="left-[8%] top-[15%]" depth={0.5}>
          <div className="h-10 w-10 rounded-xl border border-violet-500/20 bg-violet-500/10" />
        </FloatingElement>
        <FloatingElement className="right-[12%] top-[20%]" depth={1.5}>
          <div className="h-5 w-5 rounded-full bg-pink-500/30" />
        </FloatingElement>
        <FloatingElement className="bottom-[20%] left-[15%]" depth={2.5}>
          <div className="h-7 w-7 rotate-45 rounded-md bg-indigo-500/20" />
        </FloatingElement>
        <FloatingElement className="bottom-[25%] right-[8%]" depth={1}>
          <div className="h-12 w-12 rounded-2xl bg-sky-500/15" />
        </FloatingElement>
        <FloatingElement className="left-[40%] top-[10%]" depth={3}>
          <div className="h-3 w-3 rounded-full bg-emerald-500/40" />
        </FloatingElement>
      </ParallaxFloating>
      <div className="relative z-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Move your cursor
        </p>
        <h2 className="mt-1 text-2xl font-bold text-foreground">
          Depth in motion
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Each layer floats at a different speed
        </p>
      </div>
    </div>
  );
}

import {
  FloatingElement,
  ParallaxFloating,
} from "@/registry/default/motion/parallax-floating";

export default function ParallaxFloatingCard() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="relative h-52 w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-card shadow-md">
        <ParallaxFloating sensitivity={0.8}>
          <FloatingElement className="right-[-30px] top-[-30px]" depth={3}>
            <div className="h-36 w-36 rounded-full bg-violet-500/10 blur-3xl" />
          </FloatingElement>
          <FloatingElement className="bottom-[-20px] left-[-20px]" depth={2}>
            <div className="h-28 w-28 rounded-full bg-blue-500/10 blur-2xl" />
          </FloatingElement>
          <FloatingElement className="right-5 top-5" depth={1.5}>
            <div className="h-2.5 w-2.5 rounded-full bg-violet-400/80" />
          </FloatingElement>
          <FloatingElement className="left-6 top-8" depth={1}>
            <div className="h-1.5 w-1.5 rounded-full bg-pink-400/80" />
          </FloatingElement>
        </ParallaxFloating>
        <div className="relative z-10 flex h-full flex-col justify-end p-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Featured
          </span>
          <h3 className="mt-1 text-lg font-bold text-foreground">
            Hover to shift layers
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Blobs and dots float independently
          </p>
        </div>
      </div>
    </div>
  );
}

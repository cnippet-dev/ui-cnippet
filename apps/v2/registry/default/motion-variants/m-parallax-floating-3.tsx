import {
  FloatingElement,
  ParallaxFloating,
} from "@/registry/default/motion/parallax-floating";

const symbols = [
  { char: "◈", cls: "left-[6%] top-[12%]", depth: 0.5, size: "text-4xl" },
  { char: "⬡", cls: "left-[28%] top-[30%]", depth: 1.5, size: "text-2xl" },
  { char: "◎", cls: "right-[18%] top-[18%]", depth: 2.5, size: "text-3xl" },
  { char: "◇", cls: "left-[12%] bottom-[22%]", depth: 2, size: "text-2xl" },
  { char: "△", cls: "right-[6%] bottom-[18%]", depth: 1, size: "text-4xl" },
  { char: "□", cls: "right-[38%] bottom-[38%]", depth: 3, size: "text-xl" },
  { char: "⬟", cls: "right-[10%] top-[45%]", depth: 1.8, size: "text-2xl" },
];

export default function ParallaxFloatingSymbols() {
  return (
    <div className="relative flex min-h-50 items-center justify-center overflow-hidden rounded-xl bg-muted/20">
      <ParallaxFloating sensitivity={1.5}>
        {symbols.map(({ char, cls, depth, size }) => (
          <FloatingElement className={cls} depth={depth} key={char}>
            <span className={`${size} select-none text-foreground/15`}>
              {char}
            </span>
          </FloatingElement>
        ))}
      </ParallaxFloating>
      <p className="relative z-10 text-center text-sm font-medium text-muted-foreground">
        Cursor drives each symbol at a unique depth
      </p>
    </div>
  );
}

import { ProgressiveBlur } from "@/registry/default/motion/progressive-blur";

const navItems = [
  "Overview",
  "Components",
  "Motion",
  "Scroll",
  "Hover",
  "Layout",
  "Marquee",
  "Background",
  "Navigation",
];

export default function ProgressiveBlurNav() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="relative h-12 w-full max-w-lg overflow-hidden rounded-full border border-border bg-card">
        <div className="flex h-full items-center gap-1 px-3">
          {navItems.map((item) => (
            <button
              className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <ProgressiveBlur
          blurIntensity={0.35}
          blurLayers={5}
          className="absolute inset-y-0 right-0 w-20 rounded-r-full"
          direction="right"
        />
      </div>
    </div>
  );
}

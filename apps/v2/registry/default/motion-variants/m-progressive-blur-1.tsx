import { ProgressiveBlur } from "@/registry/default/motion/progressive-blur";

const items = [
  "Scroll Reveal",
  "Scroll Progress",
  "Scroll Velocity Text",
  "Parallax Floating",
  "Stacking Cards",
  "Progressive Blur",
  "Horizontal Scroll",
  "Scroll Direction Header",
];

export default function ProgressiveBlurList() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="relative h-52 w-full max-w-xs overflow-hidden rounded-xl border border-border bg-card">
        <ul className="space-y-1 p-4">
          {items.map((item) => (
            <li
              className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
        <ProgressiveBlur
          blurIntensity={0.3}
          blurLayers={6}
          className="absolute inset-x-0 bottom-0 h-24"
          direction="bottom"
        />
      </div>
    </div>
  );
}

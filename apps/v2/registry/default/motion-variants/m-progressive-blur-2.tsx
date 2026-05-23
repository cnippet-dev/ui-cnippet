import { ProgressiveBlur } from "@/registry/default/motion/progressive-blur";

const gradients = [
  "from-violet-500/40 to-indigo-500/40",
  "from-pink-500/40 to-rose-500/40",
  "from-emerald-500/40 to-teal-500/40",
  "from-amber-500/40 to-orange-500/40",
  "from-sky-500/40 to-cyan-500/40",
  "from-fuchsia-500/40 to-purple-500/40",
];

export default function ProgressiveBlurGallery() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="relative w-full max-w-lg overflow-hidden">
        <div className="flex gap-3">
          {gradients.map((gradient, i) => (
            <div
              className={`h-28 w-28 shrink-0 rounded-xl bg-gradient-to-br ${gradient}`}
              key={i}
            />
          ))}
        </div>
        <ProgressiveBlur
          blurIntensity={0.4}
          blurLayers={6}
          className="absolute inset-y-0 left-0 w-16"
          direction="left"
        />
        <ProgressiveBlur
          blurIntensity={0.4}
          blurLayers={6}
          className="absolute inset-y-0 right-0 w-16"
          direction="right"
        />
      </div>
    </div>
  );
}

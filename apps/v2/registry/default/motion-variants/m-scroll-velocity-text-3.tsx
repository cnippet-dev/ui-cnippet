import {
  ScrollVelocityRow,
} from "@/registry/default/motion/scroll-velocity-text";

const items = [
  { icon: "⚡", label: "Open Source" },
  { icon: "🔒", label: "Type-safe" },
  { icon: "🌙", label: "Dark Mode" },
  { icon: "♿", label: "Accessible" },
  { icon: "✨", label: "Animated" },
  { icon: "🧩", label: "Composable" },
];

export default function ScrollVelocityPills() {
  return (
    <div className="flex min-h-50 items-center justify-center overflow-hidden">
      <ScrollVelocityRow baseVelocity={2.5} scrollReactivity={false}>
        {items.map((item) => (
          <span
            className="mx-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground shadow-sm"
            key={item.label}
          >
            <span>{item.icon}</span>
            {item.label}
          </span>
        ))}
      </ScrollVelocityRow>
    </div>
  );
}

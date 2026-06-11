import { ScrollReveal } from "@/registry/default/motion/scroll-reveal";

const items = [
  "Pick a component",
  "Run the CLI command",
  "Paste into your project",
  "Customise props & styles",
  "Ship to production",
];

export default function ScrollRevealList() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <ol className="w-full max-w-xs space-y-2">
        {items.map((item, i) => (
          <ScrollReveal
            as="li"
            key={item}
            transition={{ delay: i * 0.1, duration: 0.45, ease: "easeOut" }}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            viewOptions={{ amount: 0.5 }}
          >
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-[10px] text-primary-foreground">
                {i + 1}
              </span>
              <span className="font-medium text-foreground text-sm">
                {item}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </ol>
    </div>
  );
}

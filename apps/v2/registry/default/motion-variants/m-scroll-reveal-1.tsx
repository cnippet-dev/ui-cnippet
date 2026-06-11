import { ScrollReveal } from "@/registry/default/motion/scroll-reveal";

const cards = [
  {
    description: "Composable components that snap together cleanly.",
    icon: "◈",
    title: "Composable",
  },
  {
    description: "Every animation respects prefers-reduced-motion.",
    icon: "⬡",
    title: "Accessible",
  },
  {
    description: "Zero runtime overhead — pure CSS where possible.",
    icon: "◎",
    title: "Performant",
  },
];

export default function ScrollRevealCards() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card, i) => (
          <ScrollReveal
            key={card.title}
            transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            viewOptions={{ amount: 0.3 }}
          >
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-2xl">{card.icon}</p>
              <h3 className="font-semibold text-foreground">{card.title}</h3>
              <p className="mt-1 text-muted-foreground text-sm">
                {card.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

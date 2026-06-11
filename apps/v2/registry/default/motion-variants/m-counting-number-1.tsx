import { CountingNumber } from "@/registry/default/motion/counting-number";

const stats = [
  { label: "Components shipped", suffix: "+", value: 164 },
  { label: "GitHub stars", suffix: "K", value: 4.2 },
  { label: "Monthly downloads", suffix: "K", value: 98 },
  { label: "Contributors", suffix: "", value: 37 },
];

export default function CountingNumberStats() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <div className="text-center" key={stat.label}>
            <p className="font-bold text-4xl text-foreground tracking-tight">
              <CountingNumber
                target={stat.value}
                transition={{ duration: 2, ease: "easeOut", type: "tween" }}
              />
              {stat.suffix}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

type SectionKickerColor = "orange" | "blue" | "yellow" | "green";

type SectionKickerProps = {
  color: SectionKickerColor;
  children: React.ReactNode;
};

const colorClasses: Record<
  SectionKickerColor,
  { border: string; bg: string; text: string; dot: string }
> = {
  blue: {
    bg: "bg-cnippet-blue/5",
    border: "border-cnippet-blue/40",
    dot: "bg-cnippet-blue",
    text: "text-cnippet-blue",
  },
  green: {
    bg: "bg-cnippet-green/5",
    border: "border-cnippet-green/40",
    dot: "bg-cnippet-green",
    text: "text-cnippet-green",
  },
  orange: {
    bg: "bg-cnippet-orange/5",
    border: "border-cnippet-orange/40",
    dot: "bg-cnippet-orange",
    text: "text-cnippet-orange",
  },
  yellow: {
    bg: "bg-cnippet-yellow/5",
    border: "border-cnippet-yellow/40",
    dot: "bg-cnippet-yellow",
    text: "text-cnippet-yellow",
  },
};

export function SectionKicker({ color, children }: SectionKickerProps) {
  const c = colorClasses[color];
  return (
    <div
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-[2px] border border-dashed px-3 py-1.5",
        c.border,
        c.bg,
      )}
    >
      <span className={cn("size-1.5 shrink-0 rounded-full", c.dot)} />
      <span
        className={cn("font-medium font-mono text-xs tracking-wide", c.text)}
      >
        {children}
      </span>
    </div>
  );
}

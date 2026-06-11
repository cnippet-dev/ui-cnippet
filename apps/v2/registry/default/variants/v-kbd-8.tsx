import { Kbd } from "@/registry/default/ui/kbd";

const arrowKeys = [
  { key: "↑", label: "Up" },
  { key: "↓", label: "Down" },
  { key: "←", label: "Left" },
  { key: "→", label: "Right" },
];

export function Pattern() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-muted-foreground text-xs">Navigate with arrow keys</p>
      <div className="flex flex-col items-center gap-1">
        <Kbd aria-label="Up arrow">↑</Kbd>
        <div className="flex gap-1">
          <Kbd aria-label="Left arrow">←</Kbd>
          <Kbd aria-label="Down arrow">↓</Kbd>
          <Kbd aria-label="Right arrow">→</Kbd>
        </div>
      </div>
      <div className="flex gap-3">
        {arrowKeys.map(({ key, label }) => (
          <div className="flex flex-col items-center gap-1" key={label}>
            <Kbd aria-label={`${label} arrow`}>{key}</Kbd>
            <span className="text-muted-foreground text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

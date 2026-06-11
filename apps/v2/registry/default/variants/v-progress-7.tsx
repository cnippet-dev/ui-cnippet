import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/registry/default/ui/progress";

const skills = [
  { label: "TypeScript", value: 92 },
  { label: "React", value: 88 },
  { label: "Node.js", value: 74 },
  { label: "PostgreSQL", value: 65 },
  { label: "Docker", value: 58 },
  { label: "Rust", value: 31 },
];

export function Pattern() {
  return (
    <div className="w-full max-w-xs space-y-3">
      <p className="font-semibold text-sm">Skills</p>
      {skills.map((skill) => (
        <Progress key={skill.label} value={skill.value}>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">{skill.label}</span>
            <span className="text-muted-foreground tabular-nums">
              {skill.value}%
            </span>
          </div>
          <ProgressTrack className="h-1.5">
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      ))}
    </div>
  );
}

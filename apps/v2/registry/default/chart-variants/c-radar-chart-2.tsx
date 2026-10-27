"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { RadarChart } from "@/registry/default/charts/radar-chart";

// Self-assessed skill levels, 1–5.
const data = [
  { level: 5, skill: "React" },
  { level: 4, skill: "TypeScript" },
  { level: 3, skill: "Testing" },
  { level: 4, skill: "CSS" },
  { level: 2, skill: "DevOps" },
  { level: 3, skill: "Design" },
];

export default function SkillProfile() {
  return (
    <ChartCard
      className="max-w-sm"
      description="Self-assessment, 1–5"
      title="Skill profile"
    >
      <RadarChart
        categories={["level"]}
        className="h-64"
        config={{ level: { color: "var(--chart-2)", label: "Level" } }}
        data={data}
        gridType="circle"
        index="skill"
        showDots
      />
    </ChartCard>
  );
}

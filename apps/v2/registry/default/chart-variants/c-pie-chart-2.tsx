"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { PieChart } from "@/registry/default/charts/pie-chart";

// "How did you hear about us?" — 412 responses.
const data = [
  { answer: "Search", responses: 148 },
  { answer: "A friend", responses: 102 },
  { answer: "Social media", responses: 79 },
  { answer: "Newsletter", responses: 51 },
  { answer: "Other", responses: 32 },
];

export default function SurveyAnswers() {
  return (
    <ChartCard
      className="max-w-md"
      description="How did you hear about us? 412 responses"
      title="Survey"
    >
      <PieChart
        category="responses"
        className="h-60"
        data={data}
        index="answer"
        legendLayout="side"
        showLabels
        valueFormatter={(value) => `${value} responses`}
      />
    </ChartCard>
  );
}

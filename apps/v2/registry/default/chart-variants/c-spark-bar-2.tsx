"use client";

import { SparkBar } from "@/registry/default/charts/spark-bar";

// Last 15 games per team: 1 = win, -1 = loss.
const teams = [
  {
    name: "Falcons",
    results: [1, 1, -1, 1, 1, 1, -1, 1, 1, -1, 1, 1, 1, 1, -1],
  },
  {
    name: "Rovers",
    results: [-1, 1, -1, -1, 1, -1, 1, 1, -1, -1, 1, -1, 1, -1, -1],
  },
  {
    name: "Comets",
    results: [1, -1, 1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, -1, 1],
  },
];

export default function WinLoss() {
  return (
    <ul className="w-full max-w-sm divide-y rounded-lg border bg-card">
      {teams.map((t) => {
        const wins = t.results.filter((r) => r > 0).length;
        return (
          <li className="flex items-center gap-4 px-4 py-3" key={t.name}>
            <span className="flex-1 font-medium text-sm">{t.name}</span>
            <SparkBar
              aria-label={`${t.name}: ${wins} wins, ${t.results.length - wins} losses in the last 15 games`}
              categories={["result"]}
              className="h-8 w-36"
              colorBySign
              data={t.results.map((result, game) => ({ game, result }))}
              index="game"
            />
            <span className="w-10 text-end text-muted-foreground text-xs tabular-nums">
              {wins}–{t.results.length - wins}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

"use client";

import { Tracker } from "@/registry/default/charts/tracker";

// Last 30 CI runs on main, oldest first.
const runs = "pppppfpppppppcpppfppppppppppppp"
  .slice(0, 30)
  .split("")
  .map((r, i) => {
    const build = 1842 + i;
    const status = r === "f" ? "Failed" : r === "c" ? "Cancelled" : "Passed";
    return {
      color:
        status === "Failed"
          ? "var(--destructive)"
          : status === "Cancelled"
            ? "var(--muted-foreground)"
            : "var(--success)",
      key: String(build),
      tooltip: `#${build} — ${status}`,
    };
  });

export default function BuildHistory() {
  const passed = runs.filter((r) => r.tooltip.endsWith("Passed")).length;

  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-5">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-sm">main</span>
        <span className="text-muted-foreground text-sm tabular-nums">
          {passed}/{runs.length} passed
        </span>
      </div>
      <Tracker
        aria-label="Last 30 CI builds on main"
        className="mt-3 h-6"
        data={runs}
      />
    </div>
  );
}

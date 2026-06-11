import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Card, CardContent } from "@/registry/default/ui/card";

const stats = [
  { delta: "+14.2%", label: "Total Users", trend: "up", value: "84,210" },
  { delta: "+7.8%", label: "Monthly Revenue", trend: "up", value: "$31,540" },
  { delta: "-3.1%", label: "Churn Rate", trend: "down", value: "2.4%" },
  { delta: "+22.5%", label: "Active Sessions", trend: "up", value: "12,840" },
];

export function Pattern() {
  return (
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      {stats.map((stat) => (
        <Card className="w-full" key={stat.label}>
          <CardContent className="flex flex-col gap-1.5">
            <span className="text-muted-foreground text-xs">{stat.label}</span>
            <span className="font-bold text-xl tabular-nums">{stat.value}</span>
            <span
              className={`flex items-center gap-1 font-medium text-xs ${
                stat.trend === "up"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              {stat.trend === "up" ? (
                <TrendingUpIcon className="size-3.5" />
              ) : (
                <TrendingDownIcon className="size-3.5" />
              )}
              {stat.delta} vs last month
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

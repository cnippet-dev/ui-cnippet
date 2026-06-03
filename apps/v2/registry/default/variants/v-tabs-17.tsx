import {
  ActivityIcon,
  DownloadIcon,
  FileTextIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Card, CardContent } from "@/registry/default/ui/card";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

const metrics = [
  {
    change: "+12.4%",
    label: "Page views",
    positive: true,
    value: "128,430",
  },
  {
    change: "+8.1%",
    label: "Unique visitors",
    positive: true,
    value: "43,210",
  },
  { change: "-2.3%", label: "Bounce rate", positive: true, value: "34.2%" },
  {
    change: "+0.5%",
    label: "Avg. session",
    positive: true,
    value: "3m 42s",
  },
];

const reports = [
  { date: "Mar 1, 2025", name: "Q1 Traffic Summary", size: "42 KB" },
  { date: "Feb 1, 2025", name: "Monthly Performance", size: "18 KB" },
  { date: "Jan 15, 2025", name: "Conversion Funnel", size: "31 KB" },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Tabs defaultValue="analytics">
        <TabsList className="w-full">
          <TabsTab className="gap-1.5" value="analytics">
            <TrendingUpIcon className="size-3.5" />
            Analytics
          </TabsTab>
          <TabsTab className="gap-1.5" value="reports">
            <FileTextIcon className="size-3.5" />
            Reports
          </TabsTab>
          <TabsTab className="gap-1.5" value="exports">
            <DownloadIcon className="size-3.5" />
            Exports
          </TabsTab>
          <TabsTab className="gap-1.5" value="activity">
            <ActivityIcon className="size-3.5" />
            Activity
          </TabsTab>
        </TabsList>

        <TabsPanel className="pt-4" value="analytics">
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((m) => (
              <Card key={m.label}>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-xs">{m.label}</p>
                  <p className="mt-1 font-bold text-xl">{m.value}</p>
                  <p
                    className={`mt-0.5 text-xs ${m.positive ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {m.change} vs last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsPanel>

        <TabsPanel className="pt-4" value="reports">
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-col divide-y divide-border">
                {reports.map((r) => (
                  <div
                    className="flex items-center justify-between px-4 py-3"
                    key={r.name}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-sm">{r.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {r.date}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {r.size}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsPanel>

        <TabsPanel className="pt-4" value="exports">
          <Card>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Export your data in CSV, JSON, or XLSX format. Exports are
                available for the last 90 days.
              </p>
            </CardContent>
          </Card>
        </TabsPanel>

        <TabsPanel className="pt-4" value="activity">
          <Card>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Recent workspace activity and audit events appear here.
              </p>
            </CardContent>
          </Card>
        </TabsPanel>
      </Tabs>
    </div>
  );
}

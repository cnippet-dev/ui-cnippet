import { ScrollArea } from "@/registry/default/ui/scroll-area";

const rows = [
  {
    country: "United States",
    mrr: "$84,230",
    plan: "Enterprise",
    status: "Active",
    users: 1240,
  },
  {
    country: "Germany",
    mrr: "$52,100",
    plan: "Team",
    status: "Active",
    users: 840,
  },
  {
    country: "Japan",
    mrr: "$47,890",
    plan: "Enterprise",
    status: "Active",
    users: 620,
  },
  {
    country: "United Kingdom",
    mrr: "$39,450",
    plan: "Team",
    status: "Active",
    users: 510,
  },
  {
    country: "Canada",
    mrr: "$28,760",
    plan: "Pro",
    status: "Trial",
    users: 390,
  },
  {
    country: "France",
    mrr: "$21,300",
    plan: "Pro",
    status: "Active",
    users: 280,
  },
  {
    country: "Australia",
    mrr: "$18,900",
    plan: "Team",
    status: "Active",
    users: 240,
  },
  {
    country: "India",
    mrr: "$14,200",
    plan: "Pro",
    status: "Trial",
    users: 195,
  },
];

const headers = ["Country", "Users", "Plan", "MRR", "Status"];

export default function Particle() {
  return (
    <ScrollArea className="max-w-sm rounded-lg border">
      <table className="w-max min-w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            {headers.map((h) => (
              <th
                className="whitespace-nowrap px-4 py-2 text-left font-medium text-muted-foreground text-xs"
                key={h}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              className="border-b last:border-0 hover:bg-muted/30"
              key={row.country}
            >
              <td className="whitespace-nowrap px-4 py-2">{row.country}</td>
              <td className="whitespace-nowrap px-4 py-2 tabular-nums">
                {row.users.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-4 py-2">{row.plan}</td>
              <td className="whitespace-nowrap px-4 py-2 tabular-nums">
                {row.mrr}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <span
                  className={`rounded-full px-2 py-0.5 font-medium text-xs ${
                    row.status === "Active"
                      ? "bg-green-500/10 text-green-700 dark:text-green-400"
                      : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
}

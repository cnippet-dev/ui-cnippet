import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/registry/default/ui/progress";

const categories = [
  {
    budget: 600,
    color: "**:data-[slot=progress-indicator]:bg-blue-500",
    label: "Housing",
    spent: 600,
  },
  {
    budget: 400,
    color: "**:data-[slot=progress-indicator]:bg-emerald-500",
    label: "Groceries",
    spent: 284,
  },
  {
    budget: 150,
    color: "**:data-[slot=progress-indicator]:bg-violet-500",
    label: "Transport",
    spent: 137,
  },
  {
    budget: 200,
    color: "**:data-[slot=progress-indicator]:bg-amber-500",
    label: "Dining out",
    spent: 198,
  },
  {
    budget: 100,
    color: "**:data-[slot=progress-indicator]:bg-rose-500",
    label: "Entertainment",
    spent: 121,
  },
  {
    budget: 80,
    color: "**:data-[slot=progress-indicator]:bg-cyan-500",
    label: "Health",
    spent: 42,
  },
];

const totalBudget = categories.reduce((s, c) => s + c.budget, 0);
const totalSpent = categories.reduce((s, c) => s + c.spent, 0);
const remaining = totalBudget - totalSpent;

export function Pattern() {
  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>May Budget</CardTitle>
          <CardDescription>
            <span
              className={remaining < 0 ? "font-medium text-destructive" : ""}
            >
              ${Math.abs(remaining).toFixed(0)}{" "}
              {remaining < 0 ? "over budget" : "remaining"}
            </span>
            {" · "}${totalSpent} of ${totalBudget} spent
          </CardDescription>
        </CardHeader>
        <CardPanel className="space-y-4">
          {categories.map((cat) => {
            const _pct = Math.min((cat.spent / cat.budget) * 100, 100);
            const over = cat.spent > cat.budget;
            return (
              <Progress
                className={cat.color}
                key={cat.label}
                max={cat.budget}
                value={cat.spent}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{cat.label}</span>
                  <span
                    className={`tabular-nums ${over ? "font-medium text-destructive" : "text-muted-foreground"}`}
                  >
                    ${cat.spent}
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      / ${cat.budget}
                    </span>
                  </span>
                </div>
                <ProgressTrack className="h-2">
                  <ProgressIndicator
                    className={over ? "bg-destructive!" : undefined}
                  />
                </ProgressTrack>
                {over && (
                  <p className="text-destructive text-xs">
                    ${cat.spent - cat.budget} over limit
                  </p>
                )}
              </Progress>
            );
          })}
        </CardPanel>
      </Card>
    </div>
  );
}

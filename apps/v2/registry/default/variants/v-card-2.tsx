import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export function Pattern() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="border-b">
        <CardTitle>Weekly digest</CardTitle>
        <CardDescription>
          Activity in Acme Workspace, Oct 6 – 12.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          14 pull requests merged, 3 incidents resolved and 2 new members joined
          the team this week.
        </p>
      </CardContent>
    </Card>
  );
}

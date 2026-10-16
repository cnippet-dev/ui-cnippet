import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export function Pattern() {
  return (
    <div className="relative size-fit">
      {/* Card */}
      <Card className="relative z-1 w-full max-w-xs">
        <CardHeader>
          <CardTitle>3 pending invites</CardTitle>
          <CardDescription>Join a team to start collaborating.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Priya Shah invited you to Acme Design, along with 2 other teams.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline">
            View invites
          </Button>
        </CardFooter>
      </Card>
      {/* Depth effect */}
      <div className="absolute inset-4 -bottom-3 z-0 rounded-lg border bg-card shadow-black/1 shadow-md" />
      <div className="absolute inset-2 -bottom-1.5 z-0 rounded-lg border bg-card shadow-black/1 shadow-md" />
    </div>
  );
}

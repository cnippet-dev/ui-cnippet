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
          <CardTitle>Default Card</CardTitle>
          <CardDescription>
            This card uses the default size variant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The card component supports a size prop that defaults to
            &quot;default&quot; for standard spacing and sizing.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline">
            Action
          </Button>
        </CardFooter>
      </Card>
      {/* Depth effect */}
      <div className="absolute inset-4 -bottom-3 z-0 rounded-lg border bg-card shadow-black/1 shadow-md" />
      <div className="absolute inset-2 -bottom-1.5 z-0 rounded-lg border bg-card shadow-black/1 shadow-md" />
    </div>
  );
}

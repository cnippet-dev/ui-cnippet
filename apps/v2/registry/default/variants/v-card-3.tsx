import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export function Pattern() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="border-b">
        <CardTitle>Header with Border</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          The footer has a border-t class applied, creating a visual separation
          between the content and footer sections.
        </p>
      </CardContent>
      <CardFooter className="border-t">
        <Button className="w-full" variant="outline">
          Action
        </Button>
      </CardFooter>
    </Card>
  );
}

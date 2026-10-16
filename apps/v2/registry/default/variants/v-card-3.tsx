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
        <CardTitle>Export workspace data</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          We&apos;ll bundle your projects, members and billing history into a
          ZIP file and email you a download link.
        </p>
      </CardContent>
      <CardFooter className="border-t">
        <Button className="w-full" variant="outline">
          Request export
        </Button>
      </CardFooter>
    </Card>
  );
}

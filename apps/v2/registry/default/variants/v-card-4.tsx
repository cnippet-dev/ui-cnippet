import { ExternalLinkIcon } from "lucide-react";
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
    <Card className="w-full max-w-xs gap-2 pt-5">
      <CardHeader>
        <CardTitle>Need help with your claim?</CardTitle>
      </CardHeader>
      <CardContent className="mb-2">
        <p>
          Follow our step-by-step guide to certify for your weekly benefits.
        </p>
      </CardContent>
      <CardFooter className="py-2">
        <Button className="px-0" variant="link">
          Read the guide
          <ExternalLinkIcon aria-hidden="true" />
        </Button>
      </CardFooter>
    </Card>
  );
}

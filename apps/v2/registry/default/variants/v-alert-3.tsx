import { InfoIcon } from "lucide-react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <Alert className="w-full">
      <InfoIcon />
      <AlertTitle>Security Update</AlertTitle>
      <AlertDescription>Update your password and enable 2FA.</AlertDescription>
      <AlertAction>
        <Button size="xs" variant="ghost">
          Dismiss
        </Button>
        <Button size="xs">Update</Button>
      </AlertAction>
    </Alert>
  );
}

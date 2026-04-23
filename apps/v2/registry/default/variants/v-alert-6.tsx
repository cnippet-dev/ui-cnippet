import { TriangleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";

export default function Particle() {
  return (
    <Alert variant="warning">
      <TriangleAlertIcon />
      <AlertTitle>Warning!</AlertTitle>
      <AlertDescription>
        Please check your settings. If the problem persists, contact support.
      </AlertDescription>
    </Alert>
  );
}

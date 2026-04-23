import { InfoIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";

export default function Particle() {
  return (
    <Alert variant="info">
      <InfoIcon />
      <AlertTitle>Info!</AlertTitle>
      <AlertDescription>
        This is an important message. Please read it carefully.
      </AlertDescription>
    </Alert>
  );
}

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@cnippet/ui/components/alert";
import { Skeleton } from "@cnippet/ui/components/skeleton";
import { InfoIcon } from "lucide-react";

export default function AlertPreview() {
  return (
    <div className="relative w-52">
      {/* Default — visible, fades out on hover */}
      <Alert className="w-52 transition-opacity duration-300 group-hover:opacity-0">
        <AlertTitle>
          <Skeleton className="h-2 w-12" />
        </AlertTitle>
        <AlertDescription>
          <div className="space-y-2 pt-2">
            <Skeleton className="h-2 w-full" />
          </div>
        </AlertDescription>
      </Alert>

      {/* Info — hidden, fades in on hover */}
      <Alert
        className="absolute inset-0 w-56 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        variant="info"
      >
        <InfoIcon className="pt-1" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription className="text-[9px]">
          Describe what can be done about it here.
        </AlertDescription>
      </Alert>
    </div>
  );
}

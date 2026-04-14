import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

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
        className="absolute inset-0 w-52 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        variant="info"
      >
        <AlertTitle>
          <Skeleton className="h-2 w-12 dark:bg-blue-600" />
        </AlertTitle>
        <AlertDescription>
          <div className="space-y-2 pt-2">
            <Skeleton className="h-2 w-full dark:bg-blue-200" />
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}

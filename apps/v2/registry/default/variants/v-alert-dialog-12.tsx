import { TrendingDownIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/default/ui/alert-dialog";
import { Button } from "@/registry/default/ui/button";

const lostFeatures = [
  "Unlimited team members",
  "Custom domain support",
  "Priority support (24h SLA)",
  "Advanced analytics dashboard",
  "SSO & SAML integration",
];

export function Pattern() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">Downgrade to Free</Button>}
      />
      <AlertDialogContent className="sm:max-w-md">
        <div className="flex items-start gap-3 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
            <TrendingDownIcon className="size-5 text-destructive" />
          </div>
          <div>
            <AlertDialogTitle className="font-semibold text-sm">
              Downgrade to Free plan?
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-1 text-muted-foreground text-sm">
              You&apos;ll lose access to the following features at the end of
              your billing period:
            </AlertDialogDescription>
          </div>
        </div>
        <ul className="mx-4 mb-4 space-y-1.5 rounded-lg border bg-muted/50 p-3">
          {lostFeatures.map((f) => (
            <li
              className="flex items-center gap-2 text-muted-foreground text-sm"
              key={f}
            >
              <span className="size-1.5 shrink-0 rounded-full bg-destructive" />
              {f}
            </li>
          ))}
        </ul>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost" />}>
            Keep Pro
          </AlertDialogClose>
          <AlertDialogClose render={<Button variant="destructive" />}>
            Downgrade Anyway
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

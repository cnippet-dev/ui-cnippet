import { ChevronRightIcon } from "lucide-react";

import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <Button
      className="group h-auto gap-4 px-4 py-3 text-left"
      variant="outline"
    >
      <div className="space-y-1">
        <h3>Talent Agency</h3>
        <p className="whitespace-break-spaces font-normal text-muted-foreground">
          Matches for your roster
        </p>
      </div>
      <ChevronRightIcon
        aria-hidden="true"
        className="opacity-72 transition-transform group-hover:translate-x-0.5"
      />
    </Button>
  );
}

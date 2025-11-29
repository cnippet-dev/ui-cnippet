import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <Button variant="link">
      <ChevronLeftIcon aria-hidden="true" className="opacity-72" />
      Go back
    </Button>
  );
}

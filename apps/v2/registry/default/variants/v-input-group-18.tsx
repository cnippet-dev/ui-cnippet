import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <p className="font-medium text-sm">Stay in the loop</p>
      <p className="text-muted-foreground text-xs">
        Get weekly updates. No spam, unsubscribe anytime.
      </p>
      <InputGroup>
        <InputGroupInput
          aria-label="Email address"
          placeholder="you@example.com"
          type="email"
        />
        <InputGroupAddon align="inline-end">
          <Button aria-label="Subscribe" size="icon-xs" variant="ghost">
            <ArrowRightIcon aria-hidden="true" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

import { UserPlusIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";

export function Pattern() {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="w-full max-w-sm border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserPlusIcon />
          </EmptyMedia>
          <EmptyTitle>No team members yet</EmptyTitle>
          <EmptyDescription>
            Invite your team to collaborate and get more done together.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup className="w-full">
            <InputGroupInput
              aria-label="Email address"
              placeholder="colleague@company.com"
              type="email"
            />
            <InputGroupAddon align="inline-end">
              <Button size="sm" variant="ghost">
                Invite
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </EmptyContent>
      </Empty>
    </div>
  );
}

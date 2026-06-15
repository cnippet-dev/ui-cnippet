import { ActivityIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

export function Pattern() {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ActivityIcon />
          </EmptyMedia>
          <EmptyTitle>No recent activity</EmptyTitle>
          <EmptyDescription>
            Actions taken by you and your team will appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm" variant="outline">
            View all activity
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

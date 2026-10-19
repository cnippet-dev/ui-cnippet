// title: Pull request activity feed with avatars and icons
import { GitMergeIcon, MessageSquareIcon, TagIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/registry/default/ui/timeline";

export default function Particle() {
  return (
    <div className="w-full max-w-md rounded-xl border p-5">
      <p className="mb-4 font-medium text-sm">Activity</p>
      <Timeline>
        <TimelineItem>
          <TimelineIndicator className="overflow-hidden border-0">
            <Avatar className="size-full">
              <AvatarImage
                alt=""
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80"
              />
              <AvatarFallback>MP</AvatarFallback>
            </Avatar>
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>
              <strong>Maya Patel</strong> commented
            </TimelineTitle>
            <TimelineDescription className="rounded-lg border bg-muted/40 px-3 py-2">
              Retry logic looks good. Can we cap the backoff at 30s?
            </TimelineDescription>
            <TimelineTime dateTime="2026-10-19T14:12">12 min ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIndicator>
            <TagIcon />
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>
              <strong>Leo Park</strong> added{" "}
              <Badge size="sm" variant="outline">
                needs-review
              </Badge>
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-19T11:40">2 hours ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIndicator>
            <MessageSquareIcon />
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>
              <strong>Ana Ruiz</strong> requested changes
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-18T17:05">Yesterday</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIndicator className="border-primary bg-primary text-primary-foreground">
            <GitMergeIcon />
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>
              <strong>Leo Park</strong> opened #482: Retry failed webhooks
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-17T09:30">Oct 17</TimelineTime>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

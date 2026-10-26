"use client";

import { SendIcon, WebhookIcon } from "lucide-react";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { Button } from "@/registry/default/ui/button";

export default function NoEventsYet() {
  return (
    <ChartCard
      className="max-w-lg"
      description="Delivered vs failed, per hour"
      title="Webhook deliveries"
    >
      <ChartEmpty
        action={
          <Button size="sm">
            <SendIcon />
            Send test event
          </Button>
        }
        className="aspect-auto h-56"
        description="Deliveries show up here once your endpoint receives its first event."
        icon={<WebhookIcon />}
        title="No events yet"
      />
    </ChartCard>
  );
}

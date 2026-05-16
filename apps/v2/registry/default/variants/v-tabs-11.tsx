import { Badge } from "@/registry/default/ui/badge";

import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs";

export function Pattern() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Tabs defaultValue="inbox">
        <TabsList className="mb-3.5 w-full" variant="underline">
          <TabsTrigger className="gap-2" value="inbox">
            Inbox
            <Badge size="sm" variant="secondary">
              12
            </Badge>
          </TabsTrigger>
          <TabsTrigger className="gap-2" value="drafts">
            Drafts
            <Badge size="sm" variant="info">
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger className="gap-2" value="sent">
            Sent
          </TabsTrigger>
          <TabsTrigger className="gap-2" value="spam">
            Spam
            <Badge size="sm" variant="destructive">
              24
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inbox">
          <Card>
            <CardContent>12 unread messages in your inbox.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="drafts">
          <Card>
            <CardContent>3 drafts waiting to be sent.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sent">
          <Card>
            <CardContent>All sent messages appear here.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="spam">
          <Card>
            <CardContent>24 spam messages detected.</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

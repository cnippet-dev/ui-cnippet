// title: With Icons
import { BarChart3Icon, LayoutDashboardIcon, SettingsIcon } from "lucide-react";
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
      <Tabs defaultValue="overview">
        <TabsList className="w-full">
          <TabsTrigger value="overview">
            <LayoutDashboardIcon className="size-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3Icon className="size-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings">
            <SettingsIcon className="size-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardContent>
              12 active projects, 3 deploys today, 99.98% uptime.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardContent>
              Traffic is up 18% compared with last week.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardContent>
              Manage your workspace name, members and billing.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

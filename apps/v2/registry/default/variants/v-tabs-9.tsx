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
            <CardContent>Overview dashboard content goes here.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardContent>Analytics charts and metrics.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardContent>Application settings and preferences.</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

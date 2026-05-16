import {
  BuildingIcon,
  CheckSquareIcon,
  FileTextIcon,
  FolderIcon,
  UserIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs";

const plans = [
  {
    description: "For individuals and small projects",
    icon: <UserIcon className="size-5" />,
    id: "starter",
    name: "Starter",
    price: "$9",
    tablerIcon: "IconUser",
  },
  {
    description: "For growing teams and businesses",
    icon: <ZapIcon className="size-5" />,
    id: "pro",
    name: "Pro",
    price: "$29",
    tablerIcon: "IconBolt",
  },
  {
    description: "For large organizations",
    icon: <BuildingIcon className="size-5" />,
    id: "enterprise",
    name: "Enterprise",
    price: "$99",
    tablerIcon: "IconBuilding",
  },
];

export function Pattern() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Tabs className="gap-5" defaultValue="projects" orientation="vertical">
        <TabsList className="w-48 shrink-0">
          <TabsTrigger className="justify-start gap-2" value="projects">
            <FolderIcon className="size-4" />
            Projects
            <Badge className="ml-auto" size="sm" variant="secondary">
              8
            </Badge>
          </TabsTrigger>
          <TabsTrigger className="justify-start gap-2" value="tasks">
            <CheckSquareIcon className="size-4" />
            Tasks
            <Badge className="ml-auto" size="sm">
              24
            </Badge>
          </TabsTrigger>
          <TabsTrigger className="justify-start gap-2" value="team">
            <UsersIcon className="size-4" />
            Team
          </TabsTrigger>
          <TabsTrigger className="justify-start gap-2" value="reports">
            <FileTextIcon className="size-4" />
            Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <Card>
            <CardContent>
              <h3 className="text-foreground mb-2 font-semibold">
                Active Projects
              </h3>
              <p>8 projects are currently in progress across your workspace.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks">
          <Card>
            <CardContent>
              <h3 className="text-foreground mb-2 font-semibold">
                Pending Tasks
              </h3>
              <p>24 tasks need your attention this week.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardContent>
              <h3 className="text-foreground mb-2 font-semibold">
                Team Members
              </h3>
              <p>Manage your team and their access permissions.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardContent>
              <h3 className="text-foreground mb-2 font-semibold">Reports</h3>
              <p>View generated reports and export data.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

const tabs = [
  {
    content: "Revenue is up 12% on last month.",
    label: "Overview",
    value: "overview",
  },
  {
    content: "1,284 sessions in the last 7 days.",
    label: "Analytics",
    value: "analytics",
  },
  {
    content: "3 scheduled reports this week.",
    label: "Reports",
    value: "reports",
  },
];

function Panels() {
  return tabs.map((tab) => (
    <TabsPanel key={tab.value} value={tab.value}>
      <p className="p-3 text-muted-foreground text-sm">{tab.content}</p>
    </TabsPanel>
  ));
}

function Triggers() {
  return tabs.map((tab) => (
    <TabsTab key={tab.value} value={tab.value}>
      {tab.label}
    </TabsTab>
  ));
}

export default function Particle() {
  return (
    <div className="grid w-full max-w-2xl gap-8 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs">Default</span>
        <Tabs defaultValue="overview">
          <TabsList>
            <Triggers />
          </TabsList>
          <Panels />
        </Tabs>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs">Underline</span>
        <Tabs defaultValue="overview">
          <div className="border-b">
            <TabsList variant="underline">
              <Triggers />
            </TabsList>
          </div>
          <Panels />
        </Tabs>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs">Vertical</span>
        <Tabs defaultValue="overview" orientation="vertical">
          <TabsList>
            <Triggers />
          </TabsList>
          <Panels />
        </Tabs>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs">
          Vertical underline
        </span>
        <Tabs defaultValue="overview" orientation="vertical">
          <div className="border-s">
            <TabsList variant="underline">
              <Triggers />
            </TabsList>
          </div>
          <Panels />
        </Tabs>
      </div>
    </div>
  );
}

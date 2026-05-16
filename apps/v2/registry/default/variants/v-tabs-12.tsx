"use client";

import {
  CalendarClockIcon,
  CalendarIcon,
  SquareCheckIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs";

export function Pattern() {
  const [period, setPeriod] = useState("monthly");

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-6">
      <Tabs onValueChange={setPeriod} value={period}>
        <TabsList className="w-full">
          <TabsTrigger className="gap-1.5" value="daily">
            <CalendarIcon className="size-3.5" />
            Daily
          </TabsTrigger>
          <TabsTrigger className="gap-1.5" value="weekly">
            <SquareCheckIcon className="size-4" />
            Weekly
          </TabsTrigger>
          <TabsTrigger className="gap-1.5" value="monthly">
            <UsersIcon className="size-4" />
            Monthly
          </TabsTrigger>
          <TabsTrigger className="gap-1.5" value="yearly">
            <CalendarClockIcon className="size-3.5" />
            Yearly
          </TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <Card>
            <CardContent className="text-center">
              <p className="font-bold text-3xl">1,284</p>
              <p className="mt-1 text-muted-foreground text-sm">
                Visitors today
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weekly">
          <Card>
            <CardContent className="text-center">
              <p className="font-bold text-3xl">8,942</p>
              <p className="mt-1 text-muted-foreground text-sm">
                Visitors this week
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly">
          <Card>
            <CardContent className="text-center">
              <p className="font-bold text-3xl">32,156</p>
              <p className="mt-1 text-muted-foreground text-sm">
                Visitors this month
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="yearly">
          <Card>
            <CardContent className="text-center">
              <p className="font-bold text-3xl">384,721</p>
              <p className="mt-1 text-muted-foreground text-sm">
                Visitors this year
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

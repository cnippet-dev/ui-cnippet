import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs";

export function Pattern() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <Tabs className="gap-5" defaultValue="account" orientation="vertical">
        <TabsList className="h-fit w-40 shrink-0" variant="underline">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Account</CardTitle>
              <CardDescription className="text-sm">
                Update your account information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="underline-vertical-name">
                  Name
                </Label>
                <Input
                  className="h-9"
                  defaultValue="Michael Brown"
                  id="underline-vertical-name"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="underline-vertical-email">
                  Email
                </Label>
                <Input
                  className="h-9"
                  defaultValue="michael.brown@example.com"
                  id="underline-vertical-email"
                  type="email"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-3">
              <Button size="sm">Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Password</CardTitle>
              <CardDescription className="text-sm">
                Change your password here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="underline-vertical-current">
                  Current password
                </Label>
                <Input
                  className="h-9"
                  id="underline-vertical-current"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="underline-vertical-new">
                  New password
                </Label>
                <Input
                  className="h-9"
                  id="underline-vertical-new"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-3">
              <Button size="sm">Update password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Settings</CardTitle>
              <CardDescription className="text-sm">
                Manage your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="underline-vertical-theme">
                  Theme
                </Label>
                <Input
                  className="h-9"
                  defaultValue="Light"
                  id="underline-vertical-theme"
                />
              </div>
              <div className="space-y-2">
                <Label
                  className="text-sm"
                  htmlFor="underline-vertical-language"
                >
                  Language
                </Label>
                <Input
                  className="h-9"
                  defaultValue="English"
                  id="underline-vertical-language"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-3">
              <Button size="sm">Save settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Button } from "@/registry/default/ui/button";
import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/registry/default/ui/frame";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  return (
    <Frame className="w-full max-w-md">
      <FrameHeader>
        <FrameTitle>Display name</FrameTitle>
        <FrameDescription>
          This is the name that will be visible to other users.
        </FrameDescription>
      </FrameHeader>
      <FramePanel>
        <div className="flex flex-col gap-2">
          <Label htmlFor="display-name">Name</Label>
          <Input
            defaultValue="Alex Rivera"
            id="display-name"
            type="text"
          />
        </div>
      </FramePanel>
      <FrameFooter className="flex justify-end gap-2">
        <Button type="reset" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </FrameFooter>
    </Frame>
  );
}

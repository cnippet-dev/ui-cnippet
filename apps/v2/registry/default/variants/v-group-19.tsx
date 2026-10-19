// title: Showcase: outline, small, primary and with input
import {
  ChevronDownIcon,
  FilesIcon,
  FilmIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";
import { Input } from "@/registry/default/ui/input";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-center">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function Particle() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Row label="Outline">
        <Group aria-label="Library">
          <Button variant="outline">
            <FilesIcon aria-hidden="true" />
            Files
          </Button>
          <GroupSeparator />
          <Button variant="outline">
            <FilmIcon aria-hidden="true" />
            Media
          </Button>
          <GroupSeparator />
          <Button disabled variant="outline">
            Archive
          </Button>
        </Group>
      </Row>
      <Row label="Small">
        <Group aria-label="Zoom">
          <Button aria-label="Zoom out" size="icon-sm" variant="outline">
            <MinusIcon aria-hidden="true" />
          </Button>
          <GroupSeparator />
          <Button size="sm" variant="outline">
            100%
          </Button>
          <GroupSeparator />
          <Button aria-label="Zoom in" size="icon-sm" variant="outline">
            <PlusIcon aria-hidden="true" />
          </Button>
        </Group>
      </Row>
      <Row label="Primary">
        <Group aria-label="Deploy">
          <Button>Deploy</Button>
          <GroupSeparator className="bg-primary/72" />
          <Button aria-label="More deploy options" size="icon">
            <ChevronDownIcon aria-hidden="true" />
          </Button>
        </Group>
      </Row>
      <Row label="With input">
        <Group aria-label="Invite">
          <Input aria-label="Email" placeholder="teammate@acme.com" />
          <GroupSeparator />
          <Button variant="outline">Invite</Button>
        </Group>
      </Row>
    </div>
  );
}

// title: Showcase: variants, sizes, icons and states
import {
  ArrowRightIcon,
  CloudDownloadIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";

const variants = [
  "default",
  "outline",
  "secondary",
  "destructive",
  "destructive-outline",
  "ghost",
  "link",
] as const;

const sizes = ["xs", "sm", "default", "lg", "xl"] as const;

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
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export default function Particle() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <Row label="Variants">
        {variants.map((variant) => (
          <Button className="capitalize" key={variant} variant={variant}>
            {variant.replace("-", " ")}
          </Button>
        ))}
      </Row>
      <Row label="Sizes">
        {sizes.map((size) => (
          <Button key={size} size={size} variant="outline">
            {size === "default" ? "Default" : size.toUpperCase()}
          </Button>
        ))}
      </Row>
      <Row label="With icon">
        <Button>
          <CloudDownloadIcon aria-hidden="true" />
          Download
        </Button>
        <Button variant="outline">
          <PlusIcon aria-hidden="true" />
          Add item
        </Button>
        <Button variant="destructive">
          <Trash2Icon aria-hidden="true" />
          Delete
        </Button>
        <Button variant="link">
          Learn more
          <ArrowRightIcon aria-hidden="true" />
        </Button>
      </Row>
      <Row label="Icon only">
        <Button aria-label="Search" size="icon">
          <SearchIcon aria-hidden="true" />
        </Button>
        <Button aria-label="Add" size="icon" variant="outline">
          <PlusIcon aria-hidden="true" />
        </Button>
        <Button aria-label="Delete" size="icon" variant="ghost">
          <Trash2Icon aria-hidden="true" />
        </Button>
      </Row>
      <Row label="States">
        <Button disabled>Disabled</Button>
        <Button loading>Saving</Button>
      </Row>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function Particle() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Default</p>
        <Button>Button</Button>
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Outline</p>
        <Button variant="outline">Outline</Button>
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Secondary</p>
        <Button variant="secondary">Secondary</Button>
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Destructive</p>
        <Button variant="destructive">Delete</Button>
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Destructive outline</p>
        <Button variant="destructive-outline">Delete</Button>
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Ghost</p>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>W/ Link</p>
        <Button render={<Link href="/" />}>Link</Button>
      </div>

      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>W/ Loading</p>
        <Button disabled>
          <Spinner />
          Loading...
        </Button>
      </div>
    </div>
  );
}

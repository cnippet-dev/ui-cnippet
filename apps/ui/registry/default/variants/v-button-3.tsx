import { Button } from "@/components/ui/button";

export default function Particle() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Extra small</p>
        <Button size="xs">Button</Button>
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Small</p>
        <Button size="sm">Button</Button>
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Large</p>
        <Button size="lg">Button</Button>
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Extra Large</p>
        <Button size="xl">Button</Button>
      </div>
    </div>
  );
}

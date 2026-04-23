import { Badge } from "@/registry/default/ui/badge";

export default function Particle() {
  return (
    <div className="flex items-center gap-2.5">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  );
}

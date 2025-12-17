import { Badge } from "@/components/ui/badge";

export default function Particle() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-10">
        <p className="text-xs">Small</p>
        <Badge size="sm">Badge</Badge>
      </div>
      <div className="flex justify-between gap-10">
        <p className="text-xs">Large</p>
        <Badge size="lg">Badge</Badge>
      </div>
    </div>
  );
}

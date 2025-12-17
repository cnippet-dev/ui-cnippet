import { Badge } from "@/components/ui/badge";

export default function Particle() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-10">
        <p className="text-xs">Outline</p>
        <Badge variant="outline">Badge</Badge>
      </div>
      <div className="flex justify-between gap-10">
        <p className="text-xs">Secondary</p>
        <Badge variant="secondary">Badge</Badge>
      </div>
      <div className="flex justify-between gap-10">
        <p className="text-xs">Desctructive</p>
        <Badge variant="destructive">Badge</Badge>
      </div>
      <div className="flex justify-between gap-10">
        <p className="text-xs">Info</p>
        <Badge variant="info">Badge</Badge>
      </div>
      <div className="flex justify-between gap-10">
        <p className="text-xs">Success</p>
        <Badge variant="success">Badge</Badge>
      </div>
      <div className="flex justify-between gap-10">
        <p className="text-xs">Warning</p>
        <Badge variant="warning">Badge</Badge>
      </div>
      <div className="flex justify-between gap-10">
        <p className="text-xs">Error</p>
        <Badge variant="error">Badge</Badge>
      </div>
    </div>
  );
}

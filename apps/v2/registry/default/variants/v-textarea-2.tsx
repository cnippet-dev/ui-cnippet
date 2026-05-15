import { Textarea } from "@/registry/default/ui/textarea";

export default function Particle() {
  return (
    <div className="mb-1 space-y-2 pt-6 text-muted-foreground text-sm">
      <p>Small</p>
      <Textarea placeholder="Type your message here" size="sm" />

      <p>Large</p>
      <Textarea placeholder="Type your message here" size="lg" />
    </div>
  );
}

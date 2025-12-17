import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Small</p>
        <Input
          aria-label="Enter text"
          placeholder="Enter text"
          size="sm"
          type="text"
        />
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Default</p>
        <Input aria-label="Enter text" placeholder="Enter text" type="text" />
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Large</p>
        <Input
          aria-label="Enter text"
          placeholder="Enter text"
          size="lg"
          type="text"
        />
      </div>
    </div>
  );
}

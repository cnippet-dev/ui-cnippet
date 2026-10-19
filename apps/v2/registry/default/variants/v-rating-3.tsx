// title: Rating sizes, disabled and fractional read-only
import { Rating, RatingDisplay } from "@/registry/default/ui/rating";

export default function Particle() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex items-center gap-3">
        <Rating aria-label="Small" defaultValue={3} size="sm" />
        <span className="text-muted-foreground">Small</span>
      </div>
      <div className="flex items-center gap-3">
        <Rating aria-label="Default" defaultValue={4} />
        <span className="text-muted-foreground">Default</span>
      </div>
      <div className="flex items-center gap-3">
        <Rating aria-label="Large" defaultValue={5} size="lg" />
        <span className="text-muted-foreground">Large</span>
      </div>
      <div className="flex items-center gap-3">
        <Rating aria-label="Disabled" defaultValue={2} disabled />
        <span className="text-muted-foreground">Disabled</span>
      </div>
      <div className="flex items-center gap-3">
        <RatingDisplay value={3.7} />
        <span className="text-muted-foreground">3.7, read-only</span>
      </div>
    </div>
  );
}

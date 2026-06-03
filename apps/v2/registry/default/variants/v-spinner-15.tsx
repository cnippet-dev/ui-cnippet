import { Spinner } from "@/registry/default/ui/spinner";

const sizes = [
  { label: "xs", className: "size-3" },
  { label: "sm", className: "size-4" },
  { label: "md", className: "size-5" },
  { label: "lg", className: "size-6" },
  { label: "xl", className: "size-8" },
  { label: "2xl", className: "size-10" },
];

export default function Particle() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {sizes.map(({ label, className }) => (
        <div className="flex flex-col items-center gap-2" key={label}>
          <Spinner className={`${className} text-primary`} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}

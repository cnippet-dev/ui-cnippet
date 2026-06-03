import { Spinner } from "@/registry/default/ui/spinner";

const sizes = [
  { className: "size-3", label: "xs" },
  { className: "size-4", label: "sm" },
  { className: "size-5", label: "md" },
  { className: "size-6", label: "lg" },
  { className: "size-8", label: "xl" },
  { className: "size-10", label: "2xl" },
];

export default function Particle() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {sizes.map(({ label, className }) => (
        <div className="flex flex-col items-center gap-2" key={label}>
          <Spinner className={`${className} text-primary`} />
          <span className="text-muted-foreground text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

import { Label } from "@cnippet/ui/components/label";
import { Radio, RadioGroup } from "@cnippet/ui/components/radio-group";
import { Skeleton } from "@cnippet/ui/components/skeleton";

const frameworks = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
];

export default function RadioGroupPreview() {
  return (
    <div className="relative w-40">
      <div className="flex flex-col gap-3 transition-opacity duration-300 group-hover:opacity-0">
        {frameworks.map((framework, i) => (
          <div className="flex items-center gap-2" key={framework.value}>
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className={i === 1 ? "h-3 w-12" : "h-3 w-16"} />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <RadioGroup aria-label="Framework" defaultValue="next">
          {frameworks.map((framework) => (
            <Label key={framework.value}>
              <Radio tabIndex={-1} value={framework.value} />
              {framework.label}
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

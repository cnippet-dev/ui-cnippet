import { BriefcaseIcon, MapPinIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";

const jobs = [
  {
    department: "Engineering",
    description:
      "Lead the development of our design system and core UI components, working closely with product and design to ship scalable, accessible interfaces.",
    location: "Remote · Worldwide",
    requirements: [
      "5+ years React experience",
      "TypeScript proficiency",
      "Experience with design systems",
    ],
    salary: "$140k – $180k",
    title: "Senior Frontend Engineer",
    type: "Full-time",
    value: "job-1",
  },
  {
    department: "Design",
    description:
      "Shape the end-to-end experience of our core product. Own flows from research to high-fidelity prototypes and collaborate with engineers on implementation.",
    location: "San Francisco, CA",
    requirements: [
      "3+ years product design",
      "Figma proficiency",
      "Strong portfolio",
    ],
    salary: "$120k – $155k",
    title: "Product Designer",
    type: "Full-time",
    value: "job-2",
  },
  {
    department: "Marketing",
    description:
      "Be the bridge between our product and the developer community. Write docs, create tutorials, speak at conferences, and gather feedback to improve DX.",
    location: "Remote · US",
    requirements: [
      "Public speaking experience",
      "Technical writing skills",
      "Developer community background",
    ],
    salary: "$100k – $130k",
    title: "Developer Advocate",
    type: "Full-time",
    value: "job-3",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-base">Open Positions</h2>
        <Badge variant="secondary">{jobs.length} roles</Badge>
      </div>
      <Accordion className="w-full space-y-2 border-none" multiple>
        {jobs.map((job) => (
          <AccordionItem
            className="rounded-lg border px-4 last:border-b"
            key={job.value}
            value={job.value}
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-col items-start gap-1 text-left">
                <span className="font-semibold text-sm">{job.title}</span>
                <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                  <span className="flex items-center gap-1">
                    <BriefcaseIcon className="size-3" />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="size-3" />
                    {job.location}
                  </span>
                  <Badge size="sm" variant="secondary">
                    {job.type}
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <p className="mb-3 text-muted-foreground text-sm">
                {job.description}
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-4 text-muted-foreground text-sm">
                {job.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{job.salary}</span>
                <Button size="sm">Apply Now</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

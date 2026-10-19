// title: Vertical onboarding checklist
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/registry/default/ui/stepper";

const steps = [
  {
    description: "Name it and pick a region.",
    title: "Create a workspace",
  },
  {
    description: "Point app.acme.dev at us with a CNAME record.",
    title: "Connect your domain",
  },
  {
    description: "Send invites by email or share a join link.",
    title: "Invite your team",
  },
  {
    description: "Push to main and we'll build it.",
    title: "Ship your first deploy",
  },
];

export default function Particle() {
  return (
    <div className="w-full max-w-sm rounded-xl border p-5">
      <p className="font-semibold">Get started</p>
      <p className="mb-5 text-muted-foreground text-sm">2 of 4 complete</p>
      <Stepper defaultValue={3} orientation="vertical">
        {steps.map((s, i) => (
          <StepperItem key={s.title} step={i + 1}>
            <StepperTrigger>
              <StepperIndicator />
              <div className="pt-0.5 pb-1">
                <StepperTitle>{s.title}</StepperTitle>
                <StepperDescription>{s.description}</StepperDescription>
              </div>
            </StepperTrigger>
            <StepperSeparator />
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}
